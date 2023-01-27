
import { Injectable } from '@angular/core';
import { AuthuserserviceService } from './authuserservice.service';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HttpInceptorServiceService {


  constructor(private authenticationService: AuthuserserviceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authenticationService.isUserLoggedIn() && req.url.indexOf('basicauth') === -1) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Basic ${window.btoa(this.authenticationService.username + ":" + this.authenticationService.password)}`
        })
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
