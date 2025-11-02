// ===================================================================
// HYBRID MASTER 51 - APPLICATION PRINCIPALE
// ===================================================================
// 
// Initialise et coordonne tous les modules de l'application
//
// ===================================================================

class HybridMaster51App {
  constructor() {
    this.programData = null;
    this.progressionEngine = null;
    this.currentWeek = 1;
    this.currentDay = 'dimanche';
    
    this.init();
  }

  // ============================================
  // INITIALISATION
  // ============================================
  async init() {
    try {
      console.log('🚀 Initialisation Hybrid Master 51...');
      
      // Initialiser les données
      this.programData = new ProgramData();
      this.programData.validateData();
      
      // Initialiser le moteur de progression
      this.progressionEngine = new ProgressionEngine(this.programData);
      
      // Charger les données utilisateur
      this.loadUserData();
      
      // Initialiser l'interface
      this.initializeUI();
      
      // Configurer les événements
      this.setupEventListeners();
      
      // Afficher la séance initiale
      this.updateDisplay();
      
      console.log('✅ Application initialisée avec succès !');
      
    } catch (error) {
      console.error('❌ Erreur initialisation:', error);
      alert('Erreur lors du chargement de l\'application. Veuillez rafraîchir la page.');
    }
  }

  // ============================================
  // INITIALISATION UI
  // ============================================
  initializeUI() {
    // Mettre à jour l'affichage de la semaine
    this.updateWeekDisplay();
    
    // Charger les données sauvegardées
    const savedWeek = localStorage.getItem('hm51-current-week');
    if (savedWeek) {
      this.currentWeek = parseInt(savedWeek);
      this.updateWeekDisplay();
    }
  }

  // ============================================
  // ÉVÉNEMENTS
  // ============================================
  setupEventListeners() {
    // Navigation semaine
    document.getElementById('prevWeek').addEventListener('click', () => {
      if (this.currentWeek > 1) {
        this.currentWeek--;
        this.updateDisplay();
      }
    });

    document.getElementById('nextWeek').addEventListener('click', () => {
      if (this.currentWeek < 26) {
        this.currentWeek++;
        this.updateDisplay();
      }
    });

    // Navigation jours
    document.querySelectorAll('.day-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.day-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentDay = tab.dataset.day;
        this.updateDisplay();
      });
    });

    // Boutons footer
    document.getElementById('startWorkoutBtn').addEventListener('click', () => {
      this.startWorkout();
    });

    document.getElementById('statsBtn').addEventListener('click', () => {
      this.showStatistics();
    });

    document.getElementById('settingsBtn').addEventListener('click', () => {
      this.showSettings();
    });
  }

  // ============================================
  // MISE À JOUR AFFICHAGE
  // ============================================
  updateDisplay() {
    this.updateWeekDisplay();
    this.updateBlockDisplay();
    this.updateInfoCard();
    this.renderWorkout();
    this.renderWarmup();
    this.saveState();
  }

  updateWeekDisplay() {
    const weekLabel = document.getElementById('currentWeekLabel');
    weekLabel.textContent = `Semaine ${this.currentWeek}`;
    
    // Activer/désactiver boutons navigation
    const prevBtn = document.getElementById('prevWeek');
    const nextBtn = document.getElementById('nextWeek');
    prevBtn.disabled = this.currentWeek === 1;
    nextBtn.disabled = this.currentWeek === 26;
    
    // Indicateur deload
    const isDeload = this.progressionEngine.isDeloadWeek(this.currentWeek);
    if (isDeload) {
      weekLabel.style.color = 'var(--color-warning)';
    } else {
      weekLabel.style.color = 'var(--color-text-primary)';
    }
  }

  updateBlockDisplay() {
    const block = this.progressionEngine.getBlock(this.currentWeek);
    const blockLabel = document.getElementById('blockLabel');
    
    if (block) {
      blockLabel.textContent = `Bloc ${block.number}: ${block.name}`;
      blockLabel.style.display = 'block';
    } else {
      blockLabel.textContent = 'Deload';
      blockLabel.style.background = 'var(--color-warning)';
      blockLabel.style.display = 'block';
    }
  }

  updateInfoCard() {
    const infoCard = document.getElementById('infoCard');
    const block = this.progressionEngine.getBlock(this.currentWeek);
    const isDeload = this.progressionEngine.isDeloadWeek(this.currentWeek);
    
    if (isDeload) {
      infoCard.innerHTML = `
        <div style="text-align: center;">
          <div style="font-size: var(--text-2xl); font-weight: var(--font-weight-bold); margin-bottom: var(--space-2); color: var(--color-warning);">
            ⚠️ SEMAINE DELOAD ${this.currentWeek}
          </div>
          <div style="font-size: var(--text-base); color: var(--color-text-secondary);">
            • Charges réduites à 60% (-40%)<br>
            • Tempo ralenti: 4-1-2<br>
            • RPE 5-6 (très facile)<br>
            • AUCUNE technique d'intensification<br>
            • Focus: récupération et technique parfaite
          </div>
        </div>
      `;
      infoCard.style.background = 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(239, 68, 68, 0.1))';
      infoCard.style.borderColor = 'var(--color-warning)';
    } else if (block) {
      infoCard.innerHTML = `
        <div style="text-align: center;">
          <div style="font-size: var(--text-2xl); font-weight: var(--font-weight-bold); margin-bottom: var(--space-2);">
            📋 Bloc ${block.number} - ${block.name}
          </div>
          <div style="font-size: var(--text-base); color: var(--color-text-secondary); margin-bottom: var(--space-3);">
            ${block.description}
          </div>
          <div style="display: flex; justify-content: center; gap: var(--space-4); font-size: var(--text-sm);">
            <span><strong>Tempo:</strong> ${block.tempo}</span>
            <span><strong>RPE:</strong> ${block.rpe}</span>
          </div>
          <div style="margin-top: var(--space-3); font-size: var(--text-sm); color: var(--color-text-muted);">
            <strong>Techniques:</strong> ${block.techniques.join(', ')}
          </div>
        </div>
      `;
      infoCard.style.background = 'linear-gradient(135deg, rgba(0, 212, 170, 0.1), rgba(0, 180, 148, 0.05))';
      infoCard.style.borderColor = 'var(--color-primary)';
    }
  }

  // ============================================
  // RENDU SÉANCE
  // ============================================
  renderWorkout() {
    const workout = this.programData.getWorkout(this.currentDay);
    const container = document.getElementById('workoutSection');
    
    if (!workout) {
      container.innerHTML = '<p style="text-align: center; padding: var(--space-8);">Aucune séance pour ce jour</p>';
      return;
    }
    
    let html = `
      <div style="margin-bottom: var(--space-6);">
        <h2 style="font-size: var(--text-2xl); font-weight: var(--font-weight-bold); margin-bottom: var(--space-2);">
          ${workout.title}
        </h2>
        <div style="display: flex; gap: var(--space-4); font-size: var(--text-sm); color: var(--color-text-muted);">
          <span>⏱️ ${workout.duration} minutes</span>
          <span>📊 ${workout.totalSets} séries</span>
          <span>💪 ${workout.muscles.length} groupes musculaires</span>
        </div>
      </div>
    `;
    
    // Grouper les supersets
    let inSuperset = false;
    let supersetGroup = [];
    
    workout.exercises.forEach((exercise, index) => {
      // Gérer la rotation biceps
      let exerciseName = exercise.name;
      if (exerciseName === 'BICEPS_ROTATION') {
        const bicepsEx = this.progressionEngine.getBicepsExercise(this.currentWeek);
        exerciseName = bicepsEx.exercise;
      }
      
      const weight = this.progressionEngine.calculateWeight(exercise, this.currentWeek);
      const techniques = this.progressionEngine.getTechniques(this.currentWeek, exerciseName);
      const progression = this.progressionEngine.calculateProgression(exercise, this.currentWeek);
      
      if (exercise.superset) {
        if (!inSuperset) {
          inSuperset = true;
          html += '<div class="exercise-card superset">';
          html += '<div class="superset-label">🔗 SUPERSET</div>';
        }
        
        html += this.renderExercise(exerciseName, exercise, weight, techniques, progression);
        
        const nextEx = workout.exercises[index + 1];
        if (!nextEx || !nextEx.superset) {
          html += '</div>';
          inSuperset = false;
        } else {
          html += '<div style="text-align: center; margin: var(--space-3) 0; color: var(--superset-color); font-weight: var(--font-weight-bold);">↕️ ALTERNER AVEC ↕️</div>';
        }
      } else {
        html += '<div class="exercise-card">';
        html += this.renderExercise(exerciseName, exercise, weight, techniques, progression);
        html += '</div>';
      }
    });
    
    container.innerHTML = html;
  }

  renderExercise(name, exercise, weight, techniques, progression) {
    let html = `
      <div class="exercise-name">${name}</div>
      <div class="exercise-params">
        <span class="param sets">📊 ${exercise.sets} séries</span>
        <span class="param">🔢 ${exercise.reps} reps</span>
        <span class="param weight">⚖️ ${weight}kg</span>
        <span class="param rest">⏱️ ${exercise.rest}s repos</span>
      </div>
    `;
    
    if (techniques && techniques.length > 0) {
      html += '<div style="margin-top: var(--space-3);">';
      techniques.forEach(tech => {
        html += `<div class="technique-badge">${tech}</div>`;
      });
      html += '</div>';
    }
    
    if (exercise.notes) {
      html += `<div style="margin-top: var(--space-3); font-size: var(--text-sm); color: var(--color-text-muted);">
        📝 ${exercise.notes}
      </div>`;
    }
    
    html += `
      <div class="progression-info">
        💹 <strong>Progression:</strong> +${exercise.increment}kg / ${exercise.frequency} sem | 
        <strong>Départ:</strong> ${exercise.startWeight}kg | 
        <strong>Objectif:</strong> ${exercise.targetWeight}kg | 
        <strong>Progrès:</strong> ${progression.progress.toFixed(0)}%
      </div>
    `;
    
    return html;
  }

  // ============================================
  // ÉCHAUFFEMENT
  // ============================================
  renderWarmup() {
    const container = document.getElementById('warmupSection');
    container.innerHTML = `
      <h3 style="font-size: var(--text-xl); font-weight: var(--font-weight-bold); margin-bottom: var(--space-4);">
        🔥 Protocole d'Échauffement (15 min)
      </h3>
      <div style="display: grid; gap: var(--space-4);">
        <div style="background: var(--color-bg-card); padding: var(--space-4); border-radius: var(--radius-lg); border-left: 4px solid var(--color-primary);">
          <h4 style="font-weight: var(--font-weight-bold); margin-bottom: var(--space-2);">Phase 1 : Cardio Léger (5 min)</h4>
          <p style="color: var(--color-text-secondary);">🚴 Vélo/Rameur/Tapis • 💓 60-70% FC max</p>
        </div>
        <div style="background: var(--color-bg-card); padding: var(--space-4); border-radius: var(--radius-lg); border-left: 4px solid var(--color-primary);">
          <h4 style="font-weight: var(--font-weight-bold); margin-bottom: var(--space-2);">Phase 2 : Mobilité Articulaire (5 min)</h4>
          <ul style="color: var(--color-text-secondary); line-height: 1.8;">
            <li>• Rotations épaules: 2×10 avant/arrière</li>
            <li>• Cat-Cow (dos): 2×10</li>
            <li>• Leg Swings (hanches): 2×10 chaque jambe</li>
            <li>• Rotations poignets/chevilles: 2×10</li>
            <li>• Dislocations épaules (bâton): 2×10</li>
          </ul>
        </div>
        <div style="background: var(--color-bg-card); padding: var(--space-4); border-radius: var(--radius-lg); border-left: 4px solid var(--color-primary);">
          <h4 style="font-weight: var(--font-weight-bold); margin-bottom: var(--space-2);">Phase 3 : Échauffement Spécifique (5 min)</h4>
          <p style="color: var(--color-text-secondary); margin-bottom: var(--space-2);">Exemple Trap Bar Deadlift (100kg):</p>
          <ul style="color: var(--color-text-secondary); line-height: 1.8;">
            <li>• Barre vide × 10 reps</li>
            <li>• 40kg × 8 reps</li>
            <li>• 60kg × 5 reps</li>
            <li>• 80kg × 3 reps</li>
            <li>• 90kg × 1 rep</li>
            <li style="font-weight: var(--font-weight-bold);">→ 100kg × 6-8 reps (série travail)</li>
          </ul>
        </div>
      </div>
    `;
  }

  // ============================================
  // DÉMARRAGE SÉANCE
  // ============================================
  startWorkout() {
    alert('💪 Mode séance à venir !\n\nFonctionnalité en développement:\n- Timer automatique\n- Suivi des séries\n- Repos chronométrés\n- Sauvegarde progression');
  }

  // ============================================
  // STATISTIQUES
  // ============================================
  showStatistics() {
    const volumeData = this.progressionEngine.calculateWeeklyVolume(this.currentWeek);
    
    let html = `
      <h3 style="font-size: var(--text-xl); font-weight: var(--font-weight-bold); margin-bottom: var(--space-4);">
        📊 Volume Hebdomadaire - Semaine ${this.currentWeek}
      </h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-4); margin-bottom: var(--space-6);">
        <div style="background: var(--color-bg-card); padding: var(--space-4); border-radius: var(--radius-lg); text-align: center;">
          <div style="font-size: var(--text-3xl); font-weight: var(--font-weight-black); color: var(--color-primary);">${volumeData.totalTonnage}t</div>
          <div style="font-size: var(--text-sm); color: var(--color-text-muted);">Volume total</div>
        </div>
      </div>
      <div style="display: grid; gap: var(--space-3);">
    `;
    
    Object.entries(volumeData.byMuscle)
      .sort((a, b) => (b[1].direct + b[1].indirect) - (a[1].direct + a[1].indirect))
      .forEach(([muscle, vol]) => {
        const total = Math.round(vol.direct + vol.indirect);
        html += `
          <div style="background: var(--color-bg-card); padding: var(--space-3); border-radius: var(--radius-lg); border-left: 4px solid var(--color-primary);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: var(--font-weight-bold);">${muscle}</span>
              <span style="font-size: var(--text-xl); font-weight: var(--font-weight-bold); color: var(--color-primary);">${total} séries</span>
            </div>
            <div style="font-size: var(--text-sm); color: var(--color-text-muted); margin-top: var(--space-1);">
              Direct: ${Math.round(vol.direct)} | Indirect: ${Math.round(vol.indirect)}
            </div>
          </div>
        `;
      });
    
    html += '</div>';
    
    document.getElementById('statsSection').innerHTML = html;
    document.getElementById('statsSection').classList.remove('hidden');
  }

  // ============================================
  // PARAMÈTRES
  // ============================================
  showSettings() {
    alert('⚙️ Paramètres à venir !\n\nFonctionnalités prévues:\n- Export/Import données\n- Thème clair/sombre\n- Notifications\n- Préférences unités');
  }

  // ============================================
  // SAUVEGARDE/CHARGEMENT
  // ============================================
  loadUserData() {
    try {
      const savedWeek = localStorage.getItem('hm51-current-week');
      if (savedWeek) {
        this.currentWeek = parseInt(savedWeek);
      }
      
      const savedDay = localStorage.getItem('hm51-current-day');
      if (savedDay) {
        this.currentDay = savedDay;
        // Activer le bon onglet
        document.querySelectorAll('.day-tab').forEach(tab => {
          tab.classList.toggle('active', tab.dataset.day === savedDay);
        });
      }
    } catch (error) {
      console.log('Pas de données sauvegardées');
    }
  }

  saveState() {
    try {
      localStorage.setItem('hm51-current-week', this.currentWeek.toString());
      localStorage.setItem('hm51-current-day', this.currentDay);
      
      const now = new Date();
      document.getElementById('lastSaveTime').textContent = `Sauvegardé: ${now.toLocaleTimeString('fr-FR')}`;
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
    }
  }
}

// ============================================
// INITIALISATION AU CHARGEMENT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  console.log('📦 Chargement Hybrid Master 51...');
  window.app = new HybridMaster51App();
});

// Export global
window.HybridMaster51App = HybridMaster51App;
