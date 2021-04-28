import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from './sales/sales.component';
import { SalesaddeditComponent } from './sales/salesaddedit/salesaddedit.component';
import { LoginComponent } from './login/login.component';
import { ProductMasterComponent } from './product-master/product-master.component';
import { CustvendComponent} from './custvend/custvend.component'
import { BankComponent } from './bank/bank.component';
import { CompanyComponent } from './company/company.component';


const routes: Routes = [
    { path: 'sales', component: SalesComponent },
    { path: 'salesAddEdit', component: SalesaddeditComponent },
    { path: 'login', component: LoginComponent },
    { path: 'product', component: ProductMasterComponent },
    { path: 'custvend', component: CustvendComponent },
    { path: 'bank', component: BankComponent },
    { path: 'comapny', component: CompanyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
