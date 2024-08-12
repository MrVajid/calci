'use strict'
const problem = document.querySelector("#problem");
const infixExpr = [];
let buffer = "";

function keyFinder(event){
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
        buffer = buffer + event.key.toString();
        problem.textContent = infixExpr.join('') + buffer;
    }
}

function pushBuffer() {
    if(buffer.length !== 0){
        if(buffer === '.') infixExpr.push(Number(0));
        else infixExpr.push(Number(buffer));
        buffer = '';
        // problem.textContent = infixExpr.join('') + buffer;
    }
    // else{
    //     buffer = '';
    //     problem.textContent = infixExpr.join('') + buffer;
    //     // pointValue = 0;
    // }
}

let unclosedBrackets = 0
function openBracketHandler() {
    pushBuffer();
    if(typeof infixExpr[infixExpr.length -1] === "number" || infixExpr[infixExpr.length -1] === ')'){
        infixExpr.push('*');
    }
    infixExpr.push('(');
    unclosedBrackets++;
    problem.textContent = infixExpr.join('') + buffer;
}

function closeBracketHandler() {
    pushBuffer();
    if((unclosedBrackets) && (typeof infixExpr[infixExpr.length -1] === "number" || 
        infixExpr[infixExpr.length -1] === ')')){
            infixExpr.push(')');
            unclosedBrackets--;
            problem.textContent = infixExpr.join('') + buffer;
        // if(typeof infixExpr[infixExpr.length -1] === "number" || infixExpr[infixExpr.length -1] === ')'){
        //     infixExpr.push(')');
        //     unclosedBrackets--;
        //     problem.textContent = infixExpr.join('') + buffer;
        // }
    }
}

function mulDivHandler(op) {
    pushBuffer();
    if(typeof infixExpr[infixExpr.length -1] === "number" || infixExpr[infixExpr.length -1] === ')'){
        infixExpr.push(`${op}`);
        problem.textContent = infixExpr.join('') + buffer;
    }
}

// function multiplyHandler() {
//     pushBuffer();
//     if(typeof infixExpr[infixExpr.length -1] === "number" || infixExpr[infixExpr.length -1] === ')'){
//         infixExpr.push('*');
//         problem.textContent = infixExpr.join('') + buffer;
//     }
// }

function subtractHanddler() {
    pushBuffer();
    if(typeof infixExpr[infixExpr.length -1] === "undefined" || infixExpr[infixExpr.length -1] === '('){
        // .log(infixExpr[infixExpr.length -1]);console
        
        infixExpr.push(Number(0));
        infixExpr.push('-');
        problem.textContent = infixExpr.join('') + buffer;
    }
    addSubHandler('-');
    // else if(typeof infixExpr[infixExpr.length -1] === "number" || infixExpr[infixExpr.length -1] === ')'){
    //     infixExpr.push('-');
    //     problem.textContent = infixExpr.join('') + buffer;
    // }
}

function addSubHandler(op){
    pushBuffer();
    if(typeof infixExpr[infixExpr.length -1] === "number" || infixExpr[infixExpr.length -1] === ')'){
        infixExpr.push(`${op}`);
        problem.textContent = infixExpr.join('') + buffer;
    }
}

function clear() {
    if(buffer.length === 0){
        // if(infixExpr[infixExpr.length -1] === '+'||
        //     infixExpr[infixExpr.length -1] === '-'||
        //     infixExpr[infixExpr.length -1] === '*'||
        //     infixExpr[infixExpr.length -1] === '/'){
        //          infixExpr.pop();
        //          problem.textContent = infixExpr.join('') + buffer;
        //     }
        //  else if(infixExpr[infixExpr.length -1] === '('){
        //      infixExpr.pop();
        //      unclosedBrackets--;
        //      problem.textContent = infixExpr.join('') + buffer;
        //  }
        //  else if(infixExpr[infixExpr.length -1] === ')'){
        //      infixExpr.pop();
        //      unclosedBrackets++;
        //      problem.textContent = infixExpr.join('') + buffer;
        //  }
        let bin = infixExpr.pop();
        if(bin === '(') unclosedBrackets--;
        else if(bin === ')') unclosedBrackets++;
        if(typeof infixExpr[infixExpr.length -1] === "number"){
            buffer = infixExpr[infixExpr.length -1].toString();
            infixExpr.pop();
            // problem.textContent = infixExpr.join('') + buffer;
        }
    }
    else if(buffer.length !== 0){
        buffer = buffer.slice(0, -1);
        // problem.textContent = infixExpr.join('') + buffer;
    }
    problem.textContent = infixExpr.join('') + buffer;
}

// function viewInfix() {
//     console.log(infixExpr.join('') + buffer);
// }
// problem.textContent = infixExpr.join('') + buffer;



  function equalsHandler() {
    pushBuffer();
    if((typeof infixExpr[infixExpr.length -1] === "number") || (infixExpr[infixExpr.length -1] === ')')){
        while(unclosedBrackets){
            closeBracketHandler();
        }
        problem.textContent = infixExpr.join('') + buffer;
        // console.log(infixExpr.join('') + buffer);
    }
  }