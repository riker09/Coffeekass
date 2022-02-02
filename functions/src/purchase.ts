import * as functions from 'firebase-functions';
import * as cors from 'cors';
import { firestore } from './firebase';

const corsMiddleware = cors({ origin: true });

interface Person {
  id: string;
  name: string;
  balance: number;
}
interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
interface CartItem {
  product: Product,
  qty: number,
}
type Purchase = {
  person: Person;
  items: CartItem[];
  createdAt: Date,
};

export const purchase = functions.https.onRequest((req, res) => {
  corsMiddleware(req, res, async () => {
    const { data: purchase }: { data: Purchase } = req.body;

    if (!purchase.person.name) {
      res.status(400).send({
        error: 'Missing property: person.name',
      });
      return;
    }

    purchase.createdAt = new Date();

    // Store purchase
    const coll = firestore.collection('purchase');
    const doc = await coll.add(purchase);

    res
      .status(201)
      .send({ data: { id: doc.id } });
  });
});

export const createPurchase = functions.firestore
  .document('purchase/{id}')
  .onCreate(async (snap, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const purchase = snap.data() as Purchase;

    // Reduce QTY of puchased items
    const qtyUpdates = [];
    for (const item of purchase.items) {
      const productRef = firestore.doc(`product/${item.product.id}`);
      const productData = (await productRef.get()).data() as Product;
      const currentQty = productData.quantity || 0;
      qtyUpdates.push(productRef.update({
        quantity: (currentQty - item.qty),
      }));
    }
    await Promise.all(qtyUpdates);

    // Substract cart total from person
    const total = purchase.items.reduce((prev, curr) => prev + (curr.product.price * curr.qty), 0);
    const personRef = firestore.doc(`person/${purchase.person.id}`);
    const currentBalance = ((await personRef.get()).data() as Person).balance || 0;
    await personRef.update({
      balance: (currentBalance - total),
    });
});