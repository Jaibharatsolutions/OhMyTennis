import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/shared/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends AppComponent implements OnInit {

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
      if (coach1 && coach1.roleId != 1) {
        this._gotoPath(this._const('PATH.COACH.SELF'));
      }
    }
    else{
      this._gotoPath("/");
    }
  }

  ngOnInit() {
  }

}
