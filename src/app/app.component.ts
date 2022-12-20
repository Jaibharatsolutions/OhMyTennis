import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  ActivatedRoute, NavigationEnd, Routes, RouterModule, Router, RouterLink,
  RouterLinkActive, RouterState, ParamMap
} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
/* [ Spinner ] */
import { NgxSpinnerService } from 'ngx-spinner';
/* [ App Service ] */
import { AppService } from './shared/app.service';
/* [ Constant ] */
import { CONST } from './shared/app.constant';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public activeRoutePath: string;

  public alertMsg: any = {
    type: '',
    msg: '',
    show: false
  };

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public appService: AppService,
    public location: Location,
    public spinner: NgxSpinnerService
  ) {
    this.activeRoutePath = activatedRoute.snapshot.url.join('');
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
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
      localStorage.removeItem('Course');
      localStorage.removeItem('Coach');
      localStorage.removeItem('Event');
      getItem = localStorage.getItem(this._const('SESSION_NAME'));
      resp = (getItem) ? false : true;
    }
    return resp;
  }

  /**
   * get the session value
   * @param val - session value
   */
  _getSession(val = null) {
    const data = JSON.parse(this._setSession('getItem'));
    if (val) {
      return data[val];
    }
    return data;
  }

  _logout() {
    this._setSession('removeItem');
    this._gotoPath('/');
  }

  /* [ Get Constant Value ] */
  _const(c = null) {
    if (c) {
      return this._fetchFromObject(CONST, c);
    }
    return CONST;
  }
  /* [ Fetch from Object ] */
  _fetchFromObject(obj, prop) {
    if (typeof obj === 'undefined') {
      return false;
    }
    const index = prop.indexOf('.');
    if (index > -1) {
      return this._fetchFromObject(obj[prop.substring(0, index)], prop.substr(index + 1));
    }
    return obj[prop];
  }

  /* [ Navigate to the path ] */
  _gotoPath($path) {
    this.router.navigate([$path]);
  }

  /* [ go back to previous location ] */
  _goBack() {
    this.location.back();
  }

  /* [ reload the current location ] */
  _reload() {
    window.location.reload();
  }

  /* [ Get Route Path ] */
  _activeRoutePath($path = null) {
    return this.router.url.split('/')[1];
  }

  /* [ Show Hide Alert Messages ] */
  _showAlertMessage(c: string, t: string): void {
    $('.alert-dismissible').show();
    this.alertMsg.type = c;
    this.alertMsg.msg = t;
    this.alertMsg.show = true;
    
    setTimeout(function(){
      $('.alert-dismissible').hide();
    }, 3000)
  }


  _closeAlertMessage(e) {
    if (e) {
      this.alertMsg.type = '';
      this.alertMsg.msg = '';
      this.alertMsg.show = false;
    }
  }

}
