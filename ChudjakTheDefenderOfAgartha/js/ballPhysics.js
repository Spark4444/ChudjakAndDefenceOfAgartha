let canChangeY= true;

//Function for checking collision with one element
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

    if (topOverlap < bottomOverlap && topOverlap < leftOverlap && topOverlap < rightOverlap || bottomOverlap < topOverlap && bottomOverlap < leftOverlap && bottomOverlap < rightOverlap) {
        return false;
    }
    
    if (leftOverlap < rightOverlap && leftOverlap < topOverlap && leftOverlap < bottomOverlap || rightOverlap < leftOverlap && rightOverlap < topOverlap && rightOverlap < bottomOverlap) {
        return true;
    }
}


//Function for checking collision with many elements
function checkCollisionArr(el1, elements) {
    let rect1 = el1.getBoundingClientRect();
    
    elements.forEach(el2 => {
        let rect2 = el2.getBoundingClientRect();
        if (!(rect1.top > rect2.bottom || rect1.right < rect2.left || rect1.bottom < rect2.top || rect1.left > rect2.right)) {
            el2.style.visibility = "hidden";
            el2.classList.remove("enemy");
        }
    });
}

// General function to update the physics of the ball
function updateBallPosition(){
    currentBallX += ballXSpeed;
    currentBallY += ballYSpeed;
    if(currentBallX > 95){
        ballXSpeed = -ballXSpeed;
    }

    if(currentBallY > 40){
        // END GAME
    }

    if(currentBallX < 0){
        ballXSpeed = -ballXSpeed;
    }

    if(currentBallY < -50){
        ballYSpeed = -ballYSpeed;
    }

    if(checkCollision(ball, player) && canChangeX){
        // END GAME
    }

    if(checkCollision(ball, player) == false && canChangeY){
        ballYSpeed = -ballYSpeed;
        canChangeY = false;
        setTimeout(() => {
            canChangeY = true;
        }, 500);
    }
    
    if(checkCollisionArr(ball, enemies)){
        ballXSpeed = -ballXSpeed;
    }

    if(checkCollision(ball, player)){
        ballYSpeed = -ballYSpeed;
    }

    ball.style.left = `${currentBallX}%`;
    ball.style.top = `${currentBallY}%`;

}

// function checkCollision2(el1, el2) {
//     let rect1 = el1.getBoundingClientRect();
//     let rect2 = el2.getBoundingClientRect();
  
//     if (rect1.top > rect2.bottom || rect1.right < rect2.left || rect1.bottom < rect2.top || rect1.left > rect2.right) {
//         return null;
//     }

//     let topOverlap = rect1.bottom - rect2.top;
//     let bottomOverlap = rect2.bottom - rect1.top;
//     let leftOverlap = rect1.right - rect2.left;
//     let rightOverlap = rect2.right - rect1.left;

//     if (topOverlap < bottomOverlap && topOverlap < leftOverlap && topOverlap < rightOverlap) {
//         return 'top';
//     }
//     if (bottomOverlap < topOverlap && bottomOverlap < leftOverlap && bottomOverlap < rightOverlap) {
//         return 'bottom';
//     }
//     if (leftOverlap < rightOverlap && leftOverlap < topOverlap && leftOverlap < bottomOverlap) {
//         return 'left';
//     }
//     if (rightOverlap < leftOverlap && rightOverlap < topOverlap && rightOverlap < bottomOverlap) {
//         return 'right';
//     }

//     return null; // In case of a tie
// }