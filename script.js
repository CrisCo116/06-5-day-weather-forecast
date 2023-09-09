const apiKey = 'da3fd98c9dbfd54a3bbcabffb7ac3ad5';
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const weatherContainer = document.getElementById('weather-container');
const savedCitiesList = document.getElementById('saved-cities-list');

searchButton.addEventListener('click', async () => {
    const cityName = cityInput.value.trim();
    if (cityName) {
        clearWeatherContainer();
        await getWeatherData(cityName);
        addToSearchHistory(cityName);
    }
});

function clearWeatherContainer() {
    weatherContainer.innerHTML = '';
}

async function getWeatherData(cityName) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        displayCurrentWeather(data);

        const forecastData = await getFiveDayForecast(cityName);
        displayFiveDayForecast(forecastData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayCurrentWeather(data) {

    const cityName = data.name;
    const date = new Date(data.dt * 1000).toDateString();
    const icon = data.weather[0].icon;
    const tempCelsius = data.main.temp;
    const tempFahrenheit = (tempCelsius * 9 / 5) + 32;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    const currentWeatherDiv = document.createElement('div');
    currentWeatherDiv.classList.add('current-weather');

    currentWeatherDiv.innerHTML = `
        <h2>${cityName} - ${date}</h2>
        <img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
        <p>Temperature: ${tempFahrenheit.toFixed(2)} °F</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;

    weatherContainer.appendChild(currentWeatherDiv);
}

async function getFiveDayForecast(cityName) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    return await response.json();
}

function displayFiveDayForecast(forecastData) {
    const fiveDayForecast = [
        forecastData.list[7],
        forecastData.list[15],
        forecastData.list[23],
        forecastData.list[31],
        forecastData.list[39]
    ]
    const forecastList = forecastData.list;
console.log(forecastData)
    const forecastDiv = document.createElement('div');
    forecastDiv.classList.add('forecast');

    fiveDayForecast.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const date = dateTime.toDateString();
        const icon = item.weather[0].icon;
        const tempCelsius = item.main.temp;
        const tempFahrenheit = (tempCelsius * 9 / 5) + 32;
        const humidity = item.main.humidity;
        const windSpeed = item.wind.speed;

        const forecastDayDiv = document.createElement('div');
        forecastDayDiv.classList.add('forecast-day');

        forecastDayDiv.innerHTML = `
            <h3>${date}</h3>
            <img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
            <p>Temperature: ${tempFahrenheit.toFixed(2)} °F</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
        `;

        forecastDiv.appendChild(forecastDayDiv);
    });

    weatherContainer.appendChild(forecastDiv);
}

function addToSearchHistory(cityName) {

    const listItem = document.createElement('li');
    listItem.textContent = cityName;

    listItem.addEventListener('click', () => {
        clearWeatherContainer();
        getWeatherData(cityName);
    });

    savedCitiesList.appendChild(listItem);
}

if(existingButton) {
}