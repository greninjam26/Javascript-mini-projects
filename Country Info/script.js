"use strict";

// DOM selection
const countriesContainer = document.querySelector(".countries");
const btnStart = document.querySelector(".btn-country");

// utility variables
const countries = [];

const createCountryCard = function (data, className = "") {
    console.log(data);
    const html = `        
        <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
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
};

const getCountryData = function (country, stats, className = false) {
    countries.push(country);
    // OLD WAY
    // const request = new XMLHttpRequest();
    // // type of request, the API link
    // request.open(
    //     "GET",
    //     `https://countries-api-836d.onrender.com/countries/${stats}/${country}`
    // );
    // request.send();
    // request.addEventListener("load", function () {
    //     const data =
    //         stats === "alpha"
    //             ? JSON.parse(this.responseText)
    //             : JSON.parse(this.responseText)[0];
    //     console.log(data);
    //     createCountryCard(data, className);
    //     // get neighbouring countries, this can make sure the neighbours will be executed after the main one
    //     if (!className) {
    //         data.borders.forEach(coun => {
    //             if (!countries.includes(coun)) {
    //                 getCountryData(coun, "alpha", "neighbour");
    //             }
    //         });
    //     }
    // });

    // NEW WAY(promises(ADDED in ES6))
    //  this return an object is a promise(this is a placeholder for results of an asynchronous code)
    // with promises we don't need events and callbacks anymore
    // we can chain promises
    const request = fetch(
        `https://countries-api-836d.onrender.com/countries/${stats}/${country}`
    );
    console.log(country);
    // .then() will always return a promise, but if we have a return then that value will be the value of the promise
    console.log(request);
    // .then(neighbours => neighbours.map(nei => nei.json()))
    // .then(function (neighbourInfos) {
    //     console.log(neighbourInfos);
    //     neighbourInfos.forEach(nei => createCountryCard(nei, "neighbour"));
    // });
    request
        .then(response => response.json())
        .then(function (returned) {
            console.log(returned);
            const data = stats === "alpha" ? returned : returned[0];
            console.log(data);
            createCountryCard(data, className);
            // get neighbouring countries, this can make sure the neighbours will be executed after the main one
            const neighbour1 = data?.borders[0];
            if (!neighbour1) return;
            return fetch(
                `https://countries-api-836d.onrender.com/countries/alpha/${neighbour1}`
            );
            // works don't know why 😩
            // return Promise.all(
            //     data.borders.map(coun =>
            //         fetch(
            //             `https://countries-api-836d.onrender.com/countries/alpha/${coun}`
            //         ).then(res => res.json())
            //     )
            // );
            // OLD WAY
            // if (!className) {
            //     data.borders.forEach(coun => {
            //         if (!countries.includes(coun)) {
            //             getCountryData(coun, "alpha", "neighbour");
            //         }
            //     });
            // }
        })
        .then(response => response.json())
        .then(country => createCountryCard(country, "neighbour"));
};

btnStart.addEventListener("click", function () {
    // everytime it is in different order because the data comes in at different time
    // to make
    // getCountryData("CAN", "alpha");
    getCountryData("USA", "alpha");
    // getCountryData("japan", "name");
    // getCountryData("united kingdom", "name");
    // too many neighbours
    // getCountryData("China", "name");
});
