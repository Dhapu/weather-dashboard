import React, { useRef } from 'react';
import ForecastItem from './ForecastItem'; // Import ForecastItem component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const WeatherDisplay = ({ weatherData, forecastData, unit, addFavorite }) => {
  const unitSymbol = unit === 'metric' ? '°C' : '°F';

  const forecastContainerRef = useRef(null);

  const scrollRight = () => {
    forecastContainerRef.current.scrollBy({
      left: 150, // Adjust scroll amount as needed
      behavior: 'smooth'
    });
  };

  const scrollLeft = () => {
    forecastContainerRef.current.scrollBy({
      left: -150, // Adjust scroll amount as needed
      behavior: 'smooth'
    });
  };

  const addToFavorites = () => {
    addFavorite(weatherData.name);
    console.log('Added to favorites:', weatherData);
    console.log('Favorites:', forecastData);
  };

  return (
    <div className="WeatherDisplay">
      <div className="current-weather">
        <h2>Current Weather in {weatherData.name}</h2>
        <div className="weather-details">
          <div className="temperature">
            <p>{weatherData.main.temp.toFixed(1)}{unitSymbol}</p>
          </div>
          <div className="condition">
            <p>{weatherData.weather[0].description}</p>
          </div>
        </div>
        <button className="add-favorite" onClick={addToFavorites}>Add to Favorites</button>
      </div>

      <div className="forecast">
        <h3>5-Day Forecast</h3>
        <div className="forecast-scroll">
          <div className="arrow left" onClick={scrollLeft}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <div className="forecast-items" ref={forecastContainerRef}>
            {forecastData.list.map((forecast, index) => (
              <div key={index} className="forecast-item">
                <p className="date">{new Date(forecast.dt_txt).toLocaleDateString()}</p>
                <p className="time">{new Date(forecast.dt_txt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                <p className="temp">{forecast.main.temp.toFixed(1)}{unitSymbol}</p>
                <p className="description">{forecast.weather[0].description}</p>
              </div>
            ))}
          </div>
          <div className="arrow right" onClick={scrollRight}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
