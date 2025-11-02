/**
 * WORKOUT RENDERER - Affichage des séances d'entraînement
 * Gère l'affichage des exercices, supersets, techniques, validation
 * Version: 1.0
 */

export class WorkoutRenderer {
  constructor(container, programData) {
    this.container = container;
    this.programData = programData;
    this.currentWorkout = null;
    this.completedSets = new Map(); // exerciseId -> [série1, série2, ...]
  }

  /**
   * Affiche les séances d'une semaine donnée
   */
  renderWeek(weekNumber) {
    const weekData = this.programData.getWeekWorkouts(weekNumber);
    if (!weekData) {
      this.container.innerHTML = '<p class="error">Aucune donnée pour cette semaine</p>';
      return;
    }

    const blockInfo = this.programData.getBlockForWeek(weekNumber);
    
    this.container.innerHTML = `
      <div class="week-overview">
        <div class="block-badge">Bloc ${blockInfo.id} : ${blockInfo.name}</div>
        <div class="week-techniques">
          <h3>⚡ Techniques du bloc</h3>
          <p><strong>${blockInfo.technique.name}</strong></p>
          <p>${blockInfo.technique.description}</p>
        </div>
      </div>

      <div class="workouts-grid">
        ${this.renderWorkoutDay('dimanche', weekData.dimanche, weekNumber)}
        ${this.renderWorkoutDay('mardi', weekData.mardi, weekNumber)}
        ${this.renderWorkoutDay('vendredi', weekData.vendredi, weekNumber)}
        ${this.renderHomeWorkout(weekData.maison, weekNumber)}
      </div>
    `;

    this.attachEventListeners();
  }

  /**
   * Affiche une journée d'entraînement
   */
  renderWorkoutDay(dayName, workout, weekNumber) {
    if (!workout || !workout.exercises) return '';

    const dayLabels = {
      dimanche: 'Dimanche',
      mardi: 'Mardi',
      vendredi: 'Vendredi'
    };

    const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets, 0);
    const duration = workout.duration || this.estimateDuration(workout.exercises);

    return `
      <div class="workout-card" data-day="${dayName}">
        <div class="workout-header">
          <h3>${dayLabels[dayName]}</h3>
          <div class="workout-meta">
            <span class="badge">⏱️ ${duration} min</span>
            <span class="badge">📊 ${totalSets} séries</span>
          </div>
        </div>

        <div class="workout-focus">
          <strong>Focus :</strong> ${workout.name}
        </div>

        <div class="exercises-list">
          ${this.renderExercises(workout.exercises, weekNumber, dayName)}
        </div>

        <button class="btn-start-workout" data-day="${dayName}" data-week="${weekNumber}">
          🏋️ Démarrer la séance
        </button>
      </div>
    `;
  }

  /**
   * Affiche la séance maison (Hammer Curl)
   */
  renderHomeWorkout(workout, weekNumber) {
    if (!workout) return '';

    return `
      <div class="workout-card workout-home">
        <div class="workout-header">
          <h3>🏠 Séance Maison</h3>
          <div class="workout-meta">
            <span class="badge">⏱️ 10 min</span>
            <span class="badge">Mardi OU Jeudi soir</span>
          </div>
        </div>

        <div class="exercises-list">
          ${workout.exercises.map((ex, idx) => `
            <div class="exercise-item">
              <div class="exercise-name">
                <span class="exercise-number">${idx + 1}.</span>
                ${ex.name}
              </div>
              <div class="exercise-specs">
                <span class="badge">${ex.sets}×${ex.reps}</span>
                <span class="badge">Repos: ${ex.rest}s</span>
              </div>
              ${ex.notes ? `<p class="exercise-notes">${ex.notes}</p>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  /**
   * Affiche la liste des exercices avec gestion des supersets
   */
  renderExercises(exercises, weekNumber, dayName) {
    const grouped = this.groupSupersets(exercises);
    
    return grouped.map((group, groupIdx) => {
      if (group.isSuperset) {
        return this.renderSuperset(group.exercises, weekNumber, dayName, groupIdx);
      } else {
        return this.renderSingleExercise(group.exercises[0], weekNumber, dayName, groupIdx);
      }
    }).join('');
  }

  /**
   * Groupe les exercices en supersets
   */
  groupSupersets(exercises) {
    const groups = [];
    let currentSuperset = null;

    exercises.forEach(ex => {
      if (ex.superset) {
        if (!currentSuperset) {
          currentSuperset = { isSuperset: true, exercises: [] };
        }
        currentSuperset.exercises.push(ex);
      } else {
        if (currentSuperset) {
          groups.push(currentSuperset);
          currentSuperset = null;
        }
        groups.push({ isSuperset: false, exercises: [ex] });
      }
    });

    if (currentSuperset) {
      groups.push(currentSuperset);
    }

    return groups;
  }

  /**
   * Affiche un superset (2+ exercices enchaînés)
   */
  renderSuperset(exercises, weekNumber, dayName, groupIdx) {
    return `
      <div class="exercise-superset">
        <div class="superset-badge">🔗 SUPERSET</div>
        ${exercises.map((ex, idx) => `
          <div class="exercise-item" data-exercise-id="${ex.id}">
            <div class="exercise-header">
              <div class="exercise-name">
                <span class="exercise-number">${groupIdx + 1}${String.fromCharCode(97 + idx)}.</span>
                ${ex.name}
              </div>
              <div class="exercise-specs">
                <span class="badge">${ex.sets}×${ex.reps}</span>
                ${ex.rir !== undefined ? `<span class="badge">RIR ${ex.rir}</span>` : ''}
                <span class="badge">Poids: ${ex.weight}kg</span>
              </div>
            </div>
            ${ex.notes ? `<p class="exercise-notes">${ex.notes}</p>` : ''}
          </div>
        `).join('')}
        <div class="superset-rest">
          Repos après superset : ${exercises[0].rest}s
        </div>
      </div>
    `;
  }

  /**
   * Affiche un exercice simple
   */
  renderSingleExercise(exercise, weekNumber, dayName, groupIdx) {
    return `
      <div class="exercise-item" data-exercise-id="${exercise.id}">
        <div class="exercise-header">
          <div class="exercise-name">
            <span class="exercise-number">${groupIdx + 1}.</span>
            ${exercise.name}
          </div>
          <div class="exercise-specs">
            <span class="badge">${exercise.sets}×${exercise.reps}</span>
            ${exercise.rir !== undefined ? `<span class="badge">RIR ${exercise.rir}</span>` : ''}
            <span class="badge">Poids: ${exercise.weight}kg</span>
            <span class="badge">Repos: ${exercise.rest}s</span>
          </div>
        </div>
        ${exercise.notes ? `<p class="exercise-notes">${exercise.notes}</p>` : ''}
      </div>
    `;
  }

  /**
   * Mode séance active avec validation des séries
   */
  startWorkoutMode(dayName, weekNumber) {
    const weekData = this.programData.getWeekWorkouts(weekNumber);
    const workout = weekData[dayName];
    
    if (!workout) return;

    this.currentWorkout = { day: dayName, week: weekNumber, workout };
    this.completedSets.clear();

    this.container.innerHTML = `
      <div class="workout-mode-header">
        <button class="btn-back" id="exitWorkoutMode">← Retour</button>
        <h2>${this.getDayLabel(dayName)} - Semaine ${weekNumber}</h2>
        <div class="workout-progress">
          <span id="completedSets">0</span>/${workout.exercises.reduce((sum, ex) => sum + ex.sets, 0)} séries
        </div>
      </div>

      <div class="workout-mode-content">
        ${workout.exercises.map((ex, idx) => this.renderActiveExercise(ex, idx)).join('')}
      </div>

      <button class="btn-complete-workout" id="completeWorkout">
        ✅ Terminer la séance
      </button>
    `;

    this.attachWorkoutModeListeners();
  }

  /**
   * Affiche un exercice en mode actif avec validation
   */
  renderActiveExercise(exercise, index) {
    const sets = Array.from({ length: exercise.sets }, (_, i) => i + 1);
    
    return `
      <div class="active-exercise" data-exercise-id="${exercise.id}">
        <div class="active-exercise-header">
          <h3>${index + 1}. ${exercise.name}</h3>
          <div class="active-exercise-specs">
            <span>${exercise.sets}×${exercise.reps}</span>
            <span>Poids: ${exercise.weight}kg</span>
            ${exercise.rir !== undefined ? `<span>RIR ${exercise.rir}</span>` : ''}
          </div>
        </div>

        ${exercise.notes ? `<p class="exercise-notes">${exercise.notes}</p>` : ''}

        <div class="sets-validation">
          ${sets.map(setNum => `
            <div class="set-item" data-set="${setNum}">
              <span class="set-number">Série ${setNum}</span>
              <input type="number" 
                     class="set-reps-input" 
                     placeholder="Reps" 
                     data-exercise="${exercise.id}" 
                     data-set="${setNum}">
              <button class="btn-validate-set" 
                      data-exercise="${exercise.id}" 
                      data-set="${setNum}">
                ✓
              </button>
              <button class="btn-start-timer" 
                      data-rest="${exercise.rest}">
                ⏱️ ${exercise.rest}s
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  /**
   * Estime la durée d'une séance
   */
  estimateDuration(exercises) {
    const totalSets = exercises.reduce((sum, ex) => sum + ex.sets, 0);
    const avgSetTime = 45; // secondes par série
    const avgRest = exercises.reduce((sum, ex) => sum + ex.rest, 0) / exercises.length;
    
    return Math.round((totalSets * (avgSetTime + avgRest)) / 60);
  }

  /**
   * Retourne le label français d'un jour
   */
  getDayLabel(dayName) {
    const labels = {
      dimanche: 'Dimanche',
      mardi: 'Mardi',
      vendredi: 'Vendredi',
      maison: 'Séance Maison'
    };
    return labels[dayName] || dayName;
  }

  /**
   * Attache les écouteurs d'événements (mode aperçu)
   */
  attachEventListeners() {
    this.container.querySelectorAll('.btn-start-workout').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const day = e.target.dataset.day;
        const week = parseInt(e.target.dataset.week);
        this.startWorkoutMode(day, week);
      });
    });
  }

  /**
   * Attache les écouteurs d'événements (mode séance)
   */
  attachWorkoutModeListeners() {
    // Bouton retour
    document.getElementById('exitWorkoutMode')?.addEventListener('click', () => {
      if (this.currentWorkout) {
        this.renderWeek(this.currentWorkout.week);
      }
    });

    // Validation des séries
    this.container.querySelectorAll('.btn-validate-set').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const exerciseId = e.target.dataset.exercise;
        const setNum = parseInt(e.target.dataset.set);
        const input = this.container.querySelector(
          `input[data-exercise="${exerciseId}"][data-set="${setNum}"]`
        );
        
        if (input && input.value) {
          this.validateSet(exerciseId, setNum, parseInt(input.value));
          e.target.classList.add('validated');
          e.target.textContent = '✓';
          input.disabled = true;
        }
      });
    });

    // Timers de repos
    this.container.querySelectorAll('.btn-start-timer').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const restTime = parseInt(e.target.dataset.rest);
        this.startRestTimer(e.target, restTime);
      });
    });

    // Terminer la séance
    document.getElementById('completeWorkout')?.addEventListener('click', () => {
      this.completeWorkout();
    });
  }

  /**
   * Valide une série complétée
   */
  validateSet(exerciseId, setNum, reps) {
    if (!this.completedSets.has(exerciseId)) {
      this.completedSets.set(exerciseId, []);
    }
    
    this.completedSets.get(exerciseId)[setNum - 1] = reps;
    
    // Mettre à jour le compteur
    const totalCompleted = Array.from(this.completedSets.values())
      .flat()
      .filter(v => v !== undefined).length;
    
    const counter = document.getElementById('completedSets');
    if (counter) {
      counter.textContent = totalCompleted;
    }
  }

  /**
   * Démarre un timer de repos
   */
  startRestTimer(button, seconds) {
    let remaining = seconds;
    button.disabled = true;
    
    const interval = setInterval(() => {
      remaining--;
      button.textContent = `⏱️ ${remaining}s`;
      
      if (remaining <= 0) {
        clearInterval(interval);
        button.textContent = `⏱️ ${seconds}s`;
        button.disabled = false;
        
        // Notification sonore (optionnelle)
        if ('Audio' in window) {
          const beep = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBCx+zPLTgjMGHm7A7+OZTR4NW';
          beep.play().catch(() => {});
        }
      }
    }, 1000);
  }

  /**
   * Termine la séance et sauvegarde les données
   */
  completeWorkout() {
    if (!this.currentWorkout) return;

    const workoutData = {
      date: new Date().toISOString(),
      week: this.currentWorkout.week,
      day: this.currentWorkout.day,
      completed: true,
      sets: Object.fromEntries(this.completedSets)
    };

    // Émettre un événement personnalisé pour que app.js puisse sauvegarder
    const event = new CustomEvent('workoutCompleted', { detail: workoutData });
    document.dispatchEvent(event);

    // Afficher un message de succès
    this.container.innerHTML = `
      <div class="workout-complete-message">
        <h2>🎉 Séance terminée !</h2>
        <p>Excellent travail ! Tes données ont été sauvegardées.</p>
        <button class="btn-primary" id="returnToOverview">
          Retour à l'aperçu
        </button>
      </div>
    `;

    document.getElementById('returnToOverview')?.addEventListener('click', () => {
      this.renderWeek(this.currentWorkout.week);
    });
  }
}
