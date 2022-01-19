import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, map, Observable } from 'rxjs';
import { CartItem } from '../../interfaces';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  isCheckoutView: boolean = false;

  @Input() item!: CartItem;

  constructor(
    private route: ActivatedRoute,
  ) { }

  async ngOnInit(): Promise<void> {
    const url: Observable<string> = this.route.url.pipe(map(segments => segments.join('')));
    const str = await firstValueFrom(url);
    this.isCheckoutView = str.includes('checkout');
  }

}
