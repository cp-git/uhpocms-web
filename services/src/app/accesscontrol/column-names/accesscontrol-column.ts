//columns to be displayed on Access control administration screen
export const AccessControlColumn = [
    { key: 'authUserName', label: 'User Name', type: 'input' },
    { key: 'authUserFirstName', label: 'First Name', type: 'input' },

    { key: 'authUserLastName', label: 'Last Name', type: 'input' },
    { key: 'authUserEmail', label: 'Email', type: 'email' },

]

//columns to be displayed on view and add screen
export const AccessControlAllColumn = [

    // { key: 'userId', label: 'User Name', type: 'dropdown', arrayName: 'filteredProfiles', columnId: 'userId', columnName: 'adminEmail', functionOnDropdownClick: true },
    { key: 'authUser', label: 'Auth User', type: 'checkbox' },
    { key: 'adminInstitute', label: 'Admin Institute', type: 'checkbox' },
    { key: 'role', label: 'Role', type: 'checkbox' },
    { key: 'department', label: 'Department', type: 'checkbox' },
    { key: 'announcement', label: 'Announcement', type: 'checkbox' },
    { key: 'assignCourse', label: 'Assign Course', type: 'checkbox' },
    { key: 'category', label: 'Category', type: 'checkbox' },
    { key: 'course', label: 'Course', type: 'checkbox' },
    { key: 'email', label: 'Email', type: 'checkbox' },
    { key: 'enrollment', label: 'Enrollment', type: 'checkbox' },
    { key: 'module', label: 'Module', type: 'checkbox' },
    { key: 'moduleFile', label: 'Module Content', type: 'checkbox' },
    { key: 'question', label: 'Question', type: 'checkbox' },
    { key: 'quiz', label: 'Quiz', type: 'checkbox' },
    { key: 'lessons', label: 'Lessons', type: 'checkbox' },


]

//columns to be displayed on update screen
export const AccessControlUpdateColumn = [

    // { key: 'userId', label: 'User Name', type: 'dropdown', arrayName: 'filteredProfiles', columnId: 'userId', columnName: 'adminEmail', functionOnDropdownClick: true },
    { key: 'authUser', label: 'Auth User', type: 'checkbox' },
    { key: 'adminInstitute', label: 'Admin Institute', type: 'checkbox' },
    { key: 'role', label: 'Role', type: 'checkbox' },
    { key: 'department', label: 'Department', type: 'checkbox' },
    { key: 'announcement', label: 'Announcement', type: 'checkbox' },
    { key: 'assignCourse', label: 'Assign Course', type: 'checkbox' },
    { key: 'category', label: 'Category', type: 'checkbox' },
    { key: 'course', label: 'Course', type: 'checkbox' },
    { key: 'email', label: 'Email', type: 'checkbox' },
    { key: 'enrollment', label: 'Enrollment', type: 'checkbox' },
    { key: 'module', label: 'Module', type: 'checkbox' },
    { key: 'question', label: 'Question', type: 'checkbox' },
    { key: 'quiz', label: 'Quiz', type: 'checkbox' },
    { key: 'moduleFile', label: 'Module File', type: 'checkbox' },
    { key: 'lessons', label: 'Lessons', type: 'checkbox' }
]
