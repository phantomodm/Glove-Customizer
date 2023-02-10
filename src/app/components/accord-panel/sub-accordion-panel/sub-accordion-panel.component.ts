import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbAccordion, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { NguCarouselConfig } from '@ngu/carousel';
import { GloveApiService } from 'src/app/services/glove-api.service';
import { GloveDataService } from 'src/app/services/glove-data.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-sub-accordion-panel',
  templateUrl: './sub-accordion-panel.component.html',
  styleUrls: ['./sub-accordion-panel.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SubAccordionPanelComponent implements OnInit {
  @Input() index!: number;
  @Input() items: any = {};
  @Input() section!: string;
  @Input() header!: string;
  @ViewChild('subMenu1') submenu!: NgbAccordion;

  designHeader!:string;
  gloveType:any;
  leatherSelected = 'steer';
  custom: any | undefined = {};
  webs: any;

  public carouselTile: NguCarouselConfig =
  {
    grid: {xs: 2, sm: 2, md: 3 , lg: 3, all: 0},
    slide: 2,
    speed: 400,
    animation: 'lazy',
    loop: true,
    point: {
      visible: true
    },
    load: 2,
    touch: true,
    easing: 'ease'
  };
  dataSource: any;
  colors: any;
  selection: any = {};

  constructor(private gloveApi: GloveApiService,
              private config: NgbCarouselConfig,
              private wizardData: GloveDataService
    ) {
    config.showNavigationArrows = true;
    config.showNavigationIndicators = false;
    this.gloveApi.gloveColors$.subscribe((colors:any) => {
      this.colors = colors;
    });

    }

  ngOnInit(): void {
    this.gloveApi.leatherSelected$.subscribe((leatherSelected) => {
      this.leatherSelected = leatherSelected;
    })

    this.gloveApi.gloveWebs$.subscribe((webs:any) => {
      this.webs = webs
    })

    this.gloveApi.gloveType$.subscribe((result:any) => {
      this.gloveType = result;
      this.dataSource = this.items.filter((item:any) => item.gloveType.includes(this.gloveType.glove));
    })

    this.gloveApi.gloveCustom$.subscribe((custom:any) => {
      console.log(custom);
      if(custom != undefined) {
        this.selection = custom;
      }
    })
  }

  addVariation(payload:any){
    console.log('sub',payload);
    this.gloveApi.applyFormValue(payload)
  }

  designId(): string | undefined{
    let header;
    if(this.header.toLowerCase() === 'glove shell' && this.gloveType.glove.includes('glove')){
      header = 'glove-shell-design-menu-2';
    } else if (this.header.toLowerCase() === 'glove shell' && this.gloveType.glove.includes('mitt')){
      header = 'glove-shell-design-menu-1';
    } else {
      header = this.header.toLowerCase().replace(/ /g, '-') + '-design-menu-0';
    }
    return header;
  }

  filterSections(section: string[]): boolean {
    let db = [];
    if (!this.gloveType) {
      return false;
    }
    return section.includes(this.gloveType.glove);
  }

  filterWebInputs() {
    let collection = [];
    collection = this.webs.filter((f:any) => {
      return f.gloveType.find((m: any) => {
        if (m === this.gloveType.name.toLowerCase()) {
          return true;
        }
        return false;
      });
    });
    return collection;
  }

  colorFilter(section: string, db?: any) {
    const id = this.section;
    let colors: any = [];
    this.colors.forEach((c: any) => {
      if (id === 'leather') {
        if (
          this.leatherSelected === 'steer' ||
          this.leatherSelected === 'kip'
        ) {
          c.leather.includes(this.leatherSelected) ? colors.push(c) : null;
        }
      } else if (c.leather.includes(id)) {
        //colors.push({ hex: c.hex, rgb: c.rgb, name: c.name });
        colors.push(c);
      }
    });
    return colors;
  }

  addColorVariation(option: any, variation: any, index?:number) {
    const payload: any = {
      attribute: option.attribute_pewc,
      ...variation,
    };

    this.selection[option.attribute_pewc] = variation.name;
    this.gloveApi.gloveCustom.next(this.selection);
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

  selectWeb(payload: {}) {
    console.log(payload);
  }
}
