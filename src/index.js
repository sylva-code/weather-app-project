let now = new Date();
let currentDay = document.querySelector("#current-time");
currentDay.innerHTML = formatDay();

function formatDay() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  let currentTime = `${hours}:${minutes}`;

  return `${day} ${currentTime}`;
}

function formatHours(timestamp) {
  now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  return `${hours}:${minutes}`;
}

function formatWeekday(timestamp) {
  now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[now.getDay()];

  return `${day}`;
}

  
function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  searchCity(city);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", showCity);

function searchCity(city) {
let apiKey = "d231d8f3710943f81168975979ce7164";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(url).then(currentWeather);

url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(url).then(showForecast);
}

function currentWeather(response) { 
  celciusTemperature = response.data.main.temp;
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#current-weather-icon").setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#current-weather-icon").setAttribute("alt", response.data.weather[0].description);
  document.querySelector("#current-conditions").innerHTML = response.data.weather[0].main;
  document.querySelector("#current-temperature").innerHTML = Math.round(celciusTemperature);
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed * 3.6);

  let cityLatitude = response.data.coord.lat;
  let cityLongitude = response.data.coord.lon;
  apiKey = "d231d8f3710943f81168975979ce7164";
  url = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLatitude}&lon=${cityLongitude}&exclude=minutely,alerts&appid=${apiKey}&units=metric`
  axios.get(url).then(showDailyForecast);
} 

function showForecast(response) {
  document.querySelector("#forecast-short").innerHTML = null;

  for (let index = 0; index < 3; index++) {
    let forecast = response.data.list[index];
    document.querySelector("#forecast-short").innerHTML += `
    <div class="col-2">
      ${formatHours(forecast.dt * 1000)} <br />
      <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"> <br />
      ${Math.round(forecast.main.temp)}°
    </div>
    `; 
  }
}

function showDailyForecast(response) {
  document.querySelector("#forecast-long").innerHTML = null;

  for (let index = 1; index < 6; index++) {
    let dailyForecast = response.data.daily[index];
    document.querySelector("#forecast-long").innerHTML += `
    <div class="col">
      ${formatWeekday(dailyForecast.dt * 1000)} <br />
      <img src="https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png"> <br />
      ${Math.round(dailyForecast.temp.max)}°/${Math.round(dailyForecast.temp.min)}°
    </div>
    `; 
  }
}

function convertToFahrenheit(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9/5) + 32;
  document.querySelector("#current-temperature").innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  document.querySelector("#current-temperature").innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

searchCity("London");