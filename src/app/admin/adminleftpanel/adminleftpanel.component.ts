import { Component, OnInit, AfterViewChecked } from "@angular/core";
import { Location } from "@angular/common";
import { BrowserModule, Title, Meta } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { AppService } from "../../shared/app.service";
import { AdminComponent } from "../../model/admin/admin.component";
/* [ Spinner ] */
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-adminleftpanel",
  templateUrl: "./adminleftpanel.component.html",
  styleUrls: ["./adminleftpanel.component.scss"]
})
export class AdminleftpanelComponent extends AdminComponent implements OnInit {
  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    appService: AppService,
    location: Location,
    spinner: NgxSpinnerService
  ) {
    super(activatedRoute, router, appService, location, spinner);
  }

  ngOnInit() {}

  leftPanel() {
    return [
      {
        title: "TABLEAU DE BORD",
        path:
          "/" +
          this._const("PATH.ADMIN.SELF") +
          "/" +
          this._const("PATH.ADMIN.DASHBOARD.SELF"),
        iclass: "fas fas-th-large",
        style: false,
      },
      {
        title: "LES SERVICE",
        path:
          "/" +
          this._const("PATH.ADMIN.SELF") +
          "/" +
          this._const("PATH.ADMIN.ADMINSERVICE.SELF"),
        iclass: "fas fas-cogs",
        style: false,
      },
      {
        title: "COURT DE TENNIS",
        path:
          "/" +
          this._const("PATH.ADMIN.SELF") +
          "/" +
          this._const("PATH.ADMIN.CLUBLIST.SELF"),
        iclass: "fas fas-map-marker",
        style: false,
      },
      {
        title: "ENTRAÎNEURS",
        path:
          "/" +
          this._const("PATH.ADMIN.SELF") +
          "/" +
          this._const("PATH.ADMIN.COACHLIST.SELF"),
        iclass: "fas fas-users",
        style: false,
      },
      {
        title: "PERSPECTIVE",
        path:
          "/" +
          this._const("PATH.ADMIN.SELF") +
          "/" +
          this._const("PATH.ADMIN.PROSPECTUSLIST.SELF"),
        iclass: "fas fas-file-pdf-o",
        style: false,
      },
      {
        title: "ADMINLIST",
        path:
          "/" +
          this._const("PATH.ADMIN.SELF") +
          "/" +
          this._const("PATH.ADMIN.ADIMLIST.SELF"),
        iclass: "fas fas-users",
        style: false,
      },
      {
        title: "PAIEMENTS",
        path:
          "/" +
          this._const("PATH.ADMIN.SELF") +
          "/" +
          this._const("PATH.ADMIN.PAYMENTS.SELF"),
        iclass: "fas fas-money",
        style: false,
      },
      {
        title: "MENU",
        path:
          "/" +
          this._const("PATH.ADMIN.SELF") +
          "/" +
          this._const("PATH.ADMIN.DYNAMICMENU.SELF"),
        iclass: "fas fas-grav",
        style: false,
      },
      {
        title: "CONTENT",
        path:
          "/" +
          this._const("PATH.ADMIN.SELF") +
          "/" +
          this._const("PATH.ADMIN.CMS.SELF"),
        iclass: "fas fas-grav",
        style: false,
      },
    ];
  }
}
