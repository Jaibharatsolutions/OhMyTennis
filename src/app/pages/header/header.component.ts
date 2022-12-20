import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Location } from '@angular/common';
import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppService } from '../../shared/app.service';
import { AppComponent } from '../../app.component';
/* [ Spinner ] */
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends AppComponent implements OnInit {

  public username: any;
  public image = 'https://www.w3schools.com/howto/img_avatar.png';
  public roleid :any =1;
  count_id:number;
  count_coach_id:number;

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

    this.getBookingDetails();

    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    if (coach) {
      var coach1 = JSON.parse(coach);
      this.roleid = coach1.roleId;
      if (coach1.roleId == 1) {

        this.spinner.show();
        var useremail = {
          User_Email: coach1.email
        }
        this.appService.create("/user/getuserbyid", useremail).subscribe((data: any) => {
          if (data.isSuccess == true) {
            this.image = data.data.User_list[0].User_Image;
            if (this.image == "" || this.image == null) {
              this.image = 'https://www.w3schools.com/howto/img_avatar.png';
            }
            this.spinner.hide();
          }
          else {
            this.spinner.hide();
          }
        })
      } else if (coach1.roleId == 2) {
        this.spinner.show();
        var Coach_Email = {
          Coach_Email: coach1.Coach_Email
        }
        this.appService.create("/coach/getcoachbyid", Coach_Email).subscribe((data: any) => {
          if (data.isSuccess == true) {
            if(data.data.coach_list)
            this.image = data.data.coach_list[0].Coach_Image;
            if (this.image == "" || this.image == null) {
              this.image = 'https://www.w3schools.com/howto/img_avatar.png';
            }
            this.spinner.hide();
          }
          else {
            this.spinner.hide();
          }
        })
      }
      if (coach1.firstName + " " + coach1.lastName)
        this.username = this.capitalizeFLetter(coach1.firstName + " " + coach1.lastName);
    }
  }

  getBookingDetails()
  {
    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    
    if (coach) {
      var coach1 = JSON.parse(coach);
      
      this.roleid = coach1.roleId;
      //console.log('coach Id ' + JSON.stringify(coach1.id));
      if (coach1.roleId == 1) {
        
        var userdetails = {
          user_Id: coach1.id
        };
  
        this.appService.getAll("/user/getallbookings",userdetails).subscribe(response => {
  
          if(response && response["data"])
          {
            this.count_id = response["data"].length;
            
          }
     
        });

      }
      else if(coach1.roleId == 2)
      {
        
        var coachdetails = {
          Coach_ID: coach1.id
        };
  
        this.appService.getAll("/user/getallbookings",coachdetails).subscribe(response => {
  
          if(response && response["data"])
          {
            this.count_coach_id = response["data"].length;
            console.log('count ' + JSON.stringify(this.count_coach_id));
          }
     
        });

      }
  }

  }

  bookingCount()
  {
    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    if(coach)
    {
      var coach1 = JSON.parse(coach);
      this.roleid = coach1.roleId;
      if(this.roleid == 1)
      {
        var coachdetails = {
          markreadUser:1,
          user_Id: coach1.id
          
        };
        this.appService.create("/user/updateallBookings", coachdetails).subscribe((response: any) => {
        
  
          if(response && response["data"])
          {
            //this.count_id = response["data"].length;
            
          }
     
        });
      }

      else if(this.roleid == 2)
      {
        var coachDetails = {
          markreadCoach:1,
          Coach_ID: coach1.id
          
        };

        this.appService.create("/user/updateallBookings", coachDetails).subscribe((response: any) => {
        
  
          if(response && response["data"])
          {
            //this.count_id = response["data"].length;
            
          }
     
        });

      }

    }

  }

  capitalizeFLetter(name) {
    return name[0].toUpperCase() +
      name.slice(1);
  }

}
