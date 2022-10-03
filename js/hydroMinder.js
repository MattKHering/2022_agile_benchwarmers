const waterDrankLabel = document.getElementById("waterDrankAmount");

// Set default units
const defaultUnits = "oz";

// Set default goal
const defaultGoal = 150;

onload = function() {
    updateWaterDrank();
}

// Updates the "Water drank today:" label
function updateWaterDrank() {
    var drank = getWaterDrank();
    var goal = getGoalAmount();
    var units = getUnits();

    var output = drank + units + " / " + goal + units;

    waterDrankLabel.innerHTML = output;
}

// Placeholder function to get amount of water drank
function getWaterDrank() {

    // TODO get amount of water drank
    var amount = 100;

    // Check if units were changed
    if (getUnits() != "oz") {
        
        // TODO unit conversion function

    }

    return amount;
}

// Placeholder function to get amount of water user wants to drink
function getGoalAmount() {

    // TODO get amount of water user sets as goal
    var amount = defaultGoal;

    // Check if units were changed
    if (getUnits() != "oz") {
        
        // TODO unit conversion function

    }

    return amount;
}

// Placeholder function for getting the selected units
function getUnits() {

    // TODO if statement to see if units were changed
    var units = defaultUnits;
    
    return units;
}