export const ModuleColumn = [


    { key: 'moduleName', label: 'Module Name', type: 'input' },
    { key: 'moduleDescription', label: 'Description', type: 'input' },
    { key: 'courseId_id', label: 'Course Name', type: 'dropdown1' },
    { key: 'moduleStartDate', label: 'Start Date', type: 'date' },
    { key: 'moduleEndDate', label: 'End Date', type: 'date' },
    { key: 'moduleOrderNo', label: 'Module Order No', type: 'input',subtype:'number' },
    // { key: 'moduleCourse', label: 'Module Course', type: 'input' }

]

export const ModuleAllColumn = [
    { key: 'courseId_id', label: 'Course Name', type: 'dropdown1' },
    { key: 'moduleName', label: 'Module Name', type: 'input' },
    { key: 'moduleDescription', label: 'Description', type: 'input' },
    { key: 'moduleStartDate', label: 'Start Date', type: 'date',minValue: new Date().toISOString().split('T')[0] },
    { key: 'moduleEndDate', label: 'End Date', type: 'date', minValue: 'moduleStartDate' },
    // { key: 'moduleCourse', label: 'Module course', type: 'input' },
    { key: 'moduleOrderNo', label: 'Module Order No', type: 'input',subtype:'number' },
    { key: 'moduleIsActive', label: 'Is Active', type: 'checkbox' }
]


export const UpdateAllColumn = [
    { key: 'courseId_id', label: 'Course Name', type: 'dropdown1', disable: 'true' },
    { key: 'moduleName', label: 'Module Name', type: 'input', disable: 'true' },
    { key: 'moduleDescription', label: 'Description', type: 'input' },
    { key: 'moduleStartDate', label: 'Start Date', type: 'date', },
    { key: 'moduleEndDate', label: 'End Date', type: 'date', minValue: 'moduleStartDate' },
    // { key: 'moduleCourse', label: 'Module course', type: 'input' },
    { key: 'moduleOrderNo', label: 'Module Order No', type: 'input',subtype:'number' },
    { key: 'moduleIsActive', label: 'Is Active', type: 'checkbox' }
]