export const ProfileColumn = [
    { key: 'firstName', label: 'First Name', type: 'input', subtype: 'text' },
    { key: 'lastName', label: 'Last Name', type: 'input', subtype: 'text' },
    { key: 'adminEmail', label: 'Email', type: 'email' },
    { key: 'userRoleId', label: 'User Role', type: 'dropdown', arrayName: 'adminRoles', columnId: 'roleId', columnName: 'roleName' },
    { key: 'institutionId', label: 'Institution', type: 'dropdown', arrayName: 'adminInstitutions', columnId: 'adminInstitutionId', columnName: 'adminInstitutionName' },
    { key: 'adminDepartment', label: 'Department', type: 'dropdown', 'toSort': true, arrayName: 'departments', columnId: 'id', columnName: 'name', sortBasedOn: 'institutionId', foreignKeyColumn: 'institutionId' },
]


export const ProfileAllColumn = [
    { key: 'userId', label: 'User Name', type: 'dropdown', arrayName: 'inactiveAuthUsers', columnId: 'authUserId', columnName: 'authUserName', functionOnDropdownClick: true },
    { key: 'institutionId', label: 'Institution', type: 'dropdown', arrayName: 'adminInstitutions', columnId: 'adminInstitutionId', columnName: 'adminInstitutionName', dependentKeys: ['adminDepartment'], functionForDependentKeys: true },
    { key: 'adminDepartment', label: 'Department', type: 'dropdown', 'toSort': true, arrayName: 'departments', columnId: 'id', columnName: 'name', sortBasedOn: 'institutionId', foreignKeyColumn: 'institutionId' },
    // for functionOnDropdownClick, you have to have to pass function names while calling child component
    { key: 'userRoleId', label: 'User Role', type: 'dropdown', arrayName: 'adminRoles', columnId: 'roleId', columnName: 'roleName', functionOnDropdownClick: true },
    { key: 'userRole', label: 'Role Same As', type: 'dropdown', arrayName: 'userRoles', columnId: 'roleName', columnName: 'roleName' },

    { key: 'firstName', label: 'First Name', type: 'input', subtype: 'text', disable: true },
    { key: 'lastName', label: 'Last Name', type: 'input', subtype: 'text', disable: true },
    { key: 'adminEmail', label: 'Email', type: 'email', disable: true },
    { key: 'dob', label: 'DOB', type: 'date', maxValue: new Date().toISOString().split('T')[0] },
    { key: 'adminGender', label: 'Gender', type: 'dropdown', arrayName: 'genders', columnId: 'value', columnName: 'name' },
    { key: 'mobilePhone', label: 'Phone Number', type: 'input', subtype: 'tel', maxLength: 10 },
    { key: 'adminAddress1', label: 'Address1', type: 'input', subtype: 'text' },
    { key: 'adminAddress2', label: 'Address2', type: 'input', subtype: 'text' },
    { key: 'adminState', label: 'State', type: 'input', subtype: 'text' },
    { key: 'adminCity', label: 'City', type: 'input', subtype: 'text' },
    { key: 'adminZip', label: 'Zip', type: 'input', subtype: 'tel', maxLength: 5 },
    { key: 'profilePics', label: 'Profile Pic:', type: 'file', required: true },
    { key: 'activeUser', label: 'Is Active', type: 'checkbox', },


]


export const ProfileUpdateColumn = [
    { key: 'userId', label: 'User Name', type: 'dropdown', arrayName: 'activeAuthUsers', columnId: 'authUserId', columnName: 'authUserName', disable: 'true' },
    { key: 'institutionId', label: 'Institution', type: 'dropdown', arrayName: 'adminInstitutions', columnId: 'adminInstitutionId', columnName: 'adminInstitutionName', disable: 'true' },
    { key: 'adminDepartment', label: 'Department', type: 'dropdown', 'toSort': true, arrayName: 'departments', columnId: 'id', columnName: 'name', sortBasedOn: 'institutionId', foreignKeyColumn: 'institutionId', disable: 'true' },
    { key: 'userRoleId', label: 'User Role', type: 'dropdown', arrayName: 'adminRoles', columnId: 'roleId', columnName: 'roleName', functionOnDropdownClick: true },
    { key: 'userRole', label: 'Role Same As', type: 'dropdown', arrayName: 'userRoles', columnId: 'roleName', columnName: 'roleName' },

    { key: 'firstName', label: 'First Name', type: 'input', subtype: 'text', disable: 'true' },
    { key: 'lastName', label: 'Last Name', type: 'input', subtype: 'text', disable: 'true' },
    { key: 'adminEmail', label: 'Email', type: 'email', disable: 'true' },
    { key: 'dob', label: 'DOB', type: 'date', maxValue: new Date().toISOString().split('T')[0] },
    { key: 'adminGender', label: 'Gender', type: 'dropdown', arrayName: 'genders', columnId: 'value', columnName: 'name' },
    { key: 'mobilePhone', label: 'Phone Number', type: 'input', subtype: 'tel', maxLength: 10 },
    { key: 'adminAddress1', label: 'Address1', type: 'input', subtype: 'text' },
    { key: 'adminAddress2', label: 'Address2', type: 'input', subtype: 'text' },
    { key: 'adminState', label: 'State', type: 'input', subtype: 'text' },
    { key: 'adminCity', label: 'City', type: 'input', subtype: 'text' },
    { key: 'adminZip', label: 'Zip', type: 'input', subtype: 'tel', maxLength: 5 },
    { key: 'profilePics', label: 'Profile Pic:', type: 'file', required: false },
    { key: 'activeUser', label: 'Is Active', type: 'checkbox' },


]


export const ProfileViewOneColumn = [
    { key: 'userId', label: 'User Name', type: 'dropdown', arrayName: 'activeAuthUsers', columnId: 'authUserId', columnName: 'authUserName' },
    { key: 'institutionId', label: 'Institution', type: 'dropdown', arrayName: 'adminInstitutions', columnId: 'adminInstitutionId', columnName: 'adminInstitutionName', dependentKeys: ['adminDepartment'], functionForDependentKeys: true },
    { key: 'adminDepartment', label: 'Department', type: 'dropdown', 'toSort': true, arrayName: 'departments', columnId: 'id', columnName: 'name', sortBasedOn: 'institutionId', foreignKeyColumn: 'institutionId' },
    // for functionOnDropdownClick, you have to have to pass function names while calling child component
    { key: 'userRoleId', label: 'User Role', type: 'dropdown', arrayName: 'adminRoles', columnId: 'roleId', columnName: 'roleName', functionOnDropdownClick: true },
    { key: 'userRole', label: 'Role Same As', type: 'dropdown', arrayName: 'userRoles', columnId: 'roleName', columnName: 'roleName' },

    { key: 'firstName', label: 'First Name', type: 'input', subtype: 'text', disable: true },
    { key: 'lastName', label: 'Last Name', type: 'input', subtype: 'text', disable: true },
    { key: 'adminEmail', label: 'Email', type: 'email', disable: true },
    { key: 'dob', label: 'DOB', type: 'date', maxValue: new Date().toISOString().split('T')[0] },
    { key: 'adminGender', label: 'Gender', type: 'dropdown', arrayName: 'genders', columnId: 'value', columnName: 'name' },
    { key: 'mobilePhone', label: 'Phone Number', type: 'input', subtype: 'tel', maxLength: 10 },
    { key: 'adminAddress1', label: 'Address1', type: 'input', subtype: 'text' },
    { key: 'adminAddress2', label: 'Address2', type: 'input', subtype: 'text' },
    { key: 'adminState', label: 'State', type: 'input', subtype: 'text' },
    { key: 'adminCity', label: 'City', type: 'input', subtype: 'text' },
    { key: 'adminZip', label: 'Zip', type: 'input', subtype: 'tel', maxLength: 5 },
    { key: 'profilePics', label: 'Profile Pic:', type: 'file', required: true },
    { key: 'activeUser', label: 'Is Active', type: 'checkbox', },


]
