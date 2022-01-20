import * as functions from "firebase-functions";
import * as cors from 'cors';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const corsMiddleware = cors({ origin: true });

interface Person {
  name: string;
}
interface Product {
  name: string;
  price: number;
}
interface CartItem {
  product: Product,
  qty: number,
}
type Purchase = { person: Person, items: CartItem[] };

const app = initializeApp({
  credential: applicationDefault(),
});
const firestore = getFirestore(app);

export const purchase = functions.https.onRequest((req, res) => {
  corsMiddleware(req, res, async () => {
    const { data: purchase }: { data: Purchase } = req.body;

    if (!purchase.person.name) {
      res.status(400).send('Missing property: person.name');
      return;
    }

    const coll = firestore.collection('purchase');
    const doc = await coll.add(purchase);

    res.status(201);
    res.send({ data: { id: doc.id } });
  });
});