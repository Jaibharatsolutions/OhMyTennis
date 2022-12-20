import { Component, OnInit } from '@angular/core';
import { UserComponent } from '../model/user/user.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../shared/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.scss']
})
export class UserdashboardComponent extends UserComponent implements OnInit {

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

  CoursIndividuel: any;
  CoursCollectifOndemand: any;
  CoursCollectifClub: any;
  Stage: any;
  Tournament: any;
  TeamBuilding: any;
  Animation: any;

  ngOnInit() {
    var titile = document.getElementsByClassName("brand");
    if (titile)
      titile[0].innerHTML = 'TABLEAU DE BORD';
      this.getcoursecount();
  }

  getcoursecount(){

    var users = JSON.parse(localStorage.getItem("onmytennis"));
    var user = JSON.parse(users);
    var userid = {
      "User_ID": user.id
    }

    this.spinner.show();
    //console.log("dashboard.components.ts", coachid);
    this.appService.create("/user/getallreservationcounts", userid).subscribe(response => {
      if (response && response["data"]) {
        var data = response["data"];
        //console.log(data);
        this.CoursIndividuel = data.CoursIndividuel;
        this.CoursCollectifOndemand = data.CoursCollectifOndemand;
        this.CoursCollectifClub = data.CoursCollectifClub;
        this.Stage = data.Stage;
        this.Tournament = data.Tournament;
        this.TeamBuilding = data.TeamBuilding;
        this.Animation = data.Animation;
      }
      this.spinner.hide();
    });
  }

}
