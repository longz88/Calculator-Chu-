// // const keyList = document.querySelector(".keys");
// const keys = document.querySelectorAll(".key");
// const displayInput = document.querySelector(".display .input");
// const displayOutput = document.querySelector(".display .output");
// const equalIcon = document.querySelector(".equal-icon");
// const content = document.querySelector(".content");
// const specialChars = ["+", "-", "/", "*", "%", "="];

// let input = "";
// equalIcon.style.display = "none";

// for (let key of keys) {
//   const value = key.dataset.key;
//   key.addEventListener("click", (e) => handleCalculator(value));
// }

// function handleCalculator(value) {
//   equalIcon.style.display = "block";

//   if (value == "AC") {
//     input = "";
//     displayInput.innerHTML = "";
//     displayOutput.innerHTML = "";
//     equalIcon.style.display = "none";
//   } else if (value == "DE") {
//     input = "";
//     displayInput.innerHTML = input;
//   } else if (value == "=" && value != "") {
//     let result = eval(input.replace("%", "/100"));
//     displayOutput.innerHTML = handleDecimal(result);
//     input = "";
//   } else {
//     if (handleSpecialChars(value)) {
//       input += value;
//       displayInput.innerHTML = input;
//     }
//   }
// }

// // handle comma
// function handleDecimal(output) {
//   let outputString = output.toString();
//   let decimal = outputString.split(".")[1];
//   outputString = outputString.split(".")[0];

//   let outputArray = outputString.split("");

//   if (outputArray.length > 3) {
//     for (let i = outputArray.length - 3; i > 0; i -= 3) {
//       outputArray.splice(i, 0, ",");
//     }
//   }

//   if (decimal) {
//     outputArray.push(".");
//     outputArray.push(decimal);
//   }

//   return outputArray.join("");
// }

// function handleSpecialChars(value) {
//   let lastInput = input.slice(-1);

//   if (value == "." && lastInput == ".") {
//     return false;
//   }

//   if (specialChars.includes(value)) {
//     if (specialChars.includes(lastInput)) {
//       return false;
//     } else {
//       return true;
//     }
//   }

//   return true;
// }

const display = document.querySelector(".output");
const keys = document.querySelectorAll(".key");
const specialChars = ["%", "+", "-", "*", "/", "="];
let output = "";

function calculator(keyValue) {
  if (keyValue === "=" && output !== "") {
    output = eval(output.replace("%", "/100"));
  } else if (keyValue === "AC") {
    output = "";
    display.innerHTML = output;
  } else if (keyValue === "DE") {
    output = output.slice(0, -1);
    display.innerHTML = output;
  } else {
    if (output === "" && specialChars.includes(keyValue)) return false;
    output += keyValue;
  }
  display.innerHTML = output;
}

keys.forEach((key) => {
  key.addEventListener("click", (e) => {
    calculator(e.target.dataset.key);
  });
});
