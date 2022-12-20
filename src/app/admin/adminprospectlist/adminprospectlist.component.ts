import { Component, OnInit, ViewChild } from "@angular/core";
import { AppService } from "../../shared/app.service";
import { AppComponent } from "../../app.component";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Location } from "@angular/common";
import { FullCalendarComponent } from "@fullcalendar/angular";
import dayGridView from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import * as moment from "moment";
import { AdminComponent } from "./../../model/admin/admin.component";

declare var $;
@Component({
  selector: "app-adminprospectlist",
  templateUrl: "./adminprospectlist.component.html",
  styleUrls: ["./adminprospectlist.component.scss"],
})
export class AdminprospectlistComponent
  extends AdminComponent
  implements OnInit
{
  title = "angulardatatables";

  dtOptions: DataTables.Settings = {};
  dataprospectlist: [];
  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    appService: AppService,
    location: Location,
    spinner: NgxSpinnerService
  ) {
    super(activatedRoute, router, appService, location, spinner);
  }

  //public dataprospectlist = [
  getUsersData() {
    this.appService.getAll("/admin/getUsers").subscribe((response) => {
      if ((response as any).data.user_list.length > 0) {
        if (response && response["data"]) {
          let dat = (response as any).data.user_list;

          //console.log(dat);
          let data = dat.map((value) => {
            return {
              slno: value.id,
              prospectname: value.firstName,
              email: value.email,
              pincode: value.postalCode,
              status: value.isActive,
            };
          });
          this.dataprospectlist = data;
          //console.log('data~~~ ',this.dataprospectlist)
          // for (let i = 0; i < dat.length; i++) {
          // {'slno':'1'+','+prospectname: 'Arun', location: 'Location 1', pincode:'92100'},
          // }
        }
      }
    });
  }

  ngOnInit() {
    this.getUsersData();
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   processing: true
    // };
    setTimeout(function () {
      $("#datatable").DataTable({
        responsive: true,
      });
    }, 210);
  }

  getuser(id) {
    this.router.navigate(["/admin/prospectedit"], {
      queryParams: { User_id: id },
    });
  }

  changeuserstatus(id) {
    let User_id = {
      User_id: id,
    };
    this.appService
      .create("/admin/userstatustoactive", User_id)
      .subscribe((response) => {
        if (response && response.isSuccess == true) {
          window.scrollTo(0, 0);
          this._showAlertMessage("alert-success", "Mise à jour avec succés");
          window.location.reload();
        }
      });
  }
  changeuserstatus1(id) {
    console.log(id);
    let User_id = {
      User_id: id,
    };
    this.appService
      .create("/admin/userstatustoinactive", User_id)
      .subscribe((response) => {
        if (response && response.isSuccess == true) {
          window.scrollTo(0, 0);
          this._showAlertMessage("alert-success", "Mise à jour avec succés");
          window.location.reload();
        }
      });
  }
}
