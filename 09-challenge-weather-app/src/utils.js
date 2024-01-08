export function getWeekdayFromDatetime(dt) {
  const date = new Date(dt * 1000);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

export function getEveryNth(arr, nth) {
  const result = [];

  for (let i = 0; i < arr.length; i += nth) {
    result.push(arr[i]);
  }

  return result;
}

export function removeStringExtraSpaces(str) {
  return str.replace(/\s\s+/g, " ");
}
