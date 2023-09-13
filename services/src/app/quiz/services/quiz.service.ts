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

  //////////////////////////////////////////////// SERVICE - GET ALL QUIZZESS ////////////////////////////////////////////////////
  getAllQuizzes(): Observable<any> {
    // return this.http.get<any>("http://localhost:8090/quiz/uhpocms/quiz?title=all");
    return this.http.get<any>(`${this.quizUrl}/` + "?title=all");
  }


  ////////////////////////////// SERVICE - FETCH ALL INACTIVE QUIZZESS ///////////////////////////////////////////////////////////////
  fetchAllActInactQuizs(): Observable<any> {
    // alert(this.baseUrl + this.quizWar + this.quizURL)

    return this.http.get<any>(`${this.quizUrl}/` + "actInactQuizzes?actInac=all");
  }


  ////////////////////////////////// SERVICE - GET QUIZ BY TITLE ////////////////////////////////////////////////////////////
  getQuizByTitle(title: string): Observable<any> {
    return this.http.get<any>(`${this.quizUrl}/` + title);
  }


  ////////////////////////////////// SERVICE -ADD QUIZ ////////////////////////////////////////////////////////////////////
  addQuiz(quiz: Quiz): Observable<any> {
    return this.http.post<any>(`${this.quizUrl}`, quiz);
  }


  ////////////////////////////////// SERVICE -UPDATE THE QUIZ /////////////////////////////////////////////////////////////
  updateQuiz(title: string, quiz: Quiz): Observable<any> {
    return this.http.put<any>(`${this.quizUrl}/` + title, quiz);
  }


  /////////////////////////////////////// SERVICE -DELETE QUIZ BY QUIZ TITLE ////////////////////////////////////////////
  deleteQuiz(title: string): Observable<any> {
    return this.http.delete<any>(`${this.quizUrl}/` + title);
  }


  //////////////////////////////////// SERVICE - GET INACTIVE QUIZ LIST //////////////////////////////////////////////////
  getInactiveQuizList(): Observable<any> {
    return this.http.get<any>(`${this.quizUrl}/inactive?inactivequizzes=all`);
  }


  ///////////////////////////////// SERVICE - ACTIVATE THE QUIZ  ID /////////////////////////////////////////////////
  updateActiveStatus(id: number, quiz: Quiz): Observable<any> {
    return this.http.patch<any>(`${this.quizUrl}/` + id, quiz);
  }

  ////////////////////////////// SERVICE - GET ALL QUIZ BY PROFILE ID ///////////////////////////////////////////////
  getAllQuizzesByProfileId(studentId: number): Observable<Quiz[]> {
    // return this.http.get<any>("http://localhost:8090/quiz/uhpocms/quiz?title=all");
    return this.http.get<Quiz[]>(`${this.quizUrl}/studentId?id=${studentId}`);
  }


  /////////////////////////////// SERVICE - GET ALL QUIZ BY MODULE ID ///////////////////////////////////////////////
  getAllQuizzesByModuleId(moduleId: number): Observable<Quiz[]> {
    // return this.http.get<any>("http://localhost:8090/quiz/uhpocms/quiz?title=all");
    return this.http.get<Quiz[]>(`${this.quizUrl}/moduleId/${moduleId}`);
  }


  ////////////////////////////// SERVICE - GET INACTIVE QUIZZES ASSIGNED COURSES BY PROFILE ID //////////////////////
  getInactiveQuizzesOfModulesOfAssignedCoursesByProfileId(profileId: number): Observable<Quiz[]> {
    return this.http.get<any>(`${this.quizUrl}/assign/inactive/profileid?id=${profileId}`);

  }

  /////////////////////////////// SERVICE - GET ACTIVE QUIZZESS OF MODULES ASSIGN COURSES BY PROFILE ID ///////////////////////
  getActiveQuizzesOfModulesOfAssignedCoursesByProfileId(profileId: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.quizUrl}/assign/active/profileid?id=${profileId}`);

  }


  //////////////////////  SERVICE - GET ACTIVE QUIZZESS MODULE ENROLLED COURSES BY PROFILE ID ////////////////////////////////////////
  getActiveQuizzesOfModulesOfEnrolledCoursesByProfileId(profileId: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.quizUrl}/studentId?id=${profileId}`);

  }


  ////////////////////////////////////  SERVICE - GET INACTIVE QUIZZESS MODULES OF ENROLLED COURSES BY PROFILE ID ////////////////////
  getInactiveQuizzesOfModulesOfEnrolledCoursesByProfileId(profileId: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.quizUrl}/enroll/inactive/profileid?id=${profileId}`);

  }

  //////////////////////////////////// SERVICE -  GET QUIZ BY QUIZ ID ////////////////////////////////////////////////////////////
  getQuizQuizId(quizId: number): Observable<any> {
    return this.http.get<any>(`${this.quizUrl}/quizId/${quizId}`);
  }
}
