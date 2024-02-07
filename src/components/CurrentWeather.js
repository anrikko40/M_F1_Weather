import React from 'react';

import css from "../styles/CurrentWeather.css"

const CurrentWeather = ({ weather, format_date }) => {
  return (
    <div className='weather-box'>
      <div className='temp'>{Math.round(weather.main.temp)}°C</div>
      <div className='weather'>{weather.weather[0].main}</div>
    </div>
  );
};

export default CurrentWeather;