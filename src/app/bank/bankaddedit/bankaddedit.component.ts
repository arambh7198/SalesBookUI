import { Component, OnInit, Inject, ChangeDetectorRef  } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { BankService } from '../bank.service';
//import { AppLoaderService } from '../../../../shared/services/app-loader/app-loader.service';
import { Subscription, of, Observable } from 'rxjs';
import { map, startWith, debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
//import { CommonService } from '../../../common/services/common.service';

@Component({
    selector: 'app-bankaddedit',
    templateUrl: './bankaddedit.component.html',
    styleUrls: ['./bankaddedit.component.scss']
})
export class BankaddeditComponent implements OnInit {

    public itemForm: FormGroup;
    public errorMessage: string = "";
    public getAddressSub: Subscription;
    public Addresshelp: any;



    cityCtrl = new FormControl();
    filteredCityObservable: Observable<any>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<BankaddeditComponent>,
        private fb: FormBuilder,
        private __bankService: BankService,
        //private loader: AppLoaderService,
        private snack: MatSnackBar,
        //private commonService: CommonService,
        private cdr: ChangeDetectorRef
    ) {
        this.filteredCityObservable = this.cityCtrl.valueChanges
            .pipe(
            startWith(null),
            debounceTime(200),
            distinctUntilChanged(),
            switchMap(val => {
                return this._filterCity(val || '')
            })
            );
    }

    ngOnInit() {
        this.buildItemForm(this.data.payload);
    }

    ngOnDestroy() {
        if (this.getAddressSub) {
            this.getAddressSub.unsubscribe()
        }
    }

    buildItemForm(item) {
        this.itemForm = this.fb.group({
            Code: new FormControl(item.Code || null),
            BankName: new FormControl(item.BankName || null),
            BankAdd1: new FormControl(item.BankAdd1 || null),
            BankAdd2: new FormControl(item.BankAdd2 || null),
            City: new FormControl(item.City || null),
            State: new FormControl(item.State || null),
            Country: new FormControl(item.Country || null),
            AccNo: new FormControl(item.AccNo || null),
            IFSCCode: new FormControl(item.IFSCCode || null),
            Locked: new FormControl(item.Locked || null)
        })
        //this.UpdateAutoDisplay(item);

    }
    submit() {
        this.errorMessage = "";
        //  this.loader.open();
        if (this.data.isNewDialog) {
            this.__bankService.saveData(this.itemForm.value)
                .subscribe(data => {
                    //    this.loader.close();
                    this.dialogRef.close(true)
                }, err => {
                    //    this.loader.close();
                    this.errorMessage = err.error ? err.error.ExceptionMessage : "Something Went Wrong"
                    this.snack.open(err.error ? err.error.ExceptionMessage : "Something Went Wrong", 'Clear', {
                        duration: 4000,
                    });
                })
        } else {
            this.__bankService.updateData(this.itemForm.value) // data._id
                .subscribe(data => {
                    //   this.loader.close();
                    this.dialogRef.close(true)
                }, err => {
                    //   this.loader.close();
                    this.errorMessage = err.error ? err.error.ExceptionMessage : "Something Went Wrong"
                    this.snack.open(err.error ? err.error.ExceptionMessage : "Something Went Wrong", 'Clear', {
                        duration: 4000,
                    });
                })
        }

    }

    private _filterCity(value: string): Observable<any> {
        //const filterValue = value.toLowerCase();
        let SndObj = {
            filter: value
        }
        //return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
        return this.__bankService.getCityInfo(SndObj)
    }

    updateForm(item: any, componentid: string) {
        if (componentid && item.Value) {
            this.itemForm['controls'][componentid].setValue(item.Value);
            this.itemForm['controls']["State"].setValue(item.StateCode);
            this.itemForm['controls']["Country"].setValue(item.CountryCode);
        } else {
            console.log('ooops');
        }
    }

    public UpdateAutoDisplay(item) {

        this.cityCtrl.setValue(item.City);

    }




}
