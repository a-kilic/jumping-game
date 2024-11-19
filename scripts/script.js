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

function randomizeObstacleSize() {
  obstacle.classList.remove('small', 'large'); 

  const isLarge = Math.random() > 0.5; 
  obstacle.classList.add(isLarge ? 'large' : 'small');
}

function toggleModal(modal, show) {
  if (show) {
    modal.classList.add("show");
  } else {
    modal.classList.remove("show");
  }
}

function startGameHandler() {
  toggleModal(welcomeModal, false);
  gameStarted = true;
  obstacle.classList.add("running");
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
  obstacle.classList.remove("running"); 
  toggleModal(gameOverModal, true); 

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
  }
}

restartGame.addEventListener("click", () => {
  toggleModal(gameOverModal, false); 
  resetGame();
});

obstacle.addEventListener('animationiteration', () => {
  randomizeObstacleSize(); 
});

function resetGame() {
  gameOver = false;
  score = 0;
  currentScoreElement.textContent = score;

  randomizeObstacleSize(); 
  
  obstacle.classList.remove('running'); 
  setTimeout(() => {
    obstacle.classList.add('running'); 
  }, 100);

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

toggleModal(welcomeModal, true);
startGame.addEventListener("click", startGameHandler);

