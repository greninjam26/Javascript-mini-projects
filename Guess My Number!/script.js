"use scrict";
let target = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

document.querySelector(".check").addEventListener("click", function () {
    const guess = Number(document.querySelector(".guess").value);
    // when there is no number
    if (!guess) {
        document.querySelector(".message").textContent = "🚫 No number!";
    }
    // when the user guess the number
    else if (guess === target) {
        document.querySelector(".message").textContent = "🎉 Correct Number!";
        document.querySelector(".number").textContent = target;

        document.querySelector("body").style.backgroundColor = "#60b347";
        document.querySelector(".number").style.width = "30rem";
        if (score > highScore) {
            highScore = score;
            document.querySelector(".highscore").textContent = highScore;
        }
    }
    // when the guess is too high
    else if (guess >= target) {
        // update the score
        if (score) {
            document.querySelector(".message").textContent = "📈 Too high!";
            score--;
            document.querySelector(".score").textContent = score;
        }
        // lost the game
        else {
            document.querySelector(".message").textContent = "💥 You lost the game :(";
            document.querySelector(".score").textContent = 0;
        }
    }
    // when the guess is too low
    else if (guess <= target) {
        // update the score
        if (score) {
            document.querySelector(".message").textContent = "📉 Too low!";
            score--;
            document.querySelector(".score").textContent = score;
        }
        // lost the game
        else {
            document.querySelector(".message").textContent = "💥 You lost the game :(";
            document.querySelector(".score").textContent = 0;
        }
    }
});

document.querySelector(".again").addEventListener("click", function () {
    score = 20;
    target = Math.trunc(Math.random() * 20) + 1;
    document.querySelector(".number").textContent = "?";
    document.querySelector(".number").style.width = "15rem";
    document.querySelector(".score").textContent = score;
    document.querySelector(".guess").value = "";
    document.querySelector(".message").textContent = "Start guessing...";
    document.querySelector("body").style.backgroundColor = "#222";
});
