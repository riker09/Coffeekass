import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { connectFunctionsEmulator, FunctionsModule, getFunctions, provideFunctions } from '@angular/fire/functions';
import { connectFirestoreEmulator, getFirestore, provideFirestore } from '@angular/fire/firestore';
// import { connectStorageEmulator, getStorage, provideStorage } from '@angular/fire/storage';
// import { provideAuth, connectAuthEmulator, getAuth } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemComponent } from './item/item.component';
import { environment } from '../environments/environment';
import { CartComponent } from './cart/cart.component';

let resolvePersistenceEnabled: (enabled: boolean) => void;

export const persistenceEnabled = new Promise<boolean>(resolve => {
  resolvePersistenceEnabled = resolve;
});

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // FunctionsModule,
    // provideAuth(() => {
    //   const auth = getAuth();
    //   if (environment.useEmulators) {
    //     connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    //   }
    //   return auth;
    // }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => {
      const firestore = getFirestore();
      if (environment.useEmulators) {
          connectFirestoreEmulator(firestore, 'localhost', 8080);
      }
      // enableMultiTabIndexedDbPersistence(firestore).then(
      //   () => resolvePersistenceEnabled(true),
      //   () => resolvePersistenceEnabled(false)
      // );
      return firestore;
    }),
    // provideStorage(() => {
    //   const storage = getStorage();
    //   if (environment.useEmulators) {
    //       connectStorageEmulator(storage, 'localhost', 9199);
    //   }
    //   return storage;
    // }),
    // provideFunctions(() => {
    //   const functions = getFunctions();
    //   if (environment.useEmulators) {
    //       connectFunctionsEmulator(functions, 'localhost', 5001);
    //   }
    //   return functions;
    // }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
