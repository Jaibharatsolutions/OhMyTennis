import { Component, OnInit, AfterViewChecked } from "@angular/core";
import { Location } from "@angular/common";
import { BrowserModule, Title, Meta } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { AppService } from "../../shared/app.service";
import { AdminComponent } from "./../../model/admin/admin.component";
import * as $ from "jquery";
/* [ Spinner ] */
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-clubedit",
  templateUrl: "./clubedit.component.html",
  styleUrls: ["./clubedit.component.scss"],
})
export class ClubeditComponent extends AdminComponent implements OnInit {
  public res = {
    court_id: "",
    court_name: "",
    incharge_name: "",
    court_email: "",
    court_phone: "",
    court_postal_code: "",
    court_address: "",
    courtfile: "",
  };

  public team_error = false;
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
    this.getCourt();
    var titile = document.getElementsByClassName("brand");
    if (titile) titile[0].innerHTML = "MON COMPTE";
  }

  getCourt() {
    var team = [];
    const id = this.activatedRoute.snapshot.queryParamMap.get("Court_id");
    var court_id = {
      court_id: id,
    };
    this.spinner.show();
    this.appService
      .create("/admin/getcourtbyid", court_id)
      .subscribe((data: any) => {
        if (data.isSuccess == true) {
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
        this.res = data.data.court_list[0];

        team = data.data.court_list[0].court_list.split(",");
        if (team.length > 0) {
          for (var i = 0; i < team.length; i++) {
            if (team[i] !== "") {
              var element = <HTMLInputElement>document.getElementById(team[i]);
              element.checked = true;
            }
          }
        }
      });
  }

  makeEnable() {
    $(".form-group :input").prop("readonly", false);
    $(".form-group :input").prop("required", true);
    $("#court_email").prop("disabled", true);
    $("#submit").prop("readonly", false);
  }

  onSubmit(res) {
    $("#trans_error").hide();
    $("#cheque_error").hide();
    this.team_error = false;
    const id = this.activatedRoute.snapshot.queryParamMap.get("Court_id");
    this.res.court_id = id;

    if (this.team_error == false) {
      this.appService
        .create("/admin/updatecourt", res)
        .subscribe((response) => {
          if (response && response.isSuccess == true) {
            this._showAlertMessage("alert-success", "Mise à jour avec succés");
          } else {
            this._showAlertMessage("alert-danger", "Échec de la mise à jour");
          }
        });
    } else {
      this.spinner.hide();
    }
  }
  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.propagateChange(reader.result, file, file.type);
    };
    reader.onerror = function (error) {};
  }

  propagateChange = (result, file, type) => {
    this.res.courtfile = result;
  };

  goBack() {
    this.router.navigate(["/admin/clublist"], {
      queryParams: {},
    });
  }
}
