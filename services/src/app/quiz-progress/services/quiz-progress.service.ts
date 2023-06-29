import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { QuizProgress } from '../class/quiz-progress';
import { environment } from 'environments/environment.development';
import { StudentAnswer } from 'app/student-module/class/student-answer';
import { DataServiceCache } from 'app/cache/service/data-service.service';

@Injectable({
  providedIn: 'root'
})
export class QuizProgressService {

  private quizProgressUrl: string;
  studentAnswerUrl: string;

  constructor(private http: HttpClient, private cache: DataServiceCache) {
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


  
  getStudProfileByCourIdModId(courseId:any, moduleId: any){
    const cachedData = this.cache.getDataFromCache(`${this.quizProgressUrl}/courIdAndmodId/` + courseId +"/"+moduleId);
    if (cachedData) {
      return of(cachedData);
    }

    return this.http.get<QuizProgress[]>(`${this.quizProgressUrl}/courIdAndmodId/` + courseId +"/"+moduleId).pipe(
    //   tap(data => this.cache.setDataInCache(`${this.courseProgressUrl}/courseprog?id=all`, data))
    // );

    tap(data => {
      // Update cache with new data
      this.cache.removeFromCache(`${this.quizProgressUrl}/courIdAndmodId/` + courseId +"/"+moduleId);
      this.cache.setDataInCache((`${this.quizProgressUrl}/courIdAndmodId/` + courseId +"/"+moduleId), data);
    })
  );

  
  }


}
