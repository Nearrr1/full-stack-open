import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then((response) => response.data)
}

const getByName = (name) => {
  const request = axios.get(`${baseUrl}/name/${encodeURIComponent(name)}`)
  return request.then((response) => response.data)
}

const getWeather = (capital, apiKey, countryCode = '') => {
  if (!apiKey) {
    return Promise.reject(new Error('OpenWeatherMap API key is missing'))
  }
  const query = countryCode ? `${capital},${countryCode}` : capital
  const request = axios.get(
    `${weatherBaseUrl}?q=${encodeURIComponent(query)}&units=metric&appid=${apiKey}`
  )
  return request.then((response) => response.data)
}

export default {
  getAll,
  getByName,
  getWeather,
}
