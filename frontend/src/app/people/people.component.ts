import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Person } from '../../interfaces';
import { PeopleService } from '../services/people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  @Output() select = new EventEmitter<Person | null>();

  @ViewChild('dt')
  dt!: Table;

  selectedPerson: Person | null = null;

  constructor(
    private peopleService: PeopleService,
  ) { }

  ngOnInit(): void {
    this.peopleService.onPersonChange.subscribe((person) => {
      if (!person) this.selectedPerson = null;
    })
  }

  get hasSelectedPerson () {
    return this.peopleService.hasSelectedPerson;
  }

  get people () {
    return this.peopleService.people;
  }

  filter ($event: Event) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }

  selectPerson ($event?: { originalEvent: Event, data: Person, type: string, index: number }) {
    const person = ($event?.data) || undefined;
    this.peopleService.selectPerson(person);
  }

  clear (table: Table) {
    table.clear();
  }

  reset (evt: KeyboardEvent) {
    if (evt.key.toUpperCase() === 'ESCAPE') {
      (evt.target as HTMLInputElement).value = '';
      this.clear(this.dt);
    }
  }
}
