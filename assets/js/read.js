//Developer Notes : I chose to just GET the form information from the url
//because I stumbled on the following regex function to quickly parse the data
//into usable strings. Also, because the form data is only being used to display the information
//and there are no concerns with the security of the data.
//The data is used to populate the placeholders of the read only form
//to keep the styles as close as possible to the original form, instead of 
//trying to recreate and match up manually. 

//Get the parameters from the URL
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[ 2 ]) return '';
    return decodeURIComponent(results[ 2 ].replace(/\+/g, ' '));
}

//define variables with the form data
const dogName = getParameterByName('name');
const dogMonth = getParameterByName('month');
const dogDay = getParameterByName('day');
const dogYear = getParameterByName('year');
const dogNotes = getParameterByName('notes');
const dogGender = getParameterByName('gender');

//Add placeholder name from form
const nameOutput = document.getElementById("name");
nameOutput.placeholder = dogName;

//Change dog birth month into number value
function getMonthFromString(mon) {
    let d = Date.parse(mon + "1, 2012");
    if (!isNaN(d)) {
        return new Date(d).getMonth() + 1;
    }
    return -1;
}

//Add placeholder dob from form
const dobOutput = document.getElementById("dob");
dobOutput.placeholder = getMonthFromString(dogMonth) + "/" + dogDay + "/" + dogYear;

//Add placeholder gender from form
const genderOutput = document.getElementById("gender");
genderOutput.placeholder = dogGender;

//Add placeholder notes from form
const notesOutput = document.getElementById("textarea");
notesOutput.placeholder = dogNotes;