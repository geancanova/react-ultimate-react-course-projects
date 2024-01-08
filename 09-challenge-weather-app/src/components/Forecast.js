function Forecast({ city, children }) {
  return (
    <>
      <h2>
        5 day weather forecast for <span>{city}</span>:
      </h2>
      <div className="forecast">{children}</div>
    </>
  );
}

export default Forecast;
