import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'; // import router from angular router
import {Observable} from 'rxjs';
import { map, startWith, debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { QuotationsService } from '../quotations.service'
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { CommonService } from '../../common.service'
import * as moment from 'moment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-quotationaddedit',
  templateUrl: './quotationaddedit.component.html',
  styleUrls: ['./quotationaddedit.component.scss']
})
export class QuotationaddeditComponent implements OnInit {

public itemForm: FormGroup;
    public errorMessage: string = "";

    public QuotItemObj: any;
    public QuotItemsArray: any = [];

	public ApplyIGST:boolean = false;



    partyCtrl = new FormControl();
    filteredPartyObservable: Observable<any>;

    bankCtrl = new FormControl();
    filteredBankObservable: Observable<any>;

    itemObservable: Observable<any>;



    constructor(private __route: Router,
        private __quotService: QuotationsService,
        private __fb: FormBuilder,
        private __commonService: CommonService,
        private __activatedRoute: ActivatedRoute,
		private _snackBar: MatSnackBar
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

        this.__activatedRoute.params.subscribe(params => {
            let headerString = atob(params['id']);
            this.buildItemForm({})
            this.createNewItemUI();
            this.itemfilter('')

            this.__quotService.getQuotationForEdit({ Code: headerString }).subscribe(RtnData => {
                let Obj: any;
                if (headerString == "-1") {
                    this.itemForm['controls']["InvoiceNo"].setValue(RtnData.Data[0].DocNo);
                }


            })
        });



    }


    public createNewItemUI() {
        this.QuotItemObj = {
            Code: -1,
            QuotCode: null,
            ItemCode: -1,
            ItemDescription: null,
            Amount: 0,
            PerPrice: 0,
            CGST: 0,
            SGST: 0,
            IGST: 0,
            Discount: 0,
            TaxPerc: 0,
            Qty: 0,
            Locked: false
        }
        this.QuotItemsArray.push(JSON.parse(JSON.stringify(this.QuotItemObj)))

    }


    buildItemForm(item) {
        this.itemForm = this.__fb.group({
            Code: new FormControl(item.Code || -1),
            InvoiceNo: new FormControl(item.InvoiceNo || null),
            InvoiceDate: new FormControl(item.InvoiceDate || null),
            DueDate: new FormControl(item.DueDate || null),
            BankCode: new FormControl(item.BankCode || 1),
            CustomerCode: new FormControl(item.CustomerCode || null),
            CompanyCode: new FormControl(item.CompanyCode || 1),

			PONo: new FormControl(item.PONo || null),
			PODate: new FormControl(item.PODate || null),
			ChallanNo: new FormControl(item.ChallanNo || 'DIRECT'),
			ChallanDate: new FormControl(item.ChallanDate || null),
			Transporter: new FormControl(item.Transporter || 'PRIVATE'),
			LRNo: new FormControl(item.LRNo || 'NA'),



            Amount: new FormControl(item.Amount || null),
            CGST: new FormControl(item.CGST || null),
            SGST: new FormControl(item.SGST || null),
            IGST: new FormControl(item.IGST || null),
			ApplyIGST: new FormControl(item.ApplyIGST || false),
            Transportation: new FormControl(item.Transportation || null),
            Discount: new FormControl(item.Discount || null),
            TotalAmount: new FormControl(item.TotalAmount || null),



            IsCommited: new FormControl(item.IsCommited || 0)

        })
    }

    private _filterParty(value: string): Observable<any> {
        //const filterValue = value.toLowerCase();
        let SndObj = {
            filter: value
        }
        //return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
        return this.__quotService.getPartyInfo(SndObj)
    }

    private _filterBank(value: string): Observable<any> {
        //const filterValue = value.toLowerCase();
        let SndObj = {
            filter: value
        }
        //return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
        return this.__quotService.getBankInfo(SndObj)
    }


    public saveInvoice(isItem: boolean = false, itemindex: number = 0, item: any = {},isCommitted : boolean = false) {
        item.SrNo = itemindex;
        const SendObj = { ...this.itemForm.getRawValue() };
		SendObj["IsCommited"] = isCommitted
        this.UpdateSavingDateTimeFormat(SendObj);
        SendObj.QuotItemsInfo = this.QuotItemsArray;
        this.__quotService.saveQuotation(SendObj)
            .subscribe(data => {
                if (!isItem) {
                    this.itemForm['controls']["Code"].setValue(data.Quotation[0].Code);
                } else {
                    for (let k = 0; k < data.Quotation[0].QuotDetails.length; k++) {
                        if (data.Quotation[0].QuotDetails[k].SrNo == itemindex) {
                            item.Code = data.Quotation[0].QuotDetails[k].Code
                            item.IGST = data.Quotation[0].QuotDetails[k].IGST
                            item.TotalAmount = data.Quotation[0].QuotDetails[k].TotalAmount
                        }
                    }
                }
                this.itemForm['controls']["Amount"].setValue(data.Quotation[0].Amount);
                this.itemForm['controls']["CGST"].setValue(data.Quotation[0].CGST);
                this.itemForm['controls']["SGST"].setValue(data.Quotation[0].SGST);
				this.itemForm['controls']["IGST"].setValue(data.Quotation[0].IGST);
                this.itemForm['controls']["Discount"].setValue(data.Quotation[0].Discount);
                this.itemForm['controls']["TotalAmount"].setValue(data.Quotation[0].TotalAmount);
				if(isCommitted){
					 this._snackBar.open("Invoice Saved", "Done");
					 }

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
            this.__quotService.getItemInfo(SndObj).pipe(
                startWith(null),
                debounceTime(200),
                distinctUntilChanged())
    }
    updateitemForm(item: any, product: any) {
        console.log(item)
        if (product.Value) {
            item.ItemCode = product.Value;
            item.ItemDescription = product.ItemDescription;
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
    public openBankPopUp() {
        this.__commonService.addeditbank({}, true).subscribe(RtnData => {
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

	public CalculateTotal(){
		this.itemForm.controls['TotalAmount'].setValue(+this.itemForm.controls['Amount'].value + +this.itemForm.controls['Transportation'].value + +this.itemForm.controls['IGST'].value) 
	}



    deleteItem(row) {
        if (confirm(`Delete Item`)) {

            // this.loader.open();
            this.__quotService.deleteItem(row)
                .subscribe(dataSubmitted => {
                    //  this.loader.close();
                    //if (dataSubmitted) {
                       
                    //}
                    this.QuotItemsArray.splice(this.QuotItemsArray.findIndex(a => a.Code === row.Code), 1)
                    

                }, err => {
                    //  this.loader.close();
                    this.errorMessage = err.error ? err.error.ExceptionMessage : "Something Went Wrong"
                    //this.snack.open(err.error ? err.error.ExceptionMessage : "Something Went Wrong", 'Clear', {
                    //    duration: 4000,
                    //});
                })

        }
    }

    public pending() {
        alert('Functionality is still in work');
    }
}
