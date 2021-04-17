import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { appSettings } from '../appsettings';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SalesService {
    public controllerName: string = "Sales";
    public commonControllerName: string = "Common";

    constructor(
        public __http: HttpClient,
        private __appSettings: appSettings) { }


    public getPartyInfo(query: any): Observable<any> {
        if (query) {
            return this.__http.post(this.__appSettings.API_Config + this.commonControllerName + '/getPartyInfo', query);
        }
    }

    public saveSales(data: any): Observable<any> {
        if (data) {
            return this.__http.post(this.__appSettings.API_Config + this.controllerName + '/saveSales', data);
        }
    }


}
