import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
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
import { AdminComponent } from "./admin.component";
import { AdmindashboardComponent } from "../../admin/admindashboard/admindashboard.component";
import { AdmincoachlistComponent } from "../../admin/admincoachlist/admincoachlist.component";
import { AdminprospectlistComponent } from "../../admin/adminprospectlist/adminprospectlist.component";
import { AdminclublistComponent } from "../../admin/adminclublist/adminclublist.component";
import { AdmincoacheditComponent } from "../../admin/admincoachedit/admincoachedit.component";
import { AdminprospecteditComponent } from "../../admin/adminprospectedit/adminprospectedit.component";
import { ProfileComponent } from "../../coach/profile/profile.component";
//import { ReservationComponent } from '../../coach/reservation/reservation.component';
import { ChangepasswordComponent } from "../../admin/changepassword/changepassword.component";
import { AdminleftpanelComponent } from "../../admin/adminleftpanel/adminleftpanel.component";
import { AdmintopbarComponent } from "../../admin/admintopbar/admintopbar.component";
import { TopNavBarComponent } from "../../coach/top-nav-bar/top-nav-bar.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import { MyCalendarComponent } from "src/app/my-calendar/my-calendar.component";
import { AdminprofileComponent } from "../../admin/adminprofile/adminprofile.component";
import { IndividualCourseComponent } from "src/app/pages/individual-course/individual-course.component";
import { ClubeditComponent } from "../../admin/clubedit/clubedit.component";
import { AdminserviceComponent } from "../../admin/adminservice/adminservice.component";
import { AdminlistComponent } from "../../admin/adminlist/adminlist.component";
import { AdminsaverecordComponent } from "../../admin/adminsaverecord/adminsaverecord.component";
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

import { DataTablesModule } from "angular-datatables";
import { from } from "rxjs";
import { PaymentsComponent } from "src/app/admin/payments/payments.component";
import { PaymentdetailsComponent } from "src/app/admin/payment-details/payment-details.component";
import { PaidComponent } from "src/app/admin/paid-details/paid-details.component";
import { dynamicMenuComponent } from "src/app/admin/dynamicMenu/dynamicMenu.component";
import { dynamicMenuFormComponent } from "src/app/admin/dynamicMenuForm/dynamicMenuForm.component";
import { CKEditorModule } from "ng2-ckeditor";
import { CmsComponent } from "src/app/admin/cms/cms.component";
import { CmsformComponent } from "src/app/admin/cmsform/cmsform.component";
import { TreeViewComponent } from "@syncfusion/ej2-angular-navigations";
import { TreeModule } from "angular-tree-component";

import { AngularEditorModule } from "@kolkov/angular-editor";
import { editDynamicMenuComponent } from "src/app/admin/editDynamicMenu/editDynamicMenu.component";
const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    data: {
      title: "admin"
    },
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "dashboard"
      },
      {
        path: CONST.PATH.ADMIN.DASHBOARD.SELF,
        component: AdmindashboardComponent,
        data: {
          title: CONST.PATH.ADMIN.DASHBOARD.TITLE
        }
      },
      {
        path: CONST.PATH.ADMIN.PROSPECTUSLIST.SELF,
        component: AdminprospectlistComponent,
        data: {
          title: CONST.PATH.ADMIN.PROSPECTUSLIST.TITLE
        }
      },
      {
        path: CONST.PATH.ADMIN.ADMINPROFILE.SELF,
        component: AdminprofileComponent,
        data: {
          title: CONST.PATH.ADMIN.ADMINPROFILE.TITLE
        }
      },
      {
        path: CONST.PATH.ADMIN.ADMINCHANGEPASS.SELF,
        component: ChangepasswordComponent,
        data: {
          title: CONST.PATH.ADMIN.ADMINCHANGEPASS.TITLE
        }
      },
      {
        path: CONST.PATH.ADMIN.CLUBLIST.SELF,
        component: AdminclublistComponent,
        data: {
          title: CONST.PATH.ADMIN.CLUBLIST.TITLE
        }
      },
      {
        path: CONST.PATH.ADMIN.COACHLIST.SELF,
        component: AdmincoachlistComponent,
        data: {
          title: CONST.PATH.ADMIN.COACHLIST.TITLE
        }
      },
      {
        path: CONST.PATH.ADMIN.COACHEDIT.SELF,
        component: AdmincoacheditComponent,
        data: {
          title: CONST.PATH.ADMIN.COACHEDIT.TITLE
        }
      },
      {
        path: CONST.PATH.ADMIN.PROSPECTEDIT.SELF,
        component: AdminprospecteditComponent,
        data: {
          title: CONST.PATH.ADMIN.PROSPECTEDIT.TITLE
        }
      },
      {
        path: CONST.PATH.ADMIN.CLUBEDIT.SELF,
        component: ClubeditComponent,
        data: {
          title: CONST.PATH.ADMIN.CLUBEDIT.TITLE
        }
      },
      {
        path: CONST.PATH.ADMIN.ADMINSERVICE.SELF,
        component: AdminserviceComponent,
        data: {
          title: CONST.PATH.ADMIN.ADMINSERVICE.TITLE
        }
      },
      {
        path: CONST.PATH.ADMIN.ADIMLIST.SELF,
        component: AdminlistComponent,
        data: {
          title: CONST.PATH.ADMIN.ADIMLIST.TITLE
        }
      },
      {
        path: CONST.PATH.ADMIN.ADMINEDIT.SELF,
        component: AdminsaverecordComponent,
        data: {
          title: CONST.PATH.ADMIN.ADMINEDIT.TITLE
        }
      },
      {
        path: CONST.PATH.ADMIN.ADMINCREATE.SELF,
        component: AdminsaverecordComponent,
        data: {
          title: CONST.PATH.ADMIN.ADMINCREATE.TITLE
        }
      },
      {
        path: CONST.PATH.ADMIN.PAYMENTS.SELF,
        component: PaymentsComponent,
        data: {
          title: CONST.PATH.ADMIN.PAYMENTS.TITLE
        }
      },
      {
        path: CONST.PATH.ADMIN.PAYMENTSDETAILS.SELF,
        component: PaymentdetailsComponent,
        data: {
          title: CONST.PATH.ADMIN.PAYMENTSDETAILS.TITLE
        }
      },
      {
        path: CONST.PATH.ADMIN.PAID.SELF,
        component: PaidComponent,
        data: {
          title: CONST.PATH.ADMIN.PAID.TITLE
        }
      },
      {
        path: CONST.PATH.ADMIN.DYNAMICMENU.SELF,
        component: dynamicMenuComponent,
        data: {
          title: CONST.PATH.ADMIN.DYNAMICMENU.TITLE
        }
      },
      {
        path: CONST.PATH.ADMIN.DYNAMICMENUFORM.SELF,
        component: dynamicMenuFormComponent,
        data: {
          title: CONST.PATH.ADMIN.DYNAMICMENUFORM.TITLE
        }
      },
      {
        path: CONST.PATH.ADMIN.EDITDYNAMICMENUFORM.SELF,
        component: editDynamicMenuComponent,
        data: {
          title: CONST.PATH.ADMIN.EDITDYNAMICMENUFORM.TITLE
        }
      },
      {
        path: CONST.PATH.ADMIN.CMS.SELF,
        component: CmsComponent,
        data: {
          title: CONST.PATH.ADMIN.CMS.TITLE
        }
      },
      {
        path: CONST.PATH.ADMIN.CMSFORM.SELF,
        component: CmsformComponent,
        data: {
          title: CONST.PATH.ADMIN.CMSFORM.TITLE
        }
      }
    ]
  }
];

@NgModule({
  declarations: [
    AdminComponent,
    /* DetailComponent,
    TimeSlotComponent,
    SummaryComponent, */
    AdmindashboardComponent,
    ProfileComponent,
    MyCalendarComponent,
    AdminprofileComponent,
    //ReservationComponent,
    AdminleftpanelComponent,
    AdmintopbarComponent,
    AdmincoachlistComponent,
    ChangepasswordComponent,
    AdminprospectlistComponent,
    AdminclublistComponent,
    IndividualCourseComponent,
    TopNavBarComponent,
    AdmincoacheditComponent,
    AdminprospecteditComponent,
    ClubeditComponent,
    AdminserviceComponent,
    AdminlistComponent,
    AdminsaverecordComponent,
    PaymentsComponent,
    PaymentdetailsComponent,
    PaidComponent,
    dynamicMenuComponent,
    dynamicMenuFormComponent,
    CmsComponent,
    CmsformComponent,
    TreeViewComponent,
    editDynamicMenuComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    FullCalendarModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    AppSharedModule,
    RouterModule.forChild(routes),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CKEditorModule,
    //TreeViewModule,
    TreeModule.forRoot(),
    AngularEditorModule
  ],
  providers: [{ provide: OWL_DATE_TIME_LOCALE, useValue: "fr" }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule {}
