import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentAnswer } from 'app/student-module/class/student-answer';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class QuizresultService {
  private quizResultUrl: string;

  constructor(private http: HttpClient) {
    this.quizResultUrl = environment.studentAnswerUrl
  }

  ////////////////////////////////////  SERVICE - GET ALL STUDENT ANSWER BY STUDENT ID AND QUIZ ID ///////////////////////
  getAllStudentAnswersByStduentIdAndQuizId(studentId: number, quizId: number): Observable<StudentAnswer[]> {
    return this.http.get<StudentAnswer[]>(`${environment.studentAnswerUrl}/${studentId}/${quizId}`);
  }


  //////////////////////////////////// SERVICE - ADD UPDATE QUIZ RESULT ///////////////////////////////////////////////////
  addUpdateQuizResult(quizResult: StudentAnswer): Observable<any> {
    console.log(quizResult)
    return this.http.put<any>(`${this.quizResultUrl}`, quizResult);
  }




}
