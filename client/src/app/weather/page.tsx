'use client';

import "../globals.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { FiWind } from "react-icons/fi";
import { WiHumidity, WiSunrise, WiSunset } from "react-icons/wi";
import Loading from "../components/loading/loading";


export default function WeatherPage() {
  const [defaultCitiesWeather, setDefaultCitiesWeather] = useState<any[]>([]); // Weather for default cities
  const [weather, setWeather] = useState<{ main?: any; name?: string; sys?: any; weather?: any[]; wind?: any }>({});
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [defaultLoading, setDefaultLoading] = useState(false); // Separate loading state for default cities
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState("");

  // Ensure the API key is available
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_KEY;
  if (!apiKey) {
    console.error("Weather API key is missing. Please set NEXT_PUBLIC_WEATHER_KEY in your .env file.");
  }

  // Fetch weather for default cities on page load
  useEffect(() => {
    const defaultCities = ["Colombo", "Kandy", "Galle"];

    const fetchDefaultWeather = async () => {
      if (!apiKey) {
        setError("Weather API key is missing. Please contact the administrator.");
        return;
      }

      setDefaultLoading(true);
      setError(null);

      try {
        const weatherPromises = defaultCities.map(async (city) => {
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
          const response = await axios.get(url);
          return response.data;
        });

        const weatherData = await Promise.all(weatherPromises);
        setDefaultCitiesWeather(weatherData);
        console.log("Default Cities Weather Data:", weatherData);
      } catch (error) {
        console.error("Fetch Default Weather Error:", error);
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            setError("Invalid API key. Please contact the administrator.");
          } else if (error.response?.status === 429) {
            setError("Too many requests. Please try again later.");
          } else {
            setError("Failed to fetch default weather data. Please try again.");
          }
        } else {
          setError("An unexpected error occurred while fetching default weather data.");
        }
      } finally {
        setDefaultLoading(false);
      }
    };

    fetchDefaultWeather();
  }, []); // Empty dependency array to run only on page load

  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    if (!apiKey) {
      setError("Weather API key is missing. Please contact the administrator.");
      return;
    }

    setLoading(true);
    setError(null);
    setWeather({});
    setForecast([]);

    // Fetch current weather for the searched city
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
      const weatherResponse = await axios.get(weatherUrl);
      setWeather(weatherResponse.data);
      console.log("Current Weather Data:", weatherResponse.data);

      // Fetch 5-day forecast (OpenWeatherMap provides 3-hourly data, we'll aggregate it)
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
      const forecastResponse = await axios.get(forecastUrl);
      console.log("Forecast Data:", forecastResponse.data);

      // Process forecast data to get daily averages (for 10 days)
      const dailyForecast = processForecastData(forecastResponse.data.list);
      setForecast(dailyForecast);
    } catch (error) {
      console.error("Fetch Weather Error:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setError("City not found. Please check the spelling.");
        } else if (error.response?.status === 401) {
          setError("Invalid API key. Please contact the administrator.");
        } else if (error.response?.status === 429) {
          setError("Too many requests. Please try again later.");
        } else {
          setError("Failed to fetch weather data. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Process forecast data to get daily averages (for 10 days)
  const processForecastData = (forecastList: any[]) => {
    const dailyData: { [key: string]: { temps: number[]; icon: string } } = {};

    // Group forecast data by day
    forecastList.forEach((entry: any) => {
      const date = new Date(entry.dt * 1000);
      const dayKey = date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });

      if (!dailyData[dayKey]) {
        dailyData[dayKey] = { temps: [], icon: entry.weather[0].icon };
      }

      dailyData[dayKey].temps.push(entry.main.temp);
      // Use the weather icon from the midday forecast (around 12:00 PM)
      if (date.getHours() >= 12 && date.getHours() <= 15) {
        dailyData[dayKey].icon = entry.weather[0].icon;
      }
    });

    // Convert to array and calculate average temperature for each day
    const forecastArray = Object.keys(dailyData).map((day, index) => {
      const temps = dailyData[day].temps;
      const avgTemp = temps.reduce((sum: number, temp: number) => sum + temp, 0) / temps.length;
      return {
        day: index === 0 ? "Today" : day,
        temp: Math.round(avgTemp),
        icon: dailyData[day].icon,
      };
    });

    // Limit to 10 days (OpenWeatherMap free tier provides 5 days, so we'll repeat the last day if needed)
    const filledForecast = forecastArray.length >= 10 ? forecastArray : [...forecastArray];
    while (filledForecast.length < 10 && forecastArray.length > 0) {
      filledForecast.push({ ...forecastArray[forecastArray.length - 1], day: `Day ${filledForecast.length + 1}` });
    }
    return filledForecast.slice(0, 10);
  };

  const getWeatherIcon = (weatherCode: string) => {
    switch (weatherCode) {
      case '01d': return '☀️'; // clear sky day
      case '01n': return '🌙'; // clear sky night
      case '02d': case '02n': return '🌤️'; // few clouds
      case '03d': case '03n': return '☁️'; // scattered clouds
      case '04d': case '04n': return '☁️'; // broken clouds
      case '09d': case '09n': return '🌧️'; // shower rain
      case '10d': case '10n': return '🌦️'; // rain
      case '11d': case '11n': return '⛈️'; // thunderstorm
      case '13d': case '13n': return '❄️'; // snow
      case '50d': case '50n': return '🌫️'; // mist
      default: return '☁️';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-Poppins">
      {/* Content Area - Next to Sidebar */}
      <div className="flex-grow ">
        <div className="px-6 py-8">
          {/* Default Cities Weather */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center"><span className ="text-green-500">Agro</span> <span className ="text-green-800">Edge</span> Weather Forecast</h2>
            {defaultLoading && <Loading />}
            {error && (
              <div className="text-center mb-6 text-red-500 bg-red-50 mx-auto max-w-md p-2 rounded">
                {error}
              </div>
            )}
            {!defaultLoading && defaultCitiesWeather.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {defaultCitiesWeather.map((cityWeather, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center">
                    <h3 className="text-xl font-medium mb-2">{cityWeather.name}</h3>
                    <div className="text-5xl mb-2">
                      {cityWeather.weather && cityWeather.weather[0] && getWeatherIcon(cityWeather.weather[0].icon)}
                    </div>
                    <div className="text-3xl font-light mb-1">{Math.round(cityWeather.main.temp)}°C</div>
                    <div className="text-gray-600">
                      {cityWeather.weather && cityWeather.weather[0] && cityWeather.weather[0].main}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8 bg-green-50">
            <form onSubmit={fetchWeather} className="flex items-center w-full bg-green-100 rounded-full shadow-md overflow-hidden border border-gray-200">
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-grow px-4 py-3 bg-transparent border-none focus:outline-none text-gray-700"
                type="text"
                placeholder="Search for another city"
              />
              <button
                type="submit"
                className="px-4 py-3 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <BsSearch size={18} />
              </button>
            </form>
          </div>

          {/* Error Message (for search) */}
          {error && !defaultCitiesWeather.length && (
            <div className="text-center mb-6 text-red-500 bg-red-50 mx-auto max-w-md p-2 rounded">
              {error}
            </div>
          )}

          {/* Loading Indicator (for search) */}
          {loading && <Loading />}

          {/* Searched City Weather Display */}
          {!loading && weather.main && (
            <div>
              {/* Main Weather Card */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="flex items-center">
                  <div className="rounded-full bg-green-500 text-white px-4 py-1 mr-3">
                    {weather.name}
                  </div>
                  <div className="text-gray-500">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-8">
                  <div className="text-7xl font-light">
                    {Math.round(weather.main.temp)}°C
                  </div>
                  <div className="text-9xl">
                    {weather.weather && weather.weather[0] && getWeatherIcon(weather.weather[0].icon)}
                  </div>
                </div>

                <div className="mt-4 text-xl text-gray-600">
                  {weather.weather && weather.weather[0] && weather.weather[0].main}
                  <span className="text-sm ml-2">Feels like {Math.round(weather.main.feels_like)}°</span>
                </div>
              </div>

              {/* Weather Details Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Wind Status */}
                <div className="bg-white rounded-xl shadow-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-gray-500">Wind Status</h3>
                    <FiWind size={24} className="text-blue-500" />
                  </div>
                  <div className="flex items-end">
                    <span className="text-3xl font-medium">{weather.wind?.speed || 0}</span>
                    <span className="ml-1 text-gray-500">km/h</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    {weather.wind?.deg ? `Direction: ${weather.wind.deg}°` : 'N/A'}
                  </div>
                </div>

                {/* Humidity */}
                <div className="bg-white rounded-xl shadow-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-gray-500">Humidity</h3>
                    <WiHumidity size={32} className="text-teal-500" />
                  </div>
                  <div className="flex items-end">
                    <span className="text-3xl font-medium">{weather.main.humidity || 0}</span>
                    <span className="ml-1 text-gray-500">%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-teal-500 h-2 rounded-full"
                      style={{ width: `${weather.main.humidity || 0}%` }}
                    />
                  </div>
                </div>

                {/* Sunrise */}
                <div className="bg-white rounded-xl shadow-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-gray-500">Sunrise</h3>
                    <WiSunrise size={32} className="text-yellow-500" />
                  </div>
                  <div className="text-2xl font-medium">
                    {weather.sys?.sunrise
                      ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : 'N/A'}
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    {weather.sys?.sunrise
                      ? new Date(weather.sys.sunrise * 1000).toLocaleDateString()
                      : 'N/A'}
                  </div>
                </div>

                {/* Sunset */}
                <div className="bg-white rounded-xl shadow-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-gray-500">Sunset</h3>
                    <WiSunset size={32} className="text-orange-500" />
                  </div>
                  <div className="text-2xl font-medium">
                    {weather.sys?.sunset
                      ? new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : 'N/A'}
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    {weather.sys?.sunset
                      ? new Date(weather.sys.sunset * 1000).toLocaleDateString()
                      : 'N/A'}
                  </div>
                </div>
              </div>

              {/* 10 Day Forecast */}
              {forecast.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-medium mb-4">10 Day Forecast</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {forecast.map((day, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="font-medium">{day.day}</div>
                        <div className="text-4xl my-2">
                          {getWeatherIcon(day.icon)}
                        </div>
                        <div className="font-medium">{day.temp}°C</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}