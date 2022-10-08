/* jshint curly: true, esversion: 6, eqeqeq: true, latedef: true, laxbreak: true */

// Set default values
const defaultWaterDrank = 0;
const defaultUnits = "fl oz";
const defaultGoal = 125;

const units = {
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

// Get the units set by the user
function getUnits() {

    // TODO if statement to see if units were changed
    return defaultUnits;
}


// Get the amount of water drank by the user
function getWaterDrank() {

    // TODO get amount of water drank

    // TODO Check if units were changed

    return defaultWaterDrank;
}


// Get the goal amount set by the user
function getGoalAmount() {
  
    var goal = document.getElementById("setGoal").value;
     
    // TODO Check if units were changed

    return goal;
}

// Updates the "Water drank today:" label
function updateWaterDrank(drank, goal, units) {
    drank = getWaterDrank();
    goal = getGoalAmount();
    units = getUnits();

    const waterDrankLabel = document.getElementById("waterDrankAmount");
    waterDrankLabel.innerHTML = drank + units + " / " + goal + units;

    checkGoal(drank, goal);
}

// Reset the goal
function resetGoal() {
    var drank = defaultWaterDrank;
    var goal = getGoalAmount();
    var units = getUnits();

    updateWaterDrank(drank, goal, units);
}

//congradulate the user if they drank the goal amount of water
function checkGoal(drank, goal) {
    if (drank >= goal){
        alert("You drank your goal! Your total is going to reset");
        resetGoal();
      
        //window.location.href = "index.html";
    }
}

function onload() {
    // Set the water drank label to defaults on page load
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