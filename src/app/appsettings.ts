import { Injectable } from '@angular/core';

@Injectable()
export class appSettings {
    BasePath: string = 'http://localhost:4200/'
    API_Config: string = 'http://localhost:57993/api/';
    AttachmentDownloadPath: string = 'http://localhost:61427/FileUpload/';
    ReportDownloadPath: string = 'http://localhost:61427/download/';
    ClientName: string = 'G.M.Gems Board';

    //URLPath: string = 'http://103.142.175.116/';
    //BasePath: string = this.URLPath + 'UI/';
    //API_Config: string = this.URLPath + 'API/api/';
    //AttachmentDownloadPath: string = this.URLPath + 'API/FileUpload/';
    //ReportDownloadPath: string = this.URLPath + 'API/download/';
    //ClientName: string = 'G.M.Gems Board';
    
}          
