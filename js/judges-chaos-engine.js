/* ==========================================================================
   JUDGES CHAOS & TROLLING ENGINE ("GET THE SHIT OUT OF THE JUDGES" v2.0)
   Designed for the Latent format round (Samay Raina / OpenLake / Meraz Judges)
   Features:
   - Runaway Desktop Icons: Icons literally flee from the mouse for the first 12 seconds
   - Fake Antivirus Scan: "Threat detected" -> "Cleaning complete, all calm!" -> SUDDEN POPUP TSUNAMI!
   - 8 Cascading Error Popups with Machine-Gun Sound Chords
   - Crazy Wallpaper Flash on Wrong Clicks
   - Window Smear Ghost Glitch on Drag
   - Escaping Runaway Cancel Buttons
   - Judge Rating Portal Locked to 10.0
   - Presenter Secret Override: Ctrl + Alt + K toggles between Chaos & Elite Mode
   ========================================================================== */

class JudgesChaosEngine {
  constructor() {
    this.chaosEnabled = true;
    this.iconsFleeing = true;
    this.fleeTimer = null;
    this.smearEnabled = true;
    this.runawayButtons = true;
    this.crazyWallpapers = [
      "linear-gradient(45deg, #ff0000 25%, #ffff00 25%, #ffff00 50%, #ff0000 50%, #ff0000 75%, #ffff00 75%, #ffff00 100%)",
      "repeating-radial-gradient(circle, #00ff00, #00ff00 10px, #000000 10px, #000000 20px)",
      "linear-gradient(135deg, #ff00ff 0%, #00ffff 50%, #ffff00 100%)",
      "radial-gradient(circle at center, #000080 0%, #ff0000 70%, #000000 100%)",
      "var(--teal)"
    ];
    this.wallIdx = 0;
  }

  init() {
    this.setupSecretHotkeys();
    this.setupRunawayIcons();
    this.setupWindowSmearGlitch();
    this.setupEscapingButtons();
    this.setupWallpaperTroll();
    this.injectChaosTrayIndicator();
    this.scheduleFakeAntivirusPrank();
  }

  // Secret Hotkey for Presenters: Ctrl + Alt + K toggles Chaos Mode
  setupSecretHotkeys() {
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.altKey && e.code === 'KeyK') {
        this.toggleChaosMode();
      }
    });
  }

  toggleChaosMode(forceState = null) {
    this.chaosEnabled = forceState !== null ? forceState : !this.chaosEnabled;
    this.iconsFleeing = false; // stop running icons if toggled off
    const indicator = document.getElementById('tray-chaos-indicator');
    if (indicator) {
      indicator.textContent = this.chaosEnabled ? '🔥 CHAOS' : '🛡️ NORMAL';
      indicator.style.color = this.chaosEnabled ? '#ff0000' : '#008000';
    }

    if (this.chaosEnabled) {
      window.win98Audio.playRapidErrorMachineGun(4);
      window.clippyAssistant.setCustomText("😈 JUDGES SUFFERING MODE ACTIVE! Prepare for 1998 hardware torture.");
    } else {
      window.win98Audio.playStartupChime();
      window.clippyAssistant.setCustomText("😇 Normal Elite Mode restored. Presenters have full control.");
      document.querySelectorAll('.chaos-popup').forEach(p => p.remove());
      document.getElementById('desktop').style.background = 'var(--teal)';
      // Reset all icons
      document.querySelectorAll('.desktop-icon').forEach(icon => {
        icon.style.transform = 'translate(0px, 0px)';
      });
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
    ind.title = 'Click or press Ctrl+Alt+K to toggle Judges Suffering Mode';
    ind.textContent = '🔥 CHAOS';

    ind.addEventListener('click', () => {
      this.toggleChaosMode();
    });

    tray.insertBefore(ind, tray.firstChild);
  }

  // 1. Runaway Desktop Icons: Icons flee from the cursor for the first 12 seconds
  setupRunawayIcons() {
    const icons = document.querySelectorAll('.desktop-icon');
    
    // Stop fleeing after 14 seconds
    setTimeout(() => {
      this.iconsFleeing = false;
      icons.forEach(i => i.style.transform = 'translate(0px, 0px)');
      if (this.chaosEnabled) {
        window.clippyAssistant.setCustomText("😅 Icons have surrendered! You may now try to click them.");
      }
    }, 14000);

    document.addEventListener('mousemove', (e) => {
      if (!this.chaosEnabled || !this.iconsFleeing) return;

      icons.forEach(icon => {
        const rect = icon.getBoundingClientRect();
        const iconCenterX = rect.left + rect.width / 2;
        const iconCenterY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - iconCenterX, e.clientY - iconCenterY);

        if (dist < 85) {
          // Flee in opposite direction
          const angle = Math.atan2(iconCenterY - e.clientY, iconCenterX - e.clientX);
          const fleeDistance = 90;
          const targetX = Math.cos(angle) * fleeDistance + (Math.random() - 0.5) * 40;
          const targetY = Math.sin(angle) * fleeDistance + (Math.random() - 0.5) * 40;

          icon.style.transition = 'transform 0.15s ease-out';
          icon.style.transform = `translate(${targetX}px, ${targetY}px)`;
          
          if (Math.random() > 0.8) {
            window.win98Audio.playSpringBoing();
          }
        }
      });
    });
  }

  // 2. The Fake Antivirus -> Everything is Peaceful -> SUDDEN POPUP TSUNAMI!
  scheduleFakeAntivirusPrank() {
    setTimeout(() => {
      if (!this.chaosEnabled) return;
      this.openFakeAntivirus();
    }, 12000);
  }

  openFakeAntivirus() {
    window.win98Audio.playChordError();
    const winId = 'win_av_' + Date.now();
    const content = document.createElement('div');
    content.className = 'chaos-popup';
    content.style.padding = '14px';
    content.style.background = 'var(--btn-face)';
    content.style.fontSize = '11px';

    content.innerHTML = `
      <div style="display: flex; gap: 10px; margin-bottom: 12px; align-items: center;">
        <div style="font-size: 32px;">🛡️</div>
        <div>
          <b style="color: #800000; font-size: 13px;">MICROSOFT ANTIVIRUS 1998</b><br/>
          <span>Threat Detected: <b>Worm.Win98.JudgeRatingBribe.v1</b></span>
        </div>
      </div>
      <div style="border: 1px inset #808080; background: #fff; padding: 8px; margin-bottom: 14px; font-family: monospace;">
        Status: SYSTEM INFECTED WITH EXCESSIVE SARCASM<br/>
        Risk Level: MAXIMUM (Score at risk of dropping below 10)
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 6px;">
        <button class="button-bevel" id="${winId}_clean" style="font-weight: bold; width: 140px; color: #000080;">Purge Threat Now</button>
      </div>
    `;

    window.windowManager.createWindow({
      id: winId,
      title: 'Antivirus 98 - Alert',
      icon: Win98Icons.windowsLogo,
      width: 360,
      height: 190,
      resizable: false,
      content: content
    });

    content.querySelector(`#${winId}_clean`).addEventListener('click', () => {
      window.windowManager.closeWindow(winId);
      window.win98Audio.playClick();
      window.clippyAssistant.setCustomText("✅ Threat purged! System is now 100% peaceful and safe. Nothing bad will happen.");

      // 2.5 seconds of pure fake peace...
      setTimeout(() => {
        if (!this.chaosEnabled) return;
        this.triggerTsunamiJumpscare();
      }, 2500);
    });
  }

  // The Grand Chaos Avalanche
  triggerTsunamiJumpscare() {
    window.win98Audio.playRapidErrorMachineGun(10);
    this.flashWallpaper();

    const hilariousErrors = [
      { title: "CRITICAL FAILURE", msg: "VIRUS HAS UPGRADED TO WINDOWS 98 PROFESSIONAL EDITION." },
      { title: "HARDWARE WARNING", msg: "RAM replaced with 500g of Bhilai Steel ingot. Performance unaffected." },
      { title: "LATENT ALERT", msg: "Samay Raina detected in audience. Automatic checkmate initiated." },
      { title: "CANTEEN NOTICE", msg: "Outstanding debt of 42 Rs for Bun Maska detected in memory address 0xTEA." },
      { title: "TASK FAILED SUCCESSFULLY", msg: "Operation completed with 100% failure rate. Press OK to celebrate." },
      { title: "MOUSE WARNING", msg: "Mouse has acquired sentience and requested 10/10 hackathon score." }
    ];

    hilariousErrors.forEach((err, idx) => {
      setTimeout(() => {
        if (!this.chaosEnabled) return;
        this.spawnCascadingError(err.title, err.msg, 60 + idx * 30, 40 + idx * 30);
      }, idx * 180);
    });

    window.clippyAssistant.setCustomText("🚨 SURPRISE! The virus was just taking a chai break! Look at all these glorious error dialogs!");
  }

  // 3. Crazy Wallpaper Flash on Wrong Icon Click
  setupWallpaperTroll() {
    document.getElementById('desktop').addEventListener('click', (e) => {
      if (!this.chaosEnabled) return;
      if (e.target === document.getElementById('desktop') && Math.random() > 0.6) {
        this.cycleWallpaper();
      }
    });
  }

  cycleWallpaper() {
    this.wallIdx = (this.wallIdx + 1) % this.crazyWallpapers.length;
    document.getElementById('desktop').style.background = this.crazyWallpapers[this.wallIdx];
    window.win98Audio.playClick();
  }

  flashWallpaper() {
    let flashes = 0;
    const interval = setInterval(() => {
      this.cycleWallpaper();
      flashes++;
      if (flashes > 6) {
        clearInterval(interval);
        document.getElementById('desktop').style.background = 'var(--teal)';
      }
    }, 150);
  }

  // 4. Infinite Window Smear Glitch
  setupWindowSmearGlitch() {
    document.addEventListener('mousemove', (e) => {
      if (!this.chaosEnabled || !this.smearEnabled) return;
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
        if (ghosts.length > 35) ghosts[0].remove();
      }
    });
  }

  // 5. Escaping Runaway Buttons
  setupEscapingButtons() {
    document.addEventListener('mouseover', (e) => {
      if (!this.chaosEnabled || !this.runawayButtons) return;
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

  // Error Dialog Spawner
  spawnCascadingError(title = "System Alert", message = "Task failed successfully.", x = null, y = null) {
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

  // Official Judges Rating Portal App
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

  // Prank Control Center (For Presenters)
  openPrankSettings() {
    const winId = 'win_prank_settings_' + Date.now();
    const content = document.createElement('div');
    content.style.padding = '14px';
    content.style.fontSize = '11px';

    content.innerHTML = `
      <div style="font-weight: bold; font-size: 13px; margin-bottom: 8px; color: #800000;">
        🎭 JUDGES SUFFERING & CHAOS CONTROLLER
      </div>
      <div style="color: #555; margin-bottom: 12px;">
        Use these toggles to give the judges the ultimate funny 1998 torture during your Latent presentation!
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
        <label><input type="checkbox" id="${winId}_tog_smear" ${this.smearEnabled ? 'checked' : ''} /> Infinite Window Smearing Glitch on Drag</label>
        <label><input type="checkbox" id="${winId}_tog_runaway" ${this.runawayButtons ? 'checked' : ''} /> Runaway Escaping Cancel Buttons</label>
      </div>
      <div style="display: flex; gap: 8px; justify-content: flex-end;">
        <button class="button-bevel" id="${winId}_test_err" style="color: #ff0000;">Trigger Popups</button>
        <button class="button-bevel" id="${winId}_bsod" style="color: #0000aa;">Trigger Instant BSOD</button>
        <button class="button-bevel" id="${winId}_close" style="font-weight: bold;">Done</button>
      </div>
    `;

    window.windowManager.createWindow({
      id: winId,
      title: 'Prank & Chaos Settings',
      icon: Win98Icons.windowsLogo,
      width: 380,
      height: 250,
      resizable: false,
      content: content
    });

    content.querySelector(`#${winId}_tog_smear`).addEventListener('change', (e) => { this.smearEnabled = e.target.checked; });
    content.querySelector(`#${winId}_tog_runaway`).addEventListener('change', (e) => { this.runawayButtons = e.target.checked; });
    content.querySelector(`#${winId}_test_err`).addEventListener('click', () => this.triggerTsunamiJumpscare());
    content.querySelector(`#${winId}_bsod`).addEventListener('click', () => window.appLauncher.triggerBSOD());
    content.querySelector(`#${winId}_close`).addEventListener('click', () => window.windowManager.closeWindow(winId));
  }
}

window.judgesChaosEngine = new JudgesChaosEngine();
