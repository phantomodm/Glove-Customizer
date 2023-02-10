import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GloveUiComponent } from './components/glove-ui/glove-ui.component';
import { MainComponent } from './components/main/main.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';

const routes: Routes = [
  { path: '', component: SplashScreenComponent},
  { path: 'wizard', component: MainComponent},
  {path: 'glove-designer', component: GloveUiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
