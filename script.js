// Food targets in grams, from http://www.ketopetsanctuary.com
var targets = {
  beef: {
    proteinTargetGrams: 412.5,
    vegetableTargetGrams: 99.5,
    oilTargetGrams: 0,
  },
  chicken: {
    proteinTargetGrams: 304.9,
    vegetableTargetGrams: 99.5,
    oilTargetGrams: 62.5,
  },
  turkey: {
    proteinTargetGrams: 325.7,
    vegetableTargetGrams: 87.8,
    oilTargetGrams: 40.1,
  },
};

// Constants
var poundsToGrams = 453.592;
var precision = 2; // how many decimals to display on values

// Helper functions
function getElements() {
  return {
    // Sections
    oilSection: document.getElementById("oilSection"),

    // Selects
    proteinSelect: document.getElementById("proteinSelect"),

    // Inputs
    proteinPoundsInput: document.getElementById("proteinPounds"),
    proteinGramsInput: document.getElementById("proteinGrams"),
    vegetablePoundsInput: document.getElementById("vegetablePounds"),
    vegetableGramsInput: document.getElementById("vegetableGrams"),
    oilGramsInput: document.getElementById("oilGrams"),
    daysInput: document.getElementById("days"),
  };
}

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

function getTargetsBySelectedProtein() {
  return targets[getElements().proteinSelect.value];
}

function updateInterface() {
  var targets = getTargetsBySelectedProtein();
  var elements = getElements();
  if (targets.oilTargetGrams <= 0) {
    elements.oilSection.classList.remove("show");
    elements.oilSection.classList.add("hide");
  } else {
    elements.oilSection.classList.remove("hide");
    elements.oilSection.classList.add("show");
  }

  // If protein input has a value, recompute all fields from it.
  if (!isNaN(parseFloat(elements.proteinPoundsInput.value))) {
    calculate(elements.proteinPoundsInput.id);
  }
}

function calculate(inputElementId) {
  // Get targets
  var { proteinTargetGrams, vegetableTargetGrams, oilTargetGrams } =
    getTargetsBySelectedProtein();

  // Get all input elements.
  var {
    proteinPoundsInput,
    proteinGramsInput,
    proteinGramsInput,
    vegetablePoundsInput,
    vegetableGramsInput,
    oilGramsInput,
    daysInput,
  } = getElements();

  var proteinPounds = parseFloat(proteinPoundsInput.value);
  var proteinGrams = parseFloat(proteinGramsInput.value);
  var vegetablePounds = parseFloat(vegetablePoundsInput.value);
  var vegetableGrams = parseFloat(vegetableGramsInput.value);
  var oilGrams = parseFloat(oilGramsInput.value);
  var days = parseFloat(daysInput.value);

  // Validate inputs.
  if (isNaN(proteinPounds)) proteinPoundsInput.value = null;
  if (isNaN(proteinGrams)) proteinGramsInput.value = null;
  if (isNaN(vegetablePounds)) vegetablePoundsInput.value = null;
  if (isNaN(vegetableGrams)) vegetableGramsInput.value = null;
  if (isNaN(oilGrams)) oilGramsInput.value = null;
  if (isNaN(days)) daysInput.value = null;

  // Populate values based on input element id
  switch (inputElementId) {
    case "proteinPounds":
      proteinGrams = toGrams(proteinPounds);
      days = computeDaysOfFood(proteinGrams, proteinTargetGrams);
      vegetableGrams = days * vegetableTargetGrams;
      vegetablePounds = toPounds(vegetableGrams);
      oilGrams = days * oilTargetGrams;
      // Update inputs
      setText(proteinGramsInput, proteinGrams);
      setText(vegetableGramsInput, vegetableGrams);
      setText(vegetablePoundsInput, vegetablePounds);
      setText(oilGramsInput, oilGrams);
      setText(daysInput, days);
      break;
    case "proteinGrams":
      days = computeDaysOfFood(proteinGrams, proteinTargetGrams);
      proteinPounds = toPounds(proteinGrams);
      vegetableGrams = days * vegetableTargetGrams;
      vegetablePounds = toPounds(vegetableGrams);
      oilGrams = days * oilTargetGrams;
      // Update inputs
      setText(proteinPoundsInput, proteinPounds);
      setText(vegetableGramsInput, vegetableGrams);
      setText(vegetablePoundsInput, vegetablePounds);
      setText(oilGramsInput, oilGrams);
      setText(daysInput, days);
      break;
    case "vegetablePounds":
      vegetableGrams = toGrams(vegetablePounds);
      days = computeDaysOfFood(vegetableGrams, vegetableTargetGrams);
      proteinGrams = days * proteinTargetGrams;
      proteinPounds = toPounds(proteinGrams);
      oilGrams = days * oilTargetGrams;
      // Update inputs
      setText(proteinGramsInput, proteinGrams);
      setText(proteinPoundsInput, proteinPounds);
      setText(vegetableGramsInput, vegetableGrams);
      setText(oilGramsInput, oilGrams);
      setText(daysInput, days);
      break;
    case "vegetableGrams":
      days = computeDaysOfFood(vegetableGrams, vegetableTargetGrams);
      vegetablePounds = toPounds(vegetableGrams);
      proteinGrams = days * proteinTargetGrams;
      proteinPounds = toPounds(proteinGrams);
      oilGrams = days * oilTargetGrams;
      // Update inputs
      setText(proteinGramsInput, proteinGrams);
      setText(proteinPoundsInput, proteinPounds);
      setText(vegetablePoundsInput, vegetablePounds);
      setText(oilGramsInput, oilGrams);
      setText(daysInput, days);
      break;
    case "oilGrams":
      days = computeDaysOfFood(oilGrams, oilTargetGrams);
      vegetableGrams = days * vegetableTargetGrams;
      vegetablePounds = toPounds(vegetableGrams);
      proteinGrams = days * proteinTargetGrams;
      proteinPounds = toPounds(proteinGrams);
      // Update inputs
      setText(proteinGramsInput, proteinGrams);
      setText(proteinPoundsInput, proteinPounds);
      setText(vegetableGramsInput, vegetableGrams);
      setText(vegetablePoundsInput, vegetablePounds);
      setText(daysInput, days);
      break;
    case "days":
      proteinGrams = days * proteinTargetGrams;
      proteinPounds = toPounds(proteinGrams);
      vegetableGrams = days * vegetableTargetGrams;
      vegetablePounds = toPounds(vegetableGrams);
      oilGrams = days * oilTargetGrams;
      // Update inputs
      setText(proteinGramsInput, proteinGrams);
      setText(proteinPoundsInput, proteinPounds);
      setText(vegetableGramsInput, vegetableGrams);
      setText(vegetablePoundsInput, vegetablePounds);
      setText(oilGramsInput, oilGrams);
      break;
    default:
      console.log("Unrecognized input element id.");
      break;
  }
}
