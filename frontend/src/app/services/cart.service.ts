import { Injectable } from '@angular/core';
import { CartItem, Product } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: CartItem[] = [];

  constructor() { }

  addItem (product: Product) {
    let idx = this.items.findIndex(i => i.product.name === product.name);
    if (idx === -1) {
      this.items.push({
        product,
        qty: 0,
      });
      idx = this.items.length - 1;
    }
    this.items[idx].qty++;
  }

  clear () {
    this.items.splice(0);
  }

  getItems () {
    return this.items;
  }

  getTotal () {
    return this.items.reduce((prev, curr) => prev + curr.qty * curr.product.price, 0);
  }
}
