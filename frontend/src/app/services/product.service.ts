import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { lastValueFrom, Observable } from 'rxjs';
import { Product } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private product$: Observable<Product[]>;

  constructor(
    private firestore: Firestore,
  ) {
    const coll = collection(this.firestore, 'product');
    this.product$ = collectionData(coll, {
      idField: 'id',
    }) as unknown as Observable<Product[]>;
  }

  get products () {
    return lastValueFrom(this.product$);
  }

  get products$ () {
    return this.product$;
  }
}
