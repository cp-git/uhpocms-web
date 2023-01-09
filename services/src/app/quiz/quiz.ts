export class Quiz {
       quizId!: number;
       title!: String;
       description!: String;
       url!: String;
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
       courseidId!: number;
       moduleId!: number;
       categoryId!: number;
       isActive!: boolean;
       modifiedBy!: string;
       createdBy!: string;
       createdOn!: Date;
       modifiedOn!: Date;
}
