import { useState, useEffect } from "react";

export function useGeolocation() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  useEffect(
    function () {
      function success(position) {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      }

      function error() {
        alert("Unable to retrieve your location");
      }

      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
      } else {
        navigator.geolocation.getCurrentPosition(success, error);
      }
    },
    [lat, lon]
  );
}
