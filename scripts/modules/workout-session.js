// ==================================
// WORKOUT SESSION MODULE – version globale
// ==================================

window.getWorkout = function (week, day) {
  if (!window.PROGRAM_DATA) {
    console.error("❌ PROGRAM_DATA non défini !");
    return null;
  }
  const workout = PROGRAM_DATA.workouts[day];
  if (!workout) return null;

  // On adapte le poids mais si les fonctions de progression manquent, on garde le poids d’origine
  const baseFactor = 1;
  const adjustedExercises = workout.exercises.map(ex => {
    const baseWeight = ex.baseWeight || 50;
    const adjustedWeight = Math.round(baseWeight * baseFactor);
    return { ...ex, adjustedWeight };
  });

  return { ...workout, exercises: adjustedExercises };
};
