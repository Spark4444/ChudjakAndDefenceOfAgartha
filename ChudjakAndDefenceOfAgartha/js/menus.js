// DOM elements
let mainMenu = document.querySelector(".mainMenu");
let game = document.querySelector(".game");
let pauseMenu = document.querySelector(".pauseMenu");
let menuWrap = document.querySelector(".menuWrap");
let continueButton = document.querySelector(".continueButton");
let restartButton = document.querySelector(".restartButton");
let countDown = document.querySelector(".countDown");
let body = document.querySelector("body");
let musicPlayer = document.querySelector(".musicPlayer");
let hideButton = document.querySelector(".hideButton");

// Timers
let hidePauseMenu;
let countDownInterval;
let musicPlayerTimeout;

// Game state
let gameStatus = false;
let canStopGame = false;
let canRestartGame = false;
let countDownStatus = false;
let musicPlayerStatus = getFromLocalStorageIfPresent("1", "true") == "true" ? true : false ;
musicPlayerStatus = !musicPlayerStatus;
openMusicPlayer();

// Integers
let time = getFromLocalStorageIfPresent("2", 3);

// If the user focuses on another window
window.addEventListener("blur", function() {
    if(gameStatus && !countDownStatus){
        stopGame();
    }
    else if(countDownStatus){
        haultCountDown();
        stopGame();
    }
});

// Function to transition from main menu to game
function startGame(){
    game.style.display = "";
    setTimeout(() => {
        mainMenu.style.opacity = "0";
        game.style.opacity = "1";
        startCountDown(time);
        document.addEventListener("keydown", function(event) {
            if (event.key === "Escape" || event.key === "Esc") {
                stopGame();
            }
        });
    }, 10);
    setTimeout(() => {
        mainMenu.style.display = "none";
    }, 1010);
}

// Function to open/close the settings 
function openSettings(){
    
}

// Function to open/close the music player
function openMusicPlayer(){
    if(musicPlayerStatus){
        musicPlayerStatus = false;
        musicPlayer.style.opacity = "0";
        musicPlayerTimeout = setTimeout(() => {
            musicPlayer.style.display = "none";
        }, 1000);
        hideButton.src = "img/show.svg";
    }
    else{
        clearTimeout(musicPlayerTimeout);
        musicPlayerStatus = true;
        setTimeout(() => {
            musicPlayer.style.opacity = "1";
        }, 10);
        musicPlayer.style.display = "";
        hideButton.src = "img/hide.svg";
    }
}

// Function to pause the game loop and open the pause menu and vise virsa
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
            startCountDown(time);
            pauseMenu.style.opacity = "0";
            hidePauseMenu = setTimeout(() => {
                pauseMenu.style.display = "none";
                restartButton.style.display = "";
                menuWrap.style.height = "";
                continueButton.innerHTML = "Continue";
            }, 500);
        }
    }
}

// Function to go to the main menu
function openMainMenu(){
    location.reload();
}

// Function to exit the game
function exit() {
    window.close();
}

// Function to restart the game if player loses
function restartGame(skipPauseMenu){
    if(canRestartGame){
        canRestartGame = false;
        setTimeout(() => {
            if(gameStatus || skipPauseMenu){
                stopGame();
            }
            if(!skipPauseMenu){
                restartButton.style.display = "none";
                menuWrap.style.height = "15vw"
                continueButton.innerHTML = "Restart";
            }
            initLevel();
        }, 300);
    }
}

// Count down before starting the game
function startCountDown(time){
    canStopGame = false;
    countDownStatus = true;
    countDown.style.display = "";
    countDown.innerHTML = `${time}`;
    time--;
    countDownInterval = setInterval(() => {
        countDown.innerHTML = `${time}`;
        if(time < 0){
            haultCountDown();
        }
        time--;
    }, 1000);
}

// Stops the countdown
function haultCountDown(){
    if(countDownStatus){
        clearInterval(countDownInterval);
        startGameLoop();
        countDown.style.display = "none";
        countDown.innerHTML = `${time}`;
        canStopGame = true;
        countDownStatus = false;
    }
}