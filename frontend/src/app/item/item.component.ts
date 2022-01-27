import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../interfaces';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';
import { delay, from, fromEvent } from 'rxjs';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() product!: Product;

  @Output() add = new EventEmitter<Product>();

  loading: boolean = true;
  image: string = '';

  constructor(
    private storage: Storage,
  ) {}

  ngOnInit(): void {
    const imageRef = ref(this.storage, this.product.image);
    from(getDownloadURL(imageRef))
      .subscribe((url: string) => {
        this.image = url;
        const img = new Image();
        img.src = url;
        const ms = Number.parseInt(Math.random().toString().substring(2, 5));
        fromEvent(img, 'load')
          .pipe(delay(ms))
          .subscribe(() => this.loading = false);
      });
  }

  addToCart () {
    this.add.emit(this.product);
  }
}
