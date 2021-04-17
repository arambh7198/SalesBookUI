import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SalesComponent } from './sales/sales.component';
import { SalesaddeditComponent } from './sales/salesaddedit/salesaddedit.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {TokenInterceptor} from './token.interceptor';
import { appSettings } from './appsettings';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductMasterComponent } from './product-master/product-master.component';
import { ProductMasterAddEditComponent } from './product-master/product-master-add-edit/product-master-add-edit.component';

@NgModule({
    declarations: [
        AppComponent,
        SalesComponent,
        SalesaddeditComponent,
        LoginComponent,
        ProductMasterComponent,
        ProductMasterAddEditComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatAutocompleteModule,
        MatInputModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    }, appSettings],
    bootstrap: [AppComponent]
})
export class AppModule { }
