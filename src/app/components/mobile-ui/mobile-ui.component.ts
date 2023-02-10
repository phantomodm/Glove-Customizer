import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { Observable, map } from 'rxjs';
import { CarouselTile, filterGloveWebs } from 'src/app/services/global.configs';
import { GloveApiService } from 'src/app/services/glove-api.service';
import { GloveDataService } from 'src/app/services/glove-data.service';
import { MobileService } from '../ui-components/mobile-navigation/mobile.service';

@Component({
  selector: 'app-mobile-ui',
  templateUrl: './mobile-ui.component.html',
  styleUrls: ['./mobile-ui.component.scss'],
})
export class MobileUiComponent implements OnInit, AfterViewInit {
  @ViewChild('mpersonalization') personalization!: ElementRef;
  @ViewChild('mcustomernotes') customernotes!: ElementRef;

  gloveType: any;
  color: any;
  webs: any;
  leatherSelected = 'steer';
  custom: any | undefined = {};
  options: any;
  options$!: Observable<any>;
  carouselTile = CarouselTile;
  currentTab = 0;

  lastDragPosX = 0;
  isDragging = false;
  lastPointerPosX = 0;


  constructor(
    private gloveApi: GloveApiService,
    private data: GloveDataService,
    private nav: MobileService
  ) {}

  ngAfterViewInit() {

  }

  ngOnInit(): void {

    this.nav.currentTab$.subscribe((n: number) => {
      this.currentTab = n;
      console.log(n)
    });
    this.gloveApi.leatherSelected$.subscribe((leatherSelected) => {
      this.leatherSelected = leatherSelected;
    });
    this.gloveApi.gloveType$.subscribe((result: any) => {
      this.gloveType = result;
    });
    this.data.getColors().subscribe((result: any) => {
      this.color = result;
    });
    this.data
      .getGloveWebs()
      .pipe(
        map((w: any) =>
          w.map((web: any) => {
            return { name: web.valueString, ...web };
          })
        )
      )
      .subscribe((result: any) => {
        this.webs = result;
      });

    this.gloveApi.gloveDesign$.subscribe((result: any) => {
      _.forEach(result, (v, k) => {
        _.forEach(v, (val, key) => {
          if (key === 'prompt') {
            _.map(val, (v, k) => {
              v.gloveInputs = _.filter(v.gloveInputs, (f) => {
                if (f.gloveType.includes(this.gloveType.glove) && f.active) {
                  return f;
                }
              });
            });
          }
        });
      });
      this.options = result;
      console.log(this.options);
    });

    this.gloveApi.gloveCustom$.subscribe((result: any) => {
      if (result != undefined) {
        this.custom = result;
      }
    });
  }

  addColorVariation(option: any, variation: any, i?: number) {
    const payload: any = {
      attribute: option.attribute_pewc,
      ...variation,
    };

    const index: number | undefined = i;
    this.custom[option.attribute_pewc] = variation.name;
    console.log(this.custom);
    this.gloveApi.gloveCustom.next(this.custom);

    // if (this.custom.length > 0) {
    //   if(index != undefined){
    //     this.custom[index]= variation.name;
    //   }
    // }else{
    //   console.log('Adding to array');
    //   this.custom.push( variation.name );
    // }

    // /**Save to Local Storage */
    // const newCustom = _.cloneDeep(this.custom);
    // localStorage.setItem('glove-customization', JSON.stringify(newCustom));

    /** Apply form value and apply fill to glove designer */
    this.gloveApi.applyFormValue({
      attribute_pewc: payload.attribute,
      name: payload.name,
    });
    this.gloveApi.applyFilltoCanvas({
      section: option.glovePart,
      hex: variation.hex,
      rgb: variation.rgb,
    });
  }

  addPersonalization(payload: any) {
    let name = this.personalization.nativeElement.value;
    const attribute = payload.attribute_pewc;
    this.gloveApi.applyFormValue({ attribute_pewc: attribute, name });
  }

  addOrderNote(payload: any) {
    let name = this.customernotes.nativeElement.value;
    const attribute = payload.attribute_pewc;
    this.gloveApi.applyFormValue({ attribute_pewc: attribute, name });
  }

  addVariation(payload: any) {
    this.gloveApi.applyFormValue(payload);
  }

  colorFilter(glovePart: string, db?: any) {
    const id = glovePart;
    let colors: any = [];
    this.color.forEach((c: any) => {
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
    //console.log(colors)
    return colors;
  }

  filterWebs() {
    return filterGloveWebs(this.webs, this.gloveType);
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

  selectWeb(payload: {}) {
    console.log(payload);
  }

  showTab(n: number) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName(
      'tab'
    ) as HTMLCollectionOf<HTMLElement>;
    let prev = document.getElementById('m-prevBtn') as HTMLElement;
    let next = document.getElementById('m-nextBtn') as HTMLElement;

    x[n].style.display = 'block';
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
      prev.style.display = 'none';
    } else {
      prev.style.display = 'inline';
    }
    if (n == x.length - 1) {
      next.style.display = 'none';
    } else {
    }
    // ... and run a function that displays the correct step indicator:
  }

  triggerAddToCart() {
    this.gloveApi.triggerAddToCart();
  }

  initDraggableContainer(){
    //   document.documentElement.style.scrollBehavior = "smooth";
  //   this.dragElement(document.getElementById("draggable-container-"+this.currentTab));
  //   let hammertime = new Hammer(document.getElementById("draggable-container-"+this.currentTab)!);
  //   hammertime.add(new Hammer.Pan({ velocity: 0.2, threshold: 10 }));
  //   hammertime.on('pan', (ev:any) => {
  //     const el = document.getElementById("draggable-container-"+this.currentTab)!;

  //     if(!this.isDragging){
  //       this.lastDragPosX = el.offsetLeft;
  //     }
  //     let posx = ev.deltaX + this.lastDragPosX;

  //     if (posx > -552 && posx < el.offsetWidth/2) {
  //       //el.style.left = posx + 'px';
  //       el.animate({left: posx + 'px'}, {duration: 1000, fill: 'forwards', easing: 'ease'});
  //     }

  //     if(ev.isFinal){
  //       this.isDragging = false;
  //     }

  //   });
  // }

  // dragElement(elmnt:any) {
  //   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  //   if (document.getElementById(elmnt.id + "header")) {
  //     // if present, the header is where you move the DIV from:
  //     document.getElementById(elmnt.id + "header")!.onmousedown = dragMouseDown;
  //   } else {
  //     // otherwise, move the DIV from anywhere inside the DIV:
  //     elmnt.onmousedown = dragMouseDown;
  //   }

  //   function dragMouseDown(e:any) {
  //     e = e || window.event;
  //     e.preventDefault();
  //     // get the mouse cursor position at startup:
  //     pos3 = e.clientX;

  //     document.onmouseup = closeDragElement;
  //     // call a function whenever the cursor moves:
  //     document.onmousemove = elementDrag;
  //   }

  //   function elementDrag(e:any) {
  //     e = e || window.event;
  //     e.preventDefault();
  //     // calculate the new cursor position:
  //     pos1 = pos3 - e.clientX;
  //     pos3 = e.clientX;
  //     console.log(pos1);
  //     // set the element's new position:
  //     if(elmnt.offsetLeft - pos1 > -600 && pos1 < elmnt.offsetWidth/2){
  //       //elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  //       elmnt.animate({ left: (elmnt.offsetLeft - pos1) + "px" }, { duration: 1, fill: 'forwards', easing: 'ease' });
  //     }
  //     // elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
  //     // elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  //     console.log(elmnt.scrollLeft);
  //   }

  //   function closeDragElement() {
  //     // stop moving when mouse button is released:
  //     document.onmouseup = null;
  //     document.onmousemove = null;
  //   }
  }
}

