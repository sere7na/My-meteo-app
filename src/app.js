function updatecityData(response) {
let temperatureElement = document.querySelector("#temperature");
let temperature = response.data.temperature.current;
let cityElement = document.querySelector("#city");
cityElement.innerHTML = response.data.city;

let descriptionElement = document.querySelector("#description");
descriptionElement.innerHTML =response.data.condition.description;

let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML = `${response.data.temperature.humidity}%`; 
temperatureElement.innerHTML = Math.round(temperature);

let windSpeedElement = document.querySelector("#wind-speed");
windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;

let date = new Date(response.data.time * 1000);
let timeElement = document.querySelector("#time");
timeElement.innerHTML = formatDay(date);

}
function formatDay(date) {
let days = ["Sunday","Monday","Tuesday","Wendsday","Thursday","Friday","Saturday"]; 
let day = days[date.getDay()];
 let minutes = date.getMinutes();
 let hours = date.getHours();
if (minutes < 10) {
minutes = `0 ${minutes}`;
}

 return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
let apiKey = "9t597542a7ab8b73a9f4o3da60324dfc";
let apiUrl = 
`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(updatecityData);
}


function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    
    searchCity(searchInput.value);

}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Tokyo");

