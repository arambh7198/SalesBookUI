/// <reference path="../footer/footer.service.ts" />
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';
import { FooterService } from '../footer/footer.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public DynamicHeaderTitle: string = "MindCube SmartTool";
    public IsUserLogin: boolean = false;
    @Output() public sidenavToggle = new EventEmitter();
    public hideLogout: boolean = false;

    constructor(
        private router: Router,
        private headerService: HeaderService,
        private footerService: FooterService
    ) { }

    ngOnInit(): void {
        this.DynamicHeaderTitle ="SalesBook"
        this.headerService.currentHeader.subscribe(RtnData => {
            this.DynamicHeaderTitle =  RtnData != null ? RtnData.DynamicHeaderTitle : "Welcome to MindCube SmartTool";
            this.IsUserLogin = RtnData != null ? RtnData.IsUserLogin : false;
        })
        if (this.router.url == "/") {
            this.hideLogout = true;
        }; // 
    }

    public logout() {
        sessionStorage.clear();
        this.headerService.PassHeaderContent({ "DynamicHeaderTitle": "Welcome to SalesBook", IsUserLogin: false });
        this.footerService.PassFooterContent({ "UserName": null, "IPAddress": null });
        this.router.navigate(['/login']);
    }

    public onToggleSidenav = () => {
        this.sidenavToggle.emit();
    }
}
