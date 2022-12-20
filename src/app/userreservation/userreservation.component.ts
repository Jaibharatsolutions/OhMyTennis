import { Component, OnInit } from "@angular/core";
import { UserComponent } from "../model/user/user.component";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Location } from "@angular/common";
import * as $ from "jquery";
import * as moment from "moment";

@Component({
  selector: "app-userreservation",
  templateUrl: "./userreservation.component.html",
  styleUrls: ["./userreservation.component.scss"]
})
export class UserreservationComponent extends UserComponent implements OnInit {
  public user_name: string = "";
  public slotRowDatas: any = [];
  public remaining_status: string = "";
  public slot_view: any = [];

  public frommindate = new Date(Date.now());
  public rowDataCollection: any = [];
  public filterDataCollection: any = [];
  public dialogStatus: boolean = false;
  public booking_Id: string = "";
  public booking_time: string = "";
  public booking_date: string = "";
  public data: any = [];
  public Fdata: any = [];
  public filter: string = "";
  public course: string = "";
  public status: string = "";
  public book_status: string = "";
  public amount: any;
  public discount: any = "";
  public booked_users: any = [];
  public Remarks: any = "";
  public email: any = "";
  public course_demand = {
    Price_2pl_1hr: "",
    Price_3pl_1hr: "",
    Price_4pl_1hr: "",
    Price_5pl_1hr: "",
    Price_6pl_1hr: ""
  };
  public reservation = {
    Address: "",
    Coach_Id: "",
    Course: "",
    Date: "",
    Email: "",
    Level: "",
    Mobile: "",
    Name_of_company: "",
    Number_of_person: "",
    Postalcode: ""
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
    var titile = document.getElementsByClassName("brand");
    if (titile) titile[0].innerHTML = "MES RESERVATIONS";
    this.getReservationData();
  }

  formatDate(input) {
    var datePart = input.split("-");
    var year = datePart[0], // get only two digits
      month = datePart[1],
      day = datePart[2];

    return day + "-" + month + "-" + year;
  }

  closemodal() {
    this.reservation = {
      Address: "",
      Coach_Id: "",
      Course: "",
      Date: "",
      Email: "",
      Level: "",
      Mobile: "",
      Name_of_company: "",
      Number_of_person: "",
      Postalcode: ""
    };
  }

  filtersearch() {
    if (!this.filter) this.filter = "";
    this.data = this.Fdata.filter(
      x =>
        (x.firstName.toLowerCase().includes(this.filter.toLowerCase()) ||
          x.lastName.toLowerCase().includes(this.filter.toLowerCase()) ||
          x.bookingDate.includes(this.filter.toLowerCase()) ||
          this.filter == "") &&
        (x.bookingCourse == this.course || this.course == "") &&
        (x.status == this.status || this.status == "")
    );

    this.rowDataCollection = [];
    for (let row = 0; row < this.data.length; row++) {
      var rowCollection = [];
      var date = this.data[row].bookingDate.split("T");
      rowCollection.push(row + 1);
      rowCollection.push(this.data[row].user_Name);
      rowCollection.push(this.data[row].bookingCourse);
      rowCollection.push(this.formatDate(date[0]));
      rowCollection.push(this.data[row].BookingTime);
      rowCollection.push(this.data[row].bookingDate);
      rowCollection.push(this.data[row].status);
      rowCollection.push(this.data[row].booking_Id);
      rowCollection.push(this.data[row].amount);
      this.discount = this.data[row].amount;
      rowCollection.push(this.data[row].firstName);
      rowCollection.push(this.data[row].lastName);
      rowCollection.push(this.data[row].CourseName);
      rowCollection.push(this.data[row].Remarks);
      rowCollection.push(this.data[row].email);

      this.rowDataCollection.push(rowCollection);
      date = [];
    }
  }

  getReservationData() {
    var res: any;
    var users = JSON.parse(localStorage.getItem("onmytennis"));
    var user = JSON.parse(users);
    var userid = {
      user_Id: user.id
    };
    this.spinner.show();
    this.appService
      .getAll("/user/getuserreservationdetails", userid)
      .subscribe(response => {
        if (response && response["isSuccess"] == true) {
          this.data = response["data"].reserve;
          this.Fdata = response["data"].reserve;
          this.rowDataCollection = [];
          //console.log("[reservation.component.ts - line - 140]", this.data);
          for (let row = 0; row < this.data.length; row++) {
            var rowCollection = [];
            var date = this.data[row].bookingDate.split("T");
            rowCollection.push(row + 1);
            rowCollection.push(this.data[row].user_Name);
            rowCollection.push(this.data[row].bookingCourse);
            rowCollection.push(this.formatDate(date[0]));
            rowCollection.push(this.data[row].BookingTime);
            rowCollection.push(this.data[row].bookingDate);
            rowCollection.push(this.data[row].status);
            rowCollection.push(this.data[row].booking_Id);
            rowCollection.push(this.data[row].amount);
            this.discount = this.data[row].amount;
            rowCollection.push(this.data[row].firstName);
            rowCollection.push(this.data[row].lastName);
            rowCollection.push(this.data[row].CourseName);
            rowCollection.push(this.data[row].Remarks);
            rowCollection.push(this.data[row].email);
            rowCollection.push(this.data[row].slot);
            rowCollection.push(this.data[row].remaingSlotStatus);
            this.rowDataCollection.push(rowCollection);
            date = [];
          }
          //console.log('ta ' + this.rowDataCollection);
          this.spinner.hide();

        }
        else
        {
          this.spinner.hide();
        }
      });
  }

  cancelDialog(rowData) {
    this.course = rowData[2];
    this.amount = rowData[8];
    this.booking_date = rowData[5];
    this.book_status = rowData[6];
    this.dialogStatus = true;
    this.booking_Id = rowData[7];
    this.booking_time = rowData[4];
    this.Remarks = rowData[12];
    this.email = rowData[13];
    this.slot_view = rowData[14];
    this.user_name = rowData[9] + " " + rowData[10];
    this.remaining_status = rowData[15] == "Yes" ? "10 Heures" : "1 Heure";

    // (document.getElementById("userName") as HTMLInputElement).value =
    //   rowData[9] + " " + rowData[10];
    // (document.getElementById("userCourseType") as HTMLInputElement).value =
    //   rowData[11];
    // (document.getElementById("userDate") as HTMLInputElement).value =
    //   rowData[3];
    if (
      (this.course == "CoursIndividuel" ||
        this.course == "CoursCollectifOndemand" ||
        this.course == "CoursCollectifClub") &&
      rowData[14].length > 0
    ) {
      // (document.getElementById("userhours") as HTMLInputElement).value =
      //   rowData[4];
      this.slotRowDatas = rowData[14];
    }
    if (
      this.course == "TeamBuilding" ||
      this.course == "Tournoi" ||
      this.course == "Animation"
    ) {
      var get = {
        course: rowData[2],
        booking_id: rowData[7]
      };
      this.appService
        .getAll("/coachdetail/getbookcourse", get)
        .subscribe(val => {
          if ((val as any).isSuccess == true) {
            this.reservation = (val as any).data.booking[0];
            this.reservation.Date = moment(this.reservation.Date).format(
              "DD-MM-YYYY"
            );
          }
        });
    }
  }

  modalclose() {
    this.reservation = {
      Address: "",
      Coach_Id: "",
      Course: "",
      Date: "",
      Email: "",
      Level: "",
      Mobile: "",
      Name_of_company: "",
      Number_of_person: "",
      Postalcode: ""
    };
    this.booked_users = [];
  }

  cancelreq() {
    var res: any;
    var coach = JSON.parse(localStorage.getItem("Coach"));
    //console.log('coach '+ coach);
    var statusData = {
      Coach_ID: coach.Coach_ID,
      status: "UC",
      booking_id: this.booking_Id,
      booking_time: this.booking_time,
      discount: this.discount,
      amount: this.amount,
      booking_date: this.booking_date,
      course: this.course,
      email: this.email
    };
    this.spinner.show();
    this.appService
      .create("/user/cancelreservations", statusData)
      .subscribe(response => {
        if (response && response["data"]) {
          res = response;
          this.spinner.hide();
          this._showAlertMessage(
            "alert-success",
            "Réservation annulée avec succès"
          );
          this.ngOnInit();
        } else {
          this._showAlertMessage("alert-danger", "Réservation annulée échouée");
        }
      });
  }
}
