import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Location } from '@angular/common';
import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppService } from '../../shared/app.service';
import { CoachComponent } from './../../model/coach/coach.component';
/* [ Spinner ] */
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent extends CoachComponent implements OnInit {

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
  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
      var element = document.getElementsByClassName("sidebar");
      if(element)
      element[0].classList.toggle("show");

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
}
