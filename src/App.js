import React, { useState } from 'react';
import SearchInput from '../src/components/SearchInput';
import CurrentWeather from '../src/components/CurrentWeather';
import WeatherForecast from '../src/components/WeatherForecast';

import css from "./styles/App.css"

const api = {
  key: '2efe40ad55373cdd82cf7d4f122ba149',
  base: 'http://api.openweathermap.org/data/2.5/',
};

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [weatherForecast, setWeatherForecast] = useState([]);
  const [forecastType, setForecastType] = useState('current');

  const search = (evt) => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setCity('');
        });

      fetch(`${api.base}forecast?q=${city}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeatherForecast(result.list);
        });
    }
  };

  const format_date = (d) => {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Spt', 'Oct', 'Nov', 'Dec'];

    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main !== 'undefined') ? ((weather.main.temp > 5) ? 'app warm' : 'app cold') : 'app'}>
      <main>
        <SearchInput city={city} setCity={setCity} onKeyPress={search} />
        {(typeof weather.main !== 'undefined') && (
          <div>
            <div className='location-box'>
            {(forecastType === 'current') && (
              <div>
                <div className='location'>{weather.name}, {weather.sys.country}</div>
                <div className='date'>Today is {format_date(new Date())}</div>
              </div>
            )}
            {(forecastType === 'fiveDays') && (
              <div className='location'>5-Day forecast for {weather.name}, {weather.sys.country}</div>
            )}
            </div>
            {(forecastType === 'current') && <CurrentWeather weather={weather} />}
            {(forecastType === 'fiveDays') && <WeatherForecast forecastData={weatherForecast} format_date={format_date} />}
            <div className='buttons'>
                <button
                onClick={() => setForecastType('current')}
                className={`btn ${forecastType === 'current' ? 'inactive' : 'active'}`}
                >
                Weather Today
                </button>

                <button
                onClick={() => setForecastType('fiveDays')}
                className={`btn ${forecastType === 'fiveDays' ? 'inactive' : 'active'}`}
                >
                5-Day Forecast
                </button>
                </div>
          </div>
        )}
        
      </main>
    </div>
  );
}

export default App;