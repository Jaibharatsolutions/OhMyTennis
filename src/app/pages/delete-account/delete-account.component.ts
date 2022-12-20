import { Component, OnInit, AfterViewChecked, Input } from "@angular/core";
import { Location } from "@angular/common";
import { BrowserModule, Title, Meta } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { AppService } from "../../shared/app.service";
import { CoachComponent } from "./../../model/coach/coach.component";
/* [ Spinner ] */
import { NgxSpinnerService } from "ngx-spinner";
import * as $ from "jquery";
@Component({
  selector: "app-delete-account",
  templateUrl: "./delete-account.component.html",
  styleUrls: ["./delete-account.component.scss"]
})
export class DeleteAccountComponent extends CoachComponent implements OnInit {
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
    var titile = document.getElementsByClassName("brand");
    if (titile) titile[0].innerHTML = "SUPPRIMER UN COMPTE";
  }

  _delete_account() {
    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    if (coach) {
      var coach1 = JSON.parse(coach);
      var emailId = {
        email: coach1.email
      };
      this.spinner.show();

      this.appService
        .create("/user/accountdeletebyemail", emailId)
        .subscribe((data: any) => {
          if (data.isSuccess == true) {
            this.spinner.hide();
            this._setSession("removeItem");
            this._gotoPath("/");
          } else {
            this.spinner.hide();
          }
        });
    }
  }

  modalclose() {
    this.spinner.show();
    this.router.navigate(["/coach/dashboard"], {
      queryParams: {}
    });
    this.spinner.hide();
  }
}
