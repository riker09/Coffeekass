import { Routes } from '@angular/router';
import { InsightsComponent } from './insights/insights.component';
import { ItemListComponent } from './item-list/item-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: ItemListComponent },
  { path: 'insights', component: InsightsComponent },
  { path: '**', component: PageNotFoundComponent },
];
