'use strict';

const p1 = {
  class: '.player--0',
  nameId: '#name--0',
  scoreId: '#score--0',
  currentId: '#current--0',
  name: 'Player 1',
  total: 0,
  current: 0,
};

const p2 = {
  class: '.player--1',
  nameId: '#name--1',
  scoreId: '#score--1',
  currentId: '#current--1',
  name: 'Player 2',
  total: 0,
  current: 0,
};

const dice = document.querySelector('.dice');
const target = 100;
const pList = [p1, p2];
let isFinished = false;
let currentPlayer = 0;

function resetPlayer(player) {
  player.total = 0;
  player.current = 0;
  document.querySelector(player.nameId).textContent = player.name;
  document.querySelector(player.class).classList.remove('player--winner');
}

function updateDisplay() {
  //   if (isFinished) {
  //     document.querySelector('.holder').style.visibilty = 0;
  //   } else {
  //     document.querySelector('.holder').style.visibilty = 1;
  //   }
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
  pList[currentPlayer].total += pList[currentPlayer].current;
  pList[currentPlayer].current = 0;
  if (pList[currentPlayer].total >= target) {
    isFinished = true;
    document
      .querySelector(pList[currentPlayer].class)
      .classList.add('player--winner');
    document.querySelector(pList[currentPlayer].nameId).textContent =
      pList[currentPlayer].name + ' Wins!! ';
  } else currentPlayer = 1 ^ currentPlayer;
  updateDisplay();
}

function rollDice() {
  if (isFinished) return;
  const diceValue = Math.floor(Math.random() * 4) + 2;

  const dice_img = `dice-${diceValue}.png`;
  dice.src = dice_img;

  if (diceValue == 1) {
    pList[currentPlayer].total = 0;
    pList[currentPlayer].current = 0;
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
