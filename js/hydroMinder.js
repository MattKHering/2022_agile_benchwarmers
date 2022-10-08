/* jshint curly: true, esversion: 6, eqeqeq: true, latedef: true, laxbreak: true */
const waterDrankLabel = document.getElementById("waterDrankAmount");

// Set default units
const defaultUnits = "oz";

// Set default goal
const defaultGoal = 150;

// Placeholder function for getting the selected units
function getUnits() {

    // TODO if statement to see if units were changed
    var units = defaultUnits;
    
    return units;
}

function getGoal() {

    // TODO if statement to see if units were changed
    var goal = defaultGoal;
    
    return goal;
}


// Placeholder function to get amount of water drank
function getWaterDrank() {

    // TODO get amount of water drank
    var amount = 100;

    // Check if units were changed
    if (getUnits() !== "oz") {
        
        // TODO unit conversion function

    }

    return amount;
}


// Placeholder function to get amount of water user wants to drink
function getGoalAmount() {
  
 
     goal = document.getElementById("setGoal").value
     
    // Check if units were changed
    if (getUnits() !== "oz") {
        
        // TODO unit conversion function

    }

    return goal;
}

// Set goal with defaults
function setGoalDefault() {
    var drank = 0;
    goal = getGoal();
    var units = getUnits();

    var output = drank + units + " / " + goal + units;

    waterDrankLabel.innerHTML = output;
}


// Updates the "Water drank today:" label
function updateWaterDrank() {
    var drank = getWaterDrank();
    goal = getGoalAmount();
    var units = getUnits();
    getGoal()

    var output = drank + units + " / " + goal + units;

    waterDrankLabel.innerHTML = output;
  
    checkGoal(drank,goal);
}

//congradulate the user if they drank the goal amount of water
function checkGoal(drank,goal) {
  if (drank >= goal){
        alert("You drank your goal! Your total is going to reset");
    setGoalDefault();
    
//    window.location.href = "index.html";

      }
}

onload = function() {
    setGoalDefault()
};

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