const form = document.querySelector("form"),
input = form.querySelector("input"),
score = document.querySelector("#result"),
fast = document.querySelector("#fast")

let life = 10;

const ENEMY = 'enemy'

function fastGame(){
    for(i=0; i<10; i++){
        count([1,2,3],[3,4,5])
    }
}

function loadRandom(){
    return JSON.parse(localStorage.getItem(ENEMY));
}

function createRandom(){
    const randomArr = [];
    do {
        var a = Math.floor(Math.random()*10);
        if (!randomArr.includes(a)) {
            randomArr.push(a);
        }
    } while (randomArr.length < 3)
    localStorage.setItem(ENEMY, JSON.stringify(randomArr))
    const fieldSet = document.createElement("fieldset");
    score.insertBefore(fieldSet, score.firstChild);
}   

function count(user, com) {
    var strike = 0,
    ball = 0;
    for(var i = 0; i < user.length; i++){
        for(var j = 0; j < com.length; j++){
            if(i === j && user[i] === com[j]){
                strike += 1;
                break;
            }
            if(i !== j  && user[i] === com[j]){
                ball += 1;
                continue;
            }
        }
    }
    life -= 1;
    const note = document.createTextNode(`${10-life} [${user}]: ${strike}S ${ball}B`);
    const para = document.createElement("p");
    const f = score.querySelector("fieldset");
    para.appendChild(note);
    f.appendChild(para);
    input.value = '';
    if (strike === 3){
        alert("축하합니다! 퍼펙트!")
        f.append("승리");
        f.classList.add("win")
        createRandom();
        life = 10;

    }
    if (life === 0){
        alert("10번의 기회를 모두 소진하였습니다. 패배!")
        f.append(`패배 ${com}`);
        f.classList.add("lose")
        createRandom();
        life = 10;
    }
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
    const parsedInput = alertNotThree();    
    const randomArr = loadRandom();
    const filteredInput = []
    if(parsedInput.length !==3) {
        alert("입력값이 세 자리 숫자가 아닙니다");
        input.value = '';
        return 0;
    }
    for (i of parsedInput) {
        if(!filteredInput.includes(i)){
            filteredInput.push(i);
        }
    }    
    if (parsedInput.length !== filteredInput.length){
        alert("중복된 숫자가 입력되었습니다")
        input.value = '';
        return 0;
    }    
    count(parsedInput, randomArr);      
}

function init(){
    form.addEventListener("submit", letsBaseball);
    fast.addEventListener("click", fastGame);
    createRandom();
}

init();