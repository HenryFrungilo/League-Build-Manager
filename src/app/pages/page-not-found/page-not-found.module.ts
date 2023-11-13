import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundComponent } from './page-not-found.component';
import { CardModule } from 'primeng/card';
import {ButtonModule} from 'primeng/button'

@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule
  ]
})
export class PageNotFoundModule { }
