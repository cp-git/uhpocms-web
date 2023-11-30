import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { QuizProgress } from '../class/quiz-progress';
import { environment } from 'environments/environment.development';
import { StudentAnswer } from 'app/student-module/class/student-answer';
import { DataServiceCache } from 'app/cache/service/data-service.service';
import { StudentQuiz } from '../class/student-quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizProgressService {

  private quizProgressUrl: string;
  studentAnswerUrl: string;
  quizurlProgress: string;

  constructor(private http: HttpClient, private cache: DataServiceCache) {
    this.quizProgressUrl = `${environment.quizProgressUrl}/quizprogress`;
    this.studentAnswerUrl = `${environment.studentAnswerUrl}`;
    this.quizurlProgress = `${environment.quizProgressUrl}`;

  }


  //Used
  getQuizProgressesByStudentId(studentId: number): Observable<QuizProgress[]> {
    return this.http.get<QuizProgress[]>(`${this.quizProgressUrl}/${studentId}`);
  }

  //Used
  addQuizProgressOfStudent(quizProgress: QuizProgress): Observable<QuizProgress> {
    return this.http.post<QuizProgress>(`${this.quizProgressUrl}`, quizProgress);

  }

  //Used
  getQuizProgressesByQuizIdAndStudId(quizId: number, studentId: number): Observable<QuizProgress> {
    return this.http.get<QuizProgress>(`${this.quizProgressUrl}/${quizId}/${studentId}`);
  }


  //Not Used
  getQuizProgressesByQuizIdAndStudIdProg(quizId: number, studentId: number): Observable<QuizProgress> {
    return this.http.get<QuizProgress>(`${this.quizProgressUrl}/progress/${quizId}/${studentId}`);
  }


  //Used
  getAllQuizProgressdata(): Observable<QuizProgress[]> {
    return this.http.get<QuizProgress[]>(`${this.quizProgressUrl}?data=all`);
  }

  //Used
  addStudentAnswers(quizProgress: StudentAnswer): Observable<StudentAnswer> {
    return this.http.put<StudentAnswer>(`${this.studentAnswerUrl}`, quizProgress);
  }


  //Not Used
  getAllStudentAnswers(quizId: number): Observable<StudentAnswer[]> {
    return this.http.get<StudentAnswer[]>(`${environment.studentAnswerUrl}/${quizId}`);
  }

  //Used :StudentQuizResult API
  getAllStudentAnswersByStduentIdAndQuizId(studentId: number, quizId: number): Observable<StudentAnswer[]> {
    return this.http.get<StudentAnswer[]>(`${environment.studentAnswerUrl}/${studentId}/${quizId}`);
  }


  //Used in Review Answer
  getStudProfileByCourIdModId(courseId: any, moduleId: any) {
    const cachedData = this.cache.getDataFromCache(`${this.quizProgressUrl}/courIdAndmodId/` + courseId + "/" + moduleId);
    if (cachedData) {
      return of(cachedData);
    }

    return this.http.get<QuizProgress[]>(`${this.quizProgressUrl}/courIdAndmodId/` + courseId + "/" + moduleId).pipe(
      //   tap(data => this.cache.setDataInCache(`${this.courseProgressUrl}/courseprog?id=all`, data))
      // );

      tap(data => {
        // Update cache with new data
        this.cache.removeFromCache(`${this.quizProgressUrl}/courIdAndmodId/` + courseId + "/" + moduleId);
        this.cache.setDataInCache((`${this.quizProgressUrl}/courIdAndmodId/` + courseId + "/" + moduleId), data);
      })
    );


  }


  //Not Used
  addQuizAllProgressOfStudent(studentQuiz: StudentQuiz): Observable<any> {
    return this.http.post<QuizProgress>(`${this.quizProgressUrl}/allquizprogress`, studentQuiz);

  }



  //Used
  displayStudentProgress(studentId: number): Observable<QuizProgress[]> {
    return this.http.get<QuizProgress[]>(`${this.quizurlProgress}/studentprogress/${studentId}`);

  }


}
