import * as functions from "firebase-functions";

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const getProducts = functions.https.onRequest((request, response) => {
  response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  response.setHeader('Content-Type', 'application/json');
  const products: unknown[] = [];
  response.send(products);
});
