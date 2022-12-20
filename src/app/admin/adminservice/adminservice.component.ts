import { Component, OnInit, ViewChild, Input } from "@angular/core";
import {
  FormsModule,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from "@angular/forms";
import { AppService } from "../../shared/app.service";
import { AppComponent } from "../../app.component";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Location } from "@angular/common";
import { FullCalendarComponent } from "@fullcalendar/angular";
import dayGridView from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { AdminComponent } from "./../../model/admin/admin.component";
//import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: "app-adminservice",
  templateUrl: "./adminservice.component.html",
  styleUrls: ["./adminservice.component.scss"],
})
export class AdminserviceComponent extends AppComponent implements OnInit {
  public res = {
    commission_type: "CoursIndividuel",
    commission_percent: "",
    sub_min_amount: "",
    sub_max_amount: "",
    sub_max_percent: "",
  };
  public res1 = {
    commission_type: "CoursCollectifOndemand",
    commission_percent: "",
    sub_min_amount: "",
    sub_max_amount: "",
    sub_max_percent: "",
  };
  public res2 = {
    commission_type: "CoursCollectifClub",
    commission_percent: "",
  };
  public res3 = {
    commission_type: "Stage",
    commission_percent: "",
  };
  public res4 = {
    commission_type: "TeamBuilding",
    commission_percent: "",
  };
  public res5 = {
    commission_type: "Animation",
    commission_percent: "",
  };
  public res6 = {
    commission_type: "Tournoi",
    commission_percent: "",
  };

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
    this.getindividuelservice();
    this.getcollectiveservice();
    this.getcourtservice();
    this.getstageservice();
    this.getteamservice();
    this.getanimationservice();
    this.gettournoiservice();
  }
  onSubmit(res) {
    console.log(res);
    this.appService
      .create("/admin/serviceprovider", res)
      .subscribe((response) => {
        if (response && response.isSuccess == true) {
          this._showAlertMessage("alert-success", "Mise à jour avec succés");
          window.location.reload();
        } else {
          this._showAlertMessage("alert-danger", "Échec de la mise à jour");
        }
      });
  }

  getindividuelservice() {
    var team = [];

    this.spinner.hide();
    this.appService
      .getAll("/admin/individuelservice")
      .subscribe((data: any) => {
        if (data.isSuccess == true) {
          this.spinner.hide();

          $("#individuel_submit").css("display", "none");
          $("#individuel_icon").css("display", "none");
          $("#individuel_edit").css("display", "block");
          $(".indiv_box").prop("readonly", true);
          $("#individuel_update").css("display", "none");
        } else {
          this.spinner.hide();
          $("#individuel_edit").css("display", "none");
          $("#individuel_update").css("display", "none");
          $("#individuel_icon").css("display", "block");
          $(".indiv_box").prop("readonly", false);
          $(".indiv_box").prop("required", true);
        }
        this.res = data.data.service_list[0];
        // team = data.data.service_list[0].service_list.split(",");
        //   if (team.length > 0) {
        //     for (var i = 0; i < team.length; i++) {
        //       if (team[i] !== "") {
        //         var element = <HTMLInputElement>document.getElementById(team[i]);
        //         element.checked = true;
        //       }
        //     }
        //   }
      });
  }

  getcollectiveservice() {
    var team = [];

    this.spinner.hide();
    this.appService
      .getAll("/admin/collectiveservice")
      .subscribe((data: any) => {
        if (data.isSuccess == true) {
          this.spinner.hide();

          $("#collective_submit").css("display", "none");
          $("#collective_icon").css("display", "none");
          $("#collective_edit").css("display", "block");
          $(".collect_box").prop("readonly", true);
          $("#collective_update").css("display", "none");
        } else {
          this.spinner.hide();
          $("#collective_edit").css("display", "none");
          $("#collective_update").css("display", "none");
          $("#collective_icon").css("display", "block");
          $(".collect_box").prop("readonly", false);
          $(".collect_box").prop("required", true);
        }
        this.res1 = data.data.service_list[0];
        // team = data.data.service_list[0].service_list.split(",");
        //   if (team.length > 0) {
        //     for (var i = 0; i < team.length; i++) {
        //       if (team[i] !== "") {
        //         var element = <HTMLInputElement>document.getElementById(team[i]);
        //         element.checked = true;
        //       }
        //     }
        //   }
      });
  }

  getcourtservice() {
    var team = [];

    this.spinner.hide();
    this.appService.getAll("/admin/courtservice").subscribe((data: any) => {
      if (data.isSuccess == true) {
        this.spinner.hide();

        $("#court_submit").css("display", "none");
        $("#court_icon").css("display", "none");
        $("#court_edit").css("display", "block");
        $(".court_box").prop("readonly", true);
        $("#court_update").css("display", "none");
      } else {
        this.spinner.hide();
        $("#court_edit").css("display", "none");
        $("#court_update").css("display", "none");
        $("#court_icon").css("display", "block");
        $(".court_box").prop("readonly", false);
        $(".court_box").prop("required", true);
      }
      this.res2 = data.data.service_list[0];
      // team = data.data.service_list[0].service_list.split(",");
      //   if (team.length > 0) {
      //     for (var i = 0; i < team.length; i++) {
      //       if (team[i] !== "") {
      //         var element = <HTMLInputElement>document.getElementById(team[i]);
      //         element.checked = true;
      //       }
      //     }
      //   }
    });
  }

  getstageservice() {
    var team = [];

    this.spinner.hide();
    this.appService.getAll("/admin/stageservice").subscribe((data: any) => {
      if (data.isSuccess == true) {
        this.spinner.hide();

        $("#stage_submit").css("display", "none");
        $("#stage_icon").css("display", "none");
        $("#stage_edit").css("display", "block");
        $(".stage_box").prop("readonly", true);
        $("#stage_update").css("display", "none");
      } else {
        this.spinner.hide();
        $("#stage_edit").css("display", "none");
        $("#stage_update").css("display", "none");
        $("#stage_icon").css("display", "block");
        $(".stage_box").prop("readonly", false);
        $(".stage_box").prop("required", true);
      }
      this.res3 = data.data.service_list[0];
      // team = data.data.service_list[0].service_list.split(",");
      //   if (team.length > 0) {
      //     for (var i = 0; i < team.length; i++) {
      //       if (team[i] !== "") {
      //         var element = <HTMLInputElement>document.getElementById(team[i]);
      //         element.checked = true;
      //       }
      //     }
      //   }
    });
  }

  getteamservice() {
    var team = [];

    this.spinner.hide();
    this.appService.getAll("/admin/teamservice").subscribe((data: any) => {
      if (data.isSuccess == true) {
        this.spinner.hide();

        $("#team_submit").css("display", "none");
        $("#team_icon").css("display", "none");
        $("#team_edit").css("display", "block");
        $(".team_box").prop("readonly", true);
        $("#team_update").css("display", "none");
      } else {
        this.spinner.hide();
        $("#team_edit").css("display", "none");
        $("#team_update").css("display", "none");
        $("#team_icon").css("display", "block");
        $(".team_box").prop("readonly", false);
        $(".team_box").prop("required", true);
      }
      this.res4 = data.data.service_list[0];
      // team = data.data.service_list[0].service_list.split(",");
      //   if (team.length > 0) {
      //     for (var i = 0; i < team.length; i++) {
      //       if (team[i] !== "") {
      //         var element = <HTMLInputElement>document.getElementById(team[i]);
      //         element.checked = true;
      //       }
      //     }
      //   }
    });
  }

  getanimationservice() {
    var team = [];

    this.spinner.hide();
    this.appService.getAll("/admin/animationservice").subscribe((data: any) => {
      if (data.isSuccess == true) {
        this.spinner.hide();

        $("#animation_submit").css("display", "none");
        $("#animation_icon").css("display", "none");
        $("#animation_edit").css("display", "block");
        $(".animation_box").prop("readonly", true);
        $("#animation_update").css("display", "none");
      } else {
        this.spinner.hide();
        $("#animation_edit").css("display", "none");
        $("#animation_update").css("display", "none");
        $("#animation_icon").css("display", "block");
        $(".animation_box").prop("readonly", false);
        $(".animation_box").prop("required", true);
      }
      this.res5 = data.data.service_list[0];
      // team = data.data.service_list[0].service_list.split(",");
      //   if (team.length > 0) {
      //     for (var i = 0; i < team.length; i++) {
      //       if (team[i] !== "") {
      //         var element = <HTMLInputElement>document.getElementById(team[i]);
      //         element.checked = true;
      //       }
      //     }
      //   }
    });
  }

  gettournoiservice() {
    var team = [];

    this.spinner.hide();
    this.appService.getAll("/admin/tournoiservice").subscribe((data: any) => {
      if (data.isSuccess == true) {
        this.spinner.hide();

        $("#tournoi_submit").css("display", "none");
        $("#tournoi_icon").css("display", "none");
        $("#tournoi_edit").css("display", "block");
        $(".tournoi_box").prop("readonly", true);
        $("#tournoi_update").css("display", "none");
      } else {
        this.spinner.hide();
        $("#tournoi_edit").css("display", "none");
        $("#tournoi_update").css("display", "none");
        $("#tournoi_icon").css("display", "block");
        $(".tournoi_box").prop("readonly", false);
        $(".tournoi_box").prop("required", true);
      }
      this.res6 = data.data.service_list[0];
      // team = data.data.service_list[0].service_list.split(",");
      //   if (team.length > 0) {
      //     for (var i = 0; i < team.length; i++) {
      //       if (team[i] !== "") {
      //         var element = <HTMLInputElement>document.getElementById(team[i]);
      //         element.checked = true;
      //       }
      //     }
      //   }
    });
  }

  makeEnable() {
    $(".indiv_box").prop("readonly", false);
    $(".indiv_box").prop("required", true);
    $("#individuel_update").css("display", "block");
  }

  collectiveEnable() {
    $(".collect_box").prop("readonly", false);
    $(".collect_box").prop("required", true);
    $("#collective_update").css("display", "block");
  }

  courtEnable() {
    $(".court_box").prop("readonly", false);
    $(".court_box").prop("required", true);
    $("#court_update").css("display", "block");
  }

  stageEnable() {
    $(".stage_box").prop("readonly", false);
    $(".stage_box").prop("required", true);
    $("#stage_update").css("display", "block");
  }

  teamEnable() {
    $(".team_box").prop("readonly", false);
    $(".team_box").prop("required", true);
    $("#team_update").css("display", "block");
  }

  animationEnable() {
    $(".animation_box").prop("readonly", false);
    $(".animation_box").prop("required", true);
    $("#animation_update").css("display", "block");
  }

  tournoiEnable() {
    $(".tournoi_box").prop("readonly", false);
    $(".tournoi_box").prop("required", true);
    $("#tournoi_update").css("display", "block");
  }
}
