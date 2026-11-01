/* ==========================================================================
   JUDGES CHAOS & TROLLING ENGINE ("GET THE SHIT OUT OF THE JUDGES")
   Designed for the Latent format round (Samay Raina / OpenLake / Meraz Judges)
   Features:
   - Window Ghost Smear / Solitaire Glitch on Drag
   - Escaping / Runaway Cancel & Low-Score Buttons
   - Official Judge Rating Portal that rejects any score < 10
   - Infinite Cascading "Task Failed Successfully" Popups
   - Simulated 1998 16MB RAM Thrashing & Hourglass Freezes
   - Demon Clippy that blocks mouse clicks & roasts judges
   - Presenter Secret Toggle (Ctrl+Alt+K) to switch between Pure Elite & Maximum Chaos
   ========================================================================== */

class JudgesChaosEngine {
  constructor() {
    this.chaosEnabled = true; // Enabled by default for maximum hilarious pain!
    this.smearEnabled = true;
    this.runawayButtons = true;
    this.ramLagEnabled = true;
    this.demonClippy = true;
    this.isGhosting = false;
  }

  init() {
    this.setupSecretHotkeys();
    this.setupWindowSmearGlitch();
    this.setupEscapingButtons();
    this.setupLagSimulator();
    this.injectChaosTrayIndicator();
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
    const indicator = document.getElementById('tray-chaos-indicator');
    if (indicator) {
      indicator.textContent = this.chaosEnabled ? '🔥 CHAOS' : '🛡️ NORMAL';
      indicator.style.color = this.chaosEnabled ? '#ff0000' : '#008000';
    }

    if (this.chaosEnabled) {
      window.win98Audio.playChordError();
      window.clippyAssistant.setCustomText("😈 JUDGES SUFFERING MODE ACTIVATED! Prepare for 1998 hardware torture.");
    } else {
      window.win98Audio.playStartupChime();
      window.clippyAssistant.setCustomText("😇 Normal Elite Mode restored. Presenters are in full control.");
      // Clear any spawned error popups
      document.querySelectorAll('.chaos-popup').forEach(p => p.remove());
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

  // 1. The Legendary Frozen Windows 98 Window Smear Glitch
  setupWindowSmearGlitch() {
    document.addEventListener('mousemove', (e) => {
      if (!this.chaosEnabled || !this.smearEnabled) return;
      if (!window.windowManager.activeWindowId) return;

      const activeWin = window.windowManager.windows.get(window.windowManager.activeWindowId);
      if (!activeWin || !activeWin.el) return;

      // Only smear if currently dragging or moving mouse rapidly
      if (e.buttons === 1 && Math.random() > 0.4) {
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
        clone.textContent = activeWin.title + ' (Not Responding)';

        document.getElementById('desktop').appendChild(clone);

        // Keep at most 40 ghosts
        const ghosts = document.querySelectorAll('.chaos-ghost-window');
        if (ghosts.length > 40) {
          ghosts[0].remove();
        }
      }
    });
  }

  // 2. Escaping / Runaway Cancel & Low Score Buttons
  setupEscapingButtons() {
    document.addEventListener('mouseover', (e) => {
      if (!this.chaosEnabled || !this.runawayButtons) return;
      const target = e.target;

      if (target.classList.contains('runaway-btn') || 
          target.textContent.trim().toLowerCase() === 'cancel' || 
          target.id.includes('bribe') ||
          target.classList.contains('title-btn-close') && Math.random() > 0.7) {
        
        target.style.position = 'relative';
        const randX = (Math.random() - 0.5) * 160;
        const randY = (Math.random() - 0.5) * 80;
        target.style.transform = `translate(${randX}px, ${randY}px)`;
        window.win98Audio.playClick();

        if (Math.random() > 0.6) {
          target.title = "Can't touch this! — Samay Raina Proof Engine";
        }
      }
    });
  }

  // 3. Simulated 1998 RAM Thrashing & Random Lag Freezes
  setupLagSimulator() {
    setInterval(() => {
      if (!this.chaosEnabled || !this.ramLagEnabled) return;
      if (Math.random() > 0.85) {
        // Trigger temporary hourglass freeze
        document.body.style.cursor = 'wait';
        const activeWin = window.windowManager.activeWindowId;
        if (activeWin) {
          const win = window.windowManager.windows.get(activeWin);
          if (win && win.el) {
            const titleText = win.el.querySelector('.titlebar-text');
            if (titleText && !titleText.textContent.includes('Not Responding')) {
              const original = titleText.textContent;
              titleText.textContent += ' [NOT RESPONDING - 16MB RAM EXHAUSTED]';
              setTimeout(() => {
                titleText.textContent = original;
                document.body.style.cursor = 'default';
              }, 1800);
            }
          }
        }
      }
    }, 12000);
  }

  // 4. Infinite Russian Doll Error Dialogs
  spawnCascadingError(title = "System Alert", message = "Task failed successfully.") {
    window.win98Audio.playChordError();
    const winId = 'chaos_err_' + Date.now();
    const content = document.createElement('div');
    content.className = 'chaos-popup';
    content.style.padding = '14px 16px';
    content.style.fontSize = '11px';

    content.innerHTML = `
      <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 14px;">
        <div style="width: 32px; height: 32px; background: #ff0000; border-radius: 50%; color: #fff; font-size: 22px; font-weight: bold; display: flex; align-items: center; justify-content: center;">✕</div>
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

    const winRecord = window.windowManager.createWindow({
      id: winId,
      title: title,
      icon: Win98Icons.windowsLogo,
      width: 340,
      height: 160,
      resizable: false,
      content: content
    });

    content.querySelector(`#${winId}_ok`).addEventListener('click', () => {
      window.windowManager.closeWindow(winId);
      // Spawn two more if in chaos mode!
      if (this.chaosEnabled) {
        setTimeout(() => {
          this.spawnCascadingError("Confirmation of Failure", "Are you sure you acknowledged the previous fatal error?");
        }, 300);
      }
    });

    content.querySelector(`#${winId}_cancel`).addEventListener('click', () => {
      window.windowManager.closeWindow(winId);
    });
  }

  // 5. Official Judges Rating Portal App (The Ultimate Roast)
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

    // Force slider back to 10 with funny boing!
    slider.addEventListener('input', () => {
      const v = parseFloat(slider.value);
      if (v < 9.8) {
        window.win98Audio.playChordError();
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

  // 6. Prank Control Center (For Presenters)
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
        <label><input type="checkbox" id="${winId}_tog_ram" ${this.ramLagEnabled ? 'checked' : ''} /> 16MB RAM Thrashing & Hourglass Freezes</label>
      </div>
      <div style="display: flex; gap: 8px; justify-content: flex-end;">
        <button class="button-bevel" id="${winId}_test_err" style="color: #ff0000;">Trigger Test Error</button>
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
    content.querySelector(`#${winId}_tog_ram`).addEventListener('change', (e) => { this.ramLagEnabled = e.target.checked; });
    content.querySelector(`#${winId}_test_err`).addEventListener('click', () => this.spawnCascadingError());
    content.querySelector(`#${winId}_bsod`).addEventListener('click', () => window.appLauncher.triggerBSOD());
    content.querySelector(`#${winId}_close`).addEventListener('click', () => window.windowManager.closeWindow(winId));
  }
}

window.judgesChaosEngine = new JudgesChaosEngine();
