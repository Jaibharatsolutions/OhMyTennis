import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
/* [ Service ] */
import { AppService } from './app.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public auth: AppService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    if (token !== undefined && token !== null) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token.access_token}`,
          Accept: 'application/json'
        }
      });
    }
    /* if(token!==undefined && token!==null){
      return next.handle(req).catch((error, caught) => {
        //intercept the respons error and displace it to the console
        console.log("Error Occurred");
        console.log(error);
        //return the error to the method that called it
        return Observable.throw(error);
        });
    }  */
    return next.handle(req);
  }
}
