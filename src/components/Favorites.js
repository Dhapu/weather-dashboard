import React from 'react';

const Favorites = ({ favorites, fetchWeather, removeFavorite }) => {
  return (
    <div className="Favorites">
      <h3>Favorite Cities</h3>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            {favorite.city}
            <button className="weather-button" onClick={() => fetchWeather(favorite.city)}>Show Weather</button>
            <button className="remove-button" onClick={() => removeFavorite(favorite.city)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
