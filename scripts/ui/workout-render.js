// ==================================
// WORKOUT RENDERER
// ==================================
import { getWorkout } from "../modules/workout-session.js";
import { startTimer } from "../modules/timer-manager.js";
import { saveSessionStat } from "../modules/statistics-engine.js";

export function renderWorkout(container, week, day) {
  container.innerHTML = "";
  const workout = getWorkout(week, day);
  if (!workout) {
    container.textContent = "Aucune séance trouvée.";
    return;
  }

  const header = document.createElement("div");
  header.classList.add("workout-header");
  header.innerHTML = `<h2>${workout.title}</h2><p class="workout-day">${day}</p>`;
  container.appendChild(header);

  workout.exercises.forEach(ex => {
    const card = document.createElement("div");
    card.classList.add("exercise-card");

    card.innerHTML = `
      <h3 class="exercise-title">${ex.name}</h3>
      <p class="exercise-details">${ex.sets} séries de ${ex.reps} — repos ${ex.rest}</p>
      <p class="exercise-weight">Poids suggéré : ${ex.adjustedWeight || "-"} kg</p>
      <button class="start-rest">Démarrer repos</button>
      <div class="exercise-progress"><div class="exercise-progress-bar"></div></div>
    `;

    card.querySelector(".start-rest").addEventListener("click", () => {
      const progress = card.querySelector(".exercise-progress-bar");
      startTimer(60, (s) => {
        const ratio = ((60 - s) / 60) * 100;
        progress.style.width = `${ratio}%`;
      }, () => {
        progress.style.width = "100%";
        saveSessionStat(day, week, [ex.name]);
      });
    });

    container.appendChild(card);
  });
}
