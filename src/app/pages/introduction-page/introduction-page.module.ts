import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroductionPageComponent } from './introduction-page.component';
import { ScrollTopModule } from 'primeng/scrolltop';



@NgModule({
  declarations: [
    IntroductionPageComponent
  ],
  imports: [
    CommonModule,
    ScrollTopModule
  ]
})
export class IntroductionPageModule { }
