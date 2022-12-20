import { Component, OnInit } from "@angular/core";
import { AppService } from "../../shared/app.service";
import { from } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from "@angular/router";
import { CoachComponent } from "src/app/model/coach/coach.component";
import { Location } from "@angular/common";
// import { $ } from 'protractor';
import * as $ from "jquery";
import { getSupportedInputTypes } from "@angular/cdk/platform";
import * as moment from "moment";

@Component({
  selector: "app-reservation",
  templateUrl: "./reservation.component.html",
  styleUrls: ["./reservation.component.scss"]
})
export class ReservationComponent extends CoachComponent implements OnInit {
  public user_name: string = "";
  public slotRowDatas: any = [];
  public remaining_status: string = "";

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
  public filtercourse: string = "";
  public filterstatus: string = "";
  public course: string = "";
  public status: string = "";
  public book_status: string = "";
  public amount: any;
  public evt_amount = 0;
  public discount: any = "";
  public booked_users: any = [];
  public Remarks: any = "";
  public user_Id: any = "";
  public slot_view: any = [];
  public company_name:string;
  public email:string;
  public mobile:string;
  public date:string;
  public address:string;
  public postalcode:string;
  public number_of_person:string;
  public level:string;
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

  filtersearch() {
    if (!this.filter) this.filter = "";
    this.data = this.Fdata.filter(
      x =>
        (x.firstName.toLowerCase().includes(this.filter.toLowerCase()) ||
          x.lastName.toLowerCase().includes(this.filter.toLowerCase()) ||
          x.bookingDate.includes(this.filter.toLowerCase()) ||
          this.filter == "") &&
        (x.bookingCourse == this.filtercourse || this.filtercourse == "") &&
        (x.status == this.filterstatus || this.filterstatus == "")
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
      rowCollection.push(this.data[row].user_Id);
      this.rowDataCollection.push(rowCollection);
      date = [];
    }
  }

  getReservationData() {
    this.rowDataCollection = [];
    this.filterstatus = "";
    this.filtercourse = "";
    this.filter = "";
    var res: any;
    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    var coach1 = JSON.parse(coach);
    var coachid = {
      Coach_ID: coach1.id
    };
    this.spinner.show();
    this.appService
      .getAll("/coach/getreservationdetails", coachid)
      .subscribe(response => {
        //console.log('ta '+ JSON.stringify(response));
        //return false;
        if (response && response["isSuccess"] == true) {
          this.data = response["data"].reserve;
          this.Fdata = response["data"].reserve;
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
            rowCollection.push(this.data[row].firstName);
            rowCollection.push(this.data[row].lastName);
            rowCollection.push(this.data[row].CourseName);
            rowCollection.push(this.data[row].Remarks);
            rowCollection.push(this.data[row].user_Id);
            rowCollection.push(this.data[row].slot);
            rowCollection.push(this.data[row].remaingSlotStatus);

            this.rowDataCollection.push(rowCollection);
            date = [];
          }
          // console.log(
          //   "t data ",
          //   this.rowDataCollection
          // );
          this.spinner.hide();
          // this.filtersearch();
          // $('#approveBtn').show();
        }
        else
        {
          this.spinner.hide();
        }
      });
  }

  approvedData() {
    var res: any;
    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    var coach1 = JSON.parse(coach);
    if (this.discount != "0") {
      this.amount = this.discount;
    }

    if (this.amount == 0) {
      this._showAlertMessage(
        "alert-danger",
        "le montant doit être supérieur à zéro"
      );
      return;
    }

    // if (this.course == 'Stage' || this.course == 'Tournoi' || this.course == 'Animation' || this.course == 'TeamBuilding') {
    //   this.amount = this.evt_amount;
    // }

    var statusData = {
      Coach_ID: coach1.id,
      status: "A",
      booking_id: this.booking_Id,
      discount: this.discount,
      amount: this.amount,
      booking_date: this.booking_date,
      course: this.course,
      booking_time: this.booking_time,
      user_Id: this.user_Id
    };
    //console.log("statusData",statusData);
    this.spinner.show();
    this.appService
      .create("/coach/setStatus", statusData)
      .subscribe(response => {
        if (response && response["data"]) {
          res = response;
          this.spinner.hide();
          if (response.isSuccess == true) {
            this._showAlertMessage(
              "alert-success",
              "Réservation acceptée avec succès"
            );
            $("#approveBtn").hide();
            $("#cancelBtn").hide();
            this.getReservationData();
          } else {
            this._showAlertMessage(
              "alert-danger",
              "Échec de l'acceptation de la réservation"
            );
          }
        }
      });
  }
  approveDialog(event: Event, rowData, hour, dateselected) {
    event.preventDefault();

    $("#approveBtn").show();
    this.discount = 0;
    $("#approveBtn").prop("disabled", false);
    this.course = rowData[2];
    this.amount = rowData[8];
    this.booking_date = rowData[3];
    this.book_status = rowData[6];
    this.dialogStatus = true;
    this.booking_Id = rowData[7];
    this.booking_time = rowData[4];
    this.Remarks = rowData[12];
    this.user_Id = rowData[13];
    this.slot_view = rowData[14];
    this.discount = this.amount;
    this.user_name = rowData[10]+ "" + rowData[9];
    this.remaining_status = rowData[15] == "Yes" ? "10 Heures" : "1 Heure";
    // (document.getElementById("userName") as HTMLInputElement).value =
    //   rowData[9] + " " + rowData[10];
    // (document.getElementById("userCourseType") as HTMLInputElement).value =
    //   rowData[11];
    // (document.getElementById("userDate") as HTMLInputElement).value =
    //   rowData[3];

    var bookingId = {
      booking_Id: this.booking_Id,

    };

    this.appService.getAll("/coach/getuserreservationDetails",bookingId).subscribe(response => {
      if ((response as any).data.reserve.length > 0) {
        this.company_name = (response as any).data.reserve[0].Name_of_company;
        this.email = (response as any).data.reserve[0].Email;
        this.mobile = (response as any).data.reserve[0].Mobile;
        this.date = (response as any).data.reserve[0].Date;
        this.address = (response as any).data.reserve[0].Address;
        this.postalcode = (response as any).data.reserve[0].Postalcode;
        this.number_of_person = (response as any).data.reserve[0].Number_of_person;
        this.level = (response as any).data.reserve[0].Level;
      }


    });

    if (rowData[14].length > 0) {
      // (document.getElementById(
      //   "divUserHours"
      // ) as HTMLInputElement).style.visibility = "";
      this.slotRowDatas = rowData[3];
      console.log("[reservation.component.ts - line 262]", this.slotRowDatas);
      //var slot_row_datas = [];
      // var year;
      // var month;
      // var day;
      //for (let i = 0; i < slotRowDatas.length; i++) {
      //const element = new Date(slotRowDatas[i].booking_date, 'YYYY-m-d');
      // var date = new Date(slotRowDatas[i].booking_date);

      // year = date.getFullYear();
      // month = date.getMonth() + 1;
      // day = date.getDate();

      // if (day < 10) {
      //   day = "0" + day;
      // }
      // if (month < 10) {
      //   month = "0" + month;
      // }

      // var formattedDate = year + "-" + month + "-" + day;
      // slot_row_datas.push(formattedDate);
      //   slot_row_datas.push(slotRowDatas[i].booking_time);
      // }
      // console.log(slot_row_datas);
      // (document.getElementById(
      //   "userHours"
      // ) as HTMLInputElement).value = slot_row_datas.toString();
    } else {
      // (document.getElementById(
      //   "divUserHours"
      // ) as HTMLInputElement).style.visibility = "hidden";
    }
    // if (rowData[4]) {
    //   (document.getElementById(
    //     "divUserHours"
    //   ) as HTMLInputElement).style.visibility = "";
    //   (document.getElementById("userHours") as HTMLInputElement).value =
    //     rowData[4];
    // } else {
    //   (document.getElementById(
    //     "divUserHours"
    //   ) as HTMLInputElement).style.visibility = "hidden";
    // }
    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    var coach1 = JSON.parse(coach);
    if (this.course == "CoursCollectifOndemand") {
      this.spinner.show();
      var slot = dateselected.split("T");
      var data = {
        Coach_ID: coach1.id,
        slot: hour,
        date: rowData[5]
      };
      this.appService
        .getAll("/coach/getdemandavailability", data)
        .subscribe(val => {
          var response = (val as any).data.availabilty;
          if ((val as any).isSuccess == true) {
            if (response.length > 0) {
              this.booked_users = response;
            } else {
              this.booked_users = 1;
            }
            if (this.booked_users.length > 1) {
              var price = {
                CoachId: coach1.id,
                TotalPeople: this.booked_users.length,
                P_Date: rowData[5]
              };
              this.appService
                .getAll("/coach/getDemandprice", price)
                .subscribe(response => {
                  if ((response as any).data.price.length > 0) {
                    if (response && response["data"]) {
                      var dat = (response as any).data.price[0];
                      this.amount = dat[0].Price;
                    }
                  }
                  this.spinner.hide();
                });
            } else {
              if (rowData[6] !== "B") {
                this._showAlertMessage(
                  "alert-danger",
                  "Au moins 2 utilisateurs doivent être réservés dans la fente"
                );
                $("#approveBtn").prop("disabled", true);
              }
              this.spinner.hide();
            }
          } else {
            this.spinner.hide();
          }
        });
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
      //console.log('get '+ get);
      this.appService
        .getAll("/coachdetail/getbookcourse", get)
        .subscribe(val => {
          if ((val as any).isSuccess == true) {
            this.reservation = (val as any).data.booking[0];
            console.log('pp'+ this.reservation);
            this.reservation.Date = moment(this.reservation.Date).format(
              "DD-MM-YYYY"
            );
          }
        });
    }
  }

  modalclose() {
    this.booked_users = [];
  }

  reschedule() {
    var res: any;
    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    var coach1 = JSON.parse(coach);

    var statusData = {
      Coach_ID: coach1.id,
      status: "S",
      booking_id: this.booking_Id,
      discount: this.discount,
      amount: this.amount,
      booking_date: this.booking_date,
      booking_time: this.booking_time,
      course: this.course,
      user_Id: this.user_Id
    };
    this.spinner.show();
    this.appService
      .create("/coach/setStatus", statusData)
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
          this._showAlertMessage(
            "alert-danger",
            " Réservation annulée échouée"
          );
        }
      });
  }

  cancelreq() {
    var res: any;
    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    var coach1 = JSON.parse(coach);

    var statusData = {
      Coach_ID: coach1.id,
      status: "C",
      booking_id: this.booking_Id,
      discount: this.discount,
      amount: this.amount,
      booking_date: this.booking_date,
      course: this.course,
      user_Id: this.user_Id
    };
    this.spinner.show();
    this.appService
      .create("/coach/setStatus", statusData)
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
