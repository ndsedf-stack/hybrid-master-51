// ==================================
// HYBRID MASTER 51 – VERSION STANDALONE
// ==================================

// ✅ Vérification du chargement JS
alert("✅ Hybrid Master 51 est chargé avec succès !");

// =============================
// PROGRAM DATA
// =============================
const PROGRAM_DATA = {
  totalWeeks: 26,
  days: ["Dimanche", "Mardi", "Vendredi", "Maison"],
  workouts: {
    Dimanche: {
      title: "Dos + Jambes Lourdes + Bras",
      exercises: [
        { name: "Squat", sets: 4, reps: "6-8", rest: "120s" },
        { name: "Soulevé de Terre", sets: 3, reps: "5", rest: "150s" },
        { name: "Traction pronation", sets: 4, reps: "6-10", rest: "90s" },
        { name: "Curl incliné", sets: 3, reps: "10-12", rest: "60s" }
      ]
    },
    Mardi: {
      title: "Pecs + Épaules + Triceps",
      exercises: [
        { name: "Développé couché", sets: 4, reps: "6-8", rest: "120s" },
        { name: "Développé militaire", sets: 3, reps: "8-10", rest: "90s" },
        { name: "Élévations latérales", sets: 3, reps: "12-15", rest: "45s" },
        { name: "Dips", sets: 3, reps: "max", rest: "60s" }
      ]
    },
    Vendredi: {
      title: "Dos + Jambes légères + Bras + Épaules",
      exercises: [
        { name: "Fentes marchées", sets: 3, reps: "12", rest: "60s" },
        { name: "Rowing barre", sets: 4, reps: "8-10", rest: "90s" },
        { name: "Curl marteau", sets: 3, reps: "10-12", rest: "45s" },
        { name: "Face pull", sets: 3, reps: "15", rest: "45s" }
      ]
    },
    Maison: {
      title: "Full Body entretien",
      exercises: [
        { name: "Pompes", sets: 3, reps: "20", rest: "45s" },
        { name: "Squat jump", sets: 3, reps: "15", rest: "45s" },
        { name: "Gainage", sets: 3, reps: "1min", rest: "30s" }
      ]
    }
  }
};

// =============================
// TIMER
// =============================
let timer;
function startTimer(seconds, onTick, onFinish) {
  clearInterval(timer);
  let remaining = seconds;
  timer = setInterval(() => {
    remaining--;
    if (remaining <= 0) {
      clearInterval(timer);
      if (onFinish) onFinish();
    } else if (onTick) {
      onTick(remaining);
    }
  }, 1000);
}

// =============================
// STATS
// =============================
const statsKey = "hm51_stats";
function saveSessionStat(day, week, exercises) {
  const stats = JSON.parse(localStorage.getItem(statsKey)) || [];
  stats.push({ day, week, exercises, date: new Date().toISOString() });
  localStorage.setItem(statsKey, JSON.stringify(stats));
}

// =============================
// WORKOUT RENDERER
// =============================
function renderWorkout(container, week, day) {
  container.innerHTML = "";
  const workout = PROGRAM_DATA.workouts[day];
  if (!workout) {
    container.textContent = "Aucune séance trouvée.";
    return;
  }

  const header = document.createElement("div");
  header.innerHTML = `<h2>${workout.title}</h2><p>${day}</p>`;
  container.appendChild(header);

  workout.exercises.forEach(ex => {
    const card = document.createElement("div");
    card.classList.add("exercise-card");
    card.innerHTML = `
      <h3>${ex.name}</h3>
      <p>${ex.sets} séries de ${ex.reps} — repos ${ex.rest}</p>
      <button>Démarrer repos</button>
      <div class="progress"><div class="bar"></div></div>
    `;

    const btn = card.querySelector("button");
    const bar = card.querySelector(".bar");
    btn.addEventListener("click", () => {
      startTimer(60, (s) => {
        bar.style.width = `${((60 - s) / 60) * 100}%`;
      }, () => {
        bar.style.width = "100%";
        saveSessionStat(day, week, [ex.name]);
      });
    });

    container.appendChild(card);
  });
}

// =============================
// NAVIGATION
// =============================
function renderNavigation(container, onChange) {
  const nav = document.createElement("div");

  const weekSelect = document.createElement("select");
  for (let i = 1; i <= PROGRAM_DATA.totalWeeks; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `Semaine ${i}`;
    weekSelect.appendChild(opt);
  }

  const daySelect = document.createElement("select");
  PROGRAM_DATA.days.forEach(d => {
    const opt = document.createElement("option");
    opt.value = d;
    opt.textContent = d;
    daySelect.appendChild(opt);
  });

  weekSelect.addEventListener("change", onChange);
  daySelect.addEventListener("change", onChange);

  nav.append(weekSelect, daySelect);
  container.appendChild(nav);
}

// =============================
// INIT APP
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("navigation");
  const container = document.getElementById("workout-container");

  function updateWorkout() {
    const week = parseInt(nav.querySelector("select").value);
    const day = nav.querySelectorAll("select")[1].value;
    renderWorkout(container, week, day);
  }

  renderNavigation(nav, updateWorkout);
  updateWorkout();
});
