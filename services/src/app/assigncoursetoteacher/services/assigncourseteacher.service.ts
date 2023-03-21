import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { Assignteacher } from '../class/assignteacher';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AssigncourseteacherService {

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

  public username: String = 'uhpocadmin';
  public password: String = 'P@55w0rd';
  _loginUrl: string;
  assignTeacherUrl: string;

  private queryObj: {
    offset?: number,
    maxResults?: number
  } = {};

  constructor(private _http: HttpClient) {
    //  this.courseUrl = `${environment.courseUrl}/course`;
    this._loginUrl = `${environment.courseUrl}/basicauth`;
    this.assignTeacherUrl = environment.assignCourseUrl;
  }


  //assign course to teacher url
  assignTeacherToCourse(assignTeacher: Assignteacher): Observable<any> {
    // alert(this.assignTeacherUrl + " and" + JSON.stringify(assignTeacher));
    return this._http.post<any>(this.assignTeacherUrl, assignTeacher);
  }
  setParams(queryParams: { maxResults: number, offset: number }): void {
    this.queryObj = Object.assign(
      {},
      this.queryObj,
      queryParams,
    );
  }
}
