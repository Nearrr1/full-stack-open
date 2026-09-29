import { useState, useEffect } from 'react'
import countryService from '../services/countries'

const Weather = ({ capital, countryCode }) => {
  const [weather, setWeather] = useState(null)
  const [fetchError, setFetchError] = useState(null)

  const apiKey = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    if (!capital || !apiKey) {
      return
    }

    countryService
      .getWeather(capital, apiKey, countryCode)
      .then((data) => {
        setWeather(data)
        setFetchError(null)
      })
      .catch((err) => {
        console.error('Weather fetch error:', err)
        setFetchError('Could not fetch weather data for ' + capital)
      })
  }, [capital, apiKey, countryCode])

  if (!capital) {
    return null
  }

  const error = !apiKey
    ? 'Weather data unavailable: OpenWeatherMap API key (VITE_SOME_KEY) is not set.'
    : fetchError

  return (
    <div className="weather-container">
      <h2>Weather in {capital}</h2>
      {error && (
        <p>
          <em>{error}</em>
        </p>
      )}
      {weather && weather.main && weather.weather && weather.weather[0] && (
        <div>
          <p>temperature {weather.main.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>wind {weather.wind?.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default Weather
