import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainpageComponent } from './mainpage.component';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    MainpageComponent
  ],
  imports: [
    CommonModule,
    CardModule
  ]
})
export class MainpageModule { }
