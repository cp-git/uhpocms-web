import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { map, Observable } from 'rxjs';
import { Enrolltostudent } from '../class/enrolltostudent';

@Injectable({
  providedIn: 'root'
})
export class EnrolltostudentService {
  _loginUrl: string;
  enrollmentUrl: string;

  private queryObj: {
    offset?: number,
    maxResults?: number
  } = {};

  constructor(private _http: HttpClient) {
    //  this.courseUrl = `${environment.courseUrl}/course`;
    this._loginUrl = `${environment.courseUrl}/basicauth`;
    this.enrollmentUrl = 'http://localhost:8090/enrolltostudent/uhpocms/enrollstudent/';
  }

  saveEnrolledStudents(enrolltostudent: Enrolltostudent): Observable<any> {
    return this._http.post<any>(this.enrollmentUrl, enrolltostudent);
  }

  setParams(queryParams: { maxResults: number, offset: number }): void {
    this.queryObj = Object.assign(
      {},
      this.queryObj,
      queryParams,
    );
  }


}
