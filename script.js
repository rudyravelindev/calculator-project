const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let currentInput = ''; // The current input being typed
let previousInput = ''; // The previous input before an operation
let operator = ''; // The current operator

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonValue = e.target.textContent;

        // Clear button
        if (button.classList.contains('clear')) {
            clearCalculator();
        } 
        // Equals button
        else if (button.classList.contains('equals')) {
            calculateResult();
        } 
        // Decimal point button
        else if (button.classList.contains('decimal')) {
            if (!currentInput.includes('.')) {
                currentInput += '.';
                updateDisplay(currentInput);
            }
        }
        // Operator buttons
        else if (['+', '-', '*', '/'].includes(buttonValue)) {
            handleOperator(buttonValue);
        }
        // Number buttons
        else {
            handleNumber(buttonValue);
        }
    });
});

// Update display
function updateDisplay(value) {
    display.textContent = value;
}

// Handle number input
function handleNumber(value) {
    // Prevent leading zeros
    if (currentInput === '0' && value === '0') return;

    currentInput += value;
    updateDisplay(currentInput);
}

// Handle operator input
function handleOperator(value) {
    if (currentInput === '') return; // Don't handle operator if no input

    if (previousInput === '') {
        previousInput = currentInput;
    } else {
        calculateResult(); // Perform calculation if operator is pressed after an input
    }

    operator = value;
    currentInput = ''; // Clear the current input for the next number
}

// Perform calculation
function calculateResult() {
    if (currentInput === '' || previousInput === '') return; // Prevent calculation without enough inputs

    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result = 0;

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num2 === 0 ? 'Error' : num1 / num2; // Prevent division by zero
            break;
    }

    updateDisplay(result);
    previousInput = result.toString(); // Store the result for further calculations
    currentInput = '';
    operator = '';
}

// Clear the calculator
function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay('0');
}