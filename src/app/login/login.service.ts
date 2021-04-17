import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { appSettings } from '../appsettings';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

    public controllerName: string = "Login";

    constructor(public http: HttpClient,
        private __appSettings: appSettings) { }

    public login(obj: any): Observable<any> {
        return this.http.post(this.__appSettings.API_Config + this.controllerName + '/AuthenticateUser', obj);
    }

}
