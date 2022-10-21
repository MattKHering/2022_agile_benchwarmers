/* jshint curly: true, esversion: 6, eqeqeq: true, latedef: true, laxbreak: true */

//=======================================//
// Adjust speed of website timer here!   //
// Value is x times faster than realtime.//
//====================================== //
const HYPERSPEED_MULTIPLIER = 10;


const unitsDropdown = document.getElementById("unitsSelect");
const waterDrankLabel = document.getElementById("waterDrankAmount");
const setGoalButton = document.getElementById("setGoalButton");
const setGoalInput = document.getElementById("setGoal");

const unitRates = {
    fluidOunces: {
        rate: 1,
        string: "fl oz"
    },
    milliliters: {
        rate: 29.5735,
        string: "mL"
    }
};

// Set default values
const defaultWaterDrank = 0;
const defaultGoal = 125;
const defaultUnits = unitsDropdown[0].value;

// Initialize variables
var previousUnits = "";
var amountDrank = 0;
var goalAmount = 0;
var timeInterval = 0;
var timerIsRunning = false;

// Get the units from the select box
function getUnits() {
    return unitsDropdown.options[unitsDropdown.selectedIndex].value;
}

// Get the units string value
function unitsToString(units) {
    return unitRates[units].string;
}

// Updates the amount of water drank
function setWaterDrank(newAmount) {
    amountDrank = newAmount;
}

// Get the amount of water drank by the user
function getWaterDrank() {
    return amountDrank;
}

// Get the goal amount set by the user
function getGoalAmount() {
    return goalAmount;
}

// Set the goal amount
function setGoal(amount) {
    goalAmount = amount;
}

function getTimeInterval() {
    return timeInterval;
}

function setTimeInterval(minutes) {
    // Convert minutes to seconds
    timeInterval = minutes * 60 / HYPERSPEED_MULTIPLIER;
}

function getTimerRunning() {
    return timerIsRunning;
}

function setTimerRunning(bool) {
    timerIsRunning = bool;
}

// Convert the units for the amount drank and goal
function convertUnits(amount, convertFrom, convertTo) {
    
    // Store the previous units
    previousUnits = convertFrom;

    // Return converted rate
    return amount * unitRates[convertTo].rate / unitRates[convertFrom].rate;

}

function progress() {
 
    var prog = document.getElementById("progress-bar");
    var total = (amountDrank/goalAmount) * 100;
    prog.style.width = total + "%";
   
  
}

// Updates the "Water drank today:" label
function updateWaterDrank() {
    var amount = getWaterDrank();
    var goal = getGoalAmount();
    var units = getUnits();
        
    // Test if the input goal amount is excessive (> 800 fl oz)
    // Converts whatever units is entered into fl oz and compares
    //
    // Pretty neat!
    if (convertUnits(goal, units, unitsDropdown.options[0].value) > 800) {

        window.alert("That is an unrealistic amout of water to drink. Please enter a lower amount.");
    
    } else {

        // Get the units string value
        var unitString = unitsToString(units);

        // See if the units changed after the amount of water drank
        // was updated
        if (units !== previousUnits && amount > 0) {
            // Convert amount drank
            amount = convertUnits(amount, previousUnits, units);
        }

        // change the label on the page
        waterDrankLabel.innerHTML = amount + " " + unitString + 
        " / " + goal + " " + unitString;

        // Check to see if the goal was met
        checkGoal(amount, goal);

        // Clear the goal textbox
        // document.getElementById("setGoal").value = "";

        // Hide the control box instead of clearing the box
        document.getElementById("goalControl").style.display = "none";

        // Set the previous units to these current units
        previousUnits = units;

        //Show the input buttons depending on which unit is slected
        if ((unitsDropdown.options.selectedIndex) == 0) {
            document.getElementById("ounce-add").style.display = "inline-block";
        } else if (unitsDropdown.options.selectedIndex == 1) {
            document.getElementById("milliliter-add").style.display = "inline-block";
        }
    }
    progress();
}

// Updates the "Water drank today:" label with default values.
// Called on page load.
function updateWaterDrankDefaults() {

    // Set the values to defaults
    setWaterDrank(defaultWaterDrank);
    setGoal(defaultGoal);

    // Set the previous units to default value
    previousUnits = defaultUnits;

    // change the label on the page
    waterDrankLabel.innerHTML = defaultWaterDrank + " " + unitsToString(defaultUnits) + 
    " / " + defaultGoal + " " + unitsToString(defaultUnits);
}

//  Congratulate the user if they drank the goal amount of water
function checkGoal(drank, goal) {
    // Check to see if the drank amout is more or equal to the user's goal amount.
    if (drank >= goal){
        alert("You drank your goal! Your total is going to reset");

        // restart the cycle
        resetGoal();
    }
}

// Reset the goal
function resetGoal() {
    setWaterDrank(defaultWaterDrank);

    updateWaterDrank();
}

// onClick listener for the "Set Goal" Button
setGoalButton.addEventListener("click", function() {

    // See if the goal entered was valid (> 0)
    if (setGoalInput.value > 0) {

        // Set the goal to the value entered in the text box
        setGoal(setGoalInput.value);

        // Update the water drank label
        updateWaterDrank();

    } else {

        window.alert("Please enter a valid goal larger than zero.");

    }
});

function hideAlertBox() {
    document.getElementById("alert-box").style.display = "none";
}

function showAlertBox() {
    document.getElementById("alert-box").style.display = "inline-block";
}

const addButtons = document.querySelectorAll('.addButtons');
var buttonValue = 0;

// Function to prevent button spamming
function disableButtons() {
    addButtons.forEach((i) => {
        i.disabled = true;
    });
}

function enableButtons() {
    addButtons.forEach((i) => {
        i.disabled = false;
    });
}

// onClick listener for the oz Buttons
addButtons.forEach((i) => {
    i.addEventListener("click", (event) => {

        // Lock the buttons to prevent button spam and breaking timer
        disableButtons();

        buttonValue = parseInt(event.target.value);

        // Add the button amount to the total drank amount.
        setWaterDrank(getWaterDrank() + buttonValue);

        // Hide the alert box
        hideAlertBox();

        // Update the water drank label
        updateWaterDrank(amountDrank);

        // See if the timer is running
        if (getTimerRunning()) {
            setTimeout(() => {
                // unlock the buttons
                enableButtons();
                // Restart the timer
                restartTimer();
            }, 500);
        } else {
            setTimeout(() => {
                // unlock the buttons
                enableButtons();
                // Initialize, then start, the timer
                timerInit();
            }, 500);
        }
    });
});


function onload() {
    // Set the water drank label to defaults on page load
    updateWaterDrankDefaults();
}

var enableSound = document.getElementById('enableSound');

// Alarm function
function alarm() {
    showAlertBox();
    var audio = new Audio("audio/WaterDrop.mp3");
    if (!enableSound.checked) return audio.play();
}

// Settings switches logic
var nightMode = document.getElementById('nightMode');


document.addEventListener('DOMContentLoaded', function () {

    nightMode.addEventListener('change', function () {
        if (nightMode.checked) {
            // Do this when checked
            document.getElementById('myCSS').href = 'css/night.css';
        } else {
            // When not checked/unchecked
            document.getElementById('myCSS').href = 'css/style.css';
        }
    });
});

// Timer interval logic
const custom = document.getElementById('custom');
const customTimeDiv = document.getElementById('custom-time-div');
const timeInput = document.getElementById('timeInput');
const timeSelect = document.getElementById('timeSelect');
const startTimerButton = document.getElementById('startTimer');
const radioForm = document.getElementById("radio-form");
var radios = document.getElementsByName("timeRadio");
var timeInterval = 0;
var timeUnit = "";

// Radio buttons change listener
radioForm.addEventListener('change', function() {

    if (custom.checked) {
        
        // display div
        customTimeDiv.style.display = 'block';

    } else {

        // Hide the elements when it is unchecked
        customTimeDiv.style.display = 'none';
             
    }
});


// Start timer button listener
startTimerButton.addEventListener('click', function() {
    timerInit();
});

function timerInit() {

    if (custom.checked) {

        // Get input time value
        if (!timeInput.value > 0) return window.alert("Please enter a time interval greater than zero.");

        // Get selected time unit
        timeUnit = timeSelect.options[timeSelect.selectedIndex].value;

        // Set timeInverval to the input time (minutes)
        setTimeInterval(timeInput.value);

        // Convert hours to seconds
        if (timeUnit == "hours") setTimeInterval(getTimeInterval() *= 3600);

        // Start the countdown timer
        startTimer();
        
    } else {

        // Get value of checked radio button
        for (i = 0; i < radios.length; i++) {

            if (radios[i].checked) {

                // Convert into seconds
                setTimeInterval(radios[i].value);

                // Start the countdown timer
                startTimer();
            }
        }
    }    
};

// Formats timer label
function formatTimer(time) {
    // Time is input in seconds

    // Format hours
    var hours = Math.floor(time / 3600);

    // Format minutes 
    var minutes = Math.floor((time / 60) % 60);

    // If minutes is less than 10 display a leading zero
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    // Format seconds
    var seconds = time % 60;

    // If seconds is less than 10 display a leading zero
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return hours + ":" + minutes + ":" + seconds;
}

var timerInterval = null;
const timerLabel = document.getElementById("timerLabel");

// Calls when timer is done
function timerEnd() {
    // Make sure we know the timer isn't running
    timerIsRunning = false;
    setTimeInterval(0);
    // Stop the timer (in code)
    clearInterval(timerInterval);
    alarm();
    showAlertBox();
}

// Called when timer should be restarted
function restartTimer() {
    // Make sure we know the timer isn't running
    timerIsRunning = false;
    // Stop the timer (in code)
    clearInterval(timerInterval);
    startTimer();
}

// Begin timer function
function startTimer() {

    // Clear time passed value
    var timePassed = 0;
    var timeLeft = 0;
    
    // Make sure alert box is hidden
    hideAlertBox();

    if (getTimerRunning()) {
        // Stop the timer if it is already running
        setTimerRunning(false);
        clearInterval(timerInterval);
    }

    var seconds = getTimeInterval();

    timerInterval = setInterval(() => {

        setTimerRunning(true);

        // Seconds passed increases by 1
        timePassed += 1;

        timeLeft = seconds - timePassed;

        // Update label
        timerLabel.innerHTML = formatTimer(timeLeft);

        // Time is finished
        if (timeLeft == 0) {
            timerEnd();
        }

    }, 1000);
}
