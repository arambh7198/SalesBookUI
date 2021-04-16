import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SalesComponent } from './sales/sales.component';
import { SalesaddeditComponent } from './sales/salesaddedit/salesaddedit.component';

@NgModule({
  declarations: [
    AppComponent,
    SalesComponent,
    SalesaddeditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
