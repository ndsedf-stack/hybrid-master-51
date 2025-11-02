// =============================
// VALIDATION ENGINE
// =============================

import { PROGRAM_DATA } from "./program-data.js";

export function validateProgram() {
  const errors = [];

  if (!PROGRAM_DATA.days || PROGRAM_DATA.days.length < 3)
    errors.push("❌ Jours d'entraînement manquants");

  for (const day of PROGRAM_DATA.days) {
    const workout = PROGRAM_DATA.workouts[day];
    if (!workout) errors.push(`❌ Aucune séance pour le jour ${day}`);
    if (!workout.exercises || workout.exercises.length === 0)
      errors.push(`❌ Pas d'exercices pour ${day}`);
  }

  if (errors.length > 0) {
    console.warn("⚠️ Erreurs détectées :", errors);
    return false;
  }

  console.log("✅ Programme validé avec succès !");
  return true;
}
