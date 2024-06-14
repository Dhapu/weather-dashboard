# Weather Dashboard Application
This application displays current weather and a 5-day forecast for a city. Users can manage favorite cities and toggle between Celsius and Fahrenheit units.

## Set up API data with json-server:

Ensure you have json-server installed globally. If not, install it using:
npm install -g json-server
Create a file named db.json in the root directory of the project. This file will simulate your API data.

### Start json-server to serve API data:
Run the following command to start json-server:
json-server --watch db.json --port 5000
This command starts json-server on port 5000 and serves data from db.json.

### Setting Up API Key
1.) Obtain an API key from OpenWeatherMap:
-Go to OpenWeatherMap and sign up.
-Navigate to the API keys section under your account settings.
-Generate a new API key.
2.) Create the .env file:
  In the root directory of the project, create a file named .env.
3.) Add your API key to .env:
   Open the .env file and add your API key in the following format:
   REACT_APP_OPENWEATHERMAP_API_KEY=your_api_key_here
   Replace your_api_key_here with the API key you obtained from OpenWeatherMap.

### Running the Application
Start the application: npm start
This command starts the development server and opens the application in your default web browser.

### Usage
1.)Enter a city name to view weather information.
2.)Click "Toggle Celsius/Fahrenheit" to switch temperature units.
3.)Manage favorite cities by adding or removing them.

### Technologies Used
1.)React
2.)Axios for API requests
3.)FontAwesome for icons
4.)json-server for simulating API data

### Credits
Weather data provided by OpenWeatherMap# Getting Started with Create React App



