export const ProfileColumn = [
    { key: 'firstName', label: 'First Name', type: 'input', subtype: 'text' },
    { key: 'lastName', label: 'Last Name', type: 'input', subtype: 'text' },
    { key: 'adminEmail', label: 'Email', type: 'email' },
    { key: 'institutionId', label: 'Institution', type: 'dropdown', arrayName: 'adminInstitutions', columnId: 'adminInstitutionId', columnName: 'adminInstitutionName' },
    { key: 'adminDepartment', label: 'Department', type: 'dropdown', arrayName: 'departments', columnId: 'id', columnName: 'name' },

]


export const ProfileAllColumn = [
    { key: 'institutionId', label: 'Institution', type: 'dropdown', arrayName: 'adminInstitutions', columnId: 'adminInstitutionId', columnName: 'adminInstitutionName' },
    { key: 'adminDepartment', label: 'Department', type: 'dropdown', 'toSort': true, arrayName: 'departments', columnId: 'id', columnName: 'name', sortBasedOn: 'institutionId', foreignKeyColumn: 'institutionId' },
    { key: 'userId', label: 'User Name', type: 'dropdown', arrayName: 'inactiveAuthUsers', columnId: 'authUserId', columnName: 'authUserName' },
    { key: 'userRole', label: 'User Role', type: 'dropdown', arrayName: 'adminRoles', columnId: 'roleName', columnName: 'roleName' },

    { key: 'firstName', label: 'First Name', type: 'input', subtype: 'text' },
    { key: 'lastName', label: 'Last Name', type: 'input', subtype: 'text' },
    { key: 'adminEmail', label: 'Email', type: 'email' },
    { key: 'dob', label: 'DOB', type: 'date' },
    { key: 'adminGender', label: 'Gender', type: 'dropdown', arrayName: 'genders', columnId: 'value', columnName: 'name' },
    { key: 'mobilePhone', label: 'Phone Number', type: 'input', subtype: 'number' },
    { key: 'adminAddress1', label: 'Address1', type: 'input', subtype: 'text' },
    { key: 'adminAddress2', label: 'Address2', type: 'input', subtype: 'text' },
    { key: 'adminState', label: 'State', type: 'input', subtype: 'text' },
    { key: 'adminCity', label: 'City', type: 'input', subtype: 'text' },
    { key: 'adminZip', label: 'Zip', type: 'input', subtype: 'number' },
    { key: 'profilePics', label: 'Profile Pic:', type: 'file', },
    { key: 'activeUser', label: 'Is Active', type: 'checkbox', },


]
