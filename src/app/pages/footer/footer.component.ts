import { Component, OnInit, AfterViewChecked } from "@angular/core";
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

const url = [
  "https://platform.twitter.com/widgets.js",
  "https://platform.linkedin.com/badges/js/profile.js"
];

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent extends AppComponent implements OnInit {
  loadAPI: Promise<any>;
  alive = true;
  public treeData = [];
  public slides = [
    { img: "../../assets/images/partner_img1.png" },
    { img: "../../assets/images/partner_img2.png" },
    { img: "../../assets/images/partner_img3.png" },
    { img: "../../assets/images/partner_img4.png" },
    { img: "../../assets/images/partner_img1.png" },
    { img: "../../assets/images/partner_img2.png" }
  ];

  public slideConfig: any = {
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true
  };

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
    this.loadScript();
    // if (this.alive) {
    //   Observable.timer(0, 10000) // only fires when component is alive
    //     .subscribe(() => {
    //       this.getMenuTree();
    //       this.spinner.hide();
    //     });
    // }
  }

  getMenuTree() {
    this.spinner.show();
    this.appService.getAll("/admin/menu/bottomtree").subscribe(res => {
      if (res["isSuccess"] == true) {
        this.treeData = (res as any).data;
        //console.log(this.treeData);
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

  gotoTop() {
    //console.log("[footer.component.ts]");
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

  loadScript() {
    for (let i = 0; i < url.length; i++) {
      console.log("preparing to load...");
      let node = document.createElement("script");
      node.src = url[i];
      node.type = "text/javascript";
      node.async = true;
      node.charset = "utf-8";
      document.getElementsByTagName("head")[0].appendChild(node);
    }
  }
}
