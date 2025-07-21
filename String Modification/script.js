/**
Write a program that receives a list of variable names written in underscore_case
and convert them to camelCase.
The input will come from a textarea inserted into the DOM (see code below to
insert the elements), and conversion will happen when the button is pressed.
Test data (pasted to textarea, including spaces):
underscore_case
 first_name
Some_Variable
  calculate_AGE
delayed_departure
Should produce this output (5 separate console.log outputs):
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅
 */
"use strict";
document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));
const inputArea = document.querySelector("textarea");
document.querySelector("button").addEventListener("click", function () {
    const input = inputArea.value;
    const variables = input.split("\n");
    // console.log(variables);
    let len = variables[0].length;
    for (let i = 1; i < variables.length; i++) {
        len < variables[i].length && (len = variables[i].length);
    }
    len += 5;
    for (const [i, variable] of variables.entries()) {
        const [first, second] = variable.toLowerCase().trim().split("_");
        const ans =
            (first + second[0].toUpperCase() + second.slice(1)).padEnd(len) +
            "✅".repeat(i + 1);
        console.log(ans);
    }
});
