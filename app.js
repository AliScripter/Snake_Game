// game constans & variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('./music/food.mp3');
const gameOverSound = new Audio('./music/gameover.mp3');
const moveSound = new Audio('./music/move.mp3');
const musicSound = new Audio('./music/music.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let sankeArr = [{ x: 13, y: 15 }];

food = { x: 6, y: 7 };

// Game functions

function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  // If you bump into yourself

  for (let i = 1; i < sankeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }

    // If you bump into the wall
    // number 18 is in css grid game board
    if (
      snake[0].x >= 18 ||
      snake[0].x <= 0 ||
      snake[0].y >= 18 ||
      snake[0].y <= 0
    ) {
      return true;
    }
  }
}

function gameEngine() {
  // Part 1 : Updating the snake array & food
  if (isCollide(sankeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert(`Game Over . press any key to play again !`);
    sankeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
  }

  // if you have eaten the food , increment the score and regenerate the food

  if (sankeArr[0].y === food.y && sankeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (score > high_score_vall) {
      high_score_vall = score;
      localStorage.setItem(`hiscore`, JSON.stringify(high_score_vall));
      higheScoreBox.innerHTML = `High Score : ${higher_score_vall}`;
    }
    scoreBox.innerHTML = `Score : ${score}`;
    sankeArr.unshift({
      x: sankeArr[0].x + inputDir.x,
      y: sankeArr[0].y + inputDir.y,
    });

    let a = 2;
    let b = 16;
    food = {
      x: 2 + Math.round(a + (b - a) * Math.random()),
      y: 2 + Math.round(a + (b - a) * Math.random()),
    };
  }

  // Moving the snake
  for (let i = sankeArr.length - 2; i >= 0; i--) {
    sankeArr[i + 1] = { ...sankeArr[i] };
  }

  sankeArr[0].x += inputDir.x;
  sankeArr[0].y += inputDir.y;

  // Part 2 : Display the snake and food
  // Display the snake

  board.innerHTML = ``;
  sankeArr.forEach((e, index) => {
    snakeElement = document.createElement(`div`);
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add(`head`);
    } else {
      snakeElement.classList.add(`snake`);
    }
    board.appendChild(snakeElement);
  });

  // Display the food
  foodElement = document.createElement(`div`);
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add(`food`);
  board.appendChild(foodElement);
}

// Main logic starts here
musicSound.play();
let higher_score = localStorage.getItem(`hiscore`);
if (higher_score === null) {
  let high_score_vall = 0;
  localStorage.setItem(`hiscore`, JSON.stringify(high_score_vall));
} else {
  high_score_vall = JSON.parse(localStorage.getItem(`hiscore`));
  higheScoreBox.innerHTML = `High Score : ${higher_score}`;
}

window.requestAnimationFrame(main);
window.addEventListener(`keydown`, e => {
  inputDir = { x: 0, y: 1 }; // start the game
  moveSound.play();

  switch (e.key) {
    case 'ArrowUp':
      console.log(`Arrow Up`);
      inputDir.x = 0;
      inputDir.y = -1;

      break;
    case 'ArrowDown':
      console.log(`Arrow Dwon`);
      inputDir.x = 0;
      inputDir.y = 1;

      break;
    case 'ArrowLeft':
      console.log(`Arrow Left`);
      inputDir.x = -1;
      inputDir.y = 0;

      break;
    case 'ArrowRight':
      console.log(`Arrow Right`);
      inputDir.x = 1;
      inputDir.y = 0;

      break;

    default:
      break;
  }
});
