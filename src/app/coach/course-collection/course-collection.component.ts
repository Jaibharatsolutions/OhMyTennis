import { Component, OnInit } from "@angular/core";
import { AppService } from "../../shared/app.service";
import { CoachComponent } from "src/app/model/coach/coach.component";
import { Location } from "@angular/common";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import * as $ from "jquery";

@Component({
  selector: "app-course-collection",
  templateUrl: "./course-collection.component.html",
  styleUrls: ["./course-collection.component.scss"],
})
export class CourseCollectionComponent
  extends CoachComponent
  implements OnInit
{
  public trans_error: Boolean = false;
  public plan_error: Boolean = false;
  public res = {
    Coach_ID: "",
    Description: "",
    Mode_of_transport: "",
    Plan: "",
    Price_2pl_1hr: "",
    Price_2pl_10hr: "",
    Price_3pl_1hr: "",
    Price_3pl_10hr: "",
    Price_4pl_1hr: "",
    Price_4pl_10hr: "",
    Price_6pl_1hr: "",
    Price_5pl_1hr: "",
    Price_6pl_10hr: "",
    Min_People: " ",
    Max_People: " ",
    Location: "",
    id: "",
    Price_Mon: "0",
    Price_Tue: "0",
    Price_Wed: "0",
    Price_Thr: "0",
    Price_Fri: "0",
    Price_Sat: "0",
    Price_Sun: "0",
    Postalcode: "",
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

  // Initial load
  ngOnInit() {
    $("#trans_error").hide();
    $("#plan_error").hide();
    var titile = document.getElementsByClassName("brand");
    if (titile) titile[0].innerHTML = "COURS COLLECTIF ONDEMAND";
    this.getDemandCourse();

    let formInputItem = document
      .querySelectorAll(".form_devarea")[0]
      .querySelectorAll("input");
    formInputItem.forEach(function (inputElement) {
      inputElement.setAttribute("disabled", "true");
    });

    let textare1 = document.getElementById(
      "exampleFormControlTextarea1"
    ) as HTMLTextAreaElement;
    textare1.setAttribute("disabled", "true");

    let textare2 = document.getElementById(
      "exampleFormControlTextarea2"
    ) as HTMLTextAreaElement;
    //textare2.setAttribute("disabled", "true");

    let elebebtn = document.querySelector("#enableBtn") as HTMLElement;
    elebebtn.style.display = "inline";

    elebebtn.setAttribute("data-toggle", "modal");

    let icancel = document.querySelector("#cancel") as HTMLElement;
    icancel.style.display = "none";

    let Enregistrer = document.querySelector("#Enregistrer") as HTMLElement;
    Enregistrer.style.display = "none";
    window.scrollTo(0, 0);
  }

  getDemandCourse() {
    this.spinner.show();
    var selectedPlan: any;
    var selectedTransport: any;
    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    var coach1 = JSON.parse(coach);
    var coachid = {
      Coach_ID: coach1.id,
    };
    this.appService
      .getAll("/course/getcousecollectivedemanad", coachid)
      .subscribe((response) => {
        if ((response as any).data.course.length > 0) {
          if (response && response["data"]) {
            this.res = (response as any).data.course[0];
            selectedTransport = (
              response as any
            ).data.course[0].Mode_of_transport.split(",");
            let formInputItem = document
              .querySelectorAll(".form_devarea")[0]
              .querySelectorAll("input");
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
              selectedPlan = (response as any).data.course[0].Plan.split(",");
              if (mode.type == "radio") {
                if (selectedPlan.length > 0) {
                  for (var i = 0; i < selectedPlan.length; i++) {
                    if (
                      mode.id == "inlineradio3" &&
                      selectedPlan[i] == "Commission"
                    ) {
                      mode.checked = true;
                    } else if (
                      mode.id == "inlineradio4" &&
                      selectedPlan[i] == "Abonnement"
                    ) {
                      mode.checked = true;
                    }
                  }
                }
              }
            });
          }
          if ((response as any).isSuccess == true) {
            this.spinner.hide();
          } else if ((response as any).isSuccess == false) {
            this.spinner.hide();
          }
        } else {
          this.spinner.hide();
        }
      });
  }

  onSubmit(res) {
    $("#trans_error").hide();
    $("#plan_error").hide();
    this.trans_error = false;
    this.plan_error = false;
    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    var coach1 = JSON.parse(coach);
    res.Coach_Id = coach1.id;
    var transport = "";
    let enableBtn = document.querySelector("#enableBtn") as HTMLElement;
    if (enableBtn.hasAttribute("disabled") == false) {
      let jsonData = res;
      let formInputItem = document
        .querySelectorAll(".form_devarea")[0]
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
          jsonData.Mode_of_transport = transport.substring(1);
        } else {
          jsonData.Mode_of_transport = transport;
        }

        if (mode.type == "radio") {
          if (mode.id == "inlineradio3" && mode.checked == true) {
            jsonData.Plan = "Commission";
          } else if (mode.id == "inlineradio4" && mode.checked == true) {
            jsonData.Plan = "Abonnement";
          }
        }
      });
      res = jsonData;

      if (res.Mode_of_transport == "") {
        this.trans_error = true;
        $("#trans_error").show();
      } else if (res.Plan == "") {
        $("#plan_error").show();
        this.plan_error = true;
      }

      if (this.trans_error == false && this.plan_error == false) {
        this.appService
          .create("/course/setcousecollectivedemanad", res)
          .subscribe((response) => {
            if (response && response.isSuccess == true) {
              this._showAlertMessage(
                "alert-success",
                "Mise à jour avec succés"
              );
              this.ngOnInit();
              window.scrollTo(0, 0);
            } else {
              this._showAlertMessage("alert-danger", "Échec de la mise à jour");
            }
          });
      } else {
        this.spinner.hide();
      }
    }
  }

  enableForm() {
    $("#availabilityDiv :input").prop("readonly", false);
    $("#availabilityDiv :input").prop("required", true);

    let itransport = document.querySelectorAll(".form-group");
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

    let elebebtn = document.querySelector("#enableBtn") as HTMLElement;
    elebebtn.style.display = "none";

    let icancel = document.querySelector("#cancel") as HTMLElement;
    icancel.style.display = "inline";

    let Enregistrer = document.querySelector("#Enregistrer") as HTMLElement;
    Enregistrer.style.display = "inline";
  }
}
