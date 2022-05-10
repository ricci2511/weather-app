import {
  format,
  fromUnixTime,
} from 'date-fns';

const isFahrenheit = () => document.querySelector('#switch').checked;

const setUpDailyWeatherData = (dailyWeather) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dailyDayValue = document.querySelectorAll('.weekly-day-value');
  const dailyWeatherIcon = document.querySelectorAll('.weekly-weather-icon');
  const dailyHumidityValue = document.querySelectorAll('.weekly-humidity-value');
  const dailyRainProbabilityValue = document.querySelectorAll('.weekly-rain-probability-value');
  const dailyHighTempValue = document.querySelectorAll('.high-temp-value');
  const dailyLowTempValue = document.querySelectorAll('.low-temp-value');

  dailyWeather.forEach((day, i) => {
    dailyDayValue[i].textContent = daysOfWeek[day.dayOfWeek];
    dailyWeatherIcon[i].src = `http://openweathermap.org/img/wn/${day.weatherIcon}.png`;
    dailyHumidityValue[i].textContent = `${day.humidity}%`;
    dailyRainProbabilityValue[i].textContent = `${Math.round(day.rainProbability * 100)}%`;
    dailyHighTempValue[i].textContent = `${Math.round(day.maxTemp)}°/`;
    dailyLowTempValue[i].textContent = `${Math.round(day.minTemp)}°`;
  });
};

const setUpCurrentWeatherData = (currentWeather) => {
  const locationName = document.querySelector('.location-name');
  const mainDescription = document.querySelector('.main-description');
  const weatherIcon = document.querySelector('.weather-icon');
  const degrees = document.querySelector('.degrees');
  const feelsLike = document.querySelector('.feels-like-temp');
  const minTemp = document.querySelector('.min-temp');
  const maxTemp = document.querySelector('.max-temp');
  const pressure = document.querySelector('.pressure');
  const humidity = document.querySelector('.humidity');
  const windSpeed = document.querySelector('.wind-speed');
  const sunrise = document.querySelector('.sunrise');
  const sunset = document.querySelector('.sunset');

  locationName.textContent = `${currentWeather.locationName}, ${currentWeather.country}`;
  mainDescription.textContent = currentWeather.weatherDescription.toUpperCase();
  weatherIcon.src = `https://openweathermap.org/img/wn/${currentWeather.weatherIcon}@2x.png`;
  degrees.textContent = `${currentWeather.temp}°`;
  feelsLike.textContent = `${currentWeather.feelsLike}°`;
  minTemp.textContent = `${currentWeather.tempMin}°`;
  maxTemp.textContent = `${currentWeather.tempMax}°`;
  pressure.textContent = `${currentWeather.pressure} hPa`;
  humidity.textContent = `${currentWeather.humidity}%`;
  windSpeed.textContent = `${currentWeather.windSpeed} ${isFahrenheit() ? 'mph' : 'km/h'}`;
  sunrise.textContent = format(fromUnixTime(new Date(currentWeather.sunrise)), 'HH:mm');
  sunset.textContent = format(fromUnixTime(new Date(currentWeather.sunset)), 'HH:mm');
};

export {
  isFahrenheit,
  setUpDailyWeatherData,
  setUpCurrentWeatherData,
};
