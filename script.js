// Food targets in grams, from http://www.ketopetsanctuary.com
var beefTargetGrams = 412.5;
var broccoliTargetGrams = 99.5;

// Constants
var poundsToGrams = 453.592;
var precision = 2; // how many decimals to display on values

// Helper functions
function toGrams(value) {
  return value * poundsToGrams;
}

function toPounds(value) {
  return value / poundsToGrams;
}

function computeDaysOfFood(amountGrams, targetGrams) {
  return amountGrams / targetGrams;
}

function setText(inputElement, number) {
  inputElement.value = number.toFixed(precision);
}

function calculate(inputElementId) {
  // Get all input elements.
  var beefPoundsInput = document.getElementById("beefPounds");
  var beefGramsInput = document.getElementById("beefGrams");
  var broccoliPoundsInput = document.getElementById("broccoliPounds");
  var broccoliGramsInput = document.getElementById("broccoliGrams");
  var daysInput = document.getElementById("days");

  var beefPounds = parseFloat(beefPoundsInput.value);
  var beefGrams = parseFloat(beefGramsInput.value);
  var broccoliPounds = parseFloat(broccoliPoundsInput.value);
  var broccoliGrams = parseFloat(broccoliGramsInput.value);
  var days = parseFloat(daysInput.value);

  // Validate inputs.
  if (isNaN(beefPounds)) beefPoundsInput.value = null;
  if (isNaN(beefGrams)) beefGramsInput.value = null;
  if (isNaN(broccoliPounds)) broccoliPoundsInput.value = null;
  if (isNaN(broccoliGrams)) broccoliGramsInput.value = null;
  if (isNaN(days)) daysInput.value = null;

  // Populate values based on input element id
  switch (inputElementId) {
    case "beefPounds":
      beefGrams = toGrams(beefPounds);
      days = computeDaysOfFood(beefGrams, beefTargetGrams);
      broccoliGrams = days * broccoliTargetGrams;
      broccoliPounds = toPounds(broccoliGrams);
      // Update inputs
      setText(beefGramsInput, beefGrams);
      setText(broccoliGramsInput, broccoliGrams);
      setText(broccoliPoundsInput, broccoliPounds);
      setText(daysInput, days);
      break;
    case "beefGrams":
      days = computeDaysOfFood(beefGrams, beefTargetGrams);
      beefPounds = toPounds(beefGrams);
      broccoliGrams = days * broccoliTargetGrams;
      broccoliPounds = toPounds(broccoliGrams);
      // Update inputs
      setText(beefPoundsInput, beefPounds);
      setText(broccoliGramsInput, broccoliGrams);
      setText(broccoliPoundsInput, broccoliPounds);
      setText(daysInput, days);
      break;
    case "broccoliPounds":
      broccoliGrams = toGrams(broccoliPounds);
      days = computeDaysOfFood(broccoliGrams, broccoliTargetGrams);
      beefGrams = days * beefTargetGrams;
      beefPounds = toPounds(beefGrams);
      // Update inputs
      setText(beefGramsInput, beefGrams);
      setText(beefPoundsInput, beefPounds);
      setText(broccoliGramsInput, broccoliGrams);
      setText(daysInput, days);
      break;
    case "broccoliGrams":
      days = computeDaysOfFood(broccoliGrams, broccoliTargetGrams);
      broccoliPounds = toPounds(broccoliGrams);
      beefGrams = days * beefTargetGrams;
      beefPounds = toPounds(beefGrams);
      // Update inputs
      setText(beefGramsInput, beefGrams);
      setText(beefPoundsInput, beefPounds);
      setText(broccoliPoundsInput, broccoliPounds);
      setText(daysInput, days);
      break;
    case "days":
      beefGrams = days * beefTargetGrams;
      beefPounds = toPounds(beefGrams);
      broccoliGrams = days * broccoliTargetGrams;
      broccoliPounds = toPounds(broccoliGrams);
      // Update inputs
      setText(beefGramsInput, beefGrams);
      setText(beefPoundsInput, beefPounds);
      setText(broccoliGramsInput, broccoliGrams);
      setText(broccoliPoundsInput, broccoliPounds);
      break;
    default:
      console.log("Unrecognized input element id.");
      break;
  }
}
