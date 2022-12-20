import { Component, OnInit, ViewChild } from "@angular/core";
import { AdminComponent } from "../../model/admin/admin.component";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Location } from "@angular/common";
import * as $ from "jquery";
import { AngularEditorConfig } from "@kolkov/angular-editor";

@Component({
  selector: "app-cmsform",
  templateUrl: "./cmsform.component.html",
  styleUrls: ["./cmsform.component.scss"],
})
export class CmsformComponent extends AdminComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "auto",
    minHeight: "300px",
    maxHeight: "auto",
    width: "auto",
    minWidth: "0",
    translate: "yes",
    enableToolbar: true,
    showToolbar: true,
    placeholder: "Entrez le texte ici...",
    defaultParagraphSeparator: "",
    defaultFontName: "",
    defaultFontSize: "",
    fonts: [
      { class: "arial", name: "Arial" },
      { class: "times-new-roman", name: "Times New Roman" },
      { class: "calibri", name: "Calibri" },
      { class: "comic-sans-ms", name: "Comic Sans MS" },
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: "redText",
        class: "redText",
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
    sanitize: true,
    toolbarPosition: "top",
    toolbarHiddenButtons: [],
  };

  public trans_error: Boolean = false;
  public plan_error: Boolean = false;
  name = "ng2-ckeditor";
  ckeConfig: any;
  mycontent: string;
  log: string = "";
  @ViewChild("myckeditor", { static: false }) ckeditor: any;
  public editorValue: string = "";

  public datanew = [];

  public res = {
    id: "",
    menu_id: "",
    title: "",
    path: "",
    seo_keyword: "",
    seo_description: "",
    photo: "",
    content: "",
    search_box: false,
    banner_box: false,
    is_publish: false,
    banner_content: "",
  };

  public team_error = false;
  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    appService: AppService,
    location: Location,
    spinner: NgxSpinnerService
  ) {
    super(activatedRoute, router, appService, location, spinner);
    this.mycontent = ``;
  }

  ngOnInit() {
    this.getcms();
    this.getmenu();
    var titile = document.getElementsByClassName("brand");
    if (titile) titile[0].innerHTML = "CONTENT MANAGEMENT SYSTEM";
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: "divarea",
      language: "fr",
      defaultLanguage: "fr",
    };
    let formInputItem = document
      .querySelectorAll(".form_devarea")[0]
      .querySelectorAll("input");
    formInputItem.forEach(function (inputElement) {
      inputElement.setAttribute("disabled", "true");
    });

    let textare1 = document.getElementById(
      "exampleFormControlTextarea1"
    ) as HTMLTextAreaElement;
    textare1.setAttribute("disabled", "true");

    let selectOption = document.getElementById(
      "exampleFormControlSelect1"
    ) as HTMLTextAreaElement;
    selectOption.setAttribute("disabled", "true");

    const id = this.activatedRoute.snapshot.queryParamMap.get("id");
    if (id) {
      let elebebtn = document.querySelector("#enableBtn") as HTMLElement;
      elebebtn.style.display = "none";
      let elebebtn1 = document.querySelector("#enableBtn1") as HTMLElement;
      elebebtn1.style.display = "inline";
      elebebtn.setAttribute("data-toggle", "modal");
      elebebtn1.setAttribute("data-toggle", "modal");
    } else {
      let elebebtn = document.querySelector("#enableBtn") as HTMLElement;
      elebebtn.style.display = "inline";
      let elebebtn1 = document.querySelector("#enableBtn1") as HTMLElement;
      elebebtn1.style.display = "none";

      elebebtn.setAttribute("data-toggle", "modal");
      elebebtn1.setAttribute("data-toggle", "modal");
    }

    let icancel = document.querySelector("#cancel") as HTMLElement;
    icancel.style.display = "none";

    let Enregistrer = document.querySelector("#Enregistrer") as HTMLElement;
    Enregistrer.style.display = "none";

    window.scrollTo(0, 0);
  }

  getmenu() {
    this.appService.getAll("/admin/menu/list").subscribe((response) => {
      if ((response as any).data.length > 0) {
        if (response && response["data"]) {
          let dat = (response as any).data;
          this.datanew = dat;
        }
      }
    });
  }

  uriChange($event: any): void {
    var text = this.res.title.replace(/ +/g, " ").trim();
    this.res.path = text.replace(/\s/g, "-").toLowerCase();
  }

  enableForm() {
    $("#availabilityDiv :input").prop("readonly", false);
    $("#availabilityDiv :input").prop("required", true);
    $("#path").prop("readonly", true);

    let itransport = document.querySelectorAll(".form-group");
    itransport.forEach(function (checkItem) {
      checkItem.removeAttribute("disabled");
    });

    let formInputItem = document
      .querySelectorAll(".form_devarea")[0]
      .querySelectorAll("input");
    formInputItem.forEach(function (inputElement) {
      inputElement.removeAttribute("disabled");
    });

    let textarea = document.getElementById(
      "exampleFormControlTextarea1"
    ) as HTMLTextAreaElement;
    textarea.removeAttribute("disabled");

    const id = this.activatedRoute.snapshot.queryParamMap.get("id");

    let elebebtn = document.querySelector("#enableBtn") as HTMLElement;
    elebebtn.style.display = "none";

    let elebebtn1 = document.querySelector("#enableBtn1") as HTMLElement;
    elebebtn1.style.display = "none";

    let icancel = document.querySelector("#cancel") as HTMLElement;
    icancel.style.display = "inline";

    let Enregistrer = document.querySelector("#Enregistrer") as HTMLElement;
    Enregistrer.style.display = "inline";

    let selectOption = document.getElementById(
      "exampleFormControlSelect1"
    ) as HTMLTextAreaElement;
    selectOption.removeAttribute("disabled");
  }

  onChange($event: any): void {
    console.log("onChange");
    //this.log += new Date() + "<br />";
  }

  onPaste($event: any): void {
    console.log("onPaste");
    //this.log += new Date() + "<br />";
  }

  propagateChange = (result, file, type) => {
    this.res.photo = result;
    //this.res.filename = file.name;
  };

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.propagateChange(reader.result, file, file.type);
    };
    reader.onerror = function (error) {};
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  onSubmit(res) {
    const id = this.activatedRoute.snapshot.queryParamMap.get("id");

    if (id) {
      this.res.id = id;
    }
    this.res.search_box = res.search_box;
    this.res.banner_box = res.banner_box;
    this.res.is_publish = res.is_publish;
    this.spinner.show();
    //console.log(res);
    this.appService.create("/admin/cms/add", res).subscribe((response) => {
      if (response && response.isSuccess == true) {
        this._showAlertMessage("alert-success", "Mise à jour avec succés");
        //console.log(response);
        if (id) {
          this.updateform();
        } else {
          this.setform();
          if ((response as any).data.insertId != "") {
            let dat = (response as any).data.insertId;
            this.router.navigate(["/admin/cmsform"], {
              queryParams: { id: dat },
            });
          }
        }
        this.spinner.hide();
      } else {
        this._showAlertMessage("alert-danger", "Échec de la mise à jour");
        this.spinner.hide();
      }
      let elebebtn = document.querySelector("#enableBtn") as HTMLElement;
      elebebtn.style.display = "none";
      let elebebtn1 = document.querySelector("#enableBtn1") as HTMLElement;
      elebebtn1.style.display = "inline";
    });
  }

  setform() {
    let formInputItem = document
      .querySelectorAll(".form_devarea")[0]
      .querySelectorAll("input");
    formInputItem.forEach(function (inputElement) {
      inputElement.setAttribute("disabled", "true");
    });

    let textare1 = document.getElementById(
      "exampleFormControlTextarea1"
    ) as HTMLTextAreaElement;
    textare1.setAttribute("disabled", "true");

    // let bannerBox = document.getElementById("bannerBox") as HTMLTextAreaElement;
    // bannerBox.setAttribute("disabled", "true");

    let elebebtn = document.querySelector("#enableBtn") as HTMLElement;
    elebebtn.style.display = "inline";

    let elebebtn1 = document.querySelector("#enableBtn1") as HTMLElement;
    elebebtn1.style.display = "inline";

    elebebtn.setAttribute("data-toggle", "modal");

    elebebtn1.setAttribute("data-toggle", "modal");

    let icancel = document.querySelector("#cancel") as HTMLElement;
    icancel.style.display = "none";

    let Enregistrer = document.querySelector("#Enregistrer") as HTMLElement;
    Enregistrer.style.display = "none";
  }

  updateform() {
    let formInputItem = document
      .querySelectorAll(".form_devarea")[0]
      .querySelectorAll("input");
    formInputItem.forEach(function (inputElement) {
      inputElement.setAttribute("disabled", "true");
    });

    let textare1 = document.getElementById(
      "exampleFormControlTextarea1"
    ) as HTMLTextAreaElement;
    textare1.setAttribute("disabled", "true");

    // let bannerBox = document.getElementById("bannerBox") as HTMLTextAreaElement;
    // bannerBox.setAttribute("disabled", "true");

    let elebebtn = document.querySelector("#enableBtn") as HTMLElement;
    elebebtn.style.display = "none";

    elebebtn.setAttribute("data-toggle", "modal");

    let icancel = document.querySelector("#cancel") as HTMLElement;
    icancel.style.display = "none";

    let Enregistrer = document.querySelector("#Enregistrer") as HTMLElement;
    Enregistrer.style.display = "none";
  }

  getcms() {
    const id = this.activatedRoute.snapshot.queryParamMap.get("id");

    var cms_id = {
      cms_id: id,
    };

    this.spinner.show();
    if (id != "") {
      this.appService
        .create("/admin/cms/getCmsValue", cms_id)
        .subscribe((data: any) => {
          if (data.isSuccess == true) {
            this.spinner.hide();
            this.res = data.data.cms_list[0];
            console.log(this.res);
          } else {
            this.spinner.hide();
          }
        });
    }
  }
}
