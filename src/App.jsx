import React, { useState } from 'react';
import './App.css'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = '21939feeb030a1732eae3d1c6703f9d6'; // Replace with your actual API key

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    }
  };

  const handleSearch = () => {
    if (city.trim() !== '') {
      fetchWeatherData();
    }
  };

  return (
    <div className='container'>
      <h1><span>W</span>eather <span>A</span>pp</h1>
      <input
      id='search-bar'
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter Major city name"
      />
      <br></br>
      <button id='btn' onClick={handleSearch}>Search</button>
      
            {error && <p>{error}</p>}
      {weatherData && (
        <div className='result'>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <div className="col-1">
          <p>Temperature:🌡️<span id="temperature">{weatherData.main.temp} °C</span></p>
          <p>Weather: 🌤️ <span id='weather'>{weatherData.weather[0].main}</span></p>
          </div>
          <div className="col2">
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Humidity:💦{weatherData.main.humidity}%</p>
          <p>Wind Speed:🌪️{weatherData.wind.speed} m/s</p>
          </div>
        </div>
      )}
    <footer id='contact'> For Contact  And Support  Aadikommula@gmail.com</footer>
    </div>
  );
}

export default WeatherApp;
