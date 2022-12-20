import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppService } from '../../shared/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminComponent } from '../../model/admin/admin.component';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent extends AdminComponent implements OnInit {

  public changePassword: any;
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
    this.changePassword = {
      admin_id: '',
      password: '',
      newpassword: '',
      conpassword:''
    }

  }

  onSubmit(){
    var admins = JSON.parse(localStorage.getItem("onmytennis"));
      var admin = JSON.parse(admins);
      this.changePassword.admin_id = admin.admin_id;
      this.spinner.show();

      console.log('change inside');
      console.log(this.changePassword);

      if (this.changePassword.password != this.changePassword.newpassword) {
        console.log('change 1');
        if (this.changePassword.newpassword == this.changePassword.conpassword) {
          this.appService.create('/admin/changePassword', this.changePassword).subscribe((val) => {

            console.log(val);
            if (val.isSuccess == true) {
              console.log('change 2');
              this.spinner.hide();
              this._showAlertMessage('alert-success', 'Réinitialisation réussie, vérifiez votre courrier');
              this._logout();
            }
            else {
              this.spinner.hide();
              console.log('change 3');
              this._showAlertMessage('alert-danger', 'La réinitialisation a échoué');
            }
          })
        }else {
          console.log('change 4');
          this._showAlertMessage('alert-danger', 'Le mot de passe ne correspond pas, veuillez réessayer.');
          this.spinner.hide();
        }
      } else {
        console.log('change 4');
        this._showAlertMessage('alert-danger', 'Le mot de passe ne correspond pas, veuillez réessayer.');
        this.spinner.hide();
      }
  }

  goBack(){
    this.router.navigate(["/admin/dashboard"], {
      queryParams: {}
    });
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
