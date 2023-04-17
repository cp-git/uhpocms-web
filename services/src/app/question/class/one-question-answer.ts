
export class OneQuestionAnswer {
    questionId!: number;
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

    correct1!: boolean;
    content1!: string;

    correct2!: boolean;
    content2!: string;

    correct3!: boolean;
    content3!: string;

    correct4!: boolean;
    content4!: string;


    isFormDirty!: boolean;
    isFormSubmitted!: boolean;
}