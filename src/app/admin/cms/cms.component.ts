import { Component, OnInit } from "@angular/core";
import { AppService } from "../../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AdminComponent } from "src/app/model/admin/admin.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-cms",
  templateUrl: "./cms.component.html",
  styleUrls: ["./cms.component.scss"],
})
export class CmsComponent extends AdminComponent implements OnInit {
  public rowDataCollection: any = [];
  public data: any = [];
  public Fdata: any = [];
  public datanew = [];

  title = "angulardatatables";
  coachcount: any;
  usercount: any;
  courtcount: any;

  dtOptions: DataTables.Settings = {};
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
    this.getAllCms();
  }

  getAllCms() {
    this.appService.getAll("/admin/cms/getCms").subscribe((response) => {
      if ((response as any).data.cms_list.length > 0) {
        if (response && response["data"]) {
          let dat = (response as any).data.cms_list;
          let data = dat.map((value) => {
            return {
              title: value.title,
              position: value.position,
              id: value.id,
              menu: value.menuName,
            };
          });
          this.datanew = data;
        }
      }
    });
  }

  getCmsIndividualData(id) {
    if (id) {
      this.router.navigate(["/admin/cmsform"], {
        queryParams: { id: id },
      });
    }
  }

  deleteCmsIndividualData(id) {
    //event.preventdefault();
    this.spinner.show();
    var cmsid = {
      cmsid: id,
    };
    if (id) {
      setTimeout(() => {
        this.appService
          .create("/admin/cms/del", cmsid)
          .subscribe((response) => {
            if (response && response.isSuccess == true) {
              this._showAlertMessage(
                "alert-success",
                "Mise à jour avec succés"
              );
              this.router.navigate(["/admin/cms"], {
                queryParams: {},
              });
              this.spinner.hide();
            } else {
              this._showAlertMessage("alert-danger", "Échec de la mise à jour");
              this.spinner.hide();
            }
          });
      }, 300);
    }
  }
}
