/* ==========================================================================
   BLUE SCREEN OF DEATH (BSOD) & BOOT CONTROLLER
   The Abandoned Computer - Gandhi Hackathon Edition
   ========================================================================== */

class BSODController {
  constructor() {
    this.bsodEl = null;
    this.bootEl = null;
    this.splashEl = null;
  }

  init() {
    this.bsodEl = document.getElementById('bsod');
    this.bootEl = document.getElementById('boot-screen');
    this.splashEl = document.getElementById('win98-splash');

    // Click on BSOD restarts
    this.bsodEl.addEventListener('click', () => this.reboot());
    window.addEventListener('keydown', (e) => {
      if (this.bsodEl.style.display === 'flex') {
        this.reboot();
      }
    });

    // Run initial boot sequence
    this.runInitialBoot();
  }

  triggerBSOD() {
    window.win98Audio.playChordError();
    this.bsodEl.style.display = 'flex';
  }

  reboot() {
    this.bsodEl.style.display = 'none';
    this.runInitialBoot();
  }

  runInitialBoot() {
    this.bootEl.style.display = 'flex';
    this.splashEl.style.display = 'none';

    // BIOS text simulation (Hilarious Hackathon Edition)
    const biosLines = [
      "Award Modular BIOS v4.51PG - Cursed IIT Bhilai Edition",
      "CPU: Intel Celeron 12MHz (Underclocked for maximum judge suffering)",
      "RAM Check: 640KB OK (Enough for anyone, Bill Gates said so)",
      "WARNING: Suspicious judge breathing detected near monitor.",
      "Detecting Primary HDD ... QUANTUM RUSTBALL 4.3GB (Making strange grinding noises)",
      "Checking Floppy Drive A: ... 14 Maggi noodle recipes found",
      "CAUTION: Potential Y2K viral outbreak detected in sector 0xROAST",
      "Loading Windows 98... Please prepare to have your mind completely blown."
    ];

    const biosTextContainer = document.getElementById('bios-text');
    if (biosTextContainer) {
      biosTextContainer.innerHTML = '';
      biosLines.forEach((line, idx) => {
        setTimeout(() => {
          const p = document.createElement('div');
          p.className = 'bios-text-line';
          p.textContent = line;
          biosTextContainer.appendChild(p);
        }, idx * 160);
      });
    }

    // Switch to Windows 98 Splash Screen
    setTimeout(() => {
      this.bootEl.style.display = 'none';
      this.splashEl.style.display = 'flex';

      // Boot into Desktop
      setTimeout(() => {
        this.splashEl.style.display = 'none';
        window.win98Audio.playStartupChime();
        if (window.clippyAssistant) {
          window.clippyAssistant.setCustomText("Welcome to the Abandoned Computer! What forgotten secrets will you uncover today?");
        }
      }, 1600);
    }, 1800);
  }
}

window.bsodController = new BSODController();
