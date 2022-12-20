
import { Component, OnInit } from "@angular/core";
import { AppService } from "../shared/app.service";
import { from } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from "@angular/router";
import { CoachComponent } from "src/app/model/coach/coach.component";
import { Location } from "@angular/common";
// import { $ } from 'protractor';
import * as $ from "jquery";
//import { getSupportedInputTypes } from "@angular/cdk/platform";
import * as moment from "moment";

@Component({
  selector: 'app-commentaires',
  templateUrl: './commentaires.component.html',
  styleUrls: ['./commentaires.component.scss']
})
export class CommentairesComponent implements OnInit {

  cutomerReviewCollection:any = [];

  constructor(private appService:AppService, private spinner:NgxSpinnerService) { }

  ngOnInit() {

    this.spinner.show();
    this.getReviewDetails();
    
    var titile = document.getElementsByClassName("brand");
    if (titile)
      titile[0].innerHTML = 'COMMENTAIRES';
  }

  getReviewDetails() {

    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    var coach1 = JSON.parse(coach);
    var coachid = {
      Coach_Id: coach1.id
    };

    //console.log('ta ' + JSON.stringify(coachid));
    this.appService.getAll("/user/getallreviews",coachid).subscribe(response => {

      //console.log('ta ' + JSON.stringify(response));

      if(response && response["data"])
      {
        for(var i=0; i < response["data"].length; i++)
        {
         
          this.cutomerReviewCollection.push({
            comments:response["data"][i].comments,
            first_name:response["data"][i].firstName,
            last_name:response["data"][i].lastName,
            course:response["data"][i].course,
            //user_image:response["data"][i].User_Image,
            //today_day: moment(new Date()).format("DD"),
            review_date: moment(response["data"][i].created_at).format("YYYY-MM-DD")
            
          });
         
        }
        //console.log('ta '+ JSON.stringify(this.cutomerReviewCollection));
      }
      this.spinner.hide();
 
    });

  }

}
