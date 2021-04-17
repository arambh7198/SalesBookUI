import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpHeaders,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    // This method should be written in commonAPI service and called from there

    constructor(
        private router: Router
    ) {
    }

    public getCookie(cname: string): string {
        const name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //alert();
        let changedRequest = request;
        // HttpHeader object immutable - copy values
        const headerSettings: { [name: string]: string | string[]; } = {};

        for (const key of request.headers.keys()) {
            headerSettings[key] = request.headers.getAll(key)!;
        }
        // For Production environment
        //headerSettings['x-access-token'] = sessionStorage.getItem("loginToken") ? sessionStorage.getItem("loginToken") : "";
        //headerSettings['x-access-activityCode'] = sessionStorage.getItem("activityCode") ? sessionStorage.getItem("activityCode") : "";
        //headerSettings['x-access-compSysCode'] = sessionStorage.getItem("currentCompSysCode") ? sessionStorage.getItem("currentCompSysCode") : "";

        // For Rahul 
        //headerSettings['x-access-token'] = "GLbK81Gf+BwFF8mK0Blm9hZMkuH/5QT9nwIXgYes/517Ra4Se8e3tJSRdPzLb3BO";
        //headerSettings['x-access-activityCode'] ="61"//this.getCookie("TaskManageractivityCode");
        //headerSettings['x-access-compSysCode'] = "1"//this.getCookie("TaskManageractivityCode"); 

        // For Development
        headerSettings['x-access-token'] = sessionStorage.getItem("x-access-token") ? sessionStorage.getItem("x-access-token")! : "";
        headerSettings['MindCubeKey'] = sessionStorage.getItem("MindCubeKey") ? sessionStorage.getItem("MindCubeKey")! : "";


        //headerSettings['content-Type'] = "application/json; charset=utf-8";
        headerSettings['Accept'] = "application/json";
        const newHeader = new HttpHeaders(headerSettings);
        changedRequest = request.clone({
            headers: newHeader
        });

        return next.handle(changedRequest)
            .pipe(catchError((err: any, caught: any) => {
                //console.log(err)
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.router.navigate(['login'], { skipLocationChange: true })!;
                    }
                    //return Observable.throw(err)!;
                    return throwError(err);
                }
                //return Observable.throw(err);
                return throwError(err);
            }) as any);
    }
}