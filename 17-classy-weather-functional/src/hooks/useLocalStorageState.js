import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? storedValue : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, value);
    },
    [value, key]
  );

  return [value, setValue];
}
