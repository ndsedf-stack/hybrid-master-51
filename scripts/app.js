/**
 * HYBRID MASTER 51 - APPLICATION PRINCIPALE
 * Adapté pour la structure réelle du programme
 * Version: 2.0 - Compatible programme réel
 */

class HybridMasterApp {
  constructor() {
    console.log('🏋️ Initialisation Hybrid Master 51 - Version Réelle...');
    
    // État de l'application
    this.state = {
      currentWeek: 1,
      currentDay: null,
      userProgress: {},
      lastSaved: null
    };

    // Initialiser les données du programme RÉEL
    this.programData = new ProgramData();
    console.log('✅ Programme réel chargé:', this.programData.getProgramStats());
    
    // Attacher les événements des boutons
    this.attachButtonEvents();
    
    // Charger les données sauvegardées
    this.loadUserData();
    
    // Initialiser l'interface avec le programme RÉEL
    this.initializeRealUI();
    
    console.log('✅ Application initialisée avec succès (Version Réelle)');
  }

  /**
   * Attacher les événements aux boutons de navigation
   */
  attachButtonEvents() {
    try {
      // Attacher l'événement au bouton Précédent
      const prevButton = document.getElementById('prevWeek');
      if (prevButton) {
        prevButton.addEventListener('click', () => {
          console.log('← Bouton Précédent cliqué');
          this.previousWeek();
        });
        console.log('✅ Événement attaché sur bouton Précédent');
      } else {
        console.error('❌ Bouton Précédent non trouvé');
      }

      // Attacher l'événement au bouton Suivant
      const nextButton = document.getElementById('nextWeek');
      if (nextButton) {
        nextButton.addEventListener('click', () => {
          console.log('→ Bouton Suivant cliqué');
          this.nextWeek();
        });
        console.log('✅ Événement attaché sur bouton Suivant');
      } else {
        console.error('❌ Bouton Suivant non trouvé');
      }

    } catch (error) {
      console.error('❌ Erreur attachement événements:', error);
    }
  }

  /**
   * Initialiser l'interface avec le programme RÉEL
   */
  initializeRealUI() {
    // Afficher la semaine courante
    this.updateWeekDisplay(this.state.currentWeek);
    
    // Afficher les séances de la semaine avec données RÉELLES
    this.displayRealWeekWorkouts(this.state.currentWeek);
    
    // Mettre à jour les statistiques overview
    this.updateRealStats(this.state.currentWeek);
  }

  /**
   * Afficher les séances RÉELLES d'une semaine
   * @param {number} weekNumber - Numéro de semaine (1-26)
   */
  displayRealWeekWorkouts(weekNumber) {
    try {
      console.log(`📅 Affichage semaine ${weekNumber} (Structure Réelle)...`);
      
      // Utiliser la méthode de votre ProgrammeData RÉEL
      const weekData = this.programData.getWeekWorkouts(weekNumber);
      
      if (!weekData) {
        console.error('❌ Aucune donnée pour la semaine:', weekNumber);
        this.showError(`Aucune donnée pour la semaine ${weekNumber}`);
        return;
      }

      // Mettre à jour l'état
      this.state.currentWeek = weekNumber;
      
      // Afficher le badge de bloc RÉEL
      this.displayRealBlockBadge(weekData.block);
      
      // Afficher le deload si actif
      if (weekData.isDeload) {
        this.displayDeloadNotice();
      }
      
      // Rendre les séances RÉELLES
      this.renderRealWorkouts(weekData.workouts);
      
      console.log('✅ Séances réelles affichées avec succès');

    } catch (error) {
      console.error('❌ Erreur affichage semaine réelle:', error);
      this.showError(`Impossible d'afficher la semaine ${weekNumber}`);
    }
  }

  /**
   * Afficher le badge du bloc RÉEL
   * @param {object} block - Bloc d'entraînement RÉEL
   */
  displayRealBlockBadge(block) {
    const badge = document.getElementById('blockBadge');
    if (!badge) return;

    if (block && block.name) {
      badge.textContent = `${block.name}`;
      badge.className = 'block-badge';
      badge.classList.add(`bloc-${block.id}`);
      badge.title = `${block.technique?.name || 'Technique'} - ${block.technique?.rpe || 'RPE'}`;
    } else {
      badge.textContent = 'Bloc en cours';
    }
  }

  /**
   * Rendre les séances RÉELLES
   * @param {object} workouts - Séances de la semaine
   */
  renderRealWorkouts(workouts) {
    const workoutDays = document.getElementById('workoutDays');
    if (!workoutDays) return;

    workoutDays.innerHTML = '';

    // Jours d'entraînement dans l'ordre
    const trainingDays = ['dimanche', 'mardi', 'vendredi'];
    
    let hasWorkouts = false;

    trainingDays.forEach(day => {
      if (workouts[day]) {
        hasWorkouts = true;
        const workoutElement = this.createRealWorkoutElement(workouts[day], day);
        workoutDays.appendChild(workoutElement);
      }
    });

    if (!hasWorkouts) {
      workoutDays.innerHTML = `
        <div class="no-workouts">
          <p>⚠️ Aucune séance programmée cette semaine</p>
          <p class="small-text">Vérifiez les données du programme</p>
        </div>
      `;
    }
  }

  /**
   * Créer un élément de séance RÉEL
   * @param {object} workout - Séance
   * @param {string} day - Jour
   * @returns {HTMLElement} Élément DOM
   */
  createRealWorkoutElement(workout, day) {
    const workoutDiv = document.createElement('div');
    workoutDiv.className = 'workout-day';
    workoutDiv.dataset.day = day;

    let exercisesHTML = '';
    
    if (workout.exercises && workout.exercises.length > 0) {
      exercisesHTML = workout.exercises.map(exercise => `
        <div class="exercise-item" data-exercise-id="${exercise.id}">
          <div class="exercise-header">
            <h4 class="exercise-name">${exercise.name}</h4>
            <span class="exercise-muscle">${Array.isArray(exercise.muscleGroup) ? exercise.muscleGroup.join(', ') : exercise.muscleGroup || ''}</span>
          </div>
          <div class="exercise-details">
            <div class="exercise-sets">
              <span class="label">Séries:</span>
              <span class="value">${exercise.sets}</span>
            </div>
            <div class="exercise-reps">
              <span class="label">Reps:</span>
              <span class="value">${exercise.reps}</span>
            </div>
            <div class="exercise-weight">
              <span class="label">Poids:</span>
              <span class="value">${exercise.currentWeight || exercise.startWeight || 'N/A'} ${exercise.weightType || 'kg'}</span>
            </div>
            <div class="exercise-rest">
              <span class="label">Repos:</span>
              <span class="value">${exercise.rest}s</span>
            </div>
          </div>
          ${exercise.notes ? `<div class="exercise-notes">📝 ${exercise.notes}</div>` : ''}
          ${exercise.activeTechnique ? `<div class="exercise-technique">🎯 ${exercise.activeTechnique}</div>` : ''}
          ${exercise.deloadActive ? `<div class="deload-badge">♻️ DELOAD</div>` : ''}
        </div>
      `).join('');
    } else {
      exercisesHTML = '<p class="no-exercises">Aucun exercice défini</p>';
    }

    workoutDiv.innerHTML = `
      <div class="workout-header">
        <h3 class="workout-title">${workout.name || 'Séance ' + day}</h3>
        <div class="workout-meta">
          ${workout.duration ? `<span class="duration">⏱️ ${workout.duration} min</span>` : ''}
          ${workout.totalSets ? `<span class="sets">📊 ${workout.totalSets} séries</span>` : ''}
          <span class="day-badge">${this.getDayEmoji(day)} ${day.charAt(0).toUpperCase() + day.slice(1)}</span>
        </div>
      </div>
      <div class="exercises-list">
        ${exercisesHTML}
      </div>
      <div class="workout-actions">
        <button class="btn-start-workout" data-day="${day}">
          🏋️ Démarrer la séance
        </button>
      </div>
    `;

    // Attacher l'événement au bouton de démarrage
    const startButton = workoutDiv.querySelector('.btn-start-workout');
    if (startButton) {
      startButton.addEventListener('click', () => {
        this.startWorkout(day);
      });
    }

    return workoutDiv;
  }

  /**
   * Obtenir l'emoji pour le jour
   * @param {string} day - Jour
   * @returns {string} Emoji
   */
  getDayEmoji(day) {
    const emojis = {
      dimanche: '📅',
      mardi: '💪', 
      vendredi: '🔥'
    };
    return emojis[day] || '🏃';
  }

  /**
   * Démarrer une séance
   * @param {string} day - Jour de la séance
   */
  startWorkout(day) {
    console.log(`🏋️ Démarrage séance ${day} - Semaine ${this.state.currentWeek}`);
    this.showSuccess(`Séance ${day} démarrée !`);
    
    // Ici vous pouvez ajouter la logique pour le mode séance
    // Pour l'instant, on montre juste une confirmation
  }

  /**
   * Mettre à jour l'affichage de la semaine
   * @param {number} weekNumber - Numéro de semaine
   */
  updateWeekDisplay(weekNumber) {
    const weekDisplay = document.getElementById('weekDisplay');
    if (weekDisplay) {
      weekDisplay.textContent = `Semaine ${weekNumber}`;
    }
  }

  /**
   * Mettre à jour les statistiques RÉELLES
   * @param {number} weekNumber - Numéro de semaine
   */
  updateRealStats(weekNumber) {
    try {
      const weekData = this.programData.getWeekWorkouts(weekNumber);
      if (!weekData || !weekData.workouts) return;

      let totalVolume = 0;
      let totalExercises = 0;
      let totalDuration = 0;

      // Calculer les totaux
      Object.values(weekData.workouts).forEach(workout => {
        if (workout.exercises) {
          totalExercises += workout.exercises.length;
          
          workout.exercises.forEach(ex => {
            const weight = ex.currentWeight || ex.startWeight || 0;
            const sets = ex.sets || 0;
            const reps = typeof ex.reps === 'string' ? 
              parseInt(ex.reps.split('-')[0]) : (ex.reps || 0);
            
            totalVolume += weight * sets * reps;
          });
        }
        
        if (workout.duration) {
          totalDuration += workout.duration;
        }
      });

      // Mettre à jour l'affichage
      this.updateStatCard('totalVolume', `${Math.round(totalVolume)} kg`);
      this.updateStatCard('totalExercises', totalExercises);
      this.updateStatCard('estimatedTime', `${totalDuration} min`);

    } catch (error) {
      console.error('❌ Erreur calcul stats:', error);
    }
  }

  /**
   * Mettre à jour une carte de statistique
   * @param {string} id - ID de la carte
   * @param {string|number} value - Valeur à afficher
   */
  updateStatCard(id, value) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
      element.classList.add('stat-updated');
      setTimeout(() => element.classList.remove('stat-updated'), 300);
    }
  }

  /**
   * Afficher la notice de deload
   */
  displayDeloadNotice() {
    const statsSection = document.getElementById('statsOverview');
    if (!statsSection) return;

    // Supprimer notice existante
    const existingNotice = document.querySelector('.deload-notice');
    if (existingNotice) existingNotice.remove();

    // Créer nouvelle notice
    const notice = document.createElement('div');
    notice.className = 'deload-notice';
    notice.innerHTML = `
      <span class="deload-icon">⚠️</span>
      <div class="deload-content">
        <strong>SEMAINE DELOAD</strong>
        <p>Charges réduites à 60% - Récupération prioritaire - RPE 5-6</p>
      </div>
    `;
    
    statsSection.insertAdjacentElement('beforebegin', notice);
  }

  /**
   * Semaine suivante
   */
  nextWeek() {
    if (this.state.currentWeek < 26) {
      this.state.currentWeek++;
      this.updateWeekDisplay(this.state.currentWeek);
      this.displayRealWeekWorkouts(this.state.currentWeek);
      this.updateRealStats(this.state.currentWeek);
      this.saveUserData();
    }
  }

  /**
   * Semaine précédente
   */
  previousWeek() {
    if (this.state.currentWeek > 1) {
      this.state.currentWeek--;
      this.updateWeekDisplay(this.state.currentWeek);
      this.displayRealWeekWorkouts(this.state.currentWeek);
      this.updateRealStats(this.state.currentWeek);
      this.saveUserData();
    }
  }

  /**
   * Naviguer vers une semaine spécifique
   * @param {number} weekNumber - Numéro de semaine
   */
  goToWeek(weekNumber) {
    if (weekNumber < 1 || weekNumber > 26) {
      console.warn('⚠️ Numéro de semaine invalide:', weekNumber);
      return;
    }

    this.state.currentWeek = weekNumber;
    this.updateWeekDisplay(weekNumber);
    this.displayRealWeekWorkouts(weekNumber);
    this.updateRealStats(weekNumber);
    this.saveUserData();
    
    // Scroll vers le haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Sauvegarder les données utilisateur
   */
  saveUserData() {
    try {
      const data = {
        currentWeek: this.state.currentWeek,
        userProgress: this.state.userProgress,
        lastSaved: Date.now()
      };
      
      localStorage.setItem('hybrid_master_data', JSON.stringify(data));
      this.state.lastSaved = data.lastSaved;
      
      console.log('💾 Données sauvegardées - Semaine:', this.state.currentWeek);
    } catch (error) {
      console.error('❌ Erreur sauvegarde:', error);
    }
  }

  /**
   * Charger les données utilisateur
   */
  loadUserData() {
    try {
      const savedData = localStorage.getItem('hybrid_master_data');
      
      if (savedData) {
        const data = JSON.parse(savedData);
        this.state.currentWeek = data.currentWeek || 1;
        this.state.userProgress = data.userProgress || {};
        this.state.lastSaved = data.lastSaved;
        
        console.log('✅ Données chargées - Semaine:', this.state.currentWeek);
      }
    } catch (error) {
      console.error('❌ Erreur chargement données:', error);
    }
  }

  /**
   * Afficher une erreur
   * @param {string} message - Message d'erreur
   */
  showError(message) {
    console.error('❌ Erreur:', message);
    
    // Version simple pour l'instant
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
      <div style="background: #fee; border: 1px solid #fcc; padding: 10px; margin: 10px 0; border-radius: 4px;">
        <strong>❌ Erreur:</strong> ${message}
      </div>
    `;
    
    const main = document.querySelector('main');
    if (main) {
      main.insertBefore(errorDiv, main.firstChild);
      setTimeout(() => errorDiv.remove(), 5000);
    }
  }

  /**
   * Afficher une notification de succès
   * @param {string} message - Message de succès
   */
  showSuccess(message) {
    console.log('✅ Succès:', message);
    
    // Version simple pour l'instant
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
      <div style="background: #efe; border: 1px solid #cfc; padding: 10px; margin: 10px 0; border-radius: 4px;">
        <strong>✅ Succès:</strong> ${message}
      </div>
    `;
    
    const main = document.querySelector('main');
    if (main) {
      main.insertBefore(successDiv, main.firstChild);
      setTimeout(() => successDiv.remove(), 3000);
    }
  }

  /**
   * Valider l'application
   */
  validateApp() {
    console.log('🔍 Validation de l\'application...');
    
    try {
      // Tester l'accès aux données
      const week1 = this.programData.getWeekWorkouts(1);
      const week26 = this.programData.getWeekWorkouts(26);
      
      console.log('✅ Semaine 1:', week1 ? 'OK' : 'ERREUR');
      console.log('✅ Semaine 26:', week26 ? 'OK' : 'ERREUR');
      
      // Tester les éléments DOM
      const elements = ['prevWeek', 'nextWeek', 'weekDisplay', 'workoutDays'];
      elements.forEach(id => {
        const element = document.getElementById(id);
        console.log(`✅ Élément #${id}:`, element ? 'TROUVÉ' : 'NON TROUVÉ');
      });
      
      return true;
    } catch (error) {
      console.error('❌ Validation échouée:', error);
      return false;
    }
  }
}

// 🚀 INITIALISATION AU CHARGEMENT DE LA PAGE
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DOM chargé - Lancement Hybrid Master 51...');
  window.app = new HybridMasterApp();
  
  // Validation finale
  setTimeout(() => {
    window.app.validateApp();
  }, 1000);
});

// 🔧 UTILITAIRES GLOBAUX
window.formatWeight = (weight) => {
  return weight % 1 === 0 ? `${weight} kg` : `${weight.toFixed(1)} kg`;
};

window.formatTime = (seconds) => {
  return seconds >= 60 ? `${Math.floor(seconds / 60)} min` : `${seconds}s`;
};

// Export pour les modules (si nécessaire)
export default HybridMasterApp;
