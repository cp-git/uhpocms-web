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

  constructor(
    private quizProgressService: QuizProgressService,
    private questionService: QuestionService,
    private dialogboxService: DialogBoxService
  ) {

    this.studentId = sessionStorage.getItem("profileId");
    this.loadCategories();
  }

  ngOnInit(): void {

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


  // for adding new changed data in quizData variable and settign some variables
  // currentPage for pagination
  // selectedQuiz and selectedQuizId 
  // getting questions and Answers of quiz
  // and category name 
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

            response.forEach(
              question => {
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
            console.log("questionAnswer " + (this.questionAnswers) + "8888888888888");
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
}
