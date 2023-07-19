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
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';
import { AuthUserPermission } from 'app/permissions/class/auth-user-permission';
import { AuthUserPermissionService } from 'app/permissions/services/authUserPermission/auth-user-permission.service';
import { userModule } from 'app/permissions/enum/user-module.enum';

import { QuizService } from 'app/quiz/services/quiz.service';
import { CategoryService } from 'app/category/services/category.service';
@Component({
  selector: 'app-add-question-answer',
  templateUrl: './add-question-answer.component.html',
  styleUrls: ['./add-question-answer.component.css']
})
export class AddQuestionAnswerComponent implements OnInit {
  @ViewChild('myForm') myForm: NgForm | undefined; // Access the form using ViewChild
  
  @Output() submitClicked: EventEmitter<number> = new EventEmitter<number>();
  // for pagination 
  currentPage = 1;

  // title heading
  moduleName: string = "QA";

  columnNames: any; // header for minimum visible column data
  allColumnNames: any; // header for all visible column data
 totalQuizMarks:number=0
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

  currentQuestions: Question[] = [];
  currentAnswers: Answer[] = [];
  answer!: Answer;
  questionAnswers: OneQuestionAnswer[] = [];
  oneQuestionAnswer: OneQuestionAnswer;  // empty question
  questionAnswer!: QuestionAnswer;  // empty question
  queAns!: OneQuestionAnswer;
  answers: Answer[] = [];
  selectedQuiz: any
  totalMarks!: number;
  profileId: any;
  mcqCategory : Category []= [];
  file!: File;
  isButtonDisabled: boolean = false;
  files!: FileList;
  passMarks:number=0
  maxMarks:number=0
  myFiles: string[] = [];

  userId: any;
  buttonsArray: any;
  userAndRolePermissions: AuthUserPermission[] = [];

  generatedQuestionAnswerIdArr: number[] = [];
  generatedQuestionAnswerId: number = 0;;
  totMarksToDisplay:number=0
  constructor(private location: Location,
    private service: QuestionService,
    private courseService: TeacherCourseService,
    private userPermissionService: AuthUserPermissionService,

    private dialogBoxService:DialogBoxService,private quizServ:QuizService, private categoryServ : CategoryService
  ) {

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

    this.userId = sessionStorage.getItem('userId');

    this.buttonsArray = {
      showAddButton: false,
      showActivateButton: false,
      showUpdateButton: false,
      showDeleteButton: false
    }

  }

  ngOnInit(): void {
    this.loadAndLinkUserPermissions();

    // this.getAllQuestions();  // for getting all active questions
    // this.getInActiveQuestions(); // for getting all inactive questions
 
  }

  // this function for loading permission from session storage and link permission 
  // with buttons to show and hide based on permissions 
  private async loadAndLinkUserPermissions() {
    this.userAndRolePermissions = await this.userPermissionService.linkAndLoadPermissions(userModule.QUESTION_ANSWER, this.userAndRolePermissions, this.buttonsArray);
    await this.userPermissionService.toggleButtonsPermissions(this.userAndRolePermissions, this.buttonsArray);
  }


  onFileSelected(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }

  }
  
// // Working code
//   onFormSubmit(queAns: OneQuestionAnswer): void {
//     this.questionAnswer = {} as QuestionAnswer;
//     this.oneQuestionAnswer = {} as OneQuestionAnswer;

//     console.log("Parameter queAns Array")
//     console.log(queAns)

// //New REq Code start from here 




// //New REq Code end from here 




//   this.service.getAllQuestionsByQuizId(queAns.questionQuizId).subscribe(
//       (response: any[]) => {
//         console.log(response);
//         response.forEach(
//           question => {
           
//             this.totalMarks = this.totalMarks + question.maxMarks;
            
//           })
//       });

//     this.questionAnswer.question = {} as Question;
//     this.questionAnswer.question['questionId'] = queAns.questionId;
//     this.questionAnswer.question['questionFigure'] = queAns.questionFigure;
//     this.questionAnswer.question['questionContent'] = queAns.questionContent;
//     this.questionAnswer.question['questionExplanation'] = queAns.questionExplanation;
//     this.questionAnswer.question['questionOrderNo'] = queAns.questionOrderNo;
//     this.questionAnswer.question['maxMarks'] = queAns.maxMarks;
   
//      queAns.totalMarks = this.totalMarks;
//     if (this.selectedCategoryName == 'MCQ' || this.selectedCategoryName == 'mcq') {
//       this.questionAnswer.question.questionIsMCQ = true;
//     } else {
//       this.questionAnswer.question.questionIsMCQ = false;

//     }
//     this.questionAnswer.question.questionQuizId = this.selectedQuizId;
//     this.questionAnswer.question.questionCategoryId = this.selectedQuiz.categoryId;
//     this.questionAnswer.question.questionIsActive = true;

//     // separating answer from object
//     // this.emptyAnswer = {} as Answer;
//     // this.emptyAnswer.id = this.questionAnswer.answers['id'];
//     // this.emptyAnswer.content = this.questionAnswer.answers['content'];
//     // this.emptyAnswer.correct = true;
//     // this.emptyAnswer.questionorderno = this.questionAnswer.answers['questionorderno'];
//     this.questionAnswer.answers = [];


//     // making object of answers
//     if (queAns['content1'] != '' || queAns['content1'] != undefined) {
//       this.answer = {} as Answer;
//       this.answer.content = queAns['content1'];
//       this.answer.correct = queAns['correct1'];
//       this.answer.questionorderno = queAns['questionOrderNo'];

//       this.questionAnswer.answers.push(this.answer);
//     }
//     if (queAns['content2'] != '' || queAns['content2'] != undefined) {
//       this.answer = {} as Answer;
//       this.answer.content = queAns['content2'];
//       this.answer.correct = queAns['correct2'];
//       this.answer.questionorderno = queAns['questionOrderNo'];

//       this.questionAnswer.answers.push(this.answer);
//     }

//     if (queAns['content3'] != '' || queAns['content3'] != undefined) {
//       this.answer = {} as Answer;

//       this.answer.content = queAns['content3'];
//       this.answer.correct = queAns['correct3'];
//       this.answer.questionorderno = queAns['questionOrderNo'];

//       this.questionAnswer.answers.push(this.answer);
//     }

//     if (queAns['content4'] != '' || queAns['content4'] != undefined) {
//       this.answer = {} as Answer;

//       this.answer.content = queAns['content4'];
//       this.answer.correct = queAns['correct4'];
//       this.answer.questionorderno = queAns['questionOrderNo'];
//       this.questionAnswer.answers.push(this.answer);
//     }

//     // console.log(this.questionAnswer);


//     const instituteJson = JSON.stringify(this.questionAnswer);

//     const blob = new Blob([instituteJson], {
//       type: 'application/json'
//     })

//     let formData = new FormData();

//     for (var i = 0; i < this.myFiles.length; i++) {
//       formData.append("files", this.myFiles[i]);
//     }

//     formData.append("request", new Blob([JSON.stringify(this.questionAnswer)], { type: 'application/json' }));

//     console.log(formData)
//     this.service.addQuestion(formData).subscribe(
//       (response) => {

     
//         this.generatedQuestionAnswerId = response;
//         console.log( this.generatedQuestionAnswerId)
//         console.log("Question Added Successfully");
//         // this.getDataForMarks(this.selectedQuizId)
//         this.getAllQuestionAnswers(this.selectedQuizId)
      
//       },
//       (error) => {
//         console.log("Question added failed")
//       }
//     )

//   }
async getMCQCategory(){
  
  await this.categoryServ._getAllCategorys().toPromise().then(
    (response)=>{
    this.mcqCategory =  response.filter((category:Category)=>category.categoryName.toLowerCase() == "mcq")
     console.log(this.mcqCategory)
     console.log(this.mcqCategory[0])
    }
   )
 }



  async onFormSubmit(queAns: any): Promise<void> {
    this.questionAnswer = {} as QuestionAnswer;
    this.oneQuestionAnswer = {} as OneQuestionAnswer;
    let isFirstAlertDisplayed = false;
    console.log("Parameter queAns Array")
    console.log(queAns)
    let maxQuesInQuizFlag:boolean= false
    let flag:boolean = false;
    let questionIdArr :number[] = [];
    let orderArr:number[] = [];
    this.generatedQuestionAnswerIdArr = [];
    let newQuestionAnsArr:any=[];
    this.totMarksToDisplay = 0;
    let answerEqualityChk:boolean = false;
    let answerEqualityChkStatic:boolean = false;
    maxQuesInQuizFlag = await this.getQuesByQuizId(this.selectedQuizId)

    
   await this.getMCQCategory();
     
    let queArr :any[]=[];
    console.log("this.selectedQuiz down")
   console.log(this.selectedQuiz)

   console.log("]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]")
console.log(queAns['queAns'])
   console.log(queAns['queAnsArray'].length) 

   let mcqFlag:boolean =false;
   let lAnsFlag:boolean =false;
   let mcqArr:any[] = [];
   let lAnsArr:any[] = [];

  //  this.questionAnswers =[];
  console.log("queAns after  this.question-Answers =[];")
   console.log(queAns)


  //  queAns['queAnsArray'].forEach(  (queAnsNew:OneQuestionAnswer)=> {
    // for (let queAnsNew of queAns['queAnsArray']) {
      for (let queAnsNew of queAns['queAnsArray']) {
    // queAns['queAnsArray'].map(async (queAnsNew: OneQuestionAnswer) => {
  console.log("**********************************")
    console.log(newQuestionAnsArr)

   this.questionAnswer = new QuestionAnswer();
   console.log("questionAnswers Array at atart of forEach")
   console.log(this.questionAnswers)

   
  this.questionAnswer.question = {} as Question;
  this.questionAnswer.question['questionId'] = queAnsNew.questionId;
  this.questionAnswer.question['questionFigure'] = queAnsNew.questionFigure;
  this.questionAnswer.question['questionContent'] = queAnsNew.questionContent;
  this.questionAnswer.question['questionExplanation'] = queAnsNew.questionExplanation;
  this.questionAnswer.question['questionOrderNo'] = queAnsNew.questionOrderNo;
  this.questionAnswer.question['maxMarks'] = queAnsNew.maxMarks;
  this.questionAnswer.question['questionIsMCQ'] = queAnsNew.questionIsMCQ;
 

  if((queAnsNew.questionId != 0) && (queAnsNew.questionId != null) && (queAnsNew.questionId != undefined)){
  questionIdArr.push(queAnsNew.questionId);
  }
  console.log(" this.questionAnswer  assigned")
  console.log(this.questionAnswer)
  console.log(this.questionAnswer.question['questionIsMCQ'])
  console.log(this.questionAnswer.question.questionIsMCQ)
  console.log("queAnsNew ")
  console.log(queAnsNew)
  console.log(" this.selectedQuiz.categoryId")
  console.log( this.selectedQuiz.categoryId)
  console.log("this.mcqCategory.categoryId")
  console.log(this.mcqCategory[0].categoryId)
  if((queAnsNew.questionContent != '') && (queAnsNew.questionContent != undefined) && (queAnsNew.questionExplanation != '')  && (queAnsNew.questionExplanation != undefined) && (queAnsNew.questionOrderNo != null) && (queAnsNew.questionOrderNo != 0) && (queAnsNew.maxMarks != null)  && (queAnsNew.maxMarks != 0) )
  { 
    console.log("Entered in First If")
    console.log(this.questionAnswer.question['questionIsMCQ'])
    if( this.selectedQuiz.categoryId == this.mcqCategory[0].categoryId)
    {
      
      if((queAnsNew.content1 != '' ) && (queAnsNew.content1 != undefined ) && (queAnsNew.content2 != '') &&(queAnsNew.content2 != undefined )  && (queAnsNew.content3 != '') && (queAnsNew.content3 != undefined )  && (queAnsNew.content4 != '') && (queAnsNew.content4 != undefined ) )
      {
          mcqArr.push(queAnsNew)
          console.log(queAnsNew.questionContent +" "+ queAnsNew.questionExplanation +" "+ queAnsNew.questionOrderNo+" " +queAnsNew.maxMarks)
          console.log("Entered in If loop of mcq")
      }
    }

    else if( this.selectedQuiz.categoryId != this.mcqCategory[0].categoryId)
    {

      console.log("NEterd in non-mcq loop")
      if((queAnsNew.content1 != '') && (queAnsNew.content1 != undefined ) )
      {
        lAnsArr.push(queAnsNew)
        console.log(queAnsNew.questionContent +" "+ queAnsNew.questionExplanation + " " + queAnsNew.questionOrderNo+" " +queAnsNew.maxMarks)
        console.log("Entered in If loop of nonmcq")
      }
    }


  }


 
  console.log(  this.questionAnswer.question['questionId'])
  console.log(queAnsNew.questionId)

  
  // if(( this.questionAnswer.question['questionContent'] == '' ) || (this.questionAnswer.question['questionExplanation'] == '') || (queAnsNew.questionOrderNo == '') || ( queAnsNew.maxMarks == ''))
  // {
  //    orderArr.push( this.questionAnswer.question['questionOrderNo'])
  // }

//  if(flag == false)
// {


   queAnsNew.totalMarks = this.totalMarks;
   if (this.selectedCategoryName == 'MCQ' || this.selectedCategoryName == 'mcq') {
    console.log("   if (this.selectedCategoryName == 'MCQ' || this.selectedCategoryName == 'mcq') ")
    this.questionAnswer.question.questionIsMCQ = true;
  } else {
    console.log("Else of if (this.selectedCategoryName == 'MCQ' || this.selectedCategoryName == 'mcq') ")
    this.questionAnswer.question.questionIsMCQ = false;

  }
  this.questionAnswer.question.questionQuizId = this.selectedQuizId;
  this.questionAnswer.question.questionCategoryId = this.selectedQuiz.categoryId;
  this.questionAnswer.question.questionIsActive = true;
  this.questionAnswer.answers = [];


  // making object of answers
  if (queAnsNew['content1'] != '' || queAnsNew['content1'] != undefined) {
    this.answer = {} as Answer;
    this.answer.content = queAnsNew['content1'];
    this.answer.correct = queAnsNew['correct1'];
    this.answer.questionorderno = queAnsNew['questionOrderNo'];

    this.questionAnswer.answers.push(this.answer);
  }
  if (queAnsNew['content2'] != '' || queAnsNew['content2'] != undefined) {
    this.answer = {} as Answer;
    this.answer.content = queAnsNew['content2'];
    this.answer.correct = queAnsNew['correct2'];
    this.answer.questionorderno = queAnsNew['questionOrderNo'];

    this.questionAnswer.answers.push(this.answer);
  }

  if (queAnsNew['content3'] != '' || queAnsNew['content3'] != undefined) {
    this.answer = {} as Answer;

    this.answer.content = queAnsNew['content3'];
    this.answer.correct = queAnsNew['correct3'];
    this.answer.questionorderno = queAnsNew['questionOrderNo'];

    this.questionAnswer.answers.push(this.answer);
  }

  if (queAnsNew['content4'] != '' || queAnsNew['content4'] != undefined) {
    this.answer = {} as Answer;

    this.answer.content = queAnsNew['content4'];
    this.answer.correct = queAnsNew['correct4'];
    this.answer.questionorderno = queAnsNew['questionOrderNo'];
    this.questionAnswer.answers.push(this.answer);
  }

if(mcqArr.length > 0){
console.log("ANSWERSSSSssssssssssssssssssssssssssssss")
console.log(queAnsNew['content1'].toLowerCase())
console.log(queAnsNew['content2'].toLowerCase())
console.log(queAnsNew['content3'].toLowerCase())
console.log(queAnsNew['content4'].toLowerCase())

 if((queAnsNew['content1'].toLowerCase() == queAnsNew['content2'].toLowerCase()) || 
 (queAnsNew['content1'].toLowerCase() == queAnsNew['content3'].toLowerCase()) || 
 (queAnsNew['content1'].toLowerCase() == queAnsNew['content4'].toLowerCase()) ||
 (queAnsNew['content2'].toLowerCase() == queAnsNew['content3'].toLowerCase()) || 
 (queAnsNew['content2'].toLowerCase() == queAnsNew['content4'].toLowerCase()) || 
 (queAnsNew['content3'].toLowerCase() == queAnsNew['content4'].toLowerCase())  )
 {
   answerEqualityChk = true;
   if( answerEqualityChk == true )
   {
    answerEqualityChkStatic = true
   }

 }}

//   console.log("this.questionAnswer")
//   console.log(this.questionAnswer)
//   const instituteJson = JSON.stringify(this.questionAnswer);

//   const blob = new Blob([instituteJson], {
//     type: 'application/json'
//   })

//   let formData = new FormData();

//   for (var i = 0; i < this.myFiles.length; i++) {
//     formData.append("files", this.myFiles[i]);
//   }
    
//  console.log("this.questionAnswer  before form  data")
//   console.log(this.questionAnswer)
//   formData.append("request", new Blob([JSON.stringify(this.questionAnswer)], { type: 'application/json' }));

//   console.log(formData)



  console.log(maxQuesInQuizFlag)

  console.log("lAnsArr")
  console.log(lAnsArr)
  console.log(queAns['queAnsArray'].length)
  console.log(lAnsArr.length)



  newQuestionAnsArr.push(this.questionAnswer)

  console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
  console.log(this.questionAnswer)
  console.log(newQuestionAnsArr)
  // newQuestionAnsArr = newQuestionAnsArr.reverse();

  //  });
  this.totMarksToDisplay += this.questionAnswer.question['maxMarks'] ;
}



  //started from here
console.log(newQuestionAnsArr)
console.log("Pass Marks $$$$$$$$$$$$$$$$$$$$$4 Total Marks")
console.log(this.passMarks)
console.log(this.maxMarks)
console.log(this.totalMarks)
console.log(mcqArr.length)
console.log(lAnsArr.length)
console.log(answerEqualityChk)
   let quesAnswersArrCopy : any[]=[];
   if((this.passMarks <= this.totMarksToDisplay ) && (this.maxMarks == this.totMarksToDisplay))

  {   
     if(((mcqArr.length>0)  &&  (!answerEqualityChkStatic)) && ((lAnsArr.length<=0) )|| ((mcqArr.length<=0)  &&  (!answerEqualityChkStatic)) && ((lAnsArr.length>0) )){
      
   

    if((queAns['queAnsArray'].length) == (mcqArr.length))  
      // if(((queAns['queAnsArray'].length) == (mcqArr.length)) && ((queAns['queAnsArray'].length) == (questionIdArr.length)))
   {     
      
   
   console.log("if((queAns['queAnsArray'].length) == (mcqArr.length))")
       this.questionAnswers =[];

          for(let newArr of newQuestionAnsArr){
        
            console.log("++++++++++++++++++++++++++++++")
            console.log("newArr")
            console.log(newArr)
            console.log(quesAnswersArrCopy)
            const instituteJson = JSON.stringify(newArr);

          const blob = new Blob([instituteJson], {
            type: 'application/json'
          })

          let formData = new FormData();

          for (var i = 0; i < this.myFiles.length; i++) {
            formData.append("files", this.myFiles[i]);
          }
    

          console.log("newArr  before form  data")
            console.log(newArr)
            formData.append("request", new Blob([JSON.stringify(newArr)], { type: 'application/json' }));

            console.log(formData)
            console.log(maxQuesInQuizFlag)
      
         

  if( ( newArr.question['questionId'] == 0) || ( newArr.question['questionId'] == undefined))
  {
    console.log("if( ( newArr.question['questionId'] == 0) || ( newArr.question['questionId'] == undefined))")
    if((newArr.question.questionIsMCQ == true)  &&   ( maxQuesInQuizFlag ))
    {
    console.log("if((newArr.question.questionIsMCQ == true)  &&   ( maxQuesInQuizFlag )) ")
  // if(newArr.question.questionIsMCQ == true)
  // { console.log("  if(newArr.question.questionIsMCQ == true)")
  

  
  this.service.addQuestion(formData).subscribe(
    // const response = await this.service.addQuestion(formData).toPromise(
    (response: number) => {

  
      this.generatedQuestionAnswerId = response;
      // this.generatedQuestionAnswerIdArr.push(this.generatedQuestionAnswerId)
      console.log(response)
      quesAnswersArrCopy.push({
        questionId: this.generatedQuestionAnswerId,
        questionFigure: newArr.question['questionFigure'],
        questionContent: newArr.question['questionContent'],
        questionExplanation: newArr.question['questionExplanation'],
        questionOrderNo: newArr.question['questionOrderNo'],
        questionIsMCQ: newArr.question['questionIsMCQ'],
        questionQuizId: newArr.question['questionQuizId'],
        questionCategoryId: newArr.question['questionCategoryId'],
        questionIsActive: newArr.question['questionIsActive'],
        questionCreatedBy: newArr.question['questionCreatedBy'],
        questionCreatedOn: newArr.question['questionCreatedOn'],
        questionModifiedBy: newArr.question['questionModifiedBy'],
        questionModifiedOn: newArr.question['questionModifiedOn'],
        correct1: newArr.answers[0].correct,
        content1:  newArr.answers[0].content,
        correct2: newArr.answers[1].correct,
        content2: newArr.answers[1].content,
        correct3: newArr.answers[2].correct,
        content3: newArr.answers[2].content,
        correct4:  newArr.answers[3].correct,
        content4: newArr.answers[3].content,
        isFormDirty: false,
        isFormSubmitted: true,
        image: true,
        isOptionSelected: true,
        selectedAnswer: '',
        maxMarks: newArr.question['maxMarks'],
        totalMarks: this.totalMarks
      })
      

      console.log("questionanswersarray");
      console.log(newArr)
      console.log( this.generatedQuestionAnswerId)
      console.log("Question Added Successfully");
         quesAnswersArrCopy = quesAnswersArrCopy.sort((a, b) => a.questionOrderNo - b.questionOrderNo);

      // this.getDataForMarks(this.selectedQuizId)
      // this.getAllQuestionAnswers(this.selectedQuizId)

    
    },
    (error) => {
      quesAnswersArrCopy = quesAnswersArrCopy.sort((a, b) => a.questionOrderNo - b.questionOrderNo);

    console.log(newArr.question['questionContent'])
    console.log("Question added failed");
    // if (!isFirstAlertDisplayed) {
    //  this.dialogBoxService.open("Please enter details for all questions ", 'information');
    //  isFirstAlertDisplayed = true;
    //   }
    }
  )
  }
}
  if(  newArr.question['questionId'] > 0){
  if ((queAns['queAnsArray'].length) == (questionIdArr.length) && (newArr.question.questionIsMCQ == true) ){
  {
    this.service.addQuestion(formData).subscribe(
      (response) => {
  
       
        this.generatedQuestionAnswerId = response;
        this.generatedQuestionAnswerIdArr.push(this.generatedQuestionAnswerId)
        console.log(response)
        quesAnswersArrCopy.push({
          questionId: this.generatedQuestionAnswerId,
          questionFigure: newArr.question['questionFigure'],
          questionContent: newArr.question['questionContent'],
          questionExplanation: newArr.question['questionExplanation'],
          questionOrderNo: newArr.question['questionOrderNo'],
          questionIsMCQ: newArr.question['questionIsMCQ'],
          questionQuizId: newArr.question['questionQuizId'],
          questionCategoryId: newArr.question['questionCategoryId'],
          questionIsActive: newArr.question['questionIsActive'],
          questionCreatedBy: newArr.question['questionCreatedBy'],
          questionCreatedOn: newArr.question['questionCreatedOn'],
          questionModifiedBy: newArr.question['questionModifiedBy'],
          questionModifiedOn: newArr.question['questionModifiedOn'],
          correct1: newArr.answers[0].correct,
          content1:  newArr.answers[0].content,
          correct2: newArr.answers[1].correct,
          content2: newArr.answers[1].content,
          correct3: newArr.answers[2].correct,
          content3: newArr.answers[2].content,
          correct4:  newArr.answers[3].correct,
          content4: newArr.answers[3].content,
          isFormDirty: false,
          isFormSubmitted: true,
          image: true,
          isOptionSelected: true,
          selectedAnswer: '',
          maxMarks: newArr.question['maxMarks'],
          totalMarks: this.totalMarks
        })
        console.log("((((((((((((((((((((((((((((((((((")
        console.log(quesAnswersArrCopy)
        console.log( this.generatedQuestionAnswerId)
        console.log("Question Added Successfully");
        quesAnswersArrCopy = quesAnswersArrCopy.sort((a, b) => a.questionOrderNo - b.questionOrderNo);
  
        // console.log("questionanswersarray");
        // console.log(newArrs)
        // this.getDataForMarks(this.selectedQuizId)
        // this.getAllQuestionAnswers(this.selectedQuizId)
      
      },
      (error) => {
        quesAnswersArrCopy = quesAnswersArrCopy.sort((a, b) => a.questionOrderNo - b.questionOrderNo);

      console.log(newArr.question['questionContent'])
      console.log("Question added failed");
      // if (!isFirstAlertDisplayed) {
      //  this.dialogBoxService.open("Please enter details for all questions ", 'information');
      //  isFirstAlertDisplayed = true;
      //   }
      }
    )
  }
}

  }

  console.log("quesAnswersArrCopy in mcq Loop")
    console.log(quesAnswersArrCopy)
    // console.log( quesAnswersArrCopy.sort((a, b) => a.questionOrderNo - b.questionOrderNo))
    // quesAnswersArrCopy = quesAnswersArrCopy.sort((a, b) => a.questionOrderNo - b.questionOrderNo);
    
    // quesAnswersArrCopy.sort((a, b) => a.questionOrderNo - b.questionOrderNo);
    console.log("---------------------------------------------------------")
    this.questionAnswers =  quesAnswersArrCopy
    console.log(quesAnswersArrCopy)
    console.log(this.questionAnswers)
  }
}
else if(((queAns['queAnsArray'].length) != (mcqArr.length)) && (mcqArr.length > 0))
{
  this.dialogBoxService.open("Please enter all details of question and answers", 'information');
}

if((queAns['queAnsArray'].length) == (lAnsArr.length) )
{

  this.questionAnswers =[];
  for(let newArr of newQuestionAnsArr){
        
    console.log("++++++++++++++++++++++++++++++")
    console.log(newArr)
    console.log(quesAnswersArrCopy)
    const instituteJson = JSON.stringify(newArr);

  const blob = new Blob([instituteJson], {
    type: 'application/json'
  })

  let formData = new FormData();

  for (var i = 0; i < this.myFiles.length; i++) {
    formData.append("files", this.myFiles[i]);
  }


  console.log("newArr  before form  data")
    console.log(newArr)
    formData.append("request", new Blob([JSON.stringify(newArr)], { type: 'application/json' }));

    console.log(formData)
    console.log(maxQuesInQuizFlag)

 

if( ( newArr.question['questionId'] == 0) || ( newArr.question['questionId'] == undefined))
{
  if((newArr.question.questionIsMCQ == false)  &&  ( maxQuesInQuizFlag ))
  {
console.log(" if(  newArr.question['questionId'] == 0)")
// if(newArr.question.questionIsMCQ == true)
// { console.log("  if(newArr.question.questionIsMCQ == true)")



this.service.addQuestion(formData).subscribe(
// const response = await this.service.addQuestion(formData).toPromise(
(response: number) => {


this.generatedQuestionAnswerId = response;
// this.generatedQuestionAnswerIdArr.push(this.generatedQuestionAnswerId)
console.log(response)
quesAnswersArrCopy.push({
questionId: this.generatedQuestionAnswerId,
questionFigure: newArr.question['questionFigure'],
questionContent: newArr.question['questionContent'],
questionExplanation: newArr.question['questionExplanation'],
questionOrderNo: newArr.question['questionOrderNo'],
questionIsMCQ: newArr.question['questionIsMCQ'],
questionQuizId: newArr.question['questionQuizId'],
questionCategoryId: newArr.question['questionCategoryId'],
questionIsActive: newArr.question['questionIsActive'],
questionCreatedBy: newArr.question['questionCreatedBy'],
questionCreatedOn: newArr.question['questionCreatedOn'],
questionModifiedBy: newArr.question['questionModifiedBy'],
questionModifiedOn: newArr.question['questionModifiedOn'],
correct1: newArr.answers[0].correct,
content1:  newArr.answers[0].content,
correct2: newArr.answers[1].correct,
content2: newArr.answers[1].content,
correct3: newArr.answers[2].correct,
content3: newArr.answers[2].content,
correct4:  newArr.answers[3].correct,
content4: newArr.answers[3].content,
isFormDirty: false,
isFormSubmitted: true,
image: true,
isOptionSelected: true,
selectedAnswer: '',
maxMarks: newArr.question['maxMarks'],
totalMarks: this.totalMarks
})


console.log("questionanswersarray");
console.log(newArr)
console.log( this.generatedQuestionAnswerId)
console.log("Question Added Successfully");
 quesAnswersArrCopy = quesAnswersArrCopy.sort((a, b) => a.questionOrderNo - b.questionOrderNo);

// this.getDataForMarks(this.selectedQuizId)
// this.getAllQuestionAnswers(this.selectedQuizId)


},
(error) => {
  quesAnswersArrCopy = quesAnswersArrCopy.sort((a, b) => a.questionOrderNo - b.questionOrderNo);

console.log(newArr.question['questionContent'])
console.log("Question added failed");
// if (!isFirstAlertDisplayed) {
//  this.dialogBoxService.open("Please enter details for all questions ", 'information');
//  isFirstAlertDisplayed = true;
//   }
}
)
}
}
if(  newArr.question['questionId'] > 0)
{

  if( ((queAns['queAnsArray'].length) == (questionIdArr.length)) && (newArr.question.questionIsMCQ == false) )
  {
this.service.addQuestion(formData).subscribe(
(response) => {


this.generatedQuestionAnswerId = response;
this.generatedQuestionAnswerIdArr.push(this.generatedQuestionAnswerId)
console.log(response)
quesAnswersArrCopy.push({
  questionId: this.generatedQuestionAnswerId,
  questionFigure: newArr.question['questionFigure'],
  questionContent: newArr.question['questionContent'],
  questionExplanation: newArr.question['questionExplanation'],
  questionOrderNo: newArr.question['questionOrderNo'],
  questionIsMCQ: newArr.question['questionIsMCQ'],
  questionQuizId: newArr.question['questionQuizId'],
  questionCategoryId: newArr.question['questionCategoryId'],
  questionIsActive: newArr.question['questionIsActive'],
  questionCreatedBy: newArr.question['questionCreatedBy'],
  questionCreatedOn: newArr.question['questionCreatedOn'],
  questionModifiedBy: newArr.question['questionModifiedBy'],
  questionModifiedOn: newArr.question['questionModifiedOn'],
  correct1: newArr.answers[0].correct,
  content1:  newArr.answers[0].content,
  correct2: newArr.answers[1].correct,
  content2: newArr.answers[1].content,
  correct3: newArr.answers[2].correct,
  content3: newArr.answers[2].content,
  correct4:  newArr.answers[3].correct,
  content4: newArr.answers[3].content,
  isFormDirty: false,
  isFormSubmitted: true,
  image: true,
  isOptionSelected: true,
  selectedAnswer: '',
  maxMarks: newArr.question['maxMarks'],
  totalMarks: this.totalMarks
})
console.log("((((((((((((((((((((((((((((((((((")
console.log(quesAnswersArrCopy)
console.log( this.generatedQuestionAnswerId)
console.log("Question Added Successfully");
quesAnswersArrCopy = quesAnswersArrCopy.sort((a, b) => a.questionOrderNo - b.questionOrderNo);

// console.log("questionanswersarray");
// console.log(newArrs)
// this.getDataForMarks(this.selectedQuizId)
// this.getAllQuestionAnswers(this.selectedQuizId)

},
(error) => {
  quesAnswersArrCopy = quesAnswersArrCopy.sort((a, b) => a.questionOrderNo - b.questionOrderNo);

console.log(newArr.question['questionContent'])
console.log("Question added failed");
// if (!isFirstAlertDisplayed) {
//  this.dialogBoxService.open("Please enter details for all questions ", 'information');
//  isFirstAlertDisplayed = true;
//   }
}
)
}
}

// quesAnswersArrCopy.sort((a, b) => a.questionOrderNo - b.questionOrderNo);
// quesAnswersArrCopy.sort((a, b) => a.questionOrderNo.toString().localeCompare(b.questionOrderNo.toString()));

console.log(quesAnswersArrCopy)
// console.log( quesAnswersArrCopy.sort((a, b) => a.questionOrderNo - b.questionOrderNo))
// quesAnswersArrCopy = quesAnswersArrCopy.sort((a, b) => a.questionOrderNo - b.questionOrderNo);

// quesAnswersArrCopy.sort((a, b) => a.questionOrderNo - b.questionOrderNo);
console.log("---------------------------------------------------------")
this.questionAnswers =  quesAnswersArrCopy
console.log(quesAnswersArrCopy)
console.log(this.questionAnswers)
}
}else if(((queAns['queAnsArray'].length) != (lAnsArr.length)) && (lAnsArr.length > 0))
{
  this.dialogBoxService.open("Please enter all details of question and answers", 'information');
}

  
 



  
}
     else{
      this.dialogBoxService.open("Please enter unique answers", 'information');
    }
   

  // })

    }else { 
      console.log("Pass Marks $$$$$$$$$$$$$$$$$$$$$4 Total Marks")
console.log(this.passMarks)
console.log(this.maxMarks)
console.log(this.totalMarks)
      this.dialogBoxService.open("Please enter total marks based on passing marks and maximum marks of quiz", 'warning');
    
    }


}


async getQuesByQuizId(quizId:number): Promise<boolean>
{ 
  
  let quesArr:Question[]=[];
  let quiz:Quiz[]= []
  let returnVal :boolean = false;
  this.passMarks = 0;
  // this.maxMarks = 0;
  console.log(quizId)

  await this.service.getAllQuestionsByQuizId(quizId).toPromise().then(
    (response) => {
      quesArr = response || []; // Assign an empty array if response is undefined
      console.log(quesArr);
    }
  );

  await this.quizServ.getAllQuizzes().toPromise().then(
    (response)=>{
      quiz = response.filter((quiz:Quiz)=>quiz.quizId == quizId)
      this.passMarks = quiz[0].passMark;
      // this.maxMarks = quiz[0].maxMarks;
      console.log(quiz)

    }
   ) 
    console.log(quesArr)
    console.log(quiz)
    console.log(quesArr.length)
    console.log(quiz[0].maxQuestions)
   if((quesArr.length) < (quiz[0].maxQuestions)){
    returnVal =  true;
    console.log("Entered in  if(quesArr.length < quiz.maxQuestions)")
    this.isButtonDisabled = returnVal;
     return returnVal;
   }

   this.isButtonDisabled = returnVal;
  return returnVal;
}



 


  onChangeCourse() {
    this.selectedModuleId = undefined;

  }

  onChangeModule() {

  }

  // onChangeSelectedQuiz() {
  //   this.questionAnswers = [];
  //   this.selectedQuiz = this.quizzes.find(quiz => quiz.quizId == this.selectedQuizId);
  //   // this.currentQuestions.length = this.selectedQuiz.maxQuestions;
  //   // this.currentAnswers.length = this.selectedQuiz.maxQuestions;

  //   // console.log(this.selectedQuiz);

  //   this.service.getAllQuestionsByQuizId(this.selectedQuizId).subscribe(
  //     response => {
  //       this.allData = response; //assign data to local variable


  //   this.service.getAllQuestionsByQuizId(this.selectedQuizId).subscribe(
  //     response => {
  //       this.allData = response; //assign data to local variable

  //       this.getAllQuestionAnswers(this.selectedQuizId);
  //       // console.log(this.questionAnswers);


  //     },
  //     error => {
  //       console.log('No data in table ');
  //     }
  //   );
  // }

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


 getAllQuestionAnswers(quizId: number) {
 this.totalMarks = 0;
 console.log(this.selectedQuizId)
 this.maxMarks = 0;
 this.totalQuizMarks = 0;

 this.quizServ.getAllQuizzes().subscribe(
  (response)=>{
    let quiz:Quiz[] = response.filter((quiz:Quiz)=>quiz.quizId == quizId)
    this.passMarks = quiz[0].passMark;
    this.maxMarks = quiz[0].maxMarks;
    this.totalQuizMarks =  quiz[0].maxMarks
    console.log( quiz[0].maxMarks)
    console.log(quiz)

  }
 ) 

 console.log(this.maxMarks)
//  this.totalQuizMarks = this.maxMarks
 let quiz:Quiz[] =[];

    this.service.getAllQuestionsByQuizId(quizId).subscribe(
      (response: any[]) => {
        console.log(response);
        response.forEach(
          question => {
           
            this.totalMarks = this.totalMarks + question.maxMarks;
            
          })
      });
  
    this.service.getAllAnswers().subscribe(
      (data) => {
        this.answers = data;
        this.questionAnswers = []; // Initialize questionAnswers as an array
      
        this.service.getAllQuestionsByQuizId(quizId).subscribe(
          (response: any[]) => {
            console.log(response);
            console.log("inside function getAllQuestionAnswers() ")
            response.forEach(
              question => {
                this.queAns = {} as OneQuestionAnswer;
                
                //  this.totalQuizMarks += question.maxMarks;
               
                this.queAns.totalMarks = this.totalMarks;
              
                console.log("Total Marks Down")
                console.log( this.queAns.totalMarks )
                
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
                  totalMarks : this.queAns.totalMarks,

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
        this.dialogBoxService.open('Question Added successfully ', 'information');
        // this.emptyQuestion = {} as Question;
        this.ngOnInit();
        this.back();
      },
      error => {
        this.dialogBoxService.open('Failed to add Question', 'warning');
      });
  }

  // For deleting (soft delete) question using questionFigure
  private deleteQuestion(questionFigure: string) {
    this.dialogBoxService.open('Are you sure you want to delete this Question ? ', 'decision').then((response) => {
      if (response) {
        console.log('User clicked OK');
        // Do something if the user clicked OK
    // calling service to soft delete
    this.service.deleteQuestion(questionFigure).subscribe(
      (response) => {
        this.dialogBoxService.open('Question deleted successfully ', 'information');
        this.ngOnInit();
      },
      (error) => {
        this.dialogBoxService.open('Question deletion Failed', 'warning');
      }
    );
  } else {
    console.log('User clicked Cancel');
    // Do something if the user clicked Cancel
  }
});
}




  /////////////////////////////////////
  // Dropdown data function calls
  ////////////////////////////////////

  private loadQuizzes() {
    try {
      this.sessionData = sessionStorage.getItem('quiz');

      this.data = JSON.parse(this.sessionData);
console.log("######################################################3")
 console.log(this.data)
      for (var inst in this.data) {
        // this.getQuesByQuizId(inst.)
        let  boolFlag: Promise<boolean> = Promise.resolve(false);
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$444")
        console.log(this.data[inst].quizId)
        boolFlag =  this.getQuesByQuizId(this.data[inst].quizId)
        
        this.allData.push(this.data[inst]);
        console.log("%%%%%%%%%%%%%%%%%%%%%5")
        console.log(this.allData)
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
