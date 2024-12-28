import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "de38cf6822607bc2e72b9c18d137ee1d";

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Weather App</h1>
      </header>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>
      {weather && (
        <div className="weather-card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>{weather.weather[0].description}</p>
          <div className="temperature">
            <p>{Math.round(weather.main.temp)}°C</p>
            <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
          </div>
          <div className="extra-info">
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {Math.round(weather.wind.speed * 3.6)} km/h</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
