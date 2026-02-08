export const storeData = (key, data) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  } else if (typeof sessionStorage !== "undefined") {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
};

export const removeData = (key) => {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(key);
  } else if (typeof sessionStorage !== "undefined") {
    sessionStorage.removeItem(key);
  }
};
