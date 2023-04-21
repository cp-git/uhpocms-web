import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuizProgress } from '../class/quiz-progress';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class QuizProgressService implements OnInit {

  private quizProgressUrl: string;

  constructor(private http: HttpClient) {
    this.quizProgressUrl = `http://localhost:8090/quizprogress/uhpocms/quizprogress`;
  }

  ngOnInit(): void {

  }

  getQuizProgressesByStudentId(studentId: number): Observable<QuizProgress[]> {
    return this.http.get<QuizProgress[]>(`${this.quizProgressUrl}/${studentId}`);
  }
}
