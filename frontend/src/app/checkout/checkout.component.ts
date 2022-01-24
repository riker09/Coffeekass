import { Component, OnInit } from '@angular/core';
import { Functions, httpsCallableData } from '@angular/fire/functions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem, Person } from '../../interfaces';
import { CartService } from '../services/cart.service';

interface Purchase {
  person: Person;
  items: CartItem[];
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  selectedPerson: Person | null = null;

  purchaseFn: (data: Purchase) => Observable<{ id: string }>;

  constructor (
    private cartService: CartService,
    private routerService: Router,
    private firebaseFunctions: Functions,
  ) {
    // @todo: Find out why the cast to unknown is required in the first place (seems like a lib issue?)
    this.purchaseFn = httpsCallableData(this.firebaseFunctions, 'purchase', { timeout: 3000 }) as unknown as (data: Purchase) => Observable<{ id: string }>;
  }

  ngOnInit(): void {
  }

  get isCartEmpty () {
    return this.cartService.getItems().length < 1;
  }

  get purchaseButtonDisabled () {
    return !this.cartService.getItems().some(item => item.qty > 0) || !this.selectedPerson;
  }

  setPerson (person: Person | null) {
    this.selectedPerson = person;
  }

  purchase () {
    this.purchaseFn({
      person: this.selectedPerson!,
      items: this.cartService.getItems(),
    })
    .subscribe({
      next: (result) => {
        alert(`Successfully created docId ${result.id}`);
        this.cartService.clear();
        this.routerService.navigate([]);
      },
      error: (err: Error) => { console.error(err); alert(err.message); }
    });
  }

}
