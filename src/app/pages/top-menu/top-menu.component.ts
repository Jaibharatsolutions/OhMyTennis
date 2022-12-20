import { Component, OnInit, AfterViewChecked, OnDestroy } from "@angular/core";
import { Location } from "@angular/common";
import { BrowserModule, Title, Meta } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { AppService } from "../../shared/app.service";
import { AppComponent } from "../../app.component";
/* [ Spinner ] */
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/takeWhile";
import "rxjs/add/observable/timer";

@Component({
  selector: "app-top-menu",
  templateUrl: "./top-menu.component.html",
  styleUrls: ["./top-menu.component.scss"]
})
export class TopMenuComponent extends AppComponent
  implements OnInit, OnDestroy {
  public response = [];
  public treeData = [];
  alive = true;
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
    //this.getCmsMenu();
    // if (this.alive) {
    //   Observable.timer(0, 10000) // only fires when component is alive
    //     .subscribe(() => {
    //       this.getMenuTree();
    //       this.spinner.hide();
    //     });
    // }
  }

  ohmycoachclick(menutype) {
    console.log(menutype);
    this.spinner.show();
    setTimeout(() => {
      //this.spinner.hide();

      localStorage.setItem("ohmycoach-menu-type", menutype);
      this.router.navigate([this._const("PATH.OH_MY_COACH_NEW")], {
        queryParams: {
          course: menutype
        }
      });
    }, 100);
  }

  ohmyeventclick(menutype) {
    console.log(menutype);
    this.spinner.show();

    setTimeout(() => {
      //this.spinner.hide();

      localStorage.setItem("ohmycoach-menu-type", menutype);
      this.router.navigate([this._const("PATH.OH_MY_EVENT_NEW")], {
        queryParams: {
          course: menutype
        }
      });
    }, 100);
  }

  getMenuTree() {
    this.spinner.show();
    this.appService.getAll("/admin/menu/toptree").subscribe(res => {
      if (res["isSuccess"] == true) {
        this.treeData = (res as any).data;
        console.log(this.treeData);
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
  }

  getCmsMenu() {
    this.spinner.show();
    this.appService.getAll("/admin/cms/getcmsmenu").subscribe(res => {
      if (res["isSuccess"] == true) {
        this.response = (res as any).data.cms_list;
        console.log(this.response);
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
  }

  goToCms(event: Event, endpoint) {
    event.preventDefault();
    if (endpoint != "" && endpoint != null) {
      this.router.navigate(
        [this._const("PATH.USERS.CMS.SELF") + "/" + endpoint],
        {
          queryParams: {}
        }
      );
    }
  }
  // refreshCmsPage() {
  //   window.location.reload();
  // }

  ngOnDestroy() {
    this.alive = false;
  }
}
