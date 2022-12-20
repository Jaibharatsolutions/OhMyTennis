import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AppComponent } from "../app.component";
import { Location } from "@angular/common";
import * as moment from "moment";

@Component({
  selector: "app-user-teambuilding",
  templateUrl: "./user-teambuilding.component.html",
  styleUrls: ["./user-teambuilding.component.scss"]
})
export class UserTeambuildingComponent extends AppComponent implements OnInit {
  public service: any;
  public Ville: string = "";

  public response = [
    {
      Coach_Id: "",
      Description: "",
      Eventdetails: "",
      Mode_of_transport: "",
      Photo: ""
    }
  ];
  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    appService: AppService,
    location: Location,
    spinner: NgxSpinnerService
  ) {
    super(activatedRoute, router, appService, location, spinner);
  }

  ngOnInit() {
    // var pcode = localStorage.getItem("onmytennis");
    // var postalCode = JSON.parse(JSON.parse(pcode));
    // if (postalCode) {
    //   this.Ville = postalCode.postalCode;
    //   this.searchEvent();
    // } else {
    setTimeout(() => {
      this.geTeambuildingCourse();
    }, 1500);
    //}
  }

  geTeambuildingCourse() {
    this.spinner.show();
    var course = {
      P_course: "TeamBuilding"
    };
    this.appService
      .getAll("/coachdetail/getallcourse", course)
      .subscribe(res => {
        if (res["isSuccess"] == true) {
          this.response = (res as any).data.event_list;
          console.log(this.response);
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      });
  }

  gotoCoach(res) {
    console.log(res);
    if (localStorage.getItem("onmytennis") !== null) {
      var data = JSON.stringify(res);
      localStorage.setItem("Event", data);
      this.router.navigate(["/team-building-detail"]);
    } else {
      this.router.navigate(["/login"]);
    }
  }

  searchEvent() {
    this.spinner.show();
    var data = {
      P_course: "TeamBuilding",
      P_date: "",
      P_postalcode: this.Ville
    };

    this.appService.getAll("/coachdetail/getevent", data).subscribe(data => {
      if ((data as any).isSuccess == true) {
        this.response = (data as any).data.event_list;
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
  }
}
