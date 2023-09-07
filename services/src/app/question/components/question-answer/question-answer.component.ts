import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, Renderer2, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Answer } from 'app/question/class/answer';
import { OneQuestionAnswer } from 'app/question/class/one-question-answer';
import { QuestionAnswer } from 'app/question/class/question-answer';
import { environment } from 'environments/environment.development';
import { AdminInstitution } from 'app/class/admin-institution';
import { Profile } from 'app/profiles/class/profile';
import { HttpClient } from '@angular/common/http';
import { QuestionService } from 'app/question/services/question.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { QuizService } from 'app/quiz/services/quiz.service';
import { Quiz } from 'app/quiz/class/quiz';
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';

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
  @Input() totalQuizMarks!: number;
  @Output() submitClicked: EventEmitter<any> = new EventEmitter();

  totalMarks: number = 0;
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
quizToMarks!: number;
  profileId: any;

  isPageValid: boolean = false;

  ///////////////pdf generate used var //////////////
  displayLogo: any;
  questionFigure: any;
  questionFigureUrl: any;

  sessionData: any;
  data: any;
  adminInstitutions: AdminInstitution[] = [];
  institution: AdminInstitution;
  instituteName: any;
  quizTotalMarks!: number;
  quizTitle: any;
  selectedQuiz: any;

  quizCategory: any;

  profiles: Profile[] = []; // list of inactive Profile
  profile: Profile;
  profileInstituteId: any;
  selectedQuizCategoryId: any;
  displayInstituteLogo: any;

  ////////////////quiz details used for pdf///////////////
  quizInfo: any[] = [];

  moduleName: string = '';
  courseName: string = '';
  departmentName: string = '';
  institutionName: string = '';
  passMark: number = 0;
  courseCode: string = '';

  isSubmitButtonDisabled: boolean = true;
  isNextButtonDisabled: boolean = false;
  isPreviousButtonDisabled: boolean = false;
  questionNumber: number = 0;



  addOption() {
    this.options.push('Option ' + (this.options.length + 1));
  }
  // Define a function to handle page changes

  removeOption(index: any) {
    this.options.splice(index, 1);
  }

  // Calculate the total marks count


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
  constructor(
    private http: HttpClient,
    private questionService: QuestionService,
    private renderer: Renderer2,private quizServ: QuizService,  private dialogBoxService: DialogBoxService,
  ) {
    this.profileId = sessionStorage.getItem('profileId');
    this.profile = new Profile();
    this.institution = new AdminInstitution();
    this.questionUrl = `${environment.questionUrl}`;
  }

  ngOnInit(): void {
    this.displayUrl = this.questionUrl + '/getFileById';

    console.log(this.totalQuizMarks)

    this.loadProfiles(this.profileId);
    this.getQuizDetailsByQuizId(this.selectedQuizId);
    this.loadAdminInstitutions(this.profileInstituteId);
    this.loadQuiz(this.selectedQuizId);
    this.displayInstituteLogo = `${environment.adminInstitutionUrl}/institution`;
    this.loadCategories(this.selectedQuizCategoryId);


    console.log(this.questionAnswers)

  }

  queAns: any = {}; // Your queAns object

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    this.renderer.removeChild(imgElement.parentNode, imgElement);
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
      // console.log("inside   ngOnChanges");
      // console.log(this.questionAnswers)

      // for(let i of this.questionAnswers){
      //   this.totalMarks += i.maxMarks;
      // }
    }


  }

  onDelete(queAns:OneQuestionAnswer){

    let questionAnsCopy:OneQuestionAnswer[] = [];
    questionAnsCopy = this.questionAnswers;
    let quiz :Quiz = new Quiz();
    let passMarkQuiz :Quiz = new Quiz();
    console.log("INside DLETE FUNCTION")
    console.log(queAns)
    let  passMark :number =0 ;
    this.totalQuizMarks = 0; 
    
    console.log(" questionAnsCopy before going to delete")
    console.log(questionAnsCopy)

  if(questionAnsCopy.length == 1){                   
     this.dialogBoxService.open("Delete unsuccessfull. At least one question should be present.", 'warning');
}
  else{
    this.dialogBoxService.open('Are you sure you want to delete this Question ? ', 'decision').then((response) => {
      if (response) {
  if((queAns.questionId == 0) || (queAns.questionId == undefined))
  {
    this.quizServ.getQuizQuizId(this.selectedQuizId).subscribe(
      (response)=>{
           
                quiz = response;
                console.log("QUIZ IN DELETE AFTER GET BY ID")
                console.log(response)
                console.log(quiz)
              
                quiz.maxQuestions = quiz.maxQuestions - 1;

                // questionAnsCopy.forEach((queAnsActual:OneQuestionAnswer)=>this.totalQuizMarks = this.totalQuizMarks + queAnsActual.maxMarks)
                questionAnsCopy.forEach((queAnsActual) => {
                  if (typeof this.totalQuizMarks === 'undefined') {
                    this.totalQuizMarks = 0;
                  }
                  this.totalQuizMarks += queAnsActual.maxMarks;
                });
                quiz.maxMarks = this.totalQuizMarks
                this.quizTotalMarks = this.totalQuizMarks
             
               
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%")
                console.log(this.totalQuizMarks)
                this.quizServ.updateQuiz(quiz.title , quiz).subscribe(
                  (response)=>{
                    console.log("Quiz updated Successfully")
                                      // Find the index of the queAns object in questionAnsCopy
                      const indexToDelete = questionAnsCopy.findIndex(
                        (item) => item === queAns
                      );

                      // If the index is found (not -1), remove the element from the array
                      if (indexToDelete !== -1) {
                        questionAnsCopy.splice(indexToDelete, 1);
                      }

                     

                      console.log("After DELETE QuestionAnswersArray");
                      console.log(questionAnsCopy);

                    console.log("AFter DELETE QuestionAnswersArray")
                    console.log(this.questionAnswers)
                    this.questionAnswers = questionAnsCopy;
                    
                    this.dialogBoxService.open("Question deleted successfully", 'information');
                  }
                )

      }

     
    )
  }
  
  else {
   this.questionService.deleteQuesAndAns(queAns.questionId).subscribe(
    (response)=>{
      console.log("Delete Complete")

      questionAnsCopy = questionAnsCopy.filter(
        (item) => item.questionId !== queAns.questionId
      );
       
      this.quizServ.getQuizQuizId(queAns.questionQuizId).subscribe(
        (response)=>{
             
                  quiz = response;
                  console.log("QUIZ IN DELETE AFTER GET BY ID")
                  console.log(response)
                  console.log(quiz)
                  passMark = quiz.passMark;
                  quiz.maxQuestions = quiz.maxQuestions - 1;
                  // questionAnsCopy.forEach((queAnsActual:OneQuestionAnswer)=>this.totalQuizMarks = this.totalQuizMarks + queAnsActual.maxMarks)
                  questionAnsCopy.forEach((queAnsActual) => {
                    if (typeof this.totalQuizMarks === 'undefined') {
                      this.totalQuizMarks = 0;
                    }
                    this.totalQuizMarks  = this.totalQuizMarks + queAnsActual.maxMarks;
                  });
                  quiz.maxMarks = this.totalQuizMarks
                  this.quizTotalMarks = this.totalQuizMarks
                  console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%")
                  console.log(this.totalQuizMarks)
                  this.quizServ.updateQuiz(quiz.title , quiz).subscribe(
                    (response)=>{
                      console.log("Quiz updated Successfully")
                      // questionAnsCopy.forEach((oneQuesAns:OneQuestionAnswer)=> quizTotalMarks = quizTotalMarks +  oneQuesAns.maxMarks)


                      this.questionAnswers = questionAnsCopy;

                      console.log("AFter DELETE QuestionAnswersArray")
                      console.log(this.questionAnswers)  
                      if(this.totalQuizMarks < passMark )
                      {

                      this.dialogBoxService.open("Question deleted successfully, Kindly update quiz passing marks from Quiz Panel", 'information'); 

                      }
                      else{
                      this.dialogBoxService.open("Question deleted successfully", 'information'); 
                      }
                    }
                  )

        }

       
      )
      // Update the original array with the modified copy
      // this.questionAnswers = questionAnsCopy;

      // console.log("AFter DELETE QuestionAnswersArray")
      // console.log(this.questionAnswers)

    

    }
   )
  }
}

});
  }
}

  onFormSubmit(queAns: OneQuestionAnswer, queAnsArray: OneQuestionAnswer[]) {
    this.submittedQuestionAnswer = {} as OneQuestionAnswer;
    this.submittedQuestionAnswer = queAns;
   
    console.log("}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}")
    console.log(queAns);

    // Disable the submit button


    if ((this.selectedCategoryName.toUpperCase() != 'MCQ')) {
      queAns.correct1 = true;
    }

    if (queAns.questionId > 0) {

      this.submitClicked.emit({ queAns, queAnsArray });

    } else {
      queAns.questionId = 0;
      this.submitClicked.emit({ queAns, queAnsArray });

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
      queAns.totalMarks = queAns.totalMarks;

    }
  }

  onAnswerEntered(queAns: OneQuestionAnswer) {
    queAns.correct1 = true;
    queAns.isOptionSelected = true;
  }


  //////////////////////////////
  ///  pdf code                //
  ///                          //
  //////////////////////////////


  /////////////////quiz details ///////////

  getQuizDetailsByQuizId(selectedQuizId: any) {
    //alert(selectedQuizId)
    this.questionService.getQuizDetailsByQuizId(selectedQuizId).subscribe(
      (response: any) => {
        this.quizInfo = response;
        this.moduleName = this.quizInfo[1];
        this.courseName = this.quizInfo[2];
        this.departmentName = this.quizInfo[3];
        this.institutionName = this.quizInfo[4];
        this.passMark = this.quizInfo[5];
        this.courseCode = this.quizInfo[6];

        console.log(this.quizInfo + "**************"); // Output the retrieved data to the console
      },
      (error) => {
        console.log(error); // Handle any errors
      }
    );
  }


  loadProfiles(profileId: number) {
    try {
      this.sessionData = sessionStorage.getItem('instituteprofile');
      //alert(JSON.stringify(this.sessionData));
      this.data = JSON.parse(this.sessionData);
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].adminId == profileId) {
          this.profileInstituteId = this.data[i].institutionId;
          //alert(JSON.stringify(this.profileInstituteId));
          break; // Assuming the profileId is unique, exit the loop after finding the matching profile
        }
      }
    } catch (err) {
      console.log("Error", err);
    }
  }

  loadAdminInstitutions(profileInstituteId: number) {
    try {
      // alert(profileInstituteId + "id");
      this.sessionData = sessionStorage.getItem('admininstitution');

      // console.log(this.sessionData);
      this.data = JSON.parse(this.sessionData);
      for (var inst in this.data) {
        if (this.data[inst].adminInstitutionId == profileInstituteId) {
          this.instituteName = this.data[inst].adminInstitutionName;
          // alert(this.instituteName + "[[[[[[[[[[[[[");
          break; // Assuming the instituteId is unique, exit the loop after finding the matching institution
        }
      }
    } catch (err) {
      console.log("Error", err);
    }
  }


  loadQuiz(selectedQuizId: number) {
    //alert(selectedQuizId);
    try {
      this.sessionData = sessionStorage.getItem('quiz');
      this.data = JSON.parse(this.sessionData);
      for (var quiz of this.data) {
        if (quiz.quizId === selectedQuizId) {
          this.selectedQuiz = quiz;
          this.quizTitle = quiz.title;

          this.selectedQuizCategoryId = quiz.categoryId;
          // alert(this.selectedQuizCategoryId);
          this.loadCategories(this.quizCategory.categoryId);
          console.log(this.quizTitle) // Quiz title of the selected quiz
          break; // Exit the loop after finding the matching quiz
        }
      }
    } catch (err) {
      console.log("Error", err);
    }
  }




  loadCategories(selectedQuizCategoryId: number) {
    try {
      this.sessionData = sessionStorage.getItem('category');
      this.data = JSON.parse(this.sessionData);
      for (var category of this.data) {
        if (category.categoryId == selectedQuizCategoryId) {
          this.quizCategory = category;
          //alert(JSON.stringify(this.quizCategory));

          console.log(JSON.stringify(this.quizCategory) + ""); // Entire object of the selected category
          break; // Exit the loop after finding the matching category
        }
      }
    } catch (err) {
      console.log("Error", err);
    }
  }


  async generatePdfUsingPdfMaker() {
    const questionSection: any[] = [];

    this.displayLogo = this.displayInstituteLogo + '/getFileById/' + this.profileInstituteId;

    this.http.get(this.displayLogo, { responseType: 'blob' }).subscribe((logoBlob: Blob) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const logoDataUrl = reader.result as string;


        // Add the institute logo to the content array
        questionSection.push(
          {
            image: logoDataUrl,
            width: 100,
            height: 100,
            alignment: 'center',
          }
        );

        const courseCodeAndCourseName = `Course Code : ${this.courseCode}   Course Name : ${this.courseName}`;
        // Add the remaining content
        questionSection.push(
          { text: 'Institute : ' + this.institutionName, style: 'header', alignment: 'center' },
          { text: 'Department : ' + this.departmentName, style: 'deptHeader', alignment: 'center' },
          { text: courseCodeAndCourseName, alignment: 'center' },
          { text: 'Module : ' + this.moduleName, alignment: 'center' },
          { text: 'Quiz : ' + this.quizTitle, alignment: 'center' },
          {
            columns: [
              //{ text: 'Course Code' + ': ' + this.courseCode, alignment: 'left' },

              { text: 'Max mark  : ' + this.selectedQuiz.maxMarks, alignment: 'right' },
            ]
          },
          { text: 'Pass mark :' + ' ' + this.passMark, alignment: 'right' },
        );


        this.questionNumber = 1;
        let questionFigureUrl: any;
        // Use `map` to iterate over the questionAnswers array and create an array of Promises
        const questionPromises: any = [];
        for (const questionAnswer of this.questionAnswers) {

          const questionMark = questionAnswer.maxMarks;
          console.log(questionAnswer);
          questionFigureUrl = null;
          const questionContent = questionAnswer.questionContent;

          // let questionFigureUrl = this.questionUrl + '/getFileById/' + questionAnswer.questionId;
          if (questionAnswer.questionFigure != null) {
            questionFigureUrl = this.questionUrl + '/getFileById/' + questionAnswer.questionId;
          } else {
            console.log("containg no figure ****************");
          }

          console.log(questionFigureUrl);

          const options = [
            { correct: questionAnswer.correct1, content: questionAnswer.content1 },
            { correct: questionAnswer.correct2, content: questionAnswer.content2 },
            { correct: questionAnswer.correct3, content: questionAnswer.content3 },
            { correct: questionAnswer.correct4, content: questionAnswer.content4 }
          ];

          const answer = questionAnswer.correct1 ? questionAnswer.content1 :
            questionAnswer.correct2 ? questionAnswer.content2 :
              questionAnswer.correct3 ? questionAnswer.content3 :
                questionAnswer.correct4 ? questionAnswer.content4 : '';



          console.log("Question with figure 0000000000000000000000000000000");
          await this.fetchFile(questionFigureUrl, questionSection, questionContent, options, answer, questionMark);
          console.log("hhhhhhhhhhhhhhhhhh");



          // Add other question content...



        };

        // Wait for all question image Promises to resolve
        Promise.all(questionPromises).then(() => {
          // Define the styles
          const instituteStyles: any = {
            header: {
              color: 'red',
              fontSize: 20,
              bold: true,
              italics: true,
            },
            deptHeader: {
              color: 'green'
            },
            moduleName: {
              fontSize: 14,
              bold: true,

            },
            questionTitle: {
              bold: true,
              marginTop: 10,
              marginBottom: 5,
            },
            question: {
              marginTop: 5,
              marginBottom: 5,
            },
            questionContent: {
              bold: true,
              fontSize: 14,
              marginTop: 3,
              marginBottom: 5,
            },
            questionExplanation: {
              marginTop: 3,
              marginBottom: 5,
            },
            answer: {
              color: 'green',
              marginTop: 3,
              marginBottom: 5,
            },
            pageBorders: {
              margin: [10, 10],
              lineWidth: 1,
              horizontalLineStyles: {
                lineWidth: 1,
                color: 'black',
                dash: { length: 5 },
              },
              verticalLineStyles: {
                lineWidth: 1,
                color: 'black',
                dash: { length: 5 },
              },
            },
            defaultStyle: {
              pageBorders: true // Apply pageBorders style to all pages
            }
          };

          const documentDefinition: TDocumentDefinitions = {
            content: questionSection,
            styles: instituteStyles,
            pageSize: 'A4',
            pageMargins: [20, 20, 20, 20], // Adjust the margins to create the border effect
            background: function (currentPage: number, pageSize: any) {
              return {
                canvas: [
                  {
                    type: 'rect',
                    x: 10,
                    y: 10,
                    w: pageSize.width - 20,
                    h: pageSize.height - 20,
                    lineColor: '#000000', // Border color
                    lineWidth: 2, // Border width
                  },
                ],
              };
            },
          };

          const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
          pdfDocGenerator.open();
        });
      };

      reader.readAsDataURL(logoBlob);
    });
  }


  async fetchFile(questionFigureUrl: any, questionSection: any, questionContent: any, options: any, answer: any, questionMark: any) {
    return new Promise<void>((resolve) => {
      this.http.get(questionFigureUrl, { responseType: 'blob' }).subscribe((figureBlob: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageDataUrl = reader.result as string;

          questionSection.push({ text: '\n\n' });
          const questionText = `${this.questionNumber}. ${questionContent} `;
          const queMark = ` ${questionMark}`;
          questionSection.push({
            columns: [
              { text: questionText, style: 'questionContent' },
              { text: queMark + " : Mark", alignment: 'right' }
            ]
          });
          console.log(imageDataUrl);

          if (imageDataUrl) {
            questionSection.push({
              image: imageDataUrl,
              width: 200,
              height: 150,
              alignment: 'center',
            });
          }

          if (this.quizCategory.categoryName == 'MCQ') {
            questionSection.push({ text: 'Options:' })
            questionSection.push({ ol: options.map((option: { content: any; }) => option.content) });
          }

          questionSection.push({ text: 'Correct answer : ' + answer, style: 'answer' });
          // Add two line spaces after each question
          questionSection.push({ text: '\n\n' });
          this.questionNumber++;

          resolve(); // Resolve the Promise when the image is added
        };
        reader.readAsDataURL(figureBlob);
      }, (error) => {
        console.error('Error fetching question image:', error);
        //  const questionText = `${this.questionNumber}. ${questionContent}`;
        questionSection.push({ text: '\n\n' });
        const questionText = `${this.questionNumber}. ${questionContent} `;
        const queMark = ` ${questionMark}`;
        questionSection.push({
          columns: [
            { text: questionText, style: 'questionContent' },
            { text: queMark + " : Mark", alignment: 'right' }
          ]
        });


        if (this.quizCategory.categoryName == 'MCQ') {
          questionSection.push({ text: 'Options:' })
          questionSection.push({ ol: options.map((option: { content: any; }) => option.content) });
        }

        questionSection.push({ text: 'Correct answer: ' + answer, style: 'answer' });
        // Add two line spaces after each question
        questionSection.push({ text: '\n\n' });
        this.questionNumber++;
        resolve(); // Resolve the Promise even if an error occurs
      });
    });
  }


}

