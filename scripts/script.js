const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const gameOverModal = document.getElementById("gameOverModal");
const playAgain = document.getElementById("playAgain");
const exitGame = document.getElementById("exitGame");

let isJumping = false;
let gameOver = false;

function jump() {
  if (isJumping) return;

  isJumping = true;
  player.classList.add("jump");

  player.addEventListener(
    "animationend",
    () => {
      player.classList.remove("jump");
      isJumping = false;
    },
    { once: true }
  );
}

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    jump();
  } else {
    return null;
  }
});

function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

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
  obstacle.style.animation = "none";
  gameOverModal.style.display = "flex";
}

playAgain.addEventListener("click", () => {
  gameOverModal.style.display = "none";
  gameLoop();
});

exitGame.addEventListener("click", () => {
  gameOverModal.style.display = "none";
});

function gameLoop() {
  if (!gameOver) {
    checkCollision();
    requestAnimationFrame(gameLoop);
  }
}

gameLoop();
