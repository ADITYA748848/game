let player = document.getElementById('player');
let star = document.getElementById('star');
let scoreElement = document.getElementById('score');
let leftBtn = document.getElementById('leftBtn');
let rightBtn = document.getElementById('rightBtn');
let restartBtn = document.getElementById('restartBtn');

let playerPosition = 175; // Starting position
let score = 0;
let starSpeed = 3000; // Time for star to fall
let gameInterval; // Holds the interval for star dropping

document.addEventListener('keydown', movePlayer);
leftBtn.addEventListener('click', () => movePlayer({ key: 'ArrowLeft' }));
rightBtn.addEventListener('click', () => movePlayer({ key: 'ArrowRight' }));
restartBtn.addEventListener('click', restartGame);

// Function to move player left or right
function movePlayer(event) {
  if (event.key === 'ArrowLeft' && playerPosition > 0) {
    playerPosition -= 20;
  } else if (event.key === 'ArrowRight' && playerPosition < 350) {
    playerPosition += 20;
  }
  player.style.left = playerPosition + 'px';
}

// Function to randomly position and drop the star
function dropStar() {
  let starPosition = Math.floor(Math.random() * 370);
  star.style.left = starPosition + 'px';
  star.style.animation = `fall ${starSpeed / 1000}s linear`;

  setTimeout(() => {
    checkCollision();
    star.style.top = '-30px';
  }, starSpeed);
}

// Function to check for collision between player and star
function checkCollision() {
  let starLeft = parseInt(star.style.left);
  let playerLeft = playerPosition;
  let starTop = parseInt(window.getComputedStyle(star).top);

  // Check if the star is within the player's catching area
  if (starTop >= 520 && starLeft >= playerLeft && starLeft <= playerLeft + 50) {
    score += 10;
    scoreElement.textContent = score;
    // Increase speed after catching a star
    if (starSpeed > 1000) starSpeed -= 100;
  }
}

// Function to start or restart the game
function startGame() {
  score = 0;
  scoreElement.textContent = score;
  playerPosition = 175;
  player.style.left = playerPosition + 'px';
  starSpeed = 3000; // Reset speed
  clearInterval(gameInterval);
  
  // Start the star falling at intervals
  gameInterval = setInterval(dropStar, starSpeed);
}

// Function to restart the game
function restartGame() {
  star.style.top = '-30px'; // Reset star position
  startGame(); // Start game again
}

// Start the game for the first time
startGame();
