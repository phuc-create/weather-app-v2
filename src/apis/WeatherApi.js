import axios from "axios";
const URL = "https://api.openweathermap.org/data/2.5/forecast";

export const WeatherApi = {
  apiKey: "2c0660657c1fb3e59741fd9ca2f4fc95",
  name: "Weather_API",
};
export const getWeatherApi = () =>
  axios.post(`${URL}?id=1880252&units=metric&appid=${WeatherApi.apiKey}`);
