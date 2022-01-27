import { Component, Input, OnInit } from '@angular/core';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';
import { from } from 'rxjs';
import { Person } from '../../../interfaces';

const getColorByBgColor = (bgColor: string) => {
  if (!bgColor) { return ''; }
  return (parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';
}

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  image: string = '';

  @Input() person!: Person;

  constructor(
    private storage: Storage,
  ) { }

  ngOnInit(): void {
    if (this.person.image) {
      const imageRef = ref(this.storage, this.person.image);
      from(getDownloadURL(imageRef))
        .subscribe((url: string) => {
          this.image = url;
        });
    }
  }

  get styles () {
    const fg = getColorByBgColor(this.person.color);
    const [color, backgroundColor] = [fg, this.person.color];
    return {
      color,
      backgroundColor,
    };
  }

  get initials () {
    if (this.image) return '';

    const parts = this.person.name.split(' ');
    if (parts.length < 2) {
      return this.person.name.substring(0, 2).toUpperCase();
    }

    const [first, last] = [parts.shift(), parts.pop()];

    return `${first?.substring(0, 1)}${last?.substring(0, 1)}`.toUpperCase();
  }

}
