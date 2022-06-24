//Script for date of birth select drop downs

//Create references to the dropdown's
const yearSelect = document.getElementById("year");
const monthSelect = document.getElementById("month");
const daySelect = document.getElementById("day");

//Months array
const months = [ 'Month', 'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December' ];

//Month options including the default value of 'Month'
(function populateMonths() {
    for (let i = 0; i < months.length; i++) {
        const option = document.createElement('option');
        option.textContent = months[ i ];
        monthSelect.appendChild(option);
    }
    monthSelect.value = "Month";
})();

let previousDay;

function populateDays(month) {
    //Delete all of the children of the day dropdown
    while (daySelect.firstChild) {
        daySelect.removeChild(daySelect.firstChild);
    }
 
    //Holds the number of days in the month
    let dayNum;
    //Get the current year
    let year = yearSelect.value;

    if (month === 'January' || month === 'March' ||
        month === 'May' || month === 'July' || month === 'August'
        || month === 'October' || month === 'December') {
        dayNum = 31;
    } if (month === 'April' || month === 'June'
        || month === 'September' || month === 'November') {
        dayNum = 30;
    } if (month === 'Month') {
        dayNum = 0;
    } if (month === 'February') {
        //Check for a leap year
        if (new Date(year, 1, 29).getMonth() === 1) {
            dayNum = 29;
        } else {
            dayNum = 28;
        }
    }

    //Edge case for 'Month' default selected
    if (dayNum === 0) {

        const blankOption = document.createElement("option");
        blankOption.textContent = "Day";
        daySelect.appendChild(blankOption);
    
    //Insert the correct days into the day <select>
    } else {
        for (let i = 1; i <= dayNum; i++) {
            const option = document.createElement("option");
            option.textContent = i;
            daySelect.appendChild(option);
        }
        if (previousDay) {
            daySelect.value = previousDay;
            if (daySelect.value === "") {
                daySelect.value = previousDay - 1;
            }
            if (daySelect.value === "") {
                daySelect.value = previousDay - 2;
            }
            if (daySelect.value === "") {
                daySelect.value = previousDay - 3;
            }
        }
    }
}

function populateYears() {
    //Get the current year as a number
    let year = new Date().getFullYear();
    //Make the previous 100 years be an option
    for (let i = 0; i < 101; i++) {
        const option = document.createElement("option");
        option.textContent = year - i;
        yearSelect.appendChild(option);
    }
}

//Populate the dropdown options
populateDays(monthSelect.value);
populateYears();

yearSelect.onchange = function () {
    populateDays(monthSelect.value);
}
monthSelect.onchange = function () {
    populateDays(monthSelect.value);
}
daySelect.onchange = function () {
    previousDay = daySelect.value;
}