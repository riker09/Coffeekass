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
  item$: Observable<Product[]>;
  nbItem$: number = 0;
  loading: boolean = true;

  constructor (
    private firestore: Firestore,
    private cartService: CartService,
  ) {
    const coll = collection(this.firestore, 'product');
    this.item$ = collectionData(coll) as unknown as Observable<Product[]>;
    this.item$.subscribe((data) => {
      this.nbItem$ = data.length;
      this.loading = false;
    });
  }

  ngOnInit (): void {
  }

  onAdd (product: Product) {
    this.cartService.addItem(product);
  }
}
