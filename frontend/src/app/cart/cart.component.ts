import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
  }

  get items () {
    return this.cartService.getItems();
  }

  get total () {
    return this.cartService.getTotal();
  }

  clearCart (evt: Event) {
    evt.stopPropagation();
    evt.preventDefault();
    this.cartService.clear();
  }

}
