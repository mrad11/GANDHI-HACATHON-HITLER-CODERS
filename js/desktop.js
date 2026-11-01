/* ==========================================================================
   DESKTOP ICON MANAGER & CONTEXT MENUS
   The Abandoned Computer - Gandhi Hackathon Edition
   ========================================================================== */

class DesktopManager {
  constructor() {
    this.iconsContainer = null;
    this.selectionBox = null;
    this.contextMenu = null;
    this.desktopEl = null;
    this.selectedIcons = new Set();
    this.wallpapers = {
      teal: "var(--teal)",
      clouds: "radial-gradient(ellipse at 50% 30%, #5ba4e5 0%, #1a56a0 70%, #0c3166 100%)",
      matrix: "linear-gradient(180deg, #021102 0%, #042904 50%, #001500 100%)",
      setup: "linear-gradient(135deg, #004e92 0%, #000428 100%)"
    };
    this.currentWallpaper = "teal";
  }

  init() {
    this.desktopEl = document.getElementById('desktop');
    this.iconsContainer = document.getElementById('desktop-icons');
    this.selectionBox = document.getElementById('selection-box');
    this.contextMenu = document.getElementById('desktop-context-menu');

    this.renderDefaultIcons();
    this.setupMarqueeSelection();
    this.setupContextMenu();
  }

  renderDefaultIcons() {
    const desktopIcons = [
      { id: 'my-computer', label: 'My Computer', icon: Win98Icons.computer, action: () => window.appLauncher.openExplorer('C:') },
      { id: 'my-documents', label: 'My Documents', icon: Win98Icons.folder, action: () => window.appLauncher.openExplorer('C:\\My Documents') },
      { id: 'internet-explorer', label: 'Internet Explorer', icon: Win98Icons.ie, action: () => window.appLauncher.openIE() },
      { id: 'recycle-bin', label: 'Recycle Bin', icon: Win98Icons.trashEmpty, action: () => window.appLauncher.openRecycleBin() },
      { id: 'cmd-prompt', label: 'MS-DOS Prompt', icon: Win98Icons.dos, action: () => window.appLauncher.openDOS() },
      { id: 'paint', label: 'MS Paint', icon: Win98Icons.paint, action: () => window.appLauncher.openPaint() },
      { id: 'winamp', label: 'Winamp', icon: Win98Icons.winamp, action: () => window.appLauncher.openWinamp() },
      { id: 'minesweeper', label: 'Minesweeper', icon: Win98Icons.minesweeper, action: () => window.appLauncher.openMinesweeper() },
      { id: 'solitaire', label: 'Solitaire', icon: Win98Icons.solitaire, action: () => window.appLauncher.openSolitaire() },
      { id: 'doom98', label: 'Doom 98 3D', icon: Win98Icons.doom, action: () => window.appLauncher.openRaycaster() },
      { id: 'pinball', label: 'Space Cadet', icon: Win98Icons.pinball, action: () => window.appLauncher.openPinball() },
      { id: 'y2k-diary', label: 'Y2K Diary.txt', icon: Win98Icons.textDoc, action: () => window.appLauncher.openNotepad('C:\\My Documents\\1999\\diary_december_1999_y2k.txt') },
      { id: 'secret-vault', label: 'Secret Vault', icon: Win98Icons.folder, action: () => window.appLauncher.openExplorer('C:\\My Documents\\Secret_Vault') },
      { id: 'judge-portal', label: 'JUDGE_RATING.EXE', icon: Win98Icons.windowsLogo, action: () => window.judgesChaosEngine.openJudgeRatingApp() },
      { id: 'chaos-ctrl', label: 'PRANK_CONTROLS.EXE', icon: Win98Icons.calc, action: () => window.judgesChaosEngine.openPrankSettings() },
      { id: 'do-not-click', label: 'DO_NOT_CLICK.EXE', icon: Win98Icons.shutDown, action: () => window.judgesChaosEngine.spawnCascadingError('CRITICAL CATASTROPHE', 'You clicked DO_NOT_CLICK.EXE! Windows 98 memory leak triggered.') },
      { id: 'bsod-test', label: 'CRASH_TEST.EXE', icon: Win98Icons.shutDown, action: () => window.appLauncher.triggerBSOD() }
    ];

    this.iconsContainer.innerHTML = '';
    desktopIcons.forEach(cfg => {
      const iconEl = document.createElement('div');
      iconEl.className = 'desktop-icon';
      iconEl.id = `icon_${cfg.id}`;
      iconEl.innerHTML = `
        <img class="desktop-icon-img" src="${cfg.icon}" alt="" />
        <span class="desktop-icon-label">${cfg.label}</span>
      `;

      // Selection on click
      iconEl.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectSingle(iconEl);
      });

      // Double click launch
      iconEl.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        window.win98Audio.playClick();
        cfg.action();
      });

      // Drag icon on desktop
      this.makeDraggable(iconEl);

      this.iconsContainer.appendChild(iconEl);
    });
  }

  selectSingle(iconEl) {
    this.clearSelection();
    iconEl.classList.add('selected');
    this.selectedIcons.add(iconEl);
  }

  clearSelection() {
    this.selectedIcons.forEach(el => el.classList.remove('selected'));
    this.selectedIcons.clear();
  }

  makeDraggable(iconEl) {
    let isDragging = false;
    let startX = 0, startY = 0;
    let initialX = 0, initialY = 0;

    iconEl.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      const rect = iconEl.getBoundingClientRect();
      initialX = rect.left;
      initialY = rect.top;

      const onMouseMove = (ev) => {
        if (!isDragging) return;
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        iconEl.style.position = 'absolute';
        iconEl.style.left = Math.max(0, initialX + dx) + 'px';
        iconEl.style.top = Math.max(0, Math.min(window.innerHeight - 80, initialY + dy)) + 'px';
      };

      const onMouseUp = () => {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  setupMarqueeSelection() {
    let isSelecting = false;
    let startX = 0, startY = 0;

    this.desktopEl.addEventListener('mousedown', (e) => {
      if (e.target !== this.desktopEl && e.target !== this.iconsContainer) return;
      if (e.button !== 0) return;

      this.clearSelection();
      this.hideContextMenu();

      isSelecting = true;
      startX = e.clientX;
      startY = e.clientY;

      this.selectionBox.style.left = startX + 'px';
      this.selectionBox.style.top = startY + 'px';
      this.selectionBox.style.width = '0px';
      this.selectionBox.style.height = '0px';
      this.selectionBox.style.display = 'block';

      const onMouseMove = (ev) => {
        if (!isSelecting) return;
        const currentX = ev.clientX;
        const currentY = ev.clientY;

        const left = Math.min(startX, currentX);
        const top = Math.min(startY, currentY);
        const width = Math.abs(currentX - startX);
        const height = Math.abs(currentY - startY);

        this.selectionBox.style.left = left + 'px';
        this.selectionBox.style.top = top + 'px';
        this.selectionBox.style.width = width + 'px';
        this.selectionBox.style.height = height + 'px';

        // Check intersections with icons
        const selRect = { left, top, right: left + width, bottom: top + height };
        const iconEls = this.iconsContainer.querySelectorAll('.desktop-icon');

        iconEls.forEach(icon => {
          const r = icon.getBoundingClientRect();
          const intersects = !(r.right < selRect.left || r.left > selRect.right || r.bottom < selRect.top || r.top > selRect.bottom);
          if (intersects) {
            icon.classList.add('selected');
            this.selectedIcons.add(icon);
          } else {
            icon.classList.remove('selected');
            this.selectedIcons.delete(icon);
          }
        });
      };

      const onMouseUp = () => {
        isSelecting = false;
        this.selectionBox.style.display = 'none';
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  setupContextMenu() {
    // Desktop right click
    this.desktopEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.showContextMenu(e.clientX, e.clientY);
    });

    document.addEventListener('click', (e) => {
      if (!this.contextMenu.contains(e.target)) {
        this.hideContextMenu();
      }
    });

    // Menu Item Actions
    document.getElementById('ctx-refresh').addEventListener('click', () => {
      window.win98Audio.playClick();
      this.renderDefaultIcons();
      this.hideContextMenu();
    });

    document.getElementById('ctx-new-note').addEventListener('click', () => {
      window.win98Audio.playClick();
      window.appLauncher.openNotepad();
      this.hideContextMenu();
    });

    document.getElementById('ctx-wallpaper-teal').addEventListener('click', () => {
      this.setWallpaper('teal');
      this.hideContextMenu();
    });

    document.getElementById('ctx-wallpaper-clouds').addEventListener('click', () => {
      this.setWallpaper('clouds');
      this.hideContextMenu();
    });

    document.getElementById('ctx-wallpaper-matrix').addEventListener('click', () => {
      this.setWallpaper('matrix');
      this.hideContextMenu();
    });

    document.getElementById('ctx-properties').addEventListener('click', () => {
      window.win98Audio.playClick();
      window.appLauncher.openSystemProperties();
      this.hideContextMenu();
    });
  }

  showContextMenu(x, y) {
    this.contextMenu.style.left = Math.min(x, window.innerWidth - 180) + 'px';
    this.contextMenu.style.top = Math.min(y, window.innerHeight - 200) + 'px';
    this.contextMenu.style.display = 'block';
  }

  hideContextMenu() {
    this.contextMenu.style.display = 'none';
  }

  setWallpaper(themeKey) {
    if (this.wallpapers[themeKey]) {
      this.currentWallpaper = themeKey;
      this.desktopEl.style.background = this.wallpapers[themeKey];
      window.win98Audio.playClick();
    }
  }
}

window.desktopManager = new DesktopManager();
