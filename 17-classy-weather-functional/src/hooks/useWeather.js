import { useEffect, useState } from "react";

export function useWeather(location) {
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState({
    city: "",
    flag: "",
  });

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchWeather() {
        if (location.length < 2) return setWeather({});

        try {
          setIsLoading(true);

          // 1) Getting location (geocoding)
          const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${location}`,
            { signal: controller.signal }
          );
          const geoData = await geoRes.json();

          if (!geoData.results) throw new Error("Location not found");

          const { latitude, longitude, timezone, name, country_code } =
            geoData.results.at(0);

          setDisplayLocation({ city: name, flag: country_code.toLowerCase() });

          // 2) Getting actual weather
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
          );
          const weatherData = await weatherRes.json();

          setWeather({ ...weatherData.daily });
        } catch (err) {
          if (err.name !== "AbortError") console.error(err);
        } finally {
          setIsLoading(false);
        }
      }

      fetchWeather();

      return function () {
        controller.abort();
      };
    },
    [location]
  );

  return { isLoading, weather, displayLocation };
}
