import { Component, OnInit, OnDestroy } from '@angular/core';
import { SalesService   } from './sales.service';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subscription, of } from 'rxjs';
import {CommonService} from '../common.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {


    public items: any;
    public itemModel: any;


    public getItemSub: Subscription;
    public query: any;
    public errorMessage: string = "";

    constructor(
        private dialog: MatDialog,
        private snack: MatSnackBar,
        private __salesService: SalesService,
        private __commonService: CommonService,
        private __route: Router,

    ) { }

    ngOnInit() {
        this.init();
        this.getItems();
    }

    public init() {

        this.itemModel = {
            Code: null,
            Name: null,
            IsCust: true,
            EmailID: null,
            MobileNo: null,
            Add1: null,
            Add2: null,
            City: null,
            State: null,
            Country: null,
            PIN: null,
            PAN: null,
            GST: null,
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
        this.getItemSub = this.__salesService.getData(this.query)
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
        this.__commonService.addeditparty(data, isNew).subscribe(RtnData => {
            this.getItems();
        })
    }

    deleteItem(row) {
        if (confirm(`Delete ${row.ProductName}?`)) {

            // this.loader.open();
            this.__salesService.deleteData(row)
                .subscribe(dataSubmitted => {
                    //  this.loader.close();
                    if (dataSubmitted) {
                        this.snack.open('Invoice deleted!', 'OK', { duration: 4000 })
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


  public addEditSales(salesCode) {
      this.__route.navigate(['/salesAddEdit', btoa(salesCode)])
    }


  public DownloadInvoice(obj) {
      let SndObject = {
          Format: 'PDF',
          Code: obj.Code,
          InvoiceNo: obj.InvoiceNo
      }
      this.__salesService.GetInvoiceReport(SndObject).subscribe(RtnData => {
          window.open(RtnData["FilePath"])
      })
  }

  public pending(obj : any) {
      alert('Functionality is still in work');
  }

}


