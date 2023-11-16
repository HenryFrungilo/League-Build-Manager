import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroductionPageComponent } from './introduction-page.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    IntroductionPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class IntroductionPageModule { }
