import { Component, OnInit, AfterViewChecked } from "@angular/core";
import { Location } from "@angular/common";
import { BrowserModule, Title, Meta } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { AppService } from "../../shared/app.service";
import { CoachComponent } from "./../../model/coach/coach.component";
import * as $ from "jquery";
/* [ Spinner ] */
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent extends CoachComponent implements OnInit {
  public res = {
    Coach_Fname: "",
    Coach_Lname: "",
    Coach_Email: "",
    Coach_Phone: "",
    InstagramURL: "",
    FacebookURL: "",
    TwitterURL: "",
    Coach_Description: "",
    Coach_Rayon: 1,
    Coach_Ville: "",
    Coach_Emplacement: "",
    Coach_Price: "",
    Coach_City: "",
    Coach_Services: "",
    Coach_PriceX10: "",
    Coach_Bank_Name: "",
    Coach_Bank_ACCNum: "",
    Branch_Code: "",
    Coach_Bank_City: "",
    Coach_Image: "../../assets/images/profile_blackwhite.png",
    Coach_Resume: "",
  };

  public selectedCity: any = null;
  public cityId: any = "";

  public trans_error: Boolean = false;
  public cheque_error: Boolean = false;
  image: any;
  public activeTabIndex = 0;
  public submit_disabled = true;
  public response: any;
  public filename: string = "";
  selectedFile: File;

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
    $("#trans_error").hide();
    $("#cheque_error").hide();
    var titile = document.getElementsByClassName("brand");
    if (titile) titile[0].innerHTML = "MON COMPTE";

    this.profileUpdate();
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.onUpload();
  }

  private onUpload() {
    const fd = new FormData();
    fd.append("myfile", this.selectedFile);
    console.log(fd);
  }

  propagateChange = (result, file, type) => {
    var docx =
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    var doc = "application/msword";
    if (type == "application/pdf" || type == docx || type == doc) {
      this.res.Coach_Resume = result;
      this.filename = file.name;
    } else {
      this.res.Coach_Image = result;
    }
  };

  changeListener($event): void {
    console.log("changeListener");
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.propagateChange(reader.result, file, file.type);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  profileTabs() {
    return [
      {
        title: "Informations personnelles",
      },
      {
        title: "Ensemble de compétences",
      },
      {
        title: "Détails de la transaction",
      },
    ];
  }

  changeTabs(e, i) {
    this.activeTabIndex = i;
  }

  makeEnable() {
    $(".form-group :input").prop("readonly", false);
    $(".form-group :input").prop("required", true);
    $("#submit").prop("readonly", false);
    this.submit_disabled = false;
    $("#email").prop("disabled", true);
    $("#Coach_Resume").prop("disabled", false);
    $("#submit").prop("readonly", false);
    $("#submit1").prop("readonly", false);
    $("#submit2").prop("readonly", false);
  }

  searchCity(e) {
    if (e && e.target.value) {
      this.appService.getAll("/city/" + e.target.value).subscribe(
        (response) => {
          // tslint:disable-next-line:no-string-literal
          if (response && response["data"]) {
            // tslint:disable-next-line:no-string-literal
            this.selectedCity = (response as any).data.city_list;

            if (this.selectedCity.length > 0)
              this.res.Coach_Ville = this.selectedCity[0].id;
          }
        },
        (error) => {}
      );
    }
  }

  citySearch(code) {
    this.appService.getAll("/city/" + code).subscribe(
      (response) => {
        // tslint:disable-next-line:no-string-literal
        if (response && response["data"]) {
          // tslint:disable-next-line:no-string-literal
          this.selectedCity = (response as any).data.city_list;

          if (this.selectedCity.length > 0)
            this.res.Coach_Ville = this.selectedCity[0].id;
        }
      },
      (error) => {}
    );
  }

  onSubmit(res) {
    //console.log("[profile.components.ts - line - 147]", res);
    $("#trans_error").hide();
    $("#cheque_error").hide();
    this.trans_error = false;
    this.cheque_error = false;
    var service = "";
    var transport = "";
    var payment = "";
    let formInputItem = document
      .querySelectorAll(".tab_accordian")[0]
      .querySelectorAll("input");
    formInputItem.forEach(function (inputElement) {
      let mode = inputElement as HTMLInputElement;
      if (mode.type == "checkbox") {
        if (mode.checked == true) {
          let modechild = mode as HTMLElement;
          if (modechild.getAttribute("name") == "payment") {
            payment = payment + "," + modechild.getAttribute("id");
          } else if (modechild.getAttribute("name") == "service") {
            service = service + "," + modechild.getAttribute("id");
          } else if (modechild.getAttribute("name") == "transport") {
            transport = transport + "," + modechild.getAttribute("id");
          }
        }
      }
    });
    //transport
    if (transport[0] == ",") {
      res.Coach_transport = transport.substring(1);
    } else {
      res.Coach_transport = transport;
    }

    //payment
    if (payment[0] == ",") {
      res.Coach_payment_type = payment.substring(1);
    } else {
      res.Coach_payment_type = payment;
    }

    //service
    if (service[0] == ",") {
      res.Coach_Services = service.substring(1);
    } else {
      res.Coach_Services = service;
    }

    //console.log("[profile.component.ts - line 194]", res.Coach_Services);

    res.ResumeName = this.filename;
    //console.log("[profile.component.ts - line 197]", res.Coach_transport);
    // if (res.Coach_transport == "") {
    //   this.trans_error = true;
    //   $("#trans_error").show();
    // } else if (res.Coach_payment_type == "") {
    //   $("#cheque_error").show();
    //   this.cheque_error = true;
    // }

    //console.log("[profile.component.ts - line 206]", this.activeTabIndex);
    if (this.activeTabIndex == 1) {
      //this.activeTabIndex = this.activeTabIndex + 1;
      if (res.Coach_transport == "") {
        this.trans_error = true;
        $("#trans_error").show();
      }
      if (this.activeTabIndex == 1 && this.trans_error == false) {
        this.appService
          .create("/coach/updateProfileTab2", res)
          .subscribe((response) => {
            if (response && response.isSuccess == true) {
              if (this.activeTabIndex == 1) {
                //this.activeTabIndex = this.activeTabIndex + 1;
                this._showAlertMessage(
                  "alert-success",
                  "Mise à jour avec succés"
                );
              }
            } else {
              this._showAlertMessage("alert-danger", "Échec de la mise à jour");
            }
          });
      } else {
        this._showAlertMessage(
          "alert-danger",
          "champ obligatoire ne peut pas être vide"
        );
        this.spinner.hide();
      }
    } else if (this.activeTabIndex == 0) {
      //this.activeTabIndex = this.activeTabIndex + 1;
      this.appService
        .create("/coach/updateprofile", res)
        .subscribe((response) => {
          if (response && response.isSuccess == true) {
            if (this.activeTabIndex == 0) {
              //this.activeTabIndex = this.activeTabIndex + 1;
              this._showAlertMessage(
                "alert-success",
                "Mise à jour avec succés"
              );
            }
          } else {
            this._showAlertMessage("alert-danger", "Échec de la mise à jour");
          }
        });
    } else if (this.activeTabIndex == 2) {
      if (res.Coach_payment_type == "") {
        $("#cheque_error").show();
        this.cheque_error = true;
      }
      if (this.activeTabIndex == 2 && this.cheque_error == false) {
        this.appService
          .create("/coach/updateProfileTab3", res)
          .subscribe((response) => {
            if (response && response.isSuccess == true) {
              if (this.activeTabIndex == 2) {
                //this.activeTabIndex = this.activeTabIndex + 1;
                this._showAlertMessage(
                  "alert-success",
                  "Mise à jour avec succés"
                );
              }
            } else {
              this._showAlertMessage("alert-danger", "Échec de la mise à jour");
            }
          });
      } else {
        this._showAlertMessage(
          "alert-danger",
          "champ obligatoire ne peut pas être vide"
        );
        this.spinner.hide();
      }
    }
    // else {
    //   this._showAlertMessage(
    //     "alert-danger",
    //     "champ obligatoire ne peut pas être vide"
    //   );
    //   this.spinner.hide();
    // }
  }

  profileUpdate() {
    var selectedServicesList = [];
    var selectedTransportList = [];
    var selectedPaymentList = [];

    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    var coach1 = JSON.parse(coach);
    var coachemail = {
      Coach_Email: coach1.email,
    };

    setTimeout(() => {
      this.spinner.show();
      this.appService
        .create("/coach/get_coach_by_id", coachemail)
        .subscribe((data: any) => {
          if (data.isSuccess == true) {
            this.spinner.hide();
          } else {
            this.spinner.hide();
          }

          let codePostal = data.data.coach_list[0].Coach_City;
          this.citySearch(codePostal);
          //console.log(codePostal);
          this.response = data.data.coach_list[0];
          this.res = data.data.coach_list[0];
          //console.log("res", this.res)
          if (this.res.Coach_Image == null) {
            this.res.Coach_Image = "../../assets/images/profile_blackwhite.png";
          }
          this.filename = data.data.coach_list[0].ResumeName;
          selectedServicesList =
            data.data.coach_list[0].Coach_Services.split(",");
          selectedTransportList =
            data.data.coach_list[0].Coach_transport.split(",");
          selectedPaymentList =
            data.data.coach_list[0].Coach_payment_type.split(",");
          if (selectedServicesList.length > 0) {
            for (var i = 0; i < selectedServicesList.length; i++) {
              if (selectedServicesList[i] !== "") {
                var element = <HTMLInputElement>(
                  document.getElementById(selectedServicesList[i])
                );
                element.checked = true;
              }
            }
          }
          if (selectedTransportList.length > 0) {
            for (var i = 0; i < selectedTransportList.length; i++) {
              if (selectedTransportList[i] !== "") {
                var ele = <HTMLInputElement>(
                  document.getElementById(selectedTransportList[i])
                );
                if (ele != null) {
                  ele.checked = true;
                }
              }
            }
          }
          if (selectedPaymentList.length > 0) {
            for (var i = 0; i < selectedPaymentList.length; i++) {
              if (selectedPaymentList[i] !== "") {
                var elem = <HTMLInputElement>(
                  document.getElementById(selectedPaymentList[i])
                );
                elem.checked = true;
              }
            }
          }
        });
    }, 1000);
  }

  download() {
    if (this.res.Coach_Resume) {
      var blob = this.dataURLtoBlob(this.res.Coach_Resume);
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = this.filename;
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
}
