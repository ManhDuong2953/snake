const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const scoreElements = document.querySelector(".score");
const snakeEat = new Audio();
const snakeDie = new Audio();
snakeEat.src = "./asset/food_G1U6tlb.mp3";
snakeDie.src = "./asset/gameover.mp3";

const grid = 20;
var speed = 5;
var score = 0;
const snake = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  dx: grid,
  dy: 0,
  color: "green",
  cells: [],
  maxCell: 4,
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const food = {
  x: getRandomInt(0, grid) * grid,
  y: getRandomInt(0, grid) * grid,
  color: "red",
};

// var count = 0;

context.fillStyle = "rgba(255, 255, 255,1)";
context.font = "20px Verdana";
context.fillText("Score: " + score, 20, 30);
const gameLoopPlayer = () => {
  // requestAnimationFrame(gameLoopPlayer);
  // if (++count < speed) return;
  // count = 0;

  context.clearRect(0, 0, canvas.width, canvas.height);
  snake.x += snake.dx;
  snake.y += snake.dy;
  if (snake.x >= canvas.width) {
    snake.x = 0;
  } else if (snake.x < 0) {
    snake.x = canvas.width;
  }
  if (snake.y >= canvas.height) {
    snake.y = 0;
  } else if (snake.y < 0) {
    snake.y = canvas.height;
  }

  snake.cells.unshift({ x: snake.x, y: snake.y });

  if (snake.cells.length > snake.maxCell) {
    snake.cells.pop();
  }

  context.fillStyle = food.color;
  context.fillRect(food.x, food.y, grid - 1, grid - 1);
  if (snake.cells[0].x === food.x && snake.cells[0].y === food.y) {
    snakeEat.play();
    snake.maxCell++;
    score++;
    if (score % 5 == 0 && score !== 0) {
      speed += 1;
      console.log(speed);
    }
    scoreElements.innerHTML = "Score: " + score;
    food.x = getRandomInt(0, grid) * grid;
    food.y = getRandomInt(0, grid) * grid;
  }

  snake.cells.forEach((cell, index) => {
    context.fillStyle = snake.color;
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    for (let i = index + 1; i < snake.cells.length; i++) {
      if (snake.cells[i].x == cell.x && snake.cells[i].y == cell.y) {
        snakeDie.play();
        snake.x = canvas.width / 2;
        snake.y = canvas.height / 2;
        food.x = getRandomInt(0, grid) * grid;
        food.y = getRandomInt(0, grid) * grid;
        snake.cells = [];
        score = 0;
        snake.maxCell = 4;
      }
    }
  });
  setTimeout(gameLoopPlayer, 1000 / speed);
};
// requestAnimationFrame(gameLoopPlayer);
gameLoopPlayer();
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft" && snake.dx === 0) {
    snake.dy = 0;
    snake.dx = -grid;
  } else if (e.key === "ArrowUp" && snake.dy === 0) {
    snake.dx = 0;
    snake.dy = -grid;
  } else if (e.key === "ArrowRight" && snake.dx === 0) {
    snake.dy = 0;
    snake.dx = grid;
  } else if (e.key === "ArrowDown" && snake.dy === 0) {
    snake.dx = 0;
    snake.dy = grid;
  }
});
