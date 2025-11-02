// ==================================
// HYBRID MASTER 51 — MAIN INITIALIZER
// ==================================

console.log("✅ Hybrid Master 51 — script principal chargé.");

// Vérifie que les fonctions existent
if (typeof renderWorkout === "undefined" || typeof renderNavigation === "undefined") {
  alert("⚠️ Les fonctions de rendu ne sont pas encore chargées !");
}

// Fonction principale
window.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("navigation");
  const container = document.getElementById("workout-container");

  if (!nav || !container) {
    console.error("❌ Éléments #navigation ou #workout-container introuvables.");
    return;
  }

  function updateWorkout() {
    const weekSelect = document.getElementById("week-select");
    const daySelect = document.getElementById("day-select");

    if (!weekSelect || !daySelect) return;

    const week = parseInt(weekSelect.value);
    const day = daySelect.value;

    if (typeof renderWorkout === "function") {
      renderWorkout(container, week, day);
    } else {
      console.warn("⚠️ renderWorkout n'est pas défini !");
    }
  }

  if (typeof renderNavigation === "function") {
    renderNavigation(nav, updateWorkout);
  } else {
    console.warn("⚠️ renderNavigation n'est pas défini !");
  }

  updateWorkout();
});
