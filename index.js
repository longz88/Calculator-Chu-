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

// xử lí tính toán
function handleCalculator(keyValue) {
  if (keyValue === "=" && input !== "") {
    input = input.replace("%", "/100");
    displayOutput.innerHTML = handleDecimal(eval(input));
    handleDisplayHistory(displayInput.innerHTML, displayOutput.innerHTML);
  } else if (keyValue === "AC") {
    input = "";
    displayInput.innerHTML = "";
    displayOutput.innerHTML = "";
  } else if (keyValue === "DE") {
    input = input.toString().slice(0, -1);
    displayInput.innerHTML = input;
  } else if (keyValue === "±") {
    input = -input;
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

// thêm math lịch sử
function handleDisplayHistory(input, output) {
  const content = `<div class="content">
  <div class="input">${input}</div>
  <div class="output">${output}</div>
</div>`;

  displayHistory.insertAdjacentHTML("afterbegin", content);
}

// xóa math lịch sử
deleteDisplay.addEventListener("click", () => {
  displayHistory.innerHTML = "";
});

// xử lí số thập phân
function handleDecimal(output) {
  let outputString = output.toString();
  let decimal = outputString.split(".")[1];
  outputString = outputString.split(".")[0];

  let outputArray = outputString.split("");

  if (outputArray.length > 3) {
    for (let i = outputArray.length - 3; i > 0; i -= 3) {
      outputArray.splice(i, 0, ",");
    }
  }

  if (decimal) {
    outputArray.push(".");
    outputArray.push(decimal);
  }

  return outputArray.join("");
}
