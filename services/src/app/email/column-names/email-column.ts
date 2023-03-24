export const EmailColumn = [
    { key: 'title', label: 'Title', type: 'input', subtype: 'text' },
    { key: 'subject', label: 'Subject', type: 'input', subtype: 'text' },
    { key: 'content', label: 'Content', type: 'input', subtype: 'text' },
]

export const EmailAllColumn = [
    { key: 'title', label: 'Title', type: 'input', subtype: 'text' },
    { key: 'subject', label: 'Subject', type: 'input', subtype: 'text' },
    { key: 'content', label: 'Content', type: 'input', subtype: 'text' },
    { key: 'attachFile', label: 'File', type: 'file' },
    { key: 'emailFormId', label: 'From', type: 'dropdown', arrayName: 'profiles', columnId: 'adminId', columnName: 'adminEmail' },
    { key: 'status', label: 'Status', type: 'checkbox' },
    { key: 'readStatus', label: 'Read Status', type: 'checkbox' },
]
