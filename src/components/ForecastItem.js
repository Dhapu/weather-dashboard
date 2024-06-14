import React from 'react';

const ForecastItem = ({ data, unit }) => {
  // Extract necessary data from props
  const { dt_txt, main, weather } = data;

  // Convert timestamp to readable date format
  const date = new Date(dt_txt).toLocaleDateString();

  // Determine temperature value based on unit (metric or imperial)
  const temperature = unit === 'metric' ? main.temp.toFixed(1) : ((main.temp * 9/5) + 32).toFixed(1);

  return (
    <div className="ForecastItem">
      <p>{date}</p>
      <p>{weather[0].description}</p>
      <p>Temperature: {temperature} {unit === 'metric' ? '°C' : '°F'}</p>
    </div>
  );
};

export default ForecastItem;
