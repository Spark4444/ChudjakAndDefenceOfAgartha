// Varaible initialization
let keys = {};

// Key listeners for the player movement
document.addEventListener("keydown", function(event) {
    keys[event.key] = true;
});

document.addEventListener("keyup", function(event) {
    keys[event.key] = false;
});

// Player movement
function updatePlayerPosition() {
    if (keys["ArrowLeft"] || keys["a"]) {
        currentPlayerX -= playerSpeed;
    }
    if (keys["ArrowRight"] || keys["d"]) {
        currentPlayerX += playerSpeed;
    }

    if(currentPlayerX > 82){
        currentPlayerX = 82;
    }
    if(currentPlayerX < 0){
        currentPlayerX = 0;
    }

    if(player){
        player.style.left = `${currentPlayerX}%`;
    }
}