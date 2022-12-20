import { Component, OnInit, ViewChild } from "@angular/core";
import { AdminComponent } from "../../model/admin/admin.component";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Location } from "@angular/common";

@Component({
  selector: "app-editDynamicMenu",
  templateUrl: "./editDynamicMenu.component.html",
  styleUrls: ["./editDynamicMenu.component.scss"],
})
export class editDynamicMenuComponent extends AdminComponent implements OnInit {
  public availablity: any = [];
  public res = {
    main_menu: "",
    primary_menu: "",
    position: "top",
    secondary_menu: [],
  };
  public main_menu_array = [];
  public menu = "";

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
    if (this.availablity.length == 0) this.addSecondaryMenu();
    var titile = document.getElementsByClassName("brand");
    if (titile) titile[0].innerHTML = "Edit Menu Form";

    const id = this.activatedRoute.snapshot.queryParamMap.get("id");
    this.getMenuIndList(id);
    this.getMenu();

    window.scrollTo(0, 0);
  }

  getMenu() {
    this.appService.getAll("/admin/menu").subscribe((response) => {
      if ((response as any).data.length > 0) {
        let dat = (response as any).data;
        for (let i = 0; i < dat.length; i++) {
          this.main_menu_array.push({
            id: dat[i].id,
            mainMenu: dat[i].main_menu,
          });
        }
      }
    });
  }

  getMenuIndList(id) {
    this.appService.getAll("/admin/editmenu/" + id).subscribe((response1) => {
      if ((response1 as any).data.length > 0) {
        let dat = (response1 as any).data[0];
        console.log(dat);
        // for (let i = 0; i < dat.length; i++) {
        //   this.main_menu_array.push({
        //     id: dat[i].id,
        //     mainMenu: dat[i].main_menu
        //   });
        // }
      }
    });
  }

  addSecondaryMenu() {
    this.availablity.push({
      menu: "",
    });
  }

  removeSecondaryMenu(index) {
    this.spinner.show();
    this.availablity.splice(index, 1);
    this.spinner.hide();
  }

  onPushMenuName(e: Event, name) {
    e.preventDefault();
    this.spinner.show();
    if (name != "") {
      const mainMenuData = {
        mainmenu: name,
      };
      this.appService
        .create("/admin/menu/create/parent", mainMenuData)
        .subscribe((response) => {
          if ((response as any).data.length > 0) {
            let dat = (response as any).data;
            let pushData = [];
            for (let i = 0; i < dat.length; i++) {
              pushData.push({ id: dat[i].id, mainMenu: dat[i].main_menu });
            }
            setTimeout(() => {
              this.menu = "";
              this.main_menu_array = pushData;
              this.spinner.hide();
            }, 200);
          }
        });
    } else {
      this._showAlertMessage("alert-danger", "Échec de la mise à jour");
      this.spinner.hide();
    }
  }

  onSubmit(res) {
    this.spinner.show();
    this.res.secondary_menu = this.availablity;
    this.appService.create("/admin/menu/create", res).subscribe((response) => {
      if (response && response.isSuccess == true) {
        this.res = {
          main_menu: "",
          primary_menu: "",
          position: "top",
          secondary_menu: [],
        };
        this.availablity = [
          {
            menu: "",
          },
        ];
        this._showAlertMessage("alert-success", "Mise à jour avec succés");
        this.spinner.hide();
      } else {
        this._showAlertMessage("alert-danger", "Échec de la mise à jour");
        this.spinner.hide();
      }
    });
  }
}
