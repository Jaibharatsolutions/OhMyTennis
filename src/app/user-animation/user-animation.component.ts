import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AppComponent } from "../app.component";
import { Location } from "@angular/common";

@Component({
  selector: "app-user-animation",
  templateUrl: "./user-animation.component.html",
  styleUrls: ["./user-animation.component.scss"]
})
export class UserAnimationComponent extends AppComponent implements OnInit {
  public service: any;
  public Ville: string = "";

  public response = [
    {
      Location: "",
      Postalcode: "",
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
    // var pcode = localStorage.getItem("onmytennis")
    // var postalCode = JSON.parse(JSON.parse(pcode));
    // if (postalCode) {
    //   this.Ville = postalCode.postalCode;
    //   this.searchEvent()
    // }
    // else {
    setTimeout(() => {
      this.getAnimationCourse();
    }, 1500);
    //}
  }

  getAnimationCourse() {
    this.spinner.show();
    var course = {
      P_course: "Animation"
    };
    this.spinner.show();
    this.appService
      .getAll("/coachdetail/getallcourse", course)
      .subscribe(res => {
        if (res["isSuccess"] == true) {
          this.response = (res as any).data.event_list;
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      });
  }

  gotoCoach(res) {
    if (localStorage.getItem("onmytennis") !== null) {
      var data = JSON.stringify(res);
      localStorage.setItem("Event", data);
      this.router.navigate(["/animation-detail"]);
    } else {
      this.router.navigate(["/login"]);
    }
  }

  searchEvent() {
    this.spinner.show();
    var data = {
      P_course: "Animation",
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
