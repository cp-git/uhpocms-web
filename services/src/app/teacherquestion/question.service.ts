import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from './question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }
  
  questionList():Observable<any>{
    return this._http.get<any>("http://localhost:8090/question/uhpocms/question?figure=all");
  }

  addQuestion(question:Question): Observable<any> {
    return this._http.post<any>("http://localhost:8090/question/uhpocms/question",question);
  }

 deleteQuestion(questionFigure: string): Observable<any> {
    return this._http.delete<any>("http://localhost:8090/question/uhpocms/question/"+questionFigure);
  }

  getQuestion(questionFigure:string): Observable<any> {
    return this._http.get<any>("http://localhost:8090/question/uhpocms/question/"+questionFigure);
  }

  updatedQuestion(questionFigure:string,question:Question): Observable<any> {
    
    return this._http.put<any>("http://localhost:8090/question/uhpocms/question/"+questionFigure,question);
  }
}
