import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable, distinctUntilChanged } from 'rxjs';
import { GloveApiService } from 'src/app/services/glove-api.service';

@Component({
  selector: 'app-glove-view',
  templateUrl: './glove-view.component.html',
  styleUrls: ['./glove-view.component.scss'],
})
export class GloveViewComponent implements OnInit {
  product$!: Observable<any>;

  constructor(
    config: NgbCarouselConfig,
    private gloveApi: GloveApiService,
    private toolTip: NgbTooltipConfig
  ) {
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
    toolTip.closeDelay = 500;
  }

  ngOnInit(): void {
    this.product$ = this.gloveApi.product$;
    this.gloveApi.product$.subscribe((product) => {
      console.log(`Receiving product info ${product}`);
    });
  }

  loadSnap() {
    const script = document.createElement('script') as HTMLScriptElement;
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.5.1/snap.svg-min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  setLeather(event: any) {
    if (event.target.checked === true) {
      this.gloveApi.leatherSelected.next('kip');
      console.log(`Kip selected`);
      this.gloveApi.applyFormValue({
        attribute_pewc: 'pewc_group_89335_89337_kip',
        name: 'kip',
      });
    } else {
      this.gloveApi.leatherSelected.next('steer');
      console.log(`Steer selected`);
      this.gloveApi.applyFormValue({
        attribute_pewc: 'pewc_group_89335_89337_steer',
        name: 'steer',
      });
    }

    const price = document.getElementById(
      'pewc_total_calc_price'
    ) as HTMLInputElement;

    this.gloveApi.product$.pipe(distinctUntilChanged()).subscribe((product) => {
      console.log(`Old price: ${product.price}`);
      console.log(`New price is ${price.value}`);
      if (price.value === product.price) {
        console.log(`Price is the same`);
        return;
      } else {
        this.gloveApi.product.next({
          ...product,
          price: price.value,
        });
        console.log({
          ...product,
          price: price.value,
        });
      }
    });
  }
}
