/* ==========================================================================
   APPLICATION LAUNCHER & SYSTEM DIALOGS
   The Abandoned Computer - Gandhi Hackathon Edition
   ========================================================================== */

class AppLauncher {
  openExplorer(path = 'C:') {
    window.explorerApp.open(path);
  }

  openIE(url = 'http://www.google.com') {
    window.internetExplorerApp.open(url);
  }

  openPaint() {
    window.paintApp.open();
  }

  openNotepad(path = null, content = '') {
    window.notepadApp.open(path, content);
  }

  openWordPad() {
    window.wordpadApp.open();
  }

  openCalculator() {
    window.calculatorApp.open();
  }

  openWinamp(trackIdx = 0) {
    window.winampApp.open(trackIdx);
  }

  openDOS() {
    window.cmdPromptApp.open();
  }

  openMinesweeper(c = 9, r = 9, m = 10) {
    window.minesweeperApp.open(c, r, m);
  }

  openSolitaire() {
    window.solitaireApp.open();
  }

  openRaycaster() {
    window.raycaster3DApp.open();
  }

  openPinball() {
    window.pinballApp.open();
  }

  openImageViewer(title, data, caption) {
    window.imageViewerApp.open(title, data, caption);
  }

  triggerBSOD() {
    window.bsodController.triggerBSOD();
  }

  openRecycleBin() {
    const winId = 'win_bin_' + Date.now();
    const content = document.createElement('div');
    content.style.padding = '14px';
    content.style.textAlign = 'center';
    content.style.color = '#333';
    content.innerHTML = `
      <img src="${Win98Icons.trashEmpty}" style="width: 48px; height: 48px; margin-bottom: 8px;" alt="" /><br/>
      <b>The Recycle Bin is empty.</b><br/>
      <span style="font-size: 11px; color: #666;">No deleted items currently in the bin.</span>
    `;
    window.windowManager.createWindow({
      id: winId,
      title: 'Recycle Bin',
      icon: Win98Icons.trashEmpty,
      width: 320,
      height: 200,
      content: content
    });
  }

  openSystemProperties() {
    const winId = 'win_sysprop_' + Date.now();
    const content = document.createElement('div');
    content.style.padding = '10px 14px';
    content.style.fontSize = '11px';
    content.innerHTML = `
      <div style="display: flex; gap: 4px; border-bottom: 1px solid #808080; margin-bottom: 12px; padding-bottom: 2px;">
        <button class="button-bevel depressed" style="font-size: 11px; padding: 2px 8px;">General</button>
        <button class="button-bevel" style="font-size: 11px; padding: 2px 8px;">Device Manager</button>
        <button class="button-bevel" style="font-size: 11px; padding: 2px 8px;">Hardware Profiles</button>
        <button class="button-bevel" style="font-size: 11px; padding: 2px 8px;">Performance</button>
      </div>
      <div style="display: flex; gap: 16px;">
        <img src="${Win98Icons.computer}" style="width: 48px; height: 48px; flex-shrink: 0;" alt="" />
        <div style="line-height: 1.5;">
          <b>System:</b><br/>
          Microsoft Windows 98<br/>
          Second Edition<br/>
          4.10.2222 A<br/><br/>
          <b>Registered to:</b><br/>
          Vikram Sharma (Roll No. 981042)<br/>
          Indian Institute of Technology Bhilai<br/>
          Product Key: 04214-OEM-0070115-65924<br/><br/>
          <b>Computer:</b><br/>
          GenuineIntel<br/>
          Pentium(r) II Processor Intel MMX(TM) Technology<br/>
          64.0MB RAM<br/>
          Quantum Fireball EX 4.3GB Hard Disk
        </div>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 6px; margin-top: 16px;">
        <button class="button-bevel" id="${winId}_btn_ok" style="width: 70px;">OK</button>
        <button class="button-bevel" id="${winId}_btn_cancel" style="width: 70px;">Cancel</button>
      </div>
    `;

    window.windowManager.createWindow({
      id: winId,
      title: 'System Properties',
      icon: Win98Icons.computer,
      width: 410,
      height: 380,
      resizable: false,
      content: content
    });

    content.querySelector(`#${winId}_btn_ok`).addEventListener('click', () => window.windowManager.closeWindow(winId));
    content.querySelector(`#${winId}_btn_cancel`).addEventListener('click', () => window.windowManager.closeWindow(winId));
  }

  openRunDialog() {
    const winId = 'win_run_' + Date.now();
    const content = document.createElement('div');
    content.style.padding = '12px';
    content.innerHTML = `
      <div style="display: flex; gap: 10px; margin-bottom: 12px;">
        <img src="${Win98Icons.windowsLogo}" style="width: 32px; height: 32px;" alt="" />
        <div style="font-size: 11px; line-height: 1.4;">
          Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
        <label style="font-weight: bold; font-size: 11px;">Open:</label>
        <input type="text" id="${winId}_inp" class="ie-address-input" style="flex: 1;" placeholder="calc, paint, notepad, cmd, doom, winamp, crash..." autofocus />
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 6px;">
        <button class="button-bevel" id="${winId}_ok" style="width: 65px; font-weight: bold;">OK</button>
        <button class="button-bevel" id="${winId}_cancel" style="width: 65px;">Cancel</button>
      </div>
    `;

    window.windowManager.createWindow({
      id: winId,
      title: 'Run',
      icon: Win98Icons.windowsLogo,
      width: 380,
      height: 170,
      resizable: false,
      content: content
    });

    const inp = content.querySelector(`#${winId}_inp`);
    const doRun = () => {
      const v = inp.value.trim().toLowerCase();
      window.windowManager.closeWindow(winId);
      if (v === 'calc') this.openCalculator();
      else if (v === 'paint') this.openPaint();
      else if (v === 'notepad') this.openNotepad();
      else if (v === 'wordpad') this.openWordPad();
      else if (v === 'cmd' || v === 'command') this.openDOS();
      else if (v === 'winamp') this.openWinamp();
      else if (v === 'minesweeper') this.openMinesweeper();
      else if (v === 'solitaire') this.openSolitaire();
      else if (v === 'doom') this.openRaycaster();
      else if (v === 'pinball') this.openPinball();
      else if (v === 'iexplore' || v.startsWith('http')) this.openIE(v.startsWith('http') ? v : 'http://www.google.com');
      else if (v === 'crash' || v === 'bsod') this.triggerBSOD();
      else {
        alert(`Cannot find the file '${v}' (or one of its components). Make sure the path and filename are correct.`);
      }
    };

    content.querySelector(`#${winId}_ok`).addEventListener('click', doRun);
    inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') doRun(); });
    content.querySelector(`#${winId}_cancel`).addEventListener('click', () => window.windowManager.closeWindow(winId));
  }

  openShutdownDialog() {
    const winId = 'win_shutdown_' + Date.now();
    const content = document.createElement('div');
    content.style.padding = '14px';
    content.innerHTML = `
      <div style="display: flex; gap: 12px; margin-bottom: 12px;">
        <img src="${Win98Icons.shutDown}" style="width: 36px; height: 36px;" alt="" />
        <div style="font-size: 11px;">
          <b>Shut Down Windows</b><br/>
          What do you want the computer to do?
        </div>
      </div>
      <div style="margin-left: 48px; display: flex; flex-direction: column; gap: 6px; font-size: 11px; margin-bottom: 18px;">
        <label><input type="radio" name="sd_opt" checked /> Shut down</label>
        <label><input type="radio" name="sd_opt" /> Restart</label>
        <label><input type="radio" name="sd_opt" /> Restart in MS-DOS mode</label>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 6px;">
        <button class="button-bevel" id="${winId}_ok" style="width: 65px; font-weight: bold;">OK</button>
        <button class="button-bevel" id="${winId}_cancel" style="width: 65px;">Cancel</button>
        <button class="button-bevel" style="width: 65px;">Help</button>
      </div>
    `;

    window.windowManager.createWindow({
      id: winId,
      title: 'Shut Down Windows',
      icon: Win98Icons.shutDown,
      width: 340,
      height: 200,
      resizable: false,
      content: content
    });

    content.querySelector(`#${winId}_ok`).addEventListener('click', () => {
      window.windowManager.closeWindow(winId);
      window.bsodController.reboot();
    });
    content.querySelector(`#${winId}_cancel`).addEventListener('click', () => window.windowManager.closeWindow(winId));
  }

  openVolumeControl() {
    const winId = 'win_vol_' + Date.now();
    const content = document.createElement('div');
    content.style.padding = '12px';
    content.style.textAlign = 'center';
    content.innerHTML = `
      <div style="font-size: 11px; font-weight: bold; margin-bottom: 8px;">Volume</div>
      <input type="range" id="${winId}_slider" min="0" max="100" value="70" orient="vertical" style="height: 100px; -webkit-appearance: slider-vertical;" /><br/>
      <label style="font-size: 11px; margin-top: 8px; display: inline-block;">
        <input type="checkbox" id="${winId}_mute" /> Mute
      </label>
    `;

    window.windowManager.createWindow({
      id: winId,
      title: 'Volume Control',
      icon: Win98Icons.volume,
      width: 140,
      height: 200,
      resizable: false,
      content: content
    });

    const slider = content.querySelector(`#${winId}_slider`);
    const mute = content.querySelector(`#${winId}_mute`);
    slider.addEventListener('input', () => {
      if (!mute.checked) {
        window.win98Audio.setVolume(slider.value / 100);
      }
    });
    mute.addEventListener('change', () => {
      window.win98Audio.setVolume(mute.checked ? 0 : slider.value / 100);
    });
  }

  openDateTimeProperties() {
    const winId = 'win_datetime_' + Date.now();
    const d = new Date();
    const content = document.createElement('div');
    content.style.padding = '12px';
    content.innerHTML = `
      <div style="font-size: 11px; line-height: 1.5;">
        <b>Current System Date:</b> ${d.toLocaleDateString()}<br/>
        <b>Current System Time:</b> ${d.toLocaleTimeString()}<br/>
        <b>Time Zone:</b> (GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi<br/><br/>
        <div style="border: 1px inset #808080; padding: 10px; background: #fff; text-align: center;">
          <div style="font-weight: bold; font-size: 14px; margin-bottom: 4px;">November 2026</div>
          <div style="font-size: 11px; color: #000080;">Gandhi Hackathon Edition</div>
        </div>
      </div>
      <div style="display: flex; justify-content: flex-end; margin-top: 14px;">
        <button class="button-bevel" id="${winId}_ok" style="width: 70px;">OK</button>
      </div>
    `;

    window.windowManager.createWindow({
      id: winId,
      title: 'Date/Time Properties',
      icon: Win98Icons.computer,
      width: 320,
      height: 220,
      resizable: false,
      content: content
    });

    content.querySelector(`#${winId}_ok`).addEventListener('click', () => window.windowManager.closeWindow(winId));
  }

  openHelpDialog() {
    this.openNotepad('C:\\WINDOWS\\HELP.TXT', `WINDOWS 98 HELP SYSTEM\n\nWelcome to the Abandoned Computer simulator for the Gandhi Hackathon!\n\nTips:\n1. Check 'My Documents' to explore Vikram Sharma's 1998-2001 files, diary, and memories.\n2. Open MS-DOS Prompt and type 'LATENT' or 'MATRIX' for secret Easter eggs.\n3. Turn on the CRT Monitor Shader by clicking the CRT icon in the bottom-right tray.\n4. Click Clippy on the bottom right for live hackathon humor!`);
  }

  launchApp(appName) {
    switch (appName) {
      case 'explorer': this.openExplorer(); break;
      case 'paint': this.openPaint(); break;
      case 'notepad': this.openNotepad(); break;
      case 'wordpad': this.openWordPad(); break;
      case 'calc': this.openCalculator(); break;
      case 'ie': this.openIE(); break;
      case 'winamp': this.openWinamp(); break;
      case 'dos': this.openDOS(); break;
      case 'minesweeper': this.openMinesweeper(); break;
      case 'solitaire': this.openSolitaire(); break;
      case 'raycaster': this.openRaycaster(); break;
      case 'pinball': this.openPinball(); break;
      case 'bsod': this.triggerBSOD(); break;
    }
  }
}

window.appLauncher = new AppLauncher();
