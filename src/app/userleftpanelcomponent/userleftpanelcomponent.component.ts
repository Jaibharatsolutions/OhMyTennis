import { Component, OnInit, AfterViewChecked } from "@angular/core";
import { Location } from "@angular/common";
import { BrowserModule, Title, Meta } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
/* [ Spinner ] */
import { NgxSpinnerService } from "ngx-spinner";
import { UserComponent } from "../model/user/user.component";
import { AppService } from "../shared/app.service";

@Component({
  selector: "app-userleftpanelcomponent",
  templateUrl: "./userleftpanelcomponent.component.html",
  styleUrls: ["./userleftpanelcomponent.component.scss"],
})
export class UserleftpanelcomponentComponent
  extends UserComponent
  implements OnInit
{
  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    appService: AppService,
    location: Location,
    spinner: NgxSpinnerService
  ) {
    super(activatedRoute, router, appService, location, spinner);
  }

  public username: any;
  public image = "https://www.w3schools.com/howto/img_avatar.png";
  roleid: any;
  count_id: number;

  capitalizeFLetter(name) {
    return name[0].toUpperCase() + name.slice(1);
  }
  ngOnInit() {
    this.getBookingDetails();
    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    if (coach) {
      var coach1 = JSON.parse(coach);
      if (coach1.roleId == 1) {
        this.spinner.show();
        var useremail = {
          User_Email: coach1.email,
        };
        this.appService
          .create("/user/getuserbyid", useremail)
          .subscribe((data: any) => {
            if (data.isSuccess == true) {
              this.image = data.data.User_list[0].User_Image;
              console.log(this.image);
              if (this.image == null) {
                this.image = "https://www.w3schools.com/howto/img_avatar.png";
              }

              this.spinner.hide();
            } else {
              this.spinner.hide();
            }
          });
      } else if (coach1.roleId == 2) {
        this.spinner.show();
        var Coach_Email = {
          Coach_Email: coach1.Coach_Email,
        };
        this.appService
          .create("/coach/getcoachbyid", Coach_Email)
          .subscribe((data: any) => {
            if (data.isSuccess == true) {
              this.image = data.data.coach_list[0].Coach_Image;
              if (this.image == null)
                this.image =
                  "https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png";
              console.log(this.image);
              this.spinner.hide();
            } else {
              this.spinner.hide();
            }
          });
      }
      if (coach1.firstName + " " + coach1.lastName)
        this.username = this.capitalizeFLetter(
          coach1.firstName + " " + coach1.lastName
        );
    }
  }

  getBookingDetails() {
    var coach = JSON.parse(localStorage.getItem("onmytennis"));

    if (coach) {
      var coach1 = JSON.parse(coach);

      this.roleid = coach1.roleId;
      //console.log('coach Id ' + JSON.stringify(coach1.id));
      if (coach1.roleId == 1) {
        var userdetails = {
          user_Id: coach1.id,
        };

        this.appService
          .getAll("/user/getallbookings", userdetails)
          .subscribe((response) => {
            if (response && response["data"]) {
              this.count_id = response["data"].length;
            }
          });
      }
    }
  }

  bookingclick() {
    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    if (coach) {
      var coach1 = JSON.parse(coach);
      this.roleid = coach1.roleId;

      if (this.roleid == 1) {
        var coachdetails = {
          markread: 1,
          user_Id: coach1.id,
        };
        this.appService
          .create("/user/updateallBookings", coachdetails)
          .subscribe((response: any) => {
            if (response && response["data"]) {
              //this.count_id = response["data"].length;
            }
          });
      }
    }
  }

  _logout() {
    this._setSession("removeItem");
    this._gotoPath("/");
  }

  _delete_account() {
    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    if (coach) {
      var coach1 = JSON.parse(coach);
      var emailId = {
        email: coach1.email,
      };
      this.spinner.show();

      this.appService
        .create("/user/accountdeletebyemail", emailId)
        .subscribe((data: any) => {
          if (data.isSuccess == true) {
            this.spinner.hide();
            this._setSession("removeItem");
            this._gotoPath("/");
          } else {
            this.spinner.hide();
          }
        });
    }
  }

  leftPanel() {
    return [
      {
        title: "TABLEAU DE BORD",
        path:
          "/" +
          this._const("PATH.USERS.SELF") +
          "/" +
          this._const("PATH.USERS.DASHBOARD.SELF"),
        iclass: "far far-th-large",
        style: false,
      },
      {
        title: "MON COMPTE",
        path:
          "/" +
          this._const("PATH.USERS.SELF") +
          "/" +
          this._const("PATH.USERS.PROFILE.SELF"),
        iclass: "far far-user-o",
        style: false,
      },
      {
        title: "MES RÉSERVATIONS",
        path:
          "/" +
          this._const("PATH.USERS.SELF") +
          "/" +
          this._const("PATH.USERS.RESERVATION.SELF"),
        iclass: "far far-reser-o noti",
        style: false,
      },
      // {
      //   title: "NOTIFICATIONS",
      //   path:
      //     "/" +
      //     this._const("PATH.USERS.SELF") +
      //     "/" +
      //     this._const("PATH.USERS.NOTIFICATION.SELF"),
      //   iclass: "far far-bell-o",
      //   style: false
      // },
      {
        title: "AVIS ET COMMENTAIRES",
        path:
          "/" +
          this._const("PATH.USERS.SELF") +
          "/" +
          this._const("PATH.USERS.REVIEWS.SELF"),
        iclass: "far far-comments-o",
        style: false,
      },
      {
        title: "PARTENAIRE",
        path:
          "/" +
          this._const("PATH.USERS.SELF") +
          "/" +
          this._const("PATH.USERS.PARTNER.SELF"),
        iclass: "far far-handshake-o",
        style: true,
      },
      {
        title: "SPARRING",
        path:
          "/" +
          this._const("PATH.USERS.SELF") +
          "/" +
          this._const("PATH.USERS.SPARRING.SELF"),
        iclass: "far far-cogs-o",
        style: true,
      },
      {
        title: "CHANGER MOT DE PASSE",
        path:
          "/" +
          this._const("PATH.USERS.SELF") +
          "/" +
          this._const("PATH.USERS.CHANGEPASSWORD.SELF"),
        iclass: "far far-key-o",
        style: false,
      },
      {
        title: "SUPPRIMER MOT DE PASSE",
        path:
          "/" +
          this._const("PATH.USERS.SELF") +
          "/" +
          this._const("PATH.USERS.DELETE_USER_ACCOUNT.SELF"),
        iclass: "far far deleteacc",
        style: false,
      },
    ];
  }
}
