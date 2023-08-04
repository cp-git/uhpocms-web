export class Quiz {
    quizId!: number;
    title!: string;
    description!: String;
    randomOrder!: boolean;
    maxQuestions!: number;
    
    
    singleAttempt: boolean = false;
    passMark!: number;
    maxMarks!: number;
    successText!: string;
    failText!: string;
    
    quizOrderNo!: number;
    courseId!: number;
    moduleId!: number;
    categoryId!: number;
    active!: boolean;
    modifiedBy!: string;
    createdBy!: string;
    createdOn!: Date;
    modifiedOn!: Date;
     setTimer!:number;
     setTimerInMinutes!: number;
     setTimerInHours!: number;
}
