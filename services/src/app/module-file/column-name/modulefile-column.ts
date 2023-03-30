export const ModuleFileColumn = [
    { key: 'courseId', label: 'Course Name', type: 'dropdown', arrayName: 'courses', columnId: 'courseId', columnName: 'courseName' },
    { key: 'moduleId', label: 'Module Name', type: 'dropdown', arrayName: 'modules', columnId: 'moduleId', columnName: 'moduleName' },
    { key: 'moduleFile', label: 'Module File', type: 'input', subtype: 'file' },
    { key: 'moduleFileOrderNo', label: ' Module File Order No', type: 'input', subtype: 'number' },




]

export const ModuleFileAllColumn = [

    { key: 'courseId', label: 'Course Name', type: 'dropdown', arrayName: 'courses', columnId: 'courseId', columnName: 'courseName' },
    { key: 'moduleId', label: 'Module Name', type: 'dropdown', arrayName: 'modules', toSort: true, sortBasedOn: 'courseId', foreignKeyColumn: 'courseId_id', columnId: 'moduleId', columnName: 'moduleName' },

    { key: 'moduleFile', label: 'Module File', type: 'input', subtype: 'file' },
    { key: 'moduleFileOrderNo', label: ' Module File Order No', type: 'input', subtype: 'number' },
    { key: 'moduleFileIsActive', label: 'Is Active', type: 'checkbox' },

]