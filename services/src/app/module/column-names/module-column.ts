export const ModuleColumn = [

    { key: 'courseId_id', label: 'Course Name', type: 'dropdown1' },
    { key: 'moduleName', label: 'Module Name', type: 'input' },
    { key: 'moduleDescription', label: 'Description', type: 'input' },
    { key: 'moduleStartDate', label: 'Start Date', type: 'input' },
    { key: 'moduleEndDate', label: 'End Date', type: 'input' },
    { key: 'moduleOrderNo', label: 'Module Order No', type: 'input' },
    // { key: 'moduleCourse', label: 'Module Course', type: 'input' }

]

export const ModuleAllColumn = [
    { key: 'courseId_id', label: 'Course Name', type: 'dropdown1' },
    { key: 'moduleName', label: 'Module Name', type: 'input' },
    { key: 'moduleDescription', label: 'Description', type: 'input' },
    { key: 'moduleStartDate', label: 'Start Date', type: 'date', },
    { key: 'moduleEndDate', label: 'End Date', type: 'date', minValue: 'moduleStartDate' },
    // { key: 'moduleCourse', label: 'Module course', type: 'input' },
    { key: 'moduleOrderNo', label: 'Module Order No', type: 'input' },
    { key: 'moduleIsActive', label: 'Is Active', type: 'checkbox' }
]