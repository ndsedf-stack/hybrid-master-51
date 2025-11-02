/**
 * NAVIGATION UI - Interface de navigation entre les semaines
 * Gère les boutons, le calendrier, les raccourcis
 * Version: 1.0
 */

export class NavigationUI {
  constructor(currentWeek = 1) {
    this.currentWeek = currentWeek;
    this.totalWeeks = 26;
    this.callbacks = {
      onWeekChange: null
    };
    
    this.init();
  }

  /**
   * Initialise l'interface de navigation
   */
  init() {
    this.createNavigationBar();
    this.attachEventListeners();
    this.updateDisplay();
  }

  /**
   * Crée la barre de navigation
   */
  createNavigationBar() {
    const navContainer = document.getElementById('weekNavigation');
    if (!navContainer) {
      console.warn('Container #weekNavigation non trouvé');
      return;
    }

    navContainer.innerHTML = `
      <div class="week-navigation">
        <button class="btn-nav btn-prev" id="prevWeek" aria-label="Semaine précédente">
          ← Précédente
        </button>
        
        <div class="week-display">
          <span class="current-week" id="weekDisplay">Semaine 1</span>
          <span class="week-info" id="weekInfo">Bloc 1 : Fondations</span>
        </div>
        
        <button class="btn-nav btn-next" id="nextWeek" aria-label="Semaine suivante">
          Suivante →
        </button>
      </div>

      <div class="week-quick-select">
        <button class="btn-quick-nav" id="jumpToWeek">
          📅 Aller à la semaine...
        </button>
        <button class="btn-quick-nav" id="showCalendar">
          📊 Vue calendrier
        </button>
      </div>
    `;
  }

  /**
   * Attache les écouteurs d'événements
   */
  attachEventListeners() {
    // Navigation précédente
    document.getElementById('prevWeek')?.addEventListener('click', () => {
      this.previousWeek();
    });

    // Navigation suivante
    document.getElementById('nextWeek')?.addEventListener('click', () => {
      this.nextWeek();
    });

    // Saut rapide
    document.getElementById('jumpToWeek')?.addEventListener('click', () => {
      this.showWeekSelector();
    });

    // Calendrier
    document.getElementById('showCalendar')?.addEventListener('click', () => {
      this.showCalendarView();
    });

    // Raccourcis clavier
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' && !this.isInputFocused()) {
        this.previousWeek();
      }
      if (e.key === 'ArrowRight' && !this.isInputFocused()) {
        this.nextWeek();
      }
    });
  }

  /**
   * Passe à la semaine précédente
   */
  previousWeek() {
    if (this.currentWeek > 1) {
      this.setWeek(this.currentWeek - 1);
    }
  }

  /**
   * Passe à la semaine suivante
   */
  nextWeek() {
    if (this.currentWeek < this.totalWeeks) {
      this.setWeek(this.currentWeek + 1);
    }
  }

  /**
   * Définit la semaine active
   */
  setWeek(weekNumber) {
    if (weekNumber < 1 || weekNumber > this.totalWeeks) {
      console.warn(`Semaine ${weekNumber} hors limites (1-${this.totalWeeks})`);
      return;
    }

    this.currentWeek = weekNumber;
    this.updateDisplay();
    
    if (this.callbacks.onWeekChange) {
      this.callbacks.onWeekChange(this.currentWeek);
    }
  }

  /**
   * Met à jour l'affichage de la navigation
   */
  updateDisplay() {
    // Affichage du numéro de semaine
    const weekDisplay = document.getElementById('weekDisplay');
    if (weekDisplay) {
      weekDisplay.textContent = `Semaine ${this.currentWeek}`;
    }

    // Affichage du bloc et technique
    const weekInfo = document.getElementById('weekInfo');
    if (weekInfo) {
      const blockInfo = this.getBlockInfo(this.currentWeek);
      weekInfo.textContent = `${blockInfo.name} - ${blockInfo.technique}`;
    }

    // Désactivation des boutons
    const prevBtn = document.getElementById('prevWeek');
    const nextBtn = document.getElementById('nextWeek');
    
    if (prevBtn) {
      prevBtn.disabled = this.currentWeek === 1;
    }
    if (nextBtn) {
      nextBtn.disabled = this.currentWeek === this.totalWeeks;
    }
  }

  /**
   * Récupère les infos du bloc pour une semaine
   */
  getBlockInfo(weekNumber) {
    if (weekNumber <= 6) {
      return { name: 'Bloc 1', technique: 'Tempo 3-1-2' };
    }
    if (weekNumber <= 12) {
      return { name: 'Bloc 2', technique: 'Rest-Pause' };
    }
    if (weekNumber <= 18) {
      return { name: 'Bloc 3', technique: 'Drop-sets' };
    }
    return { name: 'Bloc 4', technique: 'Clusters & Partials' };
  }

  /**
   * Affiche le sélecteur rapide de semaine
   */
  showWeekSelector() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content week-selector-modal">
        <h3>Sélectionner une semaine</h3>
        
        <div class="week-grid">
          ${Array.from({length: this.totalWeeks}, (_, i) => i + 1).map(week => `
            <button class="week-button ${week === this.currentWeek ? 'active' : ''}" 
                    data-week="${week}">
              ${week}
              ${this.isDeloadWeek(week) ? '<span class="deload-badge">D</span>' : ''}
            </button>
          `).join('')}
        </div>

        <button class="btn-close-modal">Fermer</button>
      </div>
    `;

    document.body.appendChild(modal);

    // Événements
    modal.querySelectorAll('.week-button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const week = parseInt(e.currentTarget.dataset.week);
        this.setWeek(week);
        modal.remove();
      });
    });

    modal.querySelector('.btn-close-modal')?.addEventListener('click', () => {
      modal.remove();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  /**
   * Affiche la vue calendrier complète
   */
  showCalendarView() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content calendar-modal">
        <h3>📅 Calendrier du Programme (26 semaines)</h3>
        
        <div class="calendar-grid">
          ${this.generateCalendar()}
        </div>

        <div class="calendar-legend">
          <span class="legend-item">
            <span class="legend-color" style="background: var(--color-primary)"></span>
            Semaine normale
          </span>
          <span class="legend-item">
            <span class="legend-color" style="background: var(--color-accent)"></span>
            Deload
          </span>
          <span class="legend-item">
            <span class="legend-color" style="background: var(--color-secondary)"></span>
            Semaine actuelle
          </span>
        </div>

        <button class="btn-close-modal">Fermer</button>
      </div>
    `;

    document.body.appendChild(modal);

    // Événements
    modal.querySelectorAll('.calendar-week').forEach(week => {
      week.addEventListener('click', (e) => {
        const weekNum = parseInt(e.currentTarget.dataset.week);
        this.setWeek(weekNum);
        modal.remove();
      });
    });

    modal.querySelector('.btn-close-modal')?.addEventListener('click', () => {
      modal.remove();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  /**
   * Génère le calendrier HTML
   */
  generateCalendar() {
    let html = '';
    
    for (let block = 1; block <= 4; block++) {
      const blockWeeks = this.getBlockWeeks(block);
      const blockInfo = this.getBlockByNumber(block);
      
      html += `
        <div class="calendar-block">
          <h4>Bloc ${block} : ${blockInfo.name}</h4>
          <div class="block-weeks">
            ${blockWeeks.map(week => `
              <div class="calendar-week ${this.getWeekClass(week)}" 
                   data-week="${week}">
                <span class="week-number">S${week}</span>
                ${this.isDeloadWeek(week) ? '<span class="deload-indicator">D</span>' : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
    
    return html;
  }

  /**
   * Retourne la classe CSS d'une semaine
   */
  getWeekClass(weekNumber) {
    if (weekNumber === this.currentWeek) return 'current';
    if (this.isDeloadWeek(weekNumber)) return 'deload';
    return 'normal';
  }

  /**
   * Retourne les semaines d'un bloc
   */
  getBlockWeeks(blockNumber) {
    const ranges = {
      1: [1, 2, 3, 4, 5, 6],
      2: [7, 8, 9, 10, 11, 12],
      3: [13, 14, 15, 16, 17, 18],
      4: [19, 20, 21, 22, 23, 24, 25, 26]
    };
    return ranges[blockNumber] || [];
  }

  /**
   * Retourne les infos d'un bloc
   */
  getBlockByNumber(blockNumber) {
    const blocks = {
      1: { name: 'Fondations', technique: 'Tempo 3-1-2' },
      2: { name: 'Intensité', technique: 'Rest-Pause' },
      3: { name: 'Volume', technique: 'Drop-sets' },
      4: { name: 'Pic', technique: 'Clusters & Partials' }
    };
    return blocks[blockNumber] || {};
  }

  /**
   * Vérifie si c'est une semaine de deload
   */
  isDeloadWeek(weekNumber) {
    return [6, 12, 18, 24, 26].includes(weekNumber);
  }

  /**
   * Vérifie si un input est focus
   */
  isInputFocused() {
    return document.activeElement?.tagName === 'INPUT' || 
           document.activeElement?.tagName === 'TEXTAREA';
  }

  /**
   * Enregistre un callback pour le changement de semaine
   */
  onWeekChange(callback) {
    this.callbacks.onWeekChange = callback;
  }

  /**
   * Récupère la semaine actuelle
   */
  getCurrentWeek() {
    return this.currentWeek;
  }

  /**
   * Sauvegarde l'état
   */
  saveState() {
    return {
      currentWeek: this.currentWeek
    };
  }

  /**
   * Restaure l'état
   */
  loadState(state) {
    if (state && state.currentWeek) {
      this.setWeek(state.currentWeek);
    }
  }
}
