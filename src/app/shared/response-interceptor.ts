import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CONST } from './app.constant';
/* [ Service ] */
import { AppService } from './app.service';
@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(
    public auth: AppService,
    public router: Router,
    public spinner: NgxSpinnerService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      /* .map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && ~~(event.status / 100) > 3) {
          console.info('HttpResponse::event =', event, ';');
        } else console.info('event =', event, ';');
        return event;
      }) */
      .catch((err: any, caught) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.spinner.hide();
            localStorage.removeItem(CONST.SESSION_NAME);
            if (CONST.PATH.LOGIN !== undefined) {
              this.router.navigate(['/' + CONST.PATH.LOGIN]);
            }
          }
          return Observable.throw(err.error);
        }
      });
  }
}
