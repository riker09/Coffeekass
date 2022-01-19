import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  get checkoutButtonDisabled () {
    return !this.cartService.getItems().some(item => item.qty > 0);
  }

}
