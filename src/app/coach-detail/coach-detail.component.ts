import { Component, OnInit, ViewChild } from "@angular/core";
import { AppService } from "../shared/app.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Location } from "@angular/common";
import { FullCalendarComponent } from "@fullcalendar/angular";
import dayGridView from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import * as moment from "moment";
import * as $ from "jquery";
import * as L from "leaflet";
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: "app-coach-detail",
  templateUrl: "./coach-detail.component.html",
  styleUrls: ["./coach-detail.component.scss"]
})
export class CoachDetailComponent implements OnInit {
  public reserveData: any = [];
  public selectedCity: any = null;
  map: any;
  mapvalues: any;
  lat: any;
  lang: any;
  curentlat: any;
  curentlang: any;
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
    firstWeekdaySunday: false,
    selectable: true
  };

  public str: any = null;
  public timeslot = {
    description: "",
    session: "",
    availability: "",
    checked: false
  };

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
  public Amt = 0;
  public person = "";
  public book_person = 0;
  public booked_user = [];
  public allocate_person = "";
  public availablity: any;
  public is10Hr = false;
  public step_2 = false;
  public step_3 = false;
  public IsChecked = true;
  public showclub = false;
  public Timeslotdata = {
    Start_Date: "",
    Coach_ID: "",
    Course: ""
  };

  public isClub;
  public isOnDemand;
  public isIndiv;
  private routedComponent: CoachDetailComponent;
  particulersform:FormGroup;
  cutomerReviewCollection:any = [];
  showMsg:boolean = false;
  showsuccessMsg:boolean = false;
  count_id:any;

  public coach_detail_data = {};
  searchQuery = "/coachdetail";
  previousSearchQuery = "";
  constructor(
    public sanitizer: DomSanitizer,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public appService: AppService,
    public Location: Location,
    public spinner: NgxSpinnerService,
    private formBuilder:FormBuilder
  ) {
    this.slidecnt = 4;
    // override the route reuse strategy
    // this.router.routeReuseStrategy.shouldReuseRoute = function() {
    //   return false;
    // };
  }

  public setRoutedComponent(componentRef: CoachDetailComponent): void {
    this.routedComponent = componentRef;
  }
  ngAfterViewInit(): void {
    var datas = this.UserAviablility;
    var today = document.getElementsByClassName("fc-today-button");
    if (today) today[0].innerHTML = "Aujourd'hui";
  }

  @ViewChild("calendar", { static: false })
  calendarComponent: FullCalendarComponent;

  ngOnInit() {
    this.particulersform = this.formBuilder.group({
      comments: [null, [Validators.required]]
      
    });
    
    this.getcurrentcordinates();

    this.spinner.show();
    this.price = 0;
    if (window.innerWidth > 1024) {
      this.slidecnt = 4;
    } else if (window.innerWidth > 768) {
      this.slidecnt = 3;
    } else {
      this.slidecnt = 2;
    }
    this.coachSlider();
    var titile = document.getElementsByClassName("brand");
    if (titile.length > 0) titile[0].innerHTML = "MON CALENDRIER";

    // Getting Max_Price of selected course for Summary
    var coach = JSON.parse(localStorage.getItem("Coach"));
    //console.log(coach);
    this.coach_detail_data = coach;
    var Coach_ID = {
      coachId: coach.Id,
      Coach_ID: coach.Id
    };
    var course = localStorage.getItem("Course");
    this.getReviewDetails(course);
    //console.log(Coach_ID)
    this.appService
      .getAll("/coach/CoachCalendarAvaiabilityForUser", Coach_ID)
      .subscribe(response => {
        if ((response as any).data.coach_list.length > 0) {
          if (response && response["data"]) {
            var dat = (response as any).data.coach_list;

            for (let i = 0; i < dat.length; i++) {
              $('td[data-date="' + dat[i].Date.split("T")[0] + '"]').css(
                "background-color",
                "#90ee90"
              );
              $('td[data-date="' + dat[i].Date.split("T")[0] + '"]').css(
                "border-color",
                "#fff"
              );
            }
            $(".fc-button").on("click", function(event) {
              for (let i = 0; i < dat.length; i++) {
                $('td[data-date="' + dat[i].Date.split("T")[0] + '"]').css(
                  "background-color",
                  "#90ee90"
                );
                $('td[data-date="' + dat[i].Date.split("T")[0] + '"]').css(
                  "border-color",
                  "#fff"
                );
              }
            });
          }
        }
        // this.spinner.hide();
      });

    this.appService
      .getAll("/course/courseIsIndivIsOnDemandIsClub", Coach_ID)
      .subscribe(response => {
        //console.log("coach-detail.component.ts - line 239", response);
        const isIndiIsOnDemandIsClub = (response as any).data;
        this.isIndiv = isIndiIsOnDemandIsClub.indivCount;
        this.isOnDemand = isIndiIsOnDemandIsClub.onDemandCount;
        this.isClub = isIndiIsOnDemandIsClub.clubCount;
      });

    if (course == "CoursIndividuel") {
      this.appService
        .getAll("/course/getindividualcourse", Coach_ID)
        .subscribe(response => {
          if ((response as any).data.course.length > 0) {
            if (response && response["data"]) {
              var dat = (response as any).data.course[0];

              //console.log("[coach-detail.component.ts - line - 235]", dat);
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
          else
          {
            Swal.fire('Oops...', 'Please Contact to Administrator!', 'error');
            //return false;
          }
          this.couchdetail();
          // this.spinner.hide();
        });
    } else if (course == "CoursCollectifOndemand") {
      this.appService
        .getAll("/course/getcousecollectivedemanad", Coach_ID)
        .subscribe(response => {
          if ((response as any).data.course.length > 0) {
            if (response && response["data"]) {
              var dat = (response as any).data.course[0];
              this.Description = dat.Description;
              this.course_demand.person = dat.Max_People;
              this.course_demand.Price_2pl_1hr = dat.Price_2pl_1hr;
              this.course_demand.Price_3pl_1hr = dat.Price_3pl_1hr;
              this.course_demand.Price_4pl_1hr = dat.Price_4pl_1hr;
              this.course_demand.Price_5pl_1hr = dat.Price_5pl_1hr;
              this.course_demand.Price_6pl_1hr = dat.Price_6pl_1hr;
              this.pincode = dat.Postalcode;
              this.location = dat.Location;
              this.mapvalues = eval("[" + dat.coordonnees_gps + "]");
              this.lat = this.mapvalues[0].toFixed(3);
              this.lang = this.mapvalues[1].toFixed(3);
              //console.log('this lat  ' + this.lat + 'this lang' + this.lang);
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
          else
          {
            Swal.fire('Oops...', 'Please Contact to Administrator!', 'error');
            //return false;
          }
          this.couchdetail();
        });
    } else if (course == "CoursCollectifClub") {
      this.appService
        .getAll("/course/getcousecollectiveclub", Coach_ID)
        .subscribe(response => {
          if ((response as any).data.course.length > 0) {
            if (response && response["data"]) {
              this.availablity = (response as any).data.availablity;
              var dat = (response as any).data.course[0];

              this.price = dat.Price;
              this.Video = dat.Video;
              this.pincode = dat.Postalcode;
              this.location = dat.Place;
              this.Description = dat.Description;
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
                    //console.log(this.selectedCity);
                  }
                });
            }
          }
          else
          {
            Swal.fire('Oops...', 'Please Contact to Administrator!', 'error');
            //return false;
          }
        });
      this.couchdetail();
    }
    
  }


  getReviewDetails(Course) {
    
    var coursedetails = {
      course: Course
    };

    this.appService.getAll("/user/getallreviews",coursedetails).subscribe(response => {

      if(response && response["data"])
      {
        for(var i=0; i < response["data"].length; i++)
        {
         
          this.cutomerReviewCollection.push({
            comments:response["data"][i].comments,
            first_name:response["data"][i].firstName,
            last_name:response["data"][i].lastName,
            user_image:response["data"][i].User_Image,
            today_day: moment(new Date()).format("DD"),
            review_day: moment(response["data"][i].created_at).format("DD")
            
          });
         
        }
        this.count_id = response["data"].length;
      }
 
    });

}

onSubmitComment() {
    
  var Comments = this.particulersform.value.comments;
  var course = localStorage.getItem("Course");
  var event = JSON.parse(localStorage.getItem("Event"));
  var users = JSON.parse(localStorage.getItem("onmytennis"));
  var user = JSON.parse(users);
  var insertComments = {
    Coach_Id: event.Coach_Id,
    User_Id: user.id,
    course: course,
    comments:Comments
    
  };
  //console.log(insertComments);
    this.spinner.show();
    this.appService
      .create("/user/createreviews", insertComments)
      .subscribe(
        response => {
          if (response && response.isSuccess == true) {
            this.showsuccessMsg = true;
               
              this.showsuccessMsg = false;
              document
          .getElementById("btnreviews")
          .setAttribute("disabled", "true");
          location.reload(true);
         
            // this._showAlertMessage(
            //   "alert-success",
            //   "Comments inscrit avec succès"
            // );
            //this.showsuccessMsg = false;
          } 
          else {
            this._showAlertMessage(
              "alert-danger",
              "Échec de l'inscription des entraîneurs"
            );
          }
          this.spinner.hide();
          
        },
        error => {}
      );
  
}

  gotoCouch(ser, res) {
    //console.log(res);
    this.previousSearchQuery = "/coachdetail";

    // setTimeout(() => {
    //   if (localStorage.getItem("onmytennis") !== null) {
    var data = JSON.stringify(res);
    localStorage.setItem("Coach", data);
    localStorage.setItem("Course", ser);
    this.doRefresh();
    return false;
    //this.router.navigate(["/coachdetail"]);
    // } else {
    //   this.router.navigate(["/login"]);
    // }
    //}, 1000);
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

  private refresh(): boolean {
    return this.searchQuery && this.searchQuery === this.previousSearchQuery;
  }

  public doRefresh(): void {
    this.routedComponent.refresh();
  }

  async getcurrentcordinates() {
    const resp = await fetch("https://ipapi.co/json/");
    const data = await resp.json();
    this.curentlat = data.latitude.toFixed(3);
    this.curentlang = data.longitude.toFixed(3);
    //console.log(this.curentlat, " ", this.curentlang);
  }

  // async getcurrentcordinates() {
  //   try {
  //     const response = await axios.get('/user?ID=12345');
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  handleDateClick(arg) {
    // handler method
    //this.spinner.show();
    $(".day-highlight").removeClass("day-highlight");
    $(arg.dayEl).addClass("day-highlight");
    var course = localStorage.getItem("Course");
    var coach = JSON.parse(localStorage.getItem("Coach"));
    var detail = {
      Start_Date: arg.dateStr,
      Coach_ID: coach.Id,
      Course: course
    };
    this.bookingDate = arg.dateStr;
    this.Timeslotdata = {
      Start_Date: arg.dateStr,
      Coach_ID: coach.Id,
      Course: course
    };

    //console.log("[coach-detail.component.ts - line - 387]", this.bookingDate);
    //console.log("[coach-detail.component.ts - line - 388]", this.Timeslotdata);
    //console.log("[coach-detail.component.ts - line - 389]", this.bookArray);

    var dataVal = [];
    for (let i = 0; i < this.bookArray.length; i++) {
      dataVal.push({
        date: this.bookArray[i].P_Date,
        time: this.bookArray[i].P_Hour
      });
    }

    //console.log("[coach-detail.component.ts - line - 399]", dataVal);

    if (course != "CoursCollectifClub") {
      this.appService.getAll("/coach/getTimeslot", detail).subscribe(data => {
        
        if (this.bookArray.length > 0) {
          var flag = false;
          var timeSlotDatas = [];
          var timeslotLength = (data as any).data.availabilty;
          for (let j = 0; j < timeslotLength.length; j++) {
            for (let k = 0; k < dataVal.length; k++) {
              if (
                dataVal[k].date == this.bookingDate &&
                dataVal[k].time == timeslotLength[j].description
              ) {
                flag = true;
              }
            }
            if (flag) {
              timeSlotDatas.push({
                SlotId: timeslotLength[j].SlotId,
                description: timeslotLength[j].description,
                Availability: timeslotLength[j].Availability,
                checked: true
              });
              //console.log("[coach-detail.component.ts - line - 423] - same");
            } else {
              timeSlotDatas.push({
                SlotId: timeslotLength[j].SlotId,
                description: timeslotLength[j].description,
                Availability: timeslotLength[j].Availability,
                checked: false
              });
              // console.log(
              //   "[coach-detail.component.ts - line - 432] - not same"
              // );
            }
            flag = false;
          }
          // var slotData = [...timeSlotDatas]
          // this.timeslot = slotData;
          this.timeslot = timeSlotDatas as any;
          // console.log(
          //   "[coach-detail.component.ts - line - 441] - not same",
          //   timeSlotDatas
          // );
        } else {
          this.timeslot = (data as any).data.availabilty;
        }
        this.spinner.hide();
      });
      // console.log(
      //   "[coach-detail.component.ts - line 450]",
      //   this.bookArray.length,
      //   this.is10Hr
      // );
      if (this.bookArray.length == 10 && this.is10Hr == true) {
        //$("#hrtenmore").show();
        let formInputItem = document
          .querySelectorAll(".timeslotselect")[0]
          .querySelectorAll("input");

        //console.log("[coach-detail.component.ts - line 461]", formInputItem);

        formInputItem.forEach(function(inputElement) {
          let mode = inputElement as HTMLInputElement;
          if (mode.type == "checkbox") {
            if (mode.checked == false) {
              mode.disabled = true;
            }
          }
        });
      }
    } else {
      this.showclub = true;
      this.spinner.hide();
    }
  }

  handleClick(event: Event) {
    this.router.navigate(["/ohmycoach"]);
  }

  reserve() {
    this.price = 0;
    if (this.bookArray.length >= 10 && this.is10Hr == true) {
      $("#available").show();
      this.price = this.Indiv_10hr;
      this.reserveData = this.bookArray;
    } else if (this.bookArray.length < 10 && this.is10Hr == true) {
      $("#fentes").show();
    } else {
      $("#available").show();
      this.price = this.Indiv_1hr * this.bookArray.length;
      this.reserveData = this.bookArray;
    }

    //console.log("[coach-detail.component.ts - line 473]", this.bookArray);
    this.booking.amount = this.price;
    // $("#available").show();
    // if (this.is10Hr == true) {
    //   this.price = this.Indiv_10hr;
    // } else {
    //   this.price = this.Indiv_1hr * this.bookArray.length;
    // }
    // this.booking.amount = this.price;
    // $('#amount').html('Totale: €' + ' ' + this.price);
  }

  addTimeslot(rowData, id) {
    //this.slotRowData = rowData;

    var course = localStorage.getItem("Course");

    //Single Select
    if (document.getElementById("reserve") != null)
      document.getElementById("reserve").removeAttribute("disabled");
    if (course == "CoursCollectifOndemand") {
      let formInputItem = document
        .querySelectorAll(".timeslotselect")[0]
        .querySelectorAll("input");
      formInputItem.forEach(function(inputElement) {
        // this.IsChecked = true;
        let mode = inputElement as HTMLInputElement;
        if (mode.type == "checkbox") {
          if (mode.checked == true && mode.id != "check_" + id) {
            mode.checked = false;
          } else if (mode.checked == false && mode.id == "check_" + id) {
            // this.IsChecked = false;
            document.getElementById("reserve").setAttribute("disabled", "true");
          }
        }
      });
    }
    var coachid = JSON.parse(localStorage.getItem("Coach"));
    var user = JSON.parse(localStorage.getItem("onmytennis"));
    var user1 = JSON.parse(user);

    if (course == "CoursIndividuel") {
      let formInputItem = document.getElementById(
        "check_" + id
      ) as HTMLInputElement;
      this.IsChecked = true;
      if (formInputItem.checked == true && formInputItem.id != "check_" + id) {
        formInputItem.checked = false;
        document.getElementById("reserve").setAttribute("disabled", "false");
      } else if (
        formInputItem.checked == false &&
        formInputItem.id == "check_" + id
      ) {
        this.IsChecked = false;
      }

      if (
        (this.bookArray.length == 1 && this.IsChecked == true) ||
        (this.bookArray.length == 2 && this.IsChecked == false)
      ) {
        $("#10hrposter").show();
      }
      if (this.bookArray.length == 9 && this.is10Hr == true) {
        //$("#hrtenmore").show();
        let formInputItem = document
          .querySelectorAll(".timeslotselect")[0]
          .querySelectorAll("input");

        formInputItem.forEach(function(inputElement) {
          let mode = inputElement as HTMLInputElement;
          if (mode.type == "checkbox") {
            if (mode.checked == false) {
              mode.disabled = true;
            }
          }
        });
      } else {
        let formInputItem = document
          .querySelectorAll(".timeslotselect")[0]
          .querySelectorAll("input");
        formInputItem.forEach(function(inputElement) {
          let mode = inputElement as HTMLInputElement;
          if (mode.type == "checkbox") {
            if (mode.checked == false) {
              mode.disabled = false;
            }
          }
        });
      }
      var userId = user1.id;
      if (this.is10Hr == false) {
        var index = this.session.indexOf(
          rowData.description + "," + this.bookingDate
        );
        if (index > -1) {
          this.session.splice(index, 1);
          this.Amt = this.Amt - parseInt(this.price, 10);
        } else {
          this.session.push(rowData.description + "," + this.bookingDate);
          this.Amt = this.Amt + parseInt(this.price, 10);
        }
        //console.log("[coach-detail.component.ts - line 572]", this.session);
      } else {
        var index = this.session.indexOf(
          rowData.description + "," + this.bookingDate
        );
        if (index > -1) {
          this.session.splice(index, 1);
          this.Amt = this.price;
        } else {
          this.session.push(rowData.description + "," + this.bookingDate);
          this.Amt = this.price;
        }
      }
      this.booking.amount = this.Amt.toString();
      this.booking.session = this.session;
      this.booking.Coach_ID = coachid.Id;
      this.booking.bookingCourse = localStorage.getItem("Course");
      this.booking.user_Id = userId;
      this.temps = "";
      for (var i = 0; i < this.session.length; i++) {
        if (this.temps != "")
          this.temps = this.temps + "," + this.session[i].split(",")[0];
        else this.temps = this.session[i].split(",")[0];
      }

      this.moment_date = moment(this.bookingDate).format("DD-MM-YYYY");
      this.bookArray = [];
      for (var i = 0; i < this.session.length; i++) {
        var ses = this.session[i].split(",");
        this.book_coach.P_UserId = this.booking.user_Id;
        this.book_coach.P_CoachId = this.booking.Coach_ID;
        this.book_coach.P_Amount = this.booking.amount;
        this.book_coach.P_CourseId = this.booking.bookingCourse;
        this.booking.user_Name = user1.firstName + " " + user1.lastName;
        this.book_coach.P_Hour = ses[0];
        this.book_coach.P_Date = ses[1];
        this.bookArray.push(this.book_coach);
        this.book_coach = {
          P_CoachId: "",
          P_CourseId: "",
          P_Date: "",
          P_Hour: "",
          P_UserId: "",
          P_Amount: "",
          P_Remarks: ""
        };
      }
      //console.log("[coach-detail.component.ts - line 619]", this.booking);
      //console.log("[coach-detail.component.ts - line 620]", this.bookArray);
    } else if (course == "CoursCollectifOndemand" && this.IsChecked == true) {
      this.slot = rowData.description;
      var userId = user1.id;
      this.booking.amount = "";
      this.booking.session = rowData.description;
      this.booking.Coach_ID = coachid.Id;
      this.booking.bookingCourse = localStorage.getItem("Course");
      this.temps = rowData.description;
      this.booking.user_Name = user1.firstName + " " + user1.lastName;
      this.moment_date = moment(this.bookingDate).format("DD-MM-YYYY");
      this.booking.user_Id = userId;
      this.Amt = this.Amt - parseInt(this.price, 10);
      var data = {
        Coach_ID: coachid.Id,
        slot: rowData.description,
        date: this.bookingDate
      };
      this.appService
        .getAll("/coach/getdemandavailability", data)
        .subscribe(data => {
          if ((data as any).data.availabilty.length > 0) {
            this.book_person = (data as any).data.availabilty.length;
            this.booked_user = (data as any).data.availabilty;
          }
          this.step_2 = true;
        });

      this.bookArray = [];
      this.book_coach.P_UserId = this.booking.user_Id;
      this.book_coach.P_CoachId = this.booking.Coach_ID;
      this.book_coach.P_Amount = this.booking.amount;
      this.book_coach.P_CourseId = this.booking.bookingCourse;
      this.book_coach.P_Hour = rowData.description;
      this.book_coach.P_Date = this.bookingDate;
      this.bookArray.push(this.book_coach);
      this.book_coach = {
        P_CoachId: "",
        P_CourseId: "",
        P_Date: "",
        P_Hour: "",
        P_UserId: "",
        P_Amount: "",
        P_Remarks: ""
      };
    } else if (course == "CoursCollectifClub") {
      var userId = user1.id;
      var time =
        rowData.StartTime.replace(":00", "h") +
        "-" +
        rowData.EndTime.replace(":00", "h");
      this.Amt = this.Amt + parseInt(rowData.Price, 10);
      this.Clubcourse = rowData.Course;
      this.booking.amount = rowData.Price.toString();
      this.booking.session = this.session;
      this.booking.coach_Email = this.coach_detail.Coach_Email;
      this.booking.coach_Name =
        this.coach_detail.Coach_Fname + " " + this.coach_detail.Coach_Lname;
      this.booking.Coach_ID = coachid.Id;
      this.booking.user_Name = user1.firstName + " " + user1.lastName;
      this.temps = time;
      this.booking.bookingCourse = localStorage.getItem("Course");
      this.booking.bookingDate = this.formatDate(new Date());
      var date = new Date();
      date.setFullYear(date.getFullYear() + 1);
      date.setMonth(5);
      date.setDate(30);
      this.booking.bookingDateRange =
        moment(new Date()).format("DD-MM-YYYY") +
        "  à " +
        moment(date).format("DD-MM-YYYY");
      this.booking.user_Id = userId;

      this.bookArray = [];
      this.book_coach.P_UserId = this.booking.user_Id;
      this.book_coach.P_CoachId = this.booking.Coach_ID;
      this.book_coach.P_Amount = this.booking.amount;
      this.book_coach.P_CourseId = this.booking.bookingCourse;
      this.book_coach.P_Hour = time;
      this.book_coach.P_Date = moment(new Date()).format("YYYY-MM-DD");
      this.book_coach.P_Remarks = rowData.Course;
      this.bookArray.push(this.book_coach);
      this.book_coach = {
        P_CoachId: "",
        P_CourseId: "",
        P_Date: "",
        P_Hour: "",
        P_UserId: "",
        P_Amount: "",
        P_Remarks: ""
      };
    }
    // console.log("[coach-detail.component.ts - line - 712]", this.bookArray);
  }

  closemodal() {
    this.spinner.show();
    this.revokeChanges();
    $("#available").hide();
    $(".modal-backdrop").hide();
    $("body").removeClass("modal-open");
    this.appService
      .getAll("/coach/getTimeslot", this.Timeslotdata)
      .subscribe(data => {
        this.timeslot = (data as any).data.availabilty[0];
        this.spinner.hide();
      });
  }

  closeclub() {
    this.spinner.show();
    this.revokeChanges();
    $("#clubmodal").hide();
    $(".modal-backdrop").hide();
    $("body").removeClass("modal-open");
    this.spinner.hide();
  }

  revokeChanges() {
    this.booking = {
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
    this.book_coach = {
      P_CoachId: "",
      P_CourseId: "",
      P_Date: "",
      P_Hour: "",
      P_UserId: "",
      P_Amount: "",
      P_Remarks: ""
    };
    this.Amt = 0;
    this.bookArray = [];
    this.session = [];
    this.moment_date = "";
    this.temps = "";
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

  bookCoach() {
    var req = {
      bookArray: this.bookArray,
      totalAmt: this.booking.amount,
      remaingStatus: this.is10Hr == true ? "Yes" : "No"
    };
    //console.log("[coach-detail.component.ts - line - 789]", req);
    this.spinner.show();
    this.appService
      .create("/coach/setreservationfun", req)
      .subscribe(response => {
        if (response && response.isSuccess == true) {
          $(".btnbookingCoursIndividual").hide();
          this._showAlertMessage("alert-success", "Cours réservé avec succès");
        } else {
          this._showAlertMessage(
            "alert-danger",
            "La réservation du cours a échoué"
          );
        }
        this.spinner.hide();
      });
  }

  couchdetail() {
    //this.spinner.show();
    var coach = JSON.parse(localStorage.getItem("Coach"));
    var coachemail = {
      Coach_Email: coach.Coach_Email
    };

    this.appService
      .create("/coach/getcoachbyid", coachemail)
      .subscribe(async response => {
        if (response && response["data"]) {
          this.coach_detail = response.data.coach_list[0];
          var transportData = this.coach_detail.Coach_transport.split(", ");
          this.voiture = transportData.includes("voiture");
          this.bus = transportData.includes("bus");
          this.metro = transportData.includes("métro");
          this.rer = transportData.includes("rer");
          this.tram = transportData.includes("tram");

          var temp = new Array();
          temp = this.coach_detail.Coach_payment_type.split(",");
          //console.log(temp[0]);
          this.str = temp.join(", ");
          this.spinner.hide();
        }
      });
  }

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

  coachSlider() {
    this.slides = {
      data: [],
      config: {
        slidesToShow: this.slidecnt,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: true
      }
    };
    var Data: any;
    this.appService.getAll("/coach/getallcoaches").subscribe(response => {
      Data = response;
      Data.data.coach_list.forEach(element => {
        this.slides.data.push({
          img: element.Coach_Image,
          name: element.Coach_Fname + " " + element.Coach_Lname,
          comment: element.Coach_Description
        });
      });
    });
  }

  enable10h() {
    //console.log("[coach-detail.component.ts - line - 878]", this.bookArray);
    // this.price = this.Indiv_10hr;
    this.appService
      .getAll(
        "/coach/get_avail_ten_is_or_not/" +
          this.bookArray[0].P_CoachId +
          "/" +
          this.bookArray[0].P_Date
      )
      .subscribe(response => {
        //console.log("[coach-detail.component.ts - line - 888]", response);
        var getAvail = response as any;
        if (getAvail.data.ten == true) {
          this.is10Hr = true;
          $("#10hrposter").hide();
        } else {
          this.is10Hr = false;
          $("#10hrposter").hide();
          $("#actuellement").show();
        }
      });
  }

  hide10h() {
    // this.price = this.Indiv_1hr;
    this.is10Hr = false;
    $("#10hrposter").hide();
  }

  actuellement() {
    // this.price = this.Indiv_1hr;
    this.is10Hr = false;
    $("#actuellement").hide();
  }

  fentes() {
    // this.price = this.Indiv_1hr;
    this.is10Hr = true;
    $("#fentes").hide();
  }

  hr10more() {
    // this.price = this.Indiv_1hr;
    this.is10Hr = true;
    $("#hrtenmore").hide();
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
}
