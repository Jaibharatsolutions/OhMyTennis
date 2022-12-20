import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppService } from '../../shared/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminComponent } from '../../model/admin/admin.component';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent extends AdminComponent implements OnInit {

  public hash: string;
  public newAdmin = {
    admin_email: '',
    password: '',
    newpassword: '',
    hash: ''
  }

  passwordfield;
  showPassword = false;
  newPasswordfield;
  showNewPassword = false;

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
    const hash = this.activatedRoute.snapshot.queryParamMap.get('hash');
    if (hash) {
      var hashkey = hash.replace(/'/g, "").toString()
      this.newAdmin.hash = hashkey;
    }

    this.passwordfield = "password";
    this.newPasswordfield = "password";
  }



  onClickPasswordfield() {
    if (this.passwordfield === "password") {
      this.passwordfield = "text";
      this.showPassword = true;
    } else {
      this.passwordfield = "password";
      this.showPassword = false;
    }
  }

  onClickNewPasswordfield() {
    if (this.newPasswordfield === "password") {
      this.newPasswordfield = "text";
      this.showNewPassword = true;
    } else {
      this.newPasswordfield = "password";
      this.showNewPassword = false;
    }
  }

  onSubmitReset(){
    this.spinner.show();
    console.log(this.newAdmin);
    if (this.newAdmin.password == this.newAdmin.newpassword) {
      this.appService.create('/admin/resetPassword', this.newAdmin).subscribe((val) => {
        if (val.isSuccess == true) {
          this.spinner.hide();
          this._showAlertMessage('alert-success', 'Réinitialisation réussie, vérifiez votre courrier');
          this._logout();
        }
        else {
          this.spinner.hide();
          this._showAlertMessage('alert-danger', 'La réinitialisation a échoué');
        }
      })
    } else {
      this._showAlertMessage('alert-danger', 'Le mot de passe ne correspond pas, veuillez réessayer.');
      this.spinner.hide();
    }

  }

  _logout() {
    this._setSession('removeItem');
    this._gotoPath('/');
  }

  /* [ Local Storage - SET, GET, DELETE ] */
  _setSession(method: string, value: any = null) {
    let resp;
    let getItem: any;
    if (method === 'setItem') {
      localStorage.setItem(this._const('SESSION_NAME'), JSON.stringify(value));
      getItem = localStorage.getItem(this._const('SESSION_NAME'));
      resp = (getItem) ? true : false;
    } else if (method === 'getItem') {
      resp = JSON.parse(localStorage.getItem(this._const('SESSION_NAME')));
    } else if (method === 'removeItem') {
      localStorage.removeItem(this._const('SESSION_NAME'));
      getItem = localStorage.getItem(this._const('SESSION_NAME'));
      resp = (getItem) ? false : true;
    }
    return resp;
  }
}
