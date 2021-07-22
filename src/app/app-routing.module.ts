import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from './sales/sales.component';
import { SalesaddeditComponent } from './sales/salesaddedit/salesaddedit.component';
import { LoginComponent } from './login/login.component';
import { ProductMasterComponent } from './product-master/product-master.component';
import { CustvendComponent} from './custvend/custvend.component'
import { BankComponent } from './bank/bank.component';
import { CompanyComponent } from './company/company.component';
import { LayoutComponent } from './layout/layout/layout.component'
import { QuotationsComponent } from './quotations/quotations.component';
import { QuotationaddeditComponent } from './quotations/quotationaddedit/quotationaddedit.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: LoginComponent },
            { path: 'sales', component: SalesComponent },
            { path: 'salesAddEdit/:id', component: SalesaddeditComponent },

			{ path: 'quotations', component: QuotationsComponent },
            { path: 'quotAddEdit/:id', component: QuotationaddeditComponent },
           
            { path: 'product', component: ProductMasterComponent },
            { path: 'custvend', component: CustvendComponent },
            { path: 'bank', component: BankComponent },
            { path: 'company', component: CompanyComponent },
        ]
    },
    { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
