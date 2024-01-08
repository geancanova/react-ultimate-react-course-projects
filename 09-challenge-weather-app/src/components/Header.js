import { useEffect, useRef, useState } from "react";
import { useKey } from "../hooks/useKey";

function Header({ userCity, onButtonClick, onSearchCity }) {
  const inputEl = useRef(null);
  const [city, setCity] = useState("");

  useKey("Enter", function () {
    if (!city) return;

    setCity((city) => sanitizeString(city));
    onSearchCity(city);
    inputEl.current.blur();
  });

  function sanitizeString(str) {
    return str.replace(/\s\s+/g, " ");
  }

  useEffect(() => setCity(userCity), [userCity]);

  return (
    <header className="header">
      <h1>
        <img
          src="https://openweathermap.org/img/wn/02d@2x.png"
          alt="The Forecaster"
        />
        <span>The Forecaster</span>
      </h1>
      <div>
        <input
          type="text"
          placeholder="Search for a city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => setCity("")}
          ref={inputEl}
        />
      </div>
      <p>
        Or <button onClick={onButtonClick}>click here</button> to get your
        current location
      </p>
    </header>
  );
}

export default Header;
