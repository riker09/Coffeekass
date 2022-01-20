import * as functions from "firebase-functions";
import * as cors from 'cors';
import { purchase } from "./purchase";

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

const corsMiddleware = cors({ origin: true });

export const getProducts = functions.https.onRequest((request, response) => {
  corsMiddleware(request, response, () => {
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    response.setHeader('Content-Type', 'application/json');
    const products: Array<{ name: string, price: number }> = [{
      name: 'Wasser',
      price: 0,
    }, {
      name: 'Kaffee',
      price: 0.5,
    }];
    response.send(products);
  });
});

export { purchase }
