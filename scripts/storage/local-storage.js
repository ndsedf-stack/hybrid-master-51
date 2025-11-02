// ==================================
// LOCAL STORAGE MANAGER
// ==================================
const key = "hm51_user_data";

export function saveData(data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadData() {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

export function clearData() {
  localStorage.removeItem(key);
}
