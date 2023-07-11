import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OneQuestionAnswer } from 'app/question/class/one-question-answer';
import { environment } from 'environments/environment.development';

@Component({
  selector: 'app-student-review',
  templateUrl: './student-review.component.html',
  styleUrls: ['./student-review.component.css']
})
export class StudentReviewComponent implements OnInit {
  myForm!: FormGroup;


  @Input() questionAnswers: any[] = [];
  @Input() pagination: boolean = false;
  @Input() submitOption?: boolean = false;
  @Input() disable: boolean = false;

  @Input() selectedCategoryId: any;
  @Input() selectedCategoryName: any;
  @Input() selectedQuizId: any;
  @Input() generatedQuestionAnswerId: number = 0;
  @Input() totalReviewMarks: number = 0; 
  @Input() totalQuizMarks: any; // Define the Input property
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
  
    const file = event.target.files[0];
    this.fileName = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result as string;
      queAns.image = true;
    };
    reader.readAsDataURL(file);
    queAns.questionFigure = this.fileName;

 
    if (queAns.isFormDirty == false) {
      queAns.isFormDirty = true;
      queAns.isFormSubmitted = false;
    }


  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['generatedQuestionAnswerId']) {
      this.submittedQuestionAnswer.questionId = this.generatedQuestionAnswerId;
    }


    if (changes['questionAnswers']) {
      this.questionAnswers = this.questionAnswers;
    }
  }

  onFormSubmit(queAns: OneQuestionAnswer,queAnsArray: OneQuestionAnswer[]) {
    this.submittedQuestionAnswer = {} as OneQuestionAnswer;
    this.submittedQuestionAnswer = queAns;
    console.log(queAns);
    // let optionSelected :boolean = this.isOptionSelected


  //  console.log(this.myNumber)

    if ((this.selectedCategoryName.toUpperCase() != 'MCQ')) {
      queAns.correct1 = true;
    }

    if (queAns.questionId > 0) {
      this.submitClicked.emit({queAns,queAnsArray});

    } else {
      queAns.questionId = 0;
      this.submitClicked.emit({queAns,queAnsArray});
    }

    queAns.isFormDirty = false;
    queAns.isFormSubmitted = true;
  }

 

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
