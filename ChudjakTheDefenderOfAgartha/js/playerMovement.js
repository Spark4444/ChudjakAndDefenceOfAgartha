let currentPlayerX = 43;
let keys = {};

document.addEventListener("keydown", function(event) {
    keys[event.key] = true;
});

document.addEventListener("keyup", function(event) {
    keys[event.key] = false;
});

function updatePlayerPosition() {
    if (keys["ArrowLeft"] || keys["a"]) {
        currentPlayerX-= 2;
    }
    if (keys["ArrowRight"] || keys["d"]) {
        currentPlayerX+= 2;
    }
}
