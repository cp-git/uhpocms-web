import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Quiz } from '../quiz';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class QuizService {



  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  private quizUrl: string;


  public username: String = "uhpocadmin";
  public password: String = "P@55w0rd";
  _loginUrl: string;

  constructor(private _http: HttpClient) {
    this.quizUrl = "http://localhost:8090/quiz/uhpocms/quiz";
    this._loginUrl = "http://localhost:8090/quiz/uhpocms/basicauth";

  }

  _getAllQuizzes(): Observable<any> {
    return this._http.get<any>("http://localhost:8090/quiz/uhpocms/quiz?title=all");
  }

  _getQuizByTitle(title: string): Observable<any> {
    return this._http.get<any>(`${this.quizUrl}/` + title);
  }


  _addQuiz(quiz: Quiz): Observable<any> {
    return this._http.post<any>(`${this.quizUrl}`, quiz);
  }

  _updateQuiz(title: string, quiz: Quiz): Observable<any> {
    return this._http.put<any>(`${this.quizUrl}/` + title, quiz);
  }

  _deleteQuiz(title: string): Observable<any> {
    return this._http.delete<any>(`${this.quizUrl}/` + title);
  }

  authenticationService(username: String, password: String) {
    return this._http.get(this._loginUrl,
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
