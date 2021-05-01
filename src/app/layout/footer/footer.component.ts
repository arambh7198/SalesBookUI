/// <reference path="footer.service.ts" />
import { Component, OnInit } from '@angular/core';
import { FooterService } from './footer.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    public currentDate: Date = new Date();
    public userName: string = "";
    public IPAddress: string = "";

    constructor(
        private footerService: FooterService
    ) { }

    ngOnInit(): void {
        this.footerService.currentFooter.subscribe(RtnData => {
            this.userName = RtnData != null ? RtnData.UserName : "";
            this.IPAddress = RtnData != null ? RtnData.IPAddress : "";
        })

        setInterval(() => {
            this.currentDate = new Date();
        }, 1000);
    }

}
