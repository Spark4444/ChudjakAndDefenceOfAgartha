let gameLoop;
let fps = 60;
let player;
let ball;
let enemies;

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

function startGameLoop(){
    gameLoop = setInterval(() => {
        updateSelectors();
    
        // Player movement
        updatePlayerPosition();
        
        // Ball physics
        updateBallPosition();
    }, 1000/fps);
}

function stopGameLoop(){
    clearInterval(gameLoop);
}
