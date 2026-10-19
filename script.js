document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const keys = document.getElementById("keys");

  function appendtodisplay(value) {
    if (display.value === "Error") {
      display.value = "";
    }
    if (value === "x" || value === "X" || value === "*") {
      display.value += "x";
    } else if (value === "/") {
      display.value += "÷";
    } else {
      display.value += value;
    }
  }

  function cleardisplay() {
    display.value = "";
  }

  function calculate() {
    try {
      if (display.value.trim() === "") {
        return;
      }

      let expression = display.value
        .replace(/x/g, "*")
        .replace(/÷/g, "/")
        .replace(/%/g, "/100");

      expression = expression.replace(/[+\-*/]+$/, "");

      const result = eval(expression);

      if (!Number.isFinite(result)) {
        display.value = "Error";
        return;
      }

      display.value = result;
    } catch (e) {
      display.value = "Error";
    }
  }

  keys.addEventListener("click", (event) => {
    if (!event.target.matches("button")) {
      return;
    }

    const buttonValue = event.target.textContent.trim();

    if (buttonValue === "AC") {
      cleardisplay();
    } else if (buttonValue === "M") {
      return;
    } else if (buttonValue === "=") {
      calculate();
    } else {
      appendtodisplay(buttonValue);
    }
  });

  document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (/^[0-9.]$/.test(key)) {
      appendtodisplay(key);
    } else if (["+", "-", "*", "/", "%"].includes(key)) {
      appendtodisplay(key);
    } else if (key === "x" || key === "X") {
      appendtodisplay("x");
    } else if (key === "Enter" || key === "=") {
      event.preventDefault();
      calculate();
    } else if (key === "Delete") {
      event.preventDefault();

      if (display.value === "Error") {
        cleardisplay();
      } else {
        display.value = display.value.slice(0, -1);
      }
    } else if (key === "Backspace") {
      cleardisplay();
    } else if (key === "Escape") {
      cleardisplay();
    }
  });
});
