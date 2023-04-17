import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Quiz } from 'app/quiz/class/quiz';
import { Category } from 'app/category/class/category';
import { Course } from 'app/teacher-course/class/course';
import { Module } from 'app/module/class/module';
import { Question } from 'app/question/class/question';
import { TeacherQuizColumn, TeacherQuizAllColumn } from 'app/question/column/question-column';
import { QuestionService } from 'app/question/services/question.service';
import { Answer } from 'app/question/class/answer';
import { NgForm } from '@angular/forms';
import { QuestionAnswer } from 'app/question/class/question-answer';
import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';
import { OneQuestionAnswer } from 'app/question/class/one-question-answer';

@Component({
  selector: 'app-add-question-answer',
  templateUrl: './add-question-answer.component.html',
  styleUrls: ['./add-question-answer.component.css']
})
export class AddQuestionAnswerComponent implements OnInit {
  @ViewChild('myForm') myForm: NgForm | undefined; // Access the form using ViewChild

  // for pagination 
  currentPage = 1;

  // title heading
  moduleName: string = "Question Administration";

  columnNames: any; // header for minimum visible column data
  allColumnNames: any; // header for all visible column data

  allData: any[] = []; // list of active question
  allInActiveData: Question[] = []; // list of inactive question

  emptyAnswer: Answer;
  emptyQuestion: Question;  // empty question
  currentData!: Question;  // for update and view, to show existing data


  // To be assigned based on the module
  readonly primaryIdColumnName: string = 'questionId';

  // for scren view
  viewUpdate: boolean = false;
  viewAdd: boolean = false;
  viewAll: boolean = true;
  viewOne: boolean = false;
  viewActivate: boolean = false;
  viewQuePaper: boolean = false;
  sessionData: any;
  data: any;

  quizzes: Quiz[] = [];
  categories: Category[] = [];
  courses: Course[] = [];
  modules: Module[] = [];

  selectedCourseId: any;
  selectedModuleId: any;
  selectedCategoryId: any;
  selectedQuizId: any;
  selectedCategoryName: any;

  currentQuestions: Question[] = [];
  currentAnswers: Answer[] = [];
  answer!: Answer;
  questionAnswers: OneQuestionAnswer[] = [];
  oneQuestionAnswer: OneQuestionAnswer;  // empty question
  questionAnswer!: QuestionAnswer;  // empty question

  answers: Answer[] = [];
  selectedQuiz: any

  profileId: any;

  generatedQuestionAnswerId: number = 0;;
  constructor(private location: Location,
    private service: QuestionService,
    private courseService: TeacherCourseService
  ) {
    // 
    this.profileId = sessionStorage.getItem('profileId');
    this.columnNames = TeacherQuizColumn;
    this.allColumnNames = TeacherQuizAllColumn;

    // creating empty object
    this.emptyQuestion = new Question();
    this.emptyAnswer = new Answer();

    this.oneQuestionAnswer = new OneQuestionAnswer();
    this.loadCategories();
    this.loadQuizzes();
    this.loadCourses();
    this.loadModules();

  }

  ngOnInit(): void {
    // this.getAllQuestions();  // for getting all active questions
    // this.getInActiveQuestions(); // for getting all inactive questions
  }

  onFormSubmit(queAns: OneQuestionAnswer): void {
    this.questionAnswer = {} as QuestionAnswer;
    this.oneQuestionAnswer = {} as OneQuestionAnswer;

    // Form is valid, do something with the form data
    // console.log("queAns " + JSON.stringify(queAns));

    // this.oneQuestionAnswer = queAns;
    // separating question from object 
    console.log(queAns.questionId);
    this.questionAnswer.question = {} as Question;
    this.questionAnswer.question['questionId'] = queAns.questionId;
    this.questionAnswer.question['questionFigure'] = queAns.questionFigure;
    this.questionAnswer.question['questionContent'] = queAns.questionContent;
    this.questionAnswer.question['questionExplanation'] = queAns.questionExplanation;
    this.questionAnswer.question['questionOrderNo'] = queAns.questionOrderNo;
    if (this.selectedCategoryName == 'MCQ' || this.selectedCategoryName == 'mcq') {
      this.questionAnswer.question.questionIsMCQ = true;
    } else {
      this.questionAnswer.question.questionIsMCQ = false;

    }
    this.questionAnswer.question.questionQuizId = this.selectedQuizId;
    this.questionAnswer.question.questionCategoryId = this.selectedQuiz.categoryId;
    this.questionAnswer.question.questionIsActive = true;

    // separating answer from object
    // this.emptyAnswer = {} as Answer;
    // this.emptyAnswer.id = this.questionAnswer.answers['id'];
    // this.emptyAnswer.content = this.questionAnswer.answers['content'];
    // this.emptyAnswer.correct = true;
    // this.emptyAnswer.questionorderno = this.questionAnswer.answers['questionorderno'];
    this.questionAnswer.answers = [];


    // making object of answers
    if (queAns['content1'] != '' || queAns['content1'] != undefined) {
      this.answer = {} as Answer;
      this.answer.content = queAns['content1'];
      this.answer.correct = queAns['correct1'];
      this.answer.questionorderno = queAns['questionOrderNo'];

      this.questionAnswer.answers.push(this.answer);
    }
    if (queAns['content2'] != '' || queAns['content2'] != undefined) {
      this.answer = {} as Answer;
      this.answer.content = queAns['content2'];
      this.answer.correct = queAns['correct2'];
      this.answer.questionorderno = queAns['questionOrderNo'];

      this.questionAnswer.answers.push(this.answer);
    }

    if (queAns['content3'] != '' || queAns['content3'] != undefined) {
      this.answer = {} as Answer;

      this.answer.content = queAns['content3'];
      this.answer.correct = queAns['correct3'];
      this.answer.questionorderno = queAns['questionOrderNo'];

      this.questionAnswer.answers.push(this.answer);
    }

    if (queAns['content4'] != '' || queAns['content4'] != undefined) {
      this.answer = {} as Answer;

      this.answer.content = queAns['content4'];
      this.answer.correct = queAns['correct4'];
      this.answer.questionorderno = queAns['questionOrderNo'];
      this.questionAnswer.answers.push(this.answer);
    }

    console.log(this.questionAnswer);

    this.service.addQuestion(this.questionAnswer).subscribe(
      (response) => {
        this.generatedQuestionAnswerId = response;

        alert("Question Added Successfully");
      },
      (error) => {
        alert("Question added failed")
      }
    )

  }

  onChangeCourse() {
    this.selectedModuleId = undefined;
    // this.selectedQuiz = {} as Quiz;
    // this.selectedQuizId = undefined;
    // this.allData = []
  }

  onChangeModule() {
    // this.selectedQuiz = {} as Quiz;
    // this.selectedQuizId = undefined;
    // this.allData = []
  }

  onChangeSelectedQuiz() {
    this.questionAnswers = [];
    this.selectedQuiz = this.quizzes.find(quiz => quiz.quizId == this.selectedQuizId);
    // this.currentQuestions.length = this.selectedQuiz.maxQuestions;
    // this.currentAnswers.length = this.selectedQuiz.maxQuestions;

    // console.log(this.selectedQuiz);

    this.service.getAllQuestionsByQuizId(this.selectedQuizId).subscribe(
      response => {
        this.allData = response; //assign data to local variable

        this.getAllQuestionAnswers(this.selectedQuizId);
        // console.log(this.questionAnswers);


      },
      error => {
        console.log('No data in table ');
      }
    );
  }

  private initialiseQuestion(length: number) {
    // this.questionAnswers = [];
    const quesAnsLength = this.questionAnswers.length;

    for (let i = 0; i < length - quesAnsLength; i++) {
      this.questionAnswers.push(new OneQuestionAnswer);
    }
  }
  // for navigating to add screen
  onAddClick() {

    this.viewAll = false;
    this.viewAdd = true;
    this.viewQuePaper = false;
    this.questionAnswers = [];
    this.getAllQuestionAnswers(this.selectedQuizId);

  }

  // for navigating to view question paper screen all question of quiz
  viewQuestionPaper() {
    this.viewAll = false;
    this.viewQuePaper = true;
    this.questionAnswers = [];
    this.getAllQuestionAnswers(this.selectedQuizId);

  }

  queAns!: OneQuestionAnswer;
  private getAllQuestionAnswers(quizId: number) {


    this.service.getAllAnswers().subscribe(
      (data) => {
        this.answers = data;
        this.questionAnswers = []; // Initialize questionAnswers as an array
        this.service.getAllQuestionsByQuizId(quizId).subscribe(
          (response) => {
            response.forEach(
              question => {
                this.queAns = {} as OneQuestionAnswer;

                // Filter the answers based on questionId
                const filteredAnswers = this.answers.filter(answer => answer.questionid == question.questionId);
                console.log(filteredAnswers);



                filteredAnswers.forEach((answer: Answer, index: number) => {
                  // console.log(answer);
                  // alert(index)
                  if (index === 0) {
                    this.queAns.correct1 = answer.correct;
                    this.queAns.content1 = answer.content;
                  } else if (index === 1) {
                    this.queAns.correct2 = answer.correct;
                    this.queAns.content2 = answer.content;
                  } else if (index === 2) {
                    this.queAns.correct3 = answer.correct;
                    this.queAns.content3 = answer.content;
                  } else if (index === 3) {
                    this.queAns.correct4 = answer.correct;
                    this.queAns.content4 = answer.content;
                  }
                })


                // Push question and filtered answers into questionAnswers array
                let isFormSubmitted = false;
                if (question.questionId > 0) {
                  isFormSubmitted = true;
                }
                this.questionAnswers.push({
                  ...question,
                  correct1: this.queAns.correct1,
                  content1: this.queAns.content1,
                  correct2: this.queAns.correct2,
                  content2: this.queAns.content2,
                  correct3: this.queAns.correct3,
                  content3: this.queAns.content3,
                  correct4: this.queAns.correct4,
                  content4: this.queAns.content4,
                  isFormDirty: false,
                  isFormSubmitted: isFormSubmitted
                });
              });
            console.log("questionAnswer " + JSON.stringify(this.questionAnswers));

            if (this.viewAdd == true) {
              this.initialiseQuestion(this.selectedQuiz.maxQuestions);
            }
          }
        );
      },
      error => {
        console.log("failed to get answers");
      }
    );

  }

  // back button functionality
  back() {
    if (this.viewAll == false) {
      this.viewAll = true;
      this.viewOne = false;
      this.viewAdd = false;
      this.viewUpdate = false;
      this.viewActivate = false;
      this.viewQuePaper = false;
    } else {
      this.location.back();
    }

  }


  // for navigating to activate screen
  onActivateClick() {
    this.viewAll = false;
    this.viewActivate = true;
  }

  onUpdateQuestionSubmit(currentData: Question) {
    this.service.updatedQuestion(currentData).subscribe(
      (response) => {
        alert("Question updated successfuly");
      },
      (error) => {
        alert("Question updation failed");
      }
    )
  }

  onCategoryChange(categoryId: any) {
    this.questionAnswers = [];
    this.getAllQuestionAnswers(this.selectedQuizId);
  }

  // For navigate to view screen with data
  // function will call when child view button is clicked 
  onChildViewClick(objectReceived: any): void {

    // hiding view of all column and displaying all questions screen 
    this.viewOne = true;
    this.viewAll = false;

    this.currentData = objectReceived;    // assingning data to current data for child component
  }

  // function will call when child delete button is clicked 
  onChildDeleteClick(objectReceived: Question): void {
    this.deleteQuestion(objectReceived.questionFigure);
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildUpdateClick(objectReceived: Question): void {
    // hiding update screen and displaying all admin roles screen 
    this.viewAll = false;
    this.viewAdd = true;
    this.viewQuePaper = false;

    // assingning data to current data for child component
    this.currentData = objectReceived;
    this.selectedQuiz = objectReceived;
    this.selectedQuizId = this.selectedQuiz.quizId;
    this.questionAnswers = [];

    this.getAllQuestionAnswers(this.selectedQuizId);
    // this.addQuestion(objectReceived.questionFigure);
  }




  ///////////////////////////////////////////
  // Funcation calls specific to this module
  ///////////////////////////////////////////

  // for getting all questions
  private getAllQuestions() {

    // calling service to get all data
    this.service.getAllQuestions().subscribe(
      response => {

        this.allData = response; //assign data to local variable

      },
      error => {
        console.log('No data in table ');
      }
    );
  }


  // For adding question
  private addQuestion(questionAnswer: QuestionAnswer) {

    questionAnswer.question['questionIsActive'] = true;  // setting active true

    // calling service for adding data
    this.service.addQuestion(questionAnswer).subscribe(
      response => {
        alert('Question added Successfully');
        // this.emptyQuestion = {} as Question;
        this.ngOnInit();
        this.back();
      },
      error => {
        alert("Failed to add question");
      });
  }

  // For deleting (soft delete) question using questionFigure
  private deleteQuestion(questionFigure: string) {

    // calling service to soft delete
    this.service.deleteQuestion(questionFigure).subscribe(
      (response) => {
        alert('Question deleted successfully');
        this.ngOnInit();
      },
      (error) => {
        alert('Question deletion failed');
      }
    );
  }




  /////////////////////////////////////
  // Dropdown data function calls
  ////////////////////////////////////

  private loadQuizzes() {
    try {
      this.sessionData = sessionStorage.getItem('quiz');

      this.data = JSON.parse(this.sessionData);
      for (var inst in this.data) {
        this.allData.push(this.data[inst]);
      }
    }
    catch (err) {
      console.log("Error", err);
    }
  }

  private loadCategories() {
    try {
      this.sessionData = sessionStorage.getItem('category');

      this.data = JSON.parse(this.sessionData);
      for (var inst in this.data) {
        this.categories.push(this.data[inst]);
      }
    }
    catch (err) {
      console.log("Error", err)
    }

  }
  private loadCourses() {
    // try {
    //   this.sessionData = sessionStorage.getItem('course');

    //   this.data = JSON.parse(this.sessionData);
    //   for (var inst in this.data) {
    //     this.courses.push(this.data[inst]);
    //   }
    // }
    // catch (err) {
    //   console.log("Error", err)
    // }

    this.courseService.getAssignedCourseOfTeacher(this.profileId).subscribe(
      (data) => {
        console.log(data);

        this.courses = data;
      },
      error => {
        console.log(error);
      }
    );

  }

  private loadModules() {

    try {
      this.sessionData = sessionStorage.getItem('module');

      this.data = JSON.parse(this.sessionData);
      for (var inst in this.data) {
        this.modules.push(this.data[inst]);
      }
    }
    catch (err) {
      console.log("Error", err)
    }

  }

  onAddUpdatClicked(object: any) {
    // alert(JSON.stringify(object))
    this.selectedQuiz = object;
    this.selectedQuizId = this.selectedQuiz.quizId;
    this.selectedCategoryId = this.selectedQuiz.categoryId;

    // console.log(this.categories);

    this.categories.find(c => {
      if (c.categoryId === this.selectedCategoryId) {
        this.selectedCategoryName = c.categoryName;
      }
    });
    // alert(this.selectedCategoryName)
    this.viewAll = false;
    this.viewAdd = true;
    this.viewQuePaper = false;
    this.questionAnswers = [];
    this.getAllQuestionAnswers(this.selectedQuizId);
  }

  onViewClicked(object: any) {
    this.selectedQuiz = object;
    this.selectedQuizId = this.selectedQuiz.quizId;
    this.selectedCategoryId = this.selectedQuiz.categoryId;
    this.viewAll = false;
    this.viewQuePaper = true;
    this.questionAnswers = [];
    this.getAllQuestionAnswers(this.selectedQuizId);

  }

  onDeleteClicked(object: any) {

  }
}
