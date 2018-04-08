// Define canvas propertries
const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

// Get width and height of canvas
const cvsW = cvs.width;
const cvsH = cvs.height;

// Define snake propertries
const snakeW = 10;
const snakeH = 10;
const snakeHeadColour = "#006400";
const snakeBodyColour = "#32CD32";

// Default snake direction
var direction = "right";

// Game settings
const easy = 100;
const medium = 75;
const hard = 50;
var gameDifficulty = easy;
var score = 0;

// Images
var appleImg = new Image();
appleImg.src = "apple.png";

// Fuunction to update snake direction based on user keypress
function getDirection(b){
  if (b.keyCode == 37  && direction != "right")
    direction = "left";
  else if (b.keyCode == 38 && direction != "down")
    direction = "up";
  else if (b.keyCode == 39 && direction != "left")
    direction = "right";
  else if (b.keyCode == 40 && direction != "up")
    direction = "down";
}

// Function to draw snake
function drawSnake(x,y, head) {
  ctx.fillStyle = (head) ? snakeHeadColour : snakeBodyColour;
  // Parms: x_cord, y_cord, width, hieght
  ctx.fillRect(x*snakeW, y*snakeH, snakeW, snakeH);

  ctx.fillStyle = "#000";
  ctx.strokeRect(x*snakeW, y*snakeH,snakeW, snakeH);
}

// Create snake object. By default start snake with length 5
var snake_length = 5;
var snake = [];

for (var i = snake_length-1; i >= 0; i--) {
  snake.push({x:i,y:0});
}

// Create food object. X,Y coordinates are random
food = {
  x: Math.round(Math.random()*(cvsW/snakeW-1)),
  y: Math.round(Math.random()*(cvsH/snakeH-1))
}

// Function to draw food
function drawFood(x,y) {
  ctx.drawImage(appleImg, x*snakeW, y*snakeH, snakeW, snakeH);
}

// Function to check for collosion with snake body
function checkCollosion(x_x,y_y,array) {
  for (var i = 1; i < array.length-1; i++){
    if (x_x == array[i].x && y_y == array[i].y)
      return true;
  }
  return false;
}

// Funciton to draw score on canvas
function drawScore(points){
  ctx.fillStyle = 'yellow';
  ctx.font="15px Calibri";
  ctx.fillText('Score: '+ points, 2, cvsH-5)
}

// Draw everything on canvas and play game
function playGame() {
  // Clear canvas before drawing
  ctx.clearRect(0,0,cvsW, cvsH);

  for (var i=0; i<snake.length; i++){
    var x = snake[i].x;
    var y = snake[i].y;

    if (i == 0)
      drawSnake(x,y, true);
    else
      drawSnake(x,y, false);
  }

  // Draw food
  drawFood(food.x, food.y);

  // Snake head
  var snakeHeadX = snake[0].x;
  var snakeHeadY = snake[0].y;

  // If snake hits wall or self, game over
  if (snakeHeadX < 0 || snakeHeadY < 0 || snakeHeadX >= cvsW/snakeW ||
    snakeHeadY >= cvsH/snakeH || checkCollosion(snakeHeadX, snakeHeadY, snake)){
      alert("Game Over! Your score: " + score );
      location.reload();
  }
  // Create new head depending on prev head and direction
  if (direction == "left")
    snakeHeadX--;
  else if (direction == "up")
    snakeHeadY--;
  else if (direction == "right")
    snakeHeadX++;
  else if (direction == "down")
    snakeHeadY++;

  // First check if snake eats food
  if (snakeHeadX == food.x && snakeHeadY == food.y) {
    // Update Score
    score++;
    // Generate a new food
    food = {
      x: Math.round(Math.random()*(cvsW/snakeW-1)),
      y: Math.round(Math.random()*(cvsH/snakeH-1))
    }
  }
  else {
    // Only pop off tail if food was not eaten
    snake.pop();
  }
  // Update new head of snake
  var newHead = {
    x: snakeHeadX,
    y: snakeHeadY
  };
  snake.unshift(newHead);

  // Update score
  drawScore(score);
}

// Event listener for keypress to determine snake's direction
document.addEventListener ("keydown", getDirection);

// Event listeners for difficulty level
document.getElementById("easyBtn").addEventListener("click", function(){
  gameDifficulty = easy;
});
document.getElementById("medBtn").addEventListener("click", function(){
    gameDifficulty = medium;
});
document.getElementById("hardBtn").addEventListener("click", function(){
    gameDifficulty = hard;
});

document.getElementById("startBtn").addEventListener("click", function(){
  this.style.display = 'none'
  // Start gane
  setInterval(playGame, gameDifficulty);
});
