/**
 * HYBRID MASTER 51 - PROGRAMME COMPLET DÉFINITIF
 * Version: 1.0 Finale
 * 26 semaines | 4 blocs | 3 séances/semaine
 * Homme 51 ans | Hypertrophie maximale sécurisée
 */

export class ProgramData {
  constructor() {
    this.program = this.initializeProgram();
  }

  initializeProgram() {
    return {
      metadata: {
        name: "HYBRID MASTER 51",
        version: "1.0",
        duration: 26,
        frequency: 3,
        trainingDays: ["dimanche", "mardi", "vendredi"],
        deloadWeeks: [6, 12, 18, 24, 26],
        profile: {
          age: 51,
          level: "intermédiaire",
          objective: "Hypertrophie maximale sécurisée",
          sessionDuration: "68-73 min"
        }
      },

      // 🏋️ BLOCS D'ENTRAÎNEMENT
      blocks: [
        // BLOC 1 (S1-5) : FONDATION TECHNIQUE
        {
          id: 1,
          name: "Fondations Hybrides",
          weeks: [1, 2, 3, 4, 5],
          technique: {
            name: "Tempo Contrôlé 3-1-2",
            description: "3s descente, 1s pause étirement, 2s montée",
            details: [
              "Pauses stratégiques sur exercices clés",
              "Cable/Dumbbell Fly : pause 2s bras écartés",
              "Incline Curl : pause 2s bras tendus",
              "EZ Bar Curl : pause 2s bras tendus",
              "Lateral Raises : pause 1s bras horizontaux",
              "Face Pull : pause 1s contraction arrière"
            ],
            rpe: "6-7"
          }
        },

        // BLOC 2 (S7-11) : SURCHARGE PROGRESSIVE
        {
          id: 2,
          name: "Surcharge Progressive",
          weeks: [7, 8, 9, 10, 11],
          technique: {
            name: "Rest-Pause",
            description: "Tempo 2-1-2 + Rest-Pause dernière série exercices principaux",
            details: [
              "Dimanche : Trap Bar Deadlift S5 (6-8 reps → 20s → 2-3 reps)",
              "Mardi : Dumbbell Press S5 (10 reps → 20s → 3-4 reps)",
              "Vendredi : Landmine Row S5 (10 reps → 20s → 3-4 reps)"
            ],
            rpe: "7-8"
          }
        },

        // BLOC 3 (S13-17) : SURCOMPENSATION
        {
          id: 3,
          name: "Surcompensation Métabolique",
          weeks: [13, 14, 15, 16, 17],
          technique: {
            name: "Drop-Sets + Myo-Reps",
            description: "Intensification métabolique maximale",
            details: [
              "Drop-sets dernière série (-25% charge) : Goblet, Leg Press, Lat Pull, DB Press, Cable Fly, Triceps, Laterals, Landmine Row, Leg Curl/Extension, DB Fly",
              "Myo-reps dernière série isolations : Face Pull, Overhead Ext, Incline Curl, Cable Fly, Rowing (15 reps → 5s → 5×5 mini-sets)"
            ],
            rpe: "8"
          }
        },

        // BLOC 4 (S19-25) : INTENSIFICATION MAXIMALE
        {
          id: 4,
          name: "Intensification Maximale",
          weeks: [19, 20, 21, 22, 23, 25],
          technique: {
            name: "Clusters + Myo-Reps + Partials",
            description: "Techniques avancées combinées pour gains maximaux",
            details: [
              "Clusters exercices lourds S5 : Trap Bar (3→20s→2→20s→2), DB Press (4→15s→3→15s→3), Landmine Row (4→15s→3→15s→3), Leg Press (4→20s→3→20s→3)",
              "Myo-reps TOUTES isolations dernière série",
              "Partials jambes S4 : Goblet (10 + 5 demi), Leg Press (10 + 8 quarts), Leg Curl (12 + 6-8), Leg Ext (15 + 10)"
            ],
            rpe: "8-9"
          }
        }
      ],

      // 💪 SÉANCES HEBDOMADAIRES
      workouts: {
        // DIMANCHE - DOS + JAMBES LOURDES + BRAS (68 min)
        dimanche: {
          name: "DOS + JAMBES LOURDES + BRAS",
          duration: 68,
          totalSets: 31,
          exercises: [
            {
              id: "ex_dim_1",
              name: "Trap Bar Deadlift",
              muscleGroup: ["dos", "jambes", "fessiers"],
              sets: 5,
              reps: "6-8",
              rest: 120,
              startWeight: 75,
              progression: {
                increment: 5,
                frequency: 3, // toutes les 3 semaines
                condition: "RPE ≤6 sur 2 séances"
              },
              notes: "Mouvement roi, technique parfaite prioritaire",
              tempo: "Variable selon bloc",
              techniques: {
                bloc2: "Rest-Pause S5 : 6-8 reps → 20s → 2-3 reps",
                bloc4: "Cluster S5 : 3 reps → 20s → 2 reps → 20s → 2 reps (7 total)"
              }
            },
            {
              id: "ex_dim_2",
              name: "Goblet Squat",
              muscleGroup: ["quadriceps", "fessiers"],
              sets: 4,
              reps: 10,
              rest: 75,
              startWeight: 25,
              weightType: "haltère",
              progression: {
                increment: 2.5,
                frequency: 2
              },
              notes: "Haltère tenu contre poitrine, descente contrôlée",
              techniques: {
                bloc3: "Drop-set S4 : 10 reps → -25% → 8-10 reps",
                bloc4: "Partials S4 : 10 reps complètes + 5 demi-reps (amplitude haute)"
              }
            },
            {
              id: "ex_dim_3",
              name: "Leg Press",
              muscleGroup: ["quadriceps", "fessiers"],
              sets: 4,
              reps: 10,
              rest: 75,
              startWeight: 110,
              progression: {
                increment: 10,
                frequency: 2
              },
              notes: "Pieds largeur épaules, amplitude complète",
              techniques: {
                bloc3: "Drop-set S4 : 10 reps → -25% → 10-12 reps",
                bloc4: "Cluster S4 : 4 reps → 20s → 3 reps → 20s → 3 reps (10 total) + Partials : 10 reps + 8 quarts"
              }
            },
            {
              id: "ex_dim_4",
              name: "Lat Pulldown (prise large)",
              muscleGroup: ["dos"],
              sets: 4,
              reps: 10,
              rest: 90,
              startWeight: 60,
              progression: {
                increment: 2.5,
                frequency: 2
              },
              supersetWith: "ex_dim_5",
              notes: "Mains écartées 1.5× largeur épaules, tirer vers clavicules",
              techniques: {
                bloc3: "Drop-set S4 : 10 reps → -20% → 8-10 reps"
              }
            },
            {
              id: "ex_dim_5",
              name: "Landmine Press",
              muscleGroup: ["épaules", "pectoraux"],
              sets: 4,
              reps: 10,
              rest: 90,
              startWeight: 35,
              progression: {
                increment: 2.5,
                frequency: 2
              },
              supersetWith: "ex_dim_4",
              notes: "Barre ancrée au sol, pousser vers avant-haut",
              tempo: "Contrôlé selon bloc"
            },
            {
              id: "ex_dim_6",
              name: "Rowing Machine (prise large)",
              muscleGroup: ["dos"],
              sets: 4,
              reps: 10,
              rest: 75,
              startWeight: 50,
              progression: {
                increment: 2.5,
                frequency: 2
              },
              notes: "Coudes vers extérieur, tirer vers bas des pecs",
              techniques: {
                bloc3: "Myo-reps S4 : 12 reps → 5s → 4×4 mini-sets"
              }
            },
            {
              id: "ex_dim_7",
              name: "Spider Curl / Incline Curl",
              muscleGroup: ["biceps"],
              sets: 4,
              reps: 12,
              rest: 75,
              startWeight: 12,
              weightType: "haltère",
              progression: {
                increment: 2.5,
                frequency: 3
              },
              supersetWith: "ex_dim_8",
              rotation: {
                bloc1: "Incline Curl",
                bloc2: "Spider Curl",
                bloc3: "Incline Curl",
                bloc4: "Spider Curl"
              },
              notes: "Incline = étirement max / Spider = contraction max",
              techniques: {
                bloc1: "Pause 2s bras tendus (Incline)",
                bloc3: "Myo-reps S4 : 12 reps → 5s → 4×4 mini-sets"
              }
            },
            {
              id: "ex_dim_8",
              name: "Cable Pushdown",
              muscleGroup: ["triceps"],
              sets: 3,
              reps: 12,
              rest: 75,
              startWeight: 20,
              progression: {
                increment: 2.5,
                frequency: 3
              },
              supersetWith: "ex_dim_7",
              notes: "Coudes fixes le long du corps, extension complète",
              tempo: "Contrôlé selon bloc"
            }
          ]
        },

        // MARDI - PECS + ÉPAULES + TRICEPS (70 min)
        mardi: {
          name: "PECS + ÉPAULES + TRICEPS",
          duration: 70,
          totalSets: 35,
          exercises: [
            {
              id: "ex_mar_1",
              name: "Dumbbell Press",
              muscleGroup: ["pectoraux", "épaules", "triceps"],
              sets: 5,
              reps: 10,
              rest: 105,
              startWeight: 22,
              weightType: "haltère (chaque main)",
              progression: {
                increment: 2.5,
                frequency: 3
              },
              notes: "Sur banc plat, coudes 45°, amplitude complète",
              techniques: {
                bloc2: "Rest-Pause S5 : 10 reps → 20s → 3-4 reps",
                bloc3: "Drop-set S5 : 10 reps → -25% → 8-10 reps",
                bloc4: "Cluster S5 : 4 reps → 15s → 3 reps → 15s → 3 reps (10 total)"
              }
            },
            {
              id: "ex_mar_2",
              name: "Cable Fly (poulies moyennes)",
              muscleGroup: ["pectoraux"],
              sets: 4,
              reps: 12,
              rest: 60,
              startWeight: 10,
              progression: {
                increment: 2.5,
                frequency: 3
              },
              notes: "Poulies à hauteur épaules, étirement pecs maximal",
              techniques: {
                bloc1: "Pause 2s bras écartés (étirement)",
                bloc3: "Drop-set S4 : 12 reps → -25% → 10-12 reps + Myo-reps S4 : 15 reps → 5s → 5×5",
                bloc4: "Myo-reps S4 : 15 reps → 5s → 5×5 mini-sets"
              }
            },
            {
              id: "ex_mar_3",
              name: "Leg Press léger",
              muscleGroup: ["quadriceps", "fessiers"],
              sets: 3,
              reps: 15,
              rest: 60,
              startWeight: 80,
              progression: {
                increment: 10,
                frequency: 3
              },
              notes: "Volume léger pour fréquence, amplitude complète",
              tempo: "Contrôlé"
            },
            {
              id: "ex_mar_4",
              name: "Extension Triceps Corde",
              muscleGroup: ["triceps"],
              sets: 5,
              reps: 12,
              rest: 75,
              startWeight: 20,
              progression: {
                increment: 2.5,
                frequency: 3
              },
              supersetWith: "ex_mar_5",
              notes: "Corde attachée poulie haute, extension complète",
              techniques: {
                bloc3: "Drop-set S5 : 12 reps → -20% → 10-12 reps",
                bloc4: "Myo-reps S5 : 12 reps → 5s → 4×4 mini-sets"
              }
            },
            {
              id: "ex_mar_5",
              name: "Lateral Raises",
              muscleGroup: ["épaules"],
              sets: 5,
              reps: 15,
              rest: 75,
              startWeight: 8,
              weightType: "haltère (chaque main)",
              progression: {
                increment: 2.5,
                frequency: 4
              },
              supersetWith: "ex_mar_4",
              notes: "Élévations latérales, coudes légèrement fléchis",
              techniques: {
                bloc1: "Pause 1s bras horizontaux",
                bloc3: "Drop-set S5 : 15 reps → -25% → 12-15 reps",
                bloc4: "Myo-reps S5 : 15 reps → 5s → 5×5 mini-sets"
              }
            },
            {
              id: "ex_mar_6",
              name: "Face Pull",
              muscleGroup: ["épaules", "dos"],
              sets: 5,
              reps: 15,
              rest: 60,
              startWeight: 20,
              progression: {
                increment: 2.5,
                frequency: 3
              },
              notes: "Corde poulie haute, tirer vers visage, rotation externe",
              techniques: {
                bloc1: "Pause 1s contraction arrière",
                bloc3: "Myo-reps S5 : 15 reps → 5s → 5×5 mini-sets",
                bloc4: "Myo-reps S5 : 15 reps → 5s → 5×5 mini-sets"
              }
            },
            {
              id: "ex_mar_7",
              name: "Rowing Machine (prise serrée)",
              muscleGroup: ["dos"],
              sets: 4,
              reps: 12,
              rest: 75,
              startWeight: 50,
              progression: {
                increment: 2.5,
                frequency: 2
              },
              notes: "Mains largeur épaules, coudes le long du corps, tirer vers nombril",
              tempo: "Contrôlé"
            },
            {
              id: "ex_mar_8",
              name: "Overhead Extension (corde, assis)",
              muscleGroup: ["triceps"],
              sets: 4,
              reps: 12,
              rest: 60,
              startWeight: 15,
              progression: {
                increment: 2.5,
                frequency: 3
              },
              notes: "Assis, corde derrière tête, extension complète vers haut",
              techniques: {
                bloc3: "Myo-reps S4 : 12 reps → 5s → 4×4 mini-sets",
                bloc4: "Myo-reps S4 : 12 reps → 5s → 4×4 mini-sets"
              }
            }
          ]
        },

        // VENDREDI - DOS + JAMBES LÉGÈRES + BRAS + ÉPAULES (73 min)
        vendredi: {
          name: "DOS + JAMBES LÉGÈRES + BRAS + ÉPAULES",
          duration: 73,
          totalSets: 33,
          exercises: [
            {
              id: "ex_ven_1",
              name: "Landmine Row",
              muscleGroup: ["dos"],
              sets: 5,
              reps: 10,
              rest: 105,
              startWeight: 55,
              progression: {
                increment: 2.5,
                frequency: 2
              },
              notes: "Barre ancrée, tirer vers hanche, rotation tronc minime",
              techniques: {
                bloc2: "Rest-Pause S5 : 10 reps → 20s → 3-4 reps",
                bloc3: "Drop-set S5 : 10 reps → -20% → 8-10 reps",
                bloc4: "Cluster S5 : 4 reps → 15s → 3 reps → 15s → 3 reps (10 total)"
              }
            },
            {
              id: "ex_ven_2",
              name: "Leg Curl",
              muscleGroup: ["ischio-jambiers"],
              sets: 5,
              reps: 12,
              rest: 75,
              startWeight: 40,
              progression: {
                increment: 5,
                frequency: 3
              },
              supersetWith: "ex_ven_3",
              notes: "Allongé ou assis, contraction complète ischio",
              techniques: {
                bloc3: "Drop-set S5 : 12 reps → -25% → 10-12 reps",
                bloc4: "Partials S5 : 12 reps complètes + 6-8 partials (amplitude haute)"
              }
            },
            {
              id: "ex_ven_3",
              name: "Leg Extension",
              muscleGroup: ["quadriceps"],
              sets: 4,
              reps: 15,
              rest: 75,
              startWeight: 35,
              progression: {
                increment: 5,
                frequency: 3
              },
              supersetWith: "ex_ven_2",
              notes: "Extension complète, contraction 1s en haut",
              techniques: {
                bloc3: "Drop-set S4 : 15 reps → -25% → 12-15 reps",
                bloc4: "Partials S4 : 15 reps complètes + 10 partials (derniers 30°)"
              }
            },
            {
              id: "ex_ven_4",
              name: "Cable Fly",
              muscleGroup: ["pectoraux"],
              sets: 4,
              reps: 15,
              rest: 60,
              startWeight: 10,
              progression: {
                increment: 2.5,
                frequency: 3
              },
              supersetWith: "ex_ven_5",
              notes: "Poulies moyennes, étirement pecs maximal",
              techniques: {
                bloc1: "Pause 2s bras écartés",
                bloc4: "Myo-reps S4 : 15 reps → 5s → 5×5 mini-sets"
              }
            },
            {
              id: "ex_ven_5",
              name: "Dumbbell Fly",
              muscleGroup: ["pectoraux"],
              sets: 4,
              reps: 12,
              rest: 60,
              startWeight: 10,
              weightType: "haltère (chaque main)",
              progression: {
                increment: 2.5,
                frequency: 3
              },
              supersetWith: "ex_ven_4",
              notes: "Sur banc plat, amplitude complète, étirement pecs",
              techniques: {
                bloc1: "Pause 2s bras écartés",
                bloc3: "Drop-set S4 : 12 reps → -25% → 10-12 reps",
                bloc4: "Myo-reps S4 : 12 reps → 5s → 4×4 mini-sets"
              }
            },
            {
              id: "ex_ven_6",
              name: "EZ Bar Curl",
              muscleGroup: ["biceps"],
              sets: 5,
              reps: 12,
              rest: 75,
              startWeight: 25,
              progression: {
                increment: 2.5,
                frequency: 3
              },
              supersetWith: "ex_ven_7",
              notes: "Barre EZ, coudes fixes, curl complet",
              techniques: {
                bloc1: "Pause 2s bras tendus",
                bloc4: "Myo-reps S5 : 12 reps → 5s → 4×4 mini-sets"
              }
            },
            {
              id: "ex_ven_7",
              name: "Overhead Extension",
              muscleGroup: ["triceps"],
              sets: 3,
              reps: 12,
              rest: 75,
              startWeight: 15,
              progression: {
                increment: 2.5,
                frequency: 3
              },
              supersetWith: "ex_ven_6",
              notes: "Corde derrière tête, extension complète",
              techniques: {
                bloc4: "Myo-reps S3 : 12 reps → 5s → 4×4 mini-sets"
              }
            },
            {
              id: "ex_ven_8",
              name: "Lateral Raises",
              muscleGroup: ["épaules"],
              sets: 3,
              reps: 15,
              rest: 60,
              startWeight: 8,
              weightType: "haltère (chaque main)",
              progression: {
                increment: 2.5,
                frequency: 4
              },
              notes: "Élévations latérales, coudes légèrement fléchis",
              techniques: {
                bloc1: "Pause 1s bras horizontaux",
                bloc4: "Myo-reps S3 : 15 reps → 5s → 5×5 mini-sets"
              }
            },
            {
              id: "ex_ven_9",
              name: "Wrist Curl",
              muscleGroup: ["avant-bras"],
              sets: 3,
              reps: 20,
              rest: 45,
              startWeight: 30,
              progression: {
                increment: 2.5,
                frequency: 4
              },
              notes: "Assis, avant-bras sur cuisses, curl poignets complet",
              tempo: "Contrôlé"
            }
          ]
        },

        // SÉANCE MAISON (Mardi ou Jeudi soir)
        maison: {
          name: "HAMMER CURL MAISON",
          duration: 10,
          totalSets: 3,
          frequency: "2×/semaine (Mardi + Jeudi soir)",
          exercises: [
            {
              id: "ex_maison_1",
              name: "Hammer Curl",
              muscleGroup: ["biceps", "avant-bras"],
              sets: 3,
              reps: 12,
              rest: 60,
              startWeight: 12,
              weightType: "haltère (chaque main)",
              progression: {
                increment: 2.5,
                frequency: 3
              },
              notes: "Pouces vers haut (prise neutre), contraction complète",
              tempo: "Contrôlé 2-0-2"
            }
          ]
        }
      },

      // 📊 VOLUME HEBDOMADAIRE PAR MUSCLE
      weeklyVolume: {
        quadriceps: { direct: 16, indirect: 7, total: 23, frequency: 3, optimal: "18-24" },
        ischio: { direct: 10, indirect: 7, total: 17, frequency: 2, optimal: "14-20" },
        fessiers: { direct: 9, indirect: 10, total: 19, frequency: 3, optimal: "14-20" },
        dos: { direct: 22, indirect: 8, total: 30, frequency: 3, optimal: "18-24" },
        pectoraux: { direct: 17, indirect: 5, total: 22, frequency: 3, optimal: "16-22" },
        epaulesPoster: { direct: 9, indirect: 3, total: 12, frequency: 2, optimal: "10-14" },
        epaulesLater: { direct: 8, indirect: 2, total: 10, frequency: 3, optimal: "6-10" },
        biceps: { direct: 9, indirect: 10, total: 19, frequency: 3, optimal: "14-20" },
        triceps: { direct: 15, indirect: 5, total: 20, frequency: 3, optimal: "12-18" },
        avantBras: { direct: 3, indirect: 13, total: 16, frequency: 3, optimal: "6-12" }
      },

      // 🔄 DELOADS
      deloads: {
        weeks: [6, 12, 18, 24, 26],
        protocol: {
          chargeReduction: 0.6, // -40%
          tempo: "4-1-2",
          rpe: "5-6",
          notes: "Maintenir technique, récupération prioritaire"
        }
      }
    };
  }

  // 🎯 MÉTHODES D'ACCÈS AUX DONNÉES

  /**
   * Obtenir les séances d'une semaine spécifique
   * @param {number} weekNumber - Numéro de semaine (1-26)
   * @returns {object} Séances de la semaine avec techniques appliquées
   */
  getWeekWorkouts(weekNumber) {
    if (weekNumber < 1 || weekNumber > 26) {
      throw new Error("Numéro de semaine invalide (1-26)");
    }

    const isDeload = this.program.deloadWeeks.includes(weekNumber);
    const block = this.getBlockForWeek(weekNumber);
    const workouts = JSON.parse(JSON.stringify(this.program.workouts)); // Deep clone

    // Appliquer les modifications selon le bloc et deload
    Object.keys(workouts).forEach(day => {
      if (day === 'maison') return; // Skip séance maison

      workouts[day].exercises = workouts[day].exercises.map(ex => {
        const exercise = { ...ex };

        // Rotation Biceps (Incline/Spider)
        if (exercise.rotation) {
          const rotationKey = `bloc${block.id}`;
          exercise.name = exercise.rotation[rotationKey];
        }

        // Appliquer Deload
        if (isDeload) {
          exercise.currentWeight = Math.round(exercise.startWeight * 0.6 * 2) / 2;
          exercise.deloadActive = true;
          exercise.tempo = "4-1-2";
          exercise.rpe = "5-6";
        } else {
          // Calculer progression normale
          const weeksProgressed = Math.floor((weekNumber - 1) / exercise.progression.frequency);
          const totalIncrement = weeksProgressed * exercise.progression.increment;
          exercise.currentWeight = exercise.startWeight + totalIncrement;
        }

        // Ajouter techniques du bloc actuel
        exercise.blockTechnique = block.technique;
        if (exercise.techniques && exercise.techniques[`bloc${block.id}`]) {
          exercise.activeTechnique = exercise.techniques[`bloc${block.id}`];
        }

        return exercise;
      });
    });

    return {
      weekNumber,
      isDeload,
      block,
      workouts
    };
  }

  /**
   * Obtenir le bloc correspondant à une semaine
   * @param {number} weekNumber - Numéro de semaine
   * @returns {object} Bloc d'entraînement
   */
  getBlockForWeek(weekNumber) {
    return this.program.blocks.find(block => 
      block.weeks.includes(weekNumber)
    ) || this.program.blocks[3]; // Par défaut Bloc 4 si semaine 26
  }

  /**
   * Obtenir tous les exercices du programme
   * @returns {array} Liste complète des exercices
   */
  getAllExercises() {
    const allExercises = [];
    Object.values(this.program.workouts).forEach(workout => {
      if (workout.exercises) {
        allExercises.push(...workout.exercises);
      }
    });
    return allExercises;
  }

  /**
   * Obtenir les statistiques de progression d'un exercice
   * @param {string} exerciseId - ID de l'exercice
   * @returns {object} Statistiques de progression
   */
  getExerciseProgression(exerciseId) {
    const exercise = this.getAllExercises().find(ex => ex.id === exerciseId);
    if (!exercise) return null;

    const weeklyIncrement = exercise.progression.increment;
    const frequency = exercise.progression.frequency;
    const totalWeeks = 26;
    const deloadWeeks = this.program.deloadWeeks;

    // Calculer progression sur 26 semaines
    let progressionData = [];
    for (let week = 1; week <= totalWeeks; week++) {
      const isDeload = deloadWeeks.includes(week);
      let weight;

      if (isDeload) {
        weight = exercise.startWeight * 0.6;
      } else {
        const weeksProgressed = Math.floor((week - 1) / frequency);
        weight = exercise.startWeight + (weeksProgressed * weeklyIncrement);
      }

      progressionData.push({
        week,
        weight: Math.round(weight * 2) / 2, // Arrondir à 0.5 kg
        isDeload
      });
    }

    return {
      exercise: exercise.name,
      startWeight: exercise.startWeight,
      endWeight: progressionData[25].weight,
      totalGain: progressionData[25].weight - exercise.startWeight,
      increment: weeklyIncrement,
      frequency,
      progressionData
    };
  }

  /**
   * Obtenir le calendrier hebdomadaire type
   * @returns {object} Calendrier de la semaine
   */
  getWeeklySchedule() {
    return {
      lundi: {
        name: "Repos",
        activities: ["Marche 30 min", "Étirements 15 min", "Protéines 2g/kg"]
      },
      mardi: {
        name: "Repos + Hammer Curl",
        activities: [
          "Marche 30 min",
          "Hammer Curl maison 3×12 (soir)",
          "Massage/rouleau mousse",
          "Coucher tôt (training lendemain)"
        ]
      },
      mercredi: {
        name: "TRAINING - DOS + JAMBES LOURDES + BRAS",
        workout: "dimanche",
        duration: 68,
        activities: [
          "Échauffement complet 15 min",
          "Séance complète",
          "Post-workout immédiat (30g whey + 50g glucides)",
          "Repas complet dans les 2h",
          "ZMA avant coucher"
        ]
      },
      jeudi: {
        name: "Repos + Hammer Curl",
        activities: [
          "Marche légère 20 min",
          "Hammer Curl maison 3×12 (soir)",
          "Étirements",
          "Hydratation++"
        ]
      },
      vendredi: {
        name: "TRAINING - PECS + ÉPAULES + TRICEPS",
        workout: "mardi",
        duration: 70,
        activities: [
          "Échauffement complet 15 min",
          "Séance complète",
          "Post-workout immédiat",
          "Repas complet",
          "ZMA avant coucher"
        ]
      },
      samedi: {
        name: "Repos",
        activities: [
          "Repos actif (vélo/marche légère)",
          "Préparation mentale training lendemain",
          "Coucher tôt"
        ]
      },
      dimanche: {
        name: "TRAINING - DOS + JAMBES LÉGÈRES + BRAS + ÉPAULES",
        workout: "vendredi",
        duration: 73,
        activities: [
          "Échauffement complet 15 min",
          "Séance complète",
          "Post-workout immédiat",
          "Repas complet",
          "Récupération complète"
        ]
      }
    };
  }

  /**
   * Obtenir les objectifs intermédiaires
   * @returns {object} Objectifs par milestone
   */
  getIntermediateGoals() {
    return {
      week6: {
        bloc: 1,
        name: "Fin Bloc 1 - Fondations",
        goals: {
          technique: "Technique parfaite maîtrisée sur tous exercices",
          trapBar: "80-85 kg",
          dumbbellPress: "25-27.5 kg/haltère",
          masseMaigre: "+0.5 à 1 kg",
          sante: "Aucune douleur"
        }
      },
      week12: {
        bloc: 2,
        name: "Fin Bloc 2 - Surcharge",
        goals: {
          trapBar: "90-95 kg",
          dumbbellPress: "30-32.5 kg/haltère",
          legPress: "150-170 kg",
          masseMaigre: "+1.5 à 2.5 kg",
          tourBras: "+0.8 à 1.2 cm",
          adaptation: "Maîtrise complète rest-pause"
        }
      },
      week18: {
        bloc: 3,
        name: "Mi Bloc 3 - Surcompensation",
        goals: {
          trapBar: "100-105 kg",
          dumbbellPress: "35-37.5 kg/haltère",
          rowingMachine: "65-70 kg",
          masseMaigre: "+2.5 à 3.5 kg",
          tourPoitrine: "+2 à 2.5 cm",
          tourBras: "+1.5 à 2 cm",
          techniques: "Maîtrise drop-sets et myo-reps"
        }
      },
      week26: {
        bloc: 4,
        name: "Fin Programme - Transformation Complète",
        goals: {
          trapBar: "115-120 kg",
          dumbbellPress: "42.5-45 kg/haltère",
          rowingMachine: "80-82.5 kg",
          legPress: "230-240 kg",
          masseMaigre: "+4.5 à 5.5 kg",
          tourBras: "+2.5 à 3 cm",
          tourPoitrine: "+3.5 à 4 cm",
          tourEpaules: "+3 à 3.5 cm",
          physique: "Transformation complète, force doublée sur exercices clés"
        }
      }
    };
  }

  /**
   * Obtenir les consignes de sécurité
   * @returns {object} Règles de sécurité et prévention
   */
  getSafetyGuidelines() {
    return {
      reglesOr: [
        "Technique > Charge TOUJOURS",
        "Douleur ≠ Courbature (douleur articulaire = STOP)",
        "Progression conservative (ne jamais sauter d'échelon)",
        "Respiration correcte (inspirer descente, expirer montée)",
        "Amplitude contrôlée (complète sauf si douleur)"
      ],
      signauxAlerte: [
        "❌ Douleur aiguë articulaire → STOP IMMÉDIAT",
        "❌ Craquement/claquement tendon → STOP IMMÉDIAT",
        "❌ Engourdissement/fourmillement → STOP IMMÉDIAT",
        "❌ Perte de force soudaine → STOP IMMÉDIAT",
        "❌ Vertiges/nausées → STOP IMMÉDIAT",
        "❌ Douleur thoracique → STOP IMMÉDIAT"
      ],
      surentrainement: {
        symptomes: [
          "Insomnie persistante (>3 nuits)",
          "Douleur articulaire aiguë",
          "Fatigue extrême constante",
          "Perte de motivation totale",
          "Régression force sur 2 séances consécutives",
          "Fréquence cardiaque repos +10 bpm vs normale"
        ],
        action: [
          "Deload anticipé immédiat (1 semaine -50% charges)",
          "Sommeil 9h minimum",
          "Massage/kiné si douleurs",
          "Retour progressif ensuite"
        ]
      },
      criteresProgression: {
        augmenter: [
          "RPE ≤6 sur 2 séances consécutives",
          "Technique reste parfaite",
          "Aucune douleur articulaire",
          "Récupération complète entre séances"
        ],
        maintenir: [
          "RPE 7-8 constant",
          "Technique légèrement dégradée sur dernières reps",
          "Fatigue importante mais gérable"
        ],
        reduire: [
          "RPE >9 deux séances consécutives",
          "Technique nettement dégradée",
          "Douleur articulaire apparaît",
          "Insomnie/fatigue excessive"
        ]
      }
    };
  }

  /**
   * Obtenir le protocole d'échauffement
   * @param {string} exerciseName - Nom de l'exercice
   * @param {number} workingWeight - Poids de travail
   * @returns {array} Séries d'échauffement
   */
  getWarmupProtocol(exerciseName, workingWeight) {
    const warmupSets = [
      { weight: workingWeight * 0.4, reps: 8, notes: "Échauffement léger" },
      { weight: workingWeight * 0.6, reps: 5, notes: "Échauffement modéré" },
      { weight: workingWeight * 0.8, reps: 3, notes: "Échauffement lourd" },
      { weight: workingWeight * 0.9, reps: 1, notes: "Préparation finale" }
    ];

    return {
      exercise: exerciseName,
      workingWeight,
      warmupSets: warmupSets.map(set => ({
        ...set,
        weight: Math.round(set.weight * 2) / 2 // Arrondir à 0.5 kg
      })),
      totalDuration: "5-7 minutes",
      notes: [
        "Repos 60-90s entre séries d'échauffement",
        "Technique parfaite même à l'échauffement",
        "Ne pas aller à l'échec sur échauffement"
      ]
    };
  }

  /**
   * Obtenir les recommandations nutritionnelles
   * @param {number} bodyWeight - Poids corporel en kg
   * @returns {object} Recommandations nutrition
   */
  getNutritionGuidelines(bodyWeight = 80) {
    const maintenance = bodyWeight * 36; // Calories maintenance
    const surplus = 400; // Surplus pour prise de masse
    const totalCalories = maintenance + surplus;

    return {
      calories: {
        maintenance,
        surplus,
        total: totalCalories,
        notes: "Ajuster selon résultats après 2 semaines"
      },
      macros: {
        proteines: {
          grammes: bodyWeight * 2,
          calories: bodyWeight * 2 * 4,
          percentage: Math.round((bodyWeight * 2 * 4 / totalCalories) * 100),
          sources: ["Poulet", "Poisson", "Œufs", "Whey", "Bœuf maigre"]
        },
        glucides: {
          grammes: bodyWeight * 3.5,
          calories: bodyWeight * 3.5 * 4,
          percentage: Math.round((bodyWeight * 3.5 * 4 / totalCalories) * 100),
          sources: ["Riz", "Patates douces", "Avoine", "Fruits", "Pâtes"]
        },
        lipides: {
          grammes: bodyWeight * 0.9,
          calories: bodyWeight * 0.9 * 9,
          percentage: Math.round((bodyWeight * 0.9 * 9 / totalCalories) * 100),
          sources: ["Huile d'olive", "Avocats", "Noix", "Saumon", "Œufs"]
        }
      },
      timing: {
        preWorkout: {
          timing: "1-2h avant",
          contenu: "30-40g protéines + 50-60g glucides",
          exemples: ["Poulet + riz", "Œufs + pain complet", "Whey + banane + avoine"]
        },
        postWorkout: {
          timing: "Dans les 30 min",
          contenu: "30g whey + 50g glucides rapides",
          exemples: ["Whey + banane + miel", "Whey + jus de fruits"]
        },
        avantCoucher: {
          timing: "30-60 min avant sommeil",
          contenu: "30g caséine ou fromage blanc + ZMA",
          objectif: "Protéines à libération lente pour récupération nocturne"
        }
      },
      hydratation: {
        base: "3L minimum par jour",
        training: "+500ml par heure d'entraînement",
        electrolytes: "1 dose pendant training (sodium, potassium, magnésium)"
      },
      supplementation: {
        obligatoires: [
          { nom: "Protéines", dose: "2g/kg/jour", timing: "Répartis sur journée" },
          { nom: "Créatine Monohydrate", dose: "5g/jour", timing: "Post-training" },
          { nom: "Collagène", dose: "10g/jour", timing: "Matin à jeun" },
          { nom: "Oméga-3 (EPA/DHA)", dose: "3g/jour", timing: "Avec repas" },
          { nom: "Vitamine D3", dose: "4000 UI/jour", timing: "Matin" },
          { nom: "ZMA (Zinc+Magnésium)", dose: "Selon étiquette", timing: "30 min avant coucher" }
        ],
        optionnels: [
          { nom: "Glucosamine + Chondroïtine", dose: "1500mg/jour", objectif: "Santé articulaire" },
          { nom: "Curcumine", dose: "500mg matin", objectif: "Anti-inflammatoire" },
          { nom: "Magnésium bisglycinate", dose: "400mg soir", objectif: "Récupération musculaire" }
        ]
      }
    };
  }

  /**
   * Valider la structure complète du programme
   * @returns {object} Rapport de validation
   */
  validateProgram() {
    const errors = [];
    const warnings = [];

    // Vérifier les 26 semaines
    for (let week = 1; week <= 26; week++) {
      try {
        const weekData = this.getWeekWorkouts(week);
        if (!weekData.block) {
          errors.push(`Semaine ${week}: Aucun bloc assigné`);
        }
      } catch (error) {
        errors.push(`Semaine ${week}: ${error.message}`);
      }
    }

    // Vérifier tous les exercices
    const allExercises = this.getAllExercises();
    allExercises.forEach(ex => {
      if (!ex.id) errors.push(`Exercice sans ID: ${ex.name}`);
      if (!ex.sets) errors.push(`${ex.name}: Séries manquantes`);
      if (!ex.reps) errors.push(`${ex.name}: Reps manquantes`);
      if (!ex.startWeight) warnings.push(`${ex.name}: Poids de départ manquant`);
      if (!ex.progression) errors.push(`${ex.name}: Progression manquante`);
    });

    // Vérifier les deloads
    if (this.program.deloadWeeks.length !== 5) {
      errors.push(`Nombre de deloads incorrect: ${this.program.deloadWeeks.length} (attendu: 5)`);
    }

    // Vérifier les blocs
    if (this.program.blocks.length !== 4) {
      errors.push(`Nombre de blocs incorrect: ${this.program.blocks.length} (attendu: 4)`);
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      stats: {
        totalWeeks: 26,
        totalBlocks: this.program.blocks.length,
        totalExercises: allExercises.length,
        totalDeloads: this.program.deloadWeeks.length,
        workoutsPerWeek: 3
      }
    };
  }
}

// 🎯 EXPORT DE LA CLASSE
export default ProgramData;
