'use strict'
const problem = document.querySelector("#problem");
const solution = document.querySelector("#solution");
const clearBtn = document.querySelector("#clear");
const infixExpr = [];
let buffer = "";

function keyFinder(event){
    solution.textContent = '';
    problem.setAttribute("style", "font-size: larger; font-weight: normal");
    clearBtn.textContent = "CE";
    switch (event.key) {
        case '(':
            openBracketHandler();
            break;
        case ')':
            closeBracketHandler();
            break;
        case "Backspace":
            clear();
            break;
        case '/':
            mulDivHandler('/');
            break;
        case '*':
            mulDivHandler('*');
            break;
        case '-':
            subtractHanddler();
            break;
        case '+':
            addSubHandler('+');
            break;
        case '=':
            equalsHandler();
            break;
        default:
            numberHandler(event);
            break;
    }
}

window.addEventListener("keydown", keyFinder)

function numberHandler(event) {
    if((event.key <= 9 && event.key >=0) || event.key === '.'){
        if(infixExpr[infixExpr.length -1] === ')'){
            infixExpr.push('*');
        }
        if(buffer.length <= 10){
            buffer = buffer + event.key.toString();
            problem.textContent = infixExpr.join(' ') + ' ' + buffer;
        }
        else{
            alert("The number should not exceed 10 digits");
        }
    }
}

function pushBuffer() {
    if(buffer.length !== 0){
        if(buffer === '.') infixExpr.push(Number(0));
        else infixExpr.push(Number(buffer));
        buffer = '';
    }
}

let unclosedBrackets = 0
function openBracketHandler() {
    pushBuffer();
    if(typeof infixExpr[infixExpr.length -1] === "number" || infixExpr[infixExpr.length -1] === ')'){
        infixExpr.push('*');
    }
    infixExpr.push('(');
    unclosedBrackets++;
    problem.textContent = infixExpr.join(' ') + buffer;
}

function closeBracketHandler() {
    pushBuffer();
    if((unclosedBrackets) && (typeof infixExpr[infixExpr.length -1] === "number" || 
        infixExpr[infixExpr.length -1] === ')')){
            infixExpr.push(')');
            unclosedBrackets--;
            problem.textContent = infixExpr.join(' ') + buffer;
       
    }
}

function mulDivHandler(op) {
    pushBuffer();
    if(typeof infixExpr[infixExpr.length -1] === "number" || infixExpr[infixExpr.length -1] === ')'){
        infixExpr.push(`${op}`);
        problem.textContent = infixExpr.join(' ') + buffer;
    }
}

function subtractHanddler() {
    pushBuffer();
    if(typeof infixExpr[infixExpr.length -1] === "undefined" || infixExpr[infixExpr.length -1] === '('){        
        infixExpr.push(Number(0));
        infixExpr.push('-');
        problem.textContent = infixExpr.join(' ') + buffer;
    }
    addSubHandler('-');
}

function addSubHandler(op){
    pushBuffer();
    if(typeof infixExpr[infixExpr.length -1] === "number" || infixExpr[infixExpr.length -1] === ')'){
        infixExpr.push(`${op}`);
        problem.textContent = infixExpr.join(' ') + buffer;
    }
}

function clear() {
    if(buffer.length === 0){
        let bin = infixExpr.pop();
        if(bin === '(') unclosedBrackets--;
        else if(bin === ')') unclosedBrackets++;
        if(typeof infixExpr[infixExpr.length -1] === "number"){
            buffer = infixExpr[infixExpr.length -1].toString();
            infixExpr.pop();
        }
    }
    else if(buffer.length !== 0){
        buffer = buffer.slice(0, -1);
    }
    problem.textContent = infixExpr.join(' ') + buffer;
}

  function equalsHandler() {
    pushBuffer();
    if((typeof infixExpr[infixExpr.length -1] === "number") || (infixExpr[infixExpr.length -1] === ')')){
        while(unclosedBrackets){
            closeBracketHandler();
        }
        solution.textContent = infixExpr.join(' ') + ' =';
        problem.textContent = eval(infixExpr.join(''));
        problem.setAttribute("style", "font-size: 1.4rem; font-weight: bold");
        clearBtn.textContent = "AC";
        infixExpr.length = 0;
        
    }
  }

