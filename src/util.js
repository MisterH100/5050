import { getToday } from "/src/time.js";

export function convertRandsToCents(rands) {
  return Math.round(rands * 100);
}

export function convertCentsToRands(cents) {
  return cents / 100;
}

export function calulateTotalAmount(array) {
  let totalAmount = array.reduce(
    (previous, current) => Number(previous) + Number(current),
    0,
  );

  return totalAmount.toFixed(2);
}

export function calculatePercentage(cents, maxCents) {
  if (cents == maxCents) {
    return Math.floor((cents / maxCents) * 100);
  }
  return ((cents / maxCents) * 100).toFixed(1);
}

export function updatePercentage(percentage) {
  let percentageCounter = document.getElementById("percentageCounter");
  percentageCounter.innerHTML = `Saved: ${percentage}%`;
}

export function calculateMissedDays(last) {
  if (last == null) {
    return 0;
  }
  let today = getToday();
  today.setHours(0, 0, 0, 0);
  last = new Date(last);
  last.setHours(0, 0, 0, 0);

  let diff = today.getTime() - last.getTime();
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  days -= 1;
  if (days <= 1) {
    return 0;
  }

  return days;
}

export function isNewDay(today, last) {
  last = new Date(last);
  today.setHours(0, 0, 0, 0);
  last.setHours(0, 0, 0, 0);

  if (today.getTime() != last.getTime()) {
    return true;
  }
  return false;
}

export function playSoundEffect(file) {
  let effect = new Audio(file);
  if (!effect) {
    return;
  }
  effect.play();
}

export function showNotification(message) {
  let notifElement = document.getElementById("notification");
  notifElement.innerHTML = `<span>${message}</span>`;
  notifElement.classList.add("notification-active");

  let timeout = setTimeout(() => {
    notifElement.classList.remove("notification-active");
    clearTimeout(timeout);
  }, 3000);
}
