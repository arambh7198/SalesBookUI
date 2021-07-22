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
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatDialogModule} from '@angular/material/dialog';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { LayoutModule} from './layout/layout.module';

import {MatSnackBarModule} from '@angular/material/snack-bar'; 


import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {TokenInterceptor} from './token.interceptor';
import { appSettings } from './appsettings';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductMasterComponent } from './product-master/product-master.component';
import { ProductMasterAddEditComponent } from './product-master/product-master-add-edit/product-master-add-edit.component';
import { CustvendComponent } from './custvend/custvend.component';
import { CustvendaddeditComponent } from './custvend/custvendaddedit/custvendaddedit.component';
import { BankComponent } from './bank/bank.component';
import { BankaddeditComponent } from './bank/bankaddedit/bankaddedit.component';
import { CompanyComponent } from './company/company.component';
import { CompanyaddeditComponent } from './company/companyaddedit/companyaddedit.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { QuotationsComponent } from './quotations/quotations.component';
import { QuotationaddeditComponent } from './quotations/quotationaddedit/quotationaddedit.component';

@NgModule({
    declarations: [
        AppComponent,
        SalesComponent,
        SalesaddeditComponent,
        LoginComponent,
        ProductMasterComponent,
        ProductMasterAddEditComponent,
        CustvendComponent,
        CustvendaddeditComponent,
        BankComponent,
        BankaddeditComponent,
        CompanyComponent,
        CompanyaddeditComponent,
        QuotationsComponent,
        QuotationaddeditComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        FormsModule,
        LayoutModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatAutocompleteModule,
        MatPaginatorModule,
        MatInputModule,
        MatDialogModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule 
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    }, appSettings,
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'en-SG' },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
