export class StudentAnswer {
    studentId!: number;
    quizId!: number;
    questionId!: number;
    questionContent!: string;
    selectedOption!: boolean;
    answerId!: number;
    teacherRemark!: string;
    marks!: number;
    createdOn!: Date;
    modifiedOn!: Date;
}