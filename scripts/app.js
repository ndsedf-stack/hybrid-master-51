// scripts/app.js - VERSION CORRIGÉE
console.log("🚀 Hybrid Master 51 - Chargement...");

class HybridMasterApp {
  constructor() {
    console.log("🏋️ Initialisation de l'application...");
    this.currentWeek = 1;
    this.initializeApp();
  }

  initializeApp() {
    // ✅ AJOUT CRITIQUE : Attacher les événements des boutons
    this.attachButtonEvents();
    this.updateDisplay();
    console.log("✅ Application initialisée");
  }

  // ✅ MÉTHODE QUI MANQUAIT : Attacher les événements
  attachButtonEvents() {
    const prevBtn = document.getElementById('prevWeek');
    const nextBtn = document.getElementById('nextWeek');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        console.log("← Semaine précédente");
        this.previousWeek();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        console.log("→ Semaine suivante");
        this.nextWeek();
      });
    }
  }

  previousWeek() {
    if (this.currentWeek > 1) {
      this.currentWeek--;
      this.updateDisplay();
    }
  }

  nextWeek() {
    if (this.currentWeek < 26) {
      this.currentWeek++;
      this.updateDisplay();
    }
  }

  updateDisplay() {
    const weekDisplay = document.getElementById('weekDisplay');
    if (weekDisplay) {
      weekDisplay.textContent = `Semaine ${this.currentWeek}`;
    }
    
    const blockBadge = document.getElementById('blockBadge');
    if (blockBadge) {
      // Logique simplifiée pour les blocs
      const block = Math.ceil(this.currentWeek / 4);
      blockBadge.textContent = `Bloc ${block}`;
    }
  }
}

// 🚀 Démarrer l'application
document.addEventListener('DOMContentLoaded', () => {
  window.app = new HybridMasterApp();
});
