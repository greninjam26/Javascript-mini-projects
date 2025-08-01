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
};

const displayError = function (msg) {
    countriesContainer.insertAdjacentText("beforeend", msg);
};

const getPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

const getData = function (url, errorMsg = "ERROR") {
    return fetch(url).then(response => {
        if (!response.ok) {
            // this will make the promise reject, and the .catch() can catch the error and handle it
            throw new Error(`${errorMsg} (${response.status})`);
        }
        return response.json();
    });
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
    // .then(neighbours => neighbours.map(nei => nei.json()))
    // .then(function (neighbourInfos) {
    //     console.log(neighbourInfos);
    //     neighbourInfos.forEach(nei => createCountryCard(nei, "neighbour"));
    // });
    getData(
        `https://countries-api-836d.onrender.com/countries/${stats}/${country}`,
        `Country not found`
    )
        // .then() will be executed only when a promise is fulfilled
        // .then() will always return a promise, but if we have a return then that value will be the value of the promise
        .then(function (returned) {
            console.log(returned);
            const data = stats === "alpha" ? returned : returned[0];
            console.log(data);
            createCountryCard(data, className);
            // get neighbouring countries, this can make sure the neighbours will be executed after the main one
            const neighbour1 = data?.borders[0];
            if (!neighbour1) throw new Error("No neighbour countries found");
            return getData(
                `https://countries-api-836d.onrender.com/countries/alpha/${neighbour1}`,
                `Country not found`
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
        .then(country => createCountryCard(country, "neighbour"))
        // this will catches the error no matter where it is
        .catch(error => displayError(`This is not right, ${error.message}!!`))
        // this will always execute no matter if the promise is fulfilled
        .finally(() => (countriesContainer.style.opacity = 1));
};

// 1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat') and a longitude value ('lng') (these are GPS coordinates, examples are in test data below).
const whereAmI = function (lat, lng) {
    // 2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data.
    getData(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
        `coordinate not found`
    )
        .then(data => {
            // 3. Once you have the data, take a look at it in the console to see all the attributes that you received about the provided location. Then, using this data, log a message like this to the console: “You are in Berlin, Germany”
            console.log(data);
            console.log(`You are in ${data.city}, ${data.countryName}`);
            getCountryData(data.countryName, "name");
        })
        // 4. Chain a .catch method to the end of the promise chain and log errors to the console
        .catch(error => {
            console.error(error);
        });
};

btnStart.addEventListener("click", function () {
    // everytime it is in different order because the data comes in at different time
    // to make
    // getCountryData("CAN", "alpha");
    // getCountryData("USA", "alpha");
    // getCountryData("dasfawfe", "alpha");
    // getCountryData("japan", "name");
    // getCountryData("united kingdom", "name");
    // too many neighbours
    // getCountryData("China", "name");

    /////////////
    // where am I
    getPosition().then(pos => {
        const { lat, lng } = pos.coords;
        whereAmI(lat, lng);
    });
});
// // Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
// whereAmI(52.508, 13.381);
// // § Coordinates 2: 19.037, 72.873
// whereAmI(19.037, 72.873);
// // § Coordinates 3: -33.933, 18.474
// whereAmI(-33.933, 18.474);
