import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { connectFunctionsEmulator, FunctionsModule, getFunctions, provideFunctions } from '@angular/fire/functions';
import { connectFirestoreEmulator, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { connectStorageEmulator, getStorage, provideStorage } from '@angular/fire/storage';

import { environment } from '../environments/environment';
import { routes } from './routes';

import { AppComponent } from './app.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemComponent } from './item/item.component';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { PeopleComponent } from './people/people.component';
import { AvatarComponent } from './utils/avatar/avatar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InsightsComponent } from './insights/insights.component';


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
    CartItemComponent,
    PeopleComponent,
    AvatarComponent,
    SidebarComponent,
    PageNotFoundComponent,
    InsightsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AvatarModule,
    ButtonModule,
    CarouselModule,
    DataViewModule,
    DropdownModule,
    ImageModule,
    InputTextModule,
    MenuModule,
    SidebarModule,
    SkeletonModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    TooltipModule,
    RouterModule.forRoot(routes),
    FunctionsModule,
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
    provideStorage(() => {
      const storage = getStorage();
      if (environment.useEmulators) {
          connectStorageEmulator(storage, 'localhost', 9199);
      }
      return storage;
    }),
    provideFunctions(() => {
      const functions = getFunctions();
      if (environment.useEmulators) {
          connectFunctionsEmulator(functions, 'localhost', 5001);
      }
      return functions;
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
