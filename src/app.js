function updatecityData(response) {
let temperatureElement = document.querySelector("#temperature");
let temperature = response.data.temperature.current;
let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city;
temperatureElement.innerHTML = Math.round(temperature);
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

