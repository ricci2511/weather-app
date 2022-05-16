import {
  format,
  fromUnixTime,
} from 'date-fns';

const isFahrenheit = () => document.querySelector('#switch').checked;
const hideMainContent = () => document.querySelector('.container').classList.add('hidden');
const showMainContent = () => document.querySelector('.container').classList.remove('hidden');
const hideLoading = () => document.querySelector('.loading').classList.remove('active');

const displayLoading = () => {
  document.querySelector('.loading').classList.add('active');
  setTimeout(() => hideLoading(), 5000);
};

const createPicture = (weatherIcon) => {
  const weatherPicture = document.querySelector('.weather-picture');
  weatherPicture.innerHTML = `
    <source media="(min-width:375px)" srcset="https://openweathermap.org/img/wn/${weatherIcon}@4x.png">
    <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png">
  `;
};

const setUpDailyWeatherData = (dailyWeather) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dailyDayValue = document.querySelectorAll('.daily-day-value');
  const dailyWeatherIcon = document.querySelectorAll('.daily-weather-icon');
  const dailyHumidityValue = document.querySelectorAll('.daily-humidity-value');
  const dailyRainProbabilityValue = document.querySelectorAll('.daily-rain-probability-value');
  const dailyHighTempValue = document.querySelectorAll('.high-temp-value');
  const dailyLowTempValue = document.querySelectorAll('.low-temp-value');

  dailyWeather.forEach((day, i) => {
    dailyDayValue[i].textContent = daysOfWeek[day.dayOfWeek];
    dailyWeatherIcon[i].src = `https://openweathermap.org/img/wn/${day.weatherIcon}.png`;
    dailyHumidityValue[i].textContent = `${day.humidity}%`;
    dailyRainProbabilityValue[i].textContent = `${Math.round(day.rainProbability * 100)}%`;
    dailyHighTempValue[i].textContent = `${Math.round(day.maxTemp)}°/`;
    dailyLowTempValue[i].textContent = `${Math.round(day.minTemp)}°`;
  });
};

const setUpCurrentWeatherData = (currentWeather) => {
  const locationName = document.querySelector('.location-name');
  const mainDescription = document.querySelector('.main-description');
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
  createPicture(currentWeather.weatherIcon);
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
  hideMainContent,
  showMainContent,
  hideLoading,
  displayLoading,
  setUpDailyWeatherData,
  setUpCurrentWeatherData,
};
