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
