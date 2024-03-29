export const QuestionColumn = [
    { key: 'questionContent', label: 'Question Content', type: 'input' },
    { key: 'questionExplanation', label: 'Question Explanation', type: 'textarea' },
    { key: 'questionQuizId', label: 'Quiz', type: 'dropdown', arrayName: 'quizzes', columnId: 'quizId', columnName: 'title' },
    { key: 'questionCategoryId', label: 'Category', type: 'dropdown', arrayName: 'categories', columnId: 'categoryId', columnName: 'categoryName' }
]

export const QuestionAllColumn = [
    { key: 'questionFigure', label: 'Question Figure', type: 'input' },
    { key: 'questionContent', label: 'Question Content', type: 'input' },
    { key: 'questionExplanation', label: 'Question Explanation', type: 'textarea' },
    { key: 'questionIsMCQ', label: 'is MCQ', type: 'checkbox' },
    { key: 'questionQuizId', label: 'Quiz', type: 'dropdown', arrayName: 'quizzes', columnId: 'quizId', columnName: 'title' },
    { key: 'questionCategoryId', label: 'Category', type: 'dropdown', arrayName: 'categories', columnId: 'categoryId', columnName: 'categoryName' }
]


export const TeacherQuizColumn = [
    { key: 'title', label: 'Quiz Title', type: 'input', subtype: 'text' },
    { key: 'description', label: 'Quiz Description', type: 'input', subtype: 'text' },
    { key: 'maxQuestions', label: 'Max Questions', type: 'input', subtype: 'number' },
    // { key: 'courseId', label: 'CourseId', type: 'dropdown', arrayName: 'courses', columnId: 'courseId', columnName: 'courseName' },
    // { key: 'moduleId', label: 'ModuleId', type: 'dropdown', arrayName: 'modules', columnId: 'moduleId', columnName: 'moduleName' },
    // { key: 'categoryId', label: 'CategoryId', type: 'dropdown', arrayName: 'categories', columnId: 'categoryId', columnName: 'categoryName' },

]

export const TeacherQuizAllColumn = [
    { key: 'courseId', label: 'CourseId', type: 'dropdown', arrayName: 'courses', columnId: 'courseId', columnName: 'courseName' },
    // "foreignKeyColumn" is a foeign key from module table and "sortBasedOn" is foreign key of quiz table
    { key: 'moduleId', label: 'ModuleId', type: 'dropdown', arrayName: 'modules', toSort: true, sortBasedOn: 'courseId', foreignKeyColumn: 'courseId_id', columnId: 'moduleId', columnName: 'moduleName' },
    { key: 'categoryId', label: 'CategoryId', type: 'dropdown', arrayName: 'categories', columnId: 'categoryId', columnName: 'categoryName' },

    { key: 'title', label: 'Quiz Title', type: 'input', subtype: 'text' },
    { key: 'description', label: 'Quiz Description', type: 'input', subtype: 'text' },
    { key: 'url', label: 'Quiz Url', type: 'input', subtype: 'text' },
    { key: 'maxQuestions', label: 'MaxQuestions', type: 'input', subtype: 'number' },
    { key: 'passMark', label: 'PassMark', type: 'input', subtype: 'number' },
    { key: 'successText', label: 'SuccessText', type: 'input', subtype: 'text' },
    { key: 'failText', label: 'Fail Text', type: 'input', subtype: 'text' },
    { key: 'quizOrderNo', label: 'QuizOrderNo', type: 'input', subtype: 'number' },
    { key: 'answersAtEnd', label: 'AnswerAtEnd', type: 'checkbox' },
    { key: 'randomOrder', label: 'Random Order', type: 'input' },
    { key: 'examPaper', label: 'Exam Paper', type: 'checkbox' },
    { key: 'singleAttempt', label: 'Single Attempt', type: 'checkbox' },
    { key: 'draft', label: 'Quiz Draft', type: 'checkbox' },
]
