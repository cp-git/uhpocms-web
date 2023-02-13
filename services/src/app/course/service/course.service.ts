import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'environments/environment.development';

import { map } from 'rxjs';
import { Course } from '../course';
@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courseUrl: string = environment.courseUrl;
  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

  public username: String = 'uhpocadmin';
  public password: String = 'P@55w0rd';
  _loginUrl: string;

  constructor(private _http: HttpClient) {
    this.courseUrl = environment.courseUrl;
    this._loginUrl = `${environment.courseUrl}/basicauth`;
    // this.courseUrl = 'http://localhost:8090/course/uhpocms/course';
  }

  _getAllCourses(): Observable<any> {
    return this._http.get<any>(this.courseUrl + "/course?name=all");
  }

  addCourse(course: Course): Observable<any> {
    return this._http.post<any>(this.courseUrl, course);
  }

  deleteModule(courseName: string): Observable<any> {
    return this._http.delete<any>(this.courseUrl + '/' + courseName);
  }

  updateCourseList(courseName: string, course: Course): Observable<any> {
    return this._http.put<any>(this.courseUrl + '/' + courseName, course);
  }

  getCourse(courseName: string): Observable<Course> {
    return this._http.get<Course>(this.courseUrl + '/' + courseName);
  }

  authenticationService(username: String, password: String) {
    return this._http
      .get(this._loginUrl, {
        headers: {
          authorization: this.createBasicAuthToken(username, password),
        },
      })
      .pipe(
        map((res) => {
          this.username = username;
          this.password = password;
          this.registerSuccessfulLogin(username, password);
        })
      );
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  registerSuccessfulLogin(username: any, password: any) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    // this._route.navigate(['demo']);
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username;
    this.password;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return false;
    return true;
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return '';
    return user;
  }
}
