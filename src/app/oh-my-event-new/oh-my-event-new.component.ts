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
// import * as $ from "jquery";
// import * as L from "leaflet";
// import { HttpParams } from "@angular/common/http";
import * as moment from "moment";
@Component({
  selector: "app-oh-my-event-new",
  templateUrl: "./oh-my-event-new.component.html",
  styleUrls: ["./oh-my-event-new.component.scss"]
})
export class OhMyEventNewComponent extends AppComponent implements OnInit {
  public min = new Date();
  public date: any = "";
  public respon: any;
  showMyMap: boolean = true;
  showMapCSS: string = "none";
  base64Image:any;
  image:any;
  public search: any = {
    date: "",
    ville: "",
    rayon: "0",
    course: ""
  };

  public course: any = {
    Stage: false,
    Animation: false,
    TeamBuilding: false,
    Tournament: false
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
    this.getEvent();
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
  

  getEvent() {
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
        // var course = {
        //   P_course: "Stage"
        // };
        // this.selectedOneCheckbox("Stage");
        // this.search.course = "Stage";
        // localStorage.setItem("Course", "Stage");

      } else {
        this.selectedOneCheckbox(ohmycoach_menu_type);
        this.search.course = ohmycoach_menu_type;
        localStorage.setItem("Course", ohmycoach_menu_type);
      }

     // console.log('search '+ this.search);
      this.appService
        .getAll("/coach/searchByEvent", this.search)
        .subscribe(data => {
          //console.log('pic '+ JSON.stringify(data));
          if (data && data["data"]) {
            this.allItems = (data as any).data.event_list;
            //console.log('pic '+ JSON.stringify(this.allItems));
             //this.base64Image = this.allItems[0].Photo;
            // return this.sanitizer.bypassSecurityTrustResourceUrl(this.base64_image);
            //this.image = 'data:image/jpg;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(this.allItems[0].Photo));
            //this.image = this.sanitizer.bypassSecurityTrustStyle(`url(${this.allItems[0].Photo})`);
            //this.image = this.sanitization.bypassSecurityTrustStyle(`url(${element.image})`);
            
            this.spinner.hide();
            this.setPage(1);
          }
        });
    }, 1000);
  }

  
//   transform(){
//     return this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image);
// }

  selectedOneCheckbox(id) {
    this.spinner.show();

    //console.log(id);
    setTimeout(() => {
      if (id == "Stage") {
        this.search.course = "";
        let stage = document.getElementById("check_Stage") as HTMLInputElement;
        stage.checked = true;
        let animation = document.getElementById(
          "check_Animations"
        ) as HTMLInputElement;
        animation.checked = false;
        let teambuilding = document.getElementById(
          "check_TeamBuilding"
        ) as HTMLInputElement;
        teambuilding.checked = false;
        let Tournament = document.getElementById(
          "check_Tournament"
        ) as HTMLInputElement;
        Tournament.checked = false;
        this.search.course = "Stage";
      } else if (id == "Animation") {
        this.search.course = "";
        let stage = document.getElementById("check_Stage") as HTMLInputElement;
        stage.checked = false;
        let animation = document.getElementById(
          "check_Animations"
        ) as HTMLInputElement;
        animation.checked = true;
        let teambuilding = document.getElementById(
          "check_TeamBuilding"
        ) as HTMLInputElement;
        teambuilding.checked = false;
        let Tournament = document.getElementById(
          "check_Tournament"
        ) as HTMLInputElement;
        Tournament.checked = false;
        this.search.course = "Animation";
      } else if (id == "TeamBuilding") {
        this.search.course = "";
        let stage = document.getElementById("check_Stage") as HTMLInputElement;
        stage.checked = false;
        let animation = document.getElementById(
          "check_Animations"
        ) as HTMLInputElement;
        animation.checked = false;
        let teambuilding = document.getElementById(
          "check_TeamBuilding"
        ) as HTMLInputElement;
        teambuilding.checked = true;
        let Tournament = document.getElementById(
          "check_Tournament"
        ) as HTMLInputElement;
        Tournament.checked = false;
        this.search.course = "TeamBuilding";
      } else if (id == "Tournament") {
        this.search.course = "";
        let stage = document.getElementById("check_Stage") as HTMLInputElement;
        stage.checked = false;
        let animation = document.getElementById(
          "check_Animations"
        ) as HTMLInputElement;
        animation.checked = false;
        let teambuilding = document.getElementById(
          "check_TeamBuilding"
        ) as HTMLInputElement;
        teambuilding.checked = false;
        let Tournament = document.getElementById(
          "check_Tournament"
        ) as HTMLInputElement;
        Tournament.checked = true;
        this.search.course = "Tournament";
      }

      localStorage.setItem("ohmycoach-menu-type", id);
      localStorage.setItem("Course", id);
      this.location.replaceState(
        this._const("PATH.OH_MY_EVENT_NEW") + "?course=" + id
      );
      const search = {
        course: id,
        date: "",
        ville: "",
        rayon: "0"
      };
      this.searchByEventClick(search);
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

  searchByEventClick(search) {
    //event.preventDefault();
    this.spinner.show();

    let selectorVilleID = document.getElementById("ville") as HTMLInputElement;
    selectorVilleID.style.border = "";
    var event = search.course;
    this.appService
      .getAll("/coach/searchByEvent", search)
      .subscribe(data => {
        if ((data as any).isSuccess == true) {
          setTimeout(() => {
            this.allItems = (data as any).data.event_list;

            for (var i = 0; i < this.allItems.length; i++) {
              if (event == "Stage") {
                this.allItems[i].isFromDate = "Yes";
              } else if (event == "Animation") {
                this.allItems[i].isFromDate = "No";
              } else if (event == "TeamBuilding") {
                this.allItems[i].isFromDate = "No";
              } else if (event == "Tournament") {
                this.allItems[i].isFromDate = "Yes";
              }
            }
            //   var split = this.format_Date(this.allItems[i].from_date).split(
            //     "-"
            //   );
            //   this.allItems[i].Date = split[0];
            //   this.allItems[i].Month_Year = split[1];
            // }
            //console.log("ohmytennisnew -- searchByCoach 280", this.allItems);
            this.spinner.hide();
            if (this.allItems.length > 0) {
              this.pager.totalPages = this.allItems.length;
              //console.log(this.pager.totalPages);
              this.setPage(1);
            } else {
              this.pager.totalPages = this.allItems.length;
              
              this.pagedItems = [];
              //console.log('ta '+ this.pagedItems);
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

  format_Date(date) {
    date = moment(date).toDate();
    var monthNames = [
      "January",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var trans = monthNames[monthIndex];
    return day + "-" + trans;
  }

  searchByEvent(search) {
    //console.log("ohmyeventnew -- searchByEvent 340 -- ", search);
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
    var event = search.course;
    //console.log('search '+ JSON.stringify(search));
    this.appService.getAll("/coach/searchByEvent", search).subscribe(data => {
      if ((data as any).isSuccess == true) {
        this.allItems = (data as any).data.event_list;
        //console.log("ta ", this.allItems);
        for (var i = 0; i < this.allItems.length; i++) {
          if (event == "Stage") {
            this.allItems[i].isFromDate = "Yes";
          } else if (event == "Animation") {
            this.allItems[i].isFromDate = "No";
          } else if (event == "TeamBuilding") {
            this.allItems[i].isFromDate = "No";
          } else if (event == "Tournament") {
            this.allItems[i].isFromDate = "Yes";
          }
        }
        //this.spinner.hide();
        if (this.allItems.length > 0) {
          this.pager.totalPages = this.allItems.length;
          //console.log(this.pager.totalPages);
          this.setPage(1);
        } else {
          this.pager.totalPages = this.allItems.length;
          this.pagedItems = [];
          //console.log('ta '+ this.pagedItems);
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

  goToEvent(res, et) {
    console.log(et);
    if (localStorage.getItem("onmytennis") !== null) {
      var data = JSON.stringify(res);
      localStorage.setItem("Event", data);
      if (et == "Stage") {
        this.router.navigate(["/stage-detail"]);
      } else if (et == "Animation") {
        this.router.navigate(["/animation-detail"]);
      } else if (et == "TeamBuilding") {
        this.router.navigate(["/team-building-detail"]);
      } else if (et == "Tournament") {
        this.router.navigate(["/tournament-detail"]);
      }
    } else {
      this.router.navigate(["/login"]);
    }
  }

  //rechercherfun() {
  //console.log("oh-my-coach-new.component.ts - line 342",this.rechercher)
  //  const availableFilters = [{ status: 'done' }, { other: false }], // your filters
  //   filters = Object.entries(Object.assign(availableFilters)), // returns an array of the filter's own enumerable property
  //    result = this.allItems.filter(o => filters.every(([k, v]) => o[k] === v)); // .every returns true, when every item is fulfilling the condition

  // console.log(result);

  //}
}
