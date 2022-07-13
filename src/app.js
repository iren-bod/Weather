// In your project, display the current date and time using JavaScript: Tuesday 16:00
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("h3");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("h1");
  let cityInput = document.querySelector(".weather-country");
  cityElement.innerHTML = cityInput.value;

  let apiKey = "473132313b5400bf82583aa234355f9f";
  let city = cityInput.value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;

  function showWeather(response) {
    let minTemperature = Math.round(response.data.main.temp_min);
    let maxTemperature = Math.round(response.data.main.temp_max);

    let minTemperatureValue = document.querySelector("p.temperature-value-min");
    minTemperatureValue.innerHTML = `${minTemperature}°C`;

    let maxTemperatureValue = document.querySelector("p.temperature-value-max");
    maxTemperatureValue.innerHTML = `${maxTemperature}°C`;
  }

  axios.get(url).then(showWeather);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", search);
