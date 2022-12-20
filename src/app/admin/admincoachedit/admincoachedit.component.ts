import { Component, OnInit, AfterViewChecked } from "@angular/core";
import { Location } from "@angular/common";
import { BrowserModule, Title, Meta } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { AppService } from "../../shared/app.service";
import { AdminComponent } from "./../../model/admin/admin.component";
import * as $ from "jquery";
/* [ Spinner ] */
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-admincoachedit",
  templateUrl: "./admincoachedit.component.html",
  styleUrls: ["./admincoachedit.component.scss"],
})
export class AdmincoacheditComponent extends AdminComponent implements OnInit {
  public res = {
    Coach_Fname: "",
    Coach_Lname: "",
    Coach_Email: "",
    Coach_Phone: "",
    InstagramURL: "",
    FacebookURL: "",
    TwitterURL: "",
    Coach_Description: "",
    Coach_Rayon: "",
    Coach_Price: "",
    Coach_Services: "",
    Coach_PriceX10: "",
    Coach_Bank_Name: "",
    Coach_Bank_ACCNum: "",
    Branch_Code: "",
    Coach_Bank_City: "",
    Coach_Image:
      "https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png",
    Coach_Resume: "",
  };

  public trans_error: Boolean = false;
  public cheque_error: Boolean = false;
  image: any;
  public activeTabIndex = 0;
  public submit_disabled = true;
  public response: any;
  public filename: string = "";
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
    if (titile) titile[0].innerHTML = "COACH COMPTE";
    this.coachprofileUpdate();
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
    console.log(this.res.Coach_Resume);
  };

  changeListener($event): void {
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
    this.submit_disabled = false;
    $("#email").prop("disabled", true);
    $("#Coach_Resume").prop("disabled", false);
    $("#submit").prop("readonly", false);
    $("#submit1").prop("readonly", false);
    $("#submit2").prop("readonly", false);
  }

  coachprofileUpdate() {
    var selectedServicesList = [];
    var selectedTransportList = [];
    var selectedPaymentList = [];

    const id = this.activatedRoute.snapshot.queryParamMap.get("email");

    var Coach_id = {
      Coach_id: id,
    };
    this.spinner.show();
    this.appService
      .create("/admin/getcoachbyid", Coach_id)
      .subscribe((data: any) => {
        if (data.isSuccess == true) {
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
        //console.log(data);
        this.response = data.data.coach_list[0];
        this.res = data.data.coach_list[0];
        if (this.res.Coach_Image == null) {
          this.res.Coach_Image =
            "https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png";
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
              ele.checked = true;
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
  }

  onSubmit(res) {
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

    res.ResumeName = this.filename;
    if (res.Coach_transport == "") {
      this.trans_error = true;
      $("#trans_error").show();
    } else if (res.Coach_payment_type == "") {
      $("#cheque_error").show();
      this.cheque_error = true;
    }

    if (this.trans_error == false && this.cheque_error == false) {
      this.appService
        .create("/coach/updateprofile", res)
        .subscribe((response) => {
          if (response && response.isSuccess == true) {
            if (this.activeTabIndex < 2)
              this.activeTabIndex = this.activeTabIndex + 1;
            this._showAlertMessage("alert-success", "Mise à jour avec succés");
          } else {
            this._showAlertMessage("alert-danger", "Échec de la mise à jour");
          }
        });
    } else {
      this.spinner.hide();
    }
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

  goBack() {
    this.router.navigate(["/admin/coachlist"], {
      queryParams: {},
    });
  }
}
