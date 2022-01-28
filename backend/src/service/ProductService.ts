import { collection, query, onSnapshot } from 'firebase/firestore';
import { ref, Ref } from 'vue';
import { IProduct } from '../interfaces/i-product';
import { firestore as db } from './Firebase';

export class ProductService {

  private _products: Ref<IProduct[]> = ref<IProduct[]>([]);

  constructor () {
    const q = query(collection(db, 'product'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this._products.value.splice(0);
      querySnapshot.forEach((doc) => {
        const p = doc.data() as IProduct;
        p.id = doc.id;
        this._products.value.push(p);
      });
    });
  }

  get products () {
    return this._products.value;
  }
}

const productService = new ProductService();

export default productService;