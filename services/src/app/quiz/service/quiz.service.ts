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

  private quizUrl: string;
  constructor(private _http: HttpClient) {

    this.quizUrl = environment.quizUrl;

  }

  //getting All Quiz
  _getAllQuizzes(): Observable<any> {

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

  //creating the basic token
  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ':' + password);
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
