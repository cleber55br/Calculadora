document.addEventListener('DOMContentLoaded', function () {
    const result = document.getElementById('result');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '';
    let operator = null;
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '';
                previousInput = '';
                operator = null;
            } else if (value === 'DEL') {
                currentInput = currentInput.slice(0, -1);
            } else if (value === '=') {
                if (operator && previousInput && currentInput) {
                    currentInput = calculate(previousInput, currentInput, operator);
                    operator = null;
                    previousInput = '';
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput && previousInput && operator) {
                    previousInput = calculate(previousInput, currentInput, operator);
                    currentInput = '';
                } else if (currentInput) {
                    previousInput = currentInput;
                    currentInput = '';
                }
                operator = value;
            } else {
                currentInput += value;
            }

            result.value = currentInput || previousInput;
        });
    });

    function calculate(num1, num2, operator) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);

        switch (operator) {
            case '+': return (num1 + num2).toString();
            case '-': return (num1 - num2).toString();
            case '*': return (num1 * num2).toString();
            case '/': return (num1 / num2).toString();
            default: return '';
        }
    }
});