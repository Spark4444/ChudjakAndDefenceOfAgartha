// Timers
let gameLoop;

// Game settings
let fps = 60;

// Game elements
let player;
let ball;
let enemies;

// Function to update the DOM elements
function updateSelectors(){
    if(document.querySelector(".player")){
        player = document.querySelector(".player");
    }
    if(document.querySelector(".ball")){
        ball = document.querySelector(".ball");
    }
    if(document.querySelectorAll(".enemy")){
        enemies = document.querySelectorAll(".enemy");
    }
}

function checkIfLevelEnded(){
    if(document.querySelectorAll(".enemy").length == 0){
        // Logic for new level
        // settingObj.levelId++;
        // initLevel();
    }
}

// Main game loop function to run the game
function startGameLoop(){
    gameStatus = true;
    gameLoop = setInterval(() => {
        // Update the DOM elements
        updateSelectors();
    
        // Player movement
        updatePlayerPosition();
        
        // Ball physics
        updateBallPosition();

        // Check if level ended and skip to next one
        checkIfLevelEnded();
    }, 1000/fps);
}

// Hault the game loop
function stopGameLoop(){
    gameStatus = false;
    clearInterval(gameLoop);
}
