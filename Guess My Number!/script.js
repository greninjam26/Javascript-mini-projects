"use scrict";
let target = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

function changeElements(element, newValue) {
    document.querySelector(element).textContent = newValue;
}

document.querySelector(".check").addEventListener("click", function () {
    const guess = Number(document.querySelector(".guess").value);
    // when there is no number
    if (!guess) {
        changeElements(".message", "🚫 No number!");
    }
    // when the user guess the number
    else if (guess === target) {
        changeElements(".message", "🎉 Correct Number!");
        changeElements(".number", target);

        document.querySelector("body").style.backgroundColor = "#60b347";
        document.querySelector(".number").style.width = "30rem";
        if (score > highScore) {
            highScore = score;
            changeElements(".highscore", highScore);
        }
    }
    // when guess is wrong
    else if (guess !== target) {
        // update the score
        if (score) {
            changeElements(".message", guess > target ? "📈 Too high!" : "📉 Too low!");
            score--;
            changeElements(".score", score);
        }
        // lost the game
        else {
            changeElements(".message", "💥 You lost the game :(");
            changeElements(".score", score);
        }
    }
});

document.querySelector(".again").addEventListener("click", function () {
    score = 20;
    target = Math.trunc(Math.random() * 20) + 1;
    changeElements(".number", "?");
    document.querySelector(".number").style.width = "15rem";
    changeElements(".score", score);
    changeElements(".guess", "");
    changeElements(".message", "Start guessing...");
    document.querySelector("body").style.backgroundColor = "#222";
});
