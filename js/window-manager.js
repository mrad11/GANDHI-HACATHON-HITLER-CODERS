/* ==========================================================================
   WINDOW MANAGER (Multi-Tasking, Dragging, Resizing, Z-Index, Taskbar Sync)
   The Abandoned Computer - Gandhi Hackathon Edition
   ========================================================================== */

class WindowManager {
  constructor() {
    this.windows = new Map();
    this.activeWindowId = null;
    this.highestZ = 100;
    this.desktopEl = null;
    this.taskListEl = null;
    this.cascadeOffset = 0;
  }

  init() {
    this.desktopEl = document.getElementById('desktop');
    this.taskListEl = document.getElementById('task-list');

    // Desktop click unfocus
    this.desktopEl.addEventListener('mousedown', (e) => {
      if (e.target === this.desktopEl || e.target.classList.contains('desktop-icons-container')) {
        this.unfocusAll();
      }
    });
  }

  createWindow(options) {
    const {
      id = 'win_' + Date.now(),
      title = 'Application',
      icon = Win98Icons.windowsLogo,
      width = 480,
      height = 340,
      minWidth = 240,
      minHeight = 160,
      x = 50 + (this.cascadeOffset % 10) * 25,
      y = 40 + (this.cascadeOffset % 10) * 25,
      resizable = true,
      content = '',
      onClose = null,
      onFocus = null
    } = options;

    this.cascadeOffset++;

    // If window already exists, bring to front and unminimize
    if (this.windows.has(id)) {
      const existing = this.windows.get(id);
      this.restoreWindow(id);
      this.bringToFront(id);
      return existing;
    }

    // Build DOM
    const winEl = document.createElement('div');
    winEl.className = 'win98-window';
    winEl.id = id;
    winEl.style.width = width + 'px';
    winEl.style.height = height + 'px';
    winEl.style.left = Math.min(x, window.innerWidth - width - 20) + 'px';
    winEl.style.top = Math.min(y, window.innerHeight - height - 60) + 'px';

    winEl.innerHTML = `
      <div class="window-titlebar">
        <div class="titlebar-left">
          <img class="titlebar-icon" src="${icon}" alt="" />
          <span class="titlebar-text">${title}</span>
        </div>
        <div class="titlebar-controls">
          <button class="title-btn title-btn-min" title="Minimize">_</button>
          <button class="title-btn title-btn-max" title="Maximize">□</button>
          <button class="title-btn title-btn-close" title="Close">✕</button>
        </div>
      </div>
      <div class="window-content" id="${id}_content"></div>
      ${resizable ? `
        <div class="resize-handle resize-r"></div>
        <div class="resize-handle resize-b"></div>
        <div class="resize-handle resize-rb"></div>
      ` : ''}
    `;

    const contentEl = winEl.querySelector(`#${id}_content`);
    if (typeof content === 'string') {
      contentEl.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      contentEl.appendChild(content);
    }

    this.desktopEl.appendChild(winEl);

    // Create Taskbar Item
    const taskItem = document.createElement('button');
    taskItem.className = 'task-item';
    taskItem.id = `task_${id}`;
    taskItem.innerHTML = `
      <img src="${icon}" alt="" />
      <span>${title}</span>
    `;
    this.taskListEl.appendChild(taskItem);

    const winRecord = {
      id,
      el: winEl,
      taskItem,
      title,
      icon,
      isMaximized: false,
      isMinimized: false,
      prevBounds: { width, height, left: x, top: y },
      onClose,
      onFocus
    };

    this.windows.set(id, winRecord);

    // Bind Window Events
    this.setupWindowInteractions(winRecord, resizable);

    this.bringToFront(id);
    return winRecord;
  }

  setupWindowInteractions(winRecord, resizable) {
    const { id, el, taskItem } = winRecord;
    const titlebar = el.querySelector('.window-titlebar');
    const minBtn = el.querySelector('.title-btn-min');
    const maxBtn = el.querySelector('.title-btn-max');
    const closeBtn = el.querySelector('.title-btn-close');

    // Click on window focuses it
    el.addEventListener('mousedown', () => {
      this.bringToFront(id);
    });

    // Taskbar button click toggles minimize / focus
    taskItem.addEventListener('click', () => {
      window.win98Audio.playClick();
      if (winRecord.isMinimized) {
        this.restoreWindow(id);
        this.bringToFront(id);
      } else if (this.activeWindowId === id) {
        this.minimizeWindow(id);
      } else {
        this.bringToFront(id);
      }
    });

    // Minimize Button
    minBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.win98Audio.playClick();
      this.minimizeWindow(id);
    });

    // Maximize / Restore Button
    maxBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.win98Audio.playClick();
      this.toggleMaximize(id);
    });

    // Double click titlebar maximizes
    titlebar.addEventListener('dblclick', () => {
      if (resizable) {
        this.toggleMaximize(id);
      }
    });

    // Close Button
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.win98Audio.playClick();
      this.closeWindow(id);
    });

    // Dragging Logic
    let isDragging = false;
    let dragStartX = 0, dragStartY = 0;
    let initialLeft = 0, initialTop = 0;

    titlebar.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('title-btn')) return;
      if (winRecord.isMaximized) return;

      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      initialLeft = el.offsetLeft;
      initialTop = el.offsetTop;
      this.bringToFront(id);

      const onMouseMove = (ev) => {
        if (!isDragging) return;
        const dx = ev.clientX - dragStartX;
        const dy = ev.clientY - dragStartY;
        const newLeft = Math.max(-el.offsetWidth + 80, Math.min(window.innerWidth - 80, initialLeft + dx));
        const newTop = Math.max(0, Math.min(window.innerHeight - 60, initialTop + dy));
        el.style.left = newLeft + 'px';
        el.style.top = newTop + 'px';
      };

      const onMouseUp = () => {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    // Resizing Logic
    if (resizable) {
      const rHandle = el.querySelector('.resize-r');
      const bHandle = el.querySelector('.resize-b');
      const rbHandle = el.querySelector('.resize-rb');

      const setupResizer = (handle, resizeX, resizeY) => {
        handle.addEventListener('mousedown', (e) => {
          e.stopPropagation();
          if (winRecord.isMaximized) return;

          let startX = e.clientX;
          let startY = e.clientY;
          let startW = el.offsetWidth;
          let startH = el.offsetHeight;

          const onResizing = (ev) => {
            if (resizeX) {
              const newW = Math.max(200, startW + (ev.clientX - startX));
              el.style.width = newW + 'px';
            }
            if (resizeY) {
              const newH = Math.max(140, startH + (ev.clientY - startY));
              el.style.height = newH + 'px';
            }
          };

          const onStopResize = () => {
            document.removeEventListener('mousemove', onResizing);
            document.removeEventListener('mouseup', onStopResize);
          };

          document.addEventListener('mousemove', onResizing);
          document.addEventListener('mouseup', onStopResize);
        });
      };

      if (rHandle) setupResizer(rHandle, true, false);
      if (bHandle) setupResizer(bHandle, false, true);
      if (rbHandle) setupResizer(rbHandle, true, true);
    }
  }

  bringToFront(id) {
    if (!this.windows.has(id)) return;
    const winRecord = this.windows.get(id);

    // Unfocus previously active
    if (this.activeWindowId && this.activeWindowId !== id && this.windows.has(this.activeWindowId)) {
      const prev = this.windows.get(this.activeWindowId);
      prev.el.classList.remove('active');
      prev.taskItem.classList.remove('active');
    }

    this.highestZ += 2;
    winRecord.el.style.zIndex = this.highestZ;
    winRecord.el.classList.add('active');
    winRecord.taskItem.classList.add('active');
    this.activeWindowId = id;

    if (winRecord.onFocus) {
      winRecord.onFocus();
    }
  }

  unfocusAll() {
    if (this.activeWindowId && this.windows.has(this.activeWindowId)) {
      const prev = this.windows.get(this.activeWindowId);
      prev.el.classList.remove('active');
      prev.taskItem.classList.remove('active');
      this.activeWindowId = null;
    }
  }

  minimizeWindow(id) {
    if (!this.windows.has(id)) return;
    const winRecord = this.windows.get(id);
    winRecord.isMinimized = true;
    winRecord.el.style.display = 'none';
    winRecord.el.classList.remove('active');
    winRecord.taskItem.classList.remove('active');

    if (this.activeWindowId === id) {
      this.activeWindowId = null;
      // Focus another visible window if available
      for (const [otherId, other] of this.windows.entries()) {
        if (!other.isMinimized && otherId !== id) {
          this.bringToFront(otherId);
          break;
        }
      }
    }
  }

  restoreWindow(id) {
    if (!this.windows.has(id)) return;
    const winRecord = this.windows.get(id);
    winRecord.isMinimized = false;
    winRecord.el.style.display = 'flex';
  }

  toggleMaximize(id) {
    if (!this.windows.has(id)) return;
    const winRecord = this.windows.get(id);
    const { el } = winRecord;

    if (!winRecord.isMaximized) {
      winRecord.prevBounds = {
        width: el.offsetWidth,
        height: el.offsetHeight,
        left: el.offsetLeft,
        top: el.offsetTop
      };
      el.style.left = '0px';
      el.style.top = '0px';
      el.style.width = '100%';
      el.style.height = 'calc(100vh - 28px)';
      winRecord.isMaximized = true;
      el.querySelector('.title-btn-max').textContent = '❐';
    } else {
      el.style.left = winRecord.prevBounds.left + 'px';
      el.style.top = winRecord.prevBounds.top + 'px';
      el.style.width = winRecord.prevBounds.width + 'px';
      el.style.height = winRecord.prevBounds.height + 'px';
      winRecord.isMaximized = false;
      el.querySelector('.title-btn-max').textContent = '□';
    }
  }

  closeWindow(id) {
    if (!this.windows.has(id)) return;
    const winRecord = this.windows.get(id);

    if (winRecord.onClose) {
      winRecord.onClose();
    }

    winRecord.el.remove();
    winRecord.taskItem.remove();
    this.windows.delete(id);

    if (this.activeWindowId === id) {
      this.activeWindowId = null;
      // Focus previous window
      const remaining = Array.from(this.windows.values()).filter(w => !w.isMinimized);
      if (remaining.length > 0) {
        this.bringToFront(remaining[remaining.length - 1].id);
      }
    }
  }
}

window.windowManager = new WindowManager();
