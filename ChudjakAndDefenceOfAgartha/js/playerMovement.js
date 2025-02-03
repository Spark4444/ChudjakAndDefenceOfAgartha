// Varaible initialization
let keys = {};

// Key listeners for the player movement
document.addEventListener("keydown", function(event) {
    keys[event.code] = true;
});

document.addEventListener("keyup", function(event) {
    keys[event.code] = false;
});

// Player movement
function updatePlayerPosition() {
    if (keys["ArrowLeft"] || keys["KeyA"]) {
        currentPlayerX -= playerSpeed;
    }
    if (keys["ArrowRight"] || keys["KeyD"]) {
        currentPlayerX += playerSpeed;
    }

    if(currentPlayerX > 82){
        currentPlayerX = 82;111111
    }
    if(currentPlayerX < 0){
        currentPlayerX = 0;
    }

    if(player){
        player.style.left = `${currentPlayerX}%`;
    }
}