import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject, Subject } from 'rxjs';
import { last, finalize, map, distinctUntilChanged } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { GloveDataService } from './glove-data.service';
//import * as Snap from 'snapsvg-cjs';
//import { gsap } from "gsap/dist/gsap";

declare var $: any;
declare var Snap: any;
export interface CustomOrder {
  thb?: string;
  bfg?: string;
  thbo?: string;
  thbi?: string;
  indi?: string;
  indo?: string;
  rngi?: string;
  rngo?: string;
  pnki?: string;
  pnko?: string;
  mid?: string;
  lce?: string;
  bnd?: string;
  web?: string;
  tgt?: string;
  wlt?: string;
  wst?: string;
  logo?: string;
  fpad?: string;
  stch?: string;
}

export interface HtmlValue {
  id: string;
  value: string;
}

declare var jQuery: any;

@Injectable({
  providedIn: 'root',
})
export class GloveApiService {
  svgMain: any;
  svgInside: any;
  svgSide: any;
  oView: any;
  iView: any;
  sView: any;
  bgroup1: any;
  bgroup2: any;
  bgroup3: any;
  errorLog: any[] = [];
  gloveBase!: string;
  leatherType!: string;
  snapLoaded = false;

  product = new BehaviorSubject<any>({});
  product$ = this.product.asObservable();
  storage = new BehaviorSubject<any>(null);
  storage$ = this.storage.asObservable();
  private _gloveBase!: string;
  gloveType = new BehaviorSubject<{ name: any; glove: any }>({ name: null, glove: null });
  gloveType$ = this.gloveType.asObservable();
  fillChange = new Subject<any | undefined>();
  fillChange$ = this.fillChange.asObservable();
  gloveDesign = new BehaviorSubject<any | undefined>(undefined);
  gloveDesign$ = this.gloveDesign.asObservable();
  leatherSelected = new Subject<string>();
  leatherSelected$ = this.leatherSelected.asObservable();
  gloveColors = new BehaviorSubject<any>([]);
  gloveColors$ = this.gloveColors.asObservable();
  gloveWebs = new BehaviorSubject<any>([]);
  gloveWebs$ = this.gloveWebs.asObservable();
  gloveCustom = new BehaviorSubject<any | undefined>(undefined);
  gloveCustom$ = this.gloveCustom.asObservable();

  constructor(private wizardData: GloveDataService) {
    this.wizardData.getColors().subscribe((result: any) => {
      this.gloveColors.next(result);
    });

    this.wizardData
      .getGloveWebs()
      .pipe(
        map((w: any) =>
          w.map((web: any) => {
            return { name: web.valueString, ...web };
          })
        )
      )
      .subscribe((result: any) => {
        this.gloveWebs.next(result);
      });

    // if (localStorage.getItem('glove-customization') != null) {
    //   let data: any = localStorage.getItem('glove-customization');
    //   data = JSON.parse(data);

    //   data.forEach((item: any, i: number) => {
    //     this.applyFilltoCanvas({
    //       section: item[i].section,
    //       hex: item[i].hex,
    //       rgb: item[i].rgb,
    //     });
    //   });

    //   this.storage.next(data);
    // }
    // this.storage$
    //   .pipe(
    //     last(),
    //     finalize(() => {
    //       console.log('Local storage saved');
    //     })
    //   )
    //   .subscribe((data) => {
    //     if (data) {
    //       localStorage.setItem('glove-customization', JSON.stringify(data));
    //     }
    //   });

    //this.leatherSelected.next('steer')
    this.leatherSelected$.subscribe((data: any) => console.log(data));
  }

  init(target?: any) {
    return this.initCanvas();
  }

  /**
   * Load SVG Glove Container
   */
  async initCanvas() {
    try {
      if (!!this.snapLoaded) {
      } else {
        this.svgMain = Snap(`#svg-main`);
        this.svgInside = Snap(`#svg-inside`);
        this.svgSide = Snap(`#svg-side`);

        /* Glove Group Containers */
        (this.oView = this.svgMain.group()),
          (this.iView = this.svgInside.group()),
          (this.sView = this.svgSide.group());

        this.snapLoaded = true;
      }

      if (this._gloveBase === this.gloveBase) {
        return;
      }

      this.clearGloveCanvas();
      switch (this.gloveBase) {
        case 'catcher-mitt':
          this.loadCatcher();
          break;
        case 'catcher-fastback':
          this.loadCatcherFB();
          break;
        case 'inf':
          this.loadInfield();
          break;
        case 'inf_dw':
          this.loadInfield2Welt();
          break;
        case 'fbase':
          this.loadFbase();
          break;
        case 'of':
          this.loadOutfield();
          break;
        case 'pitcher':
          this.loadInfield();
          break;
        default:
          this.loadCatcher();
          break;
      }
      this._gloveBase = this.gloveBase;

      return { loaded: true };
    } catch (error) {
      console.error(error);
      return { loaded: false, error };
    }
  }

  setGloveBase(payload: any) {
    if (this.gloveBase === payload.gloveBase) {
      return;
    }
    this.clearGloveCanvas();
    this.gloveBase = payload.gloveBase;
    this.gloveType.next({ name: payload.name, glove: payload.gloveType });
  }

  setGloveType(input: string) {
    this.leatherType = input;
  }

  addVariation(payload: any) {
    const name = payload.name.toLowerCase();
  }

  applyFilltoCanvas(payload: any): void {
    [
      'svg-main:_x5F_:vw3',
      'svg-side:_x5F_:vw2',
      'svg-inside:_x5F_:vw1',
    ].forEach((view) => {
      const svg = view.split(':');
      const el = svg[0];
      const element = `#${this.gloveBase}${svg[1]}${svg[2]}${svg[1]}${payload.section}`;
      const element2 = document.querySelector(`${element}`);
      this.fillChange.next({
        id: payload.section,
        fill: 'stroke',
        color: payload.rgb,
      });
      switch (el) {
        case 'svg-main':
          if (element.length != 0) {
            if (element.includes('stch')) {
              document
                .querySelector(`${element}`)
                ?.setAttribute('stroke', payload.rgb);

              break;
            }
            document
              .querySelector(`${element}`)
              ?.setAttribute('fill', payload.rgb);
            //this.svgMain.select(`#${element}`).attr({ fill: payload.hex });
          }
          break;
        case 'svg-inside':
          if (element.length != 0) {
            if (element.includes('stch')) {
              document
                .querySelector(`${element}`)
                ?.setAttribute('stroke', payload.rgb);
              break;
            }
            document
              .querySelector(`${element}`)
              ?.setAttribute('fill', payload.rgb);
          }
          break;
        case 'svg-side':
          if (element.length != 0) {
            if (element.includes('stch')) {
              document
                .querySelector(`${element}`)
                ?.setAttribute('stroke', payload.rgb);
              break;
            }
            document
              .querySelector(`${element}`)
              ?.setAttribute('fill', payload.rgb);
          }
          break;
        default:
          break;
      }
    });
  }

  logError(error: any) {
    this.errorLog.push(`Error adding value ${error.err}`);
  }

  private _applyFormValue(payload: any): void {
    console.log(payload)
    const name = payload.name.toLowerCase();
    try {
      if (name === 'steer' || payload.name === 'kip') {
        const el = document.getElementById(
          `${payload.attribute_pewc}`
        ) as HTMLInputElement;
        el.click();
        return;
      }

      const el = document.getElementById(
        `${payload.attribute_pewc}`
      ) as HTMLInputElement;
      console.log(el, name)
      el.value = name;

      const selector = document.querySelector(
        `[data-id="${payload.attribute_pewc}"]`
      ) as HTMLElement | null;
      selector!.dataset['fieldValue'] = name;
      console.log(selector)

    } catch (error: any) {
      console.error(error);
      //this.logError(error.message);
    }
  }

  applyFormValue(payload: any) {
    this._applyFormValue(payload);
  }

  colorFilter() {
    let filtered = [];
    this.leatherSelected$.subscribe((leather: any) => {
      this.gloveColors.value.forEach((color: any) => {
        if (leather === 'leather') {
          if (leather === 'steer' || leather === 'kip') {
            color.leather.includes(leather) ? filtered.push(color) : null;
          }
        } else if (color.leather.includes(leather)) {
          //colors.push({ hex: c.hex, rgb: c.rgb, name: c.name });
          filtered.push(color);
        }
      });
    });
  }
  clearGloveCanvas = () => {
    try {
      this.oView.clear(), this.iView.clear(), this.sView.clear();
    } catch (error) {}
    // this.bgroup1.clear(), this.bgroup2.clear(), this.bgroup3.clear();
  };

  separatorCheck(input: string, separator: string) {
    if (input.split(separator).length > 1) {
      return true;
    } else {
      return false;
    }
  }

  triggerAddToCart(){
    const cart = document.getElementsByName('add-to-cart')[0] as HTMLInputElement;
    cart.click();
  }

  valueFormatter(value: string) {
    if (value.split(' ').length > 1) {
      value = formatter(value, ' ');
      return value;
    } else if (value.split('-').length > 1) {
      value = formatter(value, '-');
      return value;
    } else {
      return capitalize(value);
    }

    function formatter(input: any, separator: string) {
      let val = input.split(separator);
      val.forEach((w: any, i: any) => {
        val[i] = capitalize(w);
      });
      return val.join(' ');
    }

    function capitalize(string: string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }

  // ** Set glove emobroidery on canvas */
  setSeriesOnGlove(input: any, element: any) {
    const self = this;
    const series = input;

    if (self.leatherType === 'steer' && series === 'rise') {
      if (element.length !== 0) {
        element.attr({ opacity: 1, fill: '#FFFAFA' });
      }
    } else {
      if (element.length !== 0) {
        element.attr({ opacity: 1, fill: '#FFFAFA' });
      }
    }
  }

  resetStitching() {
    document.querySelectorAll(``).forEach((el) => {
      el.setAttribute('fill', 'none');
    });
  }

  // ** Loads Catcher's mitt glove canvas */
  loadCatcher() {
    const self = this;
    Snap.load(`${environment.imgSrc}assets/images/nys_catcher_back_view.svg`, (f: any) => {
      this.svgMain.attr({ viewBox: '0 -10 400 400' });

      const g = f.selectAll(
        '#catcher-mitt_x5F_vw3_x5F_utoe, #catcher-mitt_x5F_vw3_x5F_thb, #catcher-mitt_x5F_vw3_x5F_bfg, #catcher-mitt_x5F_vw3_x5F_web, #catcher-mitt_x5F_vw3_x5F_plm, #catcher-mitt_x5F_vw3_x5F_lin, #catcher-mitt_x5F_vw3_x5F_bnd, #catcher-mitt_x5F_vw3_x5F_fpad, #catcher-mitt_x5F_vw3_x5F_stch, #catcher-mitt_x5F_vw3_x5F_lce, #catcher-mitt_x5F_vw3_x5F_logo, #catcher-mitt_x5F_open_x5F_back'
      );
      g.forEach(function (el: any, i: any) {
        const p = [
          'catcher-mitt_x5F_vw3_x5F_utoe',
          'catcher-mitt_x5F_vw3_x5F_thb',
          'catcher-mitt_x5F_vw3_x5F_bfg',
          'catcher-mitt_x5F_vw3_x5F_web',
          'catcher-mitt_x5F_vw3_x5F_plm',
          'catcher-mitt_x5F_vw3_x5F_lin',
          'catcher-mitt_x5F_vw3_x5F_bnd',
          'catcher-mitt_x5F_vw3_x5F_fpad',
          'catcher-mitt_x5F_vw3_x5F_stch',
          'catcher-mitt_x5F_vw3_x5F_lce',
          'catcher-mitt_x5F_vw3_x5F_logo',
          'catcher-mitt_x5F_open_xF_back',
        ];
        const layer = p[i];

        // Apply default fills & add to group
        if (_.includes(layer, 'stch')) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: '#FFFAFA' });
        }

        self.oView.add(el);
        self.svgMain.append(self.oView);
        // self.cloneCanvas();
        // self.defaultColor();
      });
    });

    Snap.load(`${environment.imgSrc}assets/images/nys_catcher_inside_view.svg`, (f: any) => {
      this.svgInside.attr({ viewBox: '0 -10 400 400' });
      const g = f.selectAll(
        '#catcher-mitt_x5F_vw2_x5F_plm, #catcher-mitt_x5F_vw2_x5F_web, #catcher-mitt_x5F_vw2_x5F_tgt, #catcher-mitt_x5F_vw2_x5F_stch, #catcher-mitt_x5F_vw2_x5F_bnd, #catcher-mitt_x5F_vw2_x5F_lce, #catcher-mitt_x5F_pocket_x5F_view, #catcher-mitt_x5F_vw2_x5F_rse, #catcher-mitt_x5F_rise_x5F_logo'
      );

      g.forEach((el: any, i: any) => {
        const p = [
          'catcher-mitt_x5F_vw2_x5F_plm',
          'catcher-mitt_x5F_vw2_x5F_web',
          'catcher-mitt_x5F_vw2_x5F_tgt',
          'catcher-mitt_x5F_vw2_x5F_stch',
          'catcher-mitt_x5F_vw2_x5F_bnd',
          'catcher-mitt_x5F_vw2_x5F_lce',
          'catcher-mitt_x5F_pocket_x5F_view',
          'catcher-mitt_x5F_vw2_x5F_rse',
          'catcher-mitt__x5F_rise_x5F_logo',
        ];
        const layer = p[i];

        // Apply default fills & add to group
        if (_.includes(layer, 'stch')) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: '#FFFAFA' });
        }

        self.iView.add(el);
        self.svgInside.append(self.iView);
        // self.defaultColor();
      });
    });

    Snap.load(`${environment.imgSrc}assets/images/nys_catcher_side_view.svg`, (f: any) => {
      this.svgSide.attr({ viewBox: '0 0 400 400' });
      const g = f.selectAll(
        '#catcher-mitt_x5F_vw1_x5F_utoe, #catcher-mitt_x5F_vw1_x5F_thb, #catcher-mitt_x5F_vw1_x5F_logo, #catcher-mitt_x5F_vw1_x5F_bnd, #catcher-mitt_x5F_vw1_x5F_plm, #catcher-mitt_x5F_vw1_x5F_web, #catcher-mitt_x5F_vw1_x5F_fpad, #catcher-mitt_x5F_vw1_x5F_stch, #catcher-mitt_x5F_vw1_x5F_lce, #catcher-mitt_x5F_side_x5F_view'
      );

      g.forEach((el: any, i: any) => {
        const p = [
          'catcher-mitt_x5F_vw1_x5F_utoe',
          'catcher-mitt_x5F_vw1_x5F_thb',
          'catcher-mitt_x5F_vw1_x5F_logo',
          'catcher-mitt_x5F_vw1_x5F_bnd',
          'catcher-mitt_x5F_vw1_x5F_plm',
          'catcher-mitt_x5F_vw1_x5F_web',
          'catcher-mitt_x5F_vw1_x5F_fpad',
          'catcher-mitt_x5F_vw1_x5F_stch',
          'catcher-mitt_x5F_vw1_x5F_lce',
          'catcher-mitt_x5F_side_x5F_view',
        ];
        const layer = p[i];

        // Apply default fills & add to group
        if (_.includes(layer, 'stch')) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: '#FFFAFA' });
        }

        self.sView.add(el);
        self.svgSide.append(self.sView);
        // self.defaultColor();
      });
    });
  }

  // ** Loads outfield glove canvas */
  loadOutfield() {
    const self = this;
    Snap.load(`${environment.imgSrc}assets/images/nys_outfield_back_view.svg`, (f: any) => {
      this.svgMain.attr({ viewBox: '0 0 400 400' });
      // this.gloveCloneMainVertical.attr({ viewBox: "0 0 400 400" });
      const g = f.selectAll(
        '#of_x5F_vw3_x5F_wst, #of_x5F_vw3_x5F_logo, #of_x5F_vw3_x5F_indo, #of_x5F_vw3_x5F_indi, #of_x5F_vw3_x5F_midi, #of_x5F_vw3_x5F_mido, #of_x5F_vw3_x5F_rngo, #of_x5F_vw3_x5F_rngi, #of_x5F_vw3_x5F_pnko, #of_x5F_vw3_x5F_pnki, #of_x5F_vw3_x5F_plm, #of_x5F_vw3_x5F_wlt, #of_x5F_vw3_x5F_bnd, #of_x5F_vw3_x5F_stch, #of_x5F_vw3_x5F_web, #of_x5F_vw3_x5F_lce, #of_x5F_open_x5F_back'
      );

      g.forEach(function (el: any, i: any) {
        const p = [
          'of_x5F_vw3_x5F_wst',
          'of_x5F_vw3_x5F_logo',
          'of_x5F_vw3_x5F_indo',
          'of_x5F_vw3_x5F_indi',
          'of_x5F_vw3_x5F_midi',
          'of_x5F_vw3_x5F_mido',
          'of_x5F_vw3_x5F_rngo',
          'of_x5F_vw3_x5F_rngi',
          'of_x5F_vw3_x5F_pnko',
          'of_x5F_vw3_x5F_pnki',
          'of_x5F_vw3_x5F_plm',
          'of_x5F_vw3_x5F_wlt',
          'of_x5F_vw3_x5F_bnd',
          'of_x5F_vw3_x5F_stch',
          'of_x5F_vw3_x5F_web',
          'of_x5F_vw3_x5F_lce',
          'of_x5F_open_x5F_back',
        ];
        const layer = p[i];

        if (_.includes(layer, 'stch')) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: '#FFFAFA' });
        }

        self.oView.add(el);
        self.svgMain.append(self.oView);
        // self.defaultColor();
      });
    });

    Snap.load(`${environment.imgSrc}assets/images/nys_outfield_inside_view.svg`, (f: any) => {
      this.svgInside.attr({ viewBox: '0 0 400 400' });
      // this.gloveCloneInsideVertical.attr({ viewBox: "0 0 400 400" });
      const g = f.selectAll(
        '#of_x5F_vw2_x5F_thbo, #of_x5F_vw2_x5F_thbi, #of_x5F_vw2_x5F_plm, #of_x5F_vw2_x5F_indo, #of_x5F_vw2_x5F_indi, #of_x5F_vw2_x5F_mido, #of_x5F_vw2_x5F_rngo, #of_x5F_vw2_x5F_rngi, #of_x5F_vw2_x5F_pnki, #of_x5F_vw2_x5F_pnko, #of_x5F_vw2_x5F_wlt, #of_x5F_vw2_x5F_web, #of_x5F_vw2_x5F_bnd, #of_x5F_vw2_x5F_stch, #of_x5F_vw2_x5F_lce, #of_x5F_open_x5F_pocket'
      );

      g.forEach((el: any, i: any) => {
        const p = [
          'of_x5F_vw2_x5F_thbo',
          'of_x5F_vw2_x5F_thbi',
          'of_x5F_vw2_x5F_plm',
          'of_x5F_vw2_x5F_indo',
          'of_x5F_vw2_x5F_indi',
          'of_x5F_vw2_x5F_mido',
          'of_x5F_vw2_x5F_rngo',
          'of_x5F_vw2_x5F_rngi',
          'of_x5F_vw2_x5F_pnki',
          'of_x5F_vw2_x5F_pnko',
          'of_x5F_vw2_x5F_wlt',
          'of_x5F_vw2_x5F_web',
          'of_x5F_vw2_x5F_bnd',
          'of_x5F_vw2_x5F_stch',
          'of_x5F_vw2_x5F_lce',
          'of_x5F_open_x5F_pocket',
        ];
        const layer = p[i];

        if (_.includes(layer, 'stch')) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: '#FFFAFA' });
        }

        self.iView.add(el);
        self.svgInside.append(self.iView);
      });
      document.getElementById('of_x5F_vw2_x5F_stch')!.style.fill = 'none';
    });

    Snap.load(`${environment.imgSrc}assets/images/nys_outfield_side_view.svg`, (f: any) => {
      this.svgSide.attr({ viewBox: '0 0 400 400' });
      // this.gloveCloneSideVertical.attr({ viewBox: "0 0 400 400" });
      const g = f.selectAll(
        '#of_x5F_vw1_x5F_wst,#of_x5F_vw1_x5F_logo, #of_x5F_vw1_x5F_thbi, #of_x5F_vw1_x5F_thbo, #of_x5F_vw1_x5F_indo, #of_x5F_vw1_x5F_plm,#of_x5F_vw1_x5F_web, #of_x5F_vw1_x5F_bnd, #of_x5F_vw1_x5F_wlt, #of_x5F_vw1_x5F_stch, #of_x5F_vw1_x5F_lce, #of_x5F_side_x5F_view'
      );

      g.forEach((el: any, i: any) => {
        const p = [
          'of_x5F_vw1_x5F_wst',
          'of_x5F_vw1_x5F_logo',
          'of_x5F_vw1_x5F_thbi',
          'of_x5F_vw1_x5F_thbo',
          'of_x5F_vw1_x5F_indo',
          'of_x5F_vw1_x5F_plm',
          'of_x5F_vw1_x5F_web',
          'of_x5F_vw1_x5F_bnd',
          'of_x5F_vw1_x5F_wlt',
          'of_x5F_vw1_x5F_stch',
          'of_x5F_vw1_x5F_lce',
          'of_x5F_side_x5F_view',
        ];
        const layer = p[i];

        if (_.includes(layer, 'stch')) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: '#FFFAFA' });
        }

        self.sView.add(el);
        self.svgSide.append(self.sView);
        // self.defaultColor();
      });
      document.getElementById('of_x5F_vw1_x5F_stch')!.style.fill = 'none';
    });
  }

  // ** Loads infield glove canvas */
  loadInfield() {
    const self = this;

    Snap.load(`${environment.imgSrc}assets/images/nys_infield_swelt_back.svg`, (f: any) => {
      this.svgMain.attr({ viewBox: '0 -10 400 400' });

      const g = f.selectAll(
        '#inf_x5F_vw3_x5F_wst, #inf_x5F_vw3_x5F_thbi, #inf_x5F_vw3_x5F_web, #inf_x5F_vw3_x5F_indo, #inf_x5F_vw3_x5F_plm, #inf_x5F_vw3_x5F_indi, #inf_x5F_vw3_x5F_midi, #inf_x5F_vw3_x5F_mido, #inf_x5F_vw3_x5F_rngo, #inf_x5F_vw3_x5F_rngi, #inf_x5F_vw3_x5F_pnko, #inf_x5F_vw3_x5F_pnki, #inf_x5F_vw3_x5F_logo, #inf_x5F_vw3_x5F_wlt, #inf_x5F_vw3_x5F_stch, #inf_x5F_vw3_x5F_bnd, #inf_x5F_vw3_x5F_lce, #inf_x5F_open_x5F_back,#inf_x5F_vw3_x5F_rise,#inf_x5F_vw3_x5F_elite,#inf_x5F_logo_x5F_elite,#inf_x5F_logo_x5F_rise'
      );
      g.forEach((el: any, i: any) => {
        const p = [
          'inf_x5F_vw3_x5F_wst',
          'inf_x5F_vw3_x5F_thbi',
          'inf_x5F_vw3_x5F_web',
          'inf_x5F_vw3_x5F_indo',
          'inf_x5F_vw3_x5F_plm',
          'inf_x5F_vw3_x5F_indi',
          'inf_x5F_vw3_x5F_midi',
          'inf_x5F_vw3_x5F_mido',
          'inf_x5F_vw3_x5F_rngo',
          'inf_x5F_vw3_x5F_rngi',
          'inf_x5F_vw3_x5F_pnko',
          'inf_x5F_vw3_x5F_pnki',
          'inf_x5F_vw3_x5F_logo',
          'inf_x5F_vw3_x5F_wlt',
          'inf_x5F_vw3_x5F_stch',
          'inf_x5F_vw3_x5F_bnd',
          'inf_x5F_vw3_x5F_lce',
          'inf_x5F_open_x5F_back',
          'inf_x5F_vw3_x5F_rise',
          'inf_x5F_vw3_x5F_elite',
          'inf_x5F_logo_x5F_elite',
          'inf_x5F_logo_x5F_rise',
        ];
        const layer = p[i];
        const filter = layer.split('_').pop();

        // Apply default fills & add to group
        if (_.includes(layer, 'stch')) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: '#FFFAFA' });
        }

        if (filter === 'rise' || filter === 'elite') {
          el.attr({ opacity: 0 });
          if (self.leatherType === 'steer' && filter === 'rise') {
            if (el.length !== 0) {
              el.attr({ opacity: 1, fill: '#FFFAFA' });
            }
          } else {
            if (el.length !== 0) {
              el.attr({ opacity: 1, fill: '#FFFAFA' });
            }
          }

          this.setSeriesOnGlove(filter, el);
        }

        self.oView.add(el);
        self.svgMain.append(self.oView);
      });
      //document.getElementById('inf_x5F_vw3_x5F_stch')!.style.fill = 'none';
    });

    Snap.load(`${environment.imgSrc}assets/images/nys_infield_swelt_pocket.svg`, (f: any) => {
      this.svgInside.attr({ viewBox: '0 -10 400 400' });
      // this.gloveCloneInsideVertical.attr({ viewBox: "0 0 400 400" });
      const g = f.selectAll(
        '#inf_x5F_vw2_x5F_plm, #inf_x5F_vw2_x5F_thbo, #inf_x5F_vw2_x5F_thbi, #inf_x5F_vw2_x5F_indo, #inf_x5F_vw2_x5F_indi,#inf_x5F_vw2_x5F_midi,#inf_x5F_vw2_x5F_mido,#inf_x5F_vw2_x5F_rngo,#inf_x5F_vw2_x5F_rngi,#inf_x5F_vw2_x5F_pnki,#inf_x5F_vw2_x5F_pnko, #inf_x5F_vw2_x5F_web, #inf_x5F_vw2_x5F_stch, #inf_x5F_vw2_x5F_bnd , #inf_x5F_vw2_x5F_wlt, #inf_x5F_vw2_x5F_lce, #inf_x5F_open_x5F_pocket'
      );
      g.forEach((el: any, i: any) => {
        const p = [
          'inf_x5F_vw2_x5F_plm',
          'inf_x5F_vw2_x5F_thbo',
          'inf_x5F_vw2_x5F_thbi',
          'inf_x5F_vw2_x5F_indo',
          'inf_x5F_vw2_x5F_indi',
          'inf_x5F_vw2_x5F_midi',
          'inf_x5F_vw2_x5F_mido',
          'inf_x5F_vw2_x5F_rngo',
          'inf_x5F_vw2_x5F_rngi',
          'inf_x5F_vw2_x5F_pnki',
          'inf_x5F_vw2_x5F_pnko',
          'inf_x5F_vw2_x5F_web',
          'inf_x5F_vw2_x5F_stch',
          'inf_x5F_vw2_x5F_bnd',
          'inf_x5F_vw2_x5F_wlt',
          'inf_x5F_vw2_x5F_lce',
          'inf_x5F_open_x5F_pocket',
        ];
        const layer = p[i];

        // Apply default fills & add to group
        if (_.includes(layer, 'stch')) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: '#fffafa' });
        }

        self.iView.add(el);
        self.svgInside.append(this.iView);

      });
      document.getElementById('inf_x5F_vw2_x5F_stch')!.style.fill = 'none';
    });

    Snap.load(`${environment.imgSrc}assets/images/nys_infield_swelt_side.svg`, (f: any) => {
      this.svgSide.attr({ viewBox: '-60 0 400 400' });
      // this.gloveCloneSideVertical.attr({ viewBox: "0 0 400 400" });
      const g = f.selectAll(
        '#inf_x5F_vw1_x5F_thbi, #inf_x5F_vw1_x5F_mid, #inf_x5F_vw1_x5F_indi, #inf_x5F_vw1_x5F_wst, #inf_x5F_vw1_x5F_plm, #inf_x5F_vw1_x5F_bnd, #inf_x5F_vw1_x5F_indo, #inf_x5F_vw1_x5F_thbo, #inf_x5F_vw1_x5F_wlt, #inf_x5F_vw1_x5F_web, #inf_x5F_vw1_x5F_stch,  #inf_x5F_vw1_x5F_lce, #inf_x5F_open_x5F_side'
      );

      g.forEach((el: any, i: any) => {
        const p = [
          'inf_x5F_vw1_x5F_thbi',
          'inf_x5F_vw1_x5F_mid',
          'inf_x5F_vw1_x5F_indi',
          'inf_x5F_vw1_x5F_wst',
          'inf_x5F_vw1_x5F_plm',
          'inf_x5F_vw1_x5F_bnd',
          'inf_x5F_vw1_x5F_indo',
          'inf_x5F_vw1_x5F_thbo',
          'inf_x5F_vw1_x5F_wlt',
          'inf_x5F_vw1_x5F_web',
          'inf_x5F_vw1_x5F_stch',
          'inf_x5F_vw1_x5F_lce',
          'inf_x5F_open_x5F_side',
        ];
        const layer = p[i];

        // Apply default fills & add to group
        if (_.includes(layer, 'stch')) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: '#FFFAFA' });
        }

        self.sView.add(el);
        self.svgSide.append(self.sView);
      });
      document.getElementById('inf_x5F_vw1_x5F_stch')!.style.fill = 'none';
    });
  }

  // ** Loads first base mitt canvas */
  loadFbase() {
    const self = this;
    Snap.load(`${environment.imgSrc}assets/images/nys_fbase_back_view.svg`, function (f: any) {
      self.svgMain.attr({ viewBox: '0 -10 400 400' });
      // self.gloveCloneMainVertical.attr({viewBox:"0 0 400 400"});
      const g = f.selectAll(
        '#fbase_x5F_vw3_x5F_thb, #fbase_x5F_vw3_x5F_bfg, #fbase_x5F_vw3_x5F_plm, #fbase_x5F_vw3_x5F_utoe, #fbase_x5F_vw3_x5F_wst, #fbase_x5F_vw3_x5F_logo, #fbase_x5F_vw3_x5F_web, #fbase_x5F_vw3_x5F_stch, #fbase_x5F_vw3_x5F_bnd, #fbase_x5F_vw3_x5F_lce, #fbase_x5F_vw3_x5F_rise, #fbase_x5F_vw3_x5F_elite, #fbase_x5F_open_x5F_back, #fbase_x5F_logo_x5F_elite, #fbase_x5F_logo_x5F_rise'
      );
      g.forEach(function (el: any, i: any) {
        const p = [
          'fbase_x5F_vw3_x5F_thb',
          'fbase_x5F_vw3_x5F_bfg',
          'fbase_x5F_vw3_x5F_plm',
          'fbase_x5F_vw3_x5F_utoe',
          'fbase_x5F_vw3_x5F_wst',
          'fbase_x5F_vw3_x5F_logo',
          'fbase_x5F_vw3_x5F_web',
          'fbase_x5F_vw3_x5F_stch',
          'fbase_x5F_vw3_x5F_bnd',
          'fbase_x5F_vw3_x5F_lce',
          'fbase_x5F_vw3_x5F_rise',
          'fbase_x5F_vw3_x5F_elite',
          'fbase_x5F_open_x5F_back',
          'fbase_x5F_logo_x5F_elite',
          'fbase_x5F_logo_x5F_rise',
        ];
        const layer = p[i];
        const filter = layer.split('_').pop();

        // Apply default fills & add to group
        if (_.includes(layer, 'stch')) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: '#FFFAFA' });
        }

        if (filter === 'rise' || filter === 'elite') {
          el.attr({ opacity: 0 });
          self.setSeriesOnGlove(filter, el);
        }
        self.oView.add(el);
        self.svgMain.append(self.oView);
      });
    });

    Snap.load(`${environment.imgSrc}assets/images/nys_fbase_inside_view.svg`, function (f: any) {
      self.svgInside.attr({ viewBox: '0 -10 400 400' });
      // self.gloveCloneInsideVertical.attr({viewBox:"0 0 400 400"});
      const g = f.selectAll(
        '#fbase_x5F_vw2_x5F_plm, #fbase_x5F_vw2_x5F_bnd, #fbase_x5F_vw2_x5F_web, #fbase_x5F_vw2_x5F_stch, #fbase_x5F_vw2_x5F_lce, #fbase_x5F_open_x5F_pocket'
      );

      g.forEach(function (el: any, i: any) {
        const p = [
          'fbase_x5F_vw2_x5F_plm',
          'fbase_x5F_vw2_x5F_bnd',
          'fbase_x5F_vw2_x5F_web',
          'fbase_x5F_vw2_x5F_stch',
          'fbase_x5F_vw2_x5F_lce',
          'fbase_x5F_open_x5F_pocket',
        ];
        const layer = p[i];

        // Apply default fills & add to group
        if (_.includes(layer, 'stch')) {
          el.attr({ fill: 'none' });
          el.attr({ stroke: '#FFFAFA' });
        } else {
          el.attr({ fill: '#FFFAFA' });
        }
        self.iView.add(el);
        self.svgInside.append(self.iView);
      });
    });

    Snap.load(`${environment.imgSrc}assets/images/nys_fbase_side_view.svg`, function (f: any) {
      self.svgSide.attr({ viewBox: '-10 0 400 400' });
      // self.gloveCloneSideVertical.attr({viewBox:"0 0 400 400"});
      const g = f.selectAll(
        '#fbase_x5F_vw1_x5F_wst, #fbase_x5F_vw1_x5F_logo, #fbase_x5F_vw1_x5F_plm, #fbase_x5F_vw1_x5F_thb, #fbase_x5F_vw1_x5F_bfg, #fbase_x5F_vw1_x5F_utoe, #fbase_x5F_vw1_x5F_web, #fbase_x5F_vw1_x5F_stch, #fbase_x5F_vw1_x5F_bnd, #fbase_x5F_vw1_x5F_lce, #fbase_x5F_side_x5F_view'
      );

      g.forEach(function (el: any, i: any) {
        const p = [
          'fbase_x5F_vw1_x5F_wst',
          'fbase_x5F_vw1_x5F_logo',
          'fbase_x5F_vw1_x5F_plm',
          'fbase_x5F_vw1_x5F_thb',
          'fbase_x5F_vw1_x5F_bfg',
          'fbase_x5F_vw1_x5F_utoe',
          'fbase_x5F_vw1_x5F_web',
          'fbase_x5F_vw1_x5F_stch',
          'fbase_x5F_vw1_x5F_bnd',
          'fbase_x5F_vw1_x5F_lce',
          'fbase_x5F_side_x5F_view',
        ];
        const layer = p[i];

        // Apply default fills & add to group
        if (_.includes(layer, 'stch')) {
          el.attr({ fill: 'none' });
          el.attr({ stroke: '#FFFAFA' });
        } else {
          el.attr({ fill: '#FFFAFA' });
        }

        self.sView.add(el);
        self.svgSide.append(self.sView);
      });
    });
  }

  // ** Loads fastback catcher mitt canvas */
  loadCatcherFB() {
    const self = this;
    Snap.load(`${environment.imgSrc}assets/images/nys_catcher_fastback_back.svg`, (f: any) => {
      this.svgMain.attr({ viewBox: '0 0 400 400' });
      const g = f.selectAll(
        '#catcher-fastback_x5F_vw3_x5F_utoe, #catcher-fastback_x5F_vw3_x5F_thb, #catcher-fastback_x5F_vw3_x5F_logo, #catcher-fastback_x5F_vw3_x5F_mid, #catcher-fastback_x5F_vw3_x5F_bfg, #catcher-fastback_x5F_vw3_x5F_plm, #catcher-fastback_x5F_vw3_x5F_wlt ,#catcher-fastback_x5F_vw3_x5F_stch, #catcher-fastback_x5F_vw3_x5F_bnd, #catcher-fastback_x5F_vw3_x5F_web, #catcher-fastback_x5F_vw3_x5F_lce, #catcher-fastback_x5F_vw3_x5F_fpad, #catcher-fastback_x5F_fastback_x5F_back'
      );
      g.forEach(function (el: any, i: any) {
        const p = [
          'catcher-fastback_x5F_vw3_x5F_utoe',
          'catcher-fastback_x5F_vw3_x5F_thb',
          '#catcher-fastback_x5F_vw3_x5F_logo',
          '#catcher-fastback_x5F_vw3_x5F_mid',
          'catcher-fastback_x5F_vw3_x5F_bfg',
          '#catcher-fastback_x5F_vw3_x5F_plm',
          '#catcher-fastback_x5F_vw3_x5F_wlt',
          '#catcher-fastback_x5F_vw3_x5F_stch',
          'catcher-fastback_x5F_vw3_x5F_bnd',
          'catcher-fastback_x5F_vw3_x5F_web',
          'catcher-fastback_x5F_vw3_x5F_lce',
          'catcher-fastback_x5F_vw3_x5F_fpad',
          'catcher-fastback_x5F_fastback_x5F_back',
        ];
        const layer = p[i];

        // Apply default fills & add to group
        if (_.includes(layer, 'stch')) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: '#FFFAFA' });
        }

        // Apply default fills & add to group
        self.oView.add(el);
        self.svgMain.append(self.oView);
        // self.defaultColor();
      });
    });

    Snap.load(
      `${environment.imgSrc}assets/images/nys_catcher_fastback_inside_view.svg`,
      (f: any) => {
        this.svgInside.attr({ viewBox: '0 0 400 400' });
        const g = f.selectAll(
          '#catcher-fastback_x5F_vw2_x5F_plm, #catcher-fastback_x5F_vw2_x5F_web, #catcher-fastback_x5F_vw2_x5F_tgt, #catcher-fastback_x5F_vw2_x5F_stch, #catcher-fastback_x5F_vw2_x5F_bnd, #catcher-fastback_x5F_vw2_x5F_lce, #catcher-fastback_x5F_pocket_x5F_view, #catcher-fastback_x5F_vw2_x5F_rse, #catcher-fastback_x5F_rise_x5F_logo'
        );

        g.forEach((el: any, i: any) => {
          const p = [
            'catcher-fastback_x5F_vw2_x5F_plm',
            'catcher-fastback_x5F_vw2_x5F_web',
            'catcher-fastback_x5F_vw2_x5F_tgt',
            'catcher-fastback_x5F_vw2_x5F_stch',
            'catcher-fastback_x5F_vw2_x5F_bnd',
            'catcher-fastback_x5F_vw2_x5F_lce',
            'catcher-fastback_x5F_pocket_x5F_view',
            'catcher-fastback_x5F_vw2_x5F_rse',
            'catcher-fastback_x5F_rise_x5F_logo',
          ];
          const layer = p[i];

          // Apply default fills & add to group
          if (_.includes(layer, 'stch')) {
            el.attr({ fill: 'none' });
            el.attr({ stroke: '#FFFAFA' });
          } else {
            el.attr({ fill: '#FFFAFA' });
          }

          self.iView.add(el);
          self.svgInside.append(self.iView);
          // self.defaultColor();
        });
      }
    );

    Snap.load(`${environment.imgSrc}assets/images/nys_catcher_fastback_side.svg`, (f: any) => {
      this.svgSide.attr({ viewBox: '0 0 400 400' });
      const g = f.selectAll(
        '#catcher-fastback_x5F_vw1_x5F_thb, #catcher-fastback_x5F_vw1_x5F_logo, #catcher-fastback_x5F_vw1_x5F_utoe, #catcher-fastback_x5F_vw1_x5F_wlt, #catcher-fastback_x5F_vw1_x5F_web, #catcher-fastback_x5F_vw1_x5F_bnd, #catcher-fastback_x5F_vw1_x5F_plm, #catcher-fastback_x5F_vw1_x5F_stch, #catcher-fastback_x5F_vw1_x5F_blt, #catcher-fastback_x5F_vw1_x5F_lce, #catcher-fastback_x5F_vw1_x5F_fastback_x5F_side'
      );

      g.forEach((el: any, i: any) => {
        const p = [
          'catcher-fastback_x5F_vw1_x5F_thb',
          'catcher-fastback_x5F_vw1_x5F_logo',
          'catcher-fastback_x5F_vw1_x5F_utoe',
          'catcher-fastback_x5F_vw1_x5F_wlt',
          'catcher-fastback_x5F_vw1_x5F_web',
          'catcher-fastback_x5F_vw1_x5F_bnd',
          'catcher-fastback_x5F_vw1_x5F_plm',
          'catcher-fastback_x5F_vw1_x5F_stch',
          'catcher-fastback_x5F_vw1_x5F_blt',
          'catcher-fastback_x5F_vw1_x5F_lce',
          'catcher-fastback_x5F_vw1_x5F_fastback_x5F_side',
        ];
        const layer = p[i];

        // Apply default fills & add to group
        if (_.includes(layer, 'stch')) {
          el.attr({ fill: 'none' });
          el.attr({ stroke: '#FFFAFA' });
        } else {
          el.attr({ fill: '#FFFAFA' });
        }

        // Apply default fills & add to group
        self.sView.add(el);
        self.svgSide.append(self.sView);
        // self.defaultColor();
        // self.gloveCloneSideVertical.append(self.svgSide.clone(self.sView));
      });
    });
  }

  // ** Loads dual welt infield canvas */
  loadInfield2Welt() {
    const self = this;

    Snap.load(`${environment.imgSrc}assets/images/nys_infield_dwelt_back.svg`, (f: any) => {
      this.svgMain.attr({ viewBox: '0 0 400 400' });

      const g = f.selectAll(
        '#inf_dw_x5F_vw3_x5F_bfg, #inf_dw_x5F_vw3_x5F_mid, #inf_dw_x5F_vw3_x5F_wst, #inf_dw_x5F_vw3_x5F_wlt, #inf_dw_x5F_vw3_x5F_bnd, #inf_dw_x5F_vw3_x5F_logo, #inf_dw_x5F_vw3_x5F_web, #inf_dw_x5F_vw3_x5F_plm, #inf_dw_x5F_vw3_x5F_stch, #inf_dw_x5F_vw3_x5F_lce, #inf_dw_x5F_dwelt_x5F_back, #inf_dw_x5F_vw3_x5F_rse, inf_dw_x5F_vw3_x5F_elt, inf_dw_x5F_elite_x5F_logo, inf_dw_x5F_rise_x5F_logo'
      );
      g.forEach((el: any, i: any) => {
        const p = [
          'inf_dw_x5F_vw3_x5F_bfg',
          'inf_dw_x5F_vw3_x5F_mid',
          'inf_dw_x5F_vw3_x5F_wst',
          'inf_dw_x5F_vw3_x5F_wlt',
          'inf_dw_x5F_vw3_x5F_bnd',
          'inf_dw_x5F_vw3_x5F_logo',
          'inf_dw_x5F_vw3_x5F_web',
          'inf_dw_x5F_vw3_x5F_plm',
          'inf_dw_x5F_vw3_x5F_stch',
          'inf_dw_x5F_vw3_x5F_lce',
          'inf_dw_x5F_dwelt_x5F_back',
          'inf_dw_x5F_vw3_x5F_rse',
          'inf_dw_x5F_vw3_x5F_elt',
          'inf_dw_x5F_elite_x5F_logo',
          'inf_dw_x5F_rise_x5F_logo',
        ];
        const layer = p[i];
        const filter = layer.split('_').pop();

        if (_.includes(layer, 'stch')) {
          el.attr({ fill: 'none' });
          el.attr({ stroke: '#FFFAFA' });
        } else {
          el.attr({ fill: '#FFFAFA' });
        }

        if (filter === 'rise' || filter === 'elite' || filter === 'rse') {
          el.attr({ opacity: 0 });
          this.setSeriesOnGlove(filter, el);
        }

        self.oView.add(el);
        self.svgMain.append(self.oView);
      });
    });

    Snap.load(`${environment.imgSrc}assets/images/nys_infield_dwelt_pocket.svg`, (f: any) => {
      this.svgInside.attr({ viewBox: '0 0 400 400' });
      // this.gloveCloneInsideVertical.attr({ viewBox: "0 0 400 400" });
      const g = f.selectAll(
        '#inf_dw_x5F_vw2_x5F_web, #inf_dw_x5F_vw2_x5F_plm, #inf_dw_x5F_vw2_x5F_mid, #inf_dw_x5F_vw2_x5F_bfg, #inf_dw_x5F_vw2_x5F_wlt, #inf_dw_x5F_vw2_x5F_bnd,#inf_dw_x5F_vw2_x5F_stch, #inf_dw_x5F_vw2_x5F_lce, #inf_dw_x5F_dwelt_x5F_inside'
      );
      g.forEach((el: any, i: any) => {
        const p = [
          'inf_dw_x5F_vw2_x5F_web',
          'inf_dw_x5F_vw2_x5F_plm',
          'inf_dw_x5F_vw2_x5F_mid',
          'inf_dw_x5F_vw2_x5F_bfg',
          'inf_dw_x5F_vw2_x5F_wlt',
          'inf_dw_x5F_vw2_x5F_bnd',
          'inf_dw_x5F_vw2_x5F_stch',
          'inf_dw_x5F_vw2_x5F_lce',
          'inf_dw_x5F_dwelt_x5F_inside',
        ];
        const layer = p[i];
        if (_.includes(layer, 'stch')) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: '#FFFAFA' });
        }

        self.iView.add(el);
        self.svgInside.append(this.iView);
        // self.defaultColor();
      });
    });

    Snap.load(`${environment.imgSrc}assets/images/nys_infield_dwelt_side.svg`, (f: any) => {
      this.svgSide.attr({ viewBox: '0 0 400 400' });
      // this.gloveCloneSideVertical.attr({ viewBox: "0 0 400 400" });
      // tslint:disable-next-line: max-line-length
      const g = f.selectAll(
        '#inf_dw_x5F_vw1_x5F_plm, #inf_dw_x5F_vw1_x5F_bfg, #inf_dw_x5F_vw1_x5F_mid, #inf_dw_x5F_vw1_x5F_wlt, #inf_dw_x5F_vw1_x5F_web, #inf_dw_x5F_vw1_x5F_wst, #inf_dw_x5F_vw1_x5F_stch, #inf_dw_x5F_vw1_x5F_bnd, #inf_dw_x5F_vw1_x5F_lce, #inf_dw_x5F_vw1_x5F_logo, #inf_dw_x5F_dwelt_x5F_side'
      );

      g.forEach((el: any, i: any) => {
        // tslint:disable-next-line: max-line-length
        const p = [
          'inf_dw_x5F_vw1_x5F_plm',
          'inf_dw_x5F_vw1_x5F_bfg',
          'inf_dw_x5F_vw1_x5F_mid',
          'inf_dw_x5F_vw1_x5F_wlt',
          'inf_dw_x5F_vw1_x5F_web',
          'inf_dw_x5F_vw1_x5F_wst',
          'inf_dw_x5F_vw1_x5F_stch',
          'inf_dw_x5F_vw1_x5F_bnd',
          'inf_dw_x5F_vw1_x5F_lce',
          'inf_dw_x5F_vw1_x5F_logo, inf_dw_x5F_dwelt_x5F_side',
        ];
        const layer = p[i];
        if (_.includes(layer, 'stch')) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: '#FFFAFA' });
        }

        self.sView.add(el);
        self.svgSide.append(self.sView);
      });
    });
  }

  // ** Loads pitcher glove canvas */
  loadPitcher() {
    const self = this;

    // tslint:disable-next-line: only-arrow-functions
    Snap.load(`${environment.imgSrc}assets/images/nys_pitcher_open_back.svg`, function (f: any) {
      self.svgMain.attr({ viewBox: '0 0 400 400' });
      const g = f.selectAll(
        ' #pitcher_x5F_vw3_x5F_wst, #pitcher_x5F_vw3_x5F_logo, #pitcher_x5F_vw3_x5F_thbi, #pitcher_x5F_vw3_x5F_plm, #pitcher_x5F_vw3_x5F_web, #pitcher_x5F_vw3_x5F_indi, #pitcher_x5F_vw3_x5F_indo, #pitcher_x5F_vw3_x5F_mid, #pitcher_x5F_vw3_x5F_rngo, #pitcher_x5F_vw3_x5F_rngi, #pitcher_x5F_vw3_x5F_pnko, #pitcher_x5F_vw3_x5F_pnki, #pitcher_x5F_vw3_x5F_stch, #pitcher_x5F_vw3_x5F_wlt, #pitcher_x5F_vw3_x5F_bnd, #pitcher_x5F_vw3_x5F_bnd, #pitcher_x5F_vw3_x5F_lce, #pitcher_x5F_open_x5F_back,#pitcher_x5F_vw3_x5F_rse,#pitcher_x5F_vw3_x5F_elt,#pitcher_x5F_logo_x5F_elite,#pitcher_x5F_logo_x5F_rise'
      );
      g.forEach(function (el: any, i: any) {
        const p = [
          'pitcher_x5F_vw3_x5F_wst',
          'pitcher_x5F_vw3_x5F_logo',
          'pitcher_x5F_vw3_x5F_thbi',
          'pitcher_x5F_vw3_x5F_plm',
          'pitcher_x5F_vw3_x5F_web',
          'pitcher_x5F_vw3_x5F_indi',
          'pitcher_x5F_vw3_x5F_indo',
          'pitcher_x5F_vw3_x5F_mid',
          'pitcher_x5F_vw3_x5F_rngo',
          'pitcher_x5F_vw3_x5F_rngi',
          'pitcher_x5F_vw3_x5F_pnko',
          'pitcher_x5F_vw3_x5F_pnki',
          'pitcher_x5F_vw3_x5F_stch',
          'pitcher_x5F_vw3_x5F_wlt',
          'pitcher_x5F_vw3_x5F_bnd',
          'pitcher_x5F_vw3_x5F_bnd',
          'pitcher_x5F_vw3_x5F_lce',
          'pitcher_x5F_open_x5F_back',
          'pitcher_x5F_vw3_x5F_rse',
          'pitcher_x5F_vw3_x5F_elt',
          'pitcher_x5F_logo_x5F_elite',
          'pitcher_x5F_logo_x5F_rise',
        ];
        const layer = p[i];
        const filter = layer.split('_').pop();

        // Apply default fills & add to group
        if (_.includes(layer, 'stch')) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: '#FFFAFA' });
        }

        if (filter === 'rise' || filter === 'elite') {
          el.attr({ opacity: 0 });
          self.setSeriesOnGlove(filter, el);
        }

        self.oView.add(el);
        self.svgMain.append(self.oView);
        // self.defaultColor();
      });
    });

    // tslint:disable-next-line: only-arrow-functions
    Snap.load(`${environment.imgSrc}assets/images/nys_pitcher_side_view.svg`, function (f: any) {
      self.svgInside.attr({ viewBox: '0 0 400 400' });
      //self.gloveCloneSideVertical.attr({ viewBox: '0 0 400 400' });
      const g = f.selectAll(
        '#pitcher_x5F_vw1_x5F_lin,#pitcher_x5F_vw1_x5F_bfg,#pitcher_x5F_vw1_x5F_plm,#pitcher_x5F_vw1_x5F_web,#pitcher_x5F_vw1_x5F_wst,#pitcher_x5F_vw1_x5F_logo, #pitcher_x5F_vw1_x5F_wlt, #pitcher_x5F_vw1_x5F_bnd, #pitcher_x5F_vw1_x5F_stch, #pitcher_x5F_vw1_x5F_lce,#pitcher_x5F_open_x5F_side'
      );
      // tslint:disable-next-line: only-arrow-functions
      g.forEach(function (el: any, i: any) {
        const p = [
          'pitcher_x5F_vw1_x5F_lin',
          'pitcher_x5F_vw1_x5F_bfg',
          'pitcher_x5F_vw1_x5F_plm',
          'pitcher_x5F_vw1_x5F_web',
          'pitcher_x5F_vw1_x5F_wst',
          'pitcher_x5F_vw1_x5F_logo',
          'pitcher_x5F_vw1_x5F_wlt',
          'pitcher_x5F_vw1_x5F_bnd',
          'pitcher_x5F_vw1_x5F_stch',
          'pitcher_x5F_vw1_x5F_lce',
          'pitcher_x5F_open_x5F_side',
        ];
        const layer = p[i];

        // Apply default fills & add to group
        // self.defaultColor(p[i], el, self.iView);

        self.iView.add(el);
        self.svgInside.append(self.iView);
        // self.defaultColor();
      });
    });
  }
}
