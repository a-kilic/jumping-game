const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const welcomeModal = document.getElementById("welcomeModal");
const gameOverModal = document.getElementById("gameOverModal");
const startGame = document.getElementById("startGame");
const restartGame = document.getElementById("restartGame");
const currentScoreElement = document.getElementById("currentScore");
const highScoreElement = document.getElementById("highScore");

let gameStarted = false;
let isJumping = false;
let gameOver = false;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

highScoreElement.textContent = highScore;

function showWelcomeModal() {
  welcomeModal.style.display = "flex";
}

function startGameHandler() {
  welcomeModal.style.display = "none";
  gameStarted = true;
  obstacle.style.animationPlayState = "running";
  gameLoop();
}

function jump() {
  if (isJumping || !gameStarted) return;

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

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
  }
}

restartGame.addEventListener("click", () => {
  gameOverModal.style.display = "none";
  resetGame();
});

function resetGame() {
  gameOver = false;
  score = 0;
  currentScoreElement.textContent = score;
  obstacle.style.animation = "";
  obstacle.style.animationPlayState = "running";
  gameLoop();
}

function updateScore() {
  if (!gameOver) {
    score++;
    currentScoreElement.textContent = score;

    if (score > highScore) {
      highScoreElement.textContent = score;
    }
  }
}

function gameLoop() {
  if (!gameOver && gameStarted) {
    checkCollision();
    updateScore();
    requestAnimationFrame(gameLoop);
  }
}

showWelcomeModal();
startGame.addEventListener("click", startGameHandler);
