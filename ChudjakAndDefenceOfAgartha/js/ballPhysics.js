// Game state
let canChangePlayerY = true;
let canChangeBallX = true;
let canChangeBallY = true;
let changedSpeed = false;

// Function to check collision between two elements and return the overlaping side of the second element
function checkCollision(el1, el2) {
    let rect1 = el1.getBoundingClientRect();
    let rect2 = el2.getBoundingClientRect();
  
    if (rect1.top > rect2.bottom || rect1.right < rect2.left || rect1.bottom < rect2.top || rect1.left > rect2.right) {
        return null;
    }

    let topOverlap = rect1.bottom - rect2.top;
    let bottomOverlap = rect2.bottom - rect1.top;
    let leftOverlap = rect1.right - rect2.left;
    let rightOverlap = rect2.right - rect1.left;

    if (topOverlap < bottomOverlap && topOverlap < leftOverlap && topOverlap < rightOverlap) {
        el2.classList.remove("enemy");
        return "top";
    }
    if (bottomOverlap < topOverlap && bottomOverlap < leftOverlap && bottomOverlap < rightOverlap) {
        el2.classList.remove("enemy");
        return "bottom";
    }
    if (leftOverlap < rightOverlap && leftOverlap < topOverlap && leftOverlap < bottomOverlap) {
        el2.classList.remove("enemy");
        return "left";
    }
    if (rightOverlap < leftOverlap && rightOverlap < topOverlap && rightOverlap < bottomOverlap) {
        el2.classList.remove("enemy");
        return "right";
    }
}

// General function to update the physics of the ball
function updateBallPosition(){
    let collisionWithPlayer = checkCollision(ball, player);
    currentBallX += ballXSpeed;
    currentBallY += ballYSpeed;

    if(currentBallX > 95){
        ballXSpeed = -ballXSpeed;
    }

    if(currentBallY > 40){
    }

    if(currentBallX < 0){
        ballXSpeed = -ballXSpeed;
    }

    if(currentBallY < -50){
        ballYSpeed = -ballYSpeed;
    }

    if(collisionWithPlayer == "bottom"){
        restartGame();
    }

    if(collisionWithPlayer == "top" && canChangePlayerY){
        ballYSpeed = -ballYSpeed;
        canChangePlayerY = false;

        setTimeout(() => {
            canChangePlayerY = true;
        }, 500);
    }
    
    enemies.forEach(element => {
        let collisionWithEnemy = checkCollision(ball, element);
        if(collisionWithEnemy == "left" && canChangeBallX || collisionWithEnemy == "right" && canChangeBallX){
            ballXSpeed = -ballXSpeed;
            canChangeBallX = false;
        
            setTimeout(() => {
                canChangeBallX = true;
            }, 200);
        }
    
        if(collisionWithEnemy == "top" && canChangeBallY || collisionWithEnemy == "bottom" && canChangeBallY){
            ballYSpeed = -ballYSpeed;
            canChangeBallY = false;
        
            setTimeout(() => {
                canChangeBallY = true;
            }, 200);
        }
    });

    ball.style.left = `${currentBallX}%`;
    ball.style.top = `${currentBallY}%`;
}