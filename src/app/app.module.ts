import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicComponent } from './layouts/basic/basic.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { HeaderComponent } from './includes/header/header.component';
import { FooterComponent } from './includes/footer/footer.component'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button"

import { ErrormodalComponent } from './error/errormodal/errormodal.component'; 
import { ErrorInterceptor } from './error/errormodal/error.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    BlankComponent,
    HeaderComponent,
    FooterComponent,
    ErrormodalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor,multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [ErrormodalComponent]
})
export class AppModule { }
