import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {SubdivisionDataDisplayComponent} from './subdivision-data-display/subdivision-data-display.component';
import {HttpClientModule} from "@angular/common/http";
import {ToDatePipe} from "./pipes/to-date.pipe";
import {TooltipDirective} from "./directives/tooltip.directive";
import {SubdivisionPageComponent} from "./subdivision-page/subdivision-page.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SubdivisionDataDisplayComponent,
    SubdivisionPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    ToDatePipe,
    TooltipDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
