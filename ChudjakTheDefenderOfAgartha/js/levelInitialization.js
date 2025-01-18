let levelId = 0;
let currentLevel = levels[levelId];
let currentCharacter = currentLevel.character;
let currentBall = currentLevel.ball;
let currentEnemies = currentLevel.enemies;

game.style.backgroundImage = currentLevel.background;

function unpackEnemies(enemiesList){
    let finalString = "";
    enemiesList.forEach(enemy => {
        for(let i = 0;i < enemy.amount; i++){
            finalString +=`<img draggable="false" class="${enemy.class} enemy" src="img/${enemy.class}.png" alt="${enemy.class}"> `;
        }
    });
    return finalString;
}

game.innerHTML += `
        <div class="wrap${levelId} enemies">
            ${unpackEnemies(currentEnemies)}
        </div>
        <img draggable="false" class="${currentCharacter.class} player" src="img/${currentCharacter.src}.png" alt="${currentCharacter.alt}">
        <img draggable="false" class="${currentBall.class} ball" src="img/${currentBall.src}.png" alt="${currentBall.alt}">
`;