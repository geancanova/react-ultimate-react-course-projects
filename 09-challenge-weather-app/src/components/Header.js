function Header({
  inputPlaceholder,
  inputVal,
  inputRef,
  onInputChange,
  onInputFocus,
  onButtonClick,
}) {
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
          placeholder={inputPlaceholder}
          value={inputVal}
          onChange={(e) => onInputChange(e.target.value)}
          onFocus={onInputFocus}
          ref={inputRef}
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
