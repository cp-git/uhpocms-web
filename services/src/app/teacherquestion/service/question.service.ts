import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';
import { Question } from '../question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {

  private _baseUrl: string;

  constructor(private _http: HttpClient) {
    this._baseUrl = `${environment.questionUrl}/question`;

  }

  //fetch all question list
  questionList(): Observable<any> {
    return this._http.get<any>(this._baseUrl + '?figure=all');
  }

  //add question 
  addQuestion(question: Question): Observable<any> {
    return this._http.post<any>(this._baseUrl, question);
  }

  //delete qestion 
  deleteQuestion(questionFigure: string): Observable<any> {
    return this._http.delete<any>(this._baseUrl + '/' + questionFigure);
  }

  getQuestion(questionFigure: string): Observable<any> {
    return this._http.get<any>(this._baseUrl + '/' + questionFigure);
  }

  updatedQuestion(questionFigure: string, question: Question): Observable<any> {
    return this._http.put<any>(this._baseUrl + '/' + questionFigure, question);
  }


  getInactiveQuestionList(): Observable<any> {
    return this._http.get<any>(`${this._baseUrl}/inactive?inactivequestions=all`);
  }

  updateActiveStatus(questionFigure: string, question: Question): Observable<any> {
    return this._http.patch<any>(`${this._baseUrl}/` + questionFigure, question);
  }

}
