import { Injectable } from '@angular/core';
import { CustvendaddeditComponent } from './custvend/custvendaddedit/custvendaddedit.component'
import { ProductMasterAddEditComponent } from './product-master/product-master-add-edit/product-master-add-edit.component'
import { BankaddeditComponent} from './bank/bankaddedit/bankaddedit.component'
import { CompanyaddeditComponent } from './company/companyaddedit/companyaddedit.component'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, interval, Subject, BehaviorSubject } from 'rxjs';



@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(
        private dialog: MatDialog,
        private snack: MatSnackBar,
    ) { }


    public addeditparty(data: any = {}, isNew = true) {
        return new Observable((observer) => {
            let passObject = {}

            passObject = {
                Code: (data.Code || null),
                Name: (data.Name || null),
                IsCust: (true),
                EmailID: (data.EmailID || null),
                MobileNo: (data.MobileNo || null),
                Add1: (data.Add1 || null),
                Add2: (data.Add2 || null),
                City: (data.City || null),
                State: (data.State || null),
                Country: (data.Country || null),
                PIN: (data.PIN || null),
                PAN: (data.PAN || null),
                GST: (data.GST || null),
                Locked: (data.Locked || false)
            }

            let title = isNew ? 'Add Party' : 'Update Party';
            let dialogRef: MatDialogRef<any> = this.dialog.open(CustvendaddeditComponent, {
                width: '720px',
                disableClose: false,
                data: { title: title, payload: passObject, isNewDialog: isNew },
            })
            dialogRef.afterClosed()
                .subscribe(dataSubmitted => {
                    //  this.loader.close();
                    if (dataSubmitted) {
                        this.snack.open(isNew ? 'Party Added!' : 'Party Updated!', 'OK', { duration: 4000 })
                        //    this.getItems();
                    }
                    observer.next(true);
                    observer.complete();
                })
        });
    }



    public addedititem(data: any = {}, isNew = true) {
        return new Observable((observer) => {
            let passObject = {}

            passObject = {
                Code: (data.Code || -1),
                ProductName: (data.ProductName || null),
                Description: (data.Description || null),
                HSNCode: (data.HSNCode || null),
                BasePrice: (data.BasePrice || null),
                Locked: (data.Locked || false)
            }

            let title = isNew ? 'Add Item' : 'Update Item';
            let dialogRef: MatDialogRef<any> = this.dialog.open(ProductMasterAddEditComponent, {
                width: '720px',
                disableClose: false,
                data: { title: title, payload: passObject, isNewDialog: isNew },
            })
            dialogRef.afterClosed()
                .subscribe(dataSubmitted => {
                    //  this.loader.close();
                    if (dataSubmitted) {
                        this.snack.open(isNew ? 'Item Added!' : 'Product Updated!', 'OK', { duration: 4000 })
                    }
                    observer.next(dataSubmitted);
                    observer.complete();
                })
        })
    }


    public addeditbank(data: any = {}, isNew = true) {
        return new Observable((observer) => {
            let passObject = {}

            passObject = {
                Code: (data.Code || -1),
                BankName: (data.BankName || null),
                BankAdd1: (data.BankAdd1 || null),
                BankAdd2: (data.BankAdd2 || null),
                City: (data.City || null),
                State: (data.State || null),
                Country: (data.Country || null),
                AccNo: (data.AccNo || null),
                IFSCCode: (data.IFSCCode || null),
                Locked: (data.Locked || false)
            }

            let title = isNew ? 'Add Bank' : 'Update Bank';
            let dialogRef: MatDialogRef<any> = this.dialog.open(BankaddeditComponent, {
                width: '720px',
                disableClose: false,
                data: { title: title, payload: passObject, isNewDialog: isNew },
            })
            dialogRef.afterClosed()
                .subscribe(dataSubmitted => {
                    //  this.loader.close();
                    if (dataSubmitted) {
                        this.snack.open(isNew ? 'Bank Added!' : 'Bank Updated!', 'OK', { duration: 4000 })
                        observer.next(dataSubmitted);
                        observer.complete();
                    }
                })
        })
    }

    public addeditcompany(data: any = {}, isNew = true) {
        return new Observable((observer) => {
            let passObject = {}

            passObject = {
                Code: (data.Code || -1),
                CompanyName: (data.CompanyName || null),
                CompShortName: (data.CompShortName || null),
                EmailID: (data.EmailID || null),
                MobileNo: (data.MobileNo || null),
                CompAdd1: (data.CompAdd1 || null),
                CompAdd2: (data.CompAdd2 || null),
                City: (data.City || null),
                State: (data.State || null),
                Country: (data.Country || null),
                PIN: (data.PIN || null),
                PAN: (data.PAN || null),
                GST: (data.GST || null),
                Locked: (data.Locked || false)
            }

            let title = isNew ? 'Add Company' : 'Update Company';
            let dialogRef: MatDialogRef<any> = this.dialog.open(CompanyaddeditComponent, {
                width: '720px',
                disableClose: false,
                data: { title: title, payload: passObject, isNewDialog: isNew },
            })
            dialogRef.afterClosed()
                .subscribe(dataSubmitted => {
                    //  this.loader.close();
                    if (dataSubmitted) {
                        this.snack.open(isNew ? 'Company Added!' : 'Company Updated!', 'OK', { duration: 4000 })
                        observer.next(dataSubmitted);
                        observer.complete();
                    }
                })
        })
    }
}
