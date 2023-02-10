import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbCarouselConfig, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { NguCarouselConfig } from '@ngu/carousel';
import * as _ from 'lodash';
import { GloveApiService } from 'src/app/services/glove-api.service';
import { GloveDataService } from 'src/app/services/glove-data.service';

@Component({
  selector: 'app-accord-panel',
  templateUrl: './accord-panel.component.html',
  styleUrls: ['./accord-panel.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AccordPanelComponent implements OnInit {
  @Input() index!: string;
  @Input() items: any = [];
  @ViewChild('personalization') personalization!: ElementRef;
  @ViewChild('customernotes') customernotes!: ElementRef;
  colors: any;
  custom: any | undefined = {};
  gloveType: any;
  leatherSelected = 'steer';
  section: any;
  public carouselTile: NguCarouselConfig = {
    grid: { xs: 2, sm: 2, md: 3, lg: 3, all: 0 },
    slide: 2,
    speed: 400,
    animation: 'lazy',
    loop: true,
    point: {
      visible: true,
    },
    load: 2,
    touch: true,
    easing: 'ease',
  };
  webs!: any;

  constructor(
    private gloveApi: GloveApiService,
    private config: NgbCarouselConfig,
    private glove: GloveDataService,
    private tooltip:NgbTooltipConfig
  ) {
    config.showNavigationArrows = true;
    config.showNavigationIndicators = false;
    tooltip.closeDelay = 0;
  }

  ngOnInit(): void {
    this.gloveApi.leatherSelected$.subscribe((leatherSelected) => {
      this.leatherSelected = leatherSelected;
    });

    this.gloveApi.gloveType$.subscribe((result: any) => {
      this.gloveType = result;
    });
    this.gloveApi.gloveColors$.subscribe((colors: any) => {
      this.colors = colors;
    });
    this.gloveApi.gloveWebs$.subscribe((webs: any) => {
      this.webs = webs;
      console.log(this.webs)
    });
    this.gloveApi.gloveCustom$.subscribe((result: any) => {
      if(result != undefined) {
        this.custom = result;
      }
    });

  }

  triggerAddToCart(){
    this.gloveApi.triggerAddToCart();
  }

  addPersonalization(payload:any){
    let name = this.personalization.nativeElement.value;
    const attribute = payload.attribute_pewc;
    this.gloveApi.applyFormValue({attribute_pewc: attribute, name})
  }

  addOrderNote(payload:any){
    let name = this.customernotes.nativeElement.value;
    const attribute = payload.attribute_pewc;
    this.gloveApi.applyFormValue({attribute_pewc: attribute, name})
  }

  addVariation(payload:any){
    console.log(payload)
    this.gloveApi.applyFormValue(payload)
  }

  filterWebInputs() {
    let collection = [];
    if (this.webs != undefined) {
      collection = this.webs.filter((f: any) => {
        return f.gloveType.find((m: any) => {
          if (m === this.gloveType.name.toLowerCase()) {
            return true;
          }
          return false;
        });
      });
    }
    return collection;
  }

  colorFilter(glovePart: string, db?: any) {
    const id = glovePart;
    let filtered: any = [];
    this.colors.forEach((c: any) => {
      if (id === 'leather') {
        if (
          this.leatherSelected === 'steer' ||
          this.leatherSelected === 'kip'
        ) {
          c.leather.includes(this.leatherSelected) ? filtered.push(c) : null;
        }
      } else if (c.leather.includes(id)) {
        //colors.push({ hex: c.hex, rgb: c.rgb, name: c.name });
        filtered.push(c);
      }
    });
    return filtered;
  }

  addColorVariation(option: any, variation: any) {
    const payload: any = {
      attribute: option.attribute_pewc,
      ...variation,
    };
    console.log(this.custom)
    this.custom[option.attribute_pewc] = variation.name;
    console.log(this.custom)
    this.gloveApi.gloveCustom.next(this.custom)
    // for (let i = 0; i < this.custom.length; i++) {
    //   if (this.custom[i]['label'] === option.label) {
    //     if (this.custom[i]['section'] === option.glovePart) {
    //       this.custom[i]['attribute_pewc'] = option.attribute_pewc;
    //       this.custom[i]['variations'] = { ...variation };
    //     }
    //   } else {
    //     this.custom.push({ ...option, variation: variation });
    //     i++;
    //   }
    // }

    // this.lastItemSelected = payload;
    // this.domResponse[panel] = this.lastItemSelected;
    // this.lastItemSelected = '';

    /**Save to Local Storage */
    const newCustom = _.cloneDeep(this.custom);
    localStorage.setItem('glove-customization', JSON.stringify(newCustom));

    /** Apply form value and apply fill to glove designer */
    this.gloveApi.applyFormValue({attribute_pewc: payload.attribute, name: payload.name});
    this.gloveApi.applyFilltoCanvas({
      section: option.glovePart,
      hex: variation.hex,
      rgb: variation.rgb,
    });
  }
}

