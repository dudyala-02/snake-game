let snakeParts = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let score = 0;
let direction = 'right';

document.getElementById('start-game').addEventListener('click', startGame);

function startGame() {
  document.getElementById('start-game').disabled = true;
  generateFood();
  updateGame();
}

function updateGame() {
  moveSnake();
  checkForCollision();
  updateScore();
  renderGame();
  setTimeout(updateGame, 300);
}

function moveSnake() {
  let newX = snakeParts[0].x;
  let newY = snakeParts[0].y;

  switch (direction) {
    case 'right':
      newX++;
      break;
    case 'left':
      newX--;
      break;
    case 'up':
      newY--;
      break;
    case 'down':
      newY++;
      break;
  }

  snakeParts.unshift({ x: newX, y: newY });

  if (snakeParts.length > score + 1) {
    snakeParts.pop();
  }
}

function checkForCollision() {
  if (snakeParts[0].x < 0 || snakeParts[0].x > 19 || snakeParts[0].y < 0 || snakeParts[0].y > 19) {
    alert('Game Over!');
    document.getElementById('start-game').disabled = false;
  }

  for (let i = 1; i < snakeParts.length; i++) {
    if (snakeParts[0].x === snakeParts[i].x && snakeParts[0].y === snakeParts[i].y) {
      alert('Game Over!');
      document.getElementById('start-game').disabled = false;
    }
  }

  if (snakeParts[0].x === food.x && snakeParts[0].y === food.y) {
    score++;
    generateFood();
  }
}

function generateFood() {
  food.x = Math.floor(Math.random() * 20);
  food.y = Math.floor(Math.random() * 20);
}

function updateScore() {
  document.getElementById('game-score').innerHTML = `Score: ${score}`;
}

function renderGame() {
  let gameGrid = document.getElementById('game-grid');
  gameGrid.innerHTML = '';

  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      let gridCell = document.createElement('div');
      gridCell.className = 'grid-cell';

      if (i === food.x && j === food.y) {
        gridCell.className += ' food';
      }

      for (let k = 0; k < snakeParts.length; k++) {
        if (i === snakeParts[k].x && j === snakeParts[k].y) {
          gridCell.className += ' snake-part';
        }
      }

      gameGrid.appendChild(gridCell);
    }
  }
}

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowRight':
      direction = 'down';
      break;
    case 'ArrowLeft':
      direction = 'up';
      break;
    case 'ArrowUp':
      direction = 'left';
      break;
    case 'ArrowDown':
      direction = 'right';
      break;
  }
});
