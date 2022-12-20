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
import * as $ from "jquery";
@Component({
  selector: "app-coach-register",
  templateUrl: "./coach-register.component.html",
  styleUrls: ["./coach-register.component.scss"]
})
export class CoachRegisterComponent extends AppComponent implements OnInit {
  public registerForm: FormGroup;

  public selectedCity: any = null;
  public cityId: any = "";

  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    appService: AppService,
    location: Location,
    spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) {
    super(activatedRoute, router, appService, location, spinner);
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      gender: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      postalCode: ["", Validators.required],
      cityId: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      roleId: 2,
      mobile: ["", [Validators.required, Validators.minLength(10)]],
      termsCondition: ["", Validators.required],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@#$!%*?&])[A-Za-zd$@#$!%*?&].{8,}"
          )
        ]
      ]
    });
  }

  /* [ Form controls ] */
  get rForm() {
    return this.registerForm.controls;
  }

  numberOnly(event): boolean {
    if (event.target.value.length > 9) {
      return false;
    }
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  searchCity(e) {
    if (e && e.target.value) {
      this.appService.getAll("/city/" + e.target.value).subscribe(
        response => {
          // tslint:disable-next-line:no-string-literal
          if (response && response["data"]) {
            // tslint:disable-next-line:no-string-literal
            this.selectedCity = (response as any).data.city_list;

            if (this.selectedCity.length > 0)
              this.cityId = this.selectedCity[0].id;
          }
        },
        error => {}
      );
    }
  }

  addnewCoach(isValid) {
    console.log(this.registerForm.value);
    if (isValid.status === "VALID") {
      this.spinner.show();
      this.appService
        .create("/user/register/user", this.registerForm.value)
        .subscribe(
          response => {
            if (response && response.isSuccess == true) {
              isValid.reset();
              this._showAlertMessage(
                "alert-success",
                "Coach inscrit avec succès"
              );
            } else if (
              response &&
              response.message == "UserEmail already Exist"
            ) {
              this._showAlertMessage(
                "alert-danger",
                "le courrier existe déjà dans le système"
              );
            } else {
              this._showAlertMessage(
                "alert-danger",
                "Échec de l'inscription des entraîneurs"
              );
            }
            this.spinner.hide();
          },
          error => {}
        );
    }
  }
}
