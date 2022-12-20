import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AppComponent } from "../app.component";
import { Location } from "@angular/common";
import * as L from "leaflet";
declare var ol: any;
@Component({
  selector: "app-clubhouseview",
  templateUrl: "./clubhouseview.component.html",
  styleUrls: ["./clubhouseview.component.scss"]
})
export class ClubhouseviewComponent extends AppComponent implements OnInit {
  public res = {
    court_id: "",
    court_name: "",
    incharge_name: "",
    court_email: "",
    court_phone: "",
    court_postal_code: "",
    court_address: "",
    courtfile: "",
    coordonnees_gps: ""
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
  map: any;
  mapvalues: any;
  lat: any;
  lang: any;
  curentlat: any;
  curentlang: any;
  ngOnInit() {
    this.getcurrentcordinates();
    this.spinner.show();
    var club = JSON.parse(localStorage.getItem("Club"));
    var court_id = {
      court_id: club.court_id
    };

    this.appService
      .create("/admin/getclubbyid", court_id)
      .subscribe((data: any) => {
        if (data.isSuccess == true) {
          console.log(data.data.club_list[0]);
          if (data.data.club_list[0]) {
            this.res = data.data.club_list[0];
            this.mapvalues = eval("[" + this.res["coordonnees_gps"] + "]");
            this.lat = this.mapvalues[0].toFixed(3);
            this.lang = this.mapvalues[1].toFixed(3);
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
              .bindPopup(
                this.res.court_name + "<br> " + this.res.court_address + ""
              )
              .openPopup();
          }
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      });
  }

  getCourt() {}

  async getcurrentcordinates() {
    const resp = await fetch("https://ipapi.co/json/");
    const data = await resp.json();
    this.curentlat = data.latitude.toFixed(3);
    this.curentlang = data.longitude.toFixed(3);
    console.log(this.curentlat, " ", this.curentlang);
  }
}
