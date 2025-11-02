/**
 * HYBRID MASTER 51 - APPLICATION PRINCIPALE
 * Point d'entrée et orchestration des modules
 * Version: 1.0
 */

import ProgramData from './core/program-data.js';
import { ProgressionEngine } from './modules/progression-engine.js';
import { WorkoutRenderer } from './ui/workout-renderer.js';
import { NavigationUI } from './ui/navigation-ui.js';
import { StatisticsEngine } from './modules/statistics-engine.js';
import { StatisticsUI } from './ui/statistics-ui.js';

class HybridMasterApp {
  constructor() {
    console.log('🏋️ Initialisation Hybrid Master 51...');
    
    // État de l'application
    this.state = {
      currentWeek: 1,
      currentDay: null,
      userProgress: {},
      lastSaved: null
    };

    // Initialiser les modules
    this.initializeModules();
    
    // ⭐⭐ AJOUT CRITIQUE : Attacher les événements des boutons
    this.attachButtonEvents();
    
    // Charger les données sauvegardées
    this.loadUserData();
    
    // Initialiser l'interface
    this.initializeUI();
    
    // Valider le programme
    this.validateProgram();
    
    console.log('✅ Application initialisée avec succès');
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
          this.prevWeek();
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
   * Initialiser tous les modules de l'application
   */
  initializeModules() {
    try {
      // Core - Données programme
      this.programData = new ProgramData();
      console.log('✅ ProgramData initialisé');

      // Modules - Logique métier
      this.progressionEngine = new ProgressionEngine(this.programData);
      console.log('✅ ProgressionEngine initialisé');

      this.statisticsEngine = new StatisticsEngine(this.programData);
      console.log('✅ StatisticsEngine initialisé');

      // UI - Interfaces utilisateur
      this.navigationUI = new NavigationUI(this);
      console.log('✅ NavigationUI initialisé');

      this.workoutRenderer = new WorkoutRenderer(this);
      console.log('✅ WorkoutRenderer initialisé');

      this.statisticsUI = new StatisticsUI(this.statisticsEngine);
      console.log('✅ StatisticsUI initialisé');

    } catch (error) {
      console.error('❌ Erreur initialisation modules:', error);
      this.showError('Erreur lors du chargement de l\'application');
    }
  }

  /**
   * Initialiser l'interface utilisateur
   */
  initializeUI() {
    // Afficher la semaine courante
    this.navigationUI.updateWeekDisplay(this.state.currentWeek);
    
    // Générer la grille de navigation des semaines
    this.navigationUI.renderWeekGrid();
    
    // Afficher les séances de la semaine
    this.displayWeekWorkouts(this.state.currentWeek);
    
    // Afficher les statistiques initiales
    this.updateStatistics();
  }

  /**
   * Afficher les séances d'une semaine
   * @param {number} weekNumber - Numéro de semaine (1-26)
   */
  displayWeekWorkouts(weekNumber) {
    try {
      const weekData = this.programData.getWeekWorkouts(weekNumber);
      
      // Mettre à jour l'état
      this.state.currentWeek = weekNumber;
      
      // Afficher le badge de bloc
      this.displayBlockBadge(weekData.block);
      
      // Afficher le deload si actif
      if (weekData.isDeload) {
        this.displayDeloadNotice();
      }
      
      // Rendre les séances
      this.workoutRenderer.renderWeekWorkouts(weekData);
      
      // Mettre à jour les stats overview
      this.updateWeekStats(weekData);
      
    } catch (error) {
      console.error('❌ Erreur affichage semaine:', error);
      this.showError(`Impossible d'afficher la semaine ${weekNumber}`);
    }
  }

  /**
   * Afficher le badge du bloc actuel
   * @param {object} block - Bloc d'entraînement
   */
  displayBlockBadge(block) {
    const badge = document.getElementById('blockBadge');
    if (!badge) return;

    badge.textContent = `Bloc ${block.id} : ${block.name}`;
    badge.className = 'block-badge';
    badge.classList.add(`bloc-${block.id}`);
    badge.title = `${block.technique.name} - RPE ${block.technique.rpe}`;
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
   * Mettre à jour les statistiques de la semaine
   * @param {object} weekData - Données de la semaine
   */
  updateWeekStats(weekData) {
    const totalVolume = this.calculateWeekVolume(weekData);
    const totalExercises = this.countWeekExercises(weekData);
    const estimatedTime = this.calculateWeekTime(weekData);

    // Mettre à jour l'affichage
    this.updateStatCard('totalVolume', `${totalVolume} kg`);
    this.updateStatCard('totalExercises', totalExercises);
    this.updateStatCard('estimatedTime', `${estimatedTime} min`);
  }

  /**
   * Calculer le volume total de la semaine
   * @param {object} weekData - Données de la semaine
   * @returns {number} Volume total en kg
   */
  calculateWeekVolume(weekData) {
    let totalVolume = 0;
    
    Object.values(weekData.workouts).forEach(workout => {
      if (!workout.exercises) return;
      
      workout.exercises.forEach(ex => {
        const reps = typeof ex.reps === 'string' 
          ? parseInt(ex.reps.split('-')[0]) 
          : ex.reps;
        const volume = ex.currentWeight * ex.sets * reps;
        totalVolume += volume;
      });
    });
    
    return Math.round(totalVolume);
  }

  /**
   * Compter le nombre d'exercices de la semaine
   * @param {object} weekData - Données de la semaine
   * @returns {number} Nombre total d'exercices
   */
  countWeekExercises(weekData) {
    let count = 0;
    
    Object.values(weekData.workouts).forEach(workout => {
      if (workout.exercises) {
        count += workout.exercises.length;
      }
    });
    
    return count;
  }

  /**
   * Calculer le temps total de la semaine
   * @param {object} weekData - Données de la semaine
   * @returns {number} Temps total en minutes
   */
  calculateWeekTime(weekData) {
    let totalTime = 0;
    
    Object.values(weekData.workouts).forEach(workout => {
      if (workout.duration) {
        totalTime += workout.duration;
      }
    });
    
    return totalTime;
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
   * Mettre à jour toutes les statistiques
   */
  updateStatistics() {
    if (this.statisticsUI) {
      this.statisticsUI.updateAllCharts();
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

    this.displayWeekWorkouts(weekNumber);
    this.navigationUI.updateWeekDisplay(weekNumber);
    
    // Scroll vers le haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Semaine suivante
   */
  nextWeek() {
    if (this.state.currentWeek < 26) {
      this.goToWeek(this.state.currentWeek + 1);
    }
  }

  /**
   * Semaine précédente
   */
  prevWeek() {
    if (this.state.currentWeek > 1) {
      this.goToWeek(this.state.currentWeek - 1);
    }
  }

  /**
   * Marquer une série comme complétée
   * @param {string} exerciseId - ID de l'exercice
   * @param {number} setNumber - Numéro de série
   * @param {object} data - Données de la série (poids, reps, RPE)
   */
  completeSet(exerciseId, setNumber, data) {
    const key = `${this.state.currentWeek}_${exerciseId}_${setNumber}`;
    
    if (!this.state.userProgress[this.state.currentWeek]) {
      this.state.userProgress[this.state.currentWeek] = {};
    }
    
    this.state.userProgress[this.state.currentWeek][key] = {
      ...data,
      timestamp: Date.now()
    };
    
    this.saveUserData();
    this.updateStatistics();
  }

  /**
   * Terminer une séance
   * @param {string} day - Jour de la séance
   */
  completeWorkout(day) {
    const workoutKey = `${this.state.currentWeek}_${day}`;
    
    if (!this.state.userProgress[this.state.currentWeek]) {
      this.state.userProgress[this.state.currentWeek] = {};
    }
    
    this.state.userProgress[this.state.currentWeek][workoutKey] = {
      completed: true,
      timestamp: Date.now()
    };
    
    // Si semaine complète et pas S26, proposer passage semaine suivante
    if (this.isWeekComplete() && this.state.currentWeek < 26) {
      this.showWeekCompleteModal();
    }
    
    this.saveUserData();
    this.updateStatistics();
  }

  /**
   * Vérifier si la semaine est complète
   * @returns {boolean} True si toutes les séances sont faites
   */
  isWeekComplete() {
    const weekKey = this.state.currentWeek;
    if (!this.state.userProgress[weekKey]) return false;
    
    const days = ['dimanche', 'mardi', 'vendredi'];
    return days.every(day => {
      const workoutKey = `${weekKey}_${day}`;
      return this.state.userProgress[weekKey][workoutKey]?.completed;
    });
  }

  /**
   * Afficher la modale de semaine complétée
   */
  showWeekCompleteModal() {
    const modal = document.createElement('div');
    modal.className = 'modal week-complete-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <span class="success-icon">🎉</span>
          <h2>Semaine ${this.state.currentWeek} Terminée !</h2>
        </div>
        <div class="modal-body">
          <p>Félicitations ! Vous avez terminé toutes les séances.</p>
          <p><strong>Passer à la semaine suivante ?</strong></p>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" onclick="app.closeModal()">Rester ici</button>
          <button class="btn-primary" onclick="app.goToNextWeek()">Semaine suivante →</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
  }

  /**
   * Passer à la semaine suivante depuis la modale
   */
  goToNextWeek() {
    this.closeModal();
    this.nextWeek();
  }

  /**
   * Fermer la modale active
   */
  closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.classList.remove('show');
      setTimeout(() => modal.remove(), 300);
    }
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
      
      // Mettre à jour l'affichage de la dernière sauvegarde
      this.updateLastSavedDisplay();
      
      console.log('💾 Données sauvegardées');
    } catch (error) {
      console.error('❌ Erreur sauvegarde:', error);
      this.showError('Impossible de sauvegarder les données');
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
        
        console.log('✅ Données chargées');
        this.updateLastSavedDisplay();
      }
    } catch (error) {
      console.error('❌ Erreur chargement:', error);
      this.showError('Impossible de charger les données sauvegardées');
    }
  }

  /**
   * Mettre à jour l'affichage de la dernière sauvegarde
   */
  updateLastSavedDisplay() {
    const element = document.getElementById('lastSaved');
    if (!element || !this.state.lastSaved) return;
    
    const date = new Date(this.state.lastSaved);
    const timeStr = date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    element.textContent = `Dernière sauvegarde : ${timeStr}`;
  }

  /**
   * Réinitialiser l'application
   */
  resetApp() {
    if (!confirm('⚠️ ATTENTION : Cette action supprimera toutes vos données de progression. Continuer ?')) {
      return;
    }
    
    localStorage.removeItem('hybrid_master_data');
    this.state = {
      currentWeek: 1,
      currentDay: null,
      userProgress: {},
      lastSaved: null
    };
    
    this.goToWeek(1);
    this.updateStatistics();
    
    alert('✅ Application réinitialisée');
  }

  /**
   * Exporter les données
   */
  exportData() {
    const data = {
      exportDate: new Date().toISOString(),
      currentWeek: this.state.currentWeek,
      userProgress: this.state.userProgress,
      programVersion: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { 
      type: 'application/json' 
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hybrid_master_51_backup_${Date.now()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    console.log('📤 Données exportées');
  }

  /**
   * Importer les données
   * @param {File} file - Fichier JSON à importer
   */
  importData(file) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        // Valider les données
        if (!data.userProgress || !data.currentWeek) {
          throw new Error('Format de fichier invalide');
        }
        
        // Confirmer l'importation
        if (!confirm('⚠️ Cette action écrasera vos données actuelles. Continuer ?')) {
          return;
        }
        
        // Importer les données
        this.state.currentWeek = data.currentWeek;
        this.state.userProgress = data.userProgress;
        
        this.saveUserData();
        this.goToWeek(data.currentWeek);
        this.updateStatistics();
        
        alert('✅ Données importées avec succès');
        console.log('📥 Données importées');
        
      } catch (error) {
        console.error('❌ Erreur import:', error);
        this.showError('Fichier invalide ou corrompu');
      }
    };
    
    reader.readAsText(file);
  }

  /**
   * Valider le programme
   */
  validateProgram() {
    const validation = this.programData.validateProgram();
    
    if (!validation.valid) {
      console.error('❌ Programme invalide:', validation.errors);
      this.showError('Le programme contient des erreurs');
      return false;
    }
    
    if (validation.warnings.length > 0) {
      console.warn('⚠️ Avertissements:', validation.warnings);
    }
    
    console.log('✅ Programme validé:', validation.stats);
    return true;
  }

  /**
   * Afficher une erreur
   * @param {string} message - Message d'erreur
   */
  showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-toast';
    errorDiv.innerHTML = `
      <span class="error-icon">❌</span>
      <span class="error-message">${message}</span>
    `;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
      errorDiv.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      errorDiv.classList.remove('show');
      setTimeout(() => errorDiv.remove(), 300);
    }, 5000);
  }

  /**
   * Afficher une notification de succès
   * @param {string} message - Message de succès
   */
  showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-toast';
    successDiv.innerHTML = `
      <span class="success-icon">✅</span>
      <span class="success-message">${message}</span>
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
      successDiv.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      successDiv.classList.remove('show');
      setTimeout(() => successDiv.remove(), 300);
    }, 3000);
  }
}

// 🚀 INITIALISATION AU CHARGEMENT DE LA PAGE
document.addEventListener('DOMContentLoaded', () => {
  window.app = new HybridMasterApp();
});

// 🔧 UTILITAIRES GLOBAUX
window.formatWeight = (weight) => {
  return weight % 1 === 0 ? `${weight} kg` : `${weight.toFixed(1)} kg`;
};

window.formatTime = (seconds) => {
  return seconds >= 60 ? `${Math.floor(seconds / 60)} min` : `${seconds}s`;
};

export default HybridMasterApp;
