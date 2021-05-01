import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
    @Output() sidenavClose = new EventEmitter();

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    public onSidenavClose(routerPath : string) : void {
        this.sidenavClose.emit();
        this.router.navigate(['/' + routerPath]);
    }

}
