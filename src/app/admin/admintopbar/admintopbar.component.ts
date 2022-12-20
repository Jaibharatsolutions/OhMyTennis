import { Component, OnInit } from '@angular/core';
import {CONST} from '../../shared/app.constant';
import { from } from 'rxjs';
import {
  ActivatedRoute, NavigationEnd, Routes, RouterModule, Router, RouterLink,
  RouterLinkActive, RouterState, ParamMap
} from '@angular/router';
@Component({
  selector: 'app-admintopbar',
  templateUrl: './admintopbar.component.html',
  styleUrls: ['./admintopbar.component.scss']
})
export class AdmintopbarComponent implements OnInit {

  constructor( public activatedRoute: ActivatedRoute,
    public router: Router,) {  }
    public adminname: any;
  
  capitalizeFLetter(name) { 
      return name[0].toUpperCase() +  
      name.slice(1); 
  } 

  ngOnInit() {
    var admins = JSON.parse(localStorage.getItem("onmytennis"));
      var admin = JSON.parse(admins);
      this.adminname =  this.capitalizeFLetter(admin.first_name + " " + admin.last_name);
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
  _gotoPath($path) {
    this.router.navigate([$path]);
  }

  _adminlogout() {
    console.log('logs come');
    this._setSession('removeItem');
    this._gotoPath('/admin');
  }
  _const(c = null) {
    if (c) {
      return this._fetchFromObject(CONST, c);
    }
    return CONST;
  }
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

}
