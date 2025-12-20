(function () {

  const statusEl = document.getElementById("weather-status");
  const refreshBtn = document.getElementById("weather-refresh");

  const DEFAULT = {
    latitude: 14.5995,
    longitude: 120.9842,
    name: "Manila"
  };

  function codeToText(code) {
    const map = {
      0: "Clear",
      1: "Mostly clear",
      2: "Cloudy",
      3: "Overcast",
      61: "Light rain",
      63: "Rain",
      65: "Heavy rain",
      95: "Thunderstorm"
    };
    return map[code] || "Weather";
  }

  async function loadWeather(coords) {
    statusEl.textContent = "Loading weather...";

    try {
      const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true`;

      const res = await fetch(url);
      const data = await res.json();

      const w = data.current_weather;
      const text = codeToText(w.weathercode);

      statusEl.textContent =
        `${coords.name}: ${w.temperature}°C ${text}`;

    } catch {
      statusEl.textContent = "Weather not available";
    }
  }

  function start() {
    if (!navigator.geolocation) {
      loadWeather(DEFAULT);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        loadWeather({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          name: "Your area"
        });
      },
      () => loadWeather(DEFAULT)
    );
  }

  refreshBtn.addEventListener("click", start);
  start();

})();
