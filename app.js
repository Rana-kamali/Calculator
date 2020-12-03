console.log("Calculator app is running");

let operand1 = false;
let operand2 = false;
let operatorCurrent = false;
let total = "";

const onNumberClick = (num) => {
  if (!operand1) {
    operand1 = num;
  } else {
    console.log("operand 1 does exist, setting operand 2 now");
    operand2 = num;
  }
  displayResult(num);
};

const onOperatorClick = (operator) => {
  let total = false;
  console.log(`Operator: ${operator}`);
  if (operatorCurrent === operator && operand1 && operand2) {
    console.log(`Operator: ${operator}`);
    console.log(`operand1: ${operand1}`);
    console.log(`operand2: ${operand2}`);
    total = calculateTotal(operator, operand1, operand2);
  } else if (operatorCurrent !== operator && operand1 && operand2) {
    console.log(`inside else if :  Operator: ${operator}`);
    console.log(` inside else if : operand1: ${operand1}`);
    console.log(` inside else if : operand2: ${operand2}`);
    // Resolve the previous operator eg. 9+6-3 (we need to resolve 9+6 first before we go to next operator)
    total = calculateTotal(operatorCurrent, operand1, operand2);
    operatorCurrent = operator;
  } else {
    console.log(`inside else:  Operator: ${operator}`);
    console.log(` inside else: operand1: ${operand1}`);
    console.log(` inside else: operand2: ${operand2}`);
    // We don't have all the operands and the operator yet to do calculation and display on screen.
    operatorCurrent = operator;
  }
  return total;
};

const calculateTotal = (operator, num1, num2) => {
  // Being extra cautious here. Empty strings (in case passed) are considered as truthy for !opertaor, !num1 and !num2
  if (
    !operator ||
    (operator == "" && !num1) ||
    (num1 == "" && !num2) ||
    num2 == ""
  ) {
    return null;
  }
  let number1 = parseInt(num1);
  let number2 = parseInt(num2);
  let total = 0;
  if (operator === "+") {
    total = number1 + number2;
  } else if (operator === "-") {
    total = number1 - number2;
  } else if (operator === "%") {
    total = number1 / number2;
  } else if (operator === "*") {
    total = number1 * number2;
  }
  return total;
};

const displayResult = (result) => {
  if (result) {
    $("#result").text(result);
  }
};

$("button").on("click", (event) => {
  const buttonValue = event.target.innerHTML;
  if (buttonValue >= "0" && buttonValue <= "9") {
    onNumberClick(buttonValue);
  } else if (buttonValue == "AC") {
    // todo: finish implementation for AC
    console.log("AC");
    operand1 = false;
    operand2 = false;
    operatorCurrent = false;
    total = "0";
    // Pass the argument purposely as string 0 otherwise the result condition inside displayResult will not pass
    displayResult(total);
  } else {
    console.log("operator clicked");
    const total = onOperatorClick(buttonValue);
    console.log("total", total);
    if (total) {
      // Make operand1 as total. We are only storing two numbers or operand at a time.
      operand1 = total;
      operand2 = false;
      displayResult(total);
    }
  }
});
