import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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

@Component({
  selector: 'app-student-quiz',
  templateUrl: './student-quiz.component.html',
  styleUrls: ['./student-quiz.component.css']
})
export class StudentQuizComponent implements OnInit {

  @Input() quizData: any;

  studentId: any;
  quizProgresses: QuizProgress[] = [];
  questions: Question[] = [];
  selectedQuizId!: number;
  selectedQuiz!: Quiz;

  categories: Category[] = [];
  categoryName: string = ''

  pagination: boolean = false;
  currentPage = 1;

  sessionData: any;
  jsonData: any;

  queAns!: OneQuestionAnswer;
  answers: Answer[] = [];
  questionAnswers: OneQuestionAnswer[] = [];

  constructor(
    private quizProgressService: QuizProgressService,
    private quizService: QuizService,
    private questionService: QuestionService,

  ) {
    this.studentId = sessionStorage.getItem("profileId");
    this.loadCategories();
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['quizData']) {
      this.selectedQuiz = this.quizData;
      this.selectedQuizId = this.quizData['quizId'];

      this.getQuizPorgressesByStudentId(this.studentId);
      this.getQuestionByQuizId(this.selectedQuizId);

      this.categories.forEach(category => {
        if (category.categoryId == this.selectedQuiz.categoryId) {
          this.categoryName = category.categoryName;
        }
      })

      this.getAllQuestionAnswers(this.selectedQuizId);
    }
  }


  private getQuizPorgressesByStudentId(studentId: number) {
    this.quizProgressService.getQuizProgressesByStudentId(studentId).subscribe(
      (data) => {
        this.quizProgresses = data;
        console.log(data);

      },
      (error) => {
        console.log("failed to fetch progress data");

      }
    )
  }

  private getQuestionByQuizId(quizId: number) {
    this.questionService.getAllQuestionsByQuizId(quizId).subscribe(
      (data) => {
        this.questions = data;
      }
    )
  }

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

  private getAllQuestionAnswers(quizId: number) {


    this.questionService.getAllAnswers().subscribe(
      (data) => {
        this.answers = data;
        this.questionAnswers = []; // Initialize questionAnswers as an array
        this.questionService.getAllQuestionsByQuizId(quizId).subscribe(
          (response) => {
            console.log(response);

            response.forEach(
              question => {
                this.queAns = {} as OneQuestionAnswer;

                // Filter the answers based on questionId
                const filteredAnswers = this.answers.filter(answer => answer.questionid == question.questionId);
                // console.log(filteredAnswers);



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
                  isFormSubmitted: isFormSubmitted,
                  image: false,
                  isOptionSelected: true,
                  selectedAnswer: ''
                });
              });
            // console.log("questionAnswer " + JSON.stringify(this.questionAnswers));

          }
        );
      },
      error => {
        console.log("failed to get answers");
      }
    );

  }

  onFormSubmit() {
    console.log(this.questionAnswers);
    console.log(this.quizData);

    let score: number = 0;
    this.questionAnswers.forEach(queAns => {

      let trueAnswer: string = '';
      if (queAns.correct1) {
        trueAnswer = queAns.content1;
      } else if (queAns.correct2) {
        trueAnswer = queAns.content2;
      } else if (queAns.correct3) {
        trueAnswer = queAns.content3;
      } else if (queAns.correct4) {
        trueAnswer = queAns.content4;
      }

      if (queAns.selectedAnswer == trueAnswer) {
        score = score + 10;
      }

    })

    alert("Total score : " + score)

  }

  onAnswerSelected(question: Question) {
    console.log(this.questionAnswers);
    console.log(this.quizData);
  }


}
