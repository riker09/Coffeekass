import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Product } from '../../interfaces';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  product$: Observable<Product[]>;
  nbProduct$: number = 0;
  loading: boolean = true;

  constructor (
    private firestore: Firestore,
    private cartService: CartService,
  ) {
    const coll = collection(this.firestore, 'product');
    this.product$ = collectionData(coll) as unknown as Observable<Product[]>;
    this.product$.subscribe((data) => {
      this.nbProduct$ = data.length;
      this.loading = false;
    });
  }

  ngOnInit (): void {
  }

  onAdd (product: Product) {
    this.cartService.addItem(product);
  }
}
