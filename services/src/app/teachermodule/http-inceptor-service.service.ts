import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Module } from './module';
import { TeachermoduleserviceService } from './service/teachermoduleservice.service';

import { TeacherauthServiceService } from './teacherauth-service.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorServiceService implements HttpInterceptor {

  module: Module = new Module();
  constructor(private authenticationService: TeacherauthServiceService, private teachermoduleService: TeachermoduleserviceService) { }

  // intercept(
  //   req: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   if (
  //     this.authenticationService.isUserLoggedIn() &&
  //     req.url.indexOf('basicauth') === -1
  //   ) {
  //     const authReq = req.clone({
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         Authorization: `Basic ${window.btoa(
  //           this.authenticationService.username +
  //             ':' +
  //             this.authenticationService.password
  //         )}`,
  //       }),
  //     });
  //     return next.handle(authReq);
  //   } else {
  //     return next.handle(req);
  //   }
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const clonedRequest =
      request.clone(
        { withCredentials: true }
      );

    return next.handle(clonedRequest)
      .pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log("Http Response event: ", event);
          }
          return event;
        }),
        catchError(error => {
          console.log("Error response status: ", error.status);
          if (error.status === 401) {
            this.teachermoduleService.setLoggedUser(this.module);
          }
          return throwError(error);
        }));

  }
}
