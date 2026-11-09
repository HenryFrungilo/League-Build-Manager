import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LeagueBuildManagerComponent } from './league-build-manager.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';



@NgModule({
  declarations: [
    LeagueBuildManagerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ButtonModule,
    CardModule
  ]
})
export class LeagueBuildManagerModule { }
