// p5.js functions
/* global
 *    HSB, background, collideCircleCircle, color, colorMode, createCanvas, ellipse, height,
 *    mouseX, mouseY, random, rect, stroke, strokeWeight, text, width, createButton, floor, fill, LEFT, CENTER, textSize, textAlign, textFont

Functions:
Timer of 1000, Game Over
X Circle attached to the cursor
Colliding the cursor with the drawn shape
Incrementing score after collision
Random reset of coin's location after collision
 
 */

let brushHue,
  backgroundColor,
  coinX,
  coinY,
  score,
  time,
  gameIsOver,
  hit,
  hitPowerUpCoin,
  resetButton,
  coinValue,
  highScore,
  powerUpCoinX,
  powerUpCoinY,
  showPowerUpCoin;

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  backgroundColor = 95;

  // Initialize game.
  resetGame();
  // outside of resetGame to live past individual round.
  highScore = 0;

  resetButton = createButton("RESET GAME");
  resetButton.mousePressed(resetGame);
}

function draw() {
  background(backgroundColor);
  textFont('Courier New');
  if (!gameIsOver) {
    
    handleTime();
    handleCollision();

    // Draw the coin
    fill(50, coinValue * 20, 100); // Saturation 20, 40, 60, 80, 100
    ellipse(coinX, coinY, 20);
    fill(0, 0, 0);
    text(coinValue, coinX - 3, coinY + 3);

    // Draw powerup coin.
    if (showPowerUpCoin) {
      fill(0, 100, 100); // RED
      ellipse(powerUpCoinX, powerUpCoinY, 10);
    }

    // Cursor at the mouse position
    fill(0, 0, 100);
    ellipse(mouseX, mouseY, 20);

    fill(0, 0, 0); // Black
    // Text with the time remaining:
    text(`High Score: ${highScore}`, 20, 20);
    text(`Current score: ${score}`, 20, 40);
    text(`Time remaining: ${time}`, 20, 60);

    text(`Colliding: ${hit}`, 20, 100);
  } else {
    fill(0, 100, 100); // RED
    textSize(50);
    textAlign(CENTER);
    text(`GAME OVER`, 200, 200);
    textSize(30);
    text(`SCORE: ${score}`,200, 230);
    if(score == highScore) {
      text(`NEW HIGH SCORE!!`, 200, 260);
    }
    text(`HIGH SCORE: ${highScore}`, 200, 290);
    
  }
}

function handleCollision() {
  // What happens if your cursor hits a coin.
  hit = collideCircleCircle(coinX, coinY, 20, mouseX, mouseY, 20);
  if (hit) {
    score += coinValue;
    if (highScore < score) {
      highScore = score;
    }
    moveCoin();
  }

  if (showPowerUpCoin) {
    hitPowerUpCoin = collideCircleCircle(
      powerUpCoinX,
      powerUpCoinY,
      10,
      mouseX,
      mouseY,
      20
    );
    // Increase time.
    // hide the PowerUpCoin.
    // Move PowerUpCoin.
    if (hitPowerUpCoin) {
      time += 500;
      showPowerUpCoin = false;
      movePowerUpCoin();
    }
  }
}

function handleTime() {
  // Code to handle the time.
  if (time > 0) {
    if (time < 75) {
      showPowerUpCoin = true;
    }
    time -= 1;
  } else {
    gameIsOver = true;
  }
}

function moveCoin() {
  coinX = random(width);
  coinY = random(height);
  coinValue = floor(random(5)) + 1; // 0 ~ 4.999999 -> 1,2,3,4,5
  // random(5) -> [0~4.999999]
  // floor(random(5)) -> [0, 1, 2, 3, 4]
  // floor(random(5)) + 1 -> [1, 2, 3, 4, 5]
}
function movePowerUpCoin() {
  // Move the powerup coin.
  powerUpCoinX = random(width);
  powerUpCoinY = random(height);
}

function resetGame() {
  // Get random coordinates for the starting position of the coin (coinX, coinY)
  moveCoin();
  movePowerUpCoin();
  
  textSize(12);
  textAlign(LEFT);
  
  time = 200;
  gameIsOver = false;
  hit = false;
  score = 0;
  coinValue = 1;
  showPowerUpCoin = false;
}
