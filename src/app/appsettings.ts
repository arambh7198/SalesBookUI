import { Injectable } from '@angular/core';

@Injectable()
export class appSettings {
    BasePath: string = 'http://localhost:4200/'
    API_Config: string = 'http://localhost:57993/api/';
    AttachmentDownloadPath: string = 'http://localhost:61427/FileUpload/';
    ReportDownloadPath: string = 'http://localhost:61427/download/';
    ClientName: string = 'Sales Book';

    //URLPath: string = 'http://103.142.175.116/';
    //BasePath: string = this.URLPath + 'UI/';
    //API_Config: string = this.URLPath + 'SalesBookAPI/api/';
    //AttachmentDownloadPath: string = this.URLPath + 'SalesBookAPI/FileUpload/';
    //ReportDownloadPath: string = this.URLPath + 'SalesBookAPI/download/';
    //ClientName: string = 'Sales Book';
    
}          
