import { useState, useRef } from "react";

// Custom Hooks
import { useKey } from "./hooks/useKey";

// Components
import Header from "./components/Header";
import Main from "./components/Main";
import Forecast from "./components/Forecast";
import Weather from "./components/Weather";
import Loader from "./components/Loader";

// Env vars
const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputEl = useRef(null);

  function getUserLocation() {
    function success(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      fetchWeatherData(lat, lon);
    }

    function error() {
      setError("Unable to retrieve your location");
    }

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  function fetchCityCoords(city) {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const cityData = data[0];
        const lat = cityData.lat;
        const lon = cityData.lon;

        fetchWeatherData(lat, lon);
      })
      .catch((err) => {
        setError("Sorry! We couldn't find the location you searched for =(");
      });
  }

  function fetchWeatherData(lat, lon) {
    setIsLoading(true);
    setError(false);

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const dataWeather = data.list;
        const dataWeatherDays = getEveryNth(dataWeather, 8);
        const dataWeatherInfo = dataWeatherDays.map((weather) => {
          const day = getWeekday(weather.dt);
          const temp = Math.round(weather.main.temp);
          const icon = weather.weather[0].icon;
          const status = weather.weather[0].main;

          return {
            day,
            temp,
            icon,
            status,
          };
        });

        setForecast(dataWeatherInfo);
        setIsLoading(false);
      })
      .catch((err) => setError(err.message));

    fetchCityName(lat, lon);
  }

  function fetchCityName(lat, lon) {
    fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCity(data[0].name);
      })
      .catch((err) => setError(err.message));
  }

  function getWeekday(dt) {
    const date = new Date(dt * 1000);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  }

  function getEveryNth(arr, nth) {
    const result = [];

    for (let i = 0; i < arr.length; i += nth) {
      result.push(arr[i]);
    }

    return result;
  }

  function handleSearchCity() {
    if (!city) return;

    setCity((city) => sanitizeString(city));
    fetchCityCoords(city);
    inputEl.current.blur();
  }

  useKey("Enter", handleSearchCity);

  function handleInputFocus() {
    if (!city) return;

    setForecast([]);
    setCity("");
  }

  function sanitizeString(str) {
    return str.replace(/\s\s+/g, " ");
  }

  return (
    <div className="app">
      <>
        <Header
          inputPlaceholder="Search for a city"
          inputVal={city}
          onInputChange={setCity}
          onInputFocus={handleInputFocus}
          onButtonClick={getUserLocation}
          inputRef={inputEl}
        />
        <Main>
          {(() => {
            if (isLoading) {
              return <Loader />;
            } else if (error) {
              return <p>{error}</p>;
            } else {
              if (forecast.length > 0) {
                return (
                  <Forecast city={city}>
                    {forecast.map((weather) => (
                      <Weather weather={weather} key={weather.day} />
                    ))}
                  </Forecast>
                );
              } else {
                return <p>Search for a city to see the forecast</p>;
              }
            }
          })()}
        </Main>
      </>
    </div>
  );
}

export default App;
