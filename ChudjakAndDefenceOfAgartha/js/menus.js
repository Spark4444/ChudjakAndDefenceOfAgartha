// Initialization
let mainMenu = document.querySelector(".mainMenu");
let game = document.querySelector(".game");
let pauseMenu = document.querySelector(".pauseMenu");
let restartButton = document.querySelector(".restartButton");
let countDown = document.querySelector(".countDown");
let body = document.querySelector("body");
let hidePauseMenu;
let countDownInterval;
let gameStatus = false;
let canStopGame = false;
let canRestartGame = false;

// When player presses the start button
function startGame(){
    game.style.display = "";
    setTimeout(() => {
        mainMenu.style.opacity = "0";
        game.style.opacity = "1";
        startCountDown();
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' || event.key === 'Esc') {
                stopGame();
            }
        });
    }, 10);
    setTimeout(() => {
        mainMenu.style.display = "none";
    }, 1010);
}


function stopGame(){
    if(canStopGame){
        if(gameStatus){
            stopGameLoop();
            clearTimeout(hidePauseMenu);
            pauseMenu.style.display = "";
            setTimeout(() => {
                pauseMenu.style.opacity = "1";
            }, 10);
        }
        else{
            startCountDown();
            pauseMenu.style.opacity = "0";
            hidePauseMenu = setTimeout(() => {
                pauseMenu.style.display = "none";
                restartButton.innerHTML = "Continue";
            }, 500);
        }
    }
}

function jumpToMainMenu(){
    location.reload();
}

function restartGame(){
    if(canRestartGame){
        canRestartGame = false;
        setTimeout(() => {
            if(gameStatus){
                stopGame();
            }
            restartButton.innerHTML = "Restart";
            initLevel();
        }, 300);
    }
}

function startCountDown(){
    canStopGame = false;
    let number = 2;
    countDown.style.display = "";
    countDownInterval = setInterval(() => {
        countDown.innerHTML = `${number}`;
        if(number == -1){
            clearInterval(countDownInterval);
            startGameLoop();
            countDown.style.display = "none";
            countDown.innerHTML = "3";
            canStopGame = true;
        }
        number--;
    }, 1000);
}