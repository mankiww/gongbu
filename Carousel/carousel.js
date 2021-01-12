const left = document.querySelector("#left"),
right = document.querySelector("#right"),
img = document.querySelector("#img"),
dots = document.querySelector("#dots");

function presentImg(){
    const arrayImg = [...img.src]
    const imgNumber = arrayImg[arrayImg.length-5]; 
    const dotNode = dots.querySelectorAll(".dot");
    const dotList = Array.from(dotNode);
    const presentDot = dotList.filter(function(dot){
        return dot.id === imgNumber;
    });
    dotNode.forEach(function(element){
        element.classList.remove("clicked");
    })
    presentDot[0].classList.add("clicked");
}

function moveToImg(){
    const arrayImg = [...img.src];
    arrayImg[arrayImg.length-5] = this.id;
    img.src = arrayImg.join('');
}

function makeDots() {
    for (var i=1; i<6; i++){
        const dot = document.createElement("button");
        dot.innerText = "●";
        dot.classList.add("dot");
        dot.id = i
        dot.addEventListener("click", moveToImg);
        dots.appendChild(dot);
    }
}

function previousImage() {
    const arrayImg = [...img.src]
    const imgNumber = parseInt(arrayImg[arrayImg.length-5]);  
    const preImgNumber = imgNumber - 1
    if (preImgNumber === 0){
        arrayImg[arrayImg.length-5] = 5;
    } else {
        arrayImg[arrayImg.length-5] = preImgNumber;
    }
    img.src=arrayImg.join('')
}

function nextImage() {
    const arrayImg = [...img.src];
    const imgNumber = parseInt(arrayImg[arrayImg.length-5]);  
    const nextImgNumber = imgNumber + 1
    if (nextImgNumber === 6){
        arrayImg[arrayImg.length-5] = 1;
    } else {
        arrayImg[arrayImg.length-5] = nextImgNumber;
    }
    img.src=arrayImg.join('')
}

function init() {
    makeDots();
    left.addEventListener("click", previousImage)
    right.addEventListener("click", nextImage);  
    document.addEventListener("click", presentImg);
    presentImg();    
}

init();