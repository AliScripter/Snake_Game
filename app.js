// game constans & variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('./music/food.mp3');
const gameOverSound = new Audio('./music/gameover.mp3');
const moveSound = new Audio('./music/move.mp3');
const musicSound = new Audio('./music/music.mp3');
let speed = 2;
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

function isCollide(sarr) {
  return false;
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

  if (sankeArr[0].y === food.y && sankeArr[0].x === food.x) 
    sankeArr.unshift({x : sankeArr[0].x + inputDir.x , y : sankeArr[0].y + inputDir.y})
  }


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
