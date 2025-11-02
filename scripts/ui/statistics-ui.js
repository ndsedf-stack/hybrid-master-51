// ==================================
// STATISTICS UI
// ==================================
import { getWeeklyProgression } from "../modules/statistics-engine.js";

export function renderStatistics(container) {
  const stats = getWeeklyProgression();
  container.innerHTML = `<h2 class="stats-title">📊 Progression Hebdomadaire</h2>`;
  const list = document.createElement("div");
  list.classList.add("stats-container");

  stats.forEach(s => {
    const item = document.createElement("div");
    item.classList.add("stat-item");
    item.innerHTML = `<span>Semaine ${s.week}</span><span>${s.sessions} séances</span>`;
    list.appendChild(item);
  });

  container.appendChild(list);
}
