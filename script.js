const display = document.querySelector('.calculator-input')
const keys = document.querySelector('.calculator-keys')

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay(){
    display.value = displayValue;
}


keys.addEventListener('click',function(e){
    const element = e.target;

    if(!element.matches('button')) return; // buton dışındaki alanlara tıklanıldıgında bir olay olmamasını sağlar.

    switch(element.value){
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(element.value);
            break;
        case '.':
            inputDecimal();
            break;
        case 'clear':
            clear();
            break;
        default:
            inputNumber(element.value);
    }

    updateDisplay();
});

function handleOperator(nextoperator){
    const value = parseFloat(displayValue);

    if(operator && waitingForSecondValue){ // bir sayı girildikten sonra operatöre tekrardan tıklanıldığında bunun güncellenmesini sağlar
        operator = nextoperator;
        return;
    }

    if(firstValue == null){
        firstValue = value;
    }
    else if(operator){
        const result = calculate(firstValue,value,operator);

        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextoperator;
}

function calculate(first, second, operator){
    if(operator === '+'){
        return firstValue + second;
    }
    else if(operator === '-'){
        return first - second;
    }
    else if(operator === '*'){
        return first * second;
    }
    else if(operator === '/'){
        return first / second;
    }
    return second;
}

function inputNumber(num){
    if(waitingForSecondValue == true){
        displayValue = num;
        waitingForSecondValue = false;
    }
    else{

        displayValue = displayValue === '0'? num:displayValue + num;
    }

    console.log(displayValue, firstValue, operator, waitingForSecondValue)
}

function inputDecimal(){
    if(!displayValue.includes('.')){
        
        displayValue += '.'
    }
}

function clear(){
    displayValue = '0'
}