import { Component, OnInit } from "@angular/core";
import { AppService } from "../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { CoachComponent } from "../model/coach/coach.component";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Location } from "@angular/common";
import * as $ from "jquery";

@Component({
  selector: "app-courseon-club",
  templateUrl: "./courseon-club.component.html",
  styleUrls: ["./courseon-club.component.scss"],
})
export class CourseonClubComponent extends CoachComponent implements OnInit {
  public filename: string = "";
  public response: any;
  public trans_error: Boolean = false;
  public plan_error: Boolean = false;
  public availablity: any = [];
  public res = {
    Coach_Id: "",
    Description: "",
    Postalcode: "",
    Mode_of_Transport: "",
    Photo: "",
    Plan: "",
    Technical_Provided: "",
    Video: "",
    Club_Name: "",
    Place: "",
    availablity: [],
    fileName: "",
  };

  constructor(
    appService: AppService,
    activatedRoute: ActivatedRoute,
    router: Router,
    location: Location,
    spinner: NgxSpinnerService
  ) {
    super(activatedRoute, router, appService, location, spinner);
  }

  ngOnInit() {
    this.getCourseClub();
    $("#trans_error").hide();
    $("#photo_error").hide();
    $("#plan_error").hide();
    var titile = document.getElementsByClassName("brand");
    if (titile) titile[0].innerHTML = "COURS COLLECTIF CLUB";
    let formInputItem = document
      .querySelectorAll(".form_devarea")[0]
      .querySelectorAll("input");
    formInputItem.forEach(function (inputElement) {
      inputElement.setAttribute("disabled", "true");
    });

    let textarea = document.getElementById(
      "exampleFormControlTextarea1"
    ) as HTMLTextAreaElement;
    textarea.setAttribute("disabled", "true");

    let elebebtn = document.querySelector("#enableBtn") as HTMLElement;
    elebebtn.textContent = "Modifier";

    elebebtn.setAttribute("data-toggle", "modal");

    let icancel = document.querySelector("#cancel") as HTMLElement;
    icancel.style.display = "none";

    let enableBtn = document.getElementById("enableBtn") as HTMLElement;
    enableBtn.style.visibility = "visible";

    let Enregistrer = document.getElementById("Enregistrer") as HTMLElement;
    Enregistrer.style.display = "none";
    if (this.availablity.length == 0) this.addDay();
    console.log(this.availablity);
  }

  enableForm() {
    $(".form_devarea :input").prop("readonly", false);
    $(".form_devarea :input").prop("required", true);

    let itransport = document.querySelectorAll(".form-check-input");
    itransport.forEach(function (checkItem) {
      checkItem.removeAttribute("disabled");
    });

    let formInputItem = document
      .querySelectorAll(".form_devarea")[0]
      .querySelectorAll("input");
    formInputItem.forEach(function (inputElement) {
      inputElement.removeAttribute("disabled");
    });

    let textarea = document.getElementById(
      "exampleFormControlTextarea1"
    ) as HTMLTextAreaElement;
    textarea.removeAttribute("disabled");

    let icancel = document.querySelector("#cancel") as HTMLElement;
    icancel.style.display = "inline";

    let enableBtn = document.getElementById("enableBtn") as HTMLElement;
    enableBtn.style.visibility = "hidden";

    let Enregistrer = document.getElementById("Enregistrer") as HTMLElement;
    Enregistrer.style.display = "inline";
  }

  getCourseClub() {
    var selectedPlan = [];
    var selectedTransport: any;
    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    var coach1 = JSON.parse(coach);
    var coachid = {
      coachId: coach1.id,
    };
    this.spinner.show();
    this.appService
      .getAll("/course/getcousecollectiveclub", coachid)
      .subscribe((data: any) => {
        if (data.data.course.length > 0) {
          console.log(" data.data.availablity", data.data.availablity);
          this.response = data.data.course[0];
          this.availablity = data.data.availablity;
          this.res = data.data.course[0];
          console.log("res", this.res);
          let formInputItem = document
            .querySelectorAll(".form_devarea")[0]
            .querySelectorAll("input");
          selectedTransport = this.res.Mode_of_Transport.split(",");
          formInputItem.forEach(function (inputElement) {
            let mode = inputElement as HTMLInputElement;
            if (mode.type == "checkbox") {
              let modechild = mode.nextSibling as HTMLElement;
              let Mode_of_Transport: string = modechild.nodeValue.trim();
              if (selectedTransport.length > 0) {
                for (var i = 0; i < selectedTransport.length; i++) {
                  if (Mode_of_Transport == selectedTransport[i]) {
                    mode.checked = true;
                  } else {
                    if (Mode_of_Transport == selectedTransport[i]) {
                      mode.checked = true;
                    }
                  }
                }
              }
            }
            selectedPlan = data.data.course[0].Plan.split(",");
            if (mode.type == "radio") {
              if (selectedPlan.length > 0) {
                for (var i = 0; i < selectedPlan.length; i++) {
                  if (
                    mode.id == "inlineradio3" &&
                    selectedPlan[i] == "Commission"
                  ) {
                    mode.checked = true;
                  }
                  // else if (mode.id == "inlineradio4" && selectedPlan[i] == "Abonnement") {
                  //   mode.checked = true;
                  // }
                }
              }
            }
          });
          this.spinner.hide();
        } else if (data.data.course.length == 0) {
          this.spinner.hide();
        }
      });
  }

  onSubmit(res) {
    this.spinner.show();
    $("#trans_error").hide();
    $("#plan_error").hide();
    $("#photo_error").hide();
    this.trans_error = false;
    this.plan_error = false;
    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    var coach1 = JSON.parse(coach);
    res.Coach_Id = coach1.id;
    var transport = "";
    var plan = "";
    let formInputItem = document
      .querySelectorAll(".form_section")[0]
      .querySelectorAll("input");
    formInputItem.forEach(function (inputElement) {
      let mode = inputElement as HTMLInputElement;
      if (mode.type == "checkbox") {
        if (mode.checked == true) {
          let modechild = mode.nextSibling as HTMLElement;
          if (transport !== "") {
            transport = transport + "," + modechild.nodeValue.trim();
          } else {
            transport = modechild.nodeValue.trim();
          }
        }
      }
      if (transport[0] == ",") {
        res.Mode_of_Transport = transport.substring(1);
      } else {
        res.Mode_of_Transport = transport;
      }
      if (mode.type == "radio") {
        if (mode.checked == true) {
          let modechild = mode as HTMLElement;
          if (modechild.getAttribute("name") == "sampleinlineradio1") {
            plan = plan + modechild.getAttribute("value");
          }
        }
      }
    });
    res.Plan = plan;
    //console.log("filename",res.Photo)
    if (!res.Photo) {
      $("#photo_error").show();
    }
    if (res.Mode_of_Transport == "") {
      this.trans_error = true;
      $("#trans_error").show();
    } else if (res.Plan == "") {
      $("#plan_error").show();
      this.plan_error = true;
    }
    this.res.availablity = this.availablity;
    //console.log('tata '+ JSON.stringify(res));
    if (this.trans_error == false && this.plan_error == false && res.Photo) {
      this.appService
        .create("/course/setcousecollectiveclub", res)
        .subscribe((response) => {
          //console.log('tata '+ JSON.stringify(res));
          if (response && response.isSuccess == true) {
            this._showAlertMessage("alert-success", "Mise à jour avec succés");
            this.ngOnInit();
            this.spinner.hide();
          } else {
            this._showAlertMessage("alert-danger", "Échec de la mise à jour");
            this.spinner.hide();
          }
        });
    } else {
      this.spinner.hide();
    }
  }

  addDay() {
    var coaches = JSON.parse(localStorage.getItem("onmytennis"));
    var coach = JSON.parse(coaches);
    // var id = this.availablity.length + 1;
    this.availablity.push({
      Id: 0,
      CoachId: coach.id,
      Weekday: "",
      MaxCount: "",
      StartTime: "",
      EndTime: "",
      Price: "",
      Course: "",
    });
  }

  removeDay(id, index) {
    this.spinner.show();
    var coaches = JSON.parse(localStorage.getItem("onmytennis"));
    var coach = JSON.parse(coaches);
    var data = {
      CoachId: coach.id,
      Id: id,
    };
    this.appService
      .create("/course/deleteclubavailablity", data)
      .subscribe((res) => {
        this.spinner.hide();
        this.availablity.splice(index, 1);
      });
  }

  propagateChange = (result, file, type) => {
    this.res.Photo = result;
    this.filename = file.name;
    $("#photo_error").hide();
  };

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    $(".file-upload-wrapper").attr("data-text", file.name);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      // this.res.Coach_Image =  reader.result
      this.propagateChange(reader.result, file, file.type);
      // this.image = reader.result;
      // this.res.Coach_Image = this.ab2str();
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }
}
