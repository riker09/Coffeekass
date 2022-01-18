import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from '../../interfaces';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Input() items: CartItem[];

  constructor(private cartService: CartService) {
    this.items = this.cartService.getItems();
  }

  ngOnInit(): void {
  }

  get total () {
    return this.cartService.getTotal();
  }

}
