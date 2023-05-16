// App.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeather } from './actions/weatherActions';

const App = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector(state => state.weather);

  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);

  return (
    <div>
      {weatherData.loading ? (
        <p>Loading weather data...</p>
      ) : weatherData.error ? (
        <p>Error retrieving weather data.</p>
      ) : (
        <div>
          <h1>Current Weather</h1>
          <p>Temperature: {weatherData.weather.temperature}</p>
          <p>Humidity: {weatherData.weather.humidity}</p>
          <p>Wind Speed: {weatherData.weather.windSpeed}</p>
        </div>
      )}
    </div>
  );
};

export default App;

// actions/weatherActions.js
import axios from 'axios';

export const fetchWeather = () => {
  return dispatch => {
    dispatch({ type: 'FETCH_WEATHER_REQUEST' });

    axios
      .get('https://api.openweathermap.org/data/2.5/weather?q=cityname&appid=yourapikey')
      .then(response => {
        dispatch({
          type: 'FETCH_WEATHER_SUCCESS',
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: 'FETCH_WEATHER_FAILURE',
          payload: error.message
        });
      });
  };
};

// reducers/weatherReducer.js
const initialState = {
  loading: false,
  weather: {},
  error: ''
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_WEATHER_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'FETCH_WEATHER_SUCCESS':
      return {
        loading: false,
        weather: action.payload,
        error: ''
      };
    case 'FETCH_WEATHER_FAILURE':
      return {
        loading: false,
        weather: {},
        error: action.payload
      };
    default:
      return state;
  }
};

export default weatherReducer;
