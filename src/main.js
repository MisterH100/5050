import { init, addSliceEvent, rotateWheel } from "/src/wheel.js";
import { storeData } from "/src/storage.js";
import { loadBanner } from "/src/banner.js";
import { isNewDay } from "/src/util.js";
import { getToday } from "/src/time.js";

let appState = JSON.parse(localStorage.getItem("appstate"));

if (!appState) {
  let numArray = Array.from({ length: 100 }, (_, i) => i + 1);
  let activeArray = numArray.slice(0, 6);
  appState = {
    numArray: numArray.slice(6, 100),
    currentArray: activeArray,
    selectedArray: [],
    centerWheel: false,
    currentWheelRotation: 0,
    totalCents: 0,
    clicksPerDay: 2,
    currentStreak: 0,
    completeDays: 0,
    lastSave: null,
  };

  storeData("appstate", appState);
}

function loadApp() {
  let state = JSON.parse(localStorage.getItem("appstate"));
  if (state.lastSave != null) {
    let today = getToday();
    if (isNewDay(today, state.lastSave)) {
      state.clicksPerDay = 2;
      storeData("appstate", state);
    }
  }

  loadBanner();
  init();
  addSliceEvent();
  rotateWheel(0);
}

loadApp();
