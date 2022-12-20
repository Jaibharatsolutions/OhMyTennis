import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpEventType,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpParams,
  HttpResponse
} from "@angular/common/http";
import {
  map,
  finalize,
  delay,
  filter,
  catchError,
  retry,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  mergeMap,
  retryWhen,
  tap
} from "rxjs/operators";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/fromPromise";
import { CONST } from "../shared/app.constant";

@Injectable()
export class AppService {
  // api = "http://localhost:5000";
  api = "https://api.ohmytennis.com";
  // tslint:disable-next-line:variable-name
  _headers: HttpHeaders;

  // tslint:disable-next-line:variable-name
  _httpOptions = {};

  constructor(private http: HttpClient) {
    this._httpOptions = {};
  }

  // private _refreshNeeded$ = new Subject<void>();

  // get refreshNeeded$() {
  //   return this._refreshNeeded$;
  // }

  /*
   * [ Get the Token from the local storage ]
   * [ Pass the token Interceptor ]
   */
  public getToken() {
    const token = localStorage.getItem(CONST.SESSION_NAME);
    if (token !== undefined || token !== null || token !== "") {
      return JSON.parse(token) ? JSON.parse(JSON.parse(token)) : null;
    }
    return null;
  }

  private extractData(res: Response) {
    return res || {};
  }

  private handleError(error: Response | any) {
    return throwError(error);
  }

  private handleErrorPromise(error: Response | any) {
    return Promise.reject(JSON.parse(error._body) || error);
  }

  /* [ Filter the Object in URI ] */
  private objToQueryString(obj) {
    const k = Object.keys(obj);
    let s = "";
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < k.length; i++) {
      s +=
        k[i] +
        encodeURIComponent(":") +
        encodeURIComponent(obj[k[i]]) +
        encodeURIComponent(",");
    }
    if (s) {
      return encodeURIComponent("{") + s + encodeURIComponent("}");
    }
  }

  /* [ Filters ] */
  private encodURIParams(params: any): string {
    return Object.keys(params)
      .map((key) => {
        if (key !== "filter") {
          return (
            encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
          );
        }
      })
      .join("&");
  }

  formUrlParam(url, data) {
    // tslint:disable-next-line:ban-types
    let queryString: String = "";
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (!queryString) {
          queryString = `?${key}=${data[key]}`;
        } else {
          queryString += `&${key}=${data[key]}`;
        }
      }
    }
    return url + queryString;
  }

  /*
   * Method - GET
   */

  getAll(url, params = null) {
    if (params !== null) {
      url = url + "?";
      if (this.encodURIParams(params) !== "") {
        url = url + this.encodURIParams(params);
      }
      if (params.filter !== undefined) {
        url = url + "filter=" + this.objToQueryString(params.filter);
      }
    }
    return this.http
      .get(this.api + `${CONST.VERSION}` + url, this._httpOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*
   * Method - POST
   * param  - Passing Input Values in the {}
   */
  create(url: string, param: any): Observable<any> {
    return this.http
      .post(this.api + `${CONST.VERSION}` + url, param, this._httpOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*
   * Method - PUT
   * param  - Passing Input Values in the {}
   */
  update(url: string, param: any): Observable<any> {
    return this.http
      .put(this.api + `${CONST.VERSION}` + url, param, this._httpOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*
   * Method - DELETE
   * param  - Passing Input Values in the {}
   */
  delete(url: string): Observable<any> {
    return this.http
      .delete(this.api + `${CONST.VERSION}` + url, this._httpOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  fileUpload(url: string, formData: any): Observable<any> {
    this._httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "multipart/form-data",
        // 'Accept' : 'application/json'
      }),
      withCredentials: true,
      reportProgress: true,
    };
    return this.http
      .post(this.api + CONST.VERSION + url, formData, this._httpOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  fileDownload(url: string): Observable<any> {
    this._httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/pdf",
      }),
      withCredentials: true,
      responseType: "blob",
    };
    return this.http
      .get(this.api + `${CONST.VERSION}` + url, this._httpOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }
}
