import { Component, OnInit, Inject, ChangeDetectorRef  } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ProductMasterService } from '../product-master.service';
//import { AppLoaderService } from '../../../../shared/services/app-loader/app-loader.service';
import { Subscription, of, Observable } from 'rxjs';
import { map, startWith, debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
//import { CommonService } from '../../../common/services/common.service';

@Component({
  selector: 'app-product-master-add-edit',
  templateUrl: './product-master-add-edit.component.html',
  styleUrls: ['./product-master-add-edit.component.scss']
})
export class ProductMasterAddEditComponent implements OnInit {
    public itemForm: FormGroup;
    public errorMessage: string = "";
    public getAddressSub: Subscription;
    public Addresshelp: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<ProductMasterAddEditComponent>,
        private fb: FormBuilder,
        private __productMasterService: ProductMasterService,
        //private loader: AppLoaderService,
        private snack: MatSnackBar,
        //private commonService: CommonService,
        private cdr: ChangeDetectorRef
    ) { }

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
            ProductName: new FormControl(item.ProductName || null),
            Description: new FormControl(item.Description || null),
            HSNCode: new FormControl(item.HSNCode || null),
            BasePrice: new FormControl(item.BasePrice || null),
            Locked: new FormControl(item.Locked || null)
        })
        //this.UpdateAutoDisplay(item);

    }
    submit() {
        this.errorMessage = "";
      //  this.loader.open();
        if (this.data.isNewDialog) {
            this.__productMasterService.saveData(this.itemForm.value)
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
            this.__productMasterService.updateData(this.itemForm.value) // data._id
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

  

}
