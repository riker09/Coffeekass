import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebarVisible = false;

  items :MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: '/', command: () => { this.sidebarVisible = false } },
      { label: 'Insights', icon: 'pi pi-fw pi-chart-line', routerLink: 'insights', command: () => { this.sidebarVisible = false } },
      { separator: true },
      { label: 'Backend', icon: 'pi pi-fw pi-external-link', url: this.backendLink, target: '_blank' }
    ];
  }

  get backendLink () {
    return 'http://localhost:3000/';
  }
}
