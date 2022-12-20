import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
// search module
import { Ng2SearchPipeModule } from "ng2-search-filter";
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
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
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
/* [ Spinner ] */
import { NgxSpinnerModule } from "ngx-spinner";
/* [ Token Interceptor ] */
import { AuthInterceptor } from "./shared/auth-interceptor";
import { ResponseInterceptor } from "./shared/response-interceptor";
/* [ Service ] */
import { AppService } from "./shared/app.service";
/* [ Constant ] */
import { CONST } from "./shared/app.constant";
/* [ Shared Module ] */
import { AppSharedModule } from "./shared/app.shared.module";
import { AppComponent } from "./app.component";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { HeaderComponent } from "./pages/header/header.component";
import { FooterComponent } from "./pages/footer/footer.component";
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
// import { TopMenuComponent } from './pages/top-menu/top-menu.component';
import { SocialLoginComponent } from "./pages/social-login/social-login.component";
import { CoachRegisterComponent } from "./pages/coach-register/coach-register.component";
import { UserRegisterComponent } from "./pages/user-register/user-register.component";
import { LoginComponent } from "./pages/login/login.component";
import { ForgotPasswordComponent } from "./pages/forgot-password/forgot-password.component";
import { SetPasswordComponent } from "./pages/set-new-password/set-new-password.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import { NgDatepickerModule } from "ng2-datepicker";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { OhMyCoachComponent } from "./oh-my-coach/oh-my-coach.component";
import { OhMyCoachDetailNewComponent } from "./oh-my-coach-detail-new/oh-my-coach-detail-new.component";
import { CoachDetailComponent } from "./coach-detail/coach-detail.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { XunkCalendarModule } from "xunk-calendar";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { OWL_DATE_TIME_LOCALE } from "ng-pick-datetime";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from "angular-6-social-login";
import { TopMenuComponent } from "./pages/top-menu/top-menu.component";
import { FooterFirstComponent } from "./pages/footer-first/footer-first.component";
import { UsernotificationComponent } from "./usernotification/usernotification.component";
import { UserStageComponent } from "./user-stage/user-stage.component";
import { UserTeambuildingComponent } from "./user-teambuilding/user-teambuilding.component";
import { UserAnimationComponent } from "./user-animation/user-animation.component";
import { UserTournamentComponent } from "./user-tournament/user-tournament.component";
import { UserTournamentDetailComponent } from "./user-tournament-detail/user-tournament-detail.component";
import { UserStageDetailComponent } from "./user-stage-detail/user-stage-detail.component";
import { UserTeambuildingDetailComponent } from "./user-teambuilding-detail/user-teambuilding-detail.component";
import { UserAnimationDetailComponent } from "./user-animation-detail/user-animation-detail.component";
import { AdminloginComponent } from "./admin/adminlogin/adminlogin.component";
import { AdminforgotpasswordComponent } from "./admin/adminforgotpassword/adminforgotpassword.component";
import { ResetpasswordComponent } from "./admin/resetpassword/resetpassword.component";
import { ConceptComponent } from "./pages/concepts/concept/concept.component";
import { PresentationComponent } from "./pages/concepts/presentation/presentation.component";
import { EngagementsComponent } from "./pages/concepts/engagements/engagements.component";
import { LacharteComponent } from "./pages/concepts/lacharte/lacharte.component";
import { InformationsComponent } from "./pages/concepts/informations/informations.component";
import { ConseilsComponent } from "./pages/conseils/conseils/conseils.component";
import { PremierepartieComponent } from "./pages/conseils/premierepartie/premierepartie.component";
import { PremiercoursComponent } from "./pages/conseils/premiercours/premiercours.component";
import { PremiermatchComponent } from "./pages/conseils/premiermatch/premiermatch.component";
import { PremiertournoiComponent } from "./pages/conseils/premiertournoi/premiertournoi.component";
import { DietetiqueComponent } from "./pages/conseils/dietetique/dietetique.component";
import { FormephysiqueComponent } from "./pages/conseils/formephysique/formephysique.component";
import { ChoisirComponent } from "./pages/conseils/choisir/choisir.component";
import { ClubhouseComponent } from "./pages/clubhouse/clubhouse/clubhouse.component";
import { TennisComponent } from "./pages/tennis/tennis/tennis.component";
import { HistoireComponent } from "./pages/histoire/histoire/histoire.component";
import { LexiqueComponent } from "./pages/tennis/lexique/lexique.component";
import { LexiqueatodComponent } from "./pages/tennis/lexiqueatod/lexiqueatod.component";
import { LexiqueetomComponent } from "./pages/tennis/lexiqueetom/lexiqueetom.component";
import { LexiquentoqComponent } from "./pages/tennis/lexiquentoq/lexiquentoq.component";
import { LexiquertozComponent } from "./pages/tennis/lexiquertoz/lexiquertoz.component";
import { ReglesComponent } from "./pages/tennis/regles/regles.component";

import { DimensionsComponent } from "./pages/tennis/dimensions/dimensions.component";
import { ElementsComponent } from "./pages/tennis/elements/elements.component";
import { CompterComponent } from "./pages/tennis/compter/compter.component";
import { PrincipleComponent } from "./pages/tennis/principle/principle.component";
// import { ClubhouselistComponent } from "./clubhouselist/clubhouselist.component";
// import { ClubhouseviewComponent } from "./clubhouseview/clubhouseview.component";
// import { PetticesComponent } from "./pages/clubhouse/pettices/pettices.component";
// import { ParrainerComponent } from "./pages/clubhouse/parrainer/parrainer.component";
// import { JeuxconcourComponent } from "./pages/clubhouse/jeuxconcour/jeuxconcour.component";
// import { QuizComponent } from "./pages/clubhouse/quiz/quiz.component";
import { CharteComponent } from "./pages/concepts/charte/charte.component";
import { HistoireFirstComponent } from "./pages/histoire/histoire-first/histoire-first.component";
import { HistoireFourComponent } from "./pages/histoire/histoire-four/histoire-four.component";
import { HistoireThirdComponent } from "./pages/histoire/histoire-third/histoire-third.component";
import { HistoireSecondComponent } from "./pages/histoire/histoire-second/histoire-second.component";
import { ConseilsMatrielTesterComponent } from "./pages/conseils/conseils-matriel-tester/conseils-matriel-tester.component";
import { OffreDeServiceCoachTennisComponent } from "./pages/offre-de-service-coach-tennis/offre-de-service-coach-tennis.component";
import { OhMyEventNewComponent } from "./oh-my-event-new/oh-my-event-new.component";
//import { CmsComponent } from "./pages/cms/cms.component";
import { OhMyCoachNewComponent } from "./oh-my-coach-new/oh-my-coach-new.component";
import { CguComponent } from "./cgu/cgu.component";
import { CGVComponent } from "./cgv/cgv.component";
import { MentionslegalesComponent } from "./mentionslegales/mentionslegales.component";
// import { OhMyCoachDetailNewComponent } from "./oh-my-coach-detail-new/oh-my-coach-detail-new.component";
import { GuideDesTerrainsPratiqueComponent } from "./guide-des-terrains-pratique/guide-des-terrains-pratique.component";
import { SitemapComponent } from "./sitemap/sitemap.component";
import { PratiqueLicenseComponent } from "./pratique-license/pratique-license.component";
import { CmsFrontComponent } from "./pages/cms/cms-front.component";
import { AllTournamentComponent } from "./all-tournament/all-tournament.component";
import { AllAnimationsComponent } from "./all-animations/all-animations.component";
import { AllStageComponent } from "./all-stage/all-stage.component";
import { AllTeambuildingComponent } from "./all-teambuilding/all-teambuilding.component";

import { CoursDeTennisComponent } from "./cours-de-tennis/cours-de-tennis.component";
import { RecrutementComponent } from "./recrutement/recrutement.component";
import { NewslettersComponent } from "./newsletters/newsletters.component";
import { QuisommenousComponent } from "./quisommenous/quisommenous.component";
import { FaqComponent } from "./faq/faq.component";
import { EnsavoirplusComponent } from "./ensavoirplus/ensavoirplus.component";
import { ContactnewComponent } from "./contactnew/contactnew.component";

import { TermsConditionComponent } from "./terms-condition/terms-condition.component";

registerLocaleData(localeFr, "fr");

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full"
  },
  {
    path: CONST.PATH.COUCH_DETAIL,
    component: CoachDetailComponent
  },
  {
    path: CONST.PATH.LOGIN,
    component: LoginComponent
  },
  {
    path: CONST.PATH.COACH_REGISTER,
    component: CoachRegisterComponent
  },
  {
    path: CONST.PATH.USER_REGISTER,
    component: UserRegisterComponent
  },
  {
    path: CONST.PATH.FORGET_PASSWORD,
    component: ForgotPasswordComponent
  },
  {
    path: CONST.PATH.SET_NEW_PASSWORD,
    component: SetPasswordComponent
  },
  {
    path: CONST.PATH.OH_MY_COACH,
    component: OhMyCoachComponent
  },
  {
    path: CONST.PATH.OH_MY_COACH_NEW,
    component: OhMyCoachNewComponent
  },
  {
    path: CONST.PATH.OH_MY_EVENT_NEW,
    component: OhMyEventNewComponent
  },
  {
    path: CONST.PATH.OH_MY_COACH_DETAIL,
    component: OhMyCoachDetailNewComponent
  },
  {
    path: CONST.PATH.STAGE,
    component: UserStageComponent
  },
  {
    path: CONST.PATH.TOUNAMENT,
    component: UserTournamentComponent
  },
  {
    path: CONST.PATH.ANIMATION,
    component: UserAnimationComponent
  },
  {
    path: CONST.PATH.TEAMBUILDING,
    component: UserTeambuildingComponent
  },
  {
    path: CONST.PATH.STAGE_DETAIL,
    component: UserStageDetailComponent
  },
  {
    path: CONST.PATH.TOUNAMENT_DETAIL,
    component: UserTournamentDetailComponent
  },
  {
    path: CONST.PATH.ANIMATION_DETAIL,
    component: UserAnimationDetailComponent
  },
  {
    path: CONST.PATH.TEAMBUILDING_DETAIL,
    component: UserTeambuildingDetailComponent
  },
  {
    path: CONST.PATH.COACH.SELF,
    loadChildren: () =>
      import("./model/coach/coach.module").then(mod => mod.CoachModule)
  },
  {
    path: CONST.PATH.USER.SELF,
    loadChildren: () =>
      import("./model/user/user.module").then(mod => mod.UserModule)
  },
  {
    path: CONST.PATH.ADMINS.SELF,
    component: AdminloginComponent
  },
  {
    path: CONST.PATH.ADMINS.FORGOT.SELF,
    component: AdminforgotpasswordComponent
  },
  {
    path: CONST.PATH.ADMINS.RESET.SELF,
    component: ResetpasswordComponent
  },
  {
    path: CONST.PATH.ADMIN.SELF,
    loadChildren: () =>
      import("./model/admin/admin.module").then(mod => mod.AdminModule)
  },
  {
    path: CONST.PATH.CONCEPTS.CONCEPT.SELF,
    component: ConceptComponent
  },
  {
    path: CONST.PATH.CONCEPTS.PRESENTATION.SELF,
    component: PresentationComponent
  },
  {
    path: CONST.PATH.CONCEPTS.ENGAGEMENTS.SELF,
    component: EngagementsComponent
  },
  {
    path: CONST.PATH.CONCEPTS.LACHARTE.SELF,
    component: LacharteComponent
  },
  {
    path: CONST.PATH.CONCEPTS.INFORMATIONS.SELF,
    component: InformationsComponent
  },
  {
    path: CONST.PATH.CONCEPTS.CHARTE.SELF,
    component: CharteComponent
  },
  {
    path: CONST.PATH.CONSEILS.CONSEILS.SELF,
    component: ConseilsComponent
  },
  {
    path: CONST.PATH.CONSEILS.PREMIEREPARTIE.SELF,
    component: PremierepartieComponent
  },
  {
    path: CONST.PATH.CONSEILS.PREMIERCOURS.SELF,
    component: PremiercoursComponent
  },
  {
    path: CONST.PATH.CONSEILS.PREMIERMATCH.SELF,
    component: PremiermatchComponent
  },
  {
    path: CONST.PATH.CONSEILS.PREMIERTOURNOI.SELF,
    component: PremiertournoiComponent
  },
  {
    path: CONST.PATH.CONSEILS.DIETETIQUE.SELF,
    component: DietetiqueComponent
  },
  {
    path: CONST.PATH.CONSEILS.FORMEPHYSIQUE.SELF,
    component: FormephysiqueComponent
  },
  {
    path: CONST.PATH.CONSEILS.CHOISIR.SELF,
    component: ChoisirComponent
  },
  {
    path: CONST.PATH.CONSEILS.TESTER.SELF,
    component: ConseilsMatrielTesterComponent
  },
  {
    path: CONST.PATH.TENNIS.TENNIS.SELF,
    component: TennisComponent
  },
  {
    path: CONST.PATH.TENNIS.HISTOIRE.SELF,
    component: HistoireComponent
  },
  {
    path: CONST.PATH.TENNIS.HISTOIREFIRST.SELF,
    component: HistoireFirstComponent
  },
  {
    path: CONST.PATH.TENNIS.HISTOIRE1SECOND.SELF,
    component: HistoireSecondComponent
  },
  {
    path: CONST.PATH.TENNIS.HISTOIRETHIRD.SELF,
    component: HistoireThirdComponent
  },
  {
    path: CONST.PATH.TENNIS.HISTOIREFOUR.SELF,
    component: HistoireFourComponent
  },
  {
    path: CONST.PATH.TENNIS.LEXIQUE.SELF,
    component: LexiqueComponent
  },
  {
    path: CONST.PATH.TENNIS.LEXIQUEATOD.SELF,
    component: LexiqueatodComponent
  },
  {
    path: CONST.PATH.TENNIS.LEXIQUEETOM.SELF,
    component: LexiqueetomComponent
  },
  {
    path: CONST.PATH.TENNIS.LEXIQUENTOQ.SELF,
    component: LexiquentoqComponent
  },
  {
    path: CONST.PATH.TENNIS.LEXIQUERTOZ.SELF,
    component: LexiquertozComponent
  },
  {
    path: CONST.PATH.TENNIS.REGLES.SELF,
    component: ReglesComponent
  },
  {
    path: CONST.PATH.TENNIS.DIMENSIONS.SELF,
    component: DimensionsComponent
  },
  {
    path: CONST.PATH.TENNIS.ELEMENTS.SELF,
    component: ElementsComponent
  },
  {
    path: CONST.PATH.TENNIS.COMPTER.SELF,
    component: CompterComponent
  },
  {
    path: CONST.PATH.TENNIS.PRINCIPLE.SELF,
    component: PrincipleComponent
  },
  // {
  //   path: CONST.PATH.CLUB_HOUSE_LIST,
  //   component: ClubhouselistComponent
  // },
  // {
  //   path: CONST.PATH.CLUB_HOUSE_VIEW,
  //   component: ClubhouseviewComponent
  // },
  // {
  //   path: CONST.PATH.PETTICES_ANNOUNCES,
  //   component: PetticesComponent
  // },
  // {
  //   path: CONST.PATH.PARRAINER_CLUBHOUSE,
  //   component: ParrainerComponent
  // },
  // {
  //   path: CONST.PATH.CLUB_HOUSE,
  //   component: ClubhouseComponent
  // },
  // {
  //   path: CONST.PATH.QUIZ_JEUXCONCOUR,
  //   component: JeuxconcourComponent
  // },

  // {
  //   path: CONST.PATH.QUIZ,
  //   component: QuizComponent
  // },
  {
    path: CONST.PATH.OFFREDESERVICE,
    component: OffreDeServiceCoachTennisComponent
  },
  {
    path: CONST.PATH.CGU,
    component: CguComponent
  },
  {
    path: CONST.PATH.CGV,
    component: CGVComponent
  },
  {
    path: CONST.PATH.MENTIONS_LEGALES,
    component: MentionslegalesComponent
  },
  {
    path: CONST.PATH.COURDETENNIS,
    component: CoursDeTennisComponent
  },
  {
    path: CONST.PATH.FAQ,
    component: FaqComponent
  },
  {
    path: CONST.PATH.QUISOMMENOUS,
    component: QuisommenousComponent
  },
  {
    path: CONST.PATH.RECRUTEMENT,
    component: RecrutementComponent
  },
  {
    path: CONST.PATH.CONTACT,
    component: ContactnewComponent
  },
  {
    path: CONST.PATH.ENSAVIORPLUS,
    component: EnsavoirplusComponent
  },
  {
    path: CONST.PATH.NEWSLETTERS,
    component: NewslettersComponent
  },
  {
    path: CONST.PATH.OH_MY_COACH_DETAIL_NEW,
    component: OhMyCoachDetailNewComponent
  },
  {
    path: CONST.PATH.GUIDE_DES_TERRAINS_PRATIQUE,
    component: GuideDesTerrainsPratiqueComponent
  },
  {
    path: CONST.PATH.SITE_MAP,
    component: SitemapComponent
  },
  {
    path: CONST.PATH.PRATIQUE_LICENSE,
    component: PratiqueLicenseComponent
  },
  {
    path: CONST.PATH.ALL_TOUNAMENT,
    component: AllTournamentComponent
  },
  {
    path: CONST.PATH.ALL_TEAMBUILDING,
    component: AllTeambuildingComponent
  },
  {
    path: CONST.PATH.ALL_STAGE,
    component: AllStageComponent
  },
  {
    path: CONST.PATH.ALL_ANIMATIONS,
    component: AllAnimationsComponent
  },
  {
    path: CONST.PATH.TERMS_CONDITION,
    component: TermsConditionComponent
  },
  {
    path: CONST.PATH.USERS.CMS.SELF + "/:endpoint",
    component: CmsFrontComponent
  },
  {
    path: "**",
    component: HomeComponent
  }
];

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider("1359179340923922")
    }
  ]);
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    SocialLoginComponent,
    LoginComponent,
    CoachRegisterComponent,
    UserRegisterComponent,
    FooterComponent,
    HeaderComponent,
    ForgotPasswordComponent,
    SetPasswordComponent,
    OhMyCoachComponent,
    OhMyCoachNewComponent,
    OhMyEventNewComponent,
    CoachDetailComponent,
    TopMenuComponent,
    FooterFirstComponent,
    AdminloginComponent,
    AdminforgotpasswordComponent,
    ResetpasswordComponent,
    UserStageComponent,
    UserTeambuildingComponent,
    UserAnimationComponent,
    UserTournamentComponent,
    UserTournamentDetailComponent,
    UserStageDetailComponent,
    UserTeambuildingDetailComponent,
    UserAnimationDetailComponent,
    // OhMyCoachDetailComponent,
    ConceptComponent,
    PresentationComponent,
    EngagementsComponent,
    LacharteComponent,
    InformationsComponent,
    ConseilsComponent,
    PremierepartieComponent,
    PremiercoursComponent,
    PremiermatchComponent,
    PremiertournoiComponent,
    DietetiqueComponent,
    FormephysiqueComponent,
    ChoisirComponent,
    ConseilsMatrielTesterComponent,
    // ClubhouseComponent,
    TennisComponent,
    HistoireComponent,
    HistoireFirstComponent,
    HistoireSecondComponent,
    HistoireThirdComponent,
    HistoireFourComponent,
    LexiqueComponent,
    LexiqueatodComponent,
    LexiqueetomComponent,
    LexiquentoqComponent,
    LexiquertozComponent,
    ReglesComponent,
    DimensionsComponent,
    ElementsComponent,
    CompterComponent,
    PrincipleComponent,
    // ClubhouselistComponent,
    // ClubhouseviewComponent,
    // PetticesComponent,
    // ParrainerComponent,
    // JeuxconcourComponent,
    // QuizComponent,
    CharteComponent,
    OffreDeServiceCoachTennisComponent,
    CmsFrontComponent,
    CguComponent,
    CGVComponent,
    MentionslegalesComponent,
    OhMyCoachDetailNewComponent,
    GuideDesTerrainsPratiqueComponent,
    SitemapComponent,
    PratiqueLicenseComponent,
    AllTournamentComponent,
    AllAnimationsComponent,
    AllStageComponent,
    AllTeambuildingComponent,
    CoursDeTennisComponent,
    RecrutementComponent,
    NewslettersComponent,
    QuisommenousComponent,
    FaqComponent,
    EnsavoirplusComponent,
    ContactnewComponent,
    TermsConditionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    RouterModule.forRoot(routes),
    AppSharedModule,
    NgxSpinnerModule,
    NgbModule,
    XunkCalendarModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    Ng2SearchPipeModule,
    ScrollingModule
  ],
  providers: [
    AppService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    { provide: OWL_DATE_TIME_LOCALE, useValue: "fr" },
    { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs }
  ],
  bootstrap: [AppComponent],
  exports: [TopMenuComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
