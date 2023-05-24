export const DepartmentColumn = [

    { key: 'name', label: 'Department Name', type: 'input' },
    { key: 'description', label: 'Description', type: 'input' },
    { key: 'institutionId', label: 'Institution', type: 'dropdown1' },

]

export const DepartmentAllColumn = [
    { key: 'institutionId', label: 'Institution', type: 'dropdown1' },
    { key: 'name', label: 'Department Name', type: 'input' },
    { key: 'description', label: 'Description', type: 'input' },

    // { key: 'createdBy', label: 'Created By', type: 'input' },
    // { key: 'modifiedBy', label: 'Modified By', type: 'input' },
    // { key: 'id', label: 'Department Id', type: 'input' },
    { key: 'active', label: 'Is Active', type: 'checkbox' }
]

export const DepartmentUpdateColumn = [
    { key: 'institutionId', label: 'Institution', type: 'dropdown1', disable: 'true' },
    { key: 'name', label: 'Department Name', type: 'input', disable: 'true' },
    { key: 'description', label: 'Description', type: 'input' },


]


