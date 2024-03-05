const key = "c610c25042474efb93d150114241502";

export async function GetWeatherCurrent(location) {
  fetch(
    "https://api.weatherapi.com/v1/current.json?key=" +
      key +
      "&q=" +
      location +
      "&aqi=no",
    { mode: "cors" }
  )
    .then(function (response) {
      // wait for response before returning
      return response.json();
    })
    .then(function (response) {
      GetWeatherCurrentInfo(response);
    });
}

function GetWeatherCurrentInfo(weather) {
  console.log(weather);

  // current weather info
  const weather_temp_c = weather.current.temp_c;
  const weather_feelslike_c = weather.current.feelslike_c;
  const weather_humidity = weather.current.humidity;
  const weather_last_updated = weather.current.last_updated;
  const weather_img = weather.current.condition.icon;
  const weather_description = weather.current.condition.text;

  // location info
  const location_name = weather.location.name;
  const location_region = weather.location.region;
  const location_country = weather.location.country;

  const weather_last_updated_split = weather_last_updated.split(" ");

  // weather hashmap
  const weatherInfo = {
    temp_c: weather_temp_c,
    feelslike_c: weather_feelslike_c,
    humidity: weather_humidity,
    last_updated: weather_last_updated_split[1],
    description: weather_description,
    image: weather_img,
    name: location_name,
    region: location_region,
    country: location_country,
  };

  displayWeatherInfo(weatherInfo);
}

function displayWeatherInfo(weather) {
  const weatherCard = document.getElementById("weather-card");
  // last updated
  const lastUpdateDiv = document.createElement("div");
  const lastUpdate = document.createElement("p");

  lastUpdate.innerText = "LAST UPDATED " + weather.last_updated;
  lastUpdate.className = "last-update";

  lastUpdateDiv.appendChild(lastUpdate);
  weatherCard.appendChild(lastUpdateDiv);

  // weather img & description
  const weatherDiv = document.createElement('div');
  const imageTextDiv = document.createElement('div');

  const weatherImg = document.createElement('img');
  const weatherText = document.createElement('p');

  imageTextDiv.className = 'weather-image-text-div';
  weatherDiv.className = 'weather-div';
  weatherImg.src = weather.image;
  weatherText.innerText = weather.description.toUpperCase();

  imageTextDiv.appendChild(weatherImg);
  imageTextDiv.appendChild(weatherText);
  weatherDiv.appendChild(imageTextDiv);

  weatherCard.appendChild(weatherDiv);

  // temp info
  const tempText = document.createElement('h1');
  const feelsLikeText = document.createElement('p');
  const tempTextDiv = document.createElement('div');

  tempText.innerText = weather.temp_c;
  feelsLikeText.innerText = 'FEELS LIKE ' + weather.feelslike_c;
  feelsLikeText.className = 'feels-like-text';
  tempText.className = 'temp-text';
  tempTextDiv.className = 'temp-text-div'

  tempTextDiv.appendChild(tempText);
  tempTextDiv.appendChild(feelsLikeText);
  weatherDiv.appendChild(tempTextDiv);


}
