"use strict";
const allNumbers = document.querySelectorAll(".numbers");
const allSymbols = document.querySelectorAll(".symbols");
const calcInput = document.querySelector(".screen-cont p");
const evaluation = document.querySelector(".evaluation");
let calculatorState = "";
let restartState = false;
const listOfSymbols = ["*", "/", "+", "-", "="];
let symbolPressed = false;
for (let i = 0; i < allNumbers.length; i++) {
  allNumbers[i].addEventListener("click", mapbuttontovalue);
}
for (let i = 0; i < allSymbols.length; i++) {
  allSymbols[i].addEventListener("click", symbolhandler);
}

//functions
function logStateToConsole() {
  evaluation.innerText = calculatorState;
  console.log(calculatorState);
}

function mapbuttontovalue(event) {
  const value = event.target.getAttribute("data-val");

  if (value === "clear-all") {
    evaluation.textContent = "";
    calcInput.textContent = "0";
    calculatorState = "";
    return;
  }
  if (value === "clear-one") {
    if (restartState) {
      return;
    }
    if (calcInput.textContent === "0") {
      return;
    }

    if (calcInput.textContent === "") {
      calcInput.textContent = "0";
    }

    if (
      listOfSymbols.indexOf(
        calculatorState.substring(calculatorState.length - 1)
      ) !== -1
    ) {
      return;
    }

    calcInput.textContent =
      calcInput.textContent.substring(0, calcInput.textContent.length - 1) ===
      ""
        ? "0"
        : calcInput.textContent.substring(0, calcInput.textContent.length - 1);
    calculatorState = calculatorState.substring(0, calculatorState.length - 1);
    logStateToConsole();
    return;
  }

  if (restartState) {
    evaluation.innerText = "";
    calculatorState = "";
    restartState = false;
  }

  calculatorState += value;
  if (symbolPressed) {
    calcInput.innerText = value;
    symbolPressed = false;
  } else {
    if (calcInput.innerText === "0") {
      calcInput.innerText = "";
    }
    calcInput.innerText += value;
  }
  logStateToConsole();
}

function symbolhandler(event) {
  symbolPressed = true;
  let value = event.target.getAttribute("data-val");
  if (value === "=") {
    evaluation.innerText = calculatorState + value + eval(calculatorState);
    calcInput.innerText = eval(calculatorState);
    restartState = true;
    return;
  }

  restartState = false;
  let lastvalueIndex = calculatorState.length - 1;
  if (
    listOfSymbols.indexOf(calculatorState[calculatorState.length - 1]) === -1
  ) {
    calcInput.innerText = eval(calculatorState);
    calculatorState += value;
  } else {
    calculatorState = calculatorState.substring(0, lastvalueIndex) + value;
  }

  logStateToConsole();
}
