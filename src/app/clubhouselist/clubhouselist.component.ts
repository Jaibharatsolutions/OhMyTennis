import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AppComponent } from "../app.component";
import { Location } from "@angular/common";
import * as moment from "moment";
//declare var ol: any;
@Component({
  selector: "app-clubhouselist",
  templateUrl: "./clubhouselist.component.html",
  styleUrls: ["./clubhouselist.component.scss"]
})
export class ClubhouselistComponent extends AppComponent implements OnInit {
  public service: any;
  public Ville: string = "";

  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    appService: AppService,
    location: Location,
    spinner: NgxSpinnerService
  ) {
    super(activatedRoute, router, appService, location, spinner);
  }

  public response = [
    {
      court_name: "",
      Postalcode: "",
      courtfile: "",
      court_address: "",
      court_id: ""
    }
  ];

  ngOnInit() {
    var pcode = localStorage.getItem("onmytennis");
    var postalCode = JSON.parse(JSON.parse(pcode));

    if (postalCode) {
      this.Ville = postalCode.postalCode;

      this.searchEvent();
    } else {
      this.getCourtData();
    }
  }
  getCourtData() {
    this.appService.getAll("/admin/getallcourts").subscribe(data => {
      if ((data as any).data.court_list.length > 0) {
        if (data && data["data"]) {
          this.response = (data as any).data.court_list;
          this.spinner.hide();
        }
      }
    });
  }

  searchEvent() {
    this.spinner.show();
    var court_postal_code = {
      court_postal_code: this.Ville
    };

    this.appService
      .create("/admin/getclubbypostal", court_postal_code)
      .subscribe(data => {
        if ((data as any).isSuccess == true) {
          this.response = (data as any).data.court_list;
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      });
  }

  getClub(res) {
    var data = JSON.stringify(res);
    localStorage.setItem("Club", data);
    this.router.navigate(["/clubhouse-view"]);
  }
}
