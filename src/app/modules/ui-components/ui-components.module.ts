import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSliderComponent } from 'src/app/components/ui-components/input-slider/input-slider.component';
import { MobileNavigationComponent } from 'src/app/components/ui-components/mobile-navigation/mobile-navigation.component';
import { PolicyModalComponent } from 'src/app/components/ui-components/policy-modal/policy-modal.component';
import { UiTextAreaComponent } from 'src/app/components/ui-components/ui-text-area/ui-text-area.component';
import { NguCarouselModule } from '@ngu/carousel';

@NgModule({
  declarations: [
    InputSliderComponent,
    UiTextAreaComponent,
    MobileNavigationComponent,
    PolicyModalComponent
  ],
  imports: [
    CommonModule,
    NguCarouselModule
  ],
  exports:[
    InputSliderComponent,
    UiTextAreaComponent,
    MobileNavigationComponent,
    PolicyModalComponent
  ]
})
export class UiComponentsModule { }
