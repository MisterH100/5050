import { loadBanner } from "/src/banner.js";
import { storeData } from "/src/storage.js";
import { getToday } from "/src/time.js";
import {
  calulateTotalAmount,
  convertRandsToCents,
  playSoundEffect,
  showNotification,
} from "/src/util.js";
const TIME_OUT = 1000;
const T_RADIUS = 150;
const wheel = document.getElementById("wheel");
const wheelContainer = document.getElementById("wheelContainer");
let totalAmountElement = document.getElementById("totalAmount");
let submitBtn = document.getElementById("submitBtn");

export function rotateWheel(rDelta) {
  let state = JSON.parse(localStorage.getItem("appstate"));
  let currWheelRotation = state.currentWheelRotation;
  currWheelRotation += rDelta;
  wheel.style.transform = `rotate(${currWheelRotation}deg)`;
  rotateLabels(currWheelRotation);
  state.currentWheelRotation = currWheelRotation;
  storeData("appstate", state);
}

function rotateLabels(cwr) {
  let lables = document.querySelectorAll(".lable");
  lables.forEach((lable) => {
    lable.style.opacity = 0;
    let timer = setTimeout(() => {
      lable.classList.add("fade-in");
      clearTimeout(timer);
    }, TIME_OUT / 7);
    lable.style.transform = `rotate(-${cwr}deg)`;
  });
}

export function init() {
  let state = JSON.parse(localStorage.getItem("appstate"));
  let currentArray = state.currentArray;
  let selectedArray = state.selectedArray;
  let currentArrayLength = currentArray.length;
  if (currentArrayLength < 6) {
    for (let i = 0; i < 6 - currentArrayLength; i++) {
      currentArray.push(0);
    }
  }
  wheel.replaceChildren(" ");
  for (let i = 0; i < currentArray.length; i++) {
    let slice = document.createElement("div");
    slice.id = currentArray[i];
    slice.innerHTML = `<span class="lable">R${currentArray[i]}</span>`;
    slice.classList.add("slice");
    if (slice.id == "0") {
      slice.setAttribute("data-status", "disabled");
    }
    const angle = (360 / currentArray.length) * i;
    slice.style.transform = `rotate(${angle}deg)
                             translateY(-${T_RADIUS}px)
                             rotate(${-angle}deg)`;

    wheel.appendChild(slice);
  }

  if (state.clicksPerDay < 1) {
    showNotification("Let's stash again Tommorrow!");
    submitBtn.setAttribute("disabled", "");
    submitBtn.style.cursor = "not-allowed";
  } else {
    submitBtn.addEventListener("click", () => {
      submit();
    });
  }

  if (selectedArray.length > 0) {
    let slices = wheel.querySelectorAll("div");
    slices.forEach((slice) => {
      for (let i = 0; i < selectedArray.length; i++) {
        if (slice.id == selectedArray[i]) {
          slice.classList.add("slice-active");
        }
      }
    });
    let totalAmount = calulateTotalAmount(selectedArray);
    totalAmountElement.innerText = `Save R${totalAmount} Today`;
  }

  if (state.centerWheel) {
    centerWheel();
  }
}

function centerWheel() {
  wheelContainer.style.opacity = 0;
  wheelContainer.style.justifyContent = "center";
  let timer = setTimeout(() => {
    wheelContainer.classList.add("fade-in");
    clearTimeout(timer);
  }, TIME_OUT / 7);
}

function selectSlice(slice) {
  let state = JSON.parse(localStorage.getItem("appstate"));
  let selectedArray = state.selectedArray;
  let clicksPerDay = state.clicksPerDay;
  if (clicksPerDay < 1 && !selectedArray.includes(slice.id)) {
    showNotification("Daily limit reached!");

    return;
  }

  if (selectedArray.includes(slice.id)) {
    selectedArray = selectedArray.filter((item) => item != slice.id);
    state.clicksPerDay += 1;
    state.selectedArray = selectedArray;
    storeData("appstate", state);
    slice.classList.remove("slice-active");
  } else {
    selectedArray.push(slice.id);
    state.clicksPerDay -= 1;
    state.selectedArray = selectedArray;
    storeData("appstate", state);
    slice.classList.add("slice-active");
  }
  let totalAmount = calulateTotalAmount(selectedArray);
  totalAmountElement.innerText = `Save R${totalAmount} Today`;
}

export function submit() {
  let state = JSON.parse(localStorage.getItem("appstate"));
  let numArray = state.numArray;
  let selectedArray = state.selectedArray;
  let currentArray = state.currentArray;
  let totalAmount = calulateTotalAmount(selectedArray);
  let today = getToday();

  if (selectedArray < 1) {
    return;
  }

  for (let i = 0; i < selectedArray.length; i++) {
    currentArray = currentArray.filter((item) => item != selectedArray[i]);
  }

  let count = 6 - currentArray.length;
  if (!numArray.length < 1) {
    for (let i = 0; i < count; i++) {
      if (i >= numArray.length) {
        break;
      }
      currentArray.push(numArray[i]);
    }

    numArray = numArray.slice(count, numArray.length);
  }

  if (numArray.length <= currentArray.length && !state.centerWheel) {
    state.centerWheel = true;
    centerWheel();
  }

  playSoundEffect("/audio/money-bag-short.mp3");
  state.totalCents += convertRandsToCents(Number(totalAmount));
  state.completeDays += 1;
  state.numArray = numArray;
  state.currentArray = currentArray;
  state.selectedArray = [];
  state.lastSave = today;
  state.clicksPerDay = 0;
  storeData("appstate", state);
  totalAmountElement.innerText = `Save R0.00 Today`;
  init();
  addSliceEvent();
  loadBanner();

  let rotationDelta = 360 / 6;
  rotateWheel(rotationDelta);
}

export function addSliceEvent() {
  let slices = wheel.querySelectorAll("div");
  slices.forEach((slice) => {
    slice.addEventListener("click", () => {
      selectSlice(slice);
      return;
    });
  });
}
