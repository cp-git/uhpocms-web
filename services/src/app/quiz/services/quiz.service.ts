import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';
import { Quiz } from '../class/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizUrl: string;

  constructor(private http: HttpClient) {

    this.quizUrl = environment.quizUrl + '/quiz';

  }

  getAllQuizzes(): Observable<any> {
    // return this.http.get<any>("http://localhost:8090/quiz/uhpocms/quiz?title=all");
    return this.http.get<any>(`${this.quizUrl}/` + "?title=all");
  }

  getQuizByTitle(title: string): Observable<any> {
    return this.http.get<any>(`${this.quizUrl}/` + title);
  }

  addQuiz(quiz: Quiz): Observable<any> {
    return this.http.post<any>(`${this.quizUrl}`, quiz);
  }

  updateQuiz(title: string, quiz: Quiz): Observable<any> {
    return this.http.put<any>(`${this.quizUrl}/` + title, quiz);
  }

  deleteQuiz(title: string): Observable<any> {
    return this.http.delete<any>(`${this.quizUrl}/` + title);
  }

  getInactiveQuizList(): Observable<any> {
    return this.http.get<any>(`${this.quizUrl}/inactive?inactivequizzes=all`);
  }

  updateActiveStatus(title: string, quiz: Quiz): Observable<any> {
    return this.http.patch<any>(`${this.quizUrl}/` + title, quiz);
  }
}
