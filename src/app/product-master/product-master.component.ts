import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductMasterService } from './product-master.service';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProductMasterAddEditComponent } from './product-master-add-edit/product-master-add-edit.component';
import { Subscription, of } from 'rxjs';
@Component({
    selector: 'app-product-master',
    templateUrl: './product-master.component.html',
    styleUrls: ['./product-master.component.scss']
})
export class ProductMasterComponent implements OnInit {
    public items: any;
    public itemModel: any;

    public getItemSub: Subscription;
    public query: any;
    public errorMessage: string = "";

    constructor(
        private dialog: MatDialog,
        private snack: MatSnackBar,
        private __productMasterService: ProductMasterService,
    ) { }

    ngOnInit() {
        this.init();
        this.getItems();
    }

    public init() {

        this.itemModel = {
            Code: null,
            ProductName: null,
            Description: null,
            HSNCode: null,
            BasePrice: null,
            Locked: false
        }

        this.query = {
            PageNumber: 1,
            PageSize: 10,
            SearchColumn: 'Code',
            SearchText: '',
            SortColName: 'Code',
            SortType: 'asc',
            TotalCount: 0
        };
    }

    ngOnDestroy() {
        if (this.getItemSub) {
            this.getItemSub.unsubscribe()
        }
    }

    getItems() {
        this.getItemSub = this.__productMasterService.getData(this.query)
            .subscribe(data => {
                this.items = data.Data;
                this.query.TotalCount = data.DataCount;
            }, err => {
                this.errorMessage = err.error ? err.error.ExceptionMessage : "Something Went Wrong"
                this.snack.open(err.error ? err.error.ExceptionMessage : "Something Went Wrong", 'Clear', {
                    duration: 4000,
                });
            })
    }

    openPopUp(data: any = {}, isNew = true) {
        let passObject = {}

        if (!isNew) {
            passObject = {
                Code: data.Code,
                ProductName: data.ProductName,
                Description: data.Description,
                HSNCode: data.HSNCode,
                BasePrice: data.BasePrice,
                Locked: data.Locked
            }
        } else {
            passObject = Object.assign({}, this.itemModel);
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
                    this.getItems();
                }
            })
    }

    deleteItem(row) {
        if (confirm(`Delete ${row.ProductName}?`)) {

            // this.loader.open();
            this.__productMasterService.deleteData(row)
                .subscribe(dataSubmitted => {
                    //  this.loader.close();
                    if (dataSubmitted) {
                        this.snack.open('Product deleted!', 'OK', { duration: 4000 })
                        this.getItems();
                    }
                }, err => {
                    //  this.loader.close();
                    this.errorMessage = err.error ? err.error.ExceptionMessage : "Something Went Wrong"
                    this.snack.open(err.error ? err.error.ExceptionMessage : "Something Went Wrong", 'Clear', {
                        duration: 4000,
                    });
                })

        }
    }



    sortClick(headerName: string) {
        if (headerName) {
            if (this.query.SortColName === headerName) {
                this.query.SortType = this.query.SortType === 'asc' ? 'desc' : 'asc';
            }
            this.query.SortColName = headerName;
            this.query.SearchColumn = headerName;
            this.getItems();
        }
    }

    isSorting(name: string) {
        return this.query.SortColName !== name && name !== '';
    };

    isSortAsc(name: string) {
        return this.query.SortColName === name && this.query.SortType === 'asc';
    };

    isSortDesc(name: string) {
        return this.query.SortColName === name && this.query.SortType === 'desc';
    };

    ListPageChangeEvent(event): void {
        this.query.PageNumber = event.pageIndex + 1
        this.getItems()
    }

    searchCallback() {
        this.getItems();
    }
}
