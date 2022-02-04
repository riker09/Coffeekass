import { collection, query, onSnapshot, doc, deleteDoc, Timestamp  } from 'firebase/firestore';
import { ref, Ref } from 'vue';
import { ISale } from '../interfaces/i-sale';
import { firestore as db } from './Firebase';

class Sale implements ISale {
  [ key: string ]: unknown;

  id?: string;

  constructor (private _data: ISale) {}

  get items () {
    return this._data.items;
  }

  get createdAt () {
    return this._data.createdAt;
  }

  get total () {
    return this._data.items.reduce((prev, curr) => prev + (curr.product.price * curr.qty), 0);
  }

  get totalNbProducts () {
    return this._data.items.reduce((prev, curr) => prev + curr.qty, 0);
  }
}

export class SalesService {

  private _sales: Ref = ref<Sale[]>([]);

  constructor () {
    const q = query(collection(db, 'purchase'))
      .withConverter({
        // @TODO: If there is ever the need for a second FB converter refactor this into its own generic helper method
        fromFirestore: (snapshot) => {
          const data = snapshot.data() as ISale;

          // Convert firebase timestamps to JS Date objects
          Object.entries(data).forEach(([k,v]) => {
            if (v instanceof Timestamp) {
              data[k] = new Date(v.toMillis());
            }
          });

          return data;
        },
        toFirestore: () => { return {} }, // Dummy implementation b/c it is never used
      });
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this._sales.value.splice(0);
      querySnapshot.forEach((doc) => {
        const sale = new Sale(doc.data() as ISale);
        sale.id = doc.id;
        this._sales.value.push(sale);
      });
    });
  }

  get sales (): Sale[] {
    return this._sales.value;
  }
}

const salesService = new SalesService();

export default salesService;