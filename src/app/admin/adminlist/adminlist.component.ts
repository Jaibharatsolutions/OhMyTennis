import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { AppService } from "../../shared/app.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Location } from "@angular/common";
import { FullCalendarComponent } from "@fullcalendar/angular";
import dayGridView from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { AdminComponent } from "./../../model/admin/admin.component";

@Component({
  selector: "app-adminlist",
  templateUrl: "./adminlist.component.html",
  styleUrls: ["./adminlist.component.scss"],
})
export class AdminlistComponent extends AdminComponent implements OnInit {
  dataadminlist: [];
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
    this.getadminData();
    setTimeout(function () {
      $("#datatable").DataTable({
        responsive: true,
      });
    }, 210);
  }

  getadminData() {
    this.appService.getAll("/admin/getAdminDetails").subscribe((response) => {
      if ((response as any).data.admin_list.length > 0) {
        if (response && response["data"]) {
          let dat = (response as any).data.admin_list;

          //console.log(dat);
          let data = dat.map((value) => {
            return {
              slno: value.admin_id,
              adminname: value.first_name,
              email: value.admin_email,
              phone: value.mobile,
              status: value.status,
            };
          });
          this.dataadminlist = data;
          // console.log('data~~~ ',this.dataprospectlist)
          // for (let i = 0; i < dat.length; i++) {
          // {'slno':'1'+','+prospectname: 'Arun', location: 'Location 1', pincode:'92100'},
          // }
        }
      }
    });
  }

  getadmin(id) {
    this.router.navigate(["/admin/adminedit"], {
      queryParams: { admin_id: id },
    });
  }

  changeadminstatus(id) {
    let admin_id = {
      admin_id: id,
    };
    this.appService
      .create("/admin/adminstatus", admin_id)
      .subscribe((response) => {
        if (response && response.isSuccess == true) {
          window.scrollTo(0, 0);
          this._showAlertMessage("alert-success", "Mise à jour avec succés");
          window.location.reload();
        }
      });
  }
}
