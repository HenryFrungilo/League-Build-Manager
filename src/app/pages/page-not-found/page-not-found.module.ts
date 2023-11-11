import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundComponent } from './page-not-found.component';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    CardModule
  ]
})
export class PageNotFoundModule { }
