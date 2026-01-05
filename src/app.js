function updateCityData(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city;

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.condition.description;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

    temperatureElement.innerHTML = Math.round(temperature);

    let windSpeedElement = document.querySelector("#wind-speed");
    windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;

    let iconElement = document.querySelector("#icon");
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;

    
    let date = new Date(response.data.time * 1000);
    let timeElement = document.querySelector("#time");
    timeElement.innerHTML = formatDate(date);

    getForecast(response.data.city);
}

function searchCity(city) {
    let apiKey = "9t597542a7ab8b73a9f4o3da60324dfc"; 
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl)
        .then(updateCityData)
        .catch(error => console.error('Error fetching weather data:', error));
}
function formatDay(date) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    let minutes = date.getMinutes();
    let hours = date.getHours();

    if (minutes < 10) {
        minutes = `0${minutes}`; 
    }

    return `${day}, ${hours}:${minutes}`; 
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
}

function getForecast(city) {
    let apiKey = "9t597542a7ab8b73a9f4o3da60324dfc"; 
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl)
        .then(displayForecast)
        .catch(error => console.error('Error fetching forecast data:', error));
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `
                <div class="weather-data-day">
                    <div class="day-week">${formatDay(day.time)}</div>
                    <img src="${day.condition.icon_url}" class="day-icon" />
                    <div class="day-temperatures">
                        <div class="temp"><strong>${Math.round(
                          day.temperature.maximum
                        )}°</strong></div>  
                        <div class="temp">${Math.round(
                          day.temperature.minimum
                        )}°</div>
                    </div>
                </div>
            `;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", function(event) {
    event.preventDefault(); 
    let cityInput = document.querySelector("#search-form-input"); // Get the input value
    searchCity(cityInput.value);  
});


searchCity("Tokyo");