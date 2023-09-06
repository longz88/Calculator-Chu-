const keys = document.querySelectorAll(".key");
const displayInput = document.querySelector(".display .input");
const displayOutput = document.querySelector(".display .output");
const specialChars = ["%", "+", "-", "*", "/", "=", ".", "±"];
const displayHistory = document.querySelector(".display-history");
const deleteDisplay = document.querySelector(".delete");

let input = "";

// key click
keys.forEach((key) => {
  key.addEventListener("click", (e) => {
    handleCalculator(e.target.dataset.key);
  });
});

// calculator
function handleCalculator(keyValue) {
  if (keyValue === "=" && input !== "") {
    const output = input.replace("%", "/100");
    displayInput.innerHTML = input;
    displayOutput.innerHTML = handleDecimal(eval(output));
    handleDisplayHistory(displayInput.innerHTML, displayOutput.innerHTML);
  } else if (keyValue === "AC") {
    input = "";
    displayInput.innerHTML = "";
    displayOutput.innerHTML = "";
  } else if (keyValue === "DE") {
    input = "";
    displayInput.innerHTML = input;
  } else if (keyValue === "±") {
    input = "-" + input;
    displayInput.innerHTML = input;
  } else {
    if (
      (input === "" && specialChars.includes(keyValue)) ||
      keyValue === "AC" ||
      keyValue === "DE"
    )
      return;
    input += keyValue;
  }
  displayInput.innerHTML = input;
}

// add math history
function handleDisplayHistory(input, output) {
  const content = `<div class="content">
  <div class="input">${input}</div>
  <div class="output">${output}</div>
</div>`;

  displayHistory.insertAdjacentHTML("afterbegin", content);
}

// delete math history
deleteDisplay.addEventListener("click", () => {
  displayHistory.innerHTML = "";
});

// handle decimal
function handleDecimal(output) {
  let outputString = output.toString();
  let decimalBefore = outputString.split(".")[0];
  decimalAfter = outputString.split(".")[1];

  let outputArray = decimalBefore.split("");

  if (outputArray.length > 3) {
    console.log(outputArray.length);
    for (let i = outputArray.length - 3; i > 0; i -= 3) {
      outputArray.splice(i, 0, ",");
    }
  }

  if (decimalAfter) {
    outputArray.push(".");
    outputArray.push(decimalAfter);
  }

  return outputArray.join("");
}
