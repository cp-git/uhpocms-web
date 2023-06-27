import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
import { EnrolltostudentService } from 'app/enrollstudent/service/enrolltostudent.service';
import { QuizProgressService } from 'app/quiz-progress/services/quiz-progress.service';
import { QuizProgress } from 'app/quiz-progress/class/quiz-progress';
import { ProfileService } from 'app/profiles/services/profile.service';
import { Profile } from 'app/profiles/class/profile';
import { QuizresultService } from 'app/quiz/services/quizresult.service';
import { StudentAnswer } from 'app/student-module/class/student-answer';
import { CorrectQuestionAnswer } from 'app/question/class/correct-question-answer';
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';

@Component({
  selector: 'app-review-answer',
  templateUrl: './review-answer.component.html',
  styleUrls: ['./review-answer.component.css']
})
export class ReviewAnswerComponent implements OnInit {
    @ViewChild('myForm') myForm: NgForm | undefined; // Access the form using ViewChild
  
    @Output() submitClicked: EventEmitter<number> = new EventEmitter<number>();
    // for pagination 
    currentPage = 1;
    totalQuizMarks: any;
    // title heading
    moduleName: string = "Review";
  
    columnNames: any; // header for minimum visible column data
    allColumnNames: any; // header for all visible column data
  
    allData: any[] = []; // list of active question
    allInActiveData: Question[] = []; // list of inactive question
  
    emptyAnswer: Answer;
    emptyQuestion: Question;  // empty question
    currentData!: Question;  // for update and view, to show existing data
  
    userRole: any;
    mcqAnswer: any;
    options = ['Option 1', 'Option 2', 'Option3', 'Option4'];
  
    // To be assigned based on the module
    readonly primaryIdColumnName: string = 'questionId';
  
    // for scren view
    viewUpdate: boolean = false;
    viewAdd: boolean = false;
    viewAll: boolean = true;
    viewOne: boolean = false;
    viewActivate: boolean = false;
    viewQuePaper: boolean = false;
  
    // for buttons to view
    showAddButton: boolean = false;
    showActivateButton: boolean = false;
    titleWithUserRole: boolean = true;
  
    sessionData: any;
    data: any;
  
    quizzes: Quiz[] = [];
    categories: Category[] = [];
    courses: Course[] = [];
    modules: Module[] = [];
  
    selectedCourseId: any;
    selectedModuleId: any;
    selectedCategoryId: any;
    selectedCategoryName: any;
    selectedQuizId: any;
    selectedStudProfileId: any;
    currentQuestions: Question[] = [];
    currentAnswers: Answer[] = [];
    answer!: Answer;
    questionAnswers: OneQuestionAnswer[] = [];
    correctQueAns :CorrectQuestionAnswer = new CorrectQuestionAnswer();
    correctQuestionAnswer :CorrectQuestionAnswer[]=[]
    oneQuestionAnswer: OneQuestionAnswer;  // empty question
    questionAnswer!: QuestionAnswer;  // empty question
    queAns!: OneQuestionAnswer;
    queAnsResult!:StudentAnswer;
    answers: Answer[] = [];
    selectedQuiz: any
    studProfileIds :number[]=[];
    profileId: any;
    studProfileArr:Profile[] = [];
    studProfile: Profile = new Profile();
    quizResult:StudentAnswer []=[];
    file!: File;
    totalReviewMarks:any=0;
  //  perQueMaxMarks!: number;
    files!: FileList;
  
    myFiles: string[] = [];
  
    generatedQuestionAnswerId: number = 0;;
    constructor(private location: Location,
      private service: QuestionService,private dialogBoxServices: DialogBoxService,
      private courseService: TeacherCourseService, private quizProgServ: QuizProgressService,private profileServ:ProfileService,private quizReService: QuizresultService, private quizProgSErv :QuizProgressService){
      // 
      this.profileId = sessionStorage.getItem('profileId');
      this.columnNames = TeacherQuizColumn;
      this.allColumnNames = TeacherQuizAllColumn;
      this.userRole = sessionStorage.getItem('userRole');
  
      // creating empty object
      this.emptyQuestion = new Question();
      this.emptyAnswer = new Answer();
  
      this.oneQuestionAnswer = new OneQuestionAnswer();
      this.loadCategories();
      this.loadQuizzes();
      this.loadCourses();
      this.loadModules();
        // this.getAllQuestionsByQuizId(this.selectedQuizId)
      // this.totalQuizMarks = 'Your value';
  
    }
  
    ngOnInit(): void {
      // this.getAllQuestions();  // for getting all active questions
      // this.getInActiveQuestions(); // for getting all inactive questions
    }
  
    onFileSelected(event: any) {
      for (var i = 0; i < event.target.files.length; i++) {
        this.myFiles.push(event.target.files[i]);
      }
  
    }
  
    onFormSubmit(queAns: any): void {


      let totalMarkslocal:number=0
      let marksArray:any =[];
      let marksStatArr :boolean[] =[]
      let isSecondAlertDisplayed = false;
      let isFirstAlertDisplayed = false;
      console.log(queAns)
      console.log("queAns['queAnsArray']")
      console.log(queAns['queAnsArray'])
      this.questionAnswer = {} as QuestionAnswer;
      this.oneQuestionAnswer = {} as OneQuestionAnswer;
     this.correctQueAns = {} as CorrectQuestionAnswer;
      // Form is valid, do something with the form data
      // console.log("queAns " + JSON.stringify(queAns));
      queAns['queAnsArray'].forEach( (queAnsForMarks:any)=> {
        marksArray.push(queAnsForMarks.marks)
        if(queAnsForMarks.marks > queAnsForMarks.maxMarks)
        {
          marksStatArr.push(false)
        }
        else{
          marksStatArr.push(true)
        }
      });
      queAns['queAnsArray'].forEach( (queAnsNew:any)=> {
        
     

      let reviewObjectStuAnswer : StudentAnswer = new StudentAnswer();
      reviewObjectStuAnswer.questionId = queAnsNew.questionId;
      reviewObjectStuAnswer.answerId =queAnsNew.answerId;
      reviewObjectStuAnswer.marks = parseFloat(queAnsNew.marks);
      reviewObjectStuAnswer.questionContent = queAnsNew.content1;
      reviewObjectStuAnswer.quizId = queAnsNew.questionQuizId;
      // reviewObjectStuAnswer.selectedOption = queAns.isAnswerCorrect;
      reviewObjectStuAnswer.studentId = queAnsNew.profileId;
      reviewObjectStuAnswer.teacherRemark =queAnsNew.reviewcontent;
      reviewObjectStuAnswer.selectedOption = false;
      console.log(queAnsNew.reviewcontent)
      // this.oneQuestionAnswer = queAns;
      // separating question from object 
      // console.log(queAns.questionId);
      this.questionAnswer.question = {} as Question;
      this.questionAnswer.question['questionId'] = queAnsNew.questionId;

       
      console.log(reviewObjectStuAnswer)

      // if(queAnsNew.marks != '')
      if(marksArray.includes('') == false)
      {
        if(marksStatArr.includes(false) == false){
        // if( reviewObjectStuAnswer.marks <= queAnsNew.maxMarks){

        this.quizProgServ.addStudentAnswers(reviewObjectStuAnswer).subscribe(
          (response) => {
            // this.studentAnswers.push(response);
            // this.studentAnswers = response;
            
            console.log(response)
            console.log("Student answers saved");
            console.log(  typeof this.totalReviewMarks)
            console.log(  typeof reviewObjectStuAnswer.marks)
            if(queAnsNew.marks == '' )
            {
              reviewObjectStuAnswer.marks = 0;
            }

            totalMarkslocal +=  reviewObjectStuAnswer.marks;
            // this.totalReviewMarks = this.totalReviewMarks + reviewObjectStuAnswer.marks;
            this.totalReviewMarks = totalMarkslocal
            this.submitClicked.emit(this.totalReviewMarks);
          },
          (error) => {
            console.log("Failed to save student answers");
          }
        );
        // }
        // else{
        //  alert("Please enter valid marks");
        // }
      }
      else{
        if (!isFirstAlertDisplayed) {
        // alert("Please enter valid marks");
        this.dialogBoxServices.open("Please enter valid marks", 'information');
        queAns = [];
        isFirstAlertDisplayed = true;
        }
      }
    }
   
      else{
        if (!isSecondAlertDisplayed) {
        // alert("Please enter marks for all questions")
        this.dialogBoxServices.open("Please enter marks for all questions", 'information');
        queAns = [];
        isSecondAlertDisplayed = true;
        }
      }
      });
      // this.questionAnswer.question['questionFigure'] = queAns.questionFigure;
      // this.questionAnswer.question['questionContent'] = queAns.questionContent;
      // this.questionAnswer.question['questionExplanation'] = queAns.questionExplanation;
      // this.questionAnswer.question['questionOrderNo'] = queAns.questionOrderNo;
      // if (this.selectedCategoryName == 'MCQ' || this.selectedCategoryName == 'mcq') {
      //   this.questionAnswer.question.questionIsMCQ = true;
      // } else {
      //   this.questionAnswer.question.questionIsMCQ = false;
  
      // }
      // this.questionAnswer.question.questionQuizId = this.selectedQuizId;
      // this.questionAnswer.question.questionCategoryId = this.selectedQuiz.categoryId;
      // this.questionAnswer.question.questionIsActive = true;
  
      // // separating answer from object
      // // this.emptyAnswer = {} as Answer;
      // // this.emptyAnswer.id = this.questionAnswer.answers['id'];
      // // this.emptyAnswer.content = this.questionAnswer.answers['content'];
      // // this.emptyAnswer.correct = true;
      // // this.emptyAnswer.questionorderno = this.questionAnswer.answers['questionorderno'];
      // this.questionAnswer.answers = [];
  
      
      // // making object of answers
      // if (queAns['content1'] != '' || queAns['content1'] != undefined) {
      //   this.answer = {} as Answer;
      //   this.queAnsResult = {} as StudentAnswer;
      //   this.queAnsResult.teacher_remark = queAns['content1'];
     
      //   this.answer.questionorderno = queAns['questionOrderNo'];
  
      //   this.questionAnswer.answers.push(this.answer);
      // }
      // if (queAns['content2'] != '' || queAns['content2'] != undefined) {
      //   this.answer = {} as Answer;
      //   this.answer.content = queAns['content2'];
      //   this.answer.correct = queAns['correct2'];
      //   this.answer.questionorderno = queAns['questionOrderNo'];
  
      //   this.questionAnswer.answers.push(this.answer);
      // }
  
      // if (queAns['content3'] != '' || queAns['content3'] != undefined) {
      //   this.answer = {} as Answer;
  
      //   this.answer.content = queAns['content3'];
      //   this.answer.correct = queAns['correct3'];
      //   this.answer.questionorderno = queAns['questionOrderNo'];
  
      //   this.questionAnswer.answers.push(this.answer);
      // }
  
      // if (queAns['content4'] != '' || queAns['content4'] != undefined) {
      //   this.answer = {} as Answer;
  
      //   this.answer.content = queAns['content4'];
      //   this.answer.correct = queAns['correct4'];
      //   this.answer.questionorderno = queAns['questionOrderNo'];
      //   this.questionAnswer.answers.push(this.answer);
      // }
  
      // // console.log(this.questionAnswer);
  
  
      // const instituteJson = JSON.stringify(this.questionAnswer);
  
      // const blob = new Blob([instituteJson], {
      //   type: 'application/json'
      // })
  
      // let formData = new FormData();
  
      // for (var i = 0; i < this.myFiles.length; i++) {
      //   formData.append("files", this.myFiles[i]);
      // }
  
      // formData.append("request", new Blob([JSON.stringify(this.questionAnswer)], { type: 'application/json' }));
  
      // this.service.addQuestion(formData).subscribe(
      //   (response) => {
      //     this.generatedQuestionAnswerId = response;
  
      //     console.log("Question Added Successfully");
      //   },
      //   (error) => {
      //     console.log("Question added failed")
      //   }
      // )
  
    }
  
    onChangeCourse() {
      this.studProfileArr = [];
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
  
  
    private getAllQuestionAnswers(quizId: number) {
  
  
      this.service.getAllAnswers().subscribe(
        (data) => {
          this.answers = data;
          this.questionAnswers = []; // Initialize questionAnswers as an array
          this.service.getAllQuestionsByQuizId(quizId).subscribe(
            (response: any[]) => {
              console.log(response);
  
              response.forEach(
                question => {
                  this.queAns = {} as OneQuestionAnswer;
  
                  // Filter the answers based on questionId
                  const filteredAnswers = this.answers.filter(answer => answer.questionid == question.questionId);
                  // console.log(filteredAnswers);
  
  
  
                  filteredAnswers.forEach((answer: Answer, index: number) => {
                    // console.log(answer);
                    // console.log(index)
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
                    isFormSubmitted: isFormSubmitted,
                    image: false,
                    isOptionSelected: true,
                    selectedAnswer: ''
                  });
                });
              // console.log("questionAnswer " + JSON.stringify(this.questionAnswers));
  
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
          console.log("Question updated successfuly");
        },
        (error) => {
          console.log("Question updation failed");
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
  
  
      let formData = new FormData();
  
      for (var i = 0; i < this.myFiles.length; i++) {
        formData.append("files", this.myFiles[i]);
      }
  
      formData.append("request", new Blob([JSON.stringify(this.questionAnswer)], { type: 'application/json' }));
  
      // calling service for adding data
      this.service.addQuestion(formData).subscribe(
        response => {
          console.log('Question added Successfully');
          // this.emptyQuestion = {} as Question;
          this.ngOnInit();
          this.back();
        },
        error => {
          console.log("Failed to add question");
        });
    }
  
    // For deleting (soft delete) question using questionFigure
    private deleteQuestion(questionFigure: string) {
  
      // calling service to soft delete
      this.service.deleteQuestion(questionFigure).subscribe(
        (response) => {
          console.log('Question deleted successfully');
          this.ngOnInit();
        },
        (error) => {
          console.log('Question deletion failed');
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
  

  //  async loadStudents(){
  //   this.studProfileArr =[];
  //   this.studProfileIds =[];
  //    let  quizProgressArray:QuizProgress[] = [];
  //     console.log(this.selectedCourseId)
  //     console.log(this.selectedModuleId)
  //     return new Promise<any>((resolve, reject) => {
  //     this.quizProgServ.getStudProfileByCourIdModId(this.selectedCourseId,this.selectedModuleId).subscribe(
  //       (response)=>{
  //       quizProgressArray = response
  //         console.log(quizProgressArray)
  //         for(let i of quizProgressArray){
  //           this.studProfileIds.push(i.studentId);
  //         }
       
  //         console.log(this.studProfileIds)
  //         for(let i of (new Set(this.studProfileIds)))
  //         {
  //           console.log(i)
  //           this.getProfileById(i)
  //           console.log(this.studProfile)
  //           this.studProfileArr.push(this.studProfile)
  //         }

  //         console.log(this.studProfileArr);
  //         resolve(this.studProfileArr);
  //       },
  //       (error) => {
  //         reject(error);
  //       }
  //     )
  //   });

   
    
  // }
    
  // async getProfileById(profId:number){
  //  let profile:Profile = new Profile();
  //  this.studProfile = new Profile();
  //   return new Promise<any>((resolve, reject) => {
  //     this.profileServ.getProfileByAdminId(profId).subscribe(
  //       (response)=>{
        
  //         this.studProfile = response;


  //         resolve(response);
  //       },
  //       (error) => {
  //         reject(error);
  //       }
  //     )
  //   });
  // }


  async loadStudents() {
    this.studProfileArr = [];
    this.studProfileIds = [];
    let quizProgressArray: QuizProgress[] = [];
    console.log(this.selectedCourseId);
    console.log(this.selectedModuleId);
  
    return new Promise<any>((resolve, reject) => {
      this.quizProgServ.getStudProfileByCourIdModId(this.selectedCourseId, this.selectedModuleId).subscribe(
        (response) => {
          quizProgressArray = response;
          console.log(quizProgressArray);
          for (let i of quizProgressArray) {
            this.studProfileIds.push(i.studentId);
          }
          console.log(this.studProfileIds);
  
          const profilePromises = [...new Set(this.studProfileIds)].map((id) => this.getProfileById(id));
  
          Promise.all(profilePromises)
            .then((profiles) => {
              this.studProfileArr = profiles;
              console.log(this.studProfileArr);
              resolve(this.studProfileArr);
            })
            .catch((error) => {
              reject(error);
            });
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  
  async getProfileById(profId: number) {
    return new Promise<Profile>((resolve, reject) => {
      this.profileServ.getProfileByAdminId(profId).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  
 onStudentChange(id:number)
 {
  this.selectedStudProfileId = id;
 }
   
    // selectedCategory!: Category;
    onAddUpdatClicked(object: any) {
      // console.log(JSON.stringify(object))
      this.selectedQuiz = object;
      this.selectedQuizId = this.selectedQuiz.quizId;
      this.selectedCategoryId = this.selectedQuiz.categoryId;
     
      // console.log(this.selectedCategoryId);
      this.categories.find(c => {
        if (c.categoryId === this.selectedCategoryId) {
          this.selectedCategoryName = c.categoryName;
        }
      });
      // console.log(this.selectedCategoryName);
      // console.log(this.categories);
  
      this.categories.find(c => {
        if (c.categoryId === this.selectedCategoryId) {
          this.selectedCategoryName = c.categoryName;
        }
      });
      // console.log(this.selectedCategoryName)
      this.viewAll = false;
      this.viewAdd = true;
      this.viewQuePaper = false;
      this.questionAnswers = [];
      // this.getAllQuestionAnswers(this.selectedQuizId);
      this.getAllAnswersAttempted(this.selectedQuizId)
      // this.getAllQuestionsByQuizId(this.selectedQuizId)
    }
  

    getAllQuestionsByQuizId(quizId:number){ 
      this.totalQuizMarks = 0;
      this.totalReviewMarks = 0;
      this.service.getAllQuestionsByQuizId(quizId).subscribe(
        (response: any[]) => {

          console.log("responses for question")
          console.log(response);

          response.forEach(
            question => {
              console.log(question)
              this.totalQuizMarks = this.totalQuizMarks + question.maxMarks;
              this.totalReviewMarks = this.totalReviewMarks + question.marks;
              console.log(" this.totalQuizMarks   " + this.totalQuizMarks+"  this.totalReviewMarks  " + this.totalReviewMarks)
            })})

    }

    getAllAnswersAttempted(quizId:number){
      this.correctQuestionAnswer=[];
      this.quizResult = [] ;
      this.totalQuizMarks = 0;
      this.totalReviewMarks = 0;
      console.log(quizId)
      console.log("QuizId in  getAllAnswersAttempted")
      // this.quizReService.getAllStudentAnswersByStduentIdAndQuizId(this.selectedStudProfileId,quizId).subscribe(
      //   (result)=>{

      //     this.quizResult = result;
      //     console.log(this.quizResult)
      //   }
      // )

      console.log(this.selectedStudProfileId)

      this.quizReService.getAllStudentAnswersByStduentIdAndQuizId(this.selectedStudProfileId,quizId).subscribe(
        (result)=>{

         this.quizResult = result;
         console.log(this.quizResult)
          this.questionAnswers = []; // Initialize questionAnswers as an array
          this.correctQuestionAnswer = [] 
          
          console.log(quizId)
          if(this.quizResult.length != 0){
          this.service.getAllQuestionsByQuizId(quizId).subscribe(
            (response: any[]) => {

              console.log("responses for question")
              console.log(response);
  
              response.forEach(
                question => {
                  console.log(question)
                  this.totalQuizMarks = this.totalQuizMarks + question.maxMarks;
              
                  console.log(" this.totalQuizMarks   " + this.totalQuizMarks+"  this.totalReviewMarks  " + this.totalReviewMarks)
                  this.queAns = {} as OneQuestionAnswer;
                  this.correctQueAns = {} as CorrectQuestionAnswer
                  // this.perQueMaxMarks = question.maxMarks;
                  // this.queAnsResult = {} as StudentAnswer;
                  // Filter the answers based on questionId
                  const filteredAnswers = this.quizResult.filter(answer => answer.questionId == question.questionId);
                  // console.log(filteredAnswers);
                  
  
  
                  filteredAnswers.forEach((answer: StudentAnswer, index: number) => {
                    this.totalReviewMarks = this.totalReviewMarks + answer.marks;
                    // console.log(answer);
                    // console.log(index)
                    if (index === 0) {
                      this.correctQueAns.content1 = answer.questionContent;
                      this.correctQueAns.marks = 
                      this.correctQueAns.questionId = answer.questionId;
                      this.correctQueAns.questionQuizId = quizId;
                     this.correctQueAns.reviewcontent = answer.teacherRemark;
                     console.log(answer.marks)
                     console.log(question.maxMarks)
               
                        console.log(answer.marks)
                        console.log(question.maxMarks)
                        
                        this.correctQueAns.marks = answer.marks;
                       
                 

                      
                
                      
                       
                      
             
                      this.correctQueAns.profileId = this.selectedStudProfileId;
                  
                    }
                  })
  

  
                  // Push question and filtered answers into questionAnswers array
                  let isFormSubmitted = false;
                  if (question.questionId > 0) {
                    isFormSubmitted = true;
                  }
  
                  this.correctQuestionAnswer.push({
                    ...question,
                    maxMarks : question.maxMarks,
                    content1: this.correctQueAns.content1,
                    isFormDirty: false,
                    isFormSubmitted: isFormSubmitted,
                    image: false,
                    isOptionSelected: true,
                    selectedAnswer: '',
                    questionId : this.correctQueAns.questionId,
                    questionQuizId : this.correctQueAns.questionQuizId ,
                    profileId : this.correctQueAns.profileId ,
                    reviewcontent: this.correctQueAns.reviewcontent ,
                    marks :  this.correctQueAns.marks
                    // questionFigure: '',
                    // questionExplanation: '',
                    // questionOrderNo: 0,
                    // questionIsMCQ: false,
                    // questionQuizId: 0,
                    // questionCategoryId: 0,
                    // questionIsActive: false,
                   
                  });
                });
              // console.log("questionAnswer " + JSON.stringify(this.questionAnswers));
              console.log(this.correctQuestionAnswer);
              if (this.viewAdd == true) {
                this.initialiseQuestion(this.selectedQuiz.maxQuestions);
              }
            }

           
          
          );
          }
        },
        error => {
          console.log("failed to get answers");
        }
      );
  

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
  
