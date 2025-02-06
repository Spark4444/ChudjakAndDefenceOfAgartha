// Level data
let currentLevel = levels[parseInt(settingObj.levelId)];
let currentEnemies = currentLevel.enemies;

// Player data
let currentCharacter = currentLevel.character;
let playerSpeed;
let currentPlayerX;
let currentPlayerY;

// Ball data
let currentBall = currentLevel.ball;
let currentBallX;
let currentBallY;
let ballXSpeed;
let ballYSpeed;

// Function to retrive all the enemies for the level as a string
function unpackEnemies(enemiesList){
    let finalString = "";
    enemiesList.forEach(enemy => {
        for(let i = 0;i < enemy.amount; i++){
            finalString +=`<img draggable="false" class="${enemy.class} enemy" src="img/${enemy.class}.png" alt="${enemy.class}"> `;
        }
    });
    return finalString;
}

// function to set up the level
function initLevel(){
    reinitVaraibles();
    canRestartGame = true;
    currentPlayerX = currentCharacter.x;
    currentPlayerY = currentCharacter.y;
    playerSpeed = currentCharacter.speed;
    currentBallX = currentBall.x;
    currentBallY = currentBall.y;
    ballXSpeed = currentBall.speedX;
    ballYSpeed = currentBall.speedY;
    game.style.backgroundImage = currentLevel.background;
    game.innerHTML = `
        <div class="wrap${settingObj.levelId} enemies">
            ${unpackEnemies(currentEnemies)}
        </div>
        <div class="ballWrap ball" style="left: ${currentBallX}%; top: ${currentBallY}%;">
            <img draggable="false" class="${currentBall.class}" src="img/${currentBall.src}.png" alt="${currentBall.alt}">
        </div>
        <img draggable="false" class="${currentCharacter.class} player" style="left: ${currentPlayerX}%; top: ${currentPlayerY}%;" src="img/${currentCharacter.src}.png" alt="${currentCharacter.alt}">
    `;
}

// Initial level setup
initLevel();

// Function to reinitialize the varaibles
function reinitVaraibles(){
    currentLevel = levels[settingObj.levelId];
    currentCharacter = currentLevel.character;
    currentBall = currentLevel.ball;
    currentEnemies = currentLevel.enemies;
}