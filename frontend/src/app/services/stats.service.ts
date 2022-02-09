import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';
import { Product } from '../../interfaces';
import { ProductService } from './product.service';

export interface PieChartData {
  labels: string[],
  datasets: [{
    label: string,
    data: number[],
    backgroundColor: string[],
  }];
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private year$: BehaviorSubject<number>;
  private month$: BehaviorSubject<number>;
  private pieData$: Observable<PieChartData | undefined> = new Observable<PieChartData | undefined>();
  private productMap: { [key: string]: Product } = {};

  constructor (
    private firestore: Firestore,
    private productService: ProductService,
  )
  {
    this.productService.products$.subscribe(products => {
      products.forEach(product => {
        if (product.id) {
          this.productMap[product.id] = product;
        }
      });
    });

    const now = new Date();
    this.year$ = new BehaviorSubject(now.getFullYear());
    this.month$ = new BehaviorSubject(now.getMonth() + 1);

    // {
    //   labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    //   datasets: [{
    //     label: 'Dataset 1',
    //     data: randomData,
    //     backgroundColor: ['#f00', '#0f0', '#00f', '#ff0', '#f0f'],
    //   }]
    // }

    this.pieData$ = combineLatest([
      this.year$,
      this.month$,
    ]).pipe(
      switchMap(([year, month]: number[]) => {
        const docRef = doc(this.firestore, `statistics/${year}/month/${month}`);
        return docData(docRef).pipe(
          map(stats => {
            if (!stats) {
              return;
            }

            // @FIXME: When two items have the same amount of purchases, one might not end up getting displayed
            const items = Object.entries(stats)
              .sort((a,b) => b[1] - a[1])
              .slice(0, 5);
            const total = Object.entries(stats).map(([k,v]) => v).reduce((r, c) => r + c, 0); // Total number of items

            // Build pie data result object
            const piechartData: PieChartData = {
              labels: items.map(([k,v]) => `${this.productMap[k].name} (${(v / total * 100).toFixed(1)}%)`),
              datasets: [{
                label: 'Popular Products',
                data: items.map(([k,v]) => v),
                backgroundColor: ['#f00', '#0f0', '#00f', '#ff0', '#f0f'],
              }]
            };
            return piechartData;
          }),
        );
      }),
    )
  }

  set year (value: number) {
    this.year$.next(value);
  }

  set month (value: number) {
    this.month$.next(value);
  }

  get pieData () {
    return this.pieData$;
  }

}
