import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Quiz } from '../quiz';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizUrl: string;


  constructor(private _http: HttpClient) {
    this.quizUrl = environment.quizUrl + "/quiz";
  }

  _getAllQuizzes(): Observable<any> {
    return this._http.get<any>(`${this.quizUrl}?title=all`);
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
}
