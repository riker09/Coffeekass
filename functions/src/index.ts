import * as functions from 'firebase-functions';
import * as cors from 'cors';
import { createPurchase, purchase } from './purchase';

const corsMiddleware = cors({ origin: true });

export const helloWorld = functions.https.onRequest((req, res) => {
  corsMiddleware(req, res, async () => {
    functions.logger.info('Hello logs!', {structuredData: true});
    res.send('Hello from Firebase!');
  });
});

export { purchase, createPurchase }
