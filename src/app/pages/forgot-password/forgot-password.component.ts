import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { BrowserModule, Title, Meta } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { AppService } from "../../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { CoachComponent } from "./../../model/coach/coach.component";
import { AppComponent } from "src/app/app.component";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"]
})
export class ForgotPasswordComponent extends AppComponent implements OnInit {
  public email: string;

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

  forgotpass() {
    this.spinner.show();
    var email = {
      email: this.email
    };
    this.appService.create("/user/forgotpassword", email).subscribe(val => {
      if (val.isSuccess == true) {
        this._showAlertMessage(
          "alert-success",
          "Réinitialisation réussie, vérifiez votre courrier"
        );
        this.spinner.hide();
      } else {
        this._showAlertMessage("alert-danger", "La réinitialisation a échoué");
        this.spinner.hide();
      }
    });
  }

  goToHome() {
    this.router.navigate(["/"], {
      queryParams: {}
    });
  }
}
