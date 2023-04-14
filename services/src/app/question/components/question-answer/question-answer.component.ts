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
  @Input() selectedCategoryName: any;
  @Input() selectedQuizId: any;

  // @Input() mcqAnswer: any;
  //  @Input() options :any;
  @Output() submitClicked: EventEmitter<any> = new EventEmitter();


  mcqAnswer: any;
  options = ['Option 1', 'Option 2', 'Option3', 'Option4'];


  // for pagination 
  currentPage = 1;
  page = 1;
  selectedCategory: string;
  isMcqFormVisible: boolean = false;
  isNonMcqFormVisible: boolean = false;



  addOption() {
    this.options.push('Option ' + (this.options.length + 1));
  }
  // Define a function to handle page changes

  removeOption(index: any) {
    this.options.splice(index, 1);
  }


  onCategorySelected() {
    if (this.selectedCategory === 'mcq') {
      this.isMcqFormVisible = true;
      this.isNonMcqFormVisible = false;
    } else if (this.selectedCategory === 'non-mcq') {
      this.isMcqFormVisible = false;
      this.isNonMcqFormVisible = true;
    } else {
      this.isMcqFormVisible = false;
      this.isNonMcqFormVisible = false;
    }
  }

  //pagination

  sessionData: any;
  data: any;

  imageUrl: string | undefined;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['questionAnswers']) {
      this.questionAnswers = this.questionAnswers;
    }
  }

  onFormSubmit(queAns: QuestionAnswer) {
    this.submitClicked.emit(queAns);
  }
}
