/* =========================================
   CLIMATELENSAFRICA
   WEBSITE INTERACTIVITY
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");


menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

});


document.querySelectorAll(".nav-links a").forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

    });

});


/* =========================================
   DARK MODE
========================================= */

const themeToggle = document.getElementById("themeToggle");


const savedTheme = localStorage.getItem("climateLensTheme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeToggle.textContent = "☀️";

}


themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark");


    const isDark = document.body.classList.contains("dark");


    if (isDark) {

        localStorage.setItem("climateLensTheme", "dark");

        themeToggle.textContent = "☀️";

    } else {

        localStorage.setItem("climateLensTheme", "light");

        themeToggle.textContent = "🌙";

    }

});


/* =========================================
   CLIMATE FACTS
========================================= */

const climateFacts = [

    "Healthy forests help regulate rainfall, store carbon and protect biodiversity.",

    "Africa is warming faster than the global average in many regions.",

    "Soil is one of the largest carbon stores on Earth.",

    "Wetlands can help reduce flooding by absorbing excess water.",

    "Food waste contributes significantly to global greenhouse gas emissions.",

    "Trees can help cool cities by providing shade and releasing water vapour.",

    "Climate change can affect the timing and intensity of rainfall.",

    "Renewable energy can reduce dependence on fossil fuels.",

    "Biodiversity helps ecosystems become more resilient to environmental change.",

    "Mangrove forests help protect coastlines from erosion and provide habitats for marine life.",

    "Africa is home to deserts, savannahs, rainforests, mountains, wetlands and coastal ecosystems.",

    "Protecting existing forests is just as important as planting new trees.",

    "Urban areas can become hotter than surrounding rural areas because of the urban heat island effect.",

    "Climate change can influence rainfall patterns, droughts, floods and extreme weather events.",

    "Trees release water vapour into the atmosphere through a process called transpiration.",

    "Composting food waste can return valuable nutrients to the soil.",

    "Healthy soils can store carbon and improve the ability of farms to withstand drought.",

    "Rainwater harvesting can help communities improve water security.",

    "Agroforestry combines trees with crops or livestock.",

    "Biodiversity includes plants, animals, fungi, microorganisms and genetic diversity.",

    "Coral reefs support enormous varieties of marine life and are vulnerable to warming oceans.",

    "Plastic pollution can break down into tiny particles called microplastics.",

    "Energy efficiency is one of the simplest ways to reduce energy consumption.",

    "Climate change can affect food production through temperature, rainfall, pests and growing seasons.",

    "The same amount of rain can have different effects depending on how quickly it falls and how healthy the soil is.",

    "Trees can provide shade, reduce heat and improve comfort in cities.",

    "Drought impacts can be worsened by high temperatures, poor water management and land degradation.",

    "Food systems are connected to climate change through farming, transport, processing, storage and waste.",

    "Wetlands can support biodiversity, reduce flooding and help communities adapt to climate change.",

    "Renewable energy includes solar, wind, hydropower and geothermal energy.",

    "Climate adaptation means adjusting to climate impacts and reducing the damage they cause.",

    "Climate mitigation means reducing or preventing greenhouse gas emissions.",

    "Climate-smart solutions consider both environmental sustainability and community needs.",

    "Bees and butterflies play important roles in many food systems as pollinators.",

    "Deforestation can contribute to biodiversity loss, soil erosion and changes in local water cycles.",

    "Land management influences how much carbon can be stored in vegetation and soil.",

    "Walking, cycling and public transport can help reduce transport emissions.",

    "Reducing food waste also saves the water, energy and land used to produce food.",

    "Climate change affects communities differently, and vulnerable communities often face the greatest risks.",

    "Conservation is also about supporting people whose lives depend on healthy ecosystems.",

    "The best climate solutions often combine science, local knowledge, technology and community action.",

    "Small environmental actions become more powerful when millions of people act together.",

    "Africa's climate diversity means climate challenges and solutions vary greatly across the continent.",

    "Freshwater resources are limited and unevenly distributed around the world.",

    "Growing a variety of crops can improve food system resilience.",

    "Cover crops can help protect soil from erosion and improve soil health.",

    "Vegetation can help reduce soil erosion by protecting soil from wind and heavy rainfall.",

    "Climate education helps people understand risks and make better decisions.",

    "The climate crisis is also a human story involving health, livelihoods, food, water, homes and future generations.",

    "Every climate solution begins with understanding the problem.",

    "A healthy ecosystem can provide food, clean water, protection and livelihoods.",

    "Climate action can happen at household, community, national and global levels.",

    "Food rescue and food sharing can help reduce unnecessary food waste.",

    "The future of agriculture will depend on both innovation and traditional knowledge.",

    "A tree is not just a tree. It can be habitat, shade, food, carbon storage and protection for soil.",

    "Climate change can affect the length and timing of growing seasons.",

    "Biodiversity loss and climate change are closely connected environmental challenges.",

    "Environmental education can turn awareness into action.",

    "Africa's climate future will be shaped by both environmental challenges and African innovation."

];


const climateFact = document.getElementById("climateFact");

const newFactBtn = document.getElementById("newFactBtn");


function showRandomFact() {

    const randomNumber = Math.floor(
        Math.random() * climateFacts.length
    );


    climateFact.textContent = climateFacts[randomNumber];

}


newFactBtn.addEventListener("click", showRandomFact);


showRandomFact();


/* =========================================
   WEATHER SEARCH
   OPEN-METEO API
========================================= */

const cityInput = document.getElementById("cityInput");

const weatherBtn = document.getElementById("weatherBtn");

const weatherResult = document.getElementById("weatherResult");


weatherBtn.addEventListener("click", getWeather);


cityInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        getWeather();

    }

});


async function getWeather() {

    const city = cityInput.value.trim();


    if (!city) {

        weatherResult.innerHTML = `
            <p>Please enter a city name.</p>
        `;

        return;

    }


    weatherResult.innerHTML = `
        <div class="weather-placeholder">
            🔄
            <p>Finding weather information...</p>
        </div>
    `;


    try {

        const locationResponse = await fetch(

            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`

        );


        const locationData = await locationResponse.json();


        if (!locationData.results || locationData.results.length === 0) {

            weatherResult.innerHTML = `
                <p>We could not find that city. Please try another name.</p>
            `;

            return;

        }


        const location = locationData.results[0];


        const weatherResponse = await fetch(

            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`

        );


        const weatherData = await weatherResponse.json();


        const current = weatherData.current;


        const weatherDescription = getWeatherDescription(
            current.weather_code
        );


        weatherResult.innerHTML = `

            <h3>
                📍 ${location.name}, ${location.country}
            </h3>

            <div class="weather-temperature">
                ${Math.round(current.temperature_2m)}°C
            </div>

            <p>
                ${weatherDescription}
            </p>

            <p>
                💧 Humidity: ${current.relative_humidity_2m}%
            </p>

            <p>
                💨 Wind: ${current.wind_speed_10m} km/h
            </p>

        `;


    } catch (error) {

        weatherResult.innerHTML = `
            <p>
                Something went wrong. Please check your internet connection
                and try again.
            </p>
        `;

    }

}


/* =========================================
   WEATHER CODE INTERPRETATION
========================================= */

function getWeatherDescription(code) {

    if (code === 0) {

        return "☀️ Clear sky";

    }


    if (code >= 1 && code <= 3) {

        return "⛅ Partly cloudy";

    }


    if (code >= 45 && code <= 48) {

        return "🌫️ Foggy";

    }


    if (code >= 51 && code <= 67) {

        return "🌧️ Drizzle or rain";

    }


    if (code >= 71 && code <= 77) {

        return "❄️ Snow";

    }


    if (code >= 80 && code <= 82) {

        return "🌦️ Rain showers";

    }


    if (code >= 95) {

        return "⛈️ Thunderstorm";

    }


    return "🌍 Changing conditions";

}


/* =========================================
   BACK TO TOP
========================================= */

const backToTop = document.getElementById("backToTop");


window.addEventListener("scroll", function () {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", function () {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});


/* =========================================
   SIMPLE SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(

    ".feature-card, .story-card, .knowledge-card, .social-card, .fact-card"

);


const revealObserver = new IntersectionObserver(

    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform = "translateY(0)";

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {

        threshold: 0.1

    }

);


revealElements.forEach(function (element) {

    element.style.opacity = "0";

    element.style.transform = "translateY(25px)";

    element.style.transition = "opacity 0.7s ease, transform 0.7s ease";

    revealObserver.observe(element);

});
