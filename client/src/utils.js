export const formFields = [{
    name: 'firstName',
    placeholder: 'First Name'
}, {
    name: 'lastName',
    placeholder: 'Last Name'
}, {
    name: 'email',
    placeholder: 'e-mail (required)'
}, {
    name: 'website',
    placeholder: 'Website'
}, {
    name: 'linkedin',
    placeholder: 'LinkedIn Profile'
}]

export const experienceLevels = [{
    label: "No Experience",
    value: "none"
}, {
    label: "0 to 1 years",
    value: "0to1"
}, {
    label: "1 to 2 years",
    value: "1to2"
}, {
    label: "Over 2 years",
    value: "2+"
}];


export const websitePattern = /^(?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

export const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const linkeinPattern = /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/