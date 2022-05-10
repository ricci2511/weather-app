import {
  setUpDailyWeatherData,
  setUpCurrentWeatherData,
} from './modules/UI';

import {
  proccessCurrentWeatherData,
  proccessDailyWeatherData,
  getForecast,
  getCoordinates,
} from './modules/weather';

const getWeather = async (location = 'Spain') => {
  try {
    const coords = await getCoordinates(location);
    const forecast = await getForecast(coords.lat, coords.lon);
    forecast.locationName = coords.locationName;
    forecast.country = coords.country;
    const currentWeatherObj = await proccessCurrentWeatherData(forecast);
    const dailyWeatherObjArr = await proccessDailyWeatherData(forecast);
    setUpCurrentWeatherData(currentWeatherObj);
    setUpDailyWeatherData(dailyWeatherObjArr);
  } catch (err) {
    console.error(err);
  }
};

const searchEvent = (e) => {
  if ((e.target.matches('.fa-magnifying-glass-location')) || (e.keyCode === 13)) {
    getWeather(document.querySelector('#search').value);
  }
};

const unitSwitcherEvent = (e) => {
  if (e.target.matches('#switch')) {
    const locationName = document.querySelector('.location-name').textContent.split(' ');
    locationName.pop();
    const nameWithoutIso = locationName.join(' ');
    getWeather(nameWithoutIso);
  }
};

const handleEvents = () => {
  document.addEventListener('click', (e) => {
    searchEvent(e);
    unitSwitcherEvent(e);
  });

  document.querySelector('#search').addEventListener('keydown', (e) => {
    searchEvent(e);
  });
};

const loadContent = () => {
  handleEvents();
  getWeather();
};

loadContent();
