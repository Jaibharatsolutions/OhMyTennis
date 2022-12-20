import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { BrowserModule, Title, Meta } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { AppService } from "../../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { CoachComponent } from "../../model/coach/coach.component";
import { AppComponent } from "../../app.component";
@Component({
  selector: "app-set-new-password",
  templateUrl: "./set-new-password.component.html",
  styleUrls: ["./set-new-password.component.scss"]
})
export class SetPasswordComponent extends AppComponent {
  public hash: string;
  public data = {
    email: "",
    password: "",
    confirm_pass: "",
    hash: ""
  };

  passwordfield;
  showPassword = false;
  confirmPasswordfield;
  showConfirmPassword = false;

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
    const hash = this.activatedRoute.snapshot.queryParamMap.get("hash");
    console.log("[home.component.ts]", hash);
    if (hash) {
      var hashkey = hash.replace(/'/g, "").toString();
      this.data.hash = hashkey;
    }

    this.passwordfield = "password";
    this.confirmPasswordfield = "password";
  }

  onClickPasswordfield() {
    if (this.passwordfield === "password") {
      this.passwordfield = "text";
      this.showPassword = true;
    } else {
      this.passwordfield = "password";
      this.showPassword = false;
    }
  }

  onClickConfirmPasswordfield() {
    if (this.confirmPasswordfield === "password") {
      this.confirmPasswordfield = "text";
      this.showConfirmPassword = true;
    } else {
      this.confirmPasswordfield = "password";
      this.showConfirmPassword = false;
    }
  }

  setpassword() {
    this.spinner.show();
    if (this.data.password == this.data.confirm_pass) {
      this.appService
        .create("/user/resetpassword", this.data)
        .subscribe(val => {
          if (val.isSuccess == true) {
            this.data = {
              email: "",
              password: "",
              confirm_pass: "",
              hash: ""
            };
            this.spinner.hide();
            this._showAlertMessage(
              "alert-success",
              "Réinitialisation réussie, vérifiez votre courrier"
            );
          } else {
            this.spinner.hide();
            this._showAlertMessage(
              "alert-danger",
              "La réinitialisation a échoué"
            );
          }
        });
    } else {
      this._showAlertMessage(
        "alert-danger",
        "Le mot de passe ne correspond pas, veuillez réessayer."
      );
      this.spinner.hide();
    }
  }
}
