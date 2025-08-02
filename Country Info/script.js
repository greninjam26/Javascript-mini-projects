"use strict";

// DOM selection
const countriesContainer = document.querySelector(".countries");
const btnStart = document.querySelector(".btn-country");
const images = document.querySelector(".images");

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

// promisifying the timer
const wait = seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000));

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

/*
Your tasks:
Tasks are not super-descriptive this time, so that you can figure out some stuff by yourself. Pretend you're working on your own 😉
 */
// PART 1
// 1. Create a function 'createImage' which receives 'imgPath' as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path

const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
        const image = document.createElement("img");
        console.log(image);
        image.src = imgPath;
        // 2. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image (listen for the'error' event), reject the promise
        image.addEventListener("load", function () {
            images.append(image);
            resolve(image);
        });
        image.addEventListener("error", function () {
            reject(new Error("Image Path no valid...."));
        });
    });
};
// PART 2
let currentImg;
// // 4. Consume the promise using .then and also add an error handler
// createImage("img/Ash-Greninja-1.png")
//     .then(img => {
//         // 5. After the image has loaded, pause execution for 2 seconds using the 'wait' function we created earlier
//         currentImg = img;
//         return wait(2);
//     })
//     .then(() => {
//         // 6. After the 2 seconds have passed, hide the current image, and load a second image
//         currentImg.style.display = "none";
//         createImage("img/Ash-Greninja-2.png").then(img => (currentImg = img));
//         // 7. After the second image has loaded, pause execution for 2 seconds again
//         return wait(2);
//     })
//     // 8. After the 2 seconds have passed, hide the current image
//     .then(() => (currentImg.style.display = "none"))
//     .catch(err => console.error(err));

// Test data: Images in the img folder. Test the error handler by passing a wrong
// image path. Set the network speed to “Fast 3G” in the dev tools Network tab,
// otherwise images load too fast

// PART 1
// 1. Write an async function 'loadNPause' that recreates Challenge #2, this time using async/await (only the part where the promise is consumed, reuse the 'createImage' function from before)
// 2. Compare the two versions, think about the big differences, and see which one you like more
// 3. Don't forget to test the error handler
const loadNPause = async function () {
    try {
        const img1 = await createImage("img/Ash-Greninja-1.png");
        await wait(2);
        img1.style.display = "none";
        const img2 = await createImage("img/Ash-Greninja-2.png");
        await wait(2);
        img2.style.display = "none";
    } catch (err) {
        console.error(err);
    }
};
// loadNPause();
// PART 2
// 1. Create an async function 'loadAll' that receives an array of image paths 'imgArr'
const loadAll = async function (imgArr) {
    // 2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
    const imgs = imgArr.map(async img => await createImage(img));
    // 3. Check out the 'imgs' array in the console! Is it like you expected?
    console.log(imgs);
    // 4. Use a promise combinator function to actually get the images from the array 😉
    const images = await Promise.all(imgs);
    console.log(images);
    // 5. Add the 'parallel' class to all the images (it has some CSS styles)
    images.forEach(img => img.classList.add("parallel"));
};
loadAll(["img/Ash-Greninja-1.png", "img/Ash-Greninja-2.png"]);

// Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'].
// To test, turn off the 'loadNPause' function
