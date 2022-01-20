import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Person } from '../../../interfaces';

@Component({
  selector: 'app-checkout-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  @Output() select = new EventEmitter<Person>();

  people$: Observable<Person[]>;

  name: string = '';
  selectedPerson?: Person;

  constructor(
    private firestore: Firestore,
  ) {
    const coll = collection(this.firestore, 'person');
    this.people$ = collectionData(coll) as unknown as Observable<Person[]>;
   }

  ngOnInit(): void {
  }

  onKeyup ($event: KeyboardEvent) {
    if ($event.key.toUpperCase() === 'ENTER') {
      this.people$
        .pipe(map(people => people.filter(p => p.name.toLowerCase() === this.name.toLowerCase())[0]))
        .subscribe(person => {
          this.selectedPerson = person;
        });
    }
  }

  selectPerson (person: Person) {
    this.selectedPerson = person;
    this.select.emit(this.selectedPerson);
  }

}
