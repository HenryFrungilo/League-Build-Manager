import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainpageComponent } from './pages/tft/mainpage/mainpage.component';

const routes: Routes = [
    {path: 'TFT/tft-comp-manager', component: MainpageComponent},
    {path: 'LOL/league-build-manager', component: MainpageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
