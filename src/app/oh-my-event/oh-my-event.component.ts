import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AppComponent } from "../app.component";
import { Location } from "@angular/common";

@Component({
  selector: "app-oh-my-event",
  templateUrl: "./oh-my-event.component.html",
  styleUrls: ["./oh-my-event.component.scss"]
})
export class OhMyEventComponent extends AppComponent implements OnInit {
  public min = new Date();
  public date: any = "";
  public respon: any;
  public search = {
    course: "",
    date: "",
    session: "",
    ville: "",
    rayon: ""
  };
  public service: any;
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
    this.getcoach();
    //this.findCoach();
  }

  getcoach() {
    this.spinner.show();
    var date = sessionStorage.getItem("Date");
    const ville = {
      ville: sessionStorage.getItem("Ville"),
      date: sessionStorage.getItem("Date")
    };
    this.search.ville = sessionStorage.getItem("Ville");
    this.search.date = sessionStorage.getItem("Date");
    this.date = sessionStorage.getItem("Date");
    this.appService
      .getAll("/coach/getcoachbycity", this.search)
      .subscribe(data => {
        if (data && data["data"]) {
          this.respon = (data as any).data.coach_list;
          //console.log(this.respon)
          this.spinner.hide();
        }
      });
  }
  findCoach(search) {
    this.spinner.show();
    localStorage.setItem("Course", search.course);
    if (this.date != "") search.date = this.formatDate(this.date);
    this.appService.getAll("/coach/findyourCoach", search).subscribe(data => {
      if (data && data["data"]) {
        this.respon = (data as any).data.coach_list;
        this.spinner.hide();
      }
    });
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  gotoCouch(ser, res) {
    if (localStorage.getItem("onmytennis") !== null) {
      var data = JSON.stringify(res);
      localStorage.setItem("Coach", data);
      localStorage.setItem("Course", ser);
      this.router.navigate(["/coachdetail"]);
    } else {
      this.router.navigate(["/login"]);
    }
  }
}
