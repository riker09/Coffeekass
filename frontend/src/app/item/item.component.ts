import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../interfaces';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() product!: Product;

  @Output() add = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {
  }

  addToCart () {
    this.add.emit(this.product);
  }
}
