import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../class/question';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { Answer } from '../class/answer';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  questionUrl: string;
  answerUrl: string;


  constructor(private http: HttpClient) {
    this.questionUrl = `${environment.questionUrl}`;
    this.answerUrl = `${environment.answerUrl}`;

  }

  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.questionUrl}/question?figure=all`);
  }

  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.questionUrl}/question`, question);
  }


  //delete question by question figure
  deleteQuestion(questionFigure: string): Observable<Question> {
    return this.http.delete<Question>(`${this.questionUrl}/question/${questionFigure}`);
  }


  //get question by quesiton figure
  getQuestion(questionFigure: string): Observable<Question> {
    return this.http.get<Question>(`${this.questionUrl}/question/${questionFigure}`);
  }

  //update question by question figure
  updatedQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.questionUrl}/question/byid/${question.questionId}`, question);
  }

  //get inactive question list
  getInactiveQuestionsList(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.questionUrl}/question/inactive?inactivequestions=all`);
  }

  //get activate question
  activateQuestion(questionFigure: string): Observable<Question> {
    return this.http.patch<Question>(`${this.questionUrl}/question/${questionFigure}`, {});
  }

  addAnswer(answer: Answer) {
    return this.http.post<Answer>(`${this.answerUrl}/answer`, answer);
  }

  getAllQuestionsByQuizId(quizId: number) {
    return this.http.get<Question[]>(`${this.questionUrl}/questions?quizId=${quizId}`);
  }

  getAllAnswers(): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.answerUrl}/answer?id=all`);
  }
}
