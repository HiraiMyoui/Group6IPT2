// script.js - weather widget + small helper for index.html
(function(){
  const statusEl = document.getElementById('weather-status');
  const refreshBtn = document.getElementById('weather-refresh');

  // Default coordinates (Manila) used as fallback
  const DEFAULT_COORDS = { latitude: 14.5995, longitude: 120.9842, name: 'Manila' };

  function weatherCodeToText(code){
    // Basic mapping from Open-Meteo weathercode
    const map = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      80: 'Rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail'
    };
    return map[code] || 'Unknown';
  }

  async function fetchWeather(coords){
    if(!statusEl) return;
    const lat = coords.latitude;
    const lon = coords.longitude;
    statusEl.textContent = 'Loading weather...';
    try{
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
      const resp = await fetch(url);
      if(!resp.ok) throw new Error('Network response was not ok');
      const data = await resp.json();
      const cw = data.current_weather;
      if(!cw){
        statusEl.textContent = 'No weather data available.';
        return;
      }
      const temp = cw.temperature; // Celsius
      const code = cw.weathercode;
      const desc = weatherCodeToText(code);
      statusEl.textContent = `${coords.name || (lat.toFixed(2)+','+lon.toFixed(2))}: ${temp}°C — ${desc}`;
    }catch(err){
      console.error('Weather API error', err);
      statusEl.textContent = 'Could not load weather right now.';
    }
  }

  function tryGeolocationThenFetch(){
    if(!navigator.geolocation){
      fetchWeather(DEFAULT_COORDS);
      return;
    }
    // Try to get user's location, but fallback after timeout
    let settled = false;
    const timer = setTimeout(()=>{
      if(settled) return;
      settled = true;
      fetchWeather(DEFAULT_COORDS);
    }, 5000);

    navigator.geolocation.getCurrentPosition(function(pos){
      if(settled) return;
      settled = true;
      clearTimeout(timer);
      const coords = { latitude: pos.coords.latitude, longitude: pos.coords.longitude, name: 'Your location' };
      fetchWeather(coords);
    }, function(err){
      if(settled) return;
      settled = true;
      clearTimeout(timer);
      fetchWeather(DEFAULT_COORDS);
    }, { timeout: 4000 });
  }

  // initial fetch
  tryGeolocationThenFetch();

  if(refreshBtn){
    refreshBtn.addEventListener('click', function(){
      tryGeolocationThenFetch();
    });
  }
})();
