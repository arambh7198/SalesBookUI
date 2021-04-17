import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'; // import router from angular router
import {Observable} from 'rxjs';
import { map, startWith, debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { SalesService } from '../sales.service'
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-salesaddedit',
    templateUrl: './salesaddedit.component.html',
    styleUrls: ['./salesaddedit.component.scss']
})
export class SalesaddeditComponent implements OnInit {
    public itemForm: FormGroup;
    public errorMessage: string = "";


    partyCtrl = new FormControl();
    filteredPartyObservable: Observable<any>;
    
    constructor(private __route: Router,
        private __salesService: SalesService,
        private __fb: FormBuilder,
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

    }

    ngOnInit(): void {
        this.buildItemForm({})
    }


    buildItemForm(item) {
        this.itemForm = this.__fb.group({
            Code: new FormControl(item.Code || -1),
            InvoiceNo: new FormControl(item.InvoiceNo || null),
            InvoiceDate: new FormControl(item.InvoiceDate || null),
            BankCode: new FormControl(item.BankCode || null),
            CustomerCode: new FormControl(item.CustomerCode || null),
            CompanyCode: new FormControl(item.CompanyCode || null)
            
        })
    }

    private _filterParty(value: string): Observable<any> {
        //const filterValue = value.toLowerCase();
        let SndObj = {
            filter : value
        }
        //return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
        return this.__salesService.getPartyInfo(SndObj)
    }


    public saveInvoice() {
    
        const SendObj = { ...this.itemForm.getRawValue() };
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

        alert(Value)
        if (componentid && Value) {
            this.itemForm['controls'][componentid].setValue(Value);  
            this.saveInvoice();
        } else {
            console.log('ooops');
        }
    }
}
