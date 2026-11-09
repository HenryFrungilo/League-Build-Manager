import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainpageComponent } from './mainpage.component';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MainpageComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    RouterModule
  ]
})
export class MainpageModule { }
