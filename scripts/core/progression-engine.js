// ===================================================================
// HYBRID MASTER 51 - MOTEUR DE CALCUL DES PROGRESSIONS
// ===================================================================
// 
// Calcule automatiquement :
// - Poids pour chaque semaine
// - Techniques d'intensification par bloc
// - Progression vers objectifs
// - Volume d'entraînement
//
// ===================================================================

class ProgressionEngine {
  constructor(programData) {
    this.programData = programData;
  }

  // ============================================
  // CALCUL DU POIDS POUR UNE SEMAINE
  // ============================================
  calculateWeight(exercise, week) {
    const { startWeight, increment, frequency } = exercise;
    const isDeload = this.programData.getDeloadWeeks().includes(week);
    
    let progressions = 0;
    
    // Compter les progressions jusqu'à cette semaine
    for (let w = 1; w <= week; w++) {
      // Ignorer les semaines deload pour les progressions
      if (this.programData.getDeloadWeeks().includes(w)) continue;
      
      // Ajouter progression selon fréquence
      if ((w - 1) % frequency === 0) {
        progressions++;
      }
    }
    
    // Calculer le poids
    let weight = startWeight + (increment * progressions);
    
    // Appliquer réduction deload si nécessaire
    if (isDeload) {
      weight = weight * 0.6; // -40%
    }
    
    return Math.round(weight * 10) / 10;
  }

  // ============================================
  // TECHNIQUES D'INTENSIFICATION
  // ============================================
  getTechniques(week, exerciseName) {
    const block = this.getBlock(week);
    if (!block || this.isDeloadWeek(week)) return [];
    
    const techniques = [];
    
    // BLOC 1 : TEMPO CONTRÔLÉ
    if (block.number === 1) {
      techniques.push(`Tempo ${block.tempo} (3s descente, 1s pause, 2s montée)`);
      
      // Pauses isométriques spécifiques
      const pausesExercises = {
        "Cable Fly (poulies moyennes)": "Pause 2s bras écartés - Étirement maximal pectoraux",
        "Cable Fly": "Pause 2s bras écartés - Étirement maximal pectoraux",
        "Dumbbell Fly": "Pause 2s bras écartés - Tension continue pectoraux",
        "Incline Curl": "Pause 2s bras tendus - Étirement biceps complet",
        "Spider Curl": "Pause 2s bras tendus - Étirement biceps complet",
        "EZ Bar Curl": "Pause 2s bras tendus - Amplitude maximale biceps",
        "Lateral Raises": "Pause 1s bras horizontaux - Pic de contraction deltoïdes",
        "Face Pull": "Pause 1s contraction arrière - Activation postérieure"
      };
      
      if (pausesExercises[exerciseName]) {
        techniques.push(`⏱️ ${pausesExercises[exerciseName]}`);
      }
    }
    
    // BLOC 2 : REST-PAUSE
    if (block.number === 2) {
      techniques.push(`Tempo ${block.tempo}`);
      
      const restPauseExercises = {
        "Trap Bar Deadlift": "Série 5: 6-8 reps → repos 20s → 2-3 reps supplémentaires (fatigue neurale)",
        "Dumbbell Press": "Série 5: 10 reps → repos 20s → 3-4 reps supplémentaires (volume accru)",
        "Landmine Row": "Série 5: 10 reps → repos 20s → 3-4 reps supplémentaires (endurance dos)"
      };
      
      if (restPauseExercises[exerciseName]) {
        techniques.push(`🔄 REST-PAUSE: ${restPauseExercises[exerciseName]}`);
      }
    }
    
    // BLOC 3 : DROP-SETS + MYO-REPS
    if (block.number === 3) {
      const dropSets = {
        "Goblet Squat": "Série 4: -25% charge → 8-10 reps supplémentaires (fatigue quadriceps)",
        "Leg Press": "Série 4: -25% charge → 10-12 reps supplémentaires (pompage sanguin)",
        "Lat Pulldown (prise large)": "Série 4: -20% charge → 8-10 reps supplémentaires",
        "Dumbbell Press": "Série 5: -25% charge → 8-10 reps supplémentaires",
        "Cable Fly (poulies moyennes)": "Série 4: -25% charge → 10-12 reps supplémentaires",
        "Extension Triceps Corde": "Série 5: -20% charge → 10-12 reps supplémentaires",
        "Lateral Raises": "Série 5: -25% charge → 12-15 reps supplémentaires",
        "Landmine Row": "Série 5: -20% charge → 8-10 reps supplémentaires",
        "Leg Curl": "Série 5: -25% charge → 10-12 reps supplémentaires",
        "Leg Extension": "Série 4: -25% charge → 12-15 reps supplémentaires",
        "Dumbbell Fly": "Série 4: -25% charge → 10-12 reps supplémentaires"
      };
      
      if (dropSets[exerciseName]) {
        techniques.push(`📉 DROP-SET: ${dropSets[exerciseName]}`);
      }
      
      const myoReps = {
        "Face Pull": "Série 5: 15 reps → repos 5s → 5×5 reps (activation postérieure)",
        "Overhead Extension (corde, assis)": "Série 4: 12 reps → repos 5s → 4×4 reps (triceps longs)",
        "Overhead Extension": "Série 4: 12 reps → repos 5s → 4×4 reps (triceps longs)",
        "Incline Curl": "Série 4: 12 reps → repos 5s → 4×4 reps (biceps)",
        "Spider Curl": "Série 4: 12 reps → repos 5s → 4×4 reps (biceps)",
        "Cable Fly": "Série 4: 15 reps → repos 5s → 5×5 reps (pectoraux)",
        "Rowing Machine (prise large)": "Série 4: 12 reps → repos 5s → 4×4 reps (dos)",
        "Rowing Machine (prise serrée)": "Série 4: 12 reps → repos 5s → 4×4 reps (dos)"
      };
      
      if (myoReps[exerciseName]) {
        techniques.push(`⚡ MYO-REPS: ${myoReps[exerciseName]}`);
      }
    }
    
    // BLOC 4 : CLUSTERS + PARTIALS + MYO-REPS
    if (block.number === 4) {
      const clusterSets = {
        "Trap Bar Deadlift": "Série 5: 3 reps → 20s → 2 reps → 20s → 2 reps (7 total - intensité maximale)",
        "Dumbbell Press": "Série 5: 4 reps → 15s → 3 reps → 15s → 3 reps (10 total - volume qualité)",
        "Landmine Row": "Série 5: 4 reps → 15s → 3 reps → 15s → 3 reps (10 total - endurance)",
        "Leg Press": "Série 4: 4 reps → 20s → 3 reps → 20s → 3 reps (10 total - puissance)"
      };
      
      if (clusterSets[exerciseName]) {
        techniques.push(`🎯 CLUSTER SETS: ${clusterSets[exerciseName]}`);
      }
      
      const partials = {
        "Goblet Squat": "Série 4: 10 complètes → 5 demi-reps amplitude haute (brûlure quadriceps)",
        "Leg Press": "Série 4: 10 complètes → 8 quarts de reps (congestion extrême)",
        "Leg Curl": "Série 5: 12 complètes → 6-8 partials amplitude haute (ischios)",
        "Leg Extension": "Série 4: 15 complètes → 10 partials derniers 30° (quadriceps)"
      };
      
      if (partials[exerciseName]) {
        techniques.push(`🔪 PARTIALS: ${partials[exerciseName]}`);
      }
      
      // Myo-reps sur TOUTES les isolations
      const isolationExercises = [
        "Cable Fly (poulies moyennes)", "Cable Fly", "Dumbbell Fly",
        "Extension Triceps Corde", "Overhead Extension (corde, assis)", "Overhead Extension",
        "Lateral Raises", "Face Pull",
        "Incline Curl", "Spider Curl", "EZ Bar Curl", "Hammer Curl",
        "Wrist Curl"
      ];
      
      if (isolationExercises.includes(exerciseName)) {
        techniques.push(`⚡ MYO-REPS: Dernière série → repos 5s → 3-5 mini-sets jusqu'à échec`);
      }
    }
    
    return techniques;
  }

  // ============================================
  // CALCUL PROGRESSION VERS OBJECTIF
  // ============================================
  calculateProgression(exercise, currentWeek) {
    const currentWeight = this.calculateWeight(exercise, currentWeek);
    const { startWeight, targetWeight } = exercise;
    
    const progress = ((currentWeight - startWeight) / (targetWeight - startWeight)) * 100;
    
    return {
      current: currentWeight,
      start: startWeight,
      target: targetWeight,
      progress: Math.min(100, Math.max(0, progress)),
      remaining: targetWeight - currentWeight,
      weeksRemaining: 26 - currentWeek
    };
  }

  // ============================================
  // CALCUL VOLUME D'ENTRAÎNEMENT
  // ============================================
  calculateVolume(workout, week) {
    let totalVolume = 0;
    let muscleVolume = {};
    
    workout.exercises.forEach(exercise => {
      const weight = this.calculateWeight(exercise, week);
      const reps = typeof exercise.reps === 'number' ? 
        exercise.reps : 
        parseInt(exercise.reps.split('-')[0]);
      
      const exerciseVolume = weight * reps * exercise.sets;
      totalVolume += exerciseVolume;
      
      // Volume par muscle
      if (exercise.muscles) {
        // Volume direct (muscles primaires)
        exercise.muscles.primary.forEach(muscle => {
          if (!muscleVolume[muscle]) muscleVolume[muscle] = { direct: 0, indirect: 0 };
          muscleVolume[muscle].direct += exerciseVolume;
        });
        
        // Volume indirect (muscles secondaires)
        exercise.muscles.secondary.forEach(muscle => {
          if (!muscleVolume[muscle]) muscleVolume[muscle] = { direct: 0, indirect: 0 };
          muscleVolume[muscle].indirect += exerciseVolume * 0.6;
        });
        
        // Volume tertiaire
        exercise.muscles.tertiary.forEach(muscle => {
          if (!muscleVolume[muscle]) muscleVolume[muscle] = { direct: 0, indirect: 0 };
          muscleVolume[muscle].indirect += exerciseVolume * 0.3;
        });
      }
    });
    
    return {
      total: Math.round(totalVolume),
      byMuscle: muscleVolume,
      totalTonnage: Math.round(totalVolume / 1000) // en tonnes
    };
  }

  // ============================================
  // CALCUL VOLUME HEBDOMADAIRE COMPLET
  // ============================================
  calculateWeeklyVolume(week) {
    const days = ['dimanche', 'mardi', 'vendredi'];
    const weeklyVolume = {};
    let totalWeeklyVolume = 0;
    
    days.forEach(day => {
      const workout = this.programData.getWorkout(day);
      const volume = this.calculateVolume(workout, week);
      
      totalWeeklyVolume += volume.total;
      
      // Agréger par muscle
      Object.entries(volume.byMuscle).forEach(([muscle, vol]) => {
        if (!weeklyVolume[muscle]) {
          weeklyVolume[muscle] = { direct: 0, indirect: 0 };
        }
        weeklyVolume[muscle].direct += vol.direct;
        weeklyVolume[muscle].indirect += vol.indirect;
      });
    });
    
    // Ajouter séances maison (Hammer Curl 2x/semaine)
    const hammerCurlWeight = this.calculateWeight(
      this.programData.getWorkout('maison').exercises[0],
      week
    );
    const hammerCurlVolume = hammerCurlWeight * 12 * 3 * 2; // 2 séances/semaine
    
    if (!weeklyVolume["Biceps"]) weeklyVolume["Biceps"] = { direct: 0, indirect: 0 };
    weeklyVolume["Biceps"].direct += hammerCurlVolume;
    
    if (!weeklyVolume["Avant-bras"]) weeklyVolume["Avant-bras"] = { direct: 0, indirect: 0 };
    weeklyVolume["Avant-bras"].indirect += hammerCurlVolume * 0.6;
    
    totalWeeklyVolume += hammerCurlVolume;
    
    return {
      total: Math.round(totalWeeklyVolume),
      totalTonnage: Math.round(totalWeeklyVolume / 1000),
      byMuscle: weeklyVolume
    };
  }

  // ============================================
  // UTILITAIRES
  // ============================================
  getBlock(week) {
    return this.programData.getBlockForWeek(week);
  }

  isDeloadWeek(week) {
    return this.programData.getDeloadWeeks().includes(week);
  }

  getBicepsExercise(week) {
    return this.programData.getBicepsExercise(week);
  }
}

// Export global
window.ProgressionEngine = ProgressionEngine;
