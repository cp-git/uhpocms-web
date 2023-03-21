import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../class/question';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root',
})

@Injectable({
  providedIn: 'root'
})
export class TeacherQuestionService {

  private readonly questionUrl: string;
  constructor(private _http: HttpClient) {
    this.questionUrl = environment.questionUrl + '/question';
   // this.questionUrl = `http://localhost:8090/question/uhpocms/question`;
  }


  //retrieves a list of questions
  questionList(): Observable<any> {
    return this._http.get<any>(`${this.questionUrl}?figure=all`);
  }

  //adds a new question
  addQuestion(question: Question): Observable<any> {
    return this._http.post<any>(`${this.questionUrl}`, question);
  }

  //deletes a question by figure name
  deleteQuestion(questionFigure: string): Observable<any> {
    return this._http.delete<any>(`${this.questionUrl}/` + questionFigure);
  }

  //retrieves a single question by figure name
  getQuestion(questionFigure: string): Observable<any> {
    return this._http.get<any>(`${this.questionUrl}/` + questionFigure);
  }

  // updates an existing question with the specified figure
  updatedQuestion(questionFigure: string, question: Question): Observable<any> {
    return this._http.put<any>(
      `${this.questionUrl}/` + questionFigure,
      question
    );
  }

  //retrieves a list of inactive questions
  getInactiveQuestionList(): Observable<any> {
    return this._http.get<any>(`${this.questionUrl}/inactive?inactivequestions=all`);
  }

 // updates the active status of a question with the specified figure.
  updateActiveStatus(questionFigure: string, question: Question): Observable<any> {
    return this._http.patch<any>(`${this.questionUrl}/` + questionFigure, question);
  }


}
