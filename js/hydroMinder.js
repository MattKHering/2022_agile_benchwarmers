/* jshint curly: true, esversion: 6, eqeqeq: true, latedef: true, laxbreak: true */
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

// Convert the units for the amount drank and goal
function convertUnits(amount, convertFrom, convertTo) {
    
    // Store the previous units
    previousUnits = convertFrom;

    // Return converted rate
    return amount * unitRates[convertTo].rate / unitRates[convertFrom].rate;

}

// Updates the "Water drank today:" label
function updateWaterDrank() {
    var amount = getWaterDrank();
    var goal = getGoalAmount();
    var units = getUnits();
        
    // Test if the input goal amount is excessive (> 800 fl oz)
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
    }
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

// onClick listener for the "Add 1 Ounce" Button
addOneFluidOunce.addEventListener("click", function() {

    // Add the button amount to the total drank amount.
    amountDrank = amountDrank + 1

    // Update the water drank label
    updateWaterDrank(amountDrank);
});

// onClick listener for the "Add 8 Ounces" Button
addEightFluidOunce.addEventListener("click", function() {

    // Add the button amount to the total drank amount.
    amountDrank = amountDrank + 8

    // Update the water drank label
    updateWaterDrank(amountDrank);
});

// onClick listener for the "Add 12 Ounces" Button
addTwelveFluidOunce.addEventListener("click", function() {

    // Add the button amount to the total drank amount.
    amountDrank = amountDrank + 12

    // Update the water drank label
    updateWaterDrank(amountDrank);
});


function onload() {
    // Set the water drank label to defaults on page load
    updateWaterDrankDefaults();
}

// Alarm function for test button
function alarm() {
    var audio = new Audio("audio/WaterDrop.mp3");
    audio.play();
}

// Enable and disable button 
const button = document.getElementById('soundButton')
if (button.innerText === 'Enable/DisableSound') {
    button.disabled = true
} 


function waterConfirm(didDrinkWater) {
    if (!didDrinkWater) {
        alert("Please drink some water!");
    } else {
        alert("Good Job, stay hydrated!!!");
        
        //logic to add to drinking totals entered here.
        
        window.location.href = "index.html";
    }
}

// Settings switches logic
document.addEventListener('DOMContentLoaded', function () {

    var nightMode = document.getElementById('nightMode');
    nightMode.addEventListener('change', function () {
        if (nightMode.checked) {
            // Do this when checked
            document.getElementById('myCSS').href = 'css/night.css';
            console.log('Checked');
        } else {
            // When not checked/unchecked
            document.getElementById('myCSS').href = 'css/style.css';
        }
    });


    var enableSound = document.getElementById('enableSound');
    enableSound.addEventListener('change', function () {
        if (enableSound.checked) {
            console.log('Checkbox 2 checked');
        } else {

        }
    });
});

// Timer interval logic
const customTimeDiv = document.getElementById('customTimeDiv');
const custom = document.getElementById('custom');

radioForm.addEventListener('change', function() {
    // Test if the "Custom" time option is selected
    if (custom.checked) {
        // display the textbox, dropdown, and button

        customTimeDiv.style.display = 'block';

    } else {

        // Hide the elements when it is unchecked
        customTimeDiv.style.display = 'none';
    }
});