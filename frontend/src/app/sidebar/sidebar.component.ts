import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebarVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebarVisibility () {
    this.sidebarVisible = !this.sidebarVisible;
    console.debug('sidebarVisible', this.sidebarVisible)
  }
}
