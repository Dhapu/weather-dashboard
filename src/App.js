import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import WeatherDisplay from './components/WeatherDisplay';
import Favorites from './components/Favorites';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState('metric'); 

  useEffect(() => {
   
    axios.get('http://localhost:5000/favorites')
      .then(response => setFavorites(response.data))
      .catch(error => console.error('Error fetching favorites:', error));
  }, []);

  const fetchWeather = (city) => {
    localStorage.setItem('lastCity', city);
    const apiKey = 'dbae6c7a52da4841791361e0d254c4d3';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`;

    axios.get(weatherUrl)
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => console.error('Error fetching weather data:', error));

    axios.get(forecastUrl)
      .then(response => {
        setForecastData(response.data);
      })
      .catch(error => console.error('Error fetching forecast data:', error));
  };

  const addFavorite = (city) => {
    if (!favorites.some(fav => fav.city === city)) {
      const newFavorite = { city };
      setFavorites([...favorites, newFavorite]);
      axios.post('http://localhost:5000/favorites', newFavorite)
        .catch(error => console.error('Error adding favorite:', error));
    }
  };

  const removeFavorite = (city) => {
    const favoriteToRemove = favorites.find(fav => fav.city === city);
    if (favoriteToRemove) {
      setFavorites(favorites.filter(fav => fav.city !== city));
      axios.delete(`http://localhost:5000/favorites/${favoriteToRemove.id}`)
        .catch(error => console.error('Error removing favorite:', error));
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };


  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9/5) + 32;
  };

  const fahrenheitToCelsius = (fahrenheit) => {
    return (fahrenheit - 32) * 5/9;
  };


  const adjustedWeatherData = weatherData && {
    ...weatherData,
    main: {
      ...weatherData.main,
      temp: unit === 'metric' ? weatherData.main.temp : celsiusToFahrenheit(weatherData.main.temp)
    }
  };

  const adjustedForecastData = forecastData && {
    ...forecastData,
    list: forecastData.list.map(item => ({
      ...item,
      main: {
        ...item.main,
        temp: unit === 'metric' ? item.main.temp : celsiusToFahrenheit(item.main.temp)
      }
    }))
  };

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <Search fetchWeather={fetchWeather} />
      <button className="ToggleButton" onClick={toggleUnit}>Toggle Celsius/Fahrenheit</button>
      {adjustedWeatherData && adjustedForecastData && (
        <WeatherDisplay weatherData={adjustedWeatherData} forecastData={adjustedForecastData} unit={unit} addFavorite={addFavorite} />
      )}
      <Favorites favorites={favorites} fetchWeather={fetchWeather} removeFavorite={removeFavorite} />
    </div>
  );
};

export default App;
