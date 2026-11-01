/* ==========================================================================
   TASKBAR, START MENU & SYSTEM TRAY
   The Abandoned Computer - Gandhi Hackathon Edition
   ========================================================================== */

class TaskbarManager {
  constructor() {
    this.startBtn = null;
    this.startMenu = null;
    this.clockEl = null;
    this.isStartOpen = false;
  }

  init() {
    this.startBtn = document.getElementById('start-button');
    this.startMenu = document.getElementById('start-menu');
    this.clockEl = document.getElementById('tray-clock');

    this.setupClock();
    this.setupStartMenu();
    this.setupTrayControls();
  }

  setupClock() {
    const updateTime = () => {
      const d = new Date();
      let hours = d.getHours();
      const mins = d.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      this.clockEl.textContent = `${hours}:${mins} ${ampm}`;
    };
    updateTime();
    setInterval(updateTime, 1000);

    this.clockEl.addEventListener('dblclick', () => {
      window.win98Audio.playClick();
      window.appLauncher.openDateTimeProperties();
    });
  }

  setupStartMenu() {
    this.startBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.win98Audio.playClick();
      this.toggleStartMenu();
    });

    document.addEventListener('click', (e) => {
      if (this.isStartOpen && !this.startMenu.contains(e.target) && e.target !== this.startBtn) {
        this.closeStartMenu();
      }
    });

    // Start Menu Item Clicks
    const bindStartItem = (id, action) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', () => {
          this.closeStartMenu();
          window.win98Audio.playClick();
          action();
        });
      }
    };

    bindStartItem('sm-notepad', () => window.appLauncher.openNotepad());
    bindStartItem('sm-paint', () => window.appLauncher.openPaint());
    bindStartItem('sm-wordpad', () => window.appLauncher.openWordPad());
    bindStartItem('sm-calc', () => window.appLauncher.openCalculator());
    bindStartItem('sm-cmd', () => window.appLauncher.openDOS());
    bindStartItem('sm-ie', () => window.appLauncher.openIE());
    bindStartItem('sm-winamp', () => window.appLauncher.openWinamp());
    bindStartItem('sm-minesweeper', () => window.appLauncher.openMinesweeper());
    bindStartItem('sm-solitaire', () => window.appLauncher.openSolitaire());
    bindStartItem('sm-doom', () => window.appLauncher.openRaycaster());
    bindStartItem('sm-pinball', () => window.appLauncher.openPinball());
    bindStartItem('sm-run', () => window.appLauncher.openRunDialog());
    bindStartItem('sm-shutdown', () => window.appLauncher.openShutdownDialog());
    bindStartItem('sm-help', () => window.appLauncher.openHelpDialog());
  }

  toggleStartMenu() {
    this.isStartOpen = !this.isStartOpen;
    this.startMenu.style.display = this.isStartOpen ? 'block' : 'none';
    this.startBtn.classList.toggle('active', this.isStartOpen);
  }

  closeStartMenu() {
    this.isStartOpen = false;
    this.startMenu.style.display = 'none';
    this.startBtn.classList.remove('active');
  }

  setupTrayControls() {
    // Volume Control Click
    const volIcon = document.getElementById('tray-volume');
    volIcon.addEventListener('click', () => {
      window.win98Audio.playAsterisk();
      window.appLauncher.openVolumeControl();
    });

    // CRT Shader Toggle
    const crtIcon = document.getElementById('tray-crt');
    const crtOverlay = document.getElementById('crt-overlay');
    crtIcon.addEventListener('click', () => {
      crtOverlay.classList.toggle('active');
      window.win98Audio.playClick();
    });
  }
}

window.taskbarManager = new TaskbarManager();
