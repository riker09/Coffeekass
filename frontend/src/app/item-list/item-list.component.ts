import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { DataView } from 'primeng/dataview'
import { Product } from '../../interfaces';
import { CartService } from '../services/cart.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  product$: Observable<Product[]>;
  nbProduct$: number = 0;
  loading: boolean = true;
  sortOptions!: SelectItem[];
  sortKey: string = '';
  sortField: string = 'name';
  sortOrder: number = 1;

  @ViewChild('dv') dv: DataView | undefined;

  get canGoToCheckout () {
    return this.cartService.getItems().some(x => x.qty > 0);
  }

  get cartItems () {
    return this.cartService.getItems();
  }

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
    this.sortOptions = [
      { label: 'Name (Asc.)', value: 'name' },
      { label: 'Name (Desc.)', value: '!name' },
      { label: 'Price (Asc.)', value: 'price' },
      { label: 'Price (Desc.)', value: '!price' },
    ];
  }

  onAdd (product: Product) {
    this.cartService.addItem(product);
  }

  clearCart (evt: Event) {
    evt.stopPropagation();
    evt.preventDefault();
    this.cartService.clear();
  }

  resetOnEsc($event: Event) {
    if (($event as KeyboardEvent).key.toUpperCase() === 'ESCAPE') {
      ($event.target as HTMLInputElement).value = '';
      this.dv?.filter('');
    }
  }

  applyFilterGlobal($event: Event, stringVal: 'contains'|'startsWith'|'endsWith'|'equals'|'notEquals'|'in'|'lt'|'lte'|'gt'|'gte') {
    this.dv?.filter(($event.target as HTMLInputElement).value, stringVal);
  }

  onSortChange(event: Event & { value: string }) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
}
}
