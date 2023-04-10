import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { QuestionAnswer } from 'app/question/class/question-answer';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.css']
})
export class QuestionAnswerComponent {

  @Input() questionAnswers: any[] = [];
  @Input() pagination: boolean = false;
  @Input() submitOption?: boolean = false;
  @Input() disable: boolean = false;

  @Input() selectedCategoryId: any;
  @Input() selectedQuizId: any;

  @Output() submitClicked: EventEmitter<any> = new EventEmitter();

  // for pagination 
  currentPage = 1;


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['questionAnswers']) {
      this.questionAnswers = this.questionAnswers;
    }
  }

  onFormSubmit(queAns: QuestionAnswer) {
    this.submitClicked.emit(queAns);
  }
}
