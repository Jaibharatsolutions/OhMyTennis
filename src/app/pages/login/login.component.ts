import { Component, OnInit, AfterViewChecked } from "@angular/core";
import {
  FormsModule,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormArray
} from "@angular/forms";
import { Location } from "@angular/common";
import { BrowserModule, Title, Meta } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { AppService } from "../../shared/app.service";
import { AppComponent } from "../../app.component";
/* [ Spinner ] */
import { NgxSpinnerService } from "ngx-spinner";
import { async } from "q";
declare const $: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent extends AppComponent implements OnInit {
  public newUser: any;
  public amt = 0;
  public errorMessage: any;

  passwordfield;

  showPassword = false;

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
    const id: string = this.activatedRoute.snapshot.queryParamMap.get("id");
    if (id) {
      var email = atob(id);

      this.appService
        .create("/user/userVerification", { email: email })
        .subscribe(
          response => {
            console.log("verify", response);
            this._showAlertMessage("alert-success", response.message);
          },
          error => {
            this._showAlertMessage("alert-danger", error.message);
          }
        );
    }

    const bookid: string = this.activatedRoute.snapshot.queryParamMap.get(
      "bookid"
    );
    if (bookid) {
      this.appService
        .getAll("/coach/BookingDetail?booking_Id=" + bookid, this.newUser)
        .subscribe(response => {
          var res: any = response;
          this.amt = res.data.availabilty[0].amount;
          this.pay(
            this.appService,
            res.data.availabilty[0].amount,
            res.data.availabilty[0].user_Email,
            bookid
          );
        });
    }

    this.newUser = {
      email: "",
      password: ""
    };

    this.passwordfield = "password";
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

  onSubmitUser(isValid) {
    if (isValid.form.status === "VALID") {
      this.spinner.show();
      this.appService.create("/user/login", this.newUser).subscribe(
        response => {
          if (response && response.data) {
            if (response.isSuccess == true) {
              localStorage.setItem('currentUser', JSON.stringify(response.data));
              if (response.data.length !== 0) {
                if (response.data.roleId == 2) {
                  if (
                    this._setSession(
                      "setItem",
                      JSON.stringify(response.data)
                    ) === true
                  ) {
                    this._gotoPath("/");
                    setTimeout(() => {
                      this._gotoPath(this._const("PATH.COACH.SELF"));
                    }, 300);
                  }
                } else if (response.data.roleId == 1) {
                  if (
                    this._setSession(
                      "setItem",
                      JSON.stringify(response.data)
                    ) === true
                  ) {
                    this._gotoPath("/");
                  }
                }
              }
              this.spinner.hide();
            } else if (response.isSuccess == false) {
              this._showAlertMessage("alert-danger", "Échec de la connexion");
              this.spinner.hide();
            }
          }
        },
        error => {}
      );
    }
  }

  pay(appService, amount, email, bookid) {
    var data: any;
    this.closeModal();
    var handler = (<any>window).StripeCheckout.configure({
      key: "pk_test_ppbf90Eyy5PuXBdNQNLpxVuz00e719Y31R",
      locale: "fr",
      token: function(token: any) {
        if (token) {
          var coachemail = {
            status: "B",
            booking_id: bookid,
            amount: amount
          };
          appService
            .create("/coach/setpayment", coachemail)
            .subscribe(response => {});
          data = token;
        }
        alert("Payment success!!");
      }
    });
    this.setstatus(data);

    handler.open({
      name: "Oh My Tennis",
      description: "RESERVER UN COURS",
      email: email,
      amount: amount,
      currency: "EUR"
    });
  }

  private mdlSampleIsOpen: boolean = false;
  private Mytitle: string = "";
  private openModal(title): void {
    console.log(title);
    this.mdlSampleIsOpen = true;
  }

  private closeModal(): void {
    this.mdlSampleIsOpen = false;
  }
  setstatus(data) {
    if (data) {
      const bookid: string = this.activatedRoute.snapshot.queryParamMap.get(
        "bookid"
      );

      var details = {
        status: "B",
        booking_id: bookid,
        amount: this.amt
      };

      this.appService
        .create("/coach/setpayment", details)
        .subscribe(async val => {
          if (val.isSuccess == true) {
            this._showAlertMessage("alert-success", "Payment Successfully");
          } else {
            this._showAlertMessage("alert-danger", "Payment Failed");
          }
        });
    }
  }

  loadStripe() {
    if (!window.document.getElementById("stripe-script")) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(s);
    }
  }
}
