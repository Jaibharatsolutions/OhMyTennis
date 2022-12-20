import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { AppService } from "../../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AdminComponent } from "src/app/model/admin/admin.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { from } from "rxjs";
// import * as Stripe from "stripe";
// const stripe = new Stripe("pk_test_ppbf90Eyy5PuXBdNQNLpxVuz00e719Y31R");

@Component({
  selector: "app-paymentdetails",
  templateUrl: "./payment-details.component.html",
  styleUrls: ["./payment-details.component.scss"]
})
export class PaymentdetailsComponent extends AdminComponent implements OnInit {
  public res = {
    Coach_Fname: "",
    Coach_Lname: "",
    Coach_Email: "",
    Coach_Phone: "",
    InstagramURL: "",
    FacebookURL: "",
    TwitterURL: "",
    Coach_Description: "",
    Coach_Rayon: "",
    Coach_Price: "",
    Coach_Services: "",
    Coach_PriceX10: "",
    Coach_Bank_Name: "",
    Coach_Bank_ACCNum: "",
    Branch_Code: "",
    Coach_Bank_City: "",
    Coach_Image:
      "https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png",
    Coach_Resume: ""
  };
  public rowDataCollection: any = [];
  public data: any = [];
  public Fdata: any = [];
  public datanew = [];
  paymentstripe: any;
  //public image: Blob;

  title = "angulardatatables";
  coachcount: any;
  usercount: any;
  courtcount: any;
  public response: any;
  public filename: string = "";
  dtOptions: DataTables.Settings = {};
  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    appService: AppService,
    location: Location,
    spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer
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

  transform(image) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }

  stripepaymentstatus() {
    const id = this.activatedRoute.snapshot.queryParamMap.get("Coach_id");
    var Coach_id = {
      Coach_id: id
    };
    this.appService
      .create("/admin/checkcustomeraccount", Coach_id)
      .subscribe(response => {
        //console.log("stripe----", response);
        if ((response as any).data.length > 0) {
          if (response && response["data"]) {
            this.paymentstripe = "verified";
          }
        } else {
          this.paymentstripe = "notverified";
        }
      });
  }

  getIndividualCoaches() {
    this.stripepaymentstatus();
    var selectedServicesList = [];
    var myFile;
    const id = this.activatedRoute.snapshot.queryParamMap.get("Coach_id");
    var Coach_id = {
      Coach_id: id
    };
    this.spinner.show();
    this.appService
      .create("/admin/get_payment_coach_by_id", Coach_id)
      .subscribe((data: any) => {
        if (data.isSuccess == true) {
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
        console.log(data.data.coach_list);
        this.response = data.data.coach_list[0];
        this.res = data.data.coach_list[0];
        if (this.res.Coach_Image == null) {
          myFile =
            "https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png";
        } else {
          myFile = this.transform(this.res.Coach_Image);
        }
        this.res.Coach_Image = myFile;
        selectedServicesList = data.data.coach_list[0].Coach_Services.split(
          ","
        );
        console.log(this.res);
        this.appService.getAll("/course/getcourse").subscribe(response => {
          if ((response as any).data.course.length > 0) {
            if (response && response["data"]) {
              let dat = (response as any).data.course;
              let servData = [];
              for (let i = 0; i < dat.length; i++) {
                for (let j = 0; j <= selectedServicesList.length; j++) {
                  if (dat[i].Course_Shotname == selectedServicesList[j]) {
                    servData.push({
                      id: dat[i].Course_ID,
                      service: dat[i].CourseName,
                      shortName: dat[i].Course_Shotname,
                      coachID: id
                    });
                  }
                }
              }
              this.datanew = servData;
            }
          }
        });
      });
  }

  paidDetails(id, coachID, shortName) {
    if (id && coachID && shortName) {
      this.router.navigate(["/admin/paiddetails"], {
        queryParams: { id: id, Coach_id: coachID, short: shortName }
      });
    }
  }

  goBack() {
    this.router.navigate(["/admin/payments"], {
      queryParams: {}
    });
  }

  connect() {
    this.setConnect(this.appService);
  }

  setConnect(appService) {
    var that = this;
    this.spinner.show();
    var data = {
      coach_id: this.response.Coach_ID,
      email: this.response.Coach_Email,
      name: this.response.Coach_Fname + " " + this.response.Coach_Lname,
      phone: this.response.Coach_Phone
    };
    //console.log(data);
    //console.log("[payment-details.component.ts]--connect");
    (<any>window).Stripe.bankAccount.createToken(
      {
        country: "US",
        currency: "USD",
        routing_number: this.response.Branch_Code,
        account_number: this.response.Coach_Bank_ACCNum,
        account_holder_name:
          this.response.Coach_Fname + " " + this.response.Coach_Lname,
        account_holder_type: "individual"
      },
      function(status, response) {
        // console.log(
        //   "[payment-details.component.ts]--stripeResponseHandler",
        //   status,
        //   response
        // );

        var res = {
          status: status,
          response: response,
          data
        };
        appService
          .create("/admin/createcustomerac", res)
          .subscribe(createResponse => {
            //console.log("pament.details", createResponse);
            that.spinner.hide();
            if (createResponse && createResponse.isSuccess == true) {
              that._showAlertMessage("alert-success", createResponse.message);
              window.scrollTo(0, 0);
              that.paymentstripe = "verified";
            } else {
              that._showAlertMessage("alert-danger", createResponse.message);
              window.scrollTo(0, 0);
              that.paymentstripe = "notverified";
            }
          });
      }
    );
    that.spinner.hide();
  }
}
