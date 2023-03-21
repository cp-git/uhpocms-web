export class Question {
  questionId!: number | null;
  questionFigure!: string;
  questionContent!: string;
  questionExplanation!: string;
  questionOrderNo!: number;
  questionIsMCQ!: boolean;
  questionQuizId!: number;
  questionCategoryId!: number;
  questionIsActive!: boolean;
  questionCreatedBy!: string;
  questionCreatedOn!: Date;
  questionModifiedBy!: string;
  questionModifiedOn!: Date;
}
