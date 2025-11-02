// ===================================================================
// HYBRID MASTER 51 - APPLICATION PRINCIPALE FONCTIONNELLE
// ===================================================================

import { PROGRAM_DATA, getBlockForWeek, isDeloadWeek, getBicepsExercise } from './core/program-data.js';

class HybridMasterApp {
  constructor() {
    this.currentWeek = 1;
    this.init();
  }

  init() {
    console.log('🚀 Initialisation Hybrid Master 51...');
    this.renderWeekSelector();
    this.renderWorkouts();
    this.attachEventListeners();
    console.log('✅ Application prête !');
  }

  /**
   * Rend le sélecteur de semaines
   */
  renderWeekSelector() {
    const container = document.getElementById('week-selector');
    if (!container) return;

    let html = '<div class="week-buttons">';
    
    for (let week = 1; week <= PROGRAM_DATA.totalWeeks; week++) {
      const isActive = week === this.currentWeek;
      const isDeload = isDeloadWeek(week);
      const classes = `week-btn ${isActive ? 'active' : ''} ${isDeload ? 'deload' : ''}`;
      
      html += `
        <button class="${classes}" data-week="${week}">
          S${week}
        </button>
      `;
    }
    
    html += '</div>';
    
    // Ajouter info bloc
    const block = getBlockForWeek(this.currentWeek);
    if (block) {
      html += `
        <div class="block-info">
          <span class="block-badge">
            ${block.name}
          </span>
          <div style="margin-top: 10px; color: #94a3b8; font-size: 0.9rem;">
            Technique : ${block.technique} • ${block.focus}
          </div>
        </div>
      `;
    }
    
    container.innerHTML = html;
  }

  /**
   * Rend les séances de la semaine
   */
  renderWorkouts() {
    const container = document.getElementById('workouts-container');
    if (!container) return;

    const workouts = PROGRAM_DATA.weeklySchedule;
    let html = '';

    Object.entries(workouts).forEach(([day, workout]) => {
      html += this.renderWorkoutCard(day, workout);
    });

    container.innerHTML = html;
  }

  /**
   * Rend une carte de séance
   */
  renderWorkoutCard(day, workout) {
    const dayIcons = {
      dimanche: '🏋️',
      mardi: '💪',
      jeudi: '🔥',
      maison: '🏠'
    };

    const dayNames = {
      dimanche: 'Dimanche',
      mardi: 'Mardi',
      jeudi: 'Jeudi',
      maison: 'Maison'
    };

    let html = `
      <div class="workout-card" data-day="${day}">
        <div class="workout-header">
          <h3 class="workout-day">
            <span class="workout-icon">${dayIcons[day]}</span>
            ${dayNames[day]}
          </h3>
          <div class="workout-duration">
            <span>⏱️</span>
            <span>${workout.duration}</span>
          </div>
        </div>
    `;

    // Échauffement (sauf maison)
    if (day !== 'maison') {
      html += `
        <div class="alert alert-info">
          <span class="alert-icon">🔥</span>
          <div class="alert-content">
            <div class="alert-title">Échauffement</div>
            <ul style="margin: 0.5rem 0 0 1.5rem; font-size: 0.85rem;">
              <li>5-10min cardio léger</li>
              <li>Mobilité articulaire</li>
              <li>2 séries échauffement/exercice</li>
            </ul>
          </div>
        </div>
      `;
    }

    // Exercices
    html += '<ul class="exercise-list">';
    
    workout.exercises.forEach((exercise, index) => {
      html += this.renderExercise(exercise, index);
    });
    
    html += '</ul></div>';

    return html;
  }

  /**
   * Rend un exercice
   */
  renderExercise(exercise, index) {
    const weight = this.calculateWeight(exercise);
    const isDeload = isDeloadWeek(this.currentWeek);
    
    // Gestion rotation biceps
    let exerciseName = exercise.name;
    if (exercise.rotation && exercise.name === 'Biceps Rotation') {
      exerciseName = getBicepsExercise(this.currentWeek);
    }

    let html = `
      <li class="exercise-item ${exercise.superset ? 'superset' : ''}" data-index="${index}">
        <div class="exercise-name">${exerciseName}</div>
        <div class="exercise-details">
    `;

    // Sets
    html += `
      <span class="detail-badge">
        <span>📊</span>
        <span>${exercise.sets} séries</span>
      </span>
    `;

    // Reps
    html += `
      <span class="detail-badge">
        <span>🔢</span>
        <span>${exercise.reps}</span>
      </span>
    `;

    // Poids
    if (weight) {
      html += `
        <span class="detail-badge">
          <span>💪</span>
          <span>${weight}</span>
        </span>
      `;
    }

    // Repos
    if (exercise.rest) {
      html += `
        <span class="detail-badge">
          <span>⏱️</span>
          <span>${exercise.rest}</span>
        </span>
      `;
    }

    html += '</div>';

    // Technique ou note
    if (isDeload) {
      html += `
        <div class="technique-badge" style="background: rgba(251, 191, 36, 0.2); color: #fbbf24;">
          DELOAD WEEK (-40%)
        </div>
      `;
    } else if (exercise.technique) {
      html += `
        <div class="technique-badge">
          ${exercise.technique}
        </div>
      `;
    }

    if (exercise.note) {
      html += `
        <div style="margin-top: 8px; font-size: 0.85rem; color: #94a3b8; font-style: italic;">
          ℹ️ ${exercise.note}
        </div>
      `;
    }

    html += '</li>';

    return html;
  }

  /**
   * Calcule le poids pour la semaine actuelle
   */
  calculateWeight(exercise) {
    if (exercise.startWeight === 'Poids du corps') {
      return 'Poids du corps';
    }

    const block = getBlockForWeek(this.currentWeek);
    if (!block) return `${exercise.startWeight}kg`;

    // Calculer le nombre de cycles de progression
    const weekInBlock = this.currentWeek - block.weeks[0];
    const cycles = Math.floor(weekInBlock / exercise.progressionFrequency);
    
    // Calculer le poids
    let weight = exercise.startWeight + (cycles * exercise.increment);

    // Appliquer deload si nécessaire
    if (isDeloadWeek(this.currentWeek)) {
      weight = weight * (1 - PROGRAM_DATA.deloadReduction);
    }

    return `${weight.toFixed(1)}kg`;
  }

  /**
   * Attache les event listeners
   */
  attachEventListeners() {
    // Boutons de semaine
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('week-btn')) {
        const week = parseInt(e.target.dataset.week);
        this.selectWeek(week);
      }
    });

    // Bouton démarrer séance
    const startBtn = document.getElementById('start-workout-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        alert('🚀 Mode séance à venir ! Fonctionnalité en développement.');
      });
    }

    // Bouton statistiques
    const statsBtn = document.getElementById('stats-btn');
    if (statsBtn) {
      statsBtn.addEventListener('click', () => {
        this.showStatistics();
      });
    }

    // Bouton paramètres
    const settingsBtn = document.getElementById('settings-btn');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => {
        alert('⚙️ Paramètres à venir !');
      });
    }
  }

  /**
   * Sélectionne une semaine
   */
  selectWeek(weekNumber) {
    this.currentWeek = weekNumber;
    this.renderWeekSelector();
    this.renderWorkouts();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Affiche les statistiques
   */
  showStatistics() {
    const stats = this.calculateStatistics();
    
    let html = `
      <div style="background: rgba(15, 23, 42, 0.95); padding: 20px; border-radius: 15px; max-width: 500px; margin: 20px auto;">
        <h3 style="color: #00d4aa; margin-bottom: 20px;">📊 Statistiques Semaine ${this.currentWeek}</h3>
    `;

    Object.entries(stats).forEach(([muscle, sets]) => {
      const percentage = (sets / stats.total) * 100;
      html += `
        <div style="margin-bottom: 15px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <span style="color: #e2e8f0; font-weight: 600;">${muscle}</span>
            <span style="color: #00d4aa;">${sets} séries</span>
          </div>
          <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
            <div style="width: ${percentage}%; height: 100%; background: linear-gradient(90deg, #00d4aa, #3b82f6);"></div>
          </div>
        </div>
      `;
    });

    html += '</div>';

    alert('Statistiques calculées ! Voir console pour plus de détails.');
    console.log('📊 Statistiques:', stats);
  }

  /**
   * Calcule les statistiques de volume
   */
  calculateStatistics() {
    const stats = {};
    let total = 0;

    Object.values(PROGRAM_DATA.weeklySchedule).forEach(workout => {
      workout.exercises.forEach(exercise => {
        exercise.muscles.forEach(muscle => {
          if (!stats[muscle]) stats[muscle] = 0;
          stats[muscle] += exercise.sets;
          total += exercise.sets;
        });
      });
    });

    stats.total = total;
    return stats;
  }
}

// Initialiser l'application au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
  window.app = new HybridMasterApp();
});

export default HybridMasterApp;
