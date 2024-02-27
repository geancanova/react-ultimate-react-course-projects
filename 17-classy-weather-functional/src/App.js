import Input from "./components/Input";
import Weather from "./components/Weather";
import { useWeather } from "./hooks/useWeather";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

function App() {
  const [location, setLocation] = useLocalStorageState("", "location");
  const { weather, isLoading, displayLocation } = useWeather(location);

  // if (location) localStorage.setItem("location", location);

  return (
    <div className="app">
      <h1>Classy Weather</h1>

      <Input location={location} onChangeLocation={setLocation} />

      {isLoading && <p className="loader">Loading...</p>}

      {weather.weathercode && (
        <Weather
          weather={weather}
          flag={displayLocation.flag}
          city={displayLocation.city}
        />
      )}
    </div>
  );
}

export default App;
