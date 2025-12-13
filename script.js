'use strict';

const p1 = {
  class: '.player--0',
  nameId: '#name--0',
  scoreId: '#score--0',
  currentId: '#current--0',
  defaultName: 'Player 1',
  total: 0,
  current: 0,
};

const p2 = {
  class: '.player--1',
  nameId: '#name--1',
  scoreId: '#score--1',
  currentId: '#current--1',
  defaultName: 'Player 2',
  total: 0,
  current: 0,
};

const dice = document.querySelector('.dice');
const modal = document.querySelector('.modal');
const pList = [p1, p2];

let winningScore = 50; // Default Medium
let isFinished = false;
let currentPlayer = 0;

// ==================== MODAL ====================
function toggleSettings() {
  modal.classList.toggle('hidden');
}

function setDifficulty(score, btn) {
  winningScore = score;
  // Update active button
  document.querySelectorAll('.btn-diff').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // Reset game with new difficulty
  resetGame();
}

// ==================== GAME LOGIC ====================
function getPlayerName(player) {
  return document.querySelector(player.nameId).textContent.trim() || player.defaultName;
}

function resetPlayer(player) {
  player.total = 0;
  player.current = 0;
  // Reset name to current DOM value or default (preserve user edits initially)
  const nameEl = document.querySelector(player.nameId);
  // Only reset to default if it contains "Wins"
  if (nameEl.textContent.includes('Wins')) {
    nameEl.textContent = player.defaultName;
  }
  document.querySelector(player.class).classList.remove('player--winner');
}

function updateDisplay() {
  document
    .querySelector(pList[currentPlayer].class)
    .classList.add('player--active');
  document
    .querySelector(pList[1 ^ currentPlayer].class)
    .classList.remove('player--active');
  for (let player of pList) {
    document.querySelector(player.scoreId).textContent = player.total;
    document.querySelector(player.currentId).textContent = player.current;
  }
}

function holdTurn() {
  if (isFinished) return;
  pList[currentPlayer].total += pList[currentPlayer].current;
  pList[currentPlayer].current = 0;
  if (pList[currentPlayer].total >= winningScore) {
    isFinished = true;
    document
      .querySelector(pList[currentPlayer].class)
      .classList.add('player--winner');
    document.querySelector(pList[currentPlayer].nameId).textContent =
      getPlayerName(pList[currentPlayer]) + ' Wins!! 🏆';
  } else {
    currentPlayer = 1 ^ currentPlayer;
  }
  updateDisplay();
}

function rollDice() {
  if (isFinished) return;
  const diceValue = Math.floor(Math.random() * 6) + 1; // Fixed: 1-6

  const dice_img = `dice-${diceValue}.png`;
  dice.src = dice_img;

  if (diceValue === 1) {
    pList[currentPlayer].current = 0; // Only lose current, not total
    currentPlayer = 1 ^ currentPlayer;
  } else {
    pList[currentPlayer].current += diceValue;
  }

  updateDisplay();
}

function resetGame() {
  currentPlayer = 0;
  isFinished = false;
  for (let p of pList) resetPlayer(p);
  updateDisplay();
}

resetGame();
