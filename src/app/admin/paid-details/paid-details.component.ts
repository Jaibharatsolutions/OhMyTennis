import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { AppService } from "../../shared/app.service";
import { AdminComponent } from "src/app/model/admin/admin.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-paiddetails",
  templateUrl: "./paid-details.component.html",
  styleUrls: ["./paid-details.component.scss"]
})
export class PaidComponent extends AdminComponent implements OnInit {
  public data: any = [];
  public datanew = [];
  commission_amount_full: any;
  commission_amount: any;
  title = "angulardatatables";
  dtOptions: DataTables.Settings = {};

  public coachId: string = "";
  public short: string = "";
  public courseId: string = "";

  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    appService: AppService,
    location: Location,
    spinner: NgxSpinnerService
  ) {
    super(activatedRoute, router, appService, location, spinner);
  }
  ngOnInit() {
    this.getIndividualCoaches();
    setTimeout(function() {
      $("#datatable").DataTable({
        responsive: true
      });
    }, 310);
  }

  getIndividualCoaches() {
    this.coachId = this.activatedRoute.snapshot.queryParamMap.get("Coach_id");
    this.short = this.activatedRoute.snapshot.queryParamMap.get("short");
    this.courseId = this.activatedRoute.snapshot.queryParamMap.get("id");
    var dataJson = {
      coach_id: this.coachId,
      course_short_name: this.short,
      course_id: this.courseId
    };
    this.spinner.show();
    this.appService
      .create("/admin/getbookinganduserdetails", dataJson)
      .subscribe((data: any) => {
        if (data.isSuccess == true) {
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
        let dat = (data as any).data.payment;
        this.data = dat.map(value => {
          // Checking Condition for the Services Available in the Website
          if (
            value.CoachPaymentPlan == "Commission" &&
            (value.BookedCourse == "CoursCollectifOndemand" ||
              value.BookedCourse == "CoursIndividuel")
          ) {
            this.commission_amount_full =
              value.Amount * (value.commission_percent / 100);
            this.commission_amount = this.commission_amount_full.toFixed(2);
          } else if (
            value.BookedCourse == "CoursCollectifClub" ||
            value.BookedCourse == "Stage" ||
            value.BookedCourse == "TeamBuilding" ||
            value.BookedCourse == "Animation" ||
            value.BookedCourse == "Tournoi"
          ) {
            this.commission_amount_full =
              value.Amount * (value.commission_percent / 100);
            this.commission_amount = this.commission_amount_full.toFixed(2);
          } else {
            this.commission_amount_full = value.Amount;
            if (this.commission_amount_full < value.sub_min_amount) {
              this.commission_amount = (
                value.Amount *
                (value.sub_max_amount / 100)
              ).toFixed(2);
            } else {
              this.commission_amount = 0.0;
            }
          }

          return {
            slno: value.UserID,
            name: value.UserFirstname + " " + value.UserLastname,
            bookedID: value.BookedID,
            bookedCourse: value.BookedCourse,
            amount: value.Amount.toFixed(2),
            paymentPlan: value.CoachPaymentPlan,
            commission_percent: value.commission_percent,
            sub_min_amount: value.sub_min_amount,
            sub_max_amount: value.sub_max_amount,
            sub_max_percent: value.sub_max_percent,
            comission_amount_display: this.commission_amount,
            net_amount: (value.Amount - this.commission_amount).toFixed(2)
          };
        });
        this.datanew = this.data;
      });
  }

  goBack(coachID) {
    if (coachID) {
      this.router.navigate(["/admin/paymentdetails"], {
        queryParams: { Coach_id: coachID }
      });
    }
  }
}
