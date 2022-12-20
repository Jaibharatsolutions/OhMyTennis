import {
  Component,
  OnInit,
  ɵConsole,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { AppService } from "../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AppComponent } from "../app.component";
import { Location } from "@angular/common";
//import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as _ from "underscore";
import * as $ from "jquery";
import * as L from "leaflet";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: "app-oh-my-coach-new",
  templateUrl: "./oh-my-coach-new.component.html",
  styleUrls: ["./oh-my-coach-new.component.scss"]
})
export class OhMyCoachNewComponent extends AppComponent implements OnInit {
  public min = new Date();
  public date: any = "";
  public respon: any;
  showMyMap: boolean = true;
  showMapCSS: string = "none";
  public search: any = {
    date: "",
    ville: "",
    rayon: "0",
    course: ""
  };

  public course: any = {
    CoursIndividuel: false,
    CoursCollectifOndemand: false,
    CoursCollectifClub: false
  };

  //public latlongcurrent: any;
  map: any;
  mapvalues: any;
  lat: any;
  lang: any;
  curentlat: any;
  curentlang: any;
  co_or_gps: any;
  numbers = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20
  ];
  public service: any;

  private allItems: any[];

  searchText;

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    appService: AppService,
    location: Location,
    spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer
  ) {
    super(activatedRoute, router, appService, location, spinner);
  }
  ngOnInit() {
    this.getcoach();
  }

  ngAfterViewInit(): void {
    localStorage.getItem("onmytennis");
    // if (!pcode) {
    //   this.getcurrentcordinates();
    // }
    //  $(".mapsection")
    //    .delay(1000)
    //    .fadeIn(500);
  }

  getcoach() {
    this.spinner.show();
    setTimeout(() => {
      var ohmycoach_menu_type = localStorage.getItem("ohmycoach-menu-type");
      if (ohmycoach_menu_type == "") {
        var pcode = localStorage.getItem("onmytennis");
        if (pcode) {
          var postalCode = JSON.parse(JSON.parse(pcode));
          this.search.ville = postalCode.postalCode;
        } // End of pcode if it is present
        this.search.course = "";
      } else {
        this.selectedOneCheckbox(ohmycoach_menu_type);
        this.search.course = ohmycoach_menu_type;
        localStorage.setItem("Course", ohmycoach_menu_type);
      }

      this.appService
        .getAll("/coach/searchByCoach", this.search)
        .subscribe(data => {
          if (data && data["data"]) {
            this.allItems = (data as any).data.coach_list;
            //console.log(this.respon)
            this.spinner.hide();
            this.setPage(1);
          }
        });
    }, 1000);
  }

  selectedOneCheckbox(id) {
    this.spinner.show();

    setTimeout(() => {
      if (id == "CoursIndividuel") {
        this.search.course = "";
        let individual = document.getElementById(
          "check_CoursIndividuel"
        ) as HTMLInputElement;
        individual.checked = true;
        let ondemand = document.getElementById(
          "check_CoursCollectifOndemand"
        ) as HTMLInputElement;
        ondemand.checked = false;
        let club = document.getElementById(
          "check_CoursCollectifClub"
        ) as HTMLInputElement;
        club.checked = false;
        this.search.course = "CoursIndividuel";
      } else if (id == "CoursCollectifOndemand") {
        this.search.course = "";
        let individual = document.getElementById(
          "check_CoursIndividuel"
        ) as HTMLInputElement;
        individual.checked = false;
        let ondemand = document.getElementById(
          "check_CoursCollectifOndemand"
        ) as HTMLInputElement;
        ondemand.checked = true;
        let club = document.getElementById(
          "check_CoursCollectifClub"
        ) as HTMLInputElement;
        club.checked = false;
        this.search.course = "CoursCollectifOndemand";
      } else if (id == "CoursCollectifClub") {
        this.search.course = "";
        let individual = document.getElementById(
          "check_CoursIndividuel"
        ) as HTMLInputElement;
        individual.checked = false;
        let ondemand = document.getElementById(
          "check_CoursCollectifOndemand"
        ) as HTMLInputElement;
        ondemand.checked = false;
        let club = document.getElementById(
          "check_CoursCollectifClub"
        ) as HTMLInputElement;
        club.checked = true;
        this.search.course = "CoursCollectifClub";
      }

      localStorage.setItem("ohmycoach-menu-type", id);
      localStorage.setItem("Course", id);
      this.location.replaceState(
        this._const("PATH.OH_MY_COACH_NEW") + "?course=" + id
      );
      const search = {
        course: id,
        date: "",
        ville: "",
        rayon: "0"
      };
      this.searchByCoachClick(search);
      //this.setPage(1);
      this.spinner.hide();
    }, 1000);
  }

  findCoach(search) {
    this.spinner.show();
    localStorage.setItem("Course", search.course);
    if (this.date != "") search.date = this.formatDate(this.date);
    this.appService.getAll("/coach/findyourCoach", search).subscribe(data => {
      if (data && data["data"]) {
        this.respon = (data as any).data.coach_list;
        this.spinner.hide();
      }
    });
  }

  removeLastComma(str) {
    return str.replace(/,(\s+)?$/, "");
  }

  onFilterChange(eve: any) {
    //console.log(eve);
    this.search.individual = !this.search.individual;
  }

  searchByCoachClick(search) {
    //event.preventDefault();
    this.spinner.show();

    let selectorVilleID = document.getElementById("ville") as HTMLInputElement;
    selectorVilleID.style.border = "";

    this.appService.getAll("/coach/searchByCoach", search).subscribe(data => {
      if ((data as any).isSuccess == true) {
        setTimeout(() => {
          this.allItems = (data as any).data.coach_list;
          //console.log("ohmytennisnew -- searchByCoach 217", this.allItems);
          this.spinner.hide();
          if (this.allItems.length > 0) {
            this.pager.totalPages = this.allItems.length;
            //console.log(this.pager.totalPages);
            this.setPage(1);
          } else {
            this.pager.totalPages = this.allItems.length;
            this.pagedItems = [];
            this.setPage(1);
          }
          window.scroll({
            top: 850,
            left: 0,
            behavior: "smooth"
          });
        }, 1000);
      }
    });
  }

  searchByCoach(search) {
    //event.preventDefault();
    //this.spinner.show();

    if (search.ville != "" && search.ville != null) {
      let selectorVilleID = document.getElementById(
        "ville"
      ) as HTMLInputElement;
      selectorVilleID.style.border = "";
    } else {
      let villeID = document.getElementById("ville") as HTMLInputElement;
      villeID.setAttribute("tabIndex", "-1");
      villeID.focus();
      let selectorVilleID = document.getElementById(
        "ville"
      ) as HTMLInputElement;
      selectorVilleID.style.border = "1px solid red";

      this.spinner.hide();
      window.scroll({
        top: 850,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    console.log('search '+ JSON.stringify(search));
    this.appService
      .getAll("/coach/searchByCoachList", search)
      .subscribe(data => {
        console.log('ta '+ data);
        if ((data as any).isSuccess == true) {
          this.allItems = (data as any).data.coach_list;
          //console.log("ohmytennisnew -- searchByCoach 217", this.allItems);
          this.spinner.hide();
          if (this.allItems.length > 0) {
            this.pager.totalPages = this.allItems.length;
            //console.log(this.pager.totalPages);
            this.setPage(1);
          } else {
            this.pager.totalPages = this.allItems.length;
            this.pagedItems = [];
            this.setPage(1);
          }
          window.scroll({
            top: 850,
            left: 0,
            behavior: "smooth"
          });
        }
      });
  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 4) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);
    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 1 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = _.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    //console.log("ohmytennisnew -- setPage 284", page);
    // get pager object from service
    this.pager = this.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
    window.scroll({
      top: 850,
      left: 0,
      behavior: "smooth"
    });
    //console.log("set page ", this.pagedItems);
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  gotoCouch(res, id) {
    if (localStorage.getItem("ohmycoach-menu-type") !== null) {
      if (localStorage.getItem("onmytennis") !== null) {
        var data = JSON.stringify(res);
        localStorage.setItem("Coach", data);
        //localStorage.setItem("Course", ser);
        this.router.navigate(["/coachdetail"]);
      } else {
        this.router.navigate(["/login"]);
      }
    } else {
      this.router.navigate(["ohmycoachdetail"], {
        queryParams: {
          id,
          course: this.search.course
        }
      });
    }
  }

  goToCouchDetail(id) {
    this.router.navigate(["ohmycoachdetail"], {
      queryParams: {
        id,
        course: this.search.course
      }
    });
  }

  //rechercherfun() {
  //console.log("oh-my-coach-new.component.ts - line 342",this.rechercher)
  //  const availableFilters = [{ status: 'done' }, { other: false }], // your filters
  //   filters = Object.entries(Object.assign(availableFilters)), // returns an array of the filter's own enumerable property
  //    result = this.allItems.filter(o => filters.every(([k, v]) => o[k] === v)); // .every returns true, when every item is fulfilling the condition

  // console.log(result);

  //}
}
