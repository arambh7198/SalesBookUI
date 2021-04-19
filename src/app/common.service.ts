/// <reference path="product-master/product-master-add-edit/product-master-add-edit.component.ts" />
import { Injectable } from '@angular/core';
import { CustvendaddeditComponent } from './custvend/custvendaddedit/custvendaddedit.component'
import { ProductMasterAddEditComponent } from './product-master/product-master-add-edit/product-master-add-edit.component'
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
                Description : (data.Description || null),
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
                observer.next(true);
                observer.complete();
            })
        })
    }
}
