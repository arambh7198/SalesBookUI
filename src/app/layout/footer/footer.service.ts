import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

    private footerContent = new BehaviorSubject({ UserName : "", IPAddress: "" });
    currentFooter = this.footerContent.asObservable();

    constructor() { }

    public PassFooterContent(FooterDetail: any) {
        this.footerContent.next(FooterDetail);
    }
}
