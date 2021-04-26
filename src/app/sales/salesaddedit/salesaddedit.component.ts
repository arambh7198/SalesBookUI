import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'; // import router from angular router
import {Observable} from 'rxjs';
import { map, startWith, debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { SalesService } from '../sales.service'
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { CommonService } from '../../common.service'
import * as moment from 'moment';

@Component({
    selector: 'app-salesaddedit',
    templateUrl: './salesaddedit.component.html',
    styleUrls: ['./salesaddedit.component.scss']
})
export class SalesaddeditComponent implements OnInit {
    public itemForm: FormGroup;
    public errorMessage: string = "";

    public SalesItemObj: any;
    public SalesItemsArray: any = [];




    partyCtrl = new FormControl();
    filteredPartyObservable: Observable<any>;

    bankCtrl = new FormControl();
    filteredBankObservable: Observable<any>;

    itemObservable: Observable<any>;



    constructor(private __route: Router,
        private __salesService: SalesService,
        private __fb: FormBuilder,
        private __commonService: CommonService
    ) {
        this.filteredPartyObservable = this.partyCtrl.valueChanges
            .pipe(
            startWith(null),
            debounceTime(200),
            distinctUntilChanged(),
            switchMap(val => {
                return this._filterParty(val || '')
            })
        );

        this.filteredBankObservable = this.bankCtrl.valueChanges
            .pipe(
            startWith(null),
            debounceTime(200),
            distinctUntilChanged(),
            switchMap(val => {
                return this._filterBank(val || '')
            })
            );

    }

    ngOnInit(): void {
        this.buildItemForm({})
        this.createNewItemUI();
        this.itemfilter('')
    }


    public createNewItemUI() {
        this.SalesItemObj = {
            Code: -1,
            SalesCode: null,
            ItemCode: null,
            Amount: null,
            PerPrice: null,
            CGST: null,
            SGST: null,
            IGST: null,
            Discount: null,
            Qty: null,
            Locked: false
        }
        this.SalesItemsArray.push(JSON.parse(JSON.stringify(this.SalesItemObj)))

    }


    buildItemForm(item) {
        this.itemForm = this.__fb.group({
            Code: new FormControl(item.Code || -1),
            InvoiceNo: new FormControl(item.InvoiceNo || null),
            InvoiceDate: new FormControl(item.InvoiceDate || null),
            DueDate: new FormControl(item.DueDate || null),
            BankCode: new FormControl(item.BankCode || null),
            CustomerCode: new FormControl(item.CustomerCode || null),
            CompanyCode: new FormControl(item.CompanyCode || null)

        })
    }

    private _filterParty(value: string): Observable<any> {
        //const filterValue = value.toLowerCase();
        let SndObj = {
            filter: value
        }
        //return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
        return this.__salesService.getPartyInfo(SndObj)
    }

    private _filterBank(value: string): Observable<any> {
        //const filterValue = value.toLowerCase();
        let SndObj = {
            filter: value
        }
        //return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
        return this.__salesService.getBankInfo(SndObj)
    }


    public saveInvoice() {

        const SendObj = { ...this.itemForm.getRawValue() };
        this.UpdateSavingDateTimeFormat(SendObj);
        SendObj.SalesItems = this.SalesItemsArray;
        this.__salesService.saveSales(SendObj)
            .subscribe(data => {
                console.log(data)
                alert()
            }, err => {

                this.errorMessage = err.error ? err.error.ExceptionMessage : "Something Went Wrong"
                //this.snack.open(err.error ? err.error.ExceptionMessage : "Something Went Wrong", 'Clear', {
                //    duration: 4000,
                //});
            })
    }

    updateForm(Value: string, componentid: string) {
        if (componentid && Value) {
            this.itemForm['controls'][componentid].setValue(Value);
            this.saveInvoice();
        } else {
            console.log('ooops');
        }
    }

    itemfilter(val: string) {
        let SndObj = {
            filter: val
        }
        this.itemObservable =
            this.__salesService.getItemInfo(SndObj).pipe(
                startWith(null),
                debounceTime(200),
                distinctUntilChanged())
    }
    updateitemForm(item: any,product : any) {
        console.log(item)
        if (product.Value) {
            item.ItemCode = product.Value;
            item.ItemDescription = product.ItemDescription	;
            item.PerPrice = product.PerPrice;
            item.Qty = 1;
            item.HSN = product.HSN;
            item.Amount = product.PerPrice;
        } else {
            console.log('ooops');
        }
        console.log(item)

    }



    public openPartyPopUp() {
        this.__commonService.addeditparty({}, true).subscribe(RtnData => {
            this.filteredPartyObservable.subscribe();
        });
    }
    public openItemPopUp() {
        this.__commonService.addedititem({}, true).subscribe(RtnData => {
            this.itemfilter('')
        });
    }

    UpdateSavingDateTimeFormat(SendObj) {
        SendObj['InvoiceDate'] = this.ChangeFormatDate(SendObj['InvoiceDate'], "date");
    }

    ChangeFormatDate(DateTimeModel, Type) {
        if (Type == "date") {
            return DateTimeModel ? moment(DateTimeModel).format('MM/DD/YYYY') : null;
        }
        else if (Type == "datetime") {
            return DateTimeModel ? moment(DateTimeModel).format('MM/DD/YYYY HH:mm:ss') : null;
        }
        else if (Type == "time") {
            return DateTimeModel ? moment(DateTimeModel).format('HH:mm:ss') : null;
        }
    }

    public ChangeQtyPrice(item) {
        if (item.Qty > 0) {
            item.Amount = item.PerPrice * item.Qty
        }
    }
}
