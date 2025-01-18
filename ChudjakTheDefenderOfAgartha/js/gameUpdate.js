let fps = 60;
let player;
let ball;
let enemies;

let gameLoop = setInterval(() => {
    // Update the dom elements selectors
    if(document.querySelector(".player")){
        player = document.querySelector(".player");
    }
    if(document.querySelector(".ball")){
        ball = document.querySelector(".ball");
    }
    if(document.querySelectorAll(".enemy")){
        enemies = document.querySelectorAll(".enemy");
    }

    // Player movement
    updatePlayerPosition();

    if(currentPlayerX > 82){
        currentPlayerX = 82;
    }
    if(currentPlayerX < 0){
        currentPlayerX = 0;
    }

    if(player){
        player.style.left = `${currentPlayerX}%`;
    }
}, 1000/fps);