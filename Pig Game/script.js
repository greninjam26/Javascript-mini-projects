"use strict";

// Selecting elements
const playersEl = [document.querySelector(".player1"), document.querySelector(".player2")];
const currentScoresEl = document.querySelectorAll(".current-score");
const totalScoresEl = document.querySelectorAll(".total-score");
const btnNewGameEl = document.querySelector(".btn-restart");
const btnRollEl = document.querySelector(".btn-roll");
const btnHoldEl = document.querySelector(".btn-hold");
const diceEl = document.querySelector(".dice");

// Starting conditionsbtn
let currentScore = 0
let scores = [0, 0];
let currentPlayer = 0;
diceEl.classList.add("hidden");

// switch to the other player
function swapPlayer() {
    currentScore = 0;
    currentScoresEl[currentPlayer].textContent = currentScore;
    playersEl[currentPlayer].classList.remove("player-active");
    currentPlayer = currentPlayer ? 0 : 1;
    playersEl[currentPlayer].classList.add("player-active");
}

// rolling dice
btnRollEl.addEventListener("click", function () {
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    // display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${diceRoll}.png`;
    if (diceRoll === 1) {
        swapPlayer();
    } else {
        currentScore += diceRoll;
        currentScoresEl[currentPlayer].textContent = currentScore;
    }
});

// hold the score
btnHoldEl.addEventListener("click", function () {
    scores[currentPlayer] += currentScore;
    totalScoresEl[currentPlayer].textContent = scores[currentPlayer];
    if (scores[currentPlayer] >= 100) {
        playersEl[currentPlayer].classList.add("player-winner");
        // lock the buttons
    } else {
        swapPlayer();
    }
});

// reset the game
btnNewGameEl.addEventListener("click", function () {
    currentScore = 0
    scores = [0, 0];
    currentPlayer = 0;
    for (let i = 0; i < 2; i++) {
        currentScoresEl[i].textContent = 0;
        totalScoresEl[i].textContent = 0;
        playersEl[i].classList.remove("player-winner");
        playersEl[i].classList.remove("player-active");
    }
    playersEl[0].classList.add("player-active");
    diceEl.classList.add("hidden");
});
