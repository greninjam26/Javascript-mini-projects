"use strict";

// DOM selection
const countriesContainer = document.querySelector('.countries');

// old way
const request = new XMLHttpRequest();
// type of request, the API link
request.open("GET", "https://countries-api-836d.onrender.com/countries/name/Canada");
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
            <p class="country__row"><span>👫</span>${data.population} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
    `;
    countriesContainer.insertAdjacentHTML("beforeend", html);
});
