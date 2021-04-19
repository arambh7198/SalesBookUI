import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { appSettings } from '../appsettings';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BankService {
    public controllerName: string = "Bank";
    public commonControllerName: string = "Common";

    constructor(
        public __http: HttpClient,
        private __appSettings: appSettings
    ) { }

    public getData(query: any): Observable<any> {
        if (query) {
            return this.__http.post(this.__appSettings.API_Config + this.controllerName + '/getData', query);
        }
    }

    public saveData(item: any) {
        if (item) {
            return this.__http.post(this.__appSettings.API_Config + this.controllerName + '/saveData', item);
        }
    }

    public updateData(item: any) {
        if (item) {
            return this.__http.post(this.__appSettings.API_Config + this.controllerName + '/updateData', item);
        }
    }

    public deleteData(item: any) {
        if (item) {
            return this.__http.delete(this.__appSettings.API_Config + this.controllerName + '/deleteData?Code=' + item.Code, item);
        }
    }

    public getCityInfo(query: any): Observable<any> {
        if (query) {
            return this.__http.post(this.__appSettings.API_Config + this.commonControllerName + '/getCityInfo', query);
        }
    }

}
