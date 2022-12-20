import { Component, OnInit } from "@angular/core";
import { AdminComponent } from "../../model/admin/admin.component";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Location } from "@angular/common";
import * as $ from "jquery";

@Component({
  selector: "app-adminprofile",
  templateUrl: "./adminprofile.component.html",
  styleUrls: ["./adminprofile.component.scss"],
})
export class AdminprofileComponent extends AdminComponent implements OnInit {
  public res = {
    admin_id: "",
    first_name: "",
    last_name: "",
    admin_email: "",
    mobile: "",
    address: "",
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
    this.getUser();
    var titile = document.getElementsByClassName("brand");
    if (titile) titile[0].innerHTML = "MON COMPTE";
  }

  getUser() {
    var team = [];
    var admins = JSON.parse(localStorage.getItem("onmytennis"));
    var admin = JSON.parse(admins);
    var admin_id = {
      admin_id: admin.admin_id,
    };
    this.spinner.hide();
    this.appService
      .create("/admin/getAdminbyid", admin_id)
      .subscribe((data: any) => {
        if (data.isSuccess == true) {
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
        this.res = data.data.admin_list[0];
      });
  }

  onSubmit(res) {
    $("#trans_error").hide();
    $("#cheque_error").hide();

    this.appService
      .create("/admin/updateProfile", res)
      .subscribe((response) => {
        if (response && response.isSuccess == true) {
          this._showAlertMessage("alert-success", "Mise à jour avec succés");
        } else {
          this._showAlertMessage("alert-danger", "Échec de la mise à jour");
        }
      });
  }

  makeEnable() {
    $(".form-group :input").prop("readonly", false);
    $(".form-group :input").prop("required", true);
    $("#email").prop("disabled", true);
    $("#submit").prop("readonly", false);
  }

  // changeListener($event): void {
  //   this.readThis($event.target);
  // }

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
    //this.res.User_Image = result;
  };

  goBack() {
    this.router.navigate(["/admin/dashboard"], {
      queryParams: {},
    });
  }
}
