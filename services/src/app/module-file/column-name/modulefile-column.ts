export const ModuleFileColumn = [
    { key: 'courseId', label: 'Course Name', type: 'dropdown', arrayName: 'courses', columnId: 'courseId', columnName: 'courseName' },
    { key: 'moduleId', label: 'Module Name', type: 'dropdown', arrayName: 'modules', columnId: 'moduleId', columnName: 'moduleName' },
    { key: 'moduleFile', label: 'Module File', type: 'input' },
    { key: 'moduleFileOrderNo', label: ' Module File Order No', type: 'input', subtype: 'number' },




]

export const ModuleFileAllColumn = [

    { key: 'courseId', label: 'Course Name', type: 'dropdown', arrayName: 'courses', columnId: 'courseId', columnName: 'courseName' },
    { key: 'moduleId', label: 'Module Name', type: 'dropdown', arrayName: 'modules', toSort: true, sortBasedOn: 'courseId', foreignKeyColumn: 'courseId_id', columnId: 'moduleId', columnName: 'moduleName' },
    { key: 'moduleFile', label: 'Module File', type: 'file' },
    { key: 'moduleFileOrderNo', label: ' Module File Order No', type: 'input', subtype: 'number' },
    { key: 'moduleFileIsActive', label: 'Is Active', type: 'checkbox' },

]

export const ModuleFileUpdateColumn = [

    { key: 'courseId', label: 'Course Name', type: 'dropdown', arrayName: 'courses', columnId: 'courseId', columnName: 'courseName', disabled: true },
    { key: 'moduleId', label: 'Module Name', type: 'dropdown', arrayName: 'modules', toSort: true, sortBasedOn: 'courseId', foreignKeyColumn: 'courseId_id', columnId: 'moduleId', columnName: 'moduleName', disabled: true },
    { key: 'moduleFile', label: 'Module File', type: 'file' },
    { key: 'moduleFileOrderNo', label: ' Module File Order No', type: 'input', subtype: 'number' },
    { key: 'moduleFileIsActive', label: 'Is Active', type: 'checkbox' },

]

export const ModuleFileViewColumn = [

    { key: 'courseId', label: 'Course Name', type: 'dropdown', arrayName: 'courses', columnId: 'courseId', columnName: 'courseName' },
    { key: 'moduleId', label: 'Module Name', type: 'dropdown', arrayName: 'modules', toSort: true, sortBasedOn: 'courseId', foreignKeyColumn: 'courseId_id', columnId: 'moduleId', columnName: 'moduleName' },
    { key: 'moduleFile', label: 'Module File', type: 'input' },
    { key: 'moduleFileOrderNo', label: ' Module File Order No', type: 'input', subtype: 'number' },
    { key: 'moduleFileIsActive', label: 'Is Active', type: 'checkbox' },

]
