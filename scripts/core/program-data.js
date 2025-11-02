// ===================================================================
// HYBRID MASTER 51 - DONNÉES DU PROGRAMME COMPLET
// ===================================================================
// Programme complet de musculation sur 26 semaines
// 4 blocs d'entraînement avec techniques progressives

export const PROGRAM_DATA = {
  // Configuration générale
  totalWeeks: 26,
  sessionsPerWeek: 3,
  restDays: ['lundi', 'mercredi', 'vendredi', 'samedi'],
  
  // Semaines de deload
  deloadWeeks: [6, 12, 18, 24, 26],
  deloadReduction: 0.40, // -40% de charge
  
  // Blocs d'entraînement
  blocks: {
    1: {
      weeks: [1, 2, 3, 4, 5, 6],
      name: 'Bloc 1 - Hypertrophie Force',
      technique: 'Tempo 3-1-2',
      focus: 'Volume et contrôle'
    },
    2: {
      weeks: [7, 8, 9, 10, 11, 12],
      name: 'Bloc 2 - Intensification',
      technique: 'Rest-Pause',
      focus: 'Intensité et densité'
    },
    3: {
      weeks: [13, 14, 15, 16, 17, 18],
      name: 'Bloc 3 - Métabolique',
      technique: 'Drop-sets + Myo-reps',
      focus: 'Stress métabolique'
    },
    4: {
      weeks: [19, 20, 21, 22, 23, 24, 25, 26],
      name: 'Bloc 4 - Puissance-Endurance',
      technique: 'Clusters + Partials + Myo-reps',
      focus: 'Pic de performance'
    }
  },

  // Programme hebdomadaire
  weeklySchedule: {
    dimanche: {
      name: 'Dimanche - Dos + Jambes Lourdes',
      duration: '90min',
      focus: 'Force maximale',
      exercises: [
        {
          name: 'Trap Bar Deadlift',
          sets: 5,
          reps: '5-6 reps',
          rest: '3min',
          startWeight: 100, // kg pour homme de 80kg
          progressionType: 'linear',
          progressionFrequency: 2, // toutes les 2 semaines
          increment: 2.5,
          technique: 'Tempo 3-1-2',
          muscles: ['Dos', 'Jambes', 'Core']
        },
        {
          name: 'Bulgarian Split Squat',
          sets: 4,
          reps: '8-10 reps/jambe',
          rest: '2min',
          startWeight: 20,
          progressionType: 'wave',
          progressionFrequency: 3,
          increment: 2.5,
          technique: 'Tempo 3-1-2',
          muscles: ['Quadriceps', 'Fessiers']
        },
        {
          name: 'Chest-Supported Row',
          sets: 4,
          reps: '10-12 reps',
          rest: '90s',
          startWeight: 30,
          progressionType: 'linear',
          progressionFrequency: 2,
          increment: 2.5,
          technique: 'Tempo 3-1-2',
          muscles: ['Dos', 'Trapèzes']
        },
        {
          name: 'Leg Curl',
          sets: 4,
          reps: '12-15 reps',
          rest: '90s',
          startWeight: 40,
          progressionType: 'linear',
          progressionFrequency: 3,
          increment: 2.5,
          technique: 'Tempo 3-1-2',
          muscles: ['Ischio-jambiers']
        },
        {
          name: 'Lat Pulldown',
          sets: 3,
          reps: '12-15 reps',
          rest: '90s',
          startWeight: 50,
          progressionType: 'linear',
          progressionFrequency: 3,
          increment: 2.5,
          technique: 'Tempo 3-1-2',
          muscles: ['Dorsaux']
        },
        {
          name: 'Standing Calf Raise',
          sets: 4,
          reps: '15-20 reps',
          rest: '60s',
          startWeight: 60,
          progressionType: 'linear',
          progressionFrequency: 4,
          increment: 5,
          technique: 'Tempo 3-1-2',
          muscles: ['Mollets']
        }
      ]
    },

    mardi: {
      name: 'Mardi - Pecs + Épaules',
      duration: '75min',
      focus: 'Hypertrophie',
      exercises: [
        {
          name: 'Incline Barbell Press',
          sets: 4,
          reps: '6-8 reps',
          rest: '2min30',
          startWeight: 60,
          progressionType: 'wave',
          progressionFrequency: 2,
          increment: 2.5,
          technique: 'Tempo 3-1-2',
          muscles: ['Pectoraux supérieurs', 'Épaules']
        },
        {
          name: 'Flat Dumbbell Press',
          sets: 4,
          reps: '8-10 reps',
          rest: '2min',
          startWeight: 30,
          progressionType: 'linear',
          progressionFrequency: 2,
          increment: 2.5,
          technique: 'Tempo 3-1-2',
          muscles: ['Pectoraux']
        },
        {
          name: 'Cable Fly (High to Low)',
          sets: 3,
          reps: '12-15 reps',
          rest: '90s',
          startWeight: 15,
          progressionType: 'linear',
          progressionFrequency: 3,
          increment: 2.5,
          technique: 'Tempo 3-1-2',
          muscles: ['Pectoraux inférieurs']
        },
        {
          name: 'Overhead Press',
          sets: 4,
          reps: '8-10 reps',
          rest: '2min',
          startWeight: 40,
          progressionType: 'wave',
          progressionFrequency: 2,
          increment: 2.5,
          technique: 'Tempo 3-1-2',
          muscles: ['Épaules', 'Triceps']
        },
        {
          name: 'Lateral Raise',
          sets: 4,
          reps: '12-15 reps',
          rest: '90s',
          startWeight: 10,
          progressionType: 'linear',
          progressionFrequency: 3,
          increment: 1.25,
          technique: 'Tempo 3-1-2',
          superset: true,
          supersetWith: 'Rear Delt Fly',
          muscles: ['Deltoïdes latéraux']
        },
        {
          name: 'Rear Delt Fly',
          sets: 4,
          reps: '15-20 reps',
          rest: '90s',
          startWeight: 8,
          progressionType: 'linear',
          progressionFrequency: 3,
          increment: 1.25,
          technique: 'Tempo 3-1-2',
          superset: true,
          supersetWith: 'Lateral Raise',
          muscles: ['Deltoïdes postérieurs']
        }
      ]
    },

    jeudi: {
      name: 'Jeudi - Dos + Jambes Légères',
      duration: '75min',
      focus: 'Volume et technique',
      exercises: [
        {
          name: 'Barbell Row',
          sets: 4,
          reps: '8-10 reps',
          rest: '2min',
          startWeight: 60,
          progressionType: 'linear',
          progressionFrequency: 2,
          increment: 2.5,
          technique: 'Tempo 3-1-2',
          muscles: ['Dos', 'Trapèzes']
        },
        {
          name: 'Squat (léger)',
          sets: 4,
          reps: '10-12 reps',
          rest: '2min',
          startWeight: 60,
          progressionType: 'linear',
          progressionFrequency: 3,
          increment: 2.5,
          technique: 'Tempo 3-1-2',
          muscles: ['Quadriceps', 'Fessiers']
        },
        {
          name: 'Pull-ups ou Lat Pulldown',
          sets: 4,
          reps: '10-12 reps',
          rest: '90s',
          startWeight: 'Poids du corps',
          progressionType: 'reps',
          progressionFrequency: 2,
          increment: 1,
          technique: 'Tempo 3-1-2',
          muscles: ['Dorsaux', 'Biceps']
        },
        {
          name: 'Romanian Deadlift',
          sets: 3,
          reps: '10-12 reps',
          rest: '90s',
          startWeight: 60,
          progressionType: 'linear',
          progressionFrequency: 3,
          increment: 2.5,
          technique: 'Tempo 3-1-2',
          muscles: ['Ischio-jambiers', 'Fessiers']
        },
        {
          name: 'Face Pull',
          sets: 3,
          reps: '15-20 reps',
          rest: '60s',
          startWeight: 20,
          progressionType: 'linear',
          progressionFrequency: 3,
          increment: 2.5,
          technique: 'Tempo 3-1-2',
          muscles: ['Trapèzes', 'Deltoïdes postérieurs']
        },
        {
          name: 'Cable Crunch',
          sets: 3,
          reps: '15-20 reps',
          rest: '60s',
          startWeight: 40,
          progressionType: 'linear',
          progressionFrequency: 3,
          increment: 5,
          technique: 'Tempo 3-1-2',
          muscles: ['Abdominaux']
        }
      ]
    },

    maison: {
      name: 'Maison - Bras + Abdos',
      duration: '45min',
      focus: 'Accessoires',
      exercises: [
        {
          name: 'Biceps Rotation',
          sets: 4,
          reps: '10-12 reps',
          rest: '90s',
          startWeight: 15,
          progressionType: 'linear',
          progressionFrequency: 2,
          increment: 1.25,
          technique: 'Tempo 3-1-2',
          note: 'Alterne Incline Curl et Spider Curl chaque semaine',
          rotation: true,
          muscles: ['Biceps']
        },
        {
          name: 'Overhead Triceps Extension',
          sets: 4,
          reps: '12-15 reps',
          rest: '90s',
          startWeight: 20,
          progressionType: 'linear',
          progressionFrequency: 3,
          increment: 2.5,
          technique: 'Tempo 3-1-2',
          muscles: ['Triceps']
        },
        {
          name: 'Hammer Curl',
          sets: 3,
          reps: '12-15 reps',
          rest: '90s',
          startWeight: 12,
          progressionType: 'linear',
          progressionFrequency: 3,
          increment: 1.25,
          technique: 'Tempo 3-1-2',
          muscles: ['Biceps', 'Avant-bras']
        },
        {
          name: 'Cable Triceps Pushdown',
          sets: 3,
          reps: '15-20 reps',
          rest: '60s',
          startWeight: 30,
          progressionType: 'linear',
          progressionFrequency: 3,
          increment: 2.5,
          technique: 'Tempo 3-1-2',
          muscles: ['Triceps']
        },
        {
          name: 'Plank',
          sets: 3,
          reps: '45-60s',
          rest: '60s',
          startWeight: 'Poids du corps',
          progressionType: 'time',
          progressionFrequency: 2,
          increment: 5,
          muscles: ['Core']
        },
        {
          name: 'Russian Twist',
          sets: 3,
          reps: '20 reps/côté',
          rest: '60s',
          startWeight: 10,
          progressionType: 'linear',
          progressionFrequency: 3,
          increment: 2.5,
          muscles: ['Obliques']
        }
      ]
    }
  },

  // Protocole d'échauffement
  warmupProtocol: {
    cardio: '5-10min cardio léger (rameur, vélo, marche rapide)',
    mobility: 'Mobilité articulaire ciblée (hanches, épaules, thoracique)',
    specific: '2 séries d\'échauffement par exercice : 50% x 8 reps, 75% x 4 reps'
  },

  // Nutrition recommandée
  nutrition: {
    calories: {
      maintenance: 2800,
      surplus: 3200,
      deficit: 2400
    },
    macros: {
      protein: '2g/kg de poids de corps',
      carbs: '4-5g/kg',
      fats: '1g/kg'
    },
    timing: {
      preworkout: '1-2h avant : Glucides + Protéines',
      postworkout: 'Dans les 2h : Protéines + Glucides',
      daily: '4-5 repas équilibrés'
    },
    hydration: '3-4L d\'eau par jour minimum'
  },

  // Supplémentation
  supplements: {
    essential: [
      { name: 'Whey Protein', dose: '30g post-workout', timing: 'Après entraînement' },
      { name: 'Créatine Monohydrate', dose: '5g/jour', timing: 'Tous les jours' }
    ],
    optional: [
      { name: 'Caféine', dose: '200mg', timing: '30min pré-workout' },
      { name: 'Bêta-Alanine', dose: '3-5g/jour', timing: 'Pré-workout' },
      { name: 'Citrulline Malate', dose: '6-8g', timing: '30min pré-workout' }
    ]
  },

  // Récupération
  recovery: {
    sleep: '7-9h de sommeil par nuit minimum',
    deload: 'Semaines 6, 12, 18, 24, 26 : -40% de charge',
    signs: [
      'Fatigue persistante',
      'Baisse de performance',
      'Troubles du sommeil',
      'Irritabilité',
      'Douleurs articulaires'
    ]
  },

  // Règles de sécurité
  safety: [
    'Toujours s\'échauffer correctement',
    'Privilégier la technique sur la charge',
    'Arrêter immédiatement si douleur aiguë',
    'Respecter les repos prescrits',
    'Consulter un professionnel si blessure'
  ]
};

// Helper functions
export function getBlockForWeek(weekNumber) {
  for (const [blockNum, block] of Object.entries(PROGRAM_DATA.blocks)) {
    if (block.weeks.includes(weekNumber)) {
      return { number: parseInt(blockNum), ...block };
    }
  }
  return null;
}

export function isDeloadWeek(weekNumber) {
  return PROGRAM_DATA.deloadWeeks.includes(weekNumber);
}

export function getBicepsExercise(weekNumber) {
  // Alterne Incline Curl (semaines impaires) et Spider Curl (semaines paires)
  return weekNumber % 2 === 1 ? 'Incline Curl' : 'Spider Curl';
}
