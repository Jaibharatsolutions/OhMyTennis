import { Component, OnInit } from "@angular/core";
import { AppService } from "../../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AdminComponent } from "src/app/model/admin/admin.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-dynamic-menu",
  templateUrl: "./dynamicMenu.component.html",
  styleUrls: ["./dynamicMenu.component.scss"],
})
export class dynamicMenuComponent extends AdminComponent implements OnInit {
  public rowDataCollection: any = [];
  public data: any = [];
  public Fdata: any = [];
  public datanew = [];
  public menuname = "";
  groupPrimary: any = {};
  menuId: number;
  menuPosition: string;
  showModal: boolean = false;
  showPrimaryModal: boolean = false;
  showSecondaryModal: boolean = false;
  title = "angulardatatables";
  coachcount: any;
  usercount: any;
  courtcount: any;

  dtOptions: DataTables.Settings = {};

  res = {
    mainid: "",
    mainname: "",
    primarymenu: [],
  };

  resSec = {
    mainid: "",
    mainname: "",
    primarymenu: "",
    secondarymenu: [],
  };
  primarymenu_array: any = [];

  public availablity: any = [];
  public availablitySecondary: any = [];

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
    if (this.availablity.length == 0) this.addPrimaryMenus();

    if (this.availablitySecondary.length == 0) this.addSecondaryMenus();
    this.menuView();
  }

  addPrimaryMenus() {
    this.availablity.push({
      primarymenu: "",
    });
  }

  addSecondaryMenus() {
    this.availablitySecondary.push({
      secondarymenu: "",
    });
  }

  removePrimaryMenu(index) {
    this.spinner.show();
    this.availablity.splice(index, 1);
    this.spinner.hide();
  }

  removeSecondaryMenu(index) {
    this.spinner.show();
    this.availablitySecondary.splice(index, 1);
    this.spinner.hide();
  }

  menuView() {
    this.appService.getAll("/admin/menu/view").subscribe((response) => {
      if ((response as any).data.length > 0) {
        if (response && response["data"]) {
          let dat = (response as any).data;
          this.datanew = dat;
        }
      }
    });
  }

  onClick(menuDetails, positionname) {
    this.menuname = menuDetails.main_name
      ? menuDetails.main_name
      : menuDetails.primary_menu
      ? menuDetails.primary_menu
      : menuDetails.secondary_menu;
    this.menuId = menuDetails.id;
    this.menuPosition = positionname;
    this.showModal = true; // Show-Hide Modal Check
  }

  hide() {
    this.showModal = false;
    this.showPrimaryModal = false;
  }

  secondaryHide() {
    this.showSecondaryModal = false;
    this.primarymenu_array = [];
  }

  onUpdateMenuName(e, pushMenuName, id, takepositionname) {
    this.spinner.show();
    const editMenuDetails = {
      id: id,
      menu: pushMenuName,
      menu_position: takepositionname,
    };
    if (id != "" && pushMenuName != "") {
      setTimeout(() => {
        this.appService
          .create("/admin/cms/update", editMenuDetails)
          .subscribe((response) => {
            if (response && response.isSuccess == true) {
              this._showAlertMessage(
                "alert-success",
                "Mise à jour avec succés"
              );
              this.menuView();
              this.spinner.hide();
            } else {
              this._showAlertMessage("alert-danger", "Échec de la mise à jour");
              this.spinner.hide();
            }
          });
        this.showModal = false;
        this.spinner.hide();
      }, 200);
    }
  }

  onEditForm(id) {
    this.router.navigate(["/admin/edit-menu-form"], {
      queryParams: { id: id },
    });
  }

  deleteCmsIndividualData(id) {
    var menuid = {
      menuid: id,
    };
    if (id) {
      this.appService
        .create("/admin/cms/delmenu", menuid)
        .subscribe((response) => {
          if (response && response.isSuccess == true) {
            this._showAlertMessage("alert-success", "Mise à jour avec succés");
            this.menuView();
            this.spinner.hide();
          } else {
            this._showAlertMessage("alert-danger", "Échec de la mise à jour");
            this.spinner.hide();
          }
        });
    }
  }

  delete(id, identity) {
    this.spinner.show();
    var deletdetails = {
      menuid: id,
      identity,
    };
    if (id) {
      this.appService
        .create("/admin/menu/menuDelete", deletdetails)
        .subscribe((response) => {
          if (response && response.isSuccess == true) {
            this._showAlertMessage("alert-success", "Mise à jour avec succés");
            this.menuView();
            this.spinner.hide();
          } else {
            this._showAlertMessage("alert-danger", "Échec de la mise à jour");
            this.spinner.hide();
          }
        });
    } else {
      this._showAlertMessage("alert-danger", "Échec de la mise à jour");
      this.spinner.hide();
    }
  }

  addPrimaryMenu(group, positionname) {
    this.res = {
      mainid: group.id,
      mainname: group.main_name,
      primarymenu: [],
    };
    this.availablity = [
      {
        primarymenu: "",
      },
    ];

    this.showPrimaryModal = true; // Show-Hide Modal Check
  }

  addSecondaryMenu(group, positionname) {
    this.appService
      .getAll("/admin/getprimarymenu/" + group.id)
      .subscribe((response) => {
        console.log(response);
        if ((response as any).data.menu_list.length > 0) {
          let dat = (response as any).data.menu_list;
          for (let i = 0; i < dat.length; i++) {
            this.primarymenu_array.push({
              id: dat[i].id,
              mainMenu: dat[i].primary_menu,
            });
          }
        }
      });

    this.resSec = {
      mainid: group.id,
      mainname: group.main_name,
      primarymenu: "",
      secondarymenu: [],
    };
    this.availablitySecondary = [
      {
        secondarymenu: "",
      },
    ];

    this.showSecondaryModal = true; // Show-Hide Modal Check
  }

  onAddPrimaryMenuName(res) {
    this.spinner.show();
    this.res.primarymenu = this.availablity;
    this.appService
      .create("/admin/menu/createprimarymenu", res)
      .subscribe((response) => {
        if (response && response.isSuccess == true) {
          this._showAlertMessage("alert-success", "Mise à jour avec succés");
          this.showPrimaryModal = false;
          this.menuView();
          this.spinner.hide();
        } else {
          this._showAlertMessage("alert-danger", "Échec de la mise à jour");
          this.showPrimaryModal = false;
          this.spinner.hide();
        }
      });
  }

  onAddSecondaryMenuName(resSec) {
    this.spinner.show();
    this.resSec.secondarymenu = this.availablitySecondary;
    this.appService
      .create("/admin/menu/createsecondarymenu", resSec)
      .subscribe((response) => {
        if (response && response.isSuccess == true) {
          this._showAlertMessage("alert-success", "Mise à jour avec succés");
          this.showSecondaryModal = false;
          this.menuView();
          this.spinner.hide();
        } else {
          this._showAlertMessage("alert-danger", "Échec de la mise à jour");
          this.showSecondaryModal = false;
          this.spinner.hide();
        }
      });
  }
}
