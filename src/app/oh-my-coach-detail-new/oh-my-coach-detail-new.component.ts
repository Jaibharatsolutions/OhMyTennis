import { Component, OnInit, ViewChild } from "@angular/core";
import { AppService } from "../shared/app.service";
import { AppComponent } from "../app.component";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Location } from "@angular/common";
import { FullCalendarComponent } from "@fullcalendar/angular";
import dayGridView from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import * as moment from "moment";
//import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as _ from "underscore";
import * as $ from "jquery";
import * as L from "leaflet";
@Component({
  selector: "app-oh-my-coach-detail-new",
  templateUrl: "./oh-my-coach-detail-new.component.html",
  styleUrls: ["./oh-my-coach-detail-new.component.scss"]
})
export class OhMyCoachDetailNewComponent implements OnInit {
  public Ville: any = null;
  public service = new Array();
  public profileImage: any = "";
  public eventList: any = {};

  public selectedCity: any = null;
  public alertMsg: any = {
    type: "",
    msg: "",
    show: false
  };
  public min = new Date();
  public calender = [];
  calendarPlugins = [dayGridView, interactionPlugin];
  public UserAviablility: any = [];
  calendarOptions = {
    format: "DD-MM-YYYY",
    firstWeekdaySunday: false
  };

  public timeslot = {
    description: "",
    session: "",
    availability: ""
  };

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
  public booking = {
    Coach_ID: "",
    user_Id: "",
    payment_Id: 0,
    status: "",
    bookingDate: "",
    bookingCourse: "",
    amount: "",
    coach_Email: "",
    user_Email: "",
    coach_Name: "",
    user_Name: "",
    paymentStatus: "",
    session: [],
    bookingDateRange: ""
  };

  //public str: any = null;

  public course = localStorage.getItem("Course");

  public coach_detail = {
    Coach_Fname: "",
    Coach_ID: "",
    Coach_Lname: "",
    Coach_Email: "",
    Coach_Phone: "",
    InstagramURL: "",
    FacebookURL: "",
    TwitterURL: "",
    Coach_Description: "",
    Coach_Experience: "",
    Coach_Rayon: "",
    Coach_Price: "",
    Coach_Services: "",
    Coach_PriceX10: "",
    Coach_Bank_Name: "",
    Coach_Bank_ACCNum: "",
    Branch_Code: "",
    Coach_Bank_City: "",
    Coach_payment_type: "",
    Coach_transport: "",
    Coach_Image: "../../assets/images/profile_blackwhite.png",
    Coach_Resume: "",
    ResumeName: ""
  };

  public course_demand = {
    Price_2pl_1hr: "",
    Price_3pl_1hr: "",
    Price_4pl_1hr: "",
    Price_5pl_1hr: "",
    Price_6pl_1hr: "",
    person: ""
  };

  public stageRecord: any = [];
  public stageRecordCount: number;
  public teambuildingRecord: any = [];
  public teambuildingRecordCount: number;
  public animationsRecord: any = [];
  public animationsRecordCount: number;
  public tournamentRecord: any = [];
  public tournamentRecordCount: number;

  public book_coach = {
    P_CoachId: "",
    P_CourseId: "",
    P_Date: "",
    P_Hour: "",
    P_UserId: "",
    P_Amount: "",
    P_Remarks: ""
  };

  public voiture: boolean = false;
  public bus: boolean = false;
  public metro: boolean = false;
  public rer: boolean = false;
  public tram: boolean = false;

  public CoursIndividuel: boolean = false;
  public CoursCollectifOndemand: boolean = false;
  public CoursCollectifClub: boolean = false;
  public Stage: boolean = false;
  public TeamBuilding: boolean = false;
  public Animations: boolean = false;
  public Tournament: boolean = false;

  public coach_id: number;

  public moment_date: any;
  public temps: string = "";
  public Video: any;
  public Clubcourse: any;
  public resumeURL: any;
  public applicationtype: any;
  public Description: any;
  public slot: any;
  public slides: any;
  public slidecnt: any;
  public session = [];
  public bookArray = [];
  public bookingDate: any;
  public Indiv_1hr: any;
  public Indiv_10hr: any;
  public location: any;
  public pincode: any;
  public price: any;
  public setCoachName: any;
  public Amt = 0;
  public person = "";
  public book_person = 0;
  public booked_user = [];
  public allocate_person = "";
  public availablity: any;
  public is10Hr = false;
  public step_2 = false;
  public step_3 = false;
  public showclub = false;
  public Timeslotdata = {
    Start_Date: "",
    Coach_ID: "",
    Course: ""
  };

  public courseActive = "";

  constructor(
    public sanitizer: DomSanitizer,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public appService: AppService,
    public Location: Location,
    public spinner: NgxSpinnerService
  ) {
    this.slidecnt = 4;
  }

  ngAfterViewInit() {
    var datas = this.UserAviablility;
    $(".mapsection")
      .delay(1000)
      .fadeIn(500);
  }

  @ViewChild("calendar", { static: false })
  calendarComponent: FullCalendarComponent;

  ngOnInit() {
    this.spinner.show();
    if (window.innerWidth > 1024) {
      this.slidecnt = 4;
    } else if (window.innerWidth > 768) {
      this.slidecnt = 3;
    } else {
      this.slidecnt = 2;
    }

    this.couchdetail();
  }

  transform(image) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }

  couchdetail() {
    this.spinner.show();
    const coachID: string = this.activatedRoute.snapshot.queryParamMap.get(
      "id"
    );
    this.coach_id = parseInt(coachID);
    const coachId = {
      id: coachID
    };
    if (coachID != "") {
      this.setCoachName = localStorage.getItem("sendCoachDetails");
      this.appService
        .create("/coach/getcoachdetailbyid", coachId)
        .subscribe(async response => {
          if (response && response["data"]) {
            this.coach_detail = response.data.coach_list[0];
            var transportData = this.coach_detail.Coach_transport.split(", ");
            this.voiture = transportData.includes("voiture");
            this.bus = transportData.includes("bus");
            this.metro = transportData.includes("métro");
            this.rer = transportData.includes("rer");
            this.tram = transportData.includes("tram");
            this.profileImage = this.transform(this.coach_detail.Coach_Image);

            this.service = this.coach_detail.Coach_Services.split(",");
            this.CoursIndividuel = this.service.includes("CoursIndividuel");
            this.CoursCollectifOndemand = this.service.includes(
              "CoursCollectifOndemand"
            );
            this.CoursCollectifClub = this.service.includes(
              "CoursCollectifClub"
            );
            this.Stage = this.service.includes("Stage");
            this.TeamBuilding = this.service.includes("TeamBuilding");
            this.Animations = this.service.includes("Animations");
            this.Tournament = this.service.includes("Tournament");
            if (this.Stage) {
              this.getEventData("stage", this.coach_id);
            } else if (this.TeamBuilding) {
              this.getEventData("teambuilding", this.coach_id);
            } else if (this.Animations) {
              this.getEventData("animations", this.coach_id);
            } else if (this.Tournament) {
              this.getEventData("tournament", this.coach_id);
            }
            this.spinner.hide();
          }
        });
    } else {
      this.router.navigate(["ohmycoachnew"], {
        queryParams: {}
      });
    }

    const courseSegment: string = this.activatedRoute.snapshot.queryParamMap.get(
      "course"
    );

    if (courseSegment != "") {
      this.courseActive = courseSegment;
    }
    this.appService
      .getAll("/course/getindividualcourses/" + coachID)
      .subscribe(response => {
        if ((response as any).data.course.length > 0) {
          if (response && response["data"]) {
            var dat = (response as any).data.course[0];
            this.price = dat.Price_min;
            this.Indiv_1hr = dat.Price_min;
            this.Indiv_10hr = dat.Price_max;
            this.Video = dat.Video;
            this.Description = dat.Description;
            this.pincode = dat.Postalcode;
            this.location = dat.Location;
            this.mapvalues = eval("[" + dat.coordonnees_gps + "]");
            this.lat = this.mapvalues[0].toFixed(3);
            this.lang = this.mapvalues[1].toFixed(3);
            this.mapintigration(this.mapvalues);
            this.appService
              .getAll("/city/" + dat.Postalcode)
              .subscribe(response => {
                // tslint:disable-next-line:no-string-literal
                if (response && response["data"]) {
                  // tslint:disable-next-line:no-string-literal
                  this.selectedCity = (response as any).data.city_list;
                }
              });
          }
        }
        //this.couchdetail();
        // this.spinner.hide();
      });
  }

  getEventData(eventname, coachId) {
    console.log(coachId);
    this.stageRecord = [];
    this.teambuildingRecord = [];
    this.animationsRecord = [];
    this.tournamentRecord = [];

    if (eventname == "stage") {
      this.appService
        .getAll("/coach/getstagebycoachid/" + coachId)
        .subscribe(async stageRes => {
          if (stageRes && (stageRes as any).data.stage_list.length > 0) {
            this.stageRecord = (stageRes as any).data.stage_list;
            this.stageRecordCount = (stageRes as any).data.count;
            for (var i = 0; i < 2; i++) {
              var split = this.formatDate(this.stageRecord[i].from_date).split(
                "-"
              );
              this.stageRecord[i].Date = split[0];
              this.stageRecord[i].Month_Year = split[1];
            }
          }
        });
    } else if (eventname == "teambuilding") {
      this.appService
        .getAll("/coach/getteambuildingbycoachid/" + coachId)
        .subscribe(async teambuildingRes => {
          this.teambuildingRecord = (teambuildingRes as any).data.teambuilding_list;
          if (this.teambuildingRecord && this.teambuildingRecord.length > 0) {
            this.teambuildingRecordCount = (teambuildingRes as any).data.count;
          }
        });
    } else if (eventname == "animations") {
      this.appService
        .getAll("/coach/getanimationsbycoachid/" + coachId)
        .subscribe(async animationsRes => {
          this.animationsRecord = (animationsRes as any).data.animations_list;
          if (this.animationsRecord && this.animationsRecord.length > 0) {
            this.animationsRecordCount = (animationsRes as any).data.count;
          }
        });
    } else if (eventname == "tournament") {
      this.appService
        .getAll("/coach/gettournamentbycoachid/" + coachId)
        .subscribe(async tournamentRes => {
          this.tournamentRecord = (tournamentRes as any).data.tournament_list;
          if (this.tournamentRecord && this.tournamentRecord.length > 0) {
            for (var i = 0; i < 2; i++) {
              var split = this.formatDate(
                this.tournamentRecord[i].from_date
              ).split("-");
              this.tournamentRecord[i].Date = split[0];
              this.tournamentRecord[i].Month_Year = split[1];
            }
            this.tournamentRecordCount = (tournamentRes as any).data.count;
          }
        });
    }
  }

  displayLoadedMap(latitude, longitude, radius) {
    console.log("latitude - " + latitude);
    console.log("longitude - " + longitude);
    if (this.map) {
      console.log("Got longitude - " + longitude);
      this.map.remove();
      $("#map").html("");
      $(".map-frame").empty();
      $('<div id="map" style="height: 385px;"></div>').appendTo(".map-frame");
    }

    this.mapvalues = eval("[" + latitude + "," + longitude + "]");
    this.lat = latitude;
    this.lang = longitude;
    console.log("Map Values" + this.mapvalues);

    this.map = L.map("map", {
      center: this.mapvalues,
      zoom: 15
    });
    //return;

    //Adding the Circle to the Map

    L.circle([this.lat, this.lang], {
      color: "orange",
      fillColor: "#FFA500",
      fillOpacity: 0.5,
      radius: radius * 10
    }).addTo(this.map);

    const tiles = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 25
      }
    );

    tiles.addTo(this.map);
    var greenIcon = L.icon({
      iconUrl: "../assets/images/marker-icon.png",
      iconSize: [38, 95],
      iconAnchor: [22, 94]
    });

    L.marker([this.lat, this.lang], { icon: greenIcon }).addTo(this.map);
    //.openPopup();
  }

  eventListDetails() {}

  download() {
    if (this.coach_detail.Coach_Resume) {
      var blob = this.dataURLtoBlob(this.coach_detail.Coach_Resume);
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = this.coach_detail.ResumeName;
      link.click();
    }
  }

  dataURLtoBlob(dataurl) {
    var arr = dataurl.split(",");
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = window.atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
      type: mime
    });
  }

  enable10h() {
    this.price = this.Indiv_10hr;
    this.is10Hr = true;
    $("#amount").html("Totale: €" + " " + this.price);
    this.hide10h();
  }

  hide10h() {
    $("#10hrposter").hide();
  }

  openURL() {
    window.open(this.Video);
  }

  _showAlertMessage(c: string, t: string): void {
    $(".alert-dismissible").show();
    this.alertMsg.type = c;
    this.alertMsg.msg = t;
    this.alertMsg.show = true;

    setTimeout(function() {
      $(".alert-dismissible").hide();
    }, 3000);
  }

  _closeAlertMessage(e) {
    if (e) {
      this.alertMsg.type = "";
      this.alertMsg.msg = "";
      this.alertMsg.show = false;
    }
  }

  mapintigration(mappoint) {
    this.map = L.map("map", {
      center: mappoint,
      zoom: 16
    });

    const tiles = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 25
      }
    );

    tiles.addTo(this.map);
    var greenIcon = L.icon({
      iconUrl: "../assets/images/marker-icon.png"
    });

    L.marker(mappoint, { icon: greenIcon })
      .addTo(this.map)
      .openPopup();
  }

  gotoCouch(ser, res) {
    if (localStorage.getItem("onmytennis") !== null) {
      var data = JSON.stringify(res);
      localStorage.setItem("Coach", data);
      localStorage.setItem("Course", ser);
      this.router.navigate(["/coachdetail"]);
    } else {
      this.router.navigate(["/login"]);
    }
  }

  gotoStage(res) {
    if (localStorage.getItem("onmytennis") !== null) {
      var data = JSON.stringify(res);
      localStorage.setItem("Event", data);
      this.router.navigate(["/stage-detail"]);
    } else {
      this.router.navigate(["/login"]);
    }
  }

  gotoTeambuilding(res) {
    if (localStorage.getItem("onmytennis") !== null) {
      var data = JSON.stringify(res);
      localStorage.setItem("Event", data);
      this.router.navigate(["/team-building-detail"]);
    } else {
      this.router.navigate(["/login"]);
    }
  }

  gotoAnimations(res) {
    if (localStorage.getItem("onmytennis") !== null) {
      var data = JSON.stringify(res);
      localStorage.setItem("Event", data);
      this.router.navigate(["/animation-detail"]);
    } else {
      this.router.navigate(["/login"]);
    }
  }

  gotoTournament(res) {
    if (localStorage.getItem("onmytennis") !== null) {
      var data = JSON.stringify(res);
      localStorage.setItem("Event", data);
      this.router.navigate(["/tournament-detail"]);
    } else {
      this.router.navigate(["/login"]);
    }
  }

  gotoVoirPlus(event_type, coach) {
    localStorage.setItem("coach_id", coach);
    if(event_type == 'stage') {
      this.router.navigate(["/coach-stage"]);
    } else if(event_type == 'teambuilding') {
      this.router.navigate(["/coach-teambuilding"]);
    } else if(event_type == 'animations') {
      this.router.navigate(["/coach-animations"]);
    } else if(event_type == 'tournament') {
      this.router.navigate(["/coach-tounament"]);
    }
  }

  formatDate(date) {
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
}
