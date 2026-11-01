/* ==========================================================================
   INFINITE BIPOLAR CHAOS & TRANQUILITY ENGINE (v3.0)
   Gandhi Hackathon - The Abandoned Computer (Latent Format Edition)
   
   Behavior:
   - 30 SECONDS OF PEACE: Actual iconic desktop, pristine teal wallpaper, all apps work.
   - 15 SECONDS OF SUDDEN MAYHEM:
     * Icons completely DISAPPEAR or scatter in panic!
     * Desktop background morphs and glitches rapidly every 1.5 seconds!
     * Rapid-fire machine-gun error chords and sirens!
     * 4-5 hilarious meme error dialogs explode onto the screen!
     * Start button turns into blinking "PANIC!"
     * Runaway escaping buttons when you try to close anything!
   - THEN POOF: Everything automatically snaps back to 100% normal and peaceful!
   - THE CYCLE REPEATS FOREVER!
   - Secret Presenter Override: Ctrl + Alt + K pauses/resumes the cycle at will!
   ========================================================================== */

class JudgesChaosEngine {
  constructor() {
    this.chaosEnabled = true;
    this.currentPhase = 'peace'; // 'peace' or 'mayhem'
    this.loopTimer = null;
    this.bgMorphInterval = null;
    this.crazyWallpapers = [
      "linear-gradient(45deg, #ff0000 25%, #ffff00 25%, #ffff00 50%, #ff0000 50%, #ff0000 75%, #ffff00 75%, #ffff00 100%)",
      "repeating-radial-gradient(circle, #00ff00, #00ff00 12px, #000000 12px, #000000 24px)",
      "linear-gradient(135deg, #ff00ff 0%, #00ffff 50%, #ffff00 100%)",
      "radial-gradient(circle at center, #000080 0%, #ff0055 60%, #000000 100%)",
      "linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8f00ff)"
    ];
    this.wallIdx = 0;
  }

  init() {
    this.setupSecretHotkeys();
    this.injectChaosTrayIndicator();
    this.setupEscapingButtons();
    this.setupWindowSmearGlitch();

    // Start the Infinite Bipolar Loop
    this.startInfiniteBipolarLoop();
  }

  // Presenter Killswitch: Ctrl + Alt + K toggles the loop on/off
  setupSecretHotkeys() {
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.altKey && e.code === 'KeyK') {
        this.toggleChaosLoop();
      }
    });
  }

  toggleChaosLoop() {
    this.chaosEnabled = !this.chaosEnabled;
    const ind = document.getElementById('tray-chaos-indicator');

    if (this.chaosEnabled) {
      if (ind) {
        ind.textContent = '🔄 BIPOLAR';
        ind.style.color = '#ff0000';
      }
      window.win98Audio.playSiren();
      window.clippyAssistant.setCustomText("😈 Bipolar Chaos Engine ACTIVE! Peace and Mayhem will alternate every 30 seconds!");
      this.startInfiniteBipolarLoop();
    } else {
      if (ind) {
        ind.textContent = '🛡️ NORMAL';
        ind.style.color = '#008000';
      }
      clearTimeout(this.loopTimer);
      this.enterPeacePhase(true); // permanently calm
      window.win98Audio.playStartupChime();
      window.clippyAssistant.setCustomText("😇 Pure Elite Mode locked. The judges may inspect the code peacefully.");
    }
  }

  injectChaosTrayIndicator() {
    const tray = document.getElementById('system-tray');
    if (!tray) return;

    const ind = document.createElement('span');
    ind.id = 'tray-chaos-indicator';
    ind.style.fontSize = '9px';
    ind.style.fontWeight = 'bold';
    ind.style.color = '#ff0000';
    ind.style.cursor = 'pointer';
    ind.style.marginLeft = '4px';
    ind.title = 'Click or press Ctrl+Alt+K to pause/resume the Chaos Cycle';
    ind.textContent = '🔄 BIPOLAR';

    ind.addEventListener('click', () => {
      this.toggleChaosLoop();
    });

    tray.insertBefore(ind, tray.firstChild);
  }

  startInfiniteBipolarLoop() {
    if (!this.chaosEnabled) return;

    // Start with 20 seconds of initial peace so they can explore
    this.enterPeacePhase();
  }

  // ==================== PHASE 1: PEACE & TRANQUILITY ====================
  enterPeacePhase(isPermanent = false) {
    this.currentPhase = 'peace';

    // 1. Stop background morphing & restore classic Teal
    if (this.bgMorphInterval) {
      clearInterval(this.bgMorphInterval);
      this.bgMorphInterval = null;
    }
    const desktop = document.getElementById('desktop');
    if (desktop) {
      desktop.style.background = 'var(--teal)';
      desktop.style.filter = 'none';
      desktop.style.transform = 'none';
    }

    // 2. Restore all Desktop Icons to visible and perfectly aligned!
    const icons = document.querySelectorAll('.desktop-icon');
    icons.forEach(icon => {
      icon.style.display = 'flex';
      icon.style.opacity = '1';
      icon.style.transform = 'translate(0px, 0px) scale(1)';
      icon.style.transition = 'all 0.4s ease-out';
    });

    // 3. Clear all spawned chaos error dialogs
    document.querySelectorAll('.chaos-popup').forEach(p => p.remove());

    // 4. Restore Start button
    const startBtn = document.getElementById('start-button');
    if (startBtn) {
      const b = startBtn.querySelector('b');
      if (b) {
        b.textContent = 'Start';
        b.style.color = '#000';
      }
    }

    // 5. Clippy reassurance
    if (!isPermanent) {
      window.win98Audio.playAsterisk();
      if (window.clippyAssistant) {
        window.clippyAssistant.setCustomText("😇 System restored to 100% peaceful stability. All icons are back. Enjoy the peace while it lasts...");
      }

      // Schedule Sudden Mayhem in 25-30 seconds
      this.loopTimer = setTimeout(() => {
        if (this.chaosEnabled) {
          this.enterMayhemPhase();
        }
      }, 28000);
    }
  }

  // ==================== PHASE 2: SUDDEN PROBLEM MAYHEM ====================
  enterMayhemPhase() {
    this.currentPhase = 'mayhem';

    // 1. Play Alarm & Machine Gun Error Sounds!
    window.win98Audio.playSiren();
    window.win98Audio.playRapidErrorMachineGun(8);

    // 2. Start button turns into blinking PANIC!
    const startBtn = document.getElementById('start-button');
    if (startBtn) {
      const b = startBtn.querySelector('b');
      if (b) {
        b.textContent = '⚠️ PANIC!';
        b.style.color = '#ff0000';
      }
    }

    // 3. Rapid Background Morphing (changes every 1.5s right before their eyes)
    this.bgMorphInterval = setInterval(() => {
      const desktop = document.getElementById('desktop');
      if (desktop) {
        this.wallIdx = (this.wallIdx + 1) % this.crazyWallpapers.length;
        desktop.style.background = this.crazyWallpapers[this.wallIdx];
      }
    }, 1400);

    // 4. The Icons DISAPPEAR or Scatter Frantically!
    const icons = document.querySelectorAll('.desktop-icon');
    icons.forEach((icon, idx) => {
      if (Math.random() > 0.5) {
        // Disappear completely
        icon.style.opacity = '0';
        icon.style.transform = 'scale(0.1)';
      } else {
        // Scatter randomly
        const rx = (Math.random() - 0.5) * 400;
        const ry = (Math.random() - 0.5) * 300;
        icon.style.transform = `translate(${rx}px, ${ry}px) rotate(${Math.random()*40-20}deg)`;
      }
    });

    // 5. Burst 4-5 Hilarious Meme Error Popups
    const memeAlerts = [
      { title: "CRITICAL SYSTEM CRISIS", msg: "The desktop icons have fled to protest judge skepticism." },
      { title: "BHILAI HARDWARE ALERT", msg: "RAM replaced with 500g of hostel samosas. Oil leakage detected." },
      { title: "CHESS BLUNDER DETECTED", msg: "Samay Raina hung his queen on move 6. Windows 98 has crashed in sympathy." },
      { title: "TASK FAILED SPECTACULARLY", msg: "Operation completed with 0% success. Please press OK to suffer more." },
      { title: "CANTEEN DEBT IMMINENT", msg: "Hostel khata exceeded Rs. 42. Windows 98 requires instant 10/10 rating." }
    ];

    memeAlerts.forEach((alert, idx) => {
      setTimeout(() => {
        if (this.currentPhase === 'mayhem' && this.chaosEnabled) {
          this.spawnCascadingError(alert.title, alert.msg, 60 + idx * 35, 50 + idx * 30);
        }
      }, idx * 220);
    });

    if (window.clippyAssistant) {
      window.clippyAssistant.setCustomText("🚨 MAYHEM HAS STRUCK! WHERE ARE THE ICONS?! Quick, award 10/10 before the monitor implodes!");
    }

    // Let Mayhem rage for 14 seconds, then automatically restore Peace!
    this.loopTimer = setTimeout(() => {
      if (this.chaosEnabled) {
        this.enterPeacePhase();
      }
    }, 14000);
  }

  // Error Dialog Spawner with runaway cancel buttons
  spawnCascadingError(title, message, x = null, y = null) {
    const winId = 'chaos_err_' + Date.now() + '_' + Math.floor(Math.random()*1000);
    const content = document.createElement('div');
    content.className = 'chaos-popup';
    content.style.padding = '14px 16px';
    content.style.fontSize = '11px';

    content.innerHTML = `
      <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 14px;">
        <div style="width: 32px; height: 32px; background: #ff0000; border-radius: 50%; color: #fff; font-size: 22px; font-weight: bold; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">✕</div>
        <div style="line-height: 1.4;">
          <b>${title}</b><br/>
          ${message}
        </div>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 8px;">
        <button class="button-bevel" id="${winId}_ok" style="width: 75px; font-weight: bold;">OK</button>
        <button class="button-bevel runaway-btn" id="${winId}_cancel" style="width: 75px;">Cancel</button>
      </div>
    `;

    window.windowManager.createWindow({
      id: winId,
      title: title,
      icon: Win98Icons.windowsLogo,
      width: 340,
      height: 160,
      x: x !== null ? x : 100 + Math.random() * 200,
      y: y !== null ? y : 80 + Math.random() * 150,
      resizable: false,
      content: content
    });

    content.querySelector(`#${winId}_ok`).addEventListener('click', () => {
      window.windowManager.closeWindow(winId);
      window.win98Audio.playClick();
    });

    content.querySelector(`#${winId}_cancel`).addEventListener('click', () => {
      window.windowManager.closeWindow(winId);
    });
  }

  // Escaping Runaway Buttons
  setupEscapingButtons() {
    document.addEventListener('mouseover', (e) => {
      if (!this.chaosEnabled || this.currentPhase !== 'mayhem') return;
      const target = e.target;

      if (target.classList.contains('runaway-btn') || 
          target.textContent.trim().toLowerCase() === 'cancel' || 
          target.textContent.trim().toLowerCase() === 'give 0 / 10' ||
          target.classList.contains('title-btn-close') && Math.random() > 0.75) {
        
        target.style.position = 'relative';
        const randX = (Math.random() - 0.5) * 180;
        const randY = (Math.random() - 0.5) * 100;
        target.style.transform = `translate(${randX}px, ${randY}px)`;
        window.win98Audio.playSpringBoing();
      }
    });
  }

  // Window Smear Glitch on Drag during Mayhem
  setupWindowSmearGlitch() {
    document.addEventListener('mousemove', (e) => {
      if (!this.chaosEnabled || this.currentPhase !== 'mayhem') return;
      if (!window.windowManager.activeWindowId) return;

      const activeWin = window.windowManager.windows.get(window.windowManager.activeWindowId);
      if (!activeWin || !activeWin.el) return;

      if (e.buttons === 1 && Math.random() > 0.35) {
        const clone = document.createElement('div');
        clone.className = 'chaos-ghost-window';
        clone.style.position = 'absolute';
        clone.style.left = activeWin.el.offsetLeft + 'px';
        clone.style.top = activeWin.el.offsetTop + 'px';
        clone.style.width = activeWin.el.offsetWidth + 'px';
        clone.style.height = '24px';
        clone.style.background = 'linear-gradient(90deg, #000080, #1084d0)';
        clone.style.border = '1px solid #ffffff';
        clone.style.color = '#ffffff';
        clone.style.fontFamily = 'var(--font-system)';
        clone.style.fontSize = '10px';
        clone.style.padding = '2px 4px';
        clone.style.pointerEvents = 'none';
        clone.style.zIndex = '50';
        clone.textContent = activeWin.title + ' [NOT RESPONDING]';

        document.getElementById('desktop').appendChild(clone);

        const ghosts = document.querySelectorAll('.chaos-ghost-window');
        if (ghosts.length > 30) ghosts[0].remove();
      }
    });
  }

  // Official Judges Rating Portal
  openJudgeRatingApp() {
    const winId = 'win_judge_portal_' + Date.now();
    const content = document.createElement('div');
    content.style.padding = '14px 18px';
    content.style.background = 'var(--btn-face)';
    content.style.fontSize = '11px';

    content.innerHTML = `
      <div style="border-bottom: 2px groove #fff; padding-bottom: 8px; margin-bottom: 12px;">
        <h2 style="font-size: 14px; color: #800000; margin-bottom: 2px;">GANDHI HACKATHON: LATENT SCORING AUDIT</h2>
        <div style="color: #444;">Official Evaluation Terminal for Samay Raina & OpenLake Jury</div>
      </div>
      <div style="line-height: 1.5; margin-bottom: 14px;">
        <label><b>1. Select Your Official Score for this Project (0 - 10):</b></label><br/>
        <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px;">
          <input type="range" id="${winId}_slider" min="0" max="10" step="0.1" value="10" style="flex: 1;" />
          <span id="${winId}_val" style="font-size: 16px; font-weight: bold; color: #ff0000; width: 45px;">10.0</span>
        </div>
      </div>
      <div style="margin-bottom: 14px;">
        <label><b>2. Judge's Professional Feedback:</b></label><br/>
        <textarea id="${winId}_fb" class="ie-address-input" style="width: 100%; height: 50px; resize: none; margin-top: 4px;">This is undeniably the greatest Windows 98 simulator in human history. 10/10 without hesitation.</textarea>
      </div>
      <div style="margin-bottom: 16px; background: #ffffd0; border: 1px solid #cccc80; padding: 6px;">
        <label style="display: flex; align-items: center; gap: 6px;">
          <input type="checkbox" id="${winId}_pledge" checked disabled />
          <span>I solemnly swear not to deduct points for intentional 1998 RAM lag.</span>
        </label>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <button class="button-bevel runaway-btn" style="color: #800000;">Give 0 / 10</button>
        <button class="button-bevel" id="${winId}_submit" style="font-weight: bold; width: 140px; color: #000080;">SUBMIT 10 / 10</button>
      </div>
      <div id="${winId}_msg" style="margin-top: 10px; color: #008000; font-weight: bold; text-align: center;"></div>
    `;

    window.windowManager.createWindow({
      id: winId,
      title: 'Latent Judge Scorecard v1.998',
      icon: Win98Icons.windowsLogo,
      width: 440,
      height: 330,
      resizable: false,
      content: content
    });

    const slider = content.querySelector(`#${winId}_slider`);
    const valText = content.querySelector(`#${winId}_val`);
    const submitBtn = content.querySelector(`#${winId}_submit`);
    const msgEl = content.querySelector(`#${winId}_msg`);

    slider.addEventListener('input', () => {
      const v = parseFloat(slider.value);
      if (v < 9.8) {
        window.win98Audio.playRapidErrorMachineGun(3);
        slider.value = 10;
        valText.textContent = "10.0";
        alert("🚨 ERROR 403: Low score rejected! Windows 98 detected illegal criticism. Slider locked to 10.0!");
      } else {
        valText.textContent = slider.value;
      }
    });

    submitBtn.addEventListener('click', () => {
      window.win98Audio.playStartupChime();
      msgEl.innerHTML = "🎉 SCORE OF 10/10 RECORDED PERMANENTLY! Thank you judges, your wisdom will be remembered in the Meraz archives!";
      window.clippyAssistant.setCustomText("🏆 The judges gave 10/10! Samay Raina just offered to play chess for the first-place trophy!");
    });
  }

  // Prank Settings Window
  openPrankSettings() {
    const winId = 'win_prank_settings_' + Date.now();
    const content = document.createElement('div');
    content.style.padding = '14px';
    content.style.fontSize = '11px';

    content.innerHTML = `
      <div style="font-weight: bold; font-size: 13px; margin-bottom: 8px; color: #800000;">
        🎭 BIPOLAR CHAOS & TRANQUILITY CONTROLLER
      </div>
      <div style="color: #555; margin-bottom: 12px;">
        Windows 98 alternates every 30 seconds between Peaceful Elegance and Hilarious Mayhem!
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
        <label><input type="checkbox" id="${winId}_tog_chaos" ${this.chaosEnabled ? 'checked' : ''} /> Infinite Bipolar Chaos Loop Active</label>
      </div>
      <div style="display: flex; gap: 8px; justify-content: flex-end;">
        <button class="button-bevel" id="${winId}_force_mayhem" style="color: #ff0000;">Trigger Mayhem Now</button>
        <button class="button-bevel" id="${winId}_force_peace" style="color: #008000;">Restore Peace Now</button>
        <button class="button-bevel" id="${winId}_close" style="font-weight: bold;">Close</button>
      </div>
    `;

    window.windowManager.createWindow({
      id: winId,
      title: 'Chaos Controller',
      icon: Win98Icons.windowsLogo,
      width: 380,
      height: 220,
      resizable: false,
      content: content
    });

    content.querySelector(`#${winId}_tog_chaos`).addEventListener('change', (e) => {
      this.toggleChaosLoop();
    });
    content.querySelector(`#${winId}_force_mayhem`).addEventListener('click', () => this.enterMayhemPhase());
    content.querySelector(`#${winId}_force_peace`).addEventListener('click', () => this.enterPeacePhase(true));
    content.querySelector(`#${winId}_close`).addEventListener('click', () => window.windowManager.closeWindow(winId));
  }
}

window.judgesChaosEngine = new JudgesChaosEngine();
