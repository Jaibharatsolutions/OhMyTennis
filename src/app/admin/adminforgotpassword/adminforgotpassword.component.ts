import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppService } from '../../shared/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminComponent } from './../../model/admin/admin.component';

@Component({
  selector: 'app-adminforgotpassword',
  templateUrl: './adminforgotpassword.component.html',
  styleUrls: ['./adminforgotpassword.component.scss']
})
export class AdminforgotpasswordComponent extends AdminComponent implements OnInit {

  public newAdmin: any;
  
  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    appService: AppService,
    location: Location,
    spinner: NgxSpinnerService
  ) {
    super(
      activatedRoute,
      router,
      appService,
      location,
      spinner
    );
  }

  ngOnInit() {
    this.newAdmin = {
      admin_email:""
    };
  }

  onSubmitForgot(){
    this.spinner.show();
    this.appService.create('/admin/forgotPassword', this.newAdmin).subscribe((val) => {
      if (val.isSuccess == true) {
        this._showAlertMessage('alert-success', 'Réinitialisation réussie, vérifiez votre courrier');
        this.spinner.hide();
      }
      else {
        this._showAlertMessage('alert-danger', 'La réinitialisation a échoué');
        this.spinner.hide();
      }
    })
  }
}
