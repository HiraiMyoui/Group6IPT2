const weatherData = {
  "Tarlac": { temperature: 30, weather: "Sunny", humidity: 60, icon: "☀️" },
  "Manila": { temperature: 32, weather: "Cloudy", humidity: 70, icon: "☁️" },
  "Cebu": { temperature: 28, weather: "Rainy", humidity: 80, icon: "🌧️" },
  "Davao": { temperature: 29, weather: "Thunderstorm", humidity: 85, icon: "⛈️" },
  "Baguio": { temperature: 22, weather: "Foggy", humidity: 90, icon: "🌫️" }
};

function getWeather() {
  const city = document.getElementById('citySelect').value;
  const card = document.getElementById('weather-card');

  if (city && weatherData[city]) {
    const data = weatherData[city];

    card.innerHTML = `
      <h2>${data.icon} ${city}</h2>
      <p><strong>Temperature:</strong> ${data.temperature} °C</p>
      <p><strong>Weather:</strong> ${data.weather}</p>
      <p><strong>Humidity:</strong> ${data.humidity}%</p>
    `;
  } else {
    card.innerHTML = `<h2>Weather Info</h2><p>Please select a city.</p>`;
  }
}
