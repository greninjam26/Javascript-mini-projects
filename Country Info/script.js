"use strict";

// DOM selection
const countriesContainer = document.querySelector(".countries");

// old way
const createCountryCardOld = function (country) {
    const request = new XMLHttpRequest();
    // type of request, the API link
    request.open("GET", `https://countries-api-836d.onrender.com/countries/name/${country}`);
    request.send();
    request.addEventListener("load", function () {
        const [data] = JSON.parse(this.responseText);
        console.log(data);

        const html = `        
        <article class="country">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${Math.round(
                +data.population / 1000000
            ).toFixed(1)} million people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
    `;
        countriesContainer.insertAdjacentHTML("beforeend", html);
        countriesContainer.style.opacity = 1;
    });
};

// everytime it is in different order because the data comes in at different time
createCountryCardOld("USA");
createCountryCardOld("canada");
createCountryCardOld("china");
createCountryCardOld("japan");