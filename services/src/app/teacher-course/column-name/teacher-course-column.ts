export const CourseColumn = [
    { key: 'courseName', label: 'Course Name', type: 'input' },
    { key: 'courseDescription', label: 'Description', type: 'input' },
    { key: 'instId', label: 'Institution', type: 'dropdown', arrayName: 'adminInstitutions', columnId: 'adminInstitutionId', columnName: 'adminInstitutionName' },
    { key: 'departmentId', label: 'Department', type: 'dropdown', arrayName: 'departments', columnId: 'id', columnName: 'name' },


    { key: 'courseCode', label: 'Course code', type: 'input' },
    { key: 'courseType', label: 'Course Type', type: 'input' },
    { key: 'passingScore', label: 'Passing Score', type: 'email' },

]
export const CourseAllColumn = [
    { key: 'instId', label: 'Institution', type: 'dropdown', arrayName: 'adminInstitutions', columnId: 'adminInstitutionId', columnName: 'adminInstitutionName' },
    { key: 'departmentId', label: 'Department', type: 'dropdown', 'toSort': true, arrayName: 'departments', columnId: 'id', columnName: 'name', sortBasedOn: 'instId', foreignKeyColumn: 'institutionId' },

    { key: 'courseName', label: 'Course Name', type: 'input' },
    { key: 'courseDescription', label: 'Description', type: 'input' },
    { key: 'courseCode', label: 'Course code', type: 'input' },
    { key: 'courseType', label: 'Course Type', type: 'input' },
    { key: 'passingScore', label: 'Passing Score', type: 'email' },

    { key: 'courseIsActive', label: 'Is Active', type: 'checkbox' },
]

export const CourseUpdateColumn = [
    { key: 'instId', label: 'Institution', type: 'dropdown', arrayName: 'adminInstitutions', columnId: 'adminInstitutionId', columnName: 'adminInstitutionName', disable: 'true' },
    { key: 'departmentId', label: 'Department', type: 'dropdown', 'toSort': true, arrayName: 'departments', columnId: 'id', columnName: 'name', sortBasedOn: 'instId', foreignKeyColumn: 'institutionId', disable: 'true' },

    { key: 'courseName', label: 'Course Name', type: 'input', disable: 'true' },
    { key: 'courseDescription', label: 'Description', type: 'input' },
    { key: 'courseCode', label: 'Course code', type: 'input' },
    { key: 'courseType', label: 'Course Type', type: 'input' },
    { key: 'passingScore', label: 'Passing Score', type: 'email' },

    { key: 'courseIsActive', label: 'Is Active', type: 'checkbox' },
]