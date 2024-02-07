import React from 'react';

import css from "../styles/WeatherForecast.css"

const WeatherForecast = ({ forecastData, format_date }) => {
  if (!forecastData || forecastData.length === 0) {
    return null; // Добавляем проверку на наличие данных и возвращаем null, если данных нет
  }

  const dailyForecast = forecastData.filter((item, index, arr) => {
    const currentDate = new Date(item.dt * 1000).toLocaleDateString();
    const nextDate = index + 1 < arr.length ? new Date(arr[index + 1].dt * 1000).toLocaleDateString() : null;
    return currentDate !== nextDate;
  });

  return (
    <div className='forecast-box'>
      <div className='forecast-cards'>
        {dailyForecast.map((item, index) => (
          <div className='weather-box' key={index}>
            <div className='weather-box date'>{format_date(new Date(item.dt * 1000))}</div>
            <div className='temp'>{Math.round(item.main.temp)}°C</div>
            <div className='weather'>{item.weather[0].main}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;