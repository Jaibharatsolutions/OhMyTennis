import { Component, OnInit } from '@angular/core';
import { UserComponent } from '../model/user/user.component';
import { Location } from '@angular/common';
import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppService } from 'src/app/shared/app.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-usertopnavbar',
  templateUrl: './usertopnavbar.component.html',
  styleUrls: ['./usertopnavbar.component.scss']
})
export class UsertopnavbarComponent extends UserComponent implements OnInit {

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

  _getSession(val = null) {
    const data = JSON.parse(this._setSession('getItem'));
    if (val) {
      return data[val];
    }
    return data;
  }

}
