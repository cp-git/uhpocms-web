export const AuthUserColumn = [
    { key: 'authUserName', label: 'User Name', type: 'input' },
    { key: 'authUserFirstName', label: 'First Name', type: 'input' },

    { key: 'authUserLastName', label: 'Last Name', type: 'input' },
    { key: 'authUserEmail', label: 'Email', type: 'email' },
    { key: 'authUserDateJoined', label: 'Join Date', type: 'date', maxValue: new Date().toISOString().split('T')[0] },
   
]
export const AuthUserAllColumn = [
    { key: 'authUserFirstName', label: 'First Name', type: 'input' },
    { key: 'authUserLastName', label: 'Last Name', type: 'input' },
    { key: 'authUserEmail', label: 'Email', type: 'email' },
    { key: 'authUserName', label: 'User Name', type: 'input' },
    { key: 'authUserPassword', label: 'Password', type: 'input' },
    { key: 'authUserDateJoined', label: 'Join Date', type: 'date', maxValue: new Date().toISOString().split('T')[0] },
  
]
export const AuthUserUpdateColumn = [
    { key: 'authUserFirstName', label: 'First Name', type: 'input' },
    { key: 'authUserLastName', label: 'Last Name', type: 'input' },
    { key: 'authUserEmail', label: 'Email', type: 'email' },
    { key: 'authUserName', label: 'User Name', type: 'input', disable: 'true' },
    { key: 'authUserPassword', label: 'Password', type: 'input' },

    { key: 'authUserDateJoined', label: 'Join Date', type: 'date', maxValue: new Date().toISOString().split('T')[0] },
  
]
export const AuthUserViewOneColumn = [

    { key: 'authUserFirstName', label: 'First Name', type: 'input' },

    { key: 'authUserLastName', label: 'Last Name', type: 'input' },
    { key: 'authUserEmail', label: 'Email', type: 'email' },
    { key: 'authUserName', label: 'User Name', type: 'input' },
    { key: 'authUserPassword', label: 'Password', type: 'password' },
    { key: 'authUserDateJoined', label: 'Join Date', type: 'date', maxValue: new Date().toISOString().split('T')[0] },
  
]