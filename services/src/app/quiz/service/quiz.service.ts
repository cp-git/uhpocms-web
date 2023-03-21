import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Quiz } from '../class/quiz';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class QuizService {

  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

  private quizUrl: string;

  public username: String = 'uhpocadmin';
  public password: String = 'P@55w0rd';
  _loginUrl: string;

  constructor(private _http: HttpClient) {

    // this.quizUrl = environment.quizUrl + '/quiz';
    // this._loginUrl = `${environment.quizUrl}/basicauth`;

    this.quizUrl = "http://localhost:8090/quiz/uhpocms/quiz";
    this._loginUrl = "http://localhost:8090/quiz/uhpocms/basicauth";


  }

  //getting All Quiz
  _getAllQuizzes(): Observable<any> {
    // return this._http.get<any>("http://localhost:8090/quiz/uhpocms/quiz?title=all");
    return this._http.get<any>(`${this.quizUrl}/` + "?title=all");
  }


  //getQuizByTitle
  _getQuizByTitle(title: string): Observable<any> {
    return this._http.get<any>(`${this.quizUrl}/` + title);
  }

  //Service For AddQuiz
  _addQuiz(quiz: Quiz): Observable<any> {
    return this._http.post<any>(`${this.quizUrl}`, quiz);
  }

  //Service For UpdateQuiz
  _updateQuiz(title: string, quiz: Quiz): Observable<any> {
    return this._http.put<any>(`${this.quizUrl}/` + title, quiz);
  }

  //Service for DeleteQuiz
  _deleteQuiz(title: string): Observable<any> {
    return this._http.delete<any>(`${this.quizUrl}/` + title);
  }

  //Service for Authorization
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

  //creating the basic token
  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  //Register
  registerSuccessfulLogin(username: any, password: any) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    // this._route.navigate(['demo']);
  }


  //Logout
  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username;
    this.password;
  }

  //logout
  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return false;
    return true;
  }


  //LoggedUsername
  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return '';
    return user;
  }

  //getting InactiveQuizList
  getInactiveQuizList(): Observable<any> {
    return this._http.get<any>(`${this.quizUrl}/inactive?inactivequizzes=all`);
  }

  //Activate Quiz
  updateActiveStatus(title: string, quiz: Quiz): Observable<any> {
    return this._http.patch<any>(`${this.quizUrl}/` + title, quiz);
  }

}
