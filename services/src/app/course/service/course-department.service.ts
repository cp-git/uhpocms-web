import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'environments/environment.development';

import { map } from 'rxjs';
import { Coursedepartment } from '../class/coursedepartment';

@Injectable({
  providedIn: 'root'
})
export class CourseDepartmentService {
  private courseDepartmentUrl: string = environment.courseUrl;
  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

  public username: String = 'uhpocadmin';
  public password: String = 'P@55w0rd';
  _loginUrl: string;

  constructor(private _http: HttpClient) {
    //  this.courseUrl = `${environment.courseUrl}/course`;
    this._loginUrl = `${environment.courseUrl}/basicauth`;
    this.courseDepartmentUrl = `${environment.courseDepartmentUrl}/course`;
  }
  assignCourseToDepartment(courseDepartment: Coursedepartment): Observable<any> {
    return this._http.post<any>(`${this.courseDepartmentUrl}/department`, courseDepartment);
  }

  getCoursesDepartmentId(): Observable<any> {
    // http://localhost:8095/uhpocms/course/dept?id=all
    return this._http.get<any>(`${this.courseDepartmentUrl}/department?id=all`);
  }

}
