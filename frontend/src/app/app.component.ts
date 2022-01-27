import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Coffeekass';

  constructor () {
    document.documentElement.style.fontSize = '14px';
  }
}
