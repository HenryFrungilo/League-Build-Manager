import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeagueBuildManagerComponent } from './league-build-manager.component';

import { CardModule } from 'primeng/card';



@NgModule({
  declarations: [
    LeagueBuildManagerComponent
  ],
  imports: [
    CommonModule,
    CardModule
  ]
})
export class LeagueBuildManagerModule { }
