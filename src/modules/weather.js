import {
  getDay,
  fromUnixTime,
} from 'date-fns';

import {
  isFahrenheit,
} from './UI';

const proccessCurrentWeatherData = async (data) => {
  const currentWeather = {
    locationName: data.locationName,
    country: data.country,
    feelsLike: data.current.feels_like,
    humidity: data.current.humidity,
    temp: data.current.temp,
    tempMax: data.daily[0].temp.max,
    tempMin: data.daily[0].temp.min,
    pressure: data.current.pressure,
    sunrise: data.current.sunrise,
    sunset: data.current.sunset,
    weatherDescription: data.current.weather[0].description,
    weatherIcon: data.current.weather[0].icon,
    windSpeed: data.current.wind_speed,
  };

  return currentWeather;
};

const proccessDailyWeatherData = async (data) => {
  const dailyData = data.daily;
  const dailyWeatherArr = [];

  for (let i = 1; i < dailyData.length; i++) {
    const dayObj = {
      dayOfWeek: getDay(fromUnixTime(new Date(dailyData[i].dt))),
      weatherIcon: dailyData[i].weather[0].icon,
      humidity: dailyData[i].humidity,
      rainProbability: dailyData[i].pop,
      maxTemp: dailyData[i].temp.max,
      minTemp: dailyData[i].temp.min,
    };

    dailyWeatherArr.push(dayObj);
  }

  return dailyWeatherArr;
};

const getForecast = async (lat, lon) => {
  try {
    const weatherAPI = isFahrenheit()
      ? await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=575c28b3720b53957d8afb0bbbdaefa6&units=imperial`)
      : await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=575c28b3720b53957d8afb0bbbdaefa6&units=metric`);

    const forecastData = await weatherAPI.json();

    return forecastData;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getCoordinates = async (location) => {
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=575c28b3720b53957d8afb0bbbdaefa6`;
  try {
    const api = await fetch(endpoint);
    const apiData = await api.json();
    const { coord } = apiData;
    coord.locationName = apiData.name;
    coord.country = apiData.sys.country;

    return coord;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export {
  proccessCurrentWeatherData,
  proccessDailyWeatherData,
  getForecast,
  getCoordinates,
};
