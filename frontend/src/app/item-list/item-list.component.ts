import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

interface Product {
  name: string;
  price: number;
}

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  item$: Observable<Product[]>;
  nbItem$: number = 0;
  loading: boolean = true;

  constructor (private firestore: Firestore) {
    const coll = collection(this.firestore, 'product');
    this.item$ = collectionData(coll) as unknown as Observable<Product[]>;
    this.item$.subscribe((data) => {
      this.nbItem$ = data.length;
      this.loading = false;
    });
  }

  ngOnInit (): void {
  }
}
