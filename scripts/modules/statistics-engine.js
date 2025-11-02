// ==================================
// WORKOUT SESSION MODULE
// ==================================

import { PROGRAM_DATA } from "../core/program-data.js";
import { calculateProgression, getDeloadFactor } from "../core/progression-engine.js";

export function getWorkout(week, day) {
  const workout = PROGRAM_DATA.workouts[day];
  if (!workout) return null;

  const deload = getDeloadFactor(week);
  const adjustedExercises = workout.exercises.map(ex => {
    const baseWeight = ex.baseWeight || 50; // valeur par défaut
    const progression = calculateProgression(week, baseWeight);
    const adjustedWeight = Math.round(progression * deload);
    return { ...ex, adjustedWeight };
  });

  return { ...workout, exercises: adjustedExercises };
}
