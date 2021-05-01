import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HeaderService {

    private headerContent = new BehaviorSubject({ DynamicHeaderTitle: "", IsUserLogin: false });
    currentHeader = this.headerContent.asObservable();

    constructor() { }

    public PassHeaderContent(HeaderDetail: any) {
        this.headerContent.next(HeaderDetail);
    }
}
