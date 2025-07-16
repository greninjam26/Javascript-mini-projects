"use strict";

// Selecting elements
const playersEl = [
    document.querySelector(".player1"),
    document.querySelector(".player2"),
];
const currentScoresEl = document.querySelectorAll(".current-score");
const totalScoresEl = document.querySelectorAll(".total-score");
const btnNewGameEl = document.querySelector(".btn-restart");
const btnRollEl = document.querySelector(".btn-roll");
const btnHoldEl = document.querySelector(".btn-hold");
const diceEl = document.querySelector(".dice");

// Starting conditions
let scores, currentScore, currentPlayer, playing;
function initialValue() {
    scores = [0, 0];
    currentScore = 0;
    currentPlayer = 0;
    playing = true;
    for (let i = 0; i < 2; i++) {
        currentScoresEl[i].textContent = 0;
        totalScoresEl[i].textContent = 0;
        playersEl[i].classList.remove("player-winner");
        playersEl[i].classList.remove("player-active");
    }

    playersEl[0].classList.add("player-active");
    diceEl.classList.add("hidden");
}
initialValue();

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
    if (playing) {
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
    }
});

// hold the score
btnHoldEl.addEventListener("click", function () {
    if (playing) {
        scores[currentPlayer] += currentScore;
        totalScoresEl[currentPlayer].textContent = scores[currentPlayer];
        if (scores[currentPlayer] >= 100) {
            playing = false;
            playersEl[currentPlayer].classList.add("player-winner");
            diceEl.classList.add("hidden");
            // lock the buttons
        } else {
            swapPlayer();
        }
    }
});

// reset the game
btnNewGameEl.addEventListener("click", initialValue);
