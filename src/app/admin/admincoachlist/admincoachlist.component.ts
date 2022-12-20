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
  selector: "app-admincoachlist",
  templateUrl: "./admincoachlist.component.html",
  styleUrls: ["./admincoachlist.component.scss"],
})
export class AdmincoachlistComponent extends AdminComponent implements OnInit {
  title = "angulardatatables";
  // public image = 'https://www.w3schools.com/howto/img_avatar.png';
  @Input() data: String;

  datacoachlist: [];
  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    appService: AppService,
    location: Location,
    spinner: NgxSpinnerService
  ) {
    super(activatedRoute, router, appService, location, spinner);
  }

  getCoachData() {
    this.appService.getAll("/admin/getcoaches").subscribe((response) => {
      if ((response as any).data.coach_list.length > 0) {
        if (response && response["data"]) {
          let dat = (response as any).data.coach_list;

          //console.log(dat);
          let data = dat.map((value) => {
            return {
              slno: value.id,
              coachname: value.firstName,
              email: value.email,
              phone: value.postalCode,
              status: value.isActive,
            };
          });
          this.datacoachlist = data;
          // console.log('data~~~ ',this.dataprospectlist)
          // for (let i = 0; i < dat.length; i++) {
          // {'slno':'1'+','+prospectname: 'Arun', location: 'Location 1', pincode:'92100'},
          // }
        }
      }
    });
  }

  ngOnInit() {
    this.getCoachData();
    setTimeout(function () {
      $("#datatable").DataTable({
        responsive: true,
      });
    }, 210);
  }
  getcoach(id) {
    this.router.navigate(["/admin/coachedit"], {
      queryParams: { email: id },
    });
  }

  changecoachstatus(id) {
    console.log(id);
    let Coach_id = {
      Coach_id: id,
    };
    this.appService
      .create("/admin/coachstatustoactive", Coach_id)
      .subscribe((response) => {
        if (response && response.isSuccess == true) {
          window.scrollTo(0, 0);
          this._showAlertMessage("alert-success", "Mise à jour avec succés");
          window.location.reload();
        }
      });
  }
  changecoachstatus1(id) {
    let Coach_id = {
      Coach_id: id,
    };
    this.appService
      .create("/admin/coachstatustoinactive", Coach_id)
      .subscribe((response) => {
        if (response && response.isSuccess == true) {
          window.scrollTo(0, 0);
          this._showAlertMessage("alert-success", "Mise à jour avec succés");
          window.location.reload();
        }
      });
  }
}
