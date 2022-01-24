import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { distinctUntilChanged, map, Observable, startWith, Subject, switchMap } from 'rxjs';
import { Person } from '../../../interfaces';

@Component({
  selector: 'app-checkout-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
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
}
