import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { appSettings } from '../appsettings';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductMasterService {
    public controllerName: string = "Product";

    constructor(
        public http: HttpClient,
        private appSettings: appSettings
    ) { }

    public getData(query: any): Observable<any> {
        if (query) {
            return this.http.post(this.appSettings.API_Config + this.controllerName + '/getData', query);
        }
    }

    public saveData(item: any) {
        if (item) {
            return this.http.post(this.appSettings.API_Config + this.controllerName + '/saveData', item);
        }
    }

    public updateData(item: any) {
        if (item) {
            return this.http.post(this.appSettings.API_Config + this.controllerName + '/updateData', item);
        }
    }

    public deleteData(item: any) {
        if (item) {
            return this.http.delete(this.appSettings.API_Config + this.controllerName + '/deleteData?Code=' + item.Code, item);
        }
    }
}
