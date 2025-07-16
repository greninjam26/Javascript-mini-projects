"use strict";

const player = [document.querySelector(".player1"), document.querySelector(".player2")];
const currentScore = document.querySelectorAll(".current-score");
const totalScores = document.querySelectorAll(".total-score");
const newGame = document.querySelector(".btn-restart");
const roll = document.querySelector(".btn-roll");
const hold = document.querySelector(".btn-hold");
const dice = document.querySelector(".dice");

let scores = [0, 0];
let points = [0, 0];
let currentPlayer = 0;

dice.style.display = "none";

function swapPlayer() {
    scores[currentPlayer] = 0;
    currentScore[currentPlayer].textContent = scores[currentPlayer];
    player[currentPlayer].classList.remove("player-active");
    if (currentPlayer) {
        currentPlayer = 0;
    } else {
        currentPlayer = 1;
    }
    player[currentPlayer].classList.add("player-active");
}

roll.addEventListener("click", function () {
    let diceRoll = Math.trunc(Math.random() * 6) + 1;
    // display dice
    if (diceRoll === 1) {
        swapPlayer();
    } else {
        scores[currentPlayer] += diceRoll;
        currentScore[currentPlayer].textContent = scores[currentPlayer];
    }
});

hold.addEventListener("click", function () {
    points[currentPlayer] += scores[currentPlayer];
    totalScores[currentPlayer].textContent = points[currentPlayer];
    if (points[currentPlayer] >= 100) {
        player[currentPlayer].classList.add("player-winner");
        // lock the buttons
    } else {
        swapPlayer();
    }
});

newGame.addEventListener("click", function () {
    scores = [0, 0];
    points = [0, 0];
    currentPlayer = 0;
    for (let i = 0; i < 2; i++) {
        currentScore[i].textContent = 0;
        totalScores[i].textContent = 0;
        player[currentPlayer].classList.remove("player-winner");
        player[currentPlayer].classList.remove("player-active");
    }
    player[0].classList.add("player-active");
});
