import { Component, OnInit } from '@angular/core';
import { Functions, httpsCallableData } from '@angular/fire/functions';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { CartItem, Person } from '../../interfaces';
import { CartService } from '../services/cart.service';
import { PeopleService } from '../services/people.service';

interface Purchase {
  person: Person;
  items: CartItem[];
}

@Component({
  selector: 'app-cart',
  providers: [MessageService],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  private purchaseFn: (data: Purchase) => Observable<{ id: string }>;

  constructor(
    private firebaseFunctions: Functions,
    private cartService: CartService,
    private peopleService: PeopleService,
    private messageService: MessageService,
  ) {
    // @todo: Find out why the cast to unknown is required in the first place (seems like a lib issue?)
    this.purchaseFn = httpsCallableData(this.firebaseFunctions, 'purchase', { timeout: 3000 }) as unknown as (data: Purchase) => Observable<{ id: string }>;
  }

  ngOnInit(): void {
  }

  get items () {
    return this.cartService.getItems();
  }

  get total () {
    return this.cartService.getTotal();
  }

  get canCheckout () {
    return this.cartService.getItems().length > 0 && this.peopleService.hasSelectedPerson;
  }

  get tooltipText () {
    if (!this.canCheckout) {
      return 'You must select a person first';
    }
    return '';
  }

  clearCart () {
    this.cartService.clear();
  }

  checkout () {
    this.purchaseFn({
      person: this.peopleService.selectedPerson!,
      items: this.cartService.getItems(),
    })
    .subscribe({
      next: (result) => {
        // Reset cart & people services
        this.cartService.clear();
        this.peopleService.selectPerson();

        // Emit success message to user
        this.messageService.add({
          severity: 'success',
          summary: 'Transaction complete',
          detail: 'Your purchase has been received.',
        });

        // Debug log
        console.debug(`Created document purchase/${result.id}`)
      },
      error: (err: Error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Transaction failed',
          detail: err.message,
        });
      }
    });
  }

}
