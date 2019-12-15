const API_KEY = "4d5154e8d9d7738e55dd08250c301ebb";
const COORDS_LS = "COORDS";
const temperature = document.querySelector('.temperature');
const country = document.querySelector('.country');

let geolocation = {
  latitude: 0,
  longitude: 0
};



function getWeather(latitude, longitude) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${
      latitude ? latitude : geolocation.latitude
    }&lon=${
      longitude ? longitude : geolocation.longitude
    }&appid=${API_KEY}&units=metric`
  ).then(function(response) {
    return response.json();
  }).then(function(weather) {
      console.log(weather);
      console.log(`${weather.main.temp}`)
      temperature.innerHTML = weather.main.temp;
      country.innerHTML = weather.sys.country;
  });
}

function saveCoordsToLocalStorage(geo) {
  localStorage.setItem(COORDS_LS, JSON.stringify(geo));
}

function handleGeoSuccess(position) {
  geolocation = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  };
  saveCoordsToLocalStorage(geolocation);
  getWeather();
}

function handleGeoFail() {
  console.error("Faild to get current position.");
  geolocation = {
    latitude: 0,
    longitude: 0
  };
}

function updateGeo() {
  geolocation = JSON.parse(localStorage.getItem(COORDS_LS));
  console.log(`navigator.geolocation: ${JSON.stringify(geolocation)}`);

  if (geolocation === null || !geolocation) {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoFail, {
      timeout: 10000
    });
  }
  getWeather();
}

function init() {
  updateGeo();
}

init();
