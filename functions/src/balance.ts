import * as functions from 'firebase-functions';
import * as cors from 'cors';
import { firestore } from './firebase';

const corsMiddleware = cors({ origin: true });

export const balance = functions.https.onRequest((req, res) => {
  corsMiddleware(req, res, async () => {
    const { data: items }: { data: { id: string, balance: number }[] } = req.body;

    try {
      for (const item of items) {
        await firestore.doc(`person/${item.id}`).update({
          balance: item.balance,
        });
      }
      res.status(200).send({ data: items.map(x => x.id) });
    } catch (err) {
      res.status(500).send({
        error: (err as Error).message,
      });
    }
  });
});
