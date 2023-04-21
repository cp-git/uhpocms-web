import { HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor() { }

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
  //         // 'Content-Type': 'application/json',
  //         Authorization: `Basic ${window.btoa(
  //           this.authenticationService.username +
  //           ':' +
  //           this.authenticationService.password
  //         )}`,
  //       }),
  //     });
  //     return next.handle(authReq);
  //   } else {
  //     return next.handle(req);
  //   }
  // }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const newRequest = request.clone({
      headers: new HttpHeaders({
        Authorization: 'Basic ' + btoa('uhpocadmin:P@55w0rd')
      })
    });
    return next.handle(newRequest);

  }
}
