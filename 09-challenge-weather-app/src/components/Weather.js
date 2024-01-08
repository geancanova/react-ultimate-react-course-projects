function Weather({ weather }) {
  return (
    <div className="weather">
      <h3 className="weather-day">{weather.day}</h3>
      <img
        className="weather-icon"
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={weather.status}
      />
      <span
        className={`weather-degrees  ${weather.temp >= 20 ? "hot" : "cold"}`}
      >
        {weather.temp}ºC
      </span>
      <span className="weather-type">{weather.status}</span>
    </div>
  );
}

export default Weather;
