import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpageModule } from './pages/tft/mainpage/mainpage.module';
import { PageNotFoundModule } from './pages/page-not-found/page-not-found.module';
import { IntroductionPageModule } from './pages/introduction-page/introduction-page.module';
import { PageHeaderComponent } from './pages/page-header/page-header.component';
import { LeagueBuildManagerModule } from './pages/league/league-build-manager/league-build-manager.module';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainpageModule,
    PageNotFoundModule,
    IntroductionPageModule,
    LeagueBuildManagerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
