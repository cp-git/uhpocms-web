import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuizProgress } from '../class/quiz-progress';
import { environment } from 'environments/environment.development';
import { StudentAnswer } from 'app/student-module/class/student-answer';

@Injectable({
  providedIn: 'root'
})
export class QuizProgressService {

  private quizProgressUrl: string;
  studentAnswerUrl: string;

  constructor(private http: HttpClient) {
    this.quizProgressUrl = `${environment.quizProgressUrl}/quizprogress`;
    this.studentAnswerUrl = `${environment.studentAnswerUrl}`;
  }

  getQuizProgressesByStudentId(studentId: number): Observable<QuizProgress[]> {
    return this.http.get<QuizProgress[]>(`${this.quizProgressUrl}/${studentId}`);
  }

  addQuizProgressOfStudent(quizProgress: QuizProgress): Observable<QuizProgress> {
    return this.http.post<QuizProgress>(`${this.quizProgressUrl}`, quizProgress);

  }

  getQuizProgressesByQuizIdAndStudId(quizId: number, studentId: number): Observable<QuizProgress> {
    return this.http.get<QuizProgress>(`${this.quizProgressUrl}/${quizId}/${studentId}`);
  }

  getQuizProgressesByQuizIdAndStudIdProg(quizId: number, studentId: number): Observable<QuizProgress> {
    return this.http.get<QuizProgress>(`${this.quizProgressUrl}/progress/${quizId}/${studentId}`);
  }


  getAllQuizProgressdata(): Observable<QuizProgress[]> {
    return this.http.get<QuizProgress[]>(`${this.quizProgressUrl}?data=all`);
  }

  addStudentAnswers(quizProgress: StudentAnswer): Observable<StudentAnswer> {
    return this.http.put<StudentAnswer>(`${this.studentAnswerUrl}`, quizProgress);
  }

  getAllStudentAnswers(quizId: number): Observable<StudentAnswer[]> {
    return this.http.get<StudentAnswer[]>(`${environment.studentAnswerUrl}/${quizId}`);
  }

  getAllStudentAnswersByStduentIdAndQuizId(studentId: number, quizId: number): Observable<StudentAnswer[]> {
    return this.http.get<StudentAnswer[]>(`${environment.studentAnswerUrl}/${studentId}/${quizId}`);
  }
}
