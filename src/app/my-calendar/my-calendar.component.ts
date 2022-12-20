import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  AfterViewInit
} from "@angular/core";
import { FullCalendarComponent } from "@fullcalendar/angular";
import dayGridView from "@fullcalendar/daygrid";
import frLocale from "@fullcalendar/core/locales/fr";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { CoachComponent } from "../model/coach/coach.component";
import { Location } from "@angular/common";
import * as $ from "jquery";
import * as moment from "moment";

@Component({
  selector: "app-my-calendar",
  templateUrl: "./my-calendar.component.html",
  styleUrls: ["./my-calendar.component.scss"]
})
export class MyCalendarComponent extends CoachComponent
  implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    var today = document.getElementsByClassName("fc-today-button");
    if (today) today[0].innerHTML = "Aujourd'hui";
  }

  public calender = [];
  calendarPlugins = [dayGridView];
  public frommindate = new Date(Date.now());
  public weeklist: weekObject[] = [];

  //public weekObject:any={"Semaine":0,"Dates":""}
  public availabilityObj: any = {};
  public startDate: any;
  public startDate_db: any;
  public endDate: any;
  public endDate_db: any;
  public IsShow: any = false;
  public response: any = {};
  public availability = [];
  public selectedradio = "1";

  //log.info("");

  public saveVailabilityFormData = {
    h8: "",
    h9: "",
    h10: "",
    h11: "",
    h12: "",
    h13: "",
    h14: "",
    h15: "",
    h16: "",
    h17: "",
    h18: "",
    h19: "",
    h20: "",
    h21: "",
    Coach_Id: "",
    Date: "",
    Start_Date: "",
    End_Date: ""
  };

  CheckAll(checkstate, weekday) {
    console.log(checkstate, weekday);
    if (weekday == "chkAllLundi") {
      var i = 1;
    } else if (weekday == "chkAllMardi") {
      var i = 2;
    } else if (weekday == "chkAllMercredi") {
      var i = 3;
    } else if (weekday == "chkAllJeudi") {
      var i = 4;
    } else if (weekday == "chkAllVendredi") {
      var i = 5;
    } else if (weekday == "chkAllSamedis") {
      var i = 6;
    } else if (weekday == "chkAllDimanche") {
      var i = 7;
    }

    //8h
    if (checkstate == true) {
      this.availabilityObj.h8 = "Y";
      this.saveVailabilityFormData.h8 = "Y";
      (document.getElementById("8h_" + i) as HTMLInputElement).checked = true;
    } else {
      this.availabilityObj.h8 = "N";
      this.saveVailabilityFormData.h8 = "N";
      (document.getElementById("8h_" + i) as HTMLInputElement).checked = false;
    }

    //9h
    if (checkstate == true) {
      this.availabilityObj.h9 = "Y";
      this.saveVailabilityFormData.h9 = "Y";
      (document.getElementById("9h_" + i) as HTMLInputElement).checked = true;
    } else {
      this.availabilityObj.h9 = "N";
      this.saveVailabilityFormData.h9 = "N";
      (document.getElementById("9h_" + i) as HTMLInputElement).checked = false;
    }

    //10h
    if (checkstate == true) {
      this.availabilityObj.h10 = "Y";
      this.saveVailabilityFormData.h10 = "Y";
      (document.getElementById("10h_" + i) as HTMLInputElement).checked = true;
    } else {
      this.availabilityObj.h10 = "N";
      this.saveVailabilityFormData.h10 = "N";
      (document.getElementById("10h_" + i) as HTMLInputElement).checked = false;
    }

    //11h
    if (checkstate == true) {
      this.availabilityObj.h11 = "Y";
      this.saveVailabilityFormData.h11 = "Y";
      (document.getElementById("11h_" + i) as HTMLInputElement).checked = true;
    } else {
      this.availabilityObj.h11 = "N";
      this.saveVailabilityFormData.h11 = "N";
      (document.getElementById("11h_" + i) as HTMLInputElement).checked = false;
    }

    //12h
    if (checkstate == true) {
      this.availabilityObj.h12 = "Y";
      this.saveVailabilityFormData.h12 = "Y";
      (document.getElementById("12h_" + i) as HTMLInputElement).checked = true;
    } else {
      this.availabilityObj.h12 = "N";
      this.saveVailabilityFormData.h12 = "N";
      (document.getElementById("12h_" + i) as HTMLInputElement).checked = false;
    }

    //13h
    if (checkstate == true) {
      this.availabilityObj.h13 = "Y";
      this.saveVailabilityFormData.h13 = "Y";
      (document.getElementById("13h_" + i) as HTMLInputElement).checked = true;
    } else {
      this.availabilityObj.h13 = "N";
      this.saveVailabilityFormData.h13 = "N";
      (document.getElementById("13h_" + i) as HTMLInputElement).checked = false;
    }

    //14h
    if (checkstate == true) {
      this.availabilityObj.h14 = "Y";
      this.saveVailabilityFormData.h14 = "Y";
      (document.getElementById("14h_" + i) as HTMLInputElement).checked = true;
    } else {
      this.availabilityObj.h14 = "N";
      this.saveVailabilityFormData.h14 = "N";
      (document.getElementById("14h_" + i) as HTMLInputElement).checked = false;
    }

    //15h
    if (checkstate == true) {
      this.availabilityObj.h15 = "Y";
      this.saveVailabilityFormData.h15 = "Y";
      (document.getElementById("15h_" + i) as HTMLInputElement).checked = true;
    } else {
      this.availabilityObj.h15 = "N";
      this.saveVailabilityFormData.h15 = "N";
      (document.getElementById("15h_" + i) as HTMLInputElement).checked = false;
    }

    //16h
    if (checkstate == true) {
      this.availabilityObj.h16 = "Y";
      this.saveVailabilityFormData.h16 = "Y";
      (document.getElementById("16h_" + i) as HTMLInputElement).checked = true;
    } else {
      this.availabilityObj.h16 = "N";
      this.saveVailabilityFormData.h16 = "N";
      (document.getElementById("16h_" + i) as HTMLInputElement).checked = false;
    }

    //17h
    if (checkstate == true) {
      this.availabilityObj.h17 = "Y";
      this.saveVailabilityFormData.h17 = "Y";
      (document.getElementById("17h_" + i) as HTMLInputElement).checked = true;
    } else {
      this.availabilityObj.h17 = "N";
      this.saveVailabilityFormData.h17 = "N";
      (document.getElementById("17h_" + i) as HTMLInputElement).checked = false;
    }

    //18h
    if (checkstate == true) {
      this.availabilityObj.h18 = "Y";
      this.saveVailabilityFormData.h18 = "Y";
      (document.getElementById("18h_" + i) as HTMLInputElement).checked = true;
    } else {
      this.availabilityObj.h18 = "N";
      this.saveVailabilityFormData.h18 = "N";
      (document.getElementById("18h_" + i) as HTMLInputElement).checked = false;
    }

    //19h
    if (checkstate == true) {
      this.availabilityObj.h19 = "Y";
      this.saveVailabilityFormData.h19 = "Y";
      (document.getElementById("19h_" + i) as HTMLInputElement).checked = true;
    } else {
      this.availabilityObj.h19 = "N";
      this.saveVailabilityFormData.h19 = "N";
      (document.getElementById("19h_" + i) as HTMLInputElement).checked = false;
    }

    //20h
    if (checkstate == true) {
      this.availabilityObj.h20 = "Y";
      this.saveVailabilityFormData.h20 = "Y";
      (document.getElementById("20h_" + i) as HTMLInputElement).checked = true;
    } else {
      this.availabilityObj.h20 = "N";
      this.saveVailabilityFormData.h20 = "N";
      (document.getElementById("20h_" + i) as HTMLInputElement).checked = false;
    }

    //21h
    if (checkstate == true) {
      this.availabilityObj.h21 = "Y";
      this.saveVailabilityFormData.h21 = "Y";
      (document.getElementById("21h_" + i) as HTMLInputElement).checked = true;
    } else {
      this.availabilityObj.h21 = "N";
      this.saveVailabilityFormData.h21 = "N";
      (document.getElementById("21h_" + i) as HTMLInputElement).checked = false;
    }
  }

  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    appService: AppService,
    location: Location,
    spinner: NgxSpinnerService
  ) {
    super(activatedRoute, router, appService, location, spinner);
  }

  @ViewChild("calendar", { static: false })
  calendarComponent: FullCalendarComponent;

  ngOnInit() {
    var titile = document.getElementsByClassName("brand");
    if (titile) titile[0].innerHTML = "MON CALENDRIER";
    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    var coach1 = JSON.parse(coach);
    var coachid = {
      Coach_ID: coach1.id
    };

    this.availabilityObj.weekNumber = "default";
    this.appService.getAll("/getcalender/", coachid).subscribe(response => {
      if (response && response["data"]) {
        this.calender = (response as any).data.calender;
        console.log("calender", this.calender);
      }
    });

    let curentyear = moment().year();
    let todayDate = moment(new Date(), "DD-MM-YYYY");
    let weekNumber = moment(todayDate).isoWeek();
    let weeknumbers = this.getWeekNumber(new Date());
    let weekcount = this.weeksInYear(curentyear);

    for (let i = weeknumbers[1]; i <= weekcount; i++) {
      let startDate = moment()
        .day("Monday")
        .week(i);

      let endDate = moment(startDate, "DD-MM-YYYY").add(6, "days");
      this.weeklist.push({
        Semaine: i,
        Dates: `${moment(startDate).format("DD/MM/YYYY")} to ${moment(
          endDate
        ).format("DD/MM/YYYY")}`
      });
    }

    console.log("weeklist", this.weeklist);
  }

  getWeekNumber(d) {
    var yearStart: any;
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0, 0, 0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    // Get first day of year
    yearStart = new Date(d.getFullYear(), 0, 1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    // Return array of year and week number
    return [d.getFullYear(), weekNo];
  }
  weeksInYear(year) {
    var d = new Date(year, 11, 31);
    var week = this.getWeekNumber(d)[1];
    return week == 1 ? this.getWeekNumber(d.setDate(24))[1] : week;
  }
  getWeek() {
    let Lundi: any;
    let Mardi: any;
    let Mercredi: any;
    let Jeudi: any;
    let Vendredi: any;
    let Samedi: any;
    let Dimanche: any;

    if (this.availabilityObj.weekNumber != "default") {
      var weekNo = this.availabilityObj.weekNumber;
      var d1 = new Date();
      var numOfdaysPastSinceLastMonday = d1.getDay() - 1;
      d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
      var weekNoToday = d1.getWeek();
      var weeksInTheFuture = weekNo - weekNoToday;
      d1.setDate(d1.getDate() + 7 * weeksInTheFuture);

      let month =
        Number(
          this.dateFromWeekNumber(
            new Date().getFullYear(),
            this.availabilityObj.weekNumber
          ).getMonth()
        ) + Number(1);
      this.startDate =
        d1.getDate() + "/" + (d1.getMonth() + 1) + "/" + d1.getFullYear();
      this.startDate_db =
        d1.getFullYear() + "-" + (d1.getMonth() + 1) + "-" + d1.getDate();

      Lundi = d1.getDate() + "/" + (d1.getMonth() + 1) + "/" + d1.getFullYear();
      d1.setDate(d1.getDate() + 1);
      Mardi = d1.getDate() + "/" + (d1.getMonth() + 1) + "/" + d1.getFullYear();
      d1.setDate(d1.getDate() + 1);
      Mercredi =
        d1.getDate() + "/" + (d1.getMonth() + 1) + "/" + d1.getFullYear();
      d1.setDate(d1.getDate() + 1);
      Jeudi = d1.getDate() + "/" + (d1.getMonth() + 1) + "/" + d1.getFullYear();
      d1.setDate(d1.getDate() + 1);
      Vendredi =
        d1.getDate() + "/" + (d1.getMonth() + 1) + "/" + d1.getFullYear();
      d1.setDate(d1.getDate() + 1);
      Samedi =
        d1.getDate() + "/" + (d1.getMonth() + 1) + "/" + d1.getFullYear();
      d1.setDate(d1.getDate() + 1);
      Dimanche =
        d1.getDate() + "/" + (d1.getMonth() + 1) + "/" + d1.getFullYear();

      this.endDate =
        d1.getDate() + "/" + (d1.getMonth() + 1) + "/" + d1.getFullYear();
      this.endDate_db =
        d1.getFullYear() + "-" + (d1.getMonth() + 1) + "-" + d1.getDate();

      //Render Value
      // document.getElementById('showWeekRange').innerHTML = this.startDate + ' To ' + this.endDate;
      document.getElementById("Lundi").innerHTML = Lundi;
      document.getElementById("Mardi").innerHTML = Mardi;
      document.getElementById("Mercredi").innerHTML = Mercredi;
      document.getElementById("Jeudi").innerHTML = Jeudi;
      document.getElementById("Vendredi").innerHTML = Vendredi;
      document.getElementById("Samedi").innerHTML = Samedi;
      document.getElementById("Dimanche").innerHTML = Dimanche;
    } else {
      // document.getElementById('showWeekRange').innerHTML = "";
      document.getElementById("Lundi").innerHTML = "";
      document.getElementById("Mardi").innerHTML = "";
      document.getElementById("Mercredi").innerHTML = "";
      document.getElementById("Jeudi").innerHTML = "";
      document.getElementById("Vendredi").innerHTML = "";
      document.getElementById("Samedi").innerHTML = "";
      document.getElementById("Dimanche").innerHTML = "";
    }
  }

  clearcheck() {
    let formInputItem = document
      .querySelectorAll(".available_table")[0]
      .querySelectorAll("input");
    formInputItem.forEach(function(inputElement) {
      let mode = inputElement as HTMLInputElement;
      if (mode.type == "checkbox") {
        if (mode.checked == true) {
          mode.checked = false;
        }
      }
    });
  }

  inlineradio1() {
    this.revokeChanges();
    document.getElementById("inlineradio2").removeAttribute("checked");
    let formInputItem = document
      .querySelectorAll(".available_table")[0]
      .querySelectorAll("input");
    formInputItem.forEach(function(inputElement) {
      let mode = inputElement as HTMLInputElement;
      if (mode.type == "checkbox") {
        if (mode.checked == true) {
          mode.checked = false;
        }
      }
    });
    document.getElementById("lblweek").style.display = "block";
    document.getElementById("dateRangeDiv").style.display = "none";
    document.getElementById("weekNum").style.display = "block";
    this.selectedradio = "1";
  }

  inlineradio2() {
    this.revokeChanges();
    document.getElementById("inlineradio1").removeAttribute("checked");
    let formInputItem = document
      .querySelectorAll(".available_table")[0]
      .querySelectorAll("input");
    formInputItem.forEach(function(inputElement) {
      let mode = inputElement as HTMLInputElement;
      if (mode.type == "checkbox") {
        if (mode.checked == true) {
          mode.checked = false;
        }
      }
    });
    document.getElementById("lblweek").style.display = "none";
    document.getElementById("weekNum").style.display = "none";
    document.getElementById("dateRangeDiv").style.display = "block";
    this.selectedradio = "2";
  }

  revokeChanges() {
    //  document.getElementById('showWeekRange').innerHTML = "";
    document.getElementById("Lundi").innerHTML = "";
    document.getElementById("Mardi").innerHTML = "";
    document.getElementById("Mercredi").innerHTML = "";
    document.getElementById("Jeudi").innerHTML = "";
    document.getElementById("Vendredi").innerHTML = "";
    document.getElementById("Samedi").innerHTML = "";
    document.getElementById("Dimanche").innerHTML = "";
    this.availabilityObj.weekNumber = "default";
  }

  dateFromWeekNumber(year, week) {
    let d = new Date(year, 0, 1);
    let dayNum = d.getDay();
    let diff = --week * 7;
    // If 1 Jan is Friday to Sunday, go to next week
    if (!dayNum || dayNum > 4) {
      diff += 7;
    }
    // Add required number of days
    d.setDate(d.getDate() - d.getDay() + ++diff);
    return d;
  }

  saveAvailability() {
    this.spinner.show();
    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    var coach1 = JSON.parse(coach);

    console.log(coach1.id);
    var coachid = {
      Coach_ID: coach1.id
    };
    this.saveVailabilityFormData.Coach_Id = coachid.Coach_ID;
    if (this.selectedradio == "1") {
      //Start Date
      this.availabilityObj.StartDate = this.startDate_db;
      if (this.startDate_db != undefined) {
        this.saveVailabilityFormData.Start_Date = this.startDate_db;
      }

      //End Date
      this.availabilityObj.End_Date = this.endDate_db;
      if (this.endDate_db != undefined) {
        this.saveVailabilityFormData.End_Date = this.endDate_db;
      }

      if (this.availabilityObj.weekNumber == "default") {
        alert("Veuillez sélectionner la semaine");
        this.spinner.hide();
        return;
      }

      for (var i = 1; i <= 7; i++) {
        // Date of Each Day
        if (Date !== undefined) {
          this.saveVailabilityFormData.Date = Date;
          this.availabilityObj.Date = Date;
        }

        //8h
        if (
          (document.getElementById("8h_" + i) as HTMLInputElement).checked ==
          true
        ) {
          this.availabilityObj.h8 = "Y";
          this.saveVailabilityFormData.h8 = "Y";
        } else {
          this.availabilityObj.h8 = "N";
          this.saveVailabilityFormData.h8 = "N";
        }

        //9h
        if (
          (document.getElementById("9h_" + i) as HTMLInputElement).checked ==
          true
        ) {
          this.availabilityObj.h9 = "Y";
          this.saveVailabilityFormData.h9 = "Y";
        } else {
          this.availabilityObj.h9 = "N";
          this.saveVailabilityFormData.h9 = "N";
        }

        //10h
        if (
          (document.getElementById("10h_" + i) as HTMLInputElement).checked ==
          true
        ) {
          this.availabilityObj.h10 = "Y";
          this.saveVailabilityFormData.h10 = "Y";
        } else {
          this.availabilityObj.h10 = "N";
          this.saveVailabilityFormData.h10 = "N";
        }

        //11h
        if (
          (document.getElementById("11h_" + i) as HTMLInputElement).checked ==
          true
        ) {
          this.availabilityObj.h11 = "Y";
          this.saveVailabilityFormData.h11 = "Y";
        } else {
          this.availabilityObj.h11 = "N";
          this.saveVailabilityFormData.h11 = "N";
        }

        //12h
        if (
          (document.getElementById("12h_" + i) as HTMLInputElement).checked ==
          true
        ) {
          this.availabilityObj.h12 = "Y";
          this.saveVailabilityFormData.h12 = "Y";
        } else {
          this.availabilityObj.h12 = "N";
          this.saveVailabilityFormData.h12 = "N";
        }

        //13h
        if (
          (document.getElementById("13h_" + i) as HTMLInputElement).checked ==
          true
        ) {
          this.availabilityObj.h13 = "Y";
          this.saveVailabilityFormData.h13 = "Y";
        } else {
          this.availabilityObj.h13 = "N";
          this.saveVailabilityFormData.h13 = "N";
        }

        //14h
        if (
          (document.getElementById("14h_" + i) as HTMLInputElement).checked ==
          true
        ) {
          this.availabilityObj.h14 = "Y";
          this.saveVailabilityFormData.h14 = "Y";
        } else {
          this.availabilityObj.h14 = "N";
          this.saveVailabilityFormData.h14 = "N";
        }

        //15h
        if (
          (document.getElementById("15h_" + i) as HTMLInputElement).checked ==
          true
        ) {
          this.availabilityObj.h15 = "Y";
          this.saveVailabilityFormData.h15 = "Y";
        } else {
          this.availabilityObj.h15 = "N";
          this.saveVailabilityFormData.h15 = "N";
        }

        //16h
        if (
          (document.getElementById("16h_" + i) as HTMLInputElement).checked ==
          true
        ) {
          this.availabilityObj.h16 = "Y";
          this.saveVailabilityFormData.h16 = "Y";
        } else {
          this.availabilityObj.h16 = "N";
          this.saveVailabilityFormData.h16 = "N";
        }

        //17h
        if (
          (document.getElementById("17h_" + i) as HTMLInputElement).checked ==
          true
        ) {
          this.availabilityObj.h17 = "Y";
          this.saveVailabilityFormData.h17 = "Y";
        } else {
          this.availabilityObj.h17 = "N";
          this.saveVailabilityFormData.h17 = "N";
        }

        //18h
        if (
          (document.getElementById("18h_" + i) as HTMLInputElement).checked ==
          true
        ) {
          this.availabilityObj.h18 = "Y";
          this.saveVailabilityFormData.h18 = "Y";
        } else {
          this.availabilityObj.h18 = "N";
          this.saveVailabilityFormData.h18 = "N";
        }

        //19h
        if (
          (document.getElementById("19h_" + i) as HTMLInputElement).checked ==
          true
        ) {
          this.availabilityObj.h19 = "Y";
          this.saveVailabilityFormData.h19 = "Y";
        } else {
          this.availabilityObj.h19 = "N";
          this.saveVailabilityFormData.h19 = "N";
        }

        //20h
        if (
          (document.getElementById("20h_" + i) as HTMLInputElement).checked ==
          true
        ) {
          this.availabilityObj.h20 = "Y";
          this.saveVailabilityFormData.h20 = "Y";
        } else {
          this.availabilityObj.h20 = "N";
          this.saveVailabilityFormData.h20 = "N";
        }

        //21h
        if (
          (document.getElementById("21h_" + i) as HTMLInputElement).checked ==
          true
        ) {
          this.availabilityObj.h21 = "Y";
          this.saveVailabilityFormData.h21 = "Y";
        } else {
          this.availabilityObj.h21 = "N";
          this.saveVailabilityFormData.h21 = "N";
        }

        this.availability.push(this.saveVailabilityFormData);
        this.saveVailabilityFormData = {
          h8: "",
          h9: "",
          h10: "",
          h11: "",
          h12: "",
          h13: "",
          h14: "",
          h15: "",
          h16: "",
          h17: "",
          h18: "",
          h19: "",
          h20: "",
          h21: "",
          Coach_Id: coachid.Coach_ID,
          Date: "",
          Start_Date: this.startDate_db,
          End_Date: this.endDate_db
        };
        Date = this.addDays(Date);
      }
    } else {
      if (
        this.availabilityObj.StartDate == undefined ||
        this.availabilityObj.EndDate == undefined
      ) {
        alert("Veuillez sélectionner la date");
        this.spinner.hide();
        return;
      }

      //StartDate
      this.startDate_db = this.availabilityObj.StartDate;
      this.saveVailabilityFormData.Start_Date = this.availabilityObj.StartDate;

      //EndDate
      this.endDate_db = this.availabilityObj.EndDate;
      this.saveVailabilityFormData.End_Date = this.availabilityObj.EndDate;

      var Difference_In_Time =
        this.availabilityObj.EndDate.getTime() -
        this.availabilityObj.StartDate.getTime();

      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24) + 1;
      var dayofdate = this.availabilityObj.StartDate.getDay();

      var j = 1;
      if (Difference_In_Days > 6) {
        Difference_In_Days = 7;
        j = 1;

        var startD = this.startDate_db.setDate(this.startDate_db.getDate());
        var endD = this.endDate_db.setDate(this.endDate_db.getDate());
        for (var i = j; i <= 7; i++) {
          // Date of Each Day
          if (Date !== undefined) {
            this.saveVailabilityFormData.Date = Date;
            this.availabilityObj.Date = Date;
          }

          //8h
          if (
            (document.getElementById("8h_" + i) as HTMLInputElement).checked ==
            true
          ) {
            this.availabilityObj.h8 = "Y";
            this.saveVailabilityFormData.h8 = "Y";
          } else {
            this.availabilityObj.h8 = "N";
            this.saveVailabilityFormData.h8 = "N";
          }

          //9h
          if (
            (document.getElementById("9h_" + i) as HTMLInputElement).checked ==
            true
          ) {
            this.availabilityObj.h9 = "Y";
            this.saveVailabilityFormData.h9 = "Y";
          } else {
            this.availabilityObj.h9 = "N";
            this.saveVailabilityFormData.h9 = "N";
          }

          //10h
          if (
            (document.getElementById("10h_" + i) as HTMLInputElement).checked ==
            true
          ) {
            this.availabilityObj.h10 = "Y";
            this.saveVailabilityFormData.h10 = "Y";
          } else {
            this.availabilityObj.h10 = "N";
            this.saveVailabilityFormData.h10 = "N";
          }

          //11h
          if (
            (document.getElementById("11h_" + i) as HTMLInputElement).checked ==
            true
          ) {
            this.availabilityObj.h11 = "Y";
            this.saveVailabilityFormData.h11 = "Y";
          } else {
            this.availabilityObj.h11 = "N";
            this.saveVailabilityFormData.h11 = "N";
          }

          //12h
          if (
            (document.getElementById("12h_" + i) as HTMLInputElement).checked ==
            true
          ) {
            this.availabilityObj.h12 = "Y";
            this.saveVailabilityFormData.h12 = "Y";
          } else {
            this.availabilityObj.h12 = "N";
            this.saveVailabilityFormData.h12 = "N";
          }

          //13h
          if (
            (document.getElementById("13h_" + i) as HTMLInputElement).checked ==
            true
          ) {
            this.availabilityObj.h13 = "Y";
            this.saveVailabilityFormData.h13 = "Y";
          } else {
            this.availabilityObj.h13 = "N";
            this.saveVailabilityFormData.h13 = "N";
          }

          //14h
          if (
            (document.getElementById("14h_" + i) as HTMLInputElement).checked ==
            true
          ) {
            this.availabilityObj.h14 = "Y";
            this.saveVailabilityFormData.h14 = "Y";
          } else {
            this.availabilityObj.h14 = "N";
            this.saveVailabilityFormData.h14 = "N";
          }

          //15h
          if (
            (document.getElementById("15h_" + i) as HTMLInputElement).checked ==
            true
          ) {
            this.availabilityObj.h15 = "Y";
            this.saveVailabilityFormData.h15 = "Y";
          } else {
            this.availabilityObj.h15 = "N";
            this.saveVailabilityFormData.h15 = "N";
          }

          //16h
          if (
            (document.getElementById("16h_" + i) as HTMLInputElement).checked ==
            true
          ) {
            this.availabilityObj.h16 = "Y";
            this.saveVailabilityFormData.h16 = "Y";
          } else {
            this.availabilityObj.h16 = "N";
            this.saveVailabilityFormData.h16 = "N";
          }

          //17h
          if (
            (document.getElementById("17h_" + i) as HTMLInputElement).checked ==
            true
          ) {
            this.availabilityObj.h17 = "Y";
            this.saveVailabilityFormData.h17 = "Y";
          } else {
            this.availabilityObj.h17 = "N";
            this.saveVailabilityFormData.h17 = "N";
          }

          //18h
          if (
            (document.getElementById("18h_" + i) as HTMLInputElement).checked ==
            true
          ) {
            this.availabilityObj.h18 = "Y";
            this.saveVailabilityFormData.h18 = "Y";
          } else {
            this.availabilityObj.h18 = "N";
            this.saveVailabilityFormData.h18 = "N";
          }

          //19h
          if (
            (document.getElementById("19h_" + i) as HTMLInputElement).checked ==
            true
          ) {
            this.availabilityObj.h19 = "Y";
            this.saveVailabilityFormData.h19 = "Y";
          } else {
            this.availabilityObj.h19 = "N";
            this.saveVailabilityFormData.h19 = "N";
          }

          //20h
          if (
            (document.getElementById("20h_" + i) as HTMLInputElement).checked ==
            true
          ) {
            this.availabilityObj.h20 = "Y";
            this.saveVailabilityFormData.h20 = "Y";
          } else {
            this.availabilityObj.h20 = "N";
            this.saveVailabilityFormData.h20 = "N";
          }

          //21h
          if (
            (document.getElementById("21h_" + i) as HTMLInputElement).checked ==
            true
          ) {
            this.availabilityObj.h21 = "Y";
            this.saveVailabilityFormData.h21 = "Y";
          } else {
            this.availabilityObj.h21 = "N";
            this.saveVailabilityFormData.h21 = "N";
          }

          this.availability.push(this.saveVailabilityFormData);
          this.saveVailabilityFormData = {
            h8: "",
            h9: "",
            h10: "",
            h11: "",
            h12: "",
            h13: "",
            h14: "",
            h15: "",
            h16: "",
            h17: "",
            h18: "",
            h19: "",
            h20: "",
            h21: "",
            Coach_Id: coachid.Coach_ID,
            Date: "",
            Start_Date: startD,
            End_Date: endD
          };

          Date = this.addDays(Date);
        }
      } else {
        if (dayofdate == 0) {
          var startD = this.startDate_db.setDate(this.startDate_db.getDate());
          var endD = this.endDate_db.setDate(this.endDate_db.getDate());

          for (var i = 7; i <= 7; i++) {
            // Date of Each Day
            if (Date !== undefined) {
              this.saveVailabilityFormData.Date = Date;
              this.availabilityObj.Date = Date;
            }

            //8h
            if (
              (document.getElementById("8h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h8 = "Y";
              this.saveVailabilityFormData.h8 = "Y";
            } else {
              this.availabilityObj.h8 = "N";
              this.saveVailabilityFormData.h8 = "N";
            }

            //9h
            if (
              (document.getElementById("9h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h9 = "Y";
              this.saveVailabilityFormData.h9 = "Y";
            } else {
              this.availabilityObj.h9 = "N";
              this.saveVailabilityFormData.h9 = "N";
            }

            //10h
            if (
              (document.getElementById("10h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h10 = "Y";
              this.saveVailabilityFormData.h10 = "Y";
            } else {
              this.availabilityObj.h10 = "N";
              this.saveVailabilityFormData.h10 = "N";
            }

            //11h
            if (
              (document.getElementById("11h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h11 = "Y";
              this.saveVailabilityFormData.h11 = "Y";
            } else {
              this.availabilityObj.h11 = "N";
              this.saveVailabilityFormData.h11 = "N";
            }

            //12h
            if (
              (document.getElementById("12h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h12 = "Y";
              this.saveVailabilityFormData.h12 = "Y";
            } else {
              this.availabilityObj.h12 = "N";
              this.saveVailabilityFormData.h12 = "N";
            }

            //13h
            if (
              (document.getElementById("13h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h13 = "Y";
              this.saveVailabilityFormData.h13 = "Y";
            } else {
              this.availabilityObj.h13 = "N";
              this.saveVailabilityFormData.h13 = "N";
            }

            //14h
            if (
              (document.getElementById("14h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h14 = "Y";
              this.saveVailabilityFormData.h14 = "Y";
            } else {
              this.availabilityObj.h14 = "N";
              this.saveVailabilityFormData.h14 = "N";
            }

            //15h
            if (
              (document.getElementById("15h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h15 = "Y";
              this.saveVailabilityFormData.h15 = "Y";
            } else {
              this.availabilityObj.h15 = "N";
              this.saveVailabilityFormData.h15 = "N";
            }

            //16h
            if (
              (document.getElementById("16h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h16 = "Y";
              this.saveVailabilityFormData.h16 = "Y";
            } else {
              this.availabilityObj.h16 = "N";
              this.saveVailabilityFormData.h16 = "N";
            }

            //17h
            if (
              (document.getElementById("17h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h17 = "Y";
              this.saveVailabilityFormData.h17 = "Y";
            } else {
              this.availabilityObj.h17 = "N";
              this.saveVailabilityFormData.h17 = "N";
            }

            //18h
            if (
              (document.getElementById("18h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h18 = "Y";
              this.saveVailabilityFormData.h18 = "Y";
            } else {
              this.availabilityObj.h18 = "N";
              this.saveVailabilityFormData.h18 = "N";
            }

            //19h
            if (
              (document.getElementById("19h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h19 = "Y";
              this.saveVailabilityFormData.h19 = "Y";
            } else {
              this.availabilityObj.h19 = "N";
              this.saveVailabilityFormData.h19 = "N";
            }

            //20h
            if (
              (document.getElementById("20h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h20 = "Y";
              this.saveVailabilityFormData.h20 = "Y";
            } else {
              this.availabilityObj.h20 = "N";
              this.saveVailabilityFormData.h20 = "N";
            }

            //21h
            if (
              (document.getElementById("21h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h21 = "Y";
              this.saveVailabilityFormData.h21 = "Y";
            } else {
              this.availabilityObj.h21 = "N";
              this.saveVailabilityFormData.h21 = "N";
            }

            this.availability.push(this.saveVailabilityFormData);
            this.saveVailabilityFormData = {
              h8: "",
              h9: "",
              h10: "",
              h11: "",
              h12: "",
              h13: "",
              h14: "",
              h15: "",
              h16: "",
              h17: "",
              h18: "",
              h19: "",
              h20: "",
              h21: "",
              Coach_Id: coachid.Coach_ID,
              Date: "",
              Start_Date: startD,
              End_Date: endD
            };
            Date = this.addDays(Date);
          }
        } else {
          j = dayofdate;

          var startD = this.startDate_db.setDate(this.startDate_db.getDate());
          var endD = this.endDate_db.setDate(this.endDate_db.getDate());
          for (var i = j; i <= 7; i++) {
            // Date of Each Day
            if (Date !== undefined) {
              this.saveVailabilityFormData.Date = Date;
              this.availabilityObj.Date = Date;
            }

            //8h
            if (
              (document.getElementById("8h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h8 = "Y";
              this.saveVailabilityFormData.h8 = "Y";
            } else {
              this.availabilityObj.h8 = "N";
              this.saveVailabilityFormData.h8 = "N";
            }

            //9h
            if (
              (document.getElementById("9h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h9 = "Y";
              this.saveVailabilityFormData.h9 = "Y";
            } else {
              this.availabilityObj.h9 = "N";
              this.saveVailabilityFormData.h9 = "N";
            }

            //10h
            if (
              (document.getElementById("10h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h10 = "Y";
              this.saveVailabilityFormData.h10 = "Y";
            } else {
              this.availabilityObj.h10 = "N";
              this.saveVailabilityFormData.h10 = "N";
            }

            //11h
            if (
              (document.getElementById("11h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h11 = "Y";
              this.saveVailabilityFormData.h11 = "Y";
            } else {
              this.availabilityObj.h11 = "N";
              this.saveVailabilityFormData.h11 = "N";
            }

            //12h
            if (
              (document.getElementById("12h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h12 = "Y";
              this.saveVailabilityFormData.h12 = "Y";
            } else {
              this.availabilityObj.h12 = "N";
              this.saveVailabilityFormData.h12 = "N";
            }

            //13h
            if (
              (document.getElementById("13h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h13 = "Y";
              this.saveVailabilityFormData.h13 = "Y";
            } else {
              this.availabilityObj.h13 = "N";
              this.saveVailabilityFormData.h13 = "N";
            }

            //14h
            if (
              (document.getElementById("14h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h14 = "Y";
              this.saveVailabilityFormData.h14 = "Y";
            } else {
              this.availabilityObj.h14 = "N";
              this.saveVailabilityFormData.h14 = "N";
            }

            //15h
            if (
              (document.getElementById("15h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h15 = "Y";
              this.saveVailabilityFormData.h15 = "Y";
            } else {
              this.availabilityObj.h15 = "N";
              this.saveVailabilityFormData.h15 = "N";
            }

            //16h
            if (
              (document.getElementById("16h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h16 = "Y";
              this.saveVailabilityFormData.h16 = "Y";
            } else {
              this.availabilityObj.h16 = "N";
              this.saveVailabilityFormData.h16 = "N";
            }

            //17h
            if (
              (document.getElementById("17h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h17 = "Y";
              this.saveVailabilityFormData.h17 = "Y";
            } else {
              this.availabilityObj.h17 = "N";
              this.saveVailabilityFormData.h17 = "N";
            }

            //18h
            if (
              (document.getElementById("18h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h18 = "Y";
              this.saveVailabilityFormData.h18 = "Y";
            } else {
              this.availabilityObj.h18 = "N";
              this.saveVailabilityFormData.h18 = "N";
            }

            //19h
            if (
              (document.getElementById("19h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h19 = "Y";
              this.saveVailabilityFormData.h19 = "Y";
            } else {
              this.availabilityObj.h19 = "N";
              this.saveVailabilityFormData.h19 = "N";
            }

            //20h
            if (
              (document.getElementById("20h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h20 = "Y";
              this.saveVailabilityFormData.h20 = "Y";
            } else {
              this.availabilityObj.h20 = "N";
              this.saveVailabilityFormData.h20 = "N";
            }

            //21h
            if (
              (document.getElementById("21h_" + i) as HTMLInputElement)
                .checked == true
            ) {
              this.availabilityObj.h21 = "Y";
              this.saveVailabilityFormData.h21 = "Y";
            } else {
              this.availabilityObj.h21 = "N";
              this.saveVailabilityFormData.h21 = "N";
            }

            this.availability.push(this.saveVailabilityFormData);
            this.saveVailabilityFormData = {
              h8: "",
              h9: "",
              h10: "",
              h11: "",
              h12: "",
              h13: "",
              h14: "",
              h15: "",
              h16: "",
              h17: "",
              h18: "",
              h19: "",
              h20: "",
              h21: "",
              Coach_Id: coachid.Coach_ID,
              Date: "",
              Start_Date: startD,
              End_Date: endD
            };
            Date = this.addDays(Date);
          }
        }
      }
    }

    var Date = this.startDate_db;

    var req = {
      availability: this.availability
    };
    console.log("availability", this.availability);
    this.appService
      .create("/coach/insertavailabilty", req)
      .subscribe(response => {
        if (response && response["data"]) {
          if (response.isSuccess == true) {
            this.appService
              .getAll("/getcalender/", coachid)
              .subscribe(response => {
                if (response && response["data"]) {
                  this.calender = (response as any).data.calender;
                }
              });
            this.availability = [];
            this._showAlertMessage("alert-success", "Inséré avec succès");
            this.spinner.hide();
          } else if (
            response.isSuccess == false &&
            response.message == "Slot Currently no available"
          ) {
            this.availability = [];
            this._showAlertMessage("alert-danger", "Slot Non disponible");
            this.spinner.hide();
          } else {
            this.availability = [];
            this._showAlertMessage("alert-danger", "Inséré a échoué");
            this.spinner.hide();
          }
        }
        this.availabilityObj.EndDate = undefined;
        this.availabilityObj.StartDate = undefined;
        this.availabilityObj.weekNumber = "default";
      });
  }

  handleDateClick(arg) {
    // handler method
    $(".day-highlight").removeClass("day-highlight");
    $(arg.dayEl).addClass("day-highlight");
    var course = localStorage.getItem("Course");
    var coach = JSON.parse(localStorage.getItem("Coach"));
    var detail = {
      Start_Date: arg.dateStr,
      Coach_ID: coach.id,
      Course: course
    };
  }

  addDays(date) {
    date = moment(date, "YYYY-MM-DD").toDate();
    var result = new Date(date);
    result.setDate(result.getDate() + 1);
    var data = moment(result).format("YYYY-MM-DD");
    return data;
  }
}
class weekObject {
  Semaine: Number;
  Dates: string;
}
