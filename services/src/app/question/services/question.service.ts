import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../class/question';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { Answer } from '../class/answer';
import { QuestionAnswer } from '../class/question-answer';
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

  /////////////////////////////////////////// SERVICE - FETCHED ALL QUESTIONS LIST ////////////////////////////////////////////////////
  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.questionUrl}/question?figure=all`);
  }


  //////////////////////////////////////////// SERVICE - ADD QUESTION AND ANSWER //////////////////////////////////////////////////////
  addQuestion(formData: FormData): Observable<number> {
    return this.http.post<number>(`${this.questionUrl}/question/add`, formData);
  }


  ///////////////////////////////////////// SERVICE -DELETE QUESTION BY QUESTION FIGURE ////////////////////////////////////////////
  deleteQuestion(questionFigure: string): Observable<Question> {
    return this.http.delete<Question>(`${this.questionUrl}/question/${questionFigure}`);
  }

  /////////////////////////////////////// SERVICE - DELETE QUESTION AND ANSWER //////////////////////////////////
  deleteQuesAndAns(quesId: number) {
    return this.http.delete<any>(`${this.questionUrl}/question/deletequeansbyid/${quesId}`)
  }

  // //get question by quesiton figure    Not used
  // getQuestion(questionFigure: string): Observable<Question> {
  //   return this.http.get<Question>(`${this.questionUrl}/question/${questionFigure}`);
  // }


  /////////////////////////////////// SERVICE - UPDATE QUESTION BY QUESTION FIGURE /////////////////////////////
  updatedQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.questionUrl}/question/byid/${question.questionId}`, question);
  }

  ////////////////////////////////// SERVICE -GET INACTIVE QUESTIONS LIST  ////////////////////////////////
  getInactiveQuestionsList(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.questionUrl}/question/inactive?inactivequestions=all`);
  }

  //////////////////////////////// SERVICE -ACTIVATE QUESTION ///////////////////////////////////////////
  activateQuestion(questionFigure: string): Observable<Question> {
    return this.http.patch<Question>(`${this.questionUrl}/question/${questionFigure}`, {});
  }


  // //Not Used
  // addAnswer(answer: Answer) {
  //   return this.http.post<Answer>(`${this.answerUrl}/answer`, answer);
  // }


  ///////////////////////////////////// SERVICE - GET ALL QUESTION BY QUIZ ID ////////////////////////////
  getAllQuestionsByQuizId(quizId: number) {
    return this.http.get<any>(`${this.questionUrl}/questions?quizId=${quizId}`);
  }

  ///////////////////////////////////// SERVICE -GET ALL ANSWERS /////////////////////////////////////////
  getAllAnswers(): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.answerUrl}/answer?id=all`);
  }

  //////////////////////////////////// SERVICE - GET SHUFFLED QUESTION BY QUIZ ID //////////////////////
  getShuffledQuestionsByQuizId(quizId: number) {
    return this.http.get<Question[]>(`${this.questionUrl}/questions/quizid/${quizId}`);
  }

  ////////////////////////////// SERVICE - GET QUIZ DETAILS BY QUIZ ID ////////////////////////////// 
  getQuizDetailsByQuizId(quizId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8090/quiz/uhpocms/quiz/info/${quizId}`);
  }
}
