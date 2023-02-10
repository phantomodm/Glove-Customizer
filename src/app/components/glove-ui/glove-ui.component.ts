import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbAccordionConfig, NgbAccordion, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { GloveApiService } from 'src/app/services/glove-api.service';

declare var jQuery: any;
export interface Custom {
  hex: string;
  value: string;
}

export interface GlovePart {
  label: string;
  attribute_pewc: string;
  attribute_wp: string;
  fingerId: string;
  gloveType: string[];
  imgPrefix: string;
}

@Component({
  selector: 'app-glove-ui',
  templateUrl: './glove-ui.component.html',
  styleUrls: ['./glove-ui.component.scss'],
  providers: [NgbAccordionConfig],
})

export class GloveUiComponent implements OnInit, AfterViewInit {
  @ViewChild('buttonUi') buttonUi!: NgbAccordion;
  @ViewChild('personalization') personalization!: ElementRef;
  options$!: Observable<any>;
  leatherSelected!: string;
  custom:any = [];
  gloveType: any;
  accordionIds = [];
  activeIds: any;

  lastItemSelected: any;
  domResponse: any = {};

  steps!: string[];

  webs!: {
    gloveType: string[];
    id: string;
    imageUrl: string;
    value: string;
    valueString: string;
  }[];
  options: any;


  constructor(
    private gloveApi: GloveApiService,
    private tooltip: NgbTooltipConfig,
    private afs: AngularFirestore,
    private sanitizer: DomSanitizer

  ) {

    this.tooltip.placement = 'right'
    this.tooltip.triggers = 'hover';
    // if(localStorage.getItem('glove-customization')){

    // }

    // this.gloveApi.storage$
    //   .subscribe((storage) => {
    //     // console.log(storage)
    //     // if(storage != null){
    //     //   console.log(storage)
    //     //   this.custom = JSON.parse(storage);
    //     // }

    //   })

  }

  ngOnInit(): void {
    this.gloveApi.leatherSelected$.subscribe((leatherSelected: string) => {
      this.leatherSelected = leatherSelected;
    })
    this.gloveApi.gloveType$.subscribe((result: any) => {
      this.gloveType = result;
    });
    this.gloveApi.gloveDesign$.subscribe((result: any) => {
      console.log(result)
      _.forEach(result, (v, k) => {
        _.forEach(v, (val, key) => {
          if (key === 'prompt') {
            _.map(val, (v, k) => {

              if(v.active){
                console.log(v.active)
                v.gloveInputs = _.filter(v.gloveInputs, (f) => {
                if (f.gloveType.includes(this.gloveType.glove) && f.active) {
                  return f;
                }
              });
              }

            });
          }
        });
      });
      this.options = result;
    });
  }

  ngAfterViewInit(): void {
    this.gloveApi.init();
  }

  addVariation(payload:any){
    this.gloveApi.applyFormValue(payload)
  }

  triggerAddToCart(){
    this.gloveApi.triggerAddToCart();
  }

  addPersonalization(payload:any){
    let name = this.personalization.nativeElement.value;
    const attribute = payload.attribute_pewc;
    this.gloveApi.applyFormValue({attribute: attribute, name})
  }

  urlSanitizer(url: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https:${url}`);
  }

  panelChange(event: any) {
    const panel = event;
    if (this.domResponse[panel]) {
      const response = this.domResponse[panel];
      if (document.querySelectorAll(`button.btn`).length > 0) {
        document.querySelectorAll(`button.btn`).forEach((el: any) => {
          el.classList.remove('active');
          if(el.innerText.toLowerCase() === response.name.toLowerCase()){
            el.classList.add('active');
          }
          el.innerText === response ? el.classList.add('active') : null ;
        });
      }
    }
  }
}
