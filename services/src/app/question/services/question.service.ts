import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../question';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  questionUrl: string;
  constructor(private http: HttpClient) {
    this.questionUrl = `${environment.questionUrl}/question`;
  }

  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.questionUrl}?figure=all`);
  }

  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.questionUrl}`, question);
  }


  //delete question by question figure
  deleteQuestion(questionFigure: string): Observable<Question> {
    return this.http.delete<Question>(`${this.questionUrl}/${questionFigure}`);
  }


  //get question by quesiton figure
  getQuestion(questionFigure: string): Observable<Question> {
    return this.http.get<Question>(`${this.questionUrl}/${questionFigure}`);
  }

  //update question by question figure
  updatedQuestion(questionFigure: string, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.questionUrl}/${questionFigure}`, question);
  }

  //get inactive question list
  getInactiveQuestionsList(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.questionUrl}/inactive?inactivequestions=all`);
  }

  //get activate question
  activateQuestion(questionFigure: string): Observable<Question> {
    return this.http.patch<Question>(`${this.questionUrl}/${questionFigure}`, {});
  }
}
