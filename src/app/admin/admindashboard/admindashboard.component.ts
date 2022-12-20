import { Component, OnInit } from "@angular/core";
import { AppService } from "../../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AdminComponent } from "src/app/model/admin/admin.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-admindashboard",
  templateUrl: "./admindashboard.component.html",
  styleUrls: ["./admindashboard.component.scss"]
})
export class AdmindashboardComponent extends AdminComponent implements OnInit {
  public rowDataCollection: any = [];
  public data: any = [];
  public Fdata: any = [];
  public datanew = [];

  title = "angulardatatables";
  coachcount: any;
  usercount: any;
  courtcount: any;

  dtOptions: DataTables.Settings = {};
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
    var admins = JSON.parse(localStorage.getItem("onmytennis"));
    var admin = JSON.parse(admins);
    if (admin) {
      this.getallbookings();
      this.getallcounts();
      setTimeout(function() {
        $("#datatable").DataTable({
          responsive: true
        });
      }, 310);
    } else {
      this._gotoPath("/admin");
    }
  }

  getallbookings() {
    this.appService.getAll("/admin/getallbookings").subscribe(response => {
      if ((response as any).data.booking_list.length > 0) {
        if (response && response["data"]) {
          let dat = (response as any).data.booking_list;

          //console.log(dat);
          let data = dat.map(value => {
            return {
              slno: value.booking_Id,
              name: value.firstName + " " + value.lastName,
              location: value.amount,
              servicetype: value.bookingCourse,
              paymentstatus: value.status
            };
          });
          this.datanew = data;
        }
      }
    });
  }

  getallcounts() {
    this.appService.getAll("/admin/getallcount").subscribe(response => {
      if (response && response["data"]) {
        var data = response["data"];
        console.log(data);
        this.courtcount = data.courtcount;
        this.coachcount = data.coachcount;
        this.usercount = data.userscount;
      }
    });
  }
}
