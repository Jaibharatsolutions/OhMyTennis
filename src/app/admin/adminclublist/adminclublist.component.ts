import { Component, OnInit, ViewChild, Input } from "@angular/core";
import {
  FormsModule,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormArray
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
import { AdminComponent } from "../../model/admin/admin.component";
//import { ModalDirective } from 'ngx-bootstrap/modal';

declare var $;
@Component({
  selector: "app-adminclublist",
  templateUrl: "./adminclublist.component.html",
  styleUrls: ["./adminclublist.component.scss"]
})
export class AdminclublistComponent extends AdminComponent implements OnInit {
  public res = {
    court_name: "",
    incharge_name: "",
    court_email: "",
    court_phone: "",
    court_postal_code: "",
    court_address: "",
    courtfile: ""
  };
  title = "angulardatatables";
  dtOptions: DataTables.Settings = {};

  datas: [];
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
    this.getCourtData();
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   processing: true
    // };
    setTimeout(function() {
      $("#datatable").DataTable({
        responsive: true
      });
    }, 210);
  }

  onSubmit() {
    this.spinner.show();
    this.appService
      .create("/admin/createcourt", this.res)
      .subscribe(response => {
        if (response && response.isSuccess == true) {
          this._showAlertMessage(
            "alert-success",
            "Court de tennis enregistré avec succès."
          );
          $("#addcoach").hide();
          window.location.reload();
        } else {
          this._showAlertMessage(
            "alert-danger",
            "Impossible de continuer. S'il vous plaît essayer après un certain temps"
          );
          $("#addcoach").hide();
          window.location.reload();
        }
        this.spinner.hide();
      });
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = _event => {
      this.propagateChange(reader.result, file, file.type);
    };
    reader.onerror = function(error) {};
  }

  propagateChange = (result, file, type) => {
    this.res.courtfile = result;
  };

  getCourtData() {
    this.appService.getAll("/admin/getallcourts").subscribe(response => {
      if ((response as any).data.court_list.length > 0) {
        if (response && response["data"]) {
          let dat = (response as any).data.court_list;
          this.datas = dat.map(value => {
            return {
              court_id: value.court_id,
              court_name: value.court_name,
              court_email: value.court_email,
              court_phone: value.court_phone,
              court_address: value.court_address,
              court_postal_code: value.court_postal_code,
              status: value.court_status
            };
          });
        }
      }
    });
  }

  getcourt(id) {
    let court_id = {
      court_id: id
    };
    this.router.navigate(["/admin/clubedit"], {
      queryParams: { Court_id: id }
    });
  }

  changecourtstatus(id) {
    //console.log(id);
    let court_id = {
      court_id: id
    };
    this.appService
      .create("/admin/courtstatustoactive", court_id)
      .subscribe(response => {
        if (response && response.isSuccess == true) {
          window.scrollTo(0, 0);
          this._showAlertMessage("alert-success", "Mise à jour avec succés");
          window.location.reload();
        }
      });
  }
  changecourtstatus1(id) {
    //console.log(id);
    let court_id = {
      court_id: id
    };
    this.appService
      .create("/admin/courtstatustoinactive", court_id)
      .subscribe(response => {
        if (response && response.isSuccess == true) {
          window.scrollTo(0, 0);
          this._showAlertMessage("alert-success", "Mise à jour avec succés");
          window.location.reload();
        }
      });
  }
}
