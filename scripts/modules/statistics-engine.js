/**
 * STATISTICS ENGINE - Moteur de calcul des statistiques
 * Analyse volume, progression, fréquence, charge totale
 * Version: 1.0
 */

export class StatisticsEngine {
  constructor(programData) {
    this.programData = programData;
    this.cache = new Map();
  }

  /**
   * Calculer le volume total par semaine (séries × reps × poids)
   * @param {number} weekNumber - Numéro de semaine
   * @returns {object} Volume détaillé
   */
  calculateWeekVolume(weekNumber) {
    const cacheKey = `volume_${weekNumber}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const weekData = this.programData.getWeekWorkouts(weekNumber);
    let totalVolume = 0;
    const volumeByMuscle = {};
    const volumeByDay = {};

    Object.entries(weekData.workouts).forEach(([day, workout]) => {
      if (!workout.exercises) return;

      let dayVolume = 0;

      workout.exercises.forEach(exercise => {
        const reps = this.parseReps(exercise.reps);
        const exerciseVolume = exercise.currentWeight * exercise.sets * reps;
        
        totalVolume += exerciseVolume;
        dayVolume += exerciseVolume;

        // Volume par muscle
        exercise.muscleGroup.forEach(muscle => {
          if (!volumeByMuscle[muscle]) {
            volumeByMuscle[muscle] = 0;
          }
          volumeByMuscle[muscle] += exerciseVolume;
        });
      });

      volumeByDay[day] = dayVolume;
    });

    const result = {
      total: Math.round(totalVolume),
      byMuscle: volumeByMuscle,
      byDay: volumeByDay,
      average: Math.round(totalVolume / 3) // 3 séances/semaine
    };

    this.cache.set(cacheKey, result);
    return result;
  }

  /**
   * Calculer la progression sur tout le programme
   * @returns {object} Données de progression
   */
  calculateOverallProgression() {
    const progressionData = {
      weeks: [],
      totalVolume: [],
      volumeByMuscle: {},
      keyExercises: {}
    };

    // Exercices clés à suivre
    const keyExercises = [
      'ex_dim_1', // Trap Bar Deadlift
      'ex_mar_1', // Dumbbell Press
      'ex_ven_1', // Landmine Row
      'ex_dim_3', // Leg Press
      'ex_ven_6'  // EZ Bar Curl
    ];

    for (let week = 1; week <= 26; week++) {
      progressionData.weeks.push(week);

      // Volume total
      const weekVolume = this.calculateWeekVolume(week);
      progressionData.totalVolume.push(weekVolume.total);

      // Volume par muscle
      Object.entries(weekVolume.byMuscle).forEach(([muscle, volume]) => {
        if (!progressionData.volumeByMuscle[muscle]) {
          progressionData.volumeByMuscle[muscle] = [];
        }
        progressionData.volumeByMuscle[muscle].push(volume);
      });

      // Progression exercices clés
      const weekData = this.programData.getWeekWorkouts(week);
      Object.values(weekData.workouts).forEach(workout => {
        if (!workout.exercises) return;

        workout.exercises.forEach(exercise => {
          if (keyExercises.includes(exercise.id)) {
            if (!progressionData.keyExercises[exercise.id]) {
              progressionData.keyExercises[exercise.id] = {
                name: exercise.name,
                weights: [],
                volumes: []
              };
            }

            const reps = this.parseReps(exercise.reps);
            const volume = exercise.currentWeight * exercise.sets * reps;

            progressionData.keyExercises[exercise.id].weights.push(exercise.currentWeight);
            progressionData.keyExercises[exercise.id].volumes.push(volume);
          }
        });
      });
    }

    return progressionData;
  }

  /**
   * Calculer les statistiques par muscle
   * @returns {object} Stats par groupe musculaire
   */
  calculateMuscleStatistics() {
    const stats = {};
    const weeklyVolume = this.programData.program.weeklyVolume;

    Object.entries(weeklyVolume).forEach(([muscle, data]) => {
      stats[muscle] = {
        ...data,
        volumePerWeek: [],
        averageVolume: 0
      };
    });

    // Calculer volume par semaine pour chaque muscle
    for (let week = 1; week <= 26; week++) {
      const weekVolume = this.calculateWeekVolume(week);
      
      Object.keys(stats).forEach(muscle => {
        const volume = weekVolume.byMuscle[muscle] || 0;
        stats[muscle].volumePerWeek.push(volume);
      });
    }

    // Calculer moyennes
    Object.keys(stats).forEach(muscle => {
      const total = stats[muscle].volumePerWeek.reduce((sum, v) => sum + v, 0);
      stats[muscle].averageVolume = Math.round(total / 26);
    });

    return stats;
  }

  /**
   * Analyser la distribution du volume par bloc
   * @returns {object} Distribution par bloc
   */
  analyzeBlockDistribution() {
    const blocks = this.programData.program.blocks;
    const distribution = {};

    blocks.forEach(block => {
      const blockVolumes = [];
      
      block.weeks.forEach(week => {
        const weekVolume = this.calculateWeekVolume(week);
        blockVolumes.push(weekVolume.total);
      });

      const total = blockVolumes.reduce((sum, v) => sum + v, 0);
      const average = Math.round(total / blockVolumes.length);
      const min = Math.min(...blockVolumes);
      const max = Math.max(...blockVolumes);

      distribution[`bloc${block.id}`] = {
        name: block.name,
        weeks: block.weeks,
        volumes: blockVolumes,
        total,
        average,
        min,
        max,
        technique: block.technique.name
      };
    });

    return distribution;
  }

  /**
   * Calculer les records personnels (PRs)
   * @param {object} userProgress - Progression utilisateur
   * @returns {object} Records par exercice
   */
  calculatePersonalRecords(userProgress) {
    const records = {};

    Object.values(userProgress).forEach(weekData => {
      Object.entries(weekData).forEach(([key, data]) => {
        if (!key.includes('_ex_')) return; // Skip workout completions

        const [week, exerciseId, setNumber] = key.split('_');
        
        if (!records[exerciseId]) {
          records[exerciseId] = {
            maxWeight: 0,
            maxVolume: 0,
            bestRPE: 10,
            dates: []
          };
        }

        const volume = data.weight * data.reps;

        if (data.weight > records[exerciseId].maxWeight) {
          records[exerciseId].maxWeight = data.weight;
        }

        if (volume > records[exerciseId].maxVolume) {
          records[exerciseId].maxVolume = volume;
        }

        if (data.rpe < records[exerciseId].bestRPE) {
          records[exerciseId].bestRPE = data.rpe;
        }

        records[exerciseId].dates.push({
          week: parseInt(week),
          weight: data.weight,
          reps: data.reps,
          rpe: data.rpe,
          timestamp: data.timestamp
        });
      });
    });

    return records;
  }

  /**
   * Générer un rapport de progression
   * @param {number} currentWeek - Semaine actuelle
   * @param {object} userProgress - Progression utilisateur
   * @returns {object} Rapport complet
   */
  generateProgressReport(currentWeek, userProgress) {
    const weeksCompleted = currentWeek - 1;
    const percentComplete = Math.round((weeksCompleted / 26) * 100);

    // Calculer volume cumulé
    let totalVolumeLifted = 0;
    for (let week = 1; week <= weeksCompleted; week++) {
      const weekVolume = this.calculateWeekVolume(week);
      totalVolumeLifted += weekVolume.total;
    }

    // Calculer séances complétées
    let workoutsCompleted = 0;
    let totalWorkouts = weeksCompleted * 3;
    
    Object.values(userProgress).forEach(weekData => {
      Object.entries(weekData).forEach(([key, data]) => {
        if (key.includes('dimanche') || key.includes('mardi') || key.includes('vendredi')) {
          if (data.completed) workoutsCompleted++;
        }
      });
    });

    const adherenceRate = totalWorkouts > 0 
      ? Math.round((workoutsCompleted / totalWorkouts) * 100)
      : 0;

    // Bloc actuel
    const currentBlock = this.programData.getBlockForWeek(currentWeek);

    // Prochaine milestone
    const nextMilestone = this.getNextMilestone(currentWeek);

    // Records personnels
    const personalRecords = this.calculatePersonalRecords(userProgress);

    return {
      overview: {
        currentWeek,
        weeksCompleted,
        weeksRemaining: 26 - currentWeek,
        percentComplete,
        currentBlock: currentBlock.name,
        currentTechnique: currentBlock.technique.name
      },
      volume: {
        total: Math.round(totalVolumeLifted),
        average: Math.round(totalVolumeLifted / Math.max(weeksCompleted, 1)),
        projected: Math.round((totalVolumeLifted / weeksCompleted) * 26)
      },
      adherence: {
        workoutsCompleted,
        totalWorkouts,
        rate: adherenceRate,
        status: adherenceRate >= 90 ? 'Excellent' : adherenceRate >= 80 ? 'Bon' : 'À améliorer'
      },
      nextMilestone,
      personalRecords: Object.keys(personalRecords).length,
      recommendations: this.generateRecommendations(adherenceRate, currentWeek)
    };
  }

  /**
   * Obtenir le prochain objectif intermédiaire
   * @param {number} currentWeek - Semaine actuelle
   * @returns {object} Prochain milestone
   */
  getNextMilestone(currentWeek) {
    const milestones = this.programData.getIntermediateGoals();
    const milestoneWeeks = [6, 12, 18, 26];

    for (const week of milestoneWeeks) {
      if (week >= currentWeek) {
        return {
          week,
          name: milestones[`week${week}`].name,
          goals: milestones[`week${week}`].goals,
          weeksUntil: week - currentWeek
        };
      }
    }

    return null;
  }

  /**
   * Générer des recommandations personnalisées
   * @param {number} adherenceRate - Taux d'adhérence
   * @param {number} currentWeek - Semaine actuelle
   * @returns {array} Liste de recommandations
   */
  generateRecommendations(adherenceRate, currentWeek) {
    const recommendations = [];

    // Adhérence
    if (adherenceRate < 80) {
      recommendations.push({
        type: 'warning',
        title: 'Adhérence à améliorer',
        message: 'Essayez de ne pas sauter de séances pour maximiser les résultats.'
      });
    } else if (adherenceRate >= 95) {
      recommendations.push({
        type: 'success',
        title: 'Excellente constance !',
        message: 'Continuez sur cette lancée, la régularité est la clé !'
      });
    }

    // Deload approchant
    const nextDeload = this.programData.program.deloadWeeks.find(w => w > currentWeek);
    if (nextDeload && nextDeload - currentWeek <= 2) {
      recommendations.push({
        type: 'info',
        title: 'Deload approchant',
        message: `Semaine ${nextDeload} : récupération prioritaire. Préparez-vous mentalement.`
      });
    }

    // Milestone approchant
    const nextMilestone = this.getNextMilestone(currentWeek);
    if (nextMilestone && nextMilestone.weeksUntil <= 2) {
      recommendations.push({
        type: 'info',
        title: 'Objectif proche',
        message: `Plus que ${nextMilestone.weeksUntil} semaine(s) avant ${nextMilestone.name} !`
      });
    }

    // Mi-programme
    if (currentWeek === 13) {
      recommendations.push({
        type: 'success',
        title: 'Mi-parcours atteint !',
        message: '50% du programme complété. Prenez des photos et mesures pour comparer !'
      });
    }

    return recommendations;
  }

  /**
   * Calculer la charge moyenne par groupe musculaire
   * @returns {object} Charges moyennes
   */
  calculateAverageLoads() {
    const loads = {};
    const counts = {};

    for (let week = 1; week <= 26; week++) {
      const weekData = this.programData.getWeekWorkouts(week);

      Object.values(weekData.workouts).forEach(workout => {
        if (!workout.exercises) return;

        workout.exercises.forEach(exercise => {
          exercise.muscleGroup.forEach(muscle => {
            if (!loads[muscle]) {
              loads[muscle] = 0;
              counts[muscle] = 0;
            }

            loads[muscle] += exercise.currentWeight;
            counts[muscle]++;
          });
        });
      });
    }

    const averages = {};
    Object.keys(loads).forEach(muscle => {
      averages[muscle] = Math.round(loads[muscle] / counts[muscle] * 10) / 10;
    });

    return averages;
  }

  /**
   * Analyser la fréquence d'entraînement par muscle
   * @returns {object} Fréquence par muscle
   */
  analyzeTrainingFrequency() {
    const frequency = {};

    const weekData = this.programData.getWeekWorkouts(1); // Template semaine

    Object.values(weekData.workouts).forEach(workout => {
      if (!workout.exercises) return;

      workout.exercises.forEach(exercise => {
        exercise.muscleGroup.forEach(muscle => {
          if (!frequency[muscle]) {
            frequency[muscle] = new Set();
          }
          frequency[muscle].add(workout.name);
        });
      });
    });

    const result = {};
    Object.entries(frequency).forEach(([muscle, days]) => {
      result[muscle] = {
        timesPerWeek: days.size,
        days: Array.from(days)
      };
    });

    return result;
  }

  /**
   * Parser les répétitions (string ou number)
   * @param {string|number} reps - Répétitions
   * @returns {number} Valeur numérique
   */
  parseReps(reps) {
    if (typeof reps === 'number') return reps;
    
    // Format "8-10" -> prendre le minimum
    if (typeof reps === 'string' && reps.includes('-')) {
      return parseInt(reps.split('-')[0]);
    }
    
    return parseInt(reps) || 10;
  }

  /**
   * Nettoyer le cache
   */
  clearCache() {
    this.cache.clear();
  }
}

export default StatisticsEngine;
