import React, { useState, useEffect } from 'react';
import { 
  FaTemperatureHigh, 
  FaWind, 
  FaTint,
  FaEye,
  FaArrowUp,
  FaSun,
  FaMoon 
} from 'react-icons/fa';

const WeatherCard = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location || !location.lat || !location.lng) return;

    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
        );
        const data = await response.json();
        console.log('Weather data:', data);
        if (data.cod === 200) {
          setWeatherData(data);
        } else {
          setError(data.message || 'Failed to fetch weather');
        }
      } catch (err) {
        setError('Weather service unavailable');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  if (!location) return null;

  if (loading) return (
    <div className="bg-white rounded-2xl shadow-lg border-x-2 border-b-2 border-t-0 border-[#818cf8] p-4">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="bg-white rounded-2xl shadow-lg border-x-2 border-b-2 border-t-0 border-[#818cf8] p-4 text-red-500">
      {error}
    </div>
  );

  if (!weatherData) return null;

  const getWeatherIcon = () => {
    const iconCode = weatherData.weather[0].icon;
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border-x-2 border-b-2 border-t-0 border-[#818cf8] p-4 mt-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-[#6366f1]">
          Weather Details
        </h3>
        <div className="flex items-center text-gray-600 font-semibold">
          <img 
            src={getWeatherIcon()} 
            alt={weatherData.weather[0].description}
            className="w-10 h-10"
          />
          <span className="ml-2 text-sm capitalize">
            {weatherData.weather[0].description}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm  text-gray-600 font-semibold">
        <div className="flex items-center gap-2">
          <FaTemperatureHigh className="text-red-400" />
          <div>
            <span>{weatherData.main.temp}°C</span>
            <div className="text-xs text-gray-400">
              Feels like {weatherData.main.feels_like}°C
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <FaWind className="text-blue-400" />
          <div>
            <span>{weatherData.wind.speed} m/s</span>
            {weatherData.wind.gust && (
              <div className="text-xs text-gray-400">
                Gust: {weatherData.wind.gust} m/s
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <FaTint className="text-blue-300" />
          <span>Humidity: {weatherData.main.humidity}%</span>
        </div>

        <div className="flex items-center gap-2">
          <FaArrowUp className="text-gray-600" />
          <span>Pressure: {weatherData.main.pressure} hPa</span>
        </div>

        {weatherData.visibility && (
          <div className="flex items-center gap-2">
            <FaEye className="" />
            <span>Visibility: {(weatherData.visibility / 1000).toFixed(1)} km</span>
          </div>
        )}

        {weatherData.sys && (
          <div className="flex items-center gap-2">
            {weatherData.sys.pod === 'd' ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-indigo-500" />
            )}
            <div className="font-semibold text-gray-600">
              <div>Sunrise: {formatTime(weatherData.sys.sunrise)}</div>
              <div>Sunset: {formatTime(weatherData.sys.sunset)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;