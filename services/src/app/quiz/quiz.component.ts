import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from './quiz';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  [x: string]: any;

  _quizArray: Quiz[] = [];

  constructor(private _quizService: QuizService, private _route: Router) {
    
  }

  ngOnInit(): void {
  
  }

  getAllQuizzes(){
    this._quizService._getAllQuizzes().subscribe(
      data => {
        this._quizArray = data;
        console.log(data);
      }
    )
  }

  
}
