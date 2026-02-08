import { getToday } from "/src/time.js";
import { calculateMissedDays, calculatePercentage } from "/src/util.js";
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MAX_CENTS = 505000;
const dayElement = document.getElementById("dayElement");
let completeCounter = document.getElementById("completeDays");
let missedCounter = document.getElementById("missedDays");
let percentageCounter = document.getElementById("percentageCounter");

export function loadBanner() {
  let state = JSON.parse(localStorage.getItem("appstate"));
  let today = getToday();
  let currentDay = DAYS[today.getDay()];
  let currentDate = today.getDate();
  let percentage = calculatePercentage(state.totalCents, MAX_CENTS);
  let missedDays = calculateMissedDays(state.lastSave);

  if (!state.lastSave == null) {
    missedDays = calculateMissedDays(state.lastSave);
  }

  dayElement.innerHTML = `
        <span class="day">${currentDay}</span>
        <span class="date">${currentDate}</span>`;
  completeCounter.innerHTML = `Complete Days: ${state.completeDays}`;
  missedCounter.innerHTML = `Missed Days: ${missedDays}`;
  percentageCounter.innerHTML = `Saved: ${percentage}%`;
}

// const MONTHS = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];
// const CURRENTDATE = new Date();
// const CURRENTMONTH = CURRENTDATE.getMonth();
// const CURRENTYEAR = CURRENTDATE.getFullYear();
// const DAYSINMONTH = new Date(CURRENTYEAR, CURRENTMONTH + 1, 0).getDate();
// const FIRSTDAY = new Date(CURRENTYEAR, CURRENTMONTH, 1).getDay();
// const CURRENTDAY = DAYS[CURRENTDATE.getDay()];
