import { TimerFormatPipe } from "app/shared/pipes/timerFormat/timer-format.pipe"


export const TeacherQuizColumn = [
    { key: 'title', label: 'Quiz Title', type: 'input', subtype: 'text' },
    { key: 'description', label: 'Quiz Description', type: 'input', subtype: 'text' },
   

    {key:'setTimer',label:'Quiz Timing(HH:MM)',type:'time'},
    { key: 'courseId', label: 'Course Name', type: 'dropdown', arrayName: 'courses', columnId: 'courseId', columnName: 'courseName' },
    { key: 'moduleId', label: 'Module Name', type: 'dropdown', arrayName: 'modules', columnId: 'moduleId', columnName: 'moduleName' },
    { key: 'categoryId', label: 'Category Name', type: 'dropdown', arrayName: 'categories', columnId: 'categoryId', columnName: 'categoryName' },

]

export const TeacherQuizAllColumn = [
    { key: 'courseId', label: 'Course Name', type: 'dropdown', arrayName: 'courses', columnId: 'courseId', columnName: 'courseName' },
    // "foreignKeyColumn" is a foeign key from module table and "sortBasedOn" is foreign key of quiz table
    { key: 'moduleId', label: 'Module Name', type: 'dropdown', arrayName: 'modules', toSort: true, sortBasedOn: 'courseId', foreignKeyColumn: 'courseId_id', columnId: 'moduleId', columnName: 'moduleName' },
    { key: 'categoryId', label: 'Category Name', type: 'dropdown', arrayName: 'categories', columnId: 'categoryId', columnName: 'categoryName' },

    { key: 'title', label: 'Quiz Title', type: 'input', subtype: 'text' },
    { key: 'description', label: 'Quiz Description', type: 'input', subtype: 'text' },
   
    { key: 'maxQuestions', label: 'Max Questions', type: 'input', subtype: 'number' },
    { key: 'passMark', label: 'Passing Marks', type: 'input', subtype: 'number' },
    { key: 'maxMarks', label: 'Max Marks', type: 'input', subtype: 'number' },
    { key: 'successText', label: 'Success Text', type: 'input', subtype: 'text' },
    { key: 'failText', label: 'Fail Text', type: 'input', subtype: 'text' },
    { key: 'setTimerInHours', label: 'Quiz Timing (In Hours)', type: 'input', subtype: 'number' },
    { key: 'setTimerInMinutes', label: 'Quiz Timing (In Minutes)', type: 'input', subtype: 'number' },
    { key: 'quizOrderNo', label: 'QuizOrderNo', type: 'input', subtype: 'number' },

    { key: 'randomOrder', label: 'Random Order', type: 'checkbox' },
    { key: 'singleAttempt', label: 'Single Attempt', type: 'checkbox' },
]

export const TeacherQuizUpdateColumn = [
    { key: 'courseId', label: 'Course Name', type: 'dropdown', arrayName: 'courses', columnId: 'courseId', columnName: 'courseName', disable: 'true' },
    // "foreignKeyColumn" is a foeign key from module table and "sortBasedOn" is foreign key of quiz table
    { key: 'moduleId', label: 'Module Name', type: 'dropdown', arrayName: 'modules', toSort: true, sortBasedOn: 'courseId', foreignKeyColumn: 'courseId_id', columnId: 'moduleId', columnName: 'moduleName', disable: 'true' },
    { key: 'categoryId', label: 'Category Name', type: 'dropdown', arrayName: 'categories', columnId: 'categoryId', columnName: 'categoryName', disable: 'true' },

    { key: 'title', label: 'Quiz Title', type: 'input', subtype: 'text' , disable :'true'},
    { key: 'description', label: 'Quiz Description', type: 'input', subtype: 'text' },
    { key: 'maxQuestions', label: 'Max Questions', type: 'input', subtype: 'number' },
    { key: 'passMark', label: 'Passing Marks', type: 'input', subtype: 'number' },
    { key: 'maxMarks', label: 'Max Marks', type: 'input', subtype: 'number' },
    { key: 'successText', label: 'Success Text', type: 'input', subtype: 'text' },
    { key: 'failText', label: 'Fail Text', type: 'input', subtype: 'text' },
    { key: 'setTimerInHours', label: 'Quiz Timing (In Hours)', type: 'input', subtype: 'number' },
    { key: 'setTimerInMinutes', label: 'Quiz Timing (In Minutes)', type: 'input', subtype: 'number' },
    { key: 'quizOrderNo', label: 'QuizOrderNo', type: 'input', subtype: 'number' },

    { key: 'randomOrder', label: 'Random Order', type: 'checkbox' },
    { key: 'singleAttempt', label: 'Single Attempt', type: 'checkbox' },
]