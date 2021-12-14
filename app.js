
// Connect html id's to variables
function getWeather() {
  let location = document.querySelector("#w-location");
  let description = document.querySelector("#w-desc");
  let temperature = document.querySelector("#w-temp");
  let icon = document.querySelector("#w-icon");

// Api and key
let api = "https://api.openweathermap.org/data/2.5/weather";
let apiKey = "93522e8035265e32d44c3c83cb444ffb";

// success & fail responses
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  alert('Geolocation not available!?  What browser is this?');
}

// Get current position success
function success(position) {
  let latitude = position.coords.latitude.toFixed(5);
  let longitude = position.coords.longitude.toFixed(5);

  // fetch API
  let url =
    api + "?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=" +
    apiKey +
    "&units=imperial";

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let temp = data.main.temp;
        temperature.innerHTML = temp + "° F";
        location.innerHTML = data.name;
        description.innerHTML = data.weather[0].main;
        icon.setAttribute('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
      });
}

// Get current position error
function error() {
  switch (err.code) {
    case err.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case err.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.  Please manually input your location.");
      break;
    case err.TIMEOUT:
      alert("The request to get user location timed out.  Please try again.");
      break;
    default:
      alert("An unknown error occurred.  Please try again.");
  }
}
}

getWeather();
