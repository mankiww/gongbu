const name = document.querySelector("#name"),
    btn = document.querySelector("#changer"),
    body = document.querySelector("body"),
    root = document.querySelector("html");
  
const MAIN = "--main-text-color";

function adjustColor(color){
    // https://sqlplus.tistory.com/entry/%EB%B3%B4%EC%83%89-%EA%B5%AC%ED%95%98%EA%B8%B0-complementary-color-Opposite-Color 참조
    const hex = [...color];
    const list1 = [..."0123456789ABCDEF"];
    const list2 = [..."FEDCBA9876543210"];
    let opcolor = '';
    for (var i = 1; i < hex.length; i++){
        for (n = 0; n < list1.length; n++){
            if(hex[i] === list1[n]){
                opcolor += list2[n];
            }
        }
    }
    return '#' + opcolor;
}

function changeColor(){
    const newColor = hexMaker();
    name.innerText = `HEX COLOR : ${newColor}`;
    body.style.backgroundColor = newColor;
    mcolor = adjustColor(newColor);
    console.log(mcolor)
    root.style.setProperty(MAIN, mcolor); 
}

function hexMaker(){
    const numbers = [..."0123456789ABCDEF"];
     code = [];
    for (var i = 0; i < 6; i++){
        const index = Math.floor(Math.random()*numbers.length)
        code[i] = numbers[index];
    }
    const strcode = '#' + code.join('');
    return strcode
}

function init(){
    btn.addEventListener("click", changeColor);
}

init();