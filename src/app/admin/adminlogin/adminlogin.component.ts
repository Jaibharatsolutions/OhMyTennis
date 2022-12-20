import { Component, OnInit, AfterViewChecked } from '@angular/core';

import {
  FormsModule, FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule, FormArray, EmailValidator
} from '@angular/forms';
import { Location } from '@angular/common';
import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppService } from '../../shared/app.service';
import { AdminComponent } from './../../model/admin/admin.component';
/* [ Spinner ] */
import { NgxSpinnerService } from 'ngx-spinner';
import { async } from 'q';
declare const $: any;

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent extends AdminComponent implements OnInit {

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
      admin_email:"",
      password:""
    };
  }

  onSubmitAdmin(isValid) {
    if (isValid.form.status === 'VALID') {
      this.spinner.show();
      this.appService.create('/admin', this.newAdmin)
        .subscribe(response => {
          if (response && response.data) {
            
            if (response.isSuccess == true) {
              if (response.data.length !== 0) {
                  if (this._setSession('setItem', JSON.stringify(response.data)) === true) {
                 
                    this._gotoPath(this._const('PATH.ADMIN.SELF')+'/'+this._const('PATH.ADMIN.DASHBOARD.SELF'));
                  }
              }
              this.spinner.hide();
            } else if (response.isSuccess == false) {
              this._showAlertMessage('alert-danger', "Échec de la connexion");
              this.spinner.hide();
            }
          }
        }, error => {
        });
    }
  }
}
