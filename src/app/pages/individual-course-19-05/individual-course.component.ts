import { Component, OnInit, Input } from "@angular/core";
import { AppService } from "../../shared/app.service";
import { NgForm } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { CoachComponent } from "src/app/model/coach/coach.component";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Location } from "@angular/common";
import * as $ from "jquery";

@Component({
  selector: "app-individual-course",
  templateUrl: "./individual-course.component.html",
  styleUrls: ["./individual-course.component.scss"],
})
export class IndividualCourseComponent
  extends CoachComponent
  implements OnInit
{
  public res = {
    Postalcode: "",
    Location: "",
    Mode_of_Transport: "",
    Plan: "",
    Description: "",
    Price_max: "",
    Price_min: "",
    Technical_provided: "",
    Video: "",
  };
  public trans_error: Boolean = false;
  public plan_error: Boolean = false;
  paymentMode: boolean = false;

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
    if (titile) titile[0].innerHTML = "COURS INDIVIDUEL";

    this.getIndividualCourse();

    let formInputItem = document
      .querySelectorAll(".form_devarea")[0]
      .querySelectorAll("input");
    formInputItem.forEach(function (inputElement) {
      inputElement.setAttribute("disabled", "true");
    });

    let elebebtn = document.querySelector("#enableBtn") as HTMLElement;
    elebebtn.style.display = "inline";

    elebebtn.setAttribute("data-toggle", "modal");

    let icancel = document.querySelector("#cancel") as HTMLElement;
    icancel.style.display = "none";

    let Enregistrer = document.querySelector("#Enregistrer") as HTMLElement;
    Enregistrer.style.display = "none";
    window.scrollTo(0, 0);
  }

  getIndividualCourse() {
    this.spinner.show();
    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    var coach1 = JSON.parse(coach);
    var coachid = {
      coachId: coach1.id,
    };
    var transport = [];
    var selectedPlan: string;
    var selectedPayment: string;
    this.appService
      .getAll("/course/getindividualcourse", coachid)
      .subscribe((response) => {
        if ((response as any).data.course.length > 0) {
          if (response && response["data"]) {
            this.res = (response as any).data.course[0];
            transport = this.res.Mode_of_Transport.split(",");
            if (transport[0] != "") {
              if (transport.length > 0) {
                for (var i = 0; i < transport.length; i++) {
                  var element = <HTMLInputElement>(
                    document.getElementById(transport[i])
                  );
                  if (element != null) element.checked = true;
                }
              }
            }
            let formInputItem = document
              .querySelectorAll(".form_devarea")[0]
              .querySelectorAll("input");
            formInputItem.forEach(function (inputElement) {
              let mode = inputElement as HTMLInputElement;

              selectedPlan = (response as any).data.course[0].Plan;
              selectedPayment = (response as any).data.course[0]
                .mode_of_payment;
              if (mode.type == "radio") {
                if (mode.id == "inlineradio3" && selectedPlan == "Commission") {
                  mode.checked = true;
                } else if (
                  mode.id == "inlineradio4" &&
                  selectedPlan == "Abonnement"
                ) {
                  mode.checked = true;
                }
                if (mode.id == "inlineradio5" && selectedPayment == "Check") {
                  mode.checked = true;
                } else if (
                  mode.id == "inlineradio6" &&
                  selectedPayment == "Online"
                ) {
                  mode.checked = true;
                } else if (
                  mode.id == "inlineradio7" &&
                  selectedPayment == "Bank"
                ) {
                  mode.checked = true;
                }
              }
            });
            if ((response as any).isSuccess == true) {
              this.spinner.hide();
            } else if ((response as any).isSuccess == false) {
              this.spinner.hide();
            }
          }
        } else {
          this.spinner.hide();
        }
      });
  }

  onSubmit(res) {
    var transport = "";
    var plan = "";
    var payment = "";
    this.spinner.show();
    $("#trans_error").hide();
    $("#plan_error").hide();
    this.trans_error = false;
    this.plan_error = false;
    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    var coach1 = JSON.parse(coach);
    res.Coach_Id = coach1.id;
    let enableBtn = document.querySelector("#enableBtn") as HTMLElement;
    if (enableBtn.hasAttribute("disabled") == false) {
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
        if (mode.type == "radio") {
          if (mode.id == "inlineradio3" && mode.checked == true) {
            plan = "Commission";
          } else if (mode.id == "inlineradio4" && mode.checked == true) {
            plan = "Abonnement";
          }
          if (mode.id == "inlineradio5" && mode.checked == true) {
            payment = "Check";
          } else if (mode.id == "inlineradio6" && mode.checked == true) {
            payment = "Online";
          } else if (mode.id == "inlineradio7" && mode.checked == true) {
            payment = "Bank";
          }
        }
      });
      if (transport[0] == ",") {
        res.Mode_of_Transport = transport.substring(1);
      } else {
        res.Mode_of_Transport = transport;
      }
      res.Plan = plan;

      if (res.Mode_of_Transport == "") {
        this.trans_error = true;
        $("#trans_error").show();
      } else if (res.Plan == "") {
        $("#plan_error").show();
        this.plan_error = true;
      }
      res.mode_of_payment = payment;
      if (this.trans_error == false && this.plan_error == false) {
        this.appService
          .create("/course/insertindividualcourse", res)
          .subscribe((response) => {
            if (response && response.isSuccess == true) {
              this._showAlertMessage(
                "alert-success",
                "Mise à jour avec succés"
              );

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
  }

  enableForm() {
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

    $("#exampleFormControlTextarea1").prop("readonly", false);
    $("#exampleFormControlTextarea1").prop("required", true);

    $(".form-group :input").prop("readonly", false);
    $(".form-group :input").prop("required", true);

    let Enregistrer = document.querySelector("#Enregistrer") as HTMLElement;
    Enregistrer.style.display = "inline";

    let elebebtn = document.querySelector("#enableBtn") as HTMLElement;
    elebebtn.style.display = "none";

    let icancel = document.querySelector("#cancel") as HTMLElement;
    icancel.style.display = "inline";
  }
}
