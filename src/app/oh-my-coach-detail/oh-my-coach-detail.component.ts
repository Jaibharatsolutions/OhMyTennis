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
import * as $ from "jquery";
@Component({
  selector: "app-oh-my-coach-detail",
  templateUrl: "./oh-my-coach-detail.component.html",
  styleUrls: ["./oh-my-coach-detail.component.scss"]
})
export class OhMyCoachDetailComponent implements OnInit {
  public Ville: any = null;
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

  public str: any = null;

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
    this.coachSlider();

    this.couchdetail();

    var pcode = localStorage.getItem("onmytennis");
    var postalCode = JSON.parse(JSON.parse(pcode));
    this.Ville = postalCode.postalCode;
  }

  handleDateClick(arg) {
    // handler method
    this.spinner.show();
    $(".day-highlight").removeClass("day-highlight");
    $(arg.dayEl).addClass("day-highlight");
    var course = localStorage.getItem("Course");
    var coach = JSON.parse(localStorage.getItem("Coach"));
    var detail = {
      Start_Date: arg.dateStr,
      Coach_ID: coach.id,
      Course: course
    };
    this.bookingDate = arg.dateStr;
    console.log(this.bookingDate);
    this.Timeslotdata = {
      Start_Date: arg.dateStr,
      Coach_ID: coach.id,
      Course: course
    };
    if (course != "CoursCollectifClub") {
      this.appService.getAll("/coach/getTimeslot", detail).subscribe(data => {
        this.timeslot = (data as any).data.availabilty;
        this.spinner.hide();
      });
    } else {
      this.showclub = true;
      this.spinner.hide();
    }
  }

  handleClick(event: Event) {
    this.router.navigate(["/ohmycoach"]);
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
      bookArray: this.bookArray
    };
    this.spinner.show();
    this.appService.create("/coach/setreservation", req).subscribe(response => {
      if (response && response.isSuccess == true) {
        document.getElementById("btnbooking").style.display = "none";
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
    this.spinner.show();
    var coach = JSON.parse(localStorage.getItem("Coach"));
    var coachemail = {
      Coach_Email: coach.Coach_Email
    };

    this.setCoachName = localStorage.getItem("sendCoachDetails");
    //console.log('setcoachname',setCoachName)

    this.appService
      .create("/coach/getcoachbyid", coachemail)
      .subscribe(async response => {
        if (response && response["data"]) {
          this.coach_detail = response.data.coach_list[0];
          //console.log('coachdetail',this.coach_detail);
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
  gotoCouch(couch: any) {
    //alert('sample')
    localStorage.setItem("sendCoachDetails", couch.name);
    this.couchdetail();
    // if (localStorage.getItem("onmytennis") !== null) {
    //   var data = JSON.stringify(res);
    //   localStorage.setItem("Coach", data);
    //   localStorage.setItem("Course", ser);
    //   this.router.navigate(['/coachdetail'])
    // } else {
    //   this.router.navigate(['/login'])
    // }
    this.router.navigate(["/ohmycoachdetail"]);
  }
}
