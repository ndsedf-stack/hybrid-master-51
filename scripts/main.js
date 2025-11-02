import { renderWorkout } from "./ui/workout-renderer.js";
import { renderNavigation } from "./ui/navigation-ui.js";

const nav = document.getElementById("navigation");
const container = document.getElementById("workout-container");

function updateWorkout() {
  const week = parseInt(document.getElementById("week-select").value);
  const day = document.getElementById("day-select").value;
  renderWorkout(container, week, day);
}

renderNavigation(nav, updateWorkout);
document.addEventListener("DOMContentLoaded", updateWorkout);
