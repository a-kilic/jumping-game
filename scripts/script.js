const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const gameOverModal = document.getElementById("gameOverModal");
const playAgain = document.getElementById("playAgain");
const exitGame = document.getElementById("exitGame");

let isJumping = false;
let gameOver = false;

//Jumping function
function jump() {
    if (isJumping) return; //prevent double jump for now

    isJumping = true;
    player.classList.add("jump");

    //Once animation is over remove the jump class
    player.addEventListener("animationend", () => {
        player.classList.remove("jump");
        isJumping = false;
    }, { once: true });
}

// Event listener for the spacebar
window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        jump();
    }else{
        return null;
    }
});

function checkCollision() {
    //Bounding rectangles of the player and obstacle
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    //Check if the rectangles collide
    if (
        playerRect.left <= obstacleRect.right &&
        playerRect.right >= obstacleRect.left &&
        playerRect.top <= obstacleRect.bottom &&
        playerRect.bottom >= obstacleRect.top
    ) {
        gameOver = true;
        endGame();
    }
}

function endGame() {
    obstacle.style.animation = 'none';
    //alert("Game Over! You collided with the obstacle.");
    gameOverModal.style.display = 'flex';
}


playAgain.addEventListener("click", () => {
    gameOverModal.style.display = 'none'; 
    gameLoop();
});


exitGame.addEventListener("click", () => {
    gameOverModal.style.display = 'none'; 
  
});


//Continuously check for collision
function gameLoop() {
    if (!gameOver) {
        checkCollision();
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();