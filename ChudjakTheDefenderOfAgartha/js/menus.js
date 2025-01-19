// Initialization
let mainMenu = document.querySelector(".mainMenu");
let game = document.querySelector(".game");
let body = document.querySelector("body");

// When player presses the start button
function startGame(){
    game.style.display = "";
    setTimeout(() => {
        mainMenu.style.opacity = "0";
        game.style.opacity = "1";
        startGameLoop();
    }, 10);
    setTimeout(() => {
        mainMenu.style.display = "none";
    }, 1010);
}