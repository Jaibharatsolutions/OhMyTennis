import { Component, OnInit, ViewChild } from "@angular/core";
import { CoachComponent } from "../model/coach/coach.component";
import { AppService } from "../shared/app.service";
import { Location } from "@angular/common";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import * as $ from "jquery";
import { AngularEditorConfig } from "@kolkov/angular-editor";
@Component({
  selector: "app-stage",
  templateUrl: "./stage.component.html",
  styleUrls: ["./stage.component.scss"],
})
export class StageComponent extends CoachComponent implements OnInit {
  public res = {
    Coach_Id: "",
    Postalcode: "",
    Eventname: "",
    Location: "",
    Mode_of_transport: "",
    Plan: "",
    Description: "",
    from_date: "",
    to_date: "",
    Price: "",
    Photo: "",
    Eventdetails: "",
    filename: "",
  };

  public trans_error: Boolean = false;
  public plan_error: Boolean = false;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "auto",
    minHeight: "300px",
    maxHeight: "auto",
    width: "auto",
    minWidth: "0",
    translate: "yes",
    enableToolbar: true,
    showToolbar: true,
    placeholder: "Entrez le texte ici...",
    defaultParagraphSeparator: "",
    defaultFontName: "",
    defaultFontSize: "",
    fonts: [
      { class: "arial", name: "Arial" },
      { class: "times-new-roman", name: "Times New Roman" },
      { class: "calibri", name: "Calibri" },
      { class: "comic-sans-ms", name: "Comic Sans MS" },
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: "redText",
        class: "redText",
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
    sanitize: true,
    toolbarPosition: "top",
    toolbarHiddenButtons: [["bold", "italic"], ["fontSize"]],
  };
  name = "ng2-ckeditor";
  ckeConfig: any;
  mycontent: string;
  log: string = "";
  public editorValue: string = "";
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
    //this.getStageCourse();
    $("#trans_error").hide();
    $("#plan_error").hide();
    var titile = document.getElementsByClassName("brand");
    if (titile) titile[0].innerHTML = "Stage";
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: "divarea",
      language: "fr",
      defaultLanguage: "fr",
    };

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

    // let textare2 = document.getElementById("exampleFormControlTextarea2") as HTMLTextAreaElement;
    // textare2.setAttribute("disabled", "true");

    let elebebtn = document.querySelector("#enableBtn") as HTMLElement;
    elebebtn.style.display = "inline";

    elebebtn.setAttribute("data-toggle", "modal");

    let icancel = document.querySelector("#cancel") as HTMLElement;
    icancel.style.display = "none";

    let Enregistrer = document.querySelector("#Enregistrer") as HTMLElement;
    Enregistrer.style.display = "none";
    window.scrollTo(0, 0);
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

  onSubmit(res) {
    if (res.from_date.toString().indexOf("T") >= 0) {
      var changeFromDate = this.formatDate(res.from_date);
      res.from_date = changeFromDate;
    }
    if (res.to_date.toString().indexOf("T") >= 0) {
      var changeToDate = this.formatDate(res.to_date);
      res.to_date = changeToDate;
    }
    this.spinner.show();
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
              transport = transport + ", " + modechild.nodeValue.trim();
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
      if (jsonData.Price == "") {
        jsonData.Price = 0;
      }
      res = jsonData;

      if (res.Mode_of_transport == "") {
        this.trans_error = true;
        $("#trans_error").show();
      } else if (res.Plan == "") {
        $("#plan_error").show();
        this.plan_error = true;
      }

      if (this.trans_error == false && this.plan_error == false) {
        console.log("api", res);

        this.appService
          .create("/course/setstagecourseinsert", res)
          .subscribe((response) => {
            this.spinner.hide();
            if (response && response.isSuccess == true) {
              this.setform();
              this._showAlertMessage(
                "alert-success",
                "Mise à jour avec succés"
              );
              window.scrollTo(0, 0);
            } else {
              this.spinner.hide();
              this._showAlertMessage("alert-danger", "Échec de la mise à jour");
            }
          });
      } else {
        this.spinner.hide();
      }
    }
  }

  formatDate(date) {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    var day = ("0" + date.getDate()).slice(-2);
    var monthIndex = ("0" + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();

    return year + "-" + monthIndex + "-" + day;
  }

  getStageCourse() {
    this.spinner.show();
    var selectedPlan: any;
    var selectedTransport: any;
    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    var coach1 = JSON.parse(coach);
    var coachid = {
      coachId: coach1.id,
    };
    this.appService
      .getAll("/course/getstagecourse", coachid)
      .subscribe((response) => {
        //console.log(response);
        if ((response as any).data) {
          if ((response as any).data.course.length > 0) {
            if (response && response["data"]) {
              this.res = (response as any).data.course[0];
              this.res.from_date = this.formatDate(
                new Date((response as any).data.course[0].from_date)
              );
              console.log(this.res.from_date);
              this.res.to_date = this.formatDate(
                new Date((response as any).data.course[0].to_date)
              );
              console.log(this.res.to_date);
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
        } else {
          this.spinner.hide();
        }
      });
  }

  onChange($event: any): void {
    console.log("onChange");
  }

  onPaste($event: any): void {
    console.log("onPaste");
  }

  propagateChange = (result, file, type) => {
    this.res.Photo = result;
    this.res.filename = file.name;
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
      this.propagateChange(reader.result, file, file.type);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  download() {
    if (this.res.Photo) {
      var blob = this.dataURLtoBlob(this.res.Photo);
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = this.res.filename;
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
      type: mime,
    });
  }

  setform() {
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

    // let textare2 = document.getElementById("exampleFormControlTextarea2") as HTMLTextAreaElement;
    // textare2.setAttribute("disabled", "true");

    let elebebtn = document.querySelector("#enableBtn") as HTMLElement;
    elebebtn.style.display = "inline";

    elebebtn.setAttribute("data-toggle", "modal");

    let icancel = document.querySelector("#cancel") as HTMLElement;
    icancel.style.display = "none";

    let Enregistrer = document.querySelector("#Enregistrer") as HTMLElement;
    Enregistrer.style.display = "none";
  }
}
