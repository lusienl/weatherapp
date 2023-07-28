import "./style.css";

// Оставьте ваш старый код без изменений
const apiKey = "5023c3626dadb78452809d1bcc7efd49";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-button");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  let data = await response.json();

  console.log(data); // can be deleted

  document.querySelector(".city").textContent = data.name;
  document.querySelector(".temp").textContent =
    Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").textContent = data.main.humidity + "%";
  document.querySelector(".wind").textContent = data.wind.speed + " m/s";

  const [weatherData] = data.weather;
  try {
    if (
      weatherData.main === "Clouds" &&
      weatherData.description === "few clouds"
    ) {
      weatherIcon.src = "public/cloudy-day-1.svg";
    } else if (weatherData.main === "Clear") {
      weatherIcon.src = "public/day.svg";
    } else if (weatherData.main === "Rain") {
      weatherIcon.src = "public/rainy-5.svg";
    } else {
      throw new Error("Unsupported weather condition");
    }
  } catch (error) {
    console.error(error.message);
    weatherIcon.src = "public/question-mark.svg";
    weatherIcon.classList.add("custom-svg");
  }

  weather.style.display = "flex";
}

function clearInput(e) {
  if (e.code === "Enter") {
    if (searchBox.value.trim() === "") {
      e.preventDefault();
    } else {
      searchBox.value = "";
    }
  }
}

searchBtn.addEventListener("click", () => {
  if (searchBox.value !== "") {
    checkWeather(searchBox.value);
  }
});

searchBox.addEventListener("keydown", (e) => {
  if (e.code === "Enter" && searchBox.value !== "") {
    checkWeather(searchBox.value);
  } else {
    return;
  }
})

searchBox.addEventListener("keyup", clearInput);



// // Новый код для определения местоположения пользователя и автоматической погоды
// function getCurrentLocationWeather() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const latitude = position.coords.latitude;
//         const longitude = position.coords.longitude;
//         const response = await fetch(`${apiUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
//         const data = await response.json();
//         console.log(data); // Выводим данные в консоль для отладки
//         updateWeatherData(data);
//       },
//       (error) => {
//         console.error("Error getting location:", error.message);
//         // В случае ошибки при получении местоположения, показываем погоду для Милана
//         checkWeather("Milan");
//       }
//     );
//   } else {
//     console.error("Geolocation is not supported by this browser.");
//     // В случае, если геолокация не поддерживается, показываем погоду для Милана
//     checkWeather("Milan");
//   }
// }

// function updateWeatherData(data) {
//   document.querySelector(".city").textContent = data.name;
//   document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
//   document.querySelector(".humidity").textContent = data.main.humidity + "%";
//   document.querySelector(".wind").textContent = data.wind.speed + "m/s";

//   const [weatherData] = data.weather;
//   try {
//     if (weatherData.main === "Clouds" && weatherData.description === "few clouds") {
//       weatherIcon.src = "public/cloudy-day-1.svg";
//     } else if (weatherData.main === "Clear") {
//       weatherIcon.src = "public/day.svg";
//     } else if (weatherData.main === "Rain") {
//       weatherIcon.src = "public/rainy-5.svg";
//     } else {
//       throw new Error("Unsupported weather condition");
//     }
//   } catch (error) {
//     console.error(error.message);
//     weatherIcon.src = "public/question-mark.svg";
//     weatherIcon.classList.add("custom-svg");
//   }
// }

// // Добавляем вызов функции для получения погоды по местоположению при загрузке страницы
// window.addEventListener("load", () => {
//   getCurrentLocationWeather();
// });
