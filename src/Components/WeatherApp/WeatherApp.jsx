import React, { useState } from 'react';
import './WeatherApp.css';

// Importing icons for different weather conditions and UI
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

export const WeatherApp = () => {
  // API key from OpenWeatherMap
  let api_key = "2f983de8c51820edc5db059f9b2700c0";

  // State to store the current weather icon
  const [Wicon, setWicon] = useState(cloud_icon);

  // Function to search weather by city name
  const search = async () => {
    const element  = document.getElementsByClassName("cityInput");

    // If input is empty, stop execution
    if(element[0].value === ""){
        return 0;
    }

    // API URL to fetch weather details
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    // Fetch weather data from API
    let response = await fetch(url);
    let data = await response.json();

    // Getting DOM elements where data will be shown
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    // Updating UI with fetched weather data
    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
    temperature[0].innerHTML = Math.floor(data.main.temp) + "°c";
    location[0].innerHTML = data.name;

    // Change weather icon based on API weather icon code
    if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n")
    {
        setWicon(clear_icon); // Clear sky
    }
    else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
        setWicon(cloud_icon); // Few clouds
    }
    else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
        setWicon(drizzle_icon); // Scattered clouds
    }
    else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
        setWicon(drizzle_icon); // Broken clouds
    }
    else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
        setWicon(rain_icon); // Shower rain
    }
    else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
        setWicon(rain_icon); // Rain
    }
    else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
        setWicon(snow_icon); // Snow
    }
    else
    {
        setWicon(clear_icon); // Default: clear
    }
  }

  return (
    <div className="body">
      <div className='container'>
        
        {/* Top bar with input and search button */}
        <div className="top-bar">
          <input type="text" className="cityInput" placeholder='Search' />
          <div className="search-icon" onClick={()=>{search()}}>
            <img src={search_icon} alt="search" />
          </div>
        </div>

        {/* Weather icon */}
        <div className="weather-image">
          <img src={Wicon} alt="weather-icon" />
        </div>

        {/* Default temperature and location (before search) */}
        <div className="weather-temp">24°c</div>
        <div className="weather-location">London</div>

        {/* Extra weather details (humidity & wind speed) */}
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="humidity-icon" className='icon' />
            <div className="data">
              <div className="humidity-percent">64%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="wind-icon" className='icon' />
            <div className="data">
              <div className="wind-rate">18 km/h</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
