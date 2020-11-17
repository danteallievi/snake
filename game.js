import {
  update as updateSnake,
  draw as drawSnake,
  getSnakeHead,
  snakeIntersection,
} from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';

// HTML Elements
const easyBtn = document.getElementById('easy');
const mediumBtn = document.getElementById('medium');
const hardBtn = document.getElementById('hard');
const introScreen = document.querySelector('.intro');
const gameBoard = document.getElementById('game-board');

// Variables
let SNAKE_SPEED = 1;
let lastRenderTime = 0;
let gameOver = false;

// Main Function
function main(currentTime) {
  easyBtn.addEventListener('click', () => {
    introScreen.classList.add('fadeOut');
    gameBoard.classList.add('fadeIn');
    SNAKE_SPEED = 5;
  });

  mediumBtn.addEventListener('click', () => {
    introScreen.classList.add('fadeOut');
    gameBoard.classList.add('fadeIn');
    SNAKE_SPEED = 10;
  });

  hardBtn.addEventListener('click', () => {
    introScreen.classList.add('fadeOut');
    gameBoard.classList.add('fadeIn');
    SNAKE_SPEED = 16;
  });

  if (gameOver) {
    if (confirm('You lost. Press OK to try again.')) {
      window.location = '/';
    }
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

// Functions

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
