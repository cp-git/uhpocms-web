import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Quiz } from '../quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private _baseUrl: string;


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
}
