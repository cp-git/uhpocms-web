import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, Renderer2, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Answer } from 'app/question/class/answer';
import { OneQuestionAnswer } from 'app/question/class/one-question-answer';
import { QuestionAnswer } from 'app/question/class/question-answer';
import { environment } from 'environments/environment.development';

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
  @Input() selectedCategoryName: any;
  @Input() selectedQuizId: any;
  @Input() generatedQuestionAnswerId: number = 0;

  @Output() submitClicked: EventEmitter<any> = new EventEmitter();


  mcqAnswer: any;
  options = ['Option 1', 'Option 2', 'Option3', 'Option4'];

  fileName!: string;
  // for pagination 
  currentPage = 1;
  page = 1;
  // selectedCategory: string;
  isMcqFormVisible: boolean = false;
  isNonMcqFormVisible: boolean = false;

  questionUrl!: string;

  displayUrl!: any





  addOption() {
    this.options.push('Option ' + (this.options.length + 1));
  }
  // Define a function to handle page changes

  removeOption(index: any) {
    this.options.splice(index, 1);
  }


  // onCategorySelected() {
  //   if (this.selectedCategory === 'mcq') {
  //     this.isMcqFormVisible = true;
  //     this.isNonMcqFormVisible = false;
  //   } else if (this.selectedCategory === 'non-mcq') {
  //     this.isMcqFormVisible = false;
  //     this.isNonMcqFormVisible = true;
  //   } else {
  //     this.isMcqFormVisible = false;
  //     this.isNonMcqFormVisible = false;
  //   }
  // }

  //pagination

  // sessionData: any;
  // data: any;

  image: string | undefined;

  // tempQuestionAnswers: QuestionAnswer[] = [];

  submittedQuestionAnswer!: OneQuestionAnswer;
  isOptionSelected: boolean = false;
  constructor() {
    this.questionUrl = `${environment.questionUrl}`;
  }

  ngOnInit(): void {
    this.displayUrl = this.questionUrl + '/getFileById';

  }

  onFileSelected(event: any, queAns: OneQuestionAnswer) {
    // console.log(JSON.stringify(queAns))
    const file = event.target.files[0];
    this.fileName = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result as string;
      queAns.image = true;
    };
    reader.readAsDataURL(file);
    queAns.questionFigure = this.fileName;

    // console.log(queAns.questionFigure)

    if (queAns.isFormDirty == false) {
      queAns.isFormDirty = true;
      queAns.isFormSubmitted = false;
    }


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

    if ((this.selectedCategoryName.toUpperCase() != 'MCQ')) {
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

  // private initialisedMcqOptions() {
  //   this.questionAnswers.forEach(queAns => {
  //     queAns.answers.forEach((answer: Answer, index: number) => {
  //       if (index === 0) {
  //         queAns.answers[0] = answer;
  //       } else if (index === 1) {
  //         queAns.answers[1] = answer;
  //       } else if (index === 2) {
  //         queAns.answers[2] = answer;
  //       } else if (index === 3) {
  //         queAns.answers[3] = answer;
  //       }
  //     })
  //     for (let i = queAns.answers.length; i < 4; i++) {
  //       console.log(i)
  //       if (i === 0) {
  //         queAns.answers[0] = new Answer();
  //       } else if (i === 1) {
  //         queAns.answers[1] = new Answer();
  //       } else if (i === 2) {
  //         queAns.answers[2] = new Answer();
  //       } else if (i === 3) {
  //         queAns.answers[3] = new Answer();
  //       }
  //     }
  //   })
  // }

  onAnswerSelected(queAns: any, option: any) {

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
    if (queAns.correct1 == true || queAns.correct2 == true || queAns.correct3 == true || queAns.correct4 == true) {
      queAns.isOptionSelected = true;
    } else {
      queAns.isOptionSelected = false;
    }
  }

  onFormDirty(queAns: any) {
    if (queAns.isFormDirty == false) {
      queAns.isFormDirty = true;
      queAns.isFormSubmitted = false;
    }
  }

  onAnswerEntered(queAns: OneQuestionAnswer) {
    queAns.correct1 = true;
    queAns.isOptionSelected = true;
  }

}
