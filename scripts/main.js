// ==================================
// HYBRID MASTER 51 — MAIN INITIALIZER
// ==================================

// ✅ Cette ligne va afficher une alerte quand le JS est bien chargé
alert("✅ Hybrid Master 51 est chargé !");

import { renderWorkout } from "./ui/workout-renderer.js";
import { renderNavigation } from "./ui/navigation-ui.js";

window.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("navigation");
  const container = document.getElementById("workout-container");

  function updateWorkout() {
    const weekSelect = document.getElementById("week-select");
    const daySelect = document.getElementById("day-select");

    if (!weekSelect || !daySelect) return;

    const week = parseInt(weekSelect.value);
    const day = daySelect.value;
    renderWorkout(container, week, day);
  }

  renderNavigation(nav, updateWorkout);
  updateWorkout();
});
