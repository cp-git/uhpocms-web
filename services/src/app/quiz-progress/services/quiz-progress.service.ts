import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuizProgress } from '../class/quiz-progress';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class QuizProgressService {

  private quizProgressUrl: string;

  constructor(private http: HttpClient) {
    this.quizProgressUrl = `${environment.quizProgressUrl}/quizprogress`;
  }

  getQuizProgressesByStudentId(studentId: number): Observable<QuizProgress[]> {
    return this.http.get<QuizProgress[]>(`${this.quizProgressUrl}/${studentId}`);
  }

  addQuizProgressOfStudent(quizProgress: QuizProgress): Observable<QuizProgress> {
    return this.http.post<QuizProgress>(`${this.quizProgressUrl}`, quizProgress);

  }

  getQuizProgressesByQuizIdAndStudId(quizId: number,studentId: number): Observable<QuizProgress> {
    return this.http.get<QuizProgress>(`${this.quizProgressUrl}/${quizId}/${studentId}`);
  }

  getQuizProgressesByQuizIdAndStudIdProg(quizId: number,studentId: number): Observable<QuizProgress> {
    return this.http.get<QuizProgress>(`${this.quizProgressUrl}/progress/${quizId}/${studentId}`);
  }


  getAllQuizProgressdata(): Observable<QuizProgress[]> {
    return this.http.get<QuizProgress[]>(`${this.quizProgressUrl}?data=all`);
  }
}
