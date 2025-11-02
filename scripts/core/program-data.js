// =============================
// PROGRAM DATA – HYBRID MASTER 51
// =============================

export const PROGRAM_DATA = {
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
