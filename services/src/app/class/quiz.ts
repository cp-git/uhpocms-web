export class Quiz {
  quizId!: number;
  title!: string;
  description!: string;
  url!: string;
  randomOrder!: boolean;
  maxQuestions!: number;
  answersAtEnd!: boolean;
  examPaper!: boolean;
  singleAttempt!: boolean;
  passMark!: number;
  successText!: string;
  failText!: string;
  draft!: boolean;
  quizOrderNo!: number;
  courseId!: number;
  moduleId!: number;
  categoryId!: number;
  active!: boolean;
  modifiedBy!: string;
  createdBy!: string;
  createdOn!: Date;
  modifiedOn!: Date;
}
