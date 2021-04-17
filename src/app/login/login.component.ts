import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service'
import { Router } from '@angular/router';
//import { HeaderService } from '../layout/header/header.service';
//import { FooterService } from '../layout/footer/footer.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


    public loginName: string = "";
    public password: string = "";
    public loginLoader: boolean = false;
    public loginNameError: string = "";
    public passwordError: string = "";

    constructor(
        private loginService: LoginService,
        private router: Router,
       // private headerService: HeaderService,
        //private footerService: FooterService
    ) { }

    ngOnInit(): void {
        //this.headerService.PassHeaderContent({ "DynamicHeaderTitle": "Welcome to MindCube SmartTool", IsUserLogin: false });
    }

    public login() {
        this.loginNameError = "";
        this.passwordError = "";
        if (!this.loginName) {
            this.loginNameError = "Kindly Enter Login Name";
            if (!this.password) {
                this.passwordError = "Kindly Enter Password";
            }
            return;
        }
        if (!this.password) {
            this.passwordError = "Kindly Enter Password";
            return;
        }
        this.loginLoader = true;
        let SndData = {
            UserName: this.loginName,
            Password: this.password
        }
        this.loginService.login(SndData).subscribe(RtnData => {
            sessionStorage.setItem("x-access-token", RtnData.Data[0].Token);
            sessionStorage.setItem("UserCode", RtnData.Data[0].UserCode);
            sessionStorage.setItem("UserName", RtnData.Data[0].UserName);
            sessionStorage.setItem("SessionID", RtnData.Data[0].SessionCode);
            sessionStorage.setItem("MindCubeKey", RtnData.Data[0].MindCubeKey);

      //      this.footerService.PassFooterContent({ "UserName": RtnData.Data[0].UserName, "IPAddress": "" });

            this.router.navigate(['/sales']);
            this.loginLoader = false;

        }, Error => {
            this.loginLoader = false;
            alert(Error.error.ExceptionMessage)
        })

    }

}
