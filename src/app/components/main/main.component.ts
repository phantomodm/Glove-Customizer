import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NgbAccordionConfig, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { NguCarouselConfig } from '@ngu/carousel';
import { WIZARD, SIZE } from 'src/app/services/data';
import { GloveApiService } from 'src/app/services/glove-api.service';
import { GloveDataService } from 'src/app/services/glove-data.service';

export interface Options {
  id: string;
  title: string;
  label: string;
  input: string;
  type: string;
  info?: {}[];
  colorOptions?: {}[];
  prompt?: {}[];
  prompts?: string[];
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [NgbAccordionConfig],
})
export class MainComponent implements OnInit {
  panelId = "main-1";
  steps: any;
  lastItemSelected: any;
  domResponse: any = {};
  gloveType?: string;

  @ViewChild('mainStep') mainStep!: NgbAccordion;
  gloveSize!: { name: string; glove: string[]; attribute_pewc: string }[];


  public carouselTile: NguCarouselConfig =
  {
    grid: {xs: 1, sm: 2, md: 3 , lg: 3, all: 0},
    slide: 2,
    speed: 400,
    animation: 'lazy',
    loop: true,
    point: {
      visible: true
    },
    load: 2,
    touch: true,
    easing: 'ease',

  }

  constructor(
      private afs: AngularFirestore,
      public api: GloveApiService,
      private router: Router,
      private data: GloveDataService
  ) {
    this.gloveType = '';

    this.data.getSteps()
      .subscribe( (data:any) => {
      this.steps = WIZARD;
      this.steps.forEach( (step:any) => {
        if(step.includeOptions){
          this.api.gloveDesign.next(step.options)
        }
      });
    });
    this.gloveSize = SIZE;
    //this.data.getGloveSize().subscribe( (data:any) => { this.gloveSize = data; console.log(data) } );

  }


  ngOnInit(): void {}

  addVariation(payload: any) {
    const name = payload.name.toLowerCase();
    const panel = this.mainStep.activeIds[0];
    this.lastItemSelected = payload;
    this.domResponse[panel] = this.lastItemSelected;
    this.lastItemSelected = '';

    this.api.applyFormValue(payload);
    if (name === 'steer' || 'kip') {
      this.api.setGloveType(name);
    }

    switch (name) {
      case 'infielder':
      case 'outfielder':
      case 'catcher':
      case 'pitcher':
        this.api.setGloveBase({name, gloveBase: payload.gloveBase, gloveType: payload.gloveType});
        this.gloveType = name;
        break;
      case 'first base':
      case '1st base':
        this.api.setGloveBase({name:'first base', gloveBase: payload.gloveBase, gloveType: payload.gloveType});
        this.gloveType = name;
        break;
      default:
        break;
    }

    if(this.panelId != 'main-5'){
      this.mainStep.expand(this.panelId);
    } else {
      this.router.navigate(['./glove-designer'],{skipLocationChange: true});
    }
  }

  setGloveSize() {
    const gloves = [];
    if(this.gloveSize != undefined){
      const gloves = this.gloveSize.filter((s: any) => {
        return s.glove.includes(this.gloveType);
      });
      return gloves;
    }
    return [];
  }

  panelChange(event: any) {
    const panel = event;
    this.panelId = `main-${parseInt(panel.split('-')[1]) + 1 }`;

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

