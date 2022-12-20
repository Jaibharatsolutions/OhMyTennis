import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AppComponent } from "../app.component";
import { Location } from "@angular/common";
import { UserComponent } from "../model/user/user.component";
import * as moment from "moment";
import * as L from "leaflet";
import * as $ from "jquery";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: "app-user-stage-detail",
  templateUrl: "./user-stage-detail.component.html",
  styleUrls: ["./user-stage-detail.component.scss"]
})
export class UserStageDetailComponent extends UserComponent implements OnInit {
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

  public event_detail = {
    Location: "",
    Postalcode: "",
    Coach_Id: "",
    Description: "",
    Price: "",
    Photo: "",
    from_date: "",
    to_date: "",
    Eventname: "",
    Eventdetails: "",
    Mode_of_transport: "",
    Plan: "",
    filename: ""
  };

  public voiture: boolean = false;
  public bus: boolean = false;
  public metro: boolean = false;
  public rer: boolean = false;
  public tram: boolean = false;

  public slides: any;
  public reviews: any;
  public slidecnt: any;
  public selectedCity: any = null;
  public comments:any;
  public str: any = null;
  map: any;
  mapvalues: any;
  lat: any;
  lang: any;
  curentlat: any;
  curentlang: any;
  showModal : boolean;
  course: string;
  current_user:string;
  firstName:string;
  event_name:string;
  fromyear:any;
  frommonth:any;
  fromday:any;
  toyear:any;
  tomonth:any;
  today:any;
  Location:string;
  postalcode;any;
  price:number;
  showMsg:boolean = false;
  showsuccessMsg:boolean = false;
  form: FormGroup;
  cutomerReviewCollection:any = [];
  private userdetailsComponent: UserStageDetailComponent;
  
  count_id:any;

  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    appService: AppService,
    location: Location,
    spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) {
    super(activatedRoute, router, appService, location, spinner);
  }
  ngOnInit() {

    

    this.form = this.formBuilder.group({
      comments: [null, [Validators.required]]
      
    });

    // this.appService.refreshNeeded$.subscribe(() => {
    //   this.getReviewDetails();
    // });

    this.getReviewDetails();

    this.getcurrentcordinates();
    this.spinner.show();
    var event = JSON.parse(localStorage.getItem("Event"));
    this.event_detail = event;
    var coachevent = {
      P_course: "Stage",
      P_CoachId: event.Coach_Id
    };
    this.appService
      .create("/coachdetail/getcoachbyevent", coachevent)
      .subscribe(async response => {
        if (response && response["data"]) {
          if (response.isSuccess == true) {
            if (response.data.coach_list[0]) {
              this.coach_detail = response.data.coach_list[0];
              var transportData = this.coach_detail.Coach_transport.split(", ");
              this.voiture = transportData.includes("voiture");
              this.bus = transportData.includes("bus");
              this.metro = transportData.includes("métro");
              this.rer = transportData.includes("rer");
              this.tram = transportData.includes("tram");

              this.mapvalues = eval(
                "[" + this.coach_detail["coordonnees_gps"] + "]"
              );
              this.lat = this.mapvalues[0].toFixed(3);
              this.lang = this.mapvalues[1].toFixed(3);
              var temp = new Array();
              temp = this.coach_detail.Coach_payment_type.split(",");
              //console.log(temp[0]);
              this.str = temp.join(", ");
              this.spinner.hide();

              this.appService
                .getAll("/city/" + this.event_detail.Postalcode)
                .subscribe(res => {
                  if (res && res["data"]) {
                    if ((res as any).isSuccess == true) {
                      this.selectedCity = (res as any).data.city_list;
                      this.spinner.hide();
                    } else {
                      this.spinner.hide();
                    }
                  }
                });

              this.map = L.map("map", {
                center: this.mapvalues,
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

              L.marker(this.mapvalues, { icon: greenIcon })
                .addTo(this.map)
                .openPopup();
              this.spinner.hide();
            } else {
              this.spinner.hide();
            }
          } else {
            this.spinner.hide();
          }
        }
      });
    //this.coachSlider();
  }




  private getReviewDetails() {
    
      var coursedetails = {
        course: "Stage"
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
              review_day: moment(response["data"][i].created_at).format("DD"),

              
            });
           
          }
          this.count_id = response["data"].length;
          
        }
   
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

  

  onSubmitComment() {
    
    var Comments = this.form.value.comments;
   
    var event = JSON.parse(localStorage.getItem("Event"));
    var users = JSON.parse(localStorage.getItem("onmytennis"));
    var user = JSON.parse(users);
    var insertComments = {
      Coach_Id: event.Coach_Id,
      User_Id: user.id,
      course: "Stage",
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
              setTimeout(()=>{   
                this.showsuccessMsg = false;
                document
            .getElementById("btnreviews")
            .setAttribute("disabled", "true");
            location.reload(true);
           }, 1000);
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

  hide()
  {
    this.showModal = false;
  }

  onClick()
  {
      this.spinner.show();
      this.showModal = true; // Show-Hide Modal Check
      this.course = "Stage";
      
      var event = JSON.parse(localStorage.getItem("Event"));
      var currentUser = JSON.parse(localStorage.getItem("currentUser"));
      //console.log('tata' + currentuser);
      var parameters = {
        coachId: event.Coach_Id,
        id: event.id
      };
      this.appService.getAll("/course/getstage",parameters).subscribe(response => {
        if ((response as any).data.course.length > 0) {
        this.event_name = (response as any).data.course[0].Eventname;
        var from_date = (response as any).data.course[0].from_date;
        var d = new Date(from_date);
        this.fromyear = d.getUTCFullYear();
        this.frommonth = d.getUTCMonth()+1;
        this.fromday = d.getUTCDate()+1;
        let to_date = (response as any).data.course[0].to_date;
        var toDate = new Date(to_date);
        this.toyear = toDate.getUTCFullYear();
        this.tomonth = toDate.getUTCMonth()+1;
        this.today = toDate.getUTCDate()+1;
        this.Location = (response as any).data.course[0].Location;
        this.postalcode = (response as any).data.course[0].Postalcode;
        this.price = (response as any).data.course[0].Price;
        this.current_user = currentUser.firstName;
        this.spinner.hide();
        }
        else
        {
          this.spinner.hide();
        }
      });

  }

  reserveevent() {
    var event = JSON.parse(localStorage.getItem("Event"));
    var users = JSON.parse(localStorage.getItem("onmytennis"));
    var user = JSON.parse(users);
    var bookArray = {
      Coach_id: event.Coach_Id,
      user_Id: user.id,
      status: "R",
      booking_date: moment(new Date()).format("YYYY-MM-DD"),
      bookingEnd: moment(event.to_date).format("YYYY-MM-DD"),
      course: "Stage",
      amount: event.Price,
      reserve: []
    };
    this.spinner.show();
    this.appService
      .create("/coachdetail/bookcourse", bookArray)
      .subscribe(response => {
        if (response && response.isSuccess == true) {
          document
            .getElementById("btnbooking")
            .setAttribute("disabled", "true");
            this.showMsg = true;

          // this._showAlertMessage(
          //   "alert-success",
          //   "Un événement réservé avec succès"
          // );
          this.spinner.hide();
          setTimeout(()=>{   
            this.showModal = false;
       }, 2000);
        } else {
          this._showAlertMessage(
            "alert-danger",
            "La réservation du un événement a échoué"
          );
          this.spinner.hide();
        }
      });
  }

  async getcurrentcordinates() {
    const resp = await fetch("https://ipapi.co/json/");
    const data = await resp.json();
    this.curentlat = data.latitude.toFixed(3);
    this.curentlang = data.longitude.toFixed(3);
  }
}
