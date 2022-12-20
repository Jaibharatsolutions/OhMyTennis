import { Component, OnInit } from "@angular/core";
import { AdminComponent } from "../../model/admin/admin.component";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Location } from "@angular/common";
import * as $ from "jquery";

@Component({
  selector: "app-adminsaverecord",
  templateUrl: "./adminsaverecord.component.html",
  styleUrls: ["./adminsaverecord.component.scss"],
})
export class AdminsaverecordComponent extends AdminComponent implements OnInit {
  public res = {
    admin_id: "",
    first_name: "",
    last_name: "",
    admin_email: "",
    mobile: "",
    address: "",
    role: "",
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
    this.getadmin();
  }

  getadmin() {
    const id = this.activatedRoute.snapshot.queryParamMap.get("admin_id");
    var admin_id = {
      admin_id: id,
    };
    if (id) {
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
  }

  onSubmit(res) {
    console.log(res);
    $("#trans_error").hide();
    $("#cheque_error").hide();
    const id = this.activatedRoute.snapshot.queryParamMap.get("admin_id");
    this.res.admin_id = id;
    if (id) {
      this.appService
        .create("/admin/updateProfile", res)
        .subscribe((response) => {
          if (response && response.isSuccess == true) {
            this._showAlertMessage("alert-success", "Mise à jour avec succés");
          } else {
            this._showAlertMessage("alert-danger", "Échec de la mise à jour");
          }
        });
    } else {
      this.appService.create("/admin/create", res).subscribe((response) => {
        if (response && response.isSuccess == true) {
          this._showAlertMessage("alert-success", "Mise à jour avec succés");
        } else {
          this._showAlertMessage("alert-danger", "Échec de la mise à jour");
        }
      });
    }
  }

  goBack() {
    this.router.navigate(["/admin/adminlist"], {
      queryParams: {},
    });
  }
}
