import { Component, OnInit } from "@angular/core";
import { CoachComponent } from "../../model/coach/coach.component";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Location } from "@angular/common";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent extends CoachComponent implements OnInit {
  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    appService: AppService,
    location: Location,
    spinner: NgxSpinnerService
  ) {
    super(activatedRoute, router, appService, location, spinner);
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
    if (titile) titile[0].innerHTML = "TABLEAUX DE BORD";
    this.geteachcoursecount();
  }

  geteachcoursecount() {
    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    var coach1 = JSON.parse(coach);
    var coachid = {
      Coach_ID: coach1.id
    };
    this.spinner.show();
    //console.log("dashboard.components.ts", coachid);
    this.appService.create("/getallcourscount", coachid).subscribe(response => {
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
