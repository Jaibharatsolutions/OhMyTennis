import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxPaginationModule } from "ngx-pagination";
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
import { CoachComponent } from "./coach.component";
import { DashboardComponent } from "../../coach/dashboard/dashboard.component";
import { ProfileComponent } from "../../coach/profile/profile.component";
import { ReservationComponent } from "../../coach/reservation/reservation.component";
import { LeftpanelComponent } from "../../coach/leftpanel/leftpanel.component";
import { TopNavBarComponent } from "../../coach/top-nav-bar/top-nav-bar.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import { MyCalendarComponent } from "src/app/my-calendar/my-calendar.component";
import { IndividualCourseComponent } from "src/app/pages/individual-course/individual-course.component";
import { CourseCollectionComponent } from "src/app/coach/course-collection/course-collection.component";
import { CourseonClubComponent } from "src/app/courseon-club/courseon-club.component";
import {
  OWL_DATE_TIME_LOCALE,
  OwlDateTimeModule,
  OwlNativeDateTimeModule
} from "ng-pick-datetime";
import { StageComponent } from "src/app/stage/stage.component";
import { TeamBuildingComponent } from "src/app/team-building/team-building.component";
import { AnimationComponent } from "src/app/animation/animation.component";
import { CommentairesComponent } from "src/app/commentaires/commentaires.component";
import { TournamentComponent } from "src/app/tournament/tournament.component";
import { TournamentEditComponent } from "src/app/tournament-edit/tournament-edit.component";
import { StageEditComponent } from "src/app/stage-edit/stage-edit.component";
import { AnimationEditComponent } from "src/app/animation-edit/animation-edit.component";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { CoachPasswordComponent } from "src/app/coach/coach-password/coach-password.component";
import { DeleteAccountComponent } from "src/app/pages/delete-account/delete-account.component";

const routes: Routes = [
  {
    path: "",
    component: CoachComponent,
    data: {
      title: "coach"
    },
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "dashboard"
      },
      {
        path: CONST.PATH.COACH.DASHBOARD.SELF,
        component: DashboardComponent,
        data: {
          title: CONST.PATH.COACH.DASHBOARD.TITLE
        }
      },
      {
        path: CONST.PATH.COACH.PROFILE.SELF,
        component: ProfileComponent,
        data: {
          title: CONST.PATH.COACH.PROFILE.TITLE
        }
      },
      {
        path: CONST.PATH.COACH.MY_CALENDER.SELF,
        component: MyCalendarComponent,
        data: {
          title: CONST.PATH.COACH.MY_CALENDER.TITLE
        }
      },
      {
        path: CONST.PATH.COACH.INDIVIDUAL_COURSE.SELF,
        component: IndividualCourseComponent,
        data: {
          title: CONST.PATH.COACH.INDIVIDUAL_COURSE.TITLE
        }
      },
      {
        path: CONST.PATH.COACH.COURSECOLLECTION.SELF,
        component: CourseCollectionComponent,
        data: {
          title: CONST.PATH.COACH.COURSECOLLECTION.TITLE
        }
      },
      {
        path: CONST.PATH.COACH.COURSECLUB.SELF,
        component: CourseonClubComponent,
        data: {
          title: CONST.PATH.COACH.COURSECLUB.TITLE
        }
      },
      {
        path: CONST.PATH.COACH.RESERVATION.SELF,
        component: ReservationComponent,
        data: {
          title: CONST.PATH.COACH.RESERVATION.TITLE
        }
      },
      {
        path: CONST.PATH.COACH.STAGE.SELF,
        component: StageComponent,
        data: {
          title: CONST.PATH.COACH.STAGE.TITLE
        }
      },
      {
        path: CONST.PATH.COACH.TEAMBUILDING.SELF,
        component: TeamBuildingComponent,
        data: {
          title: CONST.PATH.COACH.TEAMBUILDING.TITLE
        }
      },
      {
        path: CONST.PATH.COACH.ANIMATION.SELF,
        component: AnimationComponent,
        data: {
          title: CONST.PATH.COACH.ANIMATION.TITLE
        }
      },
      {
        path: CONST.PATH.COACH.ANIMATION.SELF,
        component: AnimationComponent,
        data: {
          title: CONST.PATH.COACH.ANIMATION.TITLE
        }
      },
      {
        path: CONST.PATH.COACH.TOURNAMENT.SELF,
        component: TournamentComponent,
        data: {
          title: CONST.PATH.COACH.TOURNAMENT.TITLE
        }
      },
      {
        path: CONST.PATH.COACH.EDITTOURNAMENT.SELF,
        component: TournamentEditComponent,
        data: {
          title: CONST.PATH.COACH.EDITTOURNAMENT.TITLE
        }
      },
      {
        path: CONST.PATH.COACH.COMMENTAIRES.SELF,
        component: CommentairesComponent,
        data: {
          title: CONST.PATH.COACH.COMMENTAIRES.TITLE
        }
      },
      {
        path: CONST.PATH.COACH.EDITSTAGE.SELF,
        component: StageEditComponent,
        data: {
          title: CONST.PATH.COACH.EDITSTAGE.TITLE
        }
      },
      {
        path: CONST.PATH.COACH.EDITANIMATION.SELF,
        component: AnimationEditComponent,
        data: {
          title: CONST.PATH.COACH.EDITANIMATION.TITLE
        }
      },
      {
        path: CONST.PATH.COACH.DELETE_ACCOUNT.SELF,
        component: DeleteAccountComponent,
        data: {
          title: CONST.PATH.COACH.DELETE_ACCOUNT.TITLE
        }
      },
      {
        path: CONST.PATH.COACH.CHANGE_PASSWORD.SELF,
        component: CoachPasswordComponent,
        data: {
          title: CONST.PATH.COACH.CHANGE_PASSWORD.TITLE
        }
      }
    ]
  }
];

@NgModule({
  declarations: [
    CoachComponent,
    /* DetailComponent,
    TimeSlotComponent,
    SummaryComponent, */
    DashboardComponent,
    ProfileComponent,
    MyCalendarComponent,
    ReservationComponent,
    LeftpanelComponent,
    IndividualCourseComponent,
    TopNavBarComponent,
    ReservationComponent,
    CourseCollectionComponent,
    CourseonClubComponent,
    StageComponent,
    TeamBuildingComponent,
    AnimationComponent,
    CommentairesComponent,
    TournamentComponent,
    TournamentEditComponent,
    StageEditComponent,
    AnimationEditComponent,
    DeleteAccountComponent,
    CoachPasswordComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    FullCalendarModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppSharedModule,
    RouterModule.forChild(routes),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AngularEditorModule
  ],
  providers: [{ provide: OWL_DATE_TIME_LOCALE, useValue: "fr" }]
})
export class CoachModule {}
