import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { distinctUntilChanged, map, Observable, startWith, Subject, switchMap } from 'rxjs';
import { Person } from '../../interfaces';

const getColorByBgColor = (bgColor: string) => {
  if (!bgColor) { return ''; }
  return (parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';
}

@Component({
  selector: 'app-person-picker',
  templateUrl: './person-picker.component.html',
  styleUrls: ['./person-picker.component.scss']
})
export class PersonComponent implements OnInit {

  @Output() select = new EventEmitter<Person | null>();

  availablePeople$: Observable<Person[]> = new Observable<Person[]>();
  filteredPeople$: Observable<Person[]> = new Observable<Person[]>();

  selectedPerson: Person | null = null;
  searchString: string = '';
  peopleFilter$: Subject<string> = new Subject<string>();

  constructor(
    private firestore: Firestore,
  ) {
    const coll = collection(this.firestore, 'person');
    this.availablePeople$ = collectionData(coll, {
      idField: 'id',
    }) as unknown as Observable<Person[]>;

    this.filteredPeople$ = this.peopleFilter$.pipe(
      startWith(''),
      distinctUntilChanged(),
      switchMap((searchText) => this.availablePeople$.pipe(map((people) => people.filter(person => person.name.toLowerCase().includes(searchText.toLowerCase())))))
    );
  }

  ngOnInit(): void {
  }

  get hasSelectedPerson () {
    return this.selectedPerson !== null;
  }

  filter () {
    this.peopleFilter$.next(this.searchString);
  }

  selectPerson (person: Person | null) {
    this.selectedPerson = person;
    this.select.emit(person);
  }

  resetFilter (evt: Event) {
    evt.stopPropagation();
    evt.preventDefault();
    this.searchString = '';
    this.peopleFilter$.next('');
  }

  resetSelectedPerson (evt: Event) {
    evt.stopPropagation();
    evt.preventDefault();
    this.selectPerson(null);
    this.resetFilter(evt);
  }

  avatarStyles (person: Person) {
    const fg = getColorByBgColor(person.color);
    const [color, backgroundColor] = [fg, person.color];
    return {
      color,
      backgroundColor,
    };
  }

  initials (name: string) {
    const parts = name.split(' ');
    if (parts.length < 2) {
      return name.substring(0, 2).toUpperCase();
    }

    const [first, last] = [parts.shift(), parts.pop()];

    return `${first?.substring(0, 1)}${last?.substring(0, 1)}`.toUpperCase();
  }
}
