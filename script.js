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
let soundEnabled = true; // Sound toggle state

// ==================== SOUND EFFECTS ====================
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  const btn = document.getElementById('sound-toggle');
  btn.textContent = soundEnabled ? '🔊' : '🔇';
}

function playSound(type) {
  if (!soundEnabled) return; // Check if sound is enabled
  initAudio();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  switch (type) {
    case 'click':
      oscillator.frequency.value = 600;
      oscillator.type = 'sine';
      gainNode.gain.value = 0.1;
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.05);
      break;
    case 'roll':
      oscillator.frequency.value = 200;
      oscillator.type = 'square';
      gainNode.gain.value = 0.08;
      oscillator.start();
      oscillator.frequency.linearRampToValueAtTime(400, audioCtx.currentTime + 0.1);
      oscillator.stop(audioCtx.currentTime + 0.15);
      break;
    case 'win':
      // Play a simple fanfare
      const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = freq;
        osc.type = 'sine';
        gain.gain.value = 0.15;
        osc.start(audioCtx.currentTime + i * 0.15);
        osc.stop(audioCtx.currentTime + i * 0.15 + 0.3);
      });
      return; // Don't start the main oscillator
    case 'lose':
      oscillator.frequency.value = 150;
      oscillator.type = 'sawtooth';
      gainNode.gain.value = 0.1;
      oscillator.start();
      oscillator.frequency.linearRampToValueAtTime(80, audioCtx.currentTime + 0.2);
      oscillator.stop(audioCtx.currentTime + 0.25);
      break;
  }
}

// ==================== CONFETTI ====================
function triggerConfetti() {
  if (typeof confetti === 'function') {
    // Burst from both sides
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.1, y: 0.6 }
    });
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.9, y: 0.6 }
    });
  }
}

// ==================== MODAL ====================
function toggleSettings() {
  playSound('click');
  modal.classList.toggle('hidden');
}

function setDifficulty(score, btn) {
  playSound('click');
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
  playSound('click');
  pList[currentPlayer].total += pList[currentPlayer].current;
  pList[currentPlayer].current = 0;
  if (pList[currentPlayer].total >= winningScore) {
    isFinished = true;
    document
      .querySelector(pList[currentPlayer].class)
      .classList.add('player--winner');
    document.querySelector(pList[currentPlayer].nameId).textContent =
      getPlayerName(pList[currentPlayer]) + ' Wins!! 🏆';
    playSound('win');
    triggerConfetti();
  } else {
    currentPlayer = 1 ^ currentPlayer;
  }
  updateDisplay();
}

function rollDice() {
  if (isFinished) return;
  playSound('roll');
  const diceValue = Math.floor(Math.random() * 6) + 1;

  const dice_img = `dice-${diceValue}.png`;
  dice.src = dice_img;

  if (diceValue === 1) {
    playSound('lose');
    pList[currentPlayer].current = 0;
    currentPlayer = 1 ^ currentPlayer;
  } else {
    pList[currentPlayer].current += diceValue;
  }

  updateDisplay();
}

function resetGame() {
  playSound('click');
  currentPlayer = 0;
  isFinished = false;
  for (let p of pList) resetPlayer(p);
  updateDisplay();
}

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
  // Ignore if user is typing in a contenteditable element
  if (e.target.isContentEditable) return;
  
  switch (e.key.toLowerCase()) {
    case 'r':
      rollDice();
      break;
    case 'h':
      holdTurn();
      break;
    case 'n':
      resetGame();
      break;
    case 'escape':
      if (!modal.classList.contains('hidden')) {
        toggleSettings();
      }
      break;
  }
});

resetGame();

