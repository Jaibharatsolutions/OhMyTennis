import {
  Component,
  OnInit,
  AfterViewChecked,
  EventEmitter,
  Output,
  Input
} from "@angular/core";
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
import { AppService } from "../shared/app.service";
import { AppComponent } from "../app.component";
/* [ Spinner ] */
import { NgxSpinnerService } from "ngx-spinner";
import { async } from "q";

@Component({
  selector: "app-userchangepassword",
  templateUrl: "./userchangepassword.component.html",
  styleUrls: ["./userchangepassword.component.scss"]
})
export class UserchangepasswordComponent extends AppComponent
  implements OnInit {
  public changePasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    activatedRoute: ActivatedRoute,
    router: Router,
    appService: AppService,
    location: Location,
    spinner: NgxSpinnerService
  ) {
    super(activatedRoute, router, appService, location, spinner);
  }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group(
      {
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(8)
            // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$#!%*?&])[A-Za-z\d$@$!%#*?&].{8,}')
          ]
        ],
        newPassword: [
          "",
          [
            Validators.required,
            Validators.minLength(8)
            // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$#!%*?&])[A-Za-z\d$@$!%#*?&].{8,}')
          ]
        ],
        confirmPassword: ["", [Validators.required, Validators.minLength(8)]]
      },
      {
        // validator: MustMatch('password', 'confirmPassword')
      }
    );
  }
  /* [ Form controls ] */
  get cForm() {
    return this.changePasswordForm.controls;
  }
  changePassword(isValid) {
    //console.log(isValid);
    if (isValid.status === "VALID") {
      const userData = JSON.parse(this._setSession("getItem"));
      //console.log(userData["roleId"]);
      // if (val) {
      //   return data[val];
      // }

      let value = {
        email: userData["email"],
        role: userData["roleId"],
        password: this.changePasswordForm.value.newPassword
      };
      // console.log(value);
      // return false;
      // this.spinner.show();
      this.appService.create("/user/setNewPassword", value).subscribe(
        response => {
          //console.log(response);
          if (response && response.isSuccess == true) {
            isValid.reset();
            this._showAlertMessage(
              "alert-success",
              "Utilisateur enregistré avec succès"
            );
          } else {
            this._showAlertMessage(
              "alert-danger",
              "Impossible de continuer. S'il vous plaît essayer après un certain temps"
            );
          }
          this.spinner.hide();
        },
        error => {}
      );
    }
  }
  // }
}
