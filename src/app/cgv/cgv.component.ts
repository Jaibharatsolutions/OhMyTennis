import {
  Component,
  OnInit,
  AfterViewChecked,
  EventEmitter,
  Output
} from "@angular/core";
import { Location } from "@angular/common";
import { BrowserModule, Title, Meta } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { AppService } from "../shared/app.service";
import { AppComponent } from "../app.component";
import * as moment from "moment";
/* [ Spinner ] */
import { NgxSpinnerService } from "ngx-spinner";
import { NgbDateStruct, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
export interface IImage {
  url: string | null;
  href?: string;
  clickAction?: () => void;
  caption?: string;
  title?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
}

@Component({
  selector: "app-cgv",
  templateUrl: "./cgv.component.html",
  styleUrls: ["./cgv.component.scss"]
})
export class CGVComponent extends AppComponent implements OnInit {
  public min = new Date(Date.now() - 24 * 60 * 60 * 1000);
  public search = {
    course: "",
    date: "",
    session: "",
    ville: "",
    rayon: ""
  };
  isHidden: boolean = true;

  public response = [
    {
      Date: "",
      Month_Year: "",
      Location: "",
      Postalcode: "",
      Coach_Id: "",
      Description: "",
      Price: "",
      from_date: "",
      to_date: "",
      Eventname: "",
      Eventdetails: "",
      Mode_of_transport: "",
      Photo: ""
    }
  ];

  public date: any = "";
  public respon: any;
  public myCoachTabActive = true;
  public slidecnt: any;
  public newUser: any;
  public myCoaches: any = [];
  /* [ Banner Image ] */
  public bannerImageSources: (string | IImage)[] = [];

  public slides: any;
  public amt = 0;
  public banner: any;
  public Ville: any = "";
  public Date: any = "";
  model: NgbDateStruct;
  today = this.calendar.getToday();
  constructor(
    private calendar: NgbCalendar,
    activatedRoute: ActivatedRoute,
    router: Router,
    appService: AppService,
    location: Location,
    spinner: NgxSpinnerService
  ) {
    super(activatedRoute, router, appService, location, spinner);
    this.slidecnt = 4;
  }

  ngOnInit() {
    // const bookid: string = this.activatedRoute.snapshot.queryParamMap.get(
    //   "bookid"
    // );
    // if (bookid) {
    //   this.appService
    //     .getAll("/coach/BookingDetail?booking_Id=" + bookid, this.newUser)
    //     .subscribe(response => {
    //       var res: any = response;
    //       console.log(res);
    //       if (res.data.availabilty[0].status == "A") {
    //         this.amt = res.data.availabilty[0].amount;
    //         this.pay(
    //           this.appService,
    //           res.data.availabilty[0].amount,
    //           res.data.availabilty[0].email,
    //           bookid
    //         );
    //       } else {
    //         alert("Paiement déjà effectué");
    //       }
    //     });
    // }
    // this.newUser = {
    //   email: "",
    //   password: ""
    // };

    if (window.innerWidth > 1024) {
      this.slidecnt = 4;
    } else if (window.innerWidth > 768) {
      this.slidecnt = 3;
    } else {
      this.slidecnt = 2;
    }

    this.bannerImage();
    this.coachSlider();
    // this.searchEvent();
    // this.myCoaches = [
    //   {
    //     title: "Tous Les Coachs",
    //     class: "active"
    //   },
    //   {
    //     title: "Réserver un cours",
    //     class: ""
    //   }
    // ];

    // var pcode = localStorage.getItem("onmytennis");
    // var postalCode = JSON.parse(JSON.parse(pcode));
    // if (postalCode) this.Ville = postalCode.postalCode;
  }

  changeMyCoachTab(e, i) {
    if (e) {
      this.myCoaches.forEach(c => {
        c.class = "";
      });
      this.myCoaches[i].class = "active";
    }
  }

  /* [ Banner Image ] */
  bannerImage() {
    this.bannerImageSources.push({
      url: "./assets/images/cours-particuliers-de-tennis.jpg"
    });
  }

  /* [ Coach slider ] */
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

      Data.data.coach_list.forEach(
        element => {
          this.slides.data.push({
            img: element.Coach_Image,
            name: element.Coach_Fname + " " + element.Coach_Lname,
            comment: element.Coach_Description
          });
        },
        error => {}
      );
    });
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

  handleClick(event: Event) {
    sessionStorage.setItem("Ville", this.Ville ? this.Ville : "");
    sessionStorage.setItem("Date", this.Date ? this.formatDate(this.Date) : "");
    this.router.navigate(["/ohmycoach"]);
  }

  gotoCouch(couch: any) {
    localStorage.setItem("sendCoachDetails", couch.name);
    this.router.navigate(["/ohmycoachdetail"]);
  }

  private mdlSampleIsOpen: boolean = false;
  private Mytitle: string = "";
  private openModal(title): void {
    console.log(title);
    this.mdlSampleIsOpen = true;
  }

  private closeModal(): void {
    this.mdlSampleIsOpen = false;
  }

  pay(appService, amount, email, bookid) {
    var data: any;
    this.closeModal();
    var handler = (<any>window).StripeCheckout.configure({
      key: "pk_test_ppbf90Eyy5PuXBdNQNLpxVuz00e719Y31R",
      locale: "fr",
      token: function(token: any) {
        if (token) {
          var coachemail = {
            status: "B",
            booking_id: bookid,
            amount: amount,
            token: JSON.stringify(token)
          };

          appService
            .create("/coach/setpayment", coachemail)
            .subscribe(response => {
              console.log("response", response);
            });
          data = token;
        }
        alert("Paiement réussi");
      }
    });
    this.setstatus(data);

    handler.open({
      name: "Oh My Tennis",
      description: "RESERVER UN COURS",
      email: email,
      amount: amount * 100,
      currency: "EUR"
    });
  }

  setstatus(data) {
    if (data) {
      const bookid: string = this.activatedRoute.snapshot.queryParamMap.get(
        "bookid"
      );

      var details = {
        status: "B",
        booking_id: bookid,
        amount: this.amt
      };

      this.appService
        .create("/coach/setpayment", details)
        .subscribe(async val => {
          if (val.isSuccess == true) {
            this._showAlertMessage("alert-success", "Payment Successfully");
          } else {
            this._showAlertMessage("alert-danger", "Payment Failed");
          }
        });
    }
  }

  loadStripe() {
    if (!window.document.getElementById("stripe-script")) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(s);
    }
  }

  goToStage() {
    // this.router.navigate();
    this.router.navigate(["/stage"]);
  }

  searchEvent() {
    this.spinner.show();
    if (this.Date !== "") {
      var data1 = {
        P_course: "Stage",
        P_date: moment(this.Date).format("YYYY-MM-DD"),
        P_postalcode: this.Ville
      };
    } else {
      var data1 = {
        P_course: "Stage",
        P_date: "",
        P_postalcode: this.Ville
      };
    }

    this.appService
      .getAll("/coachdetail/geteventtop3", data1)
      .subscribe(data1 => {
        if ((data1 as any).isSuccess == true) {
          this.response = (data1 as any).data.event_list;

          for (var i = 0; i < this.response.length; i++) {
            var split = this.formatDateTop(this.response[i].from_date).split(
              "-"
            );
            this.response[i].Date = split[0];
            this.response[i].Month_Year = split[1];
          }
          this.spinner.hide();

          var resLength = this.response.length;

          if (resLength < 1 || resLength == undefined || resLength == 0) {
            this.isHidden = true;
          }
        } else {
          this.spinner.hide();
        }
      });
  }

  formatDateTop(date) {
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
