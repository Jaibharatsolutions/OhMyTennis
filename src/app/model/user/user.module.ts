import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { NgxPaginationModule } from "ngx-pagination";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  ActivatedRoute,
  NavigationEnd,
  Routes,
  RouterModule,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterState,
  ParamMap
} from "@angular/router";
import {
  FormsModule,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormArray
} from "@angular/forms";
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from "@angular/common/http";

/* [ Shared Module ] */
import { AppSharedModule } from "./../../shared/app.shared.module";
/* [ Constant ] */
import { CONST } from "../../shared/app.constant";
import { UserComponent } from "./user.component";
import { UserdashboardComponent } from "src/app/userdashboard/userdashboard.component";
import { UserheaderComponent } from "src/app/userheader/userheader.component";
import { UserleftpanelcomponentComponent } from "src/app/userleftpanelcomponent/userleftpanelcomponent.component";
import { UsertopnavbarComponent } from "src/app/usertopnavbar/usertopnavbar.component";
import { UserreservationComponent } from "src/app/userreservation/userreservation.component";
import { UserprofileComponent } from "src/app/userprofile/userprofile.component";
import { UserreviewComponent } from "src/app/userreview/userreview.component";
import { UserparterComponent } from "src/app/userparter/userparter.component";
import { UsersparringComponent } from "src/app/usersparring/usersparring.component";
import { UserchangepasswordComponent } from "src/app/userchangepassword/userchangepassword.component";
import { UsersignoutComponent } from "src/app/usersignout/usersignout.component";
import { UsernotificationComponent } from "src/app/usernotification/usernotification.component";
import { DeleteUserAccountComponent } from "src/app/pages/delete-user-account/delete-user-account.component";

const routes: Routes = [
  {
    path: "",
    component: UserComponent,
    data: {
      title: "User"
    },
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "userdashboard"
      },
      {
        path: CONST.PATH.USERS.DASHBOARD.SELF,
        component: UserdashboardComponent,
        data: {
          title: CONST.PATH.USERS.DASHBOARD.TITLE
        }
      },
      {
        path: CONST.PATH.USERS.PROFILE.SELF,
        component: UserprofileComponent,
        data: {
          title: CONST.PATH.USERS.PROFILE.TITLE
        }
      },
      {
        path: CONST.PATH.USERS.RESERVATION.SELF,
        component: UserreservationComponent,
        data: {
          title: CONST.PATH.USERS.RESERVATION.TITLE
        }
      },
      {
        path: CONST.PATH.USERS.NOTIFICATION.SELF,
        component: UsernotificationComponent,
        data: {
          title: CONST.PATH.USERS.NOTIFICATION.TITLE
        }
      },
      {
        path: CONST.PATH.USERS.REVIEWS.SELF,
        component: UserreviewComponent,
        data: {
          title: CONST.PATH.USERS.REVIEWS.TITLE
        }
      },
      {
        path: CONST.PATH.USERS.PARTNER.SELF,
        component: UserparterComponent,
        data: {
          title: CONST.PATH.USERS.PARTNER.TITLE
        }
      },
      {
        path: CONST.PATH.USERS.SPARRING.SELF,
        component: UsersparringComponent,
        data: {
          title: CONST.PATH.USERS.SPARRING.TITLE
        }
      },
      {
        path: CONST.PATH.USERS.CHANGEPASSWORD.SELF,
        component: UserchangepasswordComponent,
        data: {
          title: CONST.PATH.USERS.CHANGEPASSWORD.TITLE
        }
      },
      {
        path: CONST.PATH.USERS.DELETE_USER_ACCOUNT.SELF,
        component: DeleteUserAccountComponent,
        data: {
          title: CONST.PATH.USERS.DELETE_USER_ACCOUNT.TITLE
        }
      },
      {
        path: "**",
        component: UserdashboardComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    UserComponent,
    UserdashboardComponent,
    UsertopnavbarComponent,
    UserheaderComponent,
    UserleftpanelcomponentComponent,
    UserreservationComponent,
    UserprofileComponent,
    UserreviewComponent,
    UserparterComponent,
    UsersparringComponent,
    UserchangepasswordComponent,
    UsersignoutComponent,
    UsernotificationComponent,
    DeleteUserAccountComponent
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppSharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [UserleftpanelcomponentComponent, UsertopnavbarComponent]
})
export class UserModule {}
