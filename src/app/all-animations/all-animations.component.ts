import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../shared/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from '../app.component';
import { Location } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-all-animations',
  templateUrl: './all-animations.component.html',
  styleUrls: ['./all-animations.component.scss']
})
export class AllAnimationsComponent extends AppComponent implements OnInit {

  public service: any;
  public Ville: string = "";
  public Date: string = "";
  public response = [{
    Date: "",
    Month_Year: "",
    Location: "",
    Postalcode: "",
    Coach_Id: "",
    Description: "",
    Price: "",
    from_date: "",
    to_date: "",
    Tournamentname: "",
    Eventdetails: "",
    Mode_of_transport: "",
    Photo: ""
  }]

  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    appService: AppService,
    location: Location,
    spinner: NgxSpinnerService
  ) {
    super(
      activatedRoute,
      router,
      appService,
      location,
      spinner
    );
  }

  ngOnInit() {
    this.getTournamentCourse();    
  }


  getTournamentCourse() {
    this.spinner.show();
    const coach_id = localStorage.getItem("coach_id");
    var course = {
      P_course: 'Tournament',
      coach_id
    }
    this.appService.getAll('/coachdetail/getallcourses', course).subscribe((res) => {
      if (res['isSuccess'] == true) {
        this.response = (res as any).data.event_list;
        for (var i = 0; i < this.response.length; i++) {
          var split = this.formatDate(this.response[i].from_date).split('-');
          this.response[i].Date = split[0];
          this.response[i].Month_Year = split[1];
        }
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    })
  }

  gotoCoach(res) {
    if (localStorage.getItem("onmytennis") !== null) {
      var data = JSON.stringify(res);
      localStorage.setItem("Event", data);
      this.router.navigate(['/tournament-detail'])
    } else {
      this.router.navigate(['/login'])
    }
  }

  searchEvent() {
    this.spinner.show();
    if (this.Date !== "") {
      var data = {
        "P_course": "Tournament",
        "P_date": moment(this.Date).format('YYYY-MM-DD'),
        "P_postalcode": this.Ville,
      }
    }
    else {
      var data = {
        "P_course": "Tournament",
        "P_date": "",
        "P_postalcode": this.Ville,
      }
    }

    this.appService.getAll('/coachdetail/getevent', data).subscribe((data) => {
      if ((data as any).isSuccess == true) {
        this.response = (data as any).data.event_list;
        for (var i = 0; i < this.response.length; i++) {
          var split = this.formatDate(this.response[i].from_date).split('-');
          this.response[i].Date = split[0];
          this.response[i].Month_Year = split[1];
        }
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    })
  }

  formatDate(date) {
    date = moment(date).toDate();
    var monthNames = [
      "January",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var trans = monthNames[monthIndex]
    var year = date.getFullYear();

    return day + '-' + trans;
  }

}
