import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './pages/tft/mainpage/mainpage.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { IntroductionPageComponent } from './pages/introduction-page/introduction-page.component';

const routes: Routes = [
  { path: 'tft-comp-manager', component: MainpageComponent },
  { path: 'league-build-manager', component: MainpageComponent },
  { path: '', component: IntroductionPageComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
