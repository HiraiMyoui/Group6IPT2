fetch("https://api.open-meteo.com/v1/forecast?latitude=14.5995&longitude=120.9842&current_weather=true")
  .then(response => response.json())
  .then(data => {
    document.getElementById("temp").innerText =
      "Temperature: " + data.current_weather.temperature + " °C";

    document.getElementById("wind").innerText =
      "Wind Speed: " + data.current_weather.windspeed + " km/h";
  });
