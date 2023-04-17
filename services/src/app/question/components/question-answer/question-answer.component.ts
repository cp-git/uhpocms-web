import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, Renderer2, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Answer } from 'app/question/class/answer';
import { OneQuestionAnswer } from 'app/question/class/one-question-answer';
import { QuestionAnswer } from 'app/question/class/question-answer';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.css']
})
export class QuestionAnswerComponent implements OnInit {
  myForm!: FormGroup;

  @Input() questionAnswers: any[] = [];
  @Input() pagination: boolean = false;
  @Input() submitOption?: boolean = false;
  @Input() disable: boolean = false;

  @Input() selectedCategoryId: any;
  @Input() selectedQuizId: any;
  @Input() selectedCategoryName: any;
  @Input() generatedQuestionAnswerId: number = 0;
  @Output() submitClicked: EventEmitter<any> = new EventEmitter();

  // for pagination 
  currentPage = 1;

  tempQuestionAnswers: QuestionAnswer[] = [];
  imageUrl: string | undefined;

  submittedQuestionAnswer!: OneQuestionAnswer;
  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnInit(): void {

  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['generatedQuestionAnswerId']) {
      this.submittedQuestionAnswer.questionId = this.generatedQuestionAnswerId;
    }
    // console.log(this.submittedQuestionAnswer);


    if (changes['questionAnswers']) {
      this.questionAnswers = this.questionAnswers;
    }
  }

  onFormSubmit(queAns: OneQuestionAnswer) {
    this.submittedQuestionAnswer = {} as OneQuestionAnswer;
    this.submittedQuestionAnswer = queAns;
    console.log(queAns);

    if ((this.selectedCategoryName != 'MCQ' || this.selectedCategoryName != 'mcq') && (queAns.content1 != '' || queAns.content1 != undefined)) {
      queAns.correct1 = true;
    }

    if (queAns.questionId > 0) {
      this.submitClicked.emit(queAns);

    } else {
      queAns.questionId = 0;
      this.submitClicked.emit(queAns);
    }

    queAns.isFormDirty = false;
    queAns.isFormSubmitted = true;
  }

  private initialisedMcqOptions() {
    this.questionAnswers.forEach(queAns => {
      queAns.answers.forEach((answer: Answer, index: number) => {
        if (index === 0) {
          queAns.answers[0] = answer;
        } else if (index === 1) {
          queAns.answers[1] = answer;
        } else if (index === 2) {
          queAns.answers[2] = answer;
        } else if (index === 3) {
          queAns.answers[3] = answer;
        }
      })
      for (let i = queAns.answers.length; i < 4; i++) {
        alert(i)
        if (i === 0) {
          queAns.answers[0] = new Answer();
        } else if (i === 1) {
          queAns.answers[1] = new Answer();
        } else if (i === 2) {
          queAns.answers[2] = new Answer();
        } else if (i === 3) {
          queAns.answers[3] = new Answer();
        }
      }
    })
  }

  onCorrectAnswerSelected(queAns: any, option: any) {
    this.questionAnswers[0].correct2 = "true"
    switch (option) {
      case 'correct1':
        queAns['correct1'] = true;
        queAns['correct2'] = false;
        queAns['correct3'] = false;
        queAns['correct4'] = false;

        break;
      case 'correct2':
        queAns['correct1'] = false;
        queAns['correct2'] = true;
        queAns['correct3'] = false;
        queAns['correct4'] = false;

        break;
      case 'correct3':
        queAns['correct1'] = false;
        queAns['correct2'] = false;
        queAns['correct3'] = true;
        queAns['correct4'] = false;

        break; case 'correct4':
        queAns['correct1'] = false;
        queAns['correct2'] = false;
        queAns['correct3'] = false;
        queAns['correct4'] = true;

        break;
    }
  }

  onFormDirty(queAns: any) {
    if (queAns.isFormDirty == false) {
      queAns.isFormDirty = true;
      queAns.isFormSubmitted = false;
    }
  }

}
