import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Person } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private _people: Array<Person & Partial<{ id: string }>> = [];
  private _selectedPerson?: Person;

  onPersonChange: Subject<Person | undefined> = new Subject();

  constructor(
    private firestore: Firestore,
  ) {
    const coll = collection(this.firestore, 'person');
    collectionData(coll, {
      idField: 'id',
    }).subscribe((x) => {
      this._people = x as Array<Person & Partial<{ id: string }>>;
    });
  }

  get people () {
    return this._people;
  }

  get selectedPerson () {
    return this._selectedPerson;
  }

  get hasSelectedPerson () {
    return !!this._selectedPerson;
  }

  selectPerson (person?: Person) {
    this.onPersonChange.next(person);
    this._selectedPerson = person;
  }

}
