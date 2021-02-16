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
}

function currentWeather(response) { 
  console.log(response);
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#current-weather-emoji").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#current-conditions").innerHTML = response.data.weather[0].main;
  document.querySelector("#current-temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed * 3.6);
} 

searchCity("London");

