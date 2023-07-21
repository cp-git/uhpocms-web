import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Category } from 'app/category/class/category';
import { Answer } from 'app/question/class/answer';
import { OneQuestionAnswer } from 'app/question/class/one-question-answer';
import { Question } from 'app/question/class/question';
import { QuestionAnswer } from 'app/question/class/question-answer';
import { QuestionService } from 'app/question/services/question.service';
import { QuizProgress } from 'app/quiz-progress/class/quiz-progress';
import { QuizProgressService } from 'app/quiz-progress/services/quiz-progress.service';
import { Quiz } from 'app/quiz/class/quiz';
import { QuizService } from 'app/quiz/services/quiz.service';
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';
import { StudentAnswer } from 'app/student-module/class/student-answer';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.development';

import { AdminInstitution } from 'app/class/admin-institution';
import { Profile } from 'app/profiles/class/profile';
@Component({
  selector: 'app-student-quiz',
  templateUrl: './student-quiz.component.html',
  styleUrls: ['./student-quiz.component.css']
})
export class StudentQuizComponent implements OnInit {

  // Quiz Data comming from parent
  @Input() quizData: any;

  // submitted by timer or not
  @Input() submitted: boolean = false;

  // is Retaking Quiz or not
  @Input() isRetakingQuiz: boolean = false;

  @Input() retakingQuiz: any;

  @Input() onQuizClick: any;

  @Input() quizPassedProgresses: any[] = [];
  @Input() quizFailedProgresses: any[] = [];
  //function to pass data when quiz added
  @Output() quizProgressAdded: EventEmitter<any> = new EventEmitter();
  // function to be called in parent component
  @Output() onSaveQuizProgress: EventEmitter<any> = new EventEmitter();

  //function to pass data -questionAnswer
  @Output() onQuizSubmit: EventEmitter<any> = new EventEmitter();

  addeedQuizProgress: QuizProgress = new QuizProgress();; //to store quizprogress data
  quizProgresses: QuizProgress[] = [];
  studentId: any;   // logged in student id
  quizProgress!: QuizProgress;  // quizProgress object used to save progress in table

  questions: Question[] = [];   // for storing questions of selected quiz
  selectedQuizId!: number;      // selected Quiz id
  selectedQuiz!: Quiz;          // selected Quiz object

  categories: Category[] = [];  // category array
  categoryName: string = ''     // storing category name, for detecitng which panel to show 

  pagination: boolean = true;   // for pagination
  currentPage = 1;              // currentPage of pagination bydefault it's 1

  sessionData: any;             // for getting data from session
  jsonData: any;                // to store session data into json format

  queAns!: OneQuestionAnswer;   // temp vairable storing question Answer in object to get data
  answers: Answer[] = [];       // all answers with questionId
  questionAnswers: OneQuestionAnswer[] = [];    // array of question and answers

  studentAnswer: StudentAnswer = new StudentAnswer();
  studentAnswers: StudentAnswer[] = [];
  fetchStudentAnswers!: StudentAnswer[];

  ///////////////pdf generate used var //////////////
  displayLogo: any;
  questionFigure: any;
  questionFigureUrl: any;

  data: any;
  adminInstitutions: AdminInstitution[] = [];
  institution: AdminInstitution;
  instituteName: any;

  quizTitle: any;

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

  questionUrl: any;
  quizScore!: any;

  studentName: any;

  selectedQuizCategory: any;
  questionNumber: number = 0;

  constructor(
    private http: HttpClient,
    private quizProgressService: QuizProgressService,
    private questionService: QuestionService,
    private dialogboxService: DialogBoxService,
    private quizProgesServ: QuizProgressService
  ) {
    this.profile = new Profile();
    this.questionUrl = `${environment.questionUrl}`;
    this.displayInstituteLogo = `${environment.adminInstitutionUrl}/institution`;
    this.institution = new AdminInstitution();
    this.studentId = sessionStorage.getItem("profileId");
    this.loadCategory(this.selectedQuizCategoryId);

  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadQuizData();
    this.getQuizScore(this.selectedQuizId, this.studentId);
    this.loadProfiles(this.studentId);
    this.getQuizDetailsByQuizId(this.selectedQuizId);
    this.loadQuiz(this.selectedQuizId);
    this.loadCategory(this.selectedQuizCategoryId);

  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {

    // if quizDate value is changed then this condition will be true
    if (changes['quizData'] || changes['onQuizClick']) {
      console.log("chnages onQuizClick");

      await this.loadStudentAnswers(this.studentId, this.quizData.quizId);
      this.loadQuizData();

    }

    if (changes['retakingQuiz']) {
      console.log("chaged" + this.isRetakingQuiz);

      if (this.isRetakingQuiz) {
        // this.loadQuizData();
        this.clearAnswers();
      }
    }

  }

  getQuizScore(selectedQuizId: any, studentId: any) {
    // alert(JSON.stringify(this.selectedQuiz) + "5555555555");
    this.selectedQuizCategoryId = this.selectedQuiz.categoryId;
    //alert(this.selectedQuizCategoryId);
    this.quizProgesServ.getQuizProgressesByQuizIdAndStudId(selectedQuizId, studentId).subscribe(
      (response: any) => {
        this.quizScore = response;
        console.log(JSON.stringify(this.quizScore));

      },
      (error: any) => {
        console.log(error); // Handle any errors
      }
    );

  }


  loadCategory(selectedQuizCategoryId: number) {

    // alert(selectedQuizCategoryId);
    try {
      this.sessionData = sessionStorage.getItem('category');
      this.data = JSON.parse(this.sessionData);
      for (var category of this.data) {
        if (category.categoryId === selectedQuizCategoryId) {
          this.selectedQuizCategory = category;

          console.log(JSON.stringify(this.selectedQuizCategory)); // Entire object of the selected category
          break; // Exit the loop after finding the matching category
        }
      }
    } catch (err) {
      console.log("Error", err);
    }
  }
  // for adding new changed data in quizData variable and settign some variables
  // currentPage for pagination
  // selectedQuiz and selectedQuizId 
  // getting questions and Answers of quiz
  // and category name 

  // loading all Categories from session storage


  private loadQuizData() {
    this.currentPage = 1;
    this.selectedQuiz = this.quizData;
    this.selectedQuizId = this.quizData['quizId'];

    // this.getQuizPorgressesByStudentId(this.studentId);
    this.getQuestionByQuizId(this.selectedQuizId);

    this.categories.forEach(category => {
      if (category.categoryId == this.selectedQuiz.categoryId) {
        this.categoryName = category.categoryName;
      }
    })

    this.getAllQuestionAnswers(this.selectedQuizId);
  }

  // private getQuizPorgressesByStudentId(studentId: number) {
  //   this.quizProgressService.getQuizProgressesByStudentId(studentId).subscribe(
  //     (data) => {
  //       this.quizProgresses = data;
  //       console.log(data);

  //     },
  //     (error) => {
  //       console.log("failed to fetch progress data");

  //     }
  //   )
  // }


  // Getting all question by quiz Id
  private getQuestionByQuizId(quizId: number) {
    this.questionService.getShuffledQuestionsByQuizId(quizId).subscribe(
      (data: Question[]) => {
        this.questions = data;
      }
    )
  }


  // loading all Categories from session storage
  // private loadCategories() {
  //   try {
  //     this.sessionData = sessionStorage.getItem('category');

  //     this.jsonData = JSON.parse(this.sessionData);
  //     for (var inst in this.jsonData) {
  //       this.categories.push(this.jsonData[inst]);
  //     }
  //   }
  //   catch (err) {
  //     console.log("Error", err)
  //   }
  // }

  // Getting all Question and Answer using quizId and storing all data in array
  private getAllQuestionAnswers(quizId: number) {

    // Fetching all answers
    this.questionService.getAllAnswers().subscribe(
      (data) => {
        this.answers = data;
        this.questionAnswers = []; // Initialize questionAnswers as an array

        //Fetching all Questions by quiz Id 
        this.questionService.getShuffledQuestionsByQuizId(quizId).subscribe(
          (response: any[]) => {
            console.log(response);
            this.questionAnswers = [];
            response.forEach(
              question => {
                console.log(question);

                let trueAnswer: string = '';
                this.queAns = {} as OneQuestionAnswer;

                // Filter the answers based on questionId
                const filteredAnswers = this.answers.filter(answer => answer.questionid == question.questionId);
                // console.log(filteredAnswers);


                // assigning answers to question of questionAnswer array of object
                filteredAnswers.forEach((answer: Answer, index: number) => {
                  // console.log(answer);
                  // console.log(index)
                  if (index === 0) {
                    if (answer.correct) {
                      trueAnswer = answer.content;
                    }
                    this.queAns.correct1 = answer.correct;
                    this.queAns.content1 = answer.content;
                  } else if (index === 1) {
                    if (answer.correct) {
                      trueAnswer = answer.content;
                    }
                    this.queAns.correct2 = answer.correct;
                    this.queAns.content2 = answer.content;
                  } else if (index === 2) {
                    if (answer.correct) {
                      trueAnswer = answer.content;
                    }
                    this.queAns.correct3 = answer.correct;
                    this.queAns.content3 = answer.content;
                  } else if (index === 3) {
                    if (answer.correct) {
                      trueAnswer = answer.content;
                    }
                    this.queAns.correct4 = answer.correct;
                    this.queAns.content4 = answer.content;
                  }
                })


                // Push question and filtered answers into questionAnswers array
                let isFormSubmitted = false;
                if (question.questionId > 0) {
                  isFormSubmitted = true;
                }

                let studentSelectedAnswer: string = '';
                console.log(this.studentAnswers);

                // getting selected answer of student and question
                this.fetchStudentAnswers.forEach(studAns => {
                  console.log(studAns);

                  if (studAns.questionId == question.questionId) {
                    console.log(studAns.questionContent);

                    studentSelectedAnswer = studAns.questionContent;
                  }
                })
                console.log(question);

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
                  selectedAnswer: studentSelectedAnswer,
                  trueAnswer: trueAnswer
                });
              });
            console.log("questionAnswers " + (this.questionAnswers) + "*");
            if (this.isRetakingQuiz) {
              // this.loadQuizData();
              this.clearAnswers();
            }
          }
        );
      },
      error => {
        console.log("failed to get answers");
      }
    );

  }


  // loading all Categories from session storage
  private loadCategories() {
    try {
      this.sessionData = sessionStorage.getItem('category');

      this.jsonData = JSON.parse(this.sessionData);
      for (var inst in this.jsonData) {
        this.categories.push(this.jsonData[inst]);
      }
    }
    catch (err) {
      console.log("Error", err)
    }
  }


  // function called when form is submitted from frontend
  // onFormSubmit() {
  //   this.quizProgress = new QuizProgress();

  //   console.log(this.questionAnswers);
  //   console.log(this.quizData);


  //   let notAttendedQuestions: any[] = [];
  //   let score: number = 0;
  //   const marksPerQuestion: number = 100 / (this.questionAnswers.length);

  //   this.questionAnswers.forEach((queAns, index) => {

  //     let trueAnswer: string = '';
  //     if (queAns.correct1) {
  //       trueAnswer = queAns.content1;
  //     } else if (queAns.correct2) {
  //       trueAnswer = queAns.content2;
  //     } else if (queAns.correct3) {
  //       trueAnswer = queAns.content3;
  //     } else if (queAns.correct4) {
  //       trueAnswer = queAns.content4;
  //     }

  //     if (queAns.selectedAnswer == undefined || queAns.selectedAnswer == '') {
  //       notAttendedQuestions.push(index + 1);
  //     }

  //     if (queAns.selectedAnswer == trueAnswer) {
  //       score = score + (marksPerQuestion);
  //     }


  //   })

  //   if (notAttendedQuestions.length > 0) {
  //     alert("Please answer the questions  " + (notAttendedQuestions))
  //     return;
  //   }

  //   this.quizProgress.studentId = this.studentId;
  //   this.quizProgress.quizId = this.selectedQuizId;
  //   this.quizProgress.score = score;
  //   if (score >= this.quizData.passMark) {
  //     this.quizProgress.completed = true;
  //   } else {
  //     this.quizProgress.completed = false;
  //   }
  //   this.quizProgress.numberOfAttempts = 1;
  //   let addedQuizProgress: QuizProgress;
  //   this.quizProgressService.addQuizProgressOfStudent(this.quizProgress).subscribe(
  //     (response) => {


  //       this.addeedQuizProgress = response;
  //       this.quizProgressAdded.emit(this.addeedQuizProgress);
  //       alert("Quiz progress saved");


  //       addedQuizProgress = response;
  //       console.log("Quiz progress saved");
  //       this.onSaveQuizProgress.emit(addedQuizProgress);

  //     },
  //     (error) => {
  //       console.log("Failed to save Progress");
  //     }
  //   );

  //   console.log("Total score : " + score);

  // }


  //Dialog Box -- Kaushik

  // function called when form is submitted from frontend
  // onFormSubmit() {
  //   this.quizProgress = new QuizProgress();

  //   console.log(this.questionAnswers);
  //   console.log(this.quizData);


  //   let notAttendedQuestions: any[] = [];
  //   let score: number = 0;
  //   const marksPerQuestion: number = 100 / (this.questionAnswers.length);

  //   this.questionAnswers.forEach((queAns, index) => {

  //     let trueAnswer: string = '';
  //     if (queAns.correct1) {
  //       trueAnswer = queAns.content1;
  //     } else if (queAns.correct2) {
  //       trueAnswer = queAns.content2;
  //     } else if (queAns.correct3) {
  //       trueAnswer = queAns.content3;
  //     } else if (queAns.correct4) {
  //       trueAnswer = queAns.content4;
  //     }

  //     if (queAns.selectedAnswer == undefined || queAns.selectedAnswer == '') {
  //       notAttendedQuestions.push(index + 1);
  //     }

  //     if (queAns.selectedAnswer == trueAnswer) {
  //       score = score + (marksPerQuestion);
  //     }


  //   })

  //   if (notAttendedQuestions.length > 0) {
  //     // alert("Please answer the questions  " + (notAttendedQuestions))
  //     this.dialogboxService.open('Please answer the questions ' + (notAttendedQuestions), 'warning');
  //     return;
  //   }

  //   this.quizProgress.studentId = this.studentId;
  //   this.quizProgress.quizId = this.selectedQuizId;
  //   this.quizProgress.score = score;
  //   if (score >= this.quizData.passMark) {
  //     this.quizProgress.completed = true;
  //   } else {
  //     this.quizProgress.completed = false;
  //   }
  //   this.quizProgress.numberOfAttempts = 1;
  //   let addedQuizProgress: QuizProgress;
  //   this.quizProgressService.addQuizProgressOfStudent(this.quizProgress).subscribe(
  //     (response) => {


  //       this.addeedQuizProgress = response;
  //       this.quizProgressAdded.emit(this.addeedQuizProgress);
  //       // alert("Quiz progress saved");


  //       addedQuizProgress = response;
  //       console.log("Quiz progress saved");
  //       this.onSaveQuizProgress.emit(addedQuizProgress);

  //     },
  //     (error) => {
  //       console.log("Failed to save Progress");
  //     }
  //   );

  //   if (score >= this.selectedQuiz.passMark) {
  //     // show dialog box with green exam pass
  //     var grade = '';
  //     if (score >= 90) {
  //       grade = 'A+';
  //     } else if (score >= 80) {
  //       grade = 'A';
  //     } else if (score >= 75) {
  //       grade = 'B+';
  //     } else if (score >= 70) {
  //       grade = 'B';
  //     } else if (score >= 60) {
  //       grade = 'C';
  //     } else if (score >= 50) {
  //       grade = 'D';
  //     } else if (score >= 40) {
  //       grade = 'E';
  //     }
  //     this.dialogboxService.open(this.selectedQuiz.successText + '  ' + grade, 'information');
  //     //alert("Total score: " + score);
  //   } else {
  //     // show dialog box with red exam fail
  //     this.dialogboxService.open(this.selectedQuiz.failText, 'information');
  //   }
  // }

  onFormSubmit2() {
    this.onQuizSubmit.emit(this.questionAnswers);
  }

  clearAnswers() {
    console.log("eraseing answers");
    console.log(this.questionAnswers);

    this.questionAnswers.forEach(queAns => {

      queAns.selectedAnswer = ''
      this.currentPage = 1;

    })
    console.log(this.questionAnswers);

  }

  // to load student answer for disaplying exisitng answer given by student for quiz
  async loadStudentAnswers(studentId: number, quizId: number) {
    this.fetchStudentAnswers = [];

    await this.quizProgressService.getAllStudentAnswersByStduentIdAndQuizId(studentId, quizId).toPromise().then(
      (response) => {
        console.log(response);

        if (response != undefined) {
          this.fetchStudentAnswers = response;
        }
      }, (error) => {
        this.fetchStudentAnswers = [];
      }
    );

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
          this.loadCategory(this.quizCategory.categoryId);
          console.log(this.quizTitle + ""); // Quiz title of the selected quiz
          break; // Exit the loop after finding the matching quiz
        }
      }
    } catch (err) {
      console.log("Error", err);
    }
  }



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


  //////////////////////////////
  ///  pdf code                //
  ///                          //
  //////////////////////////////


  loadProfiles(studentId: number) {
    // alert(studentId);
    try {
      this.sessionData = sessionStorage.getItem('instituteprofile');
      //alert(JSON.stringify(this.sessionData));
      this.data = JSON.parse(this.sessionData);
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].adminId == this.studentId) {
          this.profile = this.data;
          this.studentName = this.data[i].firstName + " " + this.data[i].lastName;
          //  alert(this.studentName);
          console.log(this.profile.firstName, this.profile.lastName, this.profile.fullName, "  + ++++ + + ", this.profileInstituteId);
          this.profileInstituteId = this.data[i].institutionId;

          //  alert(JSON.stringify(this.profileInstituteId));
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


  /////////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////pdf make code//////////////////////////////////////////////////////////



  async generatePdfUsingPdfMaker() {
    const questionSection: any[] = [];
    this.getQuizScore(this.selectedQuizId, this.studentId);

    this.displayLogo = this.displayInstituteLogo + '/getFileById/' + this.profileInstituteId;

    this.http.get(this.displayLogo, { responseType: 'blob' }).subscribe((logoBlob: Blob) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const logoDataUrl = reader.result as string;

        // Add the institute logo to the content array
        questionSection.push({
          image: logoDataUrl,
          width: 100,
          height: 100,
          alignment: 'center',
        });

        const courseCodeAndCourseName = `Course Code : ${this.courseCode}   Course Name : ${this.courseName}`;
        // Add the remaining content
        questionSection.push(
          { text: 'Institute : ' + this.institutionName, style: 'header', alignment: 'center' },
          { text: 'Department : ' + this.departmentName, style: 'deptHeader', alignment: 'center' },
          { text: courseCodeAndCourseName, alignment: 'center' },
          { text: 'Module : ' + this.moduleName, alignment: 'center' },
          { text: 'Quiz : ' + this.quizTitle, alignment: 'center' },
          { text: 'Student name : ' + this.studentName },
          {
            columns: [
              { text: 'Pass mark : ' + this.passMark, alignment: 'right' },
            ]
          },
          { text: ' Student mark : ' + this.quizScore.score, alignment: 'right' },
          { text: 'Max mark  : ' + this.selectedQuiz.maxMarks, alignment: 'right' },
        );

        console.log(this.quizScore.score + "score");

        console.log(this.questionAnswers + " Before Loop +++");

        const questionPromises: any = [];
        this.questionNumber = 1;
        // Use `map` to iterate over the questionAnswers array and create an array of Promises
        for (const questionAnswer of this.questionAnswers) {
          console.log(questionAnswer + "222222222222222222222222");
          const questionFigureUrl = this.questionUrl + '/getFileById/' + questionAnswer.questionId;
          const questionContent = questionAnswer.questionContent;
          const questionMark = questionAnswer.maxMarks;
          if (questionAnswer.questionFigure != null) {
            const questionFigureUrl = this.questionUrl + '/getFileById/' + questionAnswer.questionId;
          } else {
            console.log("figure is contained *****************");
          }
          const selectedAns = questionAnswer.selectedAnswer;

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



          console.log("Question with figure ");
          await this.fetchFile(questionFigureUrl, questionSection, questionContent, options, answer, selectedAns, questionMark);

        };


        // Wait for all question image Promises to resolve
        Promise.all(questionPromises).then(() => {
          // Define the styles
          const instituteStyles: any = {
            page: {
              border: 'url(path/to/border-image.png) center center / auto repeat', // Replace with the path to your border image
            },
            header: {
              color: 'red',
              fontSize: 20,
              bold: true,
              italics: true,
            },
            deptHeader: {
              color: 'green'
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
            incorrect: {
              color: 'red',
              // marginTop: 5,
              // marginBottom: 5,
            },
            queMark: {
              alignment: 'left' // Aligns the queMark to the left
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
            content: [questionSection],
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
    }, (error) => {
      console.error('Error fetching logo image:', error);
    });
  }

  async fetchFile(questionFigureUrl: any, questionSection: any, questionContent: any, options: any, answer: any, selectedAns: any, questionMark: any) {
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

          if (this.selectedQuizCategory.categoryName == 'MCQ') {
            questionSection.push({ text: 'Options:' })
            questionSection.push({ ol: options.map((option: { content: any; }) => option.content) });
          }

          if (selectedAns == answer) {
            questionSection.push({ text: 'Selected answer: ' + selectedAns });
            questionSection.push({ text: 'Correct answer: ' + answer, style: 'answer' });
          } else {
            questionSection.push({ text: 'Selected answer: ' + selectedAns, style: 'incorrect' });
            questionSection.push({ text: 'Correct answer: ' + answer, style: 'answer' });
          }
          // Add two line spaces after each question
          questionSection.push({ text: '\n\n' });

          this.questionNumber++;
          resolve(); // Resolve the Promise for questions without figure
        };
        reader.readAsDataURL(figureBlob);
      }, (error) => {
        console.error('Error fetching question image:', error);
        const questionText = `${this.questionNumber}. ${questionContent}`;
        const queMark = ` ${questionMark}`;
        questionSection.push({
          columns: [
            { text: questionText, style: 'questionContent' },
            { text: queMark + " : Mark", alignment: 'right' }
          ]
        });
        if (this.selectedQuizCategory.categoryName == 'MCQ') {
          questionSection.push({ text: 'Options:' })
          questionSection.push({ ol: options.map((option: { content: any; }) => option.content) });
        }

        if (selectedAns == answer) {
          questionSection.push({ text: 'Selected answer: ' + selectedAns });
          questionSection.push({ text: 'Correct answer: ' + answer, style: 'answer' });
        } else {
          questionSection.push({ text: 'Selected answer: ' + selectedAns, style: 'incorrect' });
          questionSection.push({ text: 'Correct answer: ' + answer, style: 'answer' });
        }
        // Add two line spaces after each question
        questionSection.push({ text: '\n\n' });

        this.questionNumber++;
        resolve(); // Resolve the Promise for questions without figure
      });
    });
  }





}
