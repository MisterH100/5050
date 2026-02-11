import tutorialData from "/src/tutorialData.js";
import { storeData } from "/src/storage.js";
const body = document.getElementById("body");
const banner = document.getElementById("banner");
const wheelContainer = document.getElementById("wheelContainer");
const bottomContainer = document.getElementById("bottomContainer");
const overlay = document.createElement("div");
let infoConatiner = document.createElement("div");
let stage = 1;

export function showTutorial() {
  overlay.classList.add("tutorial-overlay");
  body.appendChild(overlay);

  switch (stage) {
    case 1:
      highlightElement(banner);
      displayInfo(tutorialData.banner.name, tutorialData.banner.tutorial, 200);
      break;
    case 2:
      removeHighlight(banner);
      highlightElement(wheelContainer);
      displayInfo(tutorialData.wheel.name, tutorialData.wheel.tutorial, 0);
      break;
    case 3:
      removeHighlight(wheelContainer);
      highlightElement(bottomContainer);
      displayInfo(tutorialData.submit.name, tutorialData.submit.tutorial, 450);
      break;

    default:
      break;
  }
}

function highlightElement(element) {
  element.classList.add("highlight");
}

function removeHighlight(element) {
  element.classList.remove("highlight");
}

function finishTutorial() {
  let state = JSON.parse(localStorage.getItem("appstate"));
  state.firstLaunch = false;
  storeData("appstate", state);
  window.location.reload();
}

function displayInfo(elementName, tutorial, yPosition) {
  infoConatiner.innerHTML = `
      <h2>${elementName} <span>${stage}</stage></h2>
      <p>${tutorial}</p>
      <button id="next">Next</button>
  `;
  infoConatiner.style.top = `${yPosition}px`;
  infoConatiner.classList.add("tutorial-info");

  overlay.appendChild(infoConatiner);
  let nextBtn = document.getElementById("next");
  nextBtn.addEventListener("click", () => {
    if (stage >= 3) {
      finishTutorial();
      return;
    }
    stage += 1;
    showTutorial();
  });
}
