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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="day"`;
  let days = ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="day">
      <div class="weather-forecast-day">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max"> 18° </span>
        <span class="weather-forecast-temperature-min"> 12° </span>
      </div>
    </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;

  let minTemperature = Math.round(celsiusTemperature);

  let minTemperatureValue = document.querySelector("#min");
  minTemperatureValue.innerHTML = `${minTemperature}`;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document.querySelector("p.weather-description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "473132313b5400bf82583aa234355f9f";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
  axios.get(url).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(".weather-city").value;
  searchCity(city);
}

let dateElement = document.querySelector("h3");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
let celsiusLink = document.querySelector("#celsius");

let celsiusTemperature = null;

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#min");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#min");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
celsiusLink.addEventListener("click", showCelsiusTemperature);

searchCity("Kyiv");
displayForecast();
