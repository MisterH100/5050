export function getToday() {
  let ms = Number(localStorage.getItem("time-skip")) || 0;
  if (ms == 0) {
    return new Date(Date.now());
  }
  let skip = new Date(ms + Date.now());
  return skip;
}
