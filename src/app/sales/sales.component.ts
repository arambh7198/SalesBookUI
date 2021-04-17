import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'; // import router from angular router

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

    constructor(private __route: Router) { }

  ngOnInit(): void {
  }


  public addEditSales() {
      this.__route.navigate(['/salesAddEdit'])
  }

  public email: any;
}
