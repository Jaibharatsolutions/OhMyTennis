import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppService } from '../../shared/app.service';
import { AppComponent } from '../../app.component';
/* [ Spinner ] */
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss']
})
export class CoachComponent extends AppComponent implements OnInit {

  

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
    
    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    if (coach) {
      var coach1 = JSON.parse(coach);
      if (coach1 && coach1.roleId != 2) {
        this._gotoPath('/');
      }
    }
    else{
      this._gotoPath("/");
    }
  }

  ngOnInit() {
  
  }

}
