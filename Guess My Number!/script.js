"use scrict";
const target = Math.trunc(Math.random() * 20) + 1;

document.querySelector(".check").addEventListener("click", function () {
    const guess = Number(document.querySelector(".guess").value);
    if (!guess) {
        document.querySelector(".message").textContent = "🚫 No number!";
    } else if (guess === target) {
        document.querySelector(".message").textContent = "🎉 Correct Number!";
        check = false;
    } else if (guess >= target) {
        document.querySelector(".message").textContent = "📈 Too high!";
    } else if (guess <= target) {
        document.querySelector(".message").textContent = "📉 Too low!";
    } else {
    }
});
