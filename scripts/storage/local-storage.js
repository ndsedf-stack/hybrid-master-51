// ==================================
// LOCAL STORAGE HANDLER
// ==================================
// Simplifie les interactions avec le localStorage du navigateur.

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("❌ Erreur lors de la sauvegarde dans le localStorage :", error);
  }
}

export function getFromStorage(key, defaultValue = null) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error("❌ Erreur lors de la lecture du localStorage :", error);
    return defaultValue;
  }
}

export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("❌ Erreur lors de la suppression dans le localStorage :", error);
  }
}
