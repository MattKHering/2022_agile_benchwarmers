/* jshint curly: true, esversion: 6, eqeqeq: true, latedef: true, laxbreak: true */
const unitsDropdown = document.getElementById("unitsSelect");
const waterDrankLabel = document.getElementById("waterDrankAmount");

const unitRates = {
    fluidOunces: {
        rate: 1,
        string: "fl oz"
    },
    milliliters: {
        rate: 29.5735,
        string: "mL"
    },
    liters: {
        rate: 0.0295735,
        string: "L"
    },
    cups: {
        rate: 0.125,
        string: "cups"
    }, 
    gallons: {
        rate: 0.0078125,
        string: "gal"
    }
};

// Set default values
const defaultWaterDrank = 0;
const defaultGoal = 125;
const defaultUnits = unitsDropdown[0].value;

// Initialize variables
var previousUnits = "";
var amountDrank = 0;

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
    return document.getElementById("setGoal").value;
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

    // Get the units string value
    var unitString = unitsToString(units);

    // See if the units changed after the amount of water drank
    // was updated
    if (units !== previousUnits) {
        // Convert amount drank and goal
        amount = convertUnits(amount, previousUnits, units);
        goal = convertUnits(goal, previousUnits, units);

        // Set textbox value to new goal conversion
        document.getElementById("setGoal").value = goal;
    }

    // change the label on the page
    waterDrankLabel.innerHTML = amount + " " + unitString + 
    " / " + goal + " " + unitString;

    // Check to see if the goal was met
    checkGoal(amount, goal);

    // Set the previous units to these current units
    previousUnits = units;
}

//  Congratulate the user if they drank the goal amount of water
function checkGoal(drank, goal) {
    // Check to see if the drank amout is more or equal to the user's goal amount.
    if (drank >= goal){
        alert("You drank your goal! Your total is going to reset");

        // restart the cycle
        window.location.href = "index.html";
        // resetGoal();
    }
}

// Reset the goal
function resetGoal() {
    var drank = defaultWaterDrank;
    var goal = getGoalAmount();
    var units = unitRates[getUnits()].string;

    updateWaterDrank(drank, goal, units);
}

function onload() {
    // Set the water drank label to defaults on page load
    previousUnits = defaultUnits;
    updateWaterDrank(defaultWaterDrank, defaultGoal, defaultUnits);
}


function alarm() {
    
    window.location.href = "wateralarm.html";

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


document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.querySelector('input[type="checkbox"]');
  
    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        // Do this when checked
        document.getElementById('myCSS').href = 'css/night.css';
        console.log('Checked');
      } else {
        // When not checked/unchecked
        document.getElementById('myCSS').href = 'css/style.css';
      }
    });
  });