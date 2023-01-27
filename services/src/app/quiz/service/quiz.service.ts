import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Quiz } from '../quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private _baseUrl: string;
  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: String = "uhpocadmin";
  public password: String = "P@55w0rd";

  constructor(private _http: HttpClient) {
    this._baseUrl = "http://localhost:8090/quiz/uhpocms/quiz";

  }

  _getAllQuizzes(): Observable<any> {
    return this._http.get<any>(this._baseUrl + "?title=all");
  }

  _getQuizByTitle(title: string): Observable<any> {
    return this._http.get<any>(this._baseUrl + "/" + title);
  }


  _addQuiz(quiz: Quiz): Observable<any> {
    return this._http.post<any>(this._baseUrl + "/", quiz);
  }

  _updateQuiz(title: string, quiz: Quiz): Observable<any> {
    return this._http.put<any>(this._baseUrl + "/" + title, quiz);
  }

  _deleteQuiz(title: string): Observable<any> {
    return this._http.delete<any>(this._baseUrl + "/" + title);
  }

  authenticationService(username: String, password: String) {
    return this._http.get(`http://localhost:8090/module/uhpocms/basicauth`,
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(username, password);
      }));
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username: any, password: any) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    // this._route.navigate(['demo']);
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username;
    this.password;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }

}
