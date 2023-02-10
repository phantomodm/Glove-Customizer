import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { GloveApiService } from './services/glove-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @Input('name') name!: string;
  @Input('price') price!: string;
  @Input('sale-price') sale!: string;
  @ViewChild('cgbloader') loader!: ElementRef;

  loading = true;
  loaderStatus = false;

  constructor(private api: GloveApiService, private router: Router) {
    this.router.navigate([''], { skipLocationChange: true });
  }
  ngAfterViewInit(): void {
    this.loadSnap();
    // console.log(document.getElementsByClassName('cgb-loader'));
    // this.loader.nativeElement.style.display = 'none';
  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    if (document.getElementsByClassName('cgb-loader').length > 0) {
      let x = document.getElementsByClassName('cgb-loader')[0] as HTMLElement;
      x.style.display = 'none';
    }
    //this.loading = false;
  }

  ngOnInit(): void {
    this.api.product.next({
      name: this.name,
      price: this.price,
      sale_price: this.sale,
    });
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }

        default:
          break;
      }
    });
  }

  loadSnap() {
    const script = document.createElement('script') as HTMLScriptElement;
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.5.1/snap.svg-min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  removeLoader() {
    if (this.loaderStatus) {
      return;
    }
    if (!this.loaderStatus) {
      if (document.getElementsByClassName('cgb-loader').length > 0) {
        let x = document.getElementsByClassName('cgb-loader')[0] as HTMLElement;
        x.style.display = 'none';
        this.loaderStatus = true;
      }
    }
  }
}
