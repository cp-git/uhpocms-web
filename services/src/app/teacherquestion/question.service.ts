import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from './question';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private readonly questionUrl: string = environment.questionUrl + "/question";
  constructor(private _http: HttpClient) { }

  questionList(): Observable<any> {
    return this._http.get<any>(`${this.questionUrl}?figure=all`);
  }

  addQuestion(question: Question): Observable<any> {
    return this._http.post<any>(`${this.questionUrl}`, question);
  }

  deleteQuestion(questionFigure: string): Observable<any> {
    return this._http.delete<any>(`${this.questionUrl}/` + questionFigure);
  }

  getQuestion(questionFigure: string): Observable<any> {
    return this._http.get<any>(`${this.questionUrl}/` + questionFigure);
  }

  updatedQuestion(questionFigure: string, question: Question): Observable<any> {

    return this._http.put<any>(`${this.questionUrl}/` + questionFigure, question);
  }
}
