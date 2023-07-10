
export class CorrectQuestionAnswer {
    questionId!: number;
    questionFigure!: string;
    questionContent!: string;
    questionExplanation!: string;
    questionOrderNo!: number;
    questionIsMCQ!: boolean;
    questionQuizId!: number;
    questionCategoryId!: number;
    questionIsActive!: boolean;


    answerId!: number;
    content1!: string;

   reviewcontent!: string;


    isFormDirty!: boolean;
    isFormSubmitted!: boolean;
    image!: boolean;
    isOptionSelected!: boolean;

    marks!: any;
    maxMarks!: number;

    totalMarks!: number; //total marks per question
    totalReviewMarks!: number;
    isAnswerCorrect!: boolean;
    selectedAnswer!: string;
    profileId!: number;
    createdOn!: Date;
    modifiedOn!: Date;
    questionAnswers: any[] = [];

    reviewStatus!: boolean;
}