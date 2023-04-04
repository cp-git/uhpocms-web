//columns to be displayed on Access control administration screen
export const AccessControlColumn = [
    { key: 'userId', label: 'User Name', type: 'dropdown', arrayName: 'users', columnId: 'authUserId', columnName: 'authUserName' },
    { key: 'userId', label: 'First Name', type: 'dropdown', arrayName: 'users', columnId: 'authUserId', columnName: 'authUserFirstName' },
    { key: 'userId', label: 'Last Name', type: 'dropdown', arrayName: 'users', columnId: 'authUserId', columnName: 'authUserLastName' },
    { key: 'userId', label: 'User Role', type: 'dropdown', arrayName: 'profiles', columnId: 'adminId', columnName: 'userRole', sortBasedOn: 'userId', foreignKeyColumn: 'userId' },

]

//columns to be displayed on view and add screen
export const AccessControlAllColumn = [

    { key: 'userId', label: 'User Name', type: 'dropdown', arrayName: 'users', columnId: 'authUserId', columnName: 'authUserName' },
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
    { key: 'quiz', label: 'Quiz', type: 'checkbox' }
]

//columns to be displayed on update screen
export const AccessControlUpdateColumn = [

    { key: 'userId', label: 'User Name', type: 'disableddropdown', arrayName: 'users', columnId: 'authUserId', columnName: 'authUserName' },
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
    { key: 'quiz', label: 'Quiz', type: 'checkbox' }
]
