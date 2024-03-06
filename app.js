let gameSeq = [];
let userSeq = [];

let btncolor = ["yellow", "green", "red", "purple"];

let started = false;
let level = 0;

// let gameStatus = document.querySelector('.gameStatus');

// let startBtn = document.querySelector("#start-btn");

// startBtn.addEventListener("click", function(e) {
//     if(started == false){
//         started = true;
//         levelUp();
//     }
// });

let landingArea = document.querySelector(".landing-area");
let playBtn = document.querySelector("#play-btn");
playBtn.addEventListener("click", ()=>{
    landingArea.style.visibility = "hidden";
    setTimeout(() => {
        if(started == false){
            started = true;
            levelUp();
        }
    }, 700)
})

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove('flash');
    }, 400);
}

let yourscr = document.querySelector(".your-scr");
let highestScr = document.querySelector(".highest-scr");

function levelUp() {
    userSeq = [];
    level++;
    // gameStatus.innerText = `Level ${level}`;

    yourscr.innerText = `${level}`;

    if(yourscr.innerText > highestScr.innerText){
        highestScr.innerText = yourscr.innerText;
        saveData();
    }

    let randomIndex = Math.floor(Math.random()*4);
    let randcolor = btncolor[randomIndex];
    let randBtn = document.querySelector(`.${randcolor}`);
    gameSeq.push(randcolor);
    btnFlash(randBtn);
}

//***************************************************************************************** */

//local storage
function saveData(){
    localStorage.setItem("data", highestScr.innerText);
}

function showTask(){
    highestScr.innerText = localStorage.getItem("data");
}

showTask();

//*********************************************************************************** */

function checkAns(idx) {
    if(gameSeq[idx] === userSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        // gameStatus.innerHTML =  `GAME OVER! Your score was <b> ${level}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150)
        let gameOver = document.querySelector("#game-over");
        gameOver.style.visibility = "visible";
        reset();
    }
}

//game over
let backGame = document.querySelector("#back-game");
backGame.addEventListener("click", ()=> {
    let gameOver = document.querySelector("#game-over");
    gameOver.style.visibility = "hidden";
    
    setTimeout(() => {
        if(started == false){
            started = true;
            levelUp();
        }
    }, 700)
})


function btnPress() {
    if(started == true){
        let btn = this;
        btnFlash(btn);
        userclr = btn.getAttribute("id");
        userSeq.push(userclr);
        checkAns(userSeq.length-1);
    }
}

let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns){
    btn.addEventListener('click', btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}



/*********************************************************************************/

 //landing page

 let headingColor = ["blue", "red", "green", "brown", "orange", "lightblue", "beige","yellow"];

 let heading = document.querySelector(".heading");

 function colorChange(){
     let randomIdx = Math.floor(Math.random()*8);
     let colorV = headingColor[randomIdx];
     heading.style.color = colorV;    
 }
 
 setInterval(() => {
     colorChange();
 }, 1000);


 //quit and reset

 let quitBtn = document.querySelector("#quit");
 let resetBtn = document.querySelector("#reset");

 quitBtn.addEventListener("click", () => {
    landingArea.style.visibility = "visible";
    reset();
 })

 resetBtn.addEventListener("click", () => {
    reset();
    setTimeout(() => {
        if(started == false){
            started = true;
            levelUp();
        }
    }, 700)
 })