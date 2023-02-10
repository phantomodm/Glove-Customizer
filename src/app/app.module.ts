import { Injector, NgModule } from '@angular/core';

import { createCustomElement } from '@angular/elements';
import { BrowserModule, HammerModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { AccordPanelComponent } from './components/accord-panel/accord-panel.component';
import { SubAccordionPanelComponent } from './components/accord-panel/sub-accordion-panel/sub-accordion-panel.component';
import { GloveViewComponent } from './components/glove-view/glove-view.component';
import { GloveUiComponent } from './components/glove-ui/glove-ui.component';
import { MobileUiComponent } from './components/mobile-ui/mobile-ui.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { MyHammerConfig } from './services/hammer';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UiComponentsModule } from './modules/ui-components/ui-components.module';
import { DashStringPipe } from './services/pipe/add-separator.pipe';
import { NguCarouselModule } from '@ngu/carousel';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AccordPanelComponent,
    SubAccordionPanelComponent,
    GloveViewComponent,
    GloveUiComponent,
    MobileUiComponent,
    DashStringPipe,
    SplashScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    HammerModule,
    NguCarouselModule,
    NgbModule,
    UiComponentsModule
  ],
  providers: [{ provide: MyHammerConfig, useClass: MyHammerConfig }],
  entryComponents: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    const el = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('custom-glove-builder', el);
  }
  ngDoBootstrap() {}
}
