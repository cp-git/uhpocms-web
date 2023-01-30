import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Question } from '../question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: String = "uhpocadmin";
  public password: String = "P@55w0rd";
  constructor(private _http: HttpClient) { }

  questionList(): Observable<any> {
    return this._http.get<any>("http://localhost:8090/question/uhpocms/question?figure=all");
  }

  addQuestion(question: Question): Observable<any> {
    return this._http.post<any>("http://localhost:8090/question/uhpocms/question", question);
  }

  deleteQuestion(questionFigure: string): Observable<any> {
    return this._http.delete<any>("http://localhost:8090/question/uhpocms/question/" + questionFigure);
  }

  getQuestion(questionFigure: string): Observable<any> {
    return this._http.get<any>("http://localhost:8090/question/uhpocms/question/" + questionFigure);
  }

  updatedQuestion(questionFigure: string, question: Question): Observable<any> {

    return this._http.put<any>("http://localhost:8090/question/uhpocms/question/" + questionFigure, question);
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
