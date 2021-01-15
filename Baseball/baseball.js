const form = document.querySelector("form"),
input = form.querySelector("input"),
score = document.querySelector("#result");

let life = 10;

const ENEMY = 'enemy'

function loadRandom(){
    return JSON.parse(localStorage.getItem(ENEMY));
}

function createRandom(){
    const randomArr = [];
    for (var i = 0; i < 3; i++){
        randomArr[i] = Math.floor(Math.random()*10);
    }
    localStorage.setItem(ENEMY, JSON.stringify(randomArr))
    const fieldSet = document.createElement("fieldset");
    score.insertBefore(fieldSet, score.firstChild);
}   

function countStrike(user, com) {
    var result = 0;
    for(var i = 0; i < user.length; i++){
        if(user[i] === com[i]){
            result += 1;
        }
    }
    return result;
}

function countBall(user, com) {
    var result = 0;
    for (i of user) {
        for (j of com) {
            if (i === j){
                result += 1;
                console.log("ball!")
            }
        }
    }
    return result;
}

function alertNotThree(){
    const arrInput = [...input.value];
    const parsedInput = arrInput.map(function (num){
        return parseInt(num);
    });
    const filteredInput = parsedInput.filter(function (element){
        return !isNaN(element);
    });

    return filteredInput;
}

function letsBaseball(event){
    event.preventDefault();
    parsedInput = alertNotThree();    
    randomArr = loadRandom();
    const strikeCount = countStrike(parsedInput, randomArr);
    const ballCount = countBall(parsedInput, randomArr) - strikeCount;
    if(parsedInput.length !==3) {
        alert("입력값이 세 자리 숫자가 아닙니다");
        input.value = '';
        return 0;
    }     
    life -= 1;
    const note = document.createTextNode(`${10-life} [${parsedInput}]: ${strikeCount}S ${ballCount}B`);
    const para = document.createElement("p");
    const f = score.querySelector("fieldset");
    para.appendChild(note);
    f.appendChild(para);
    input.value = '';
    if (strikeCount === 3){
        alert("축하합니다! 퍼펙트!")
        f.append("승리");
        createRandom();
        life = 10;

    }
    if (life === 0){
        alert("10번의 기회를 모두 소진하였습니다. 패배!")
        f.append("패배");
        createRandom();
        life = 10;
    }
    
}

function init(){
    form.addEventListener("submit", letsBaseball);
    createRandom();
}

init();