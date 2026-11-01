/* ==========================================================================
   WINDOWS EXPLORER & MY COMPUTER
   The Abandoned Computer - Gandhi Hackathon Edition
   ========================================================================== */

class ExplorerApp {
  constructor() {
    this.history = [];
    this.historyIdx = -1;
  }

  open(initialPath = 'C:') {
    const winId = 'win_explorer_' + Date.now();
    const isRoot = initialPath === 'C:';
    const title = isRoot ? 'My Computer' : initialPath.split('\\').pop() || 'C:';
    const icon = isRoot ? Win98Icons.computer : Win98Icons.folderOpen;

    const content = document.createElement('div');
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.height = '100%';

    content.innerHTML = `
      <div class="window-menubar">
        <div class="menubar-item">File</div>
        <div class="menubar-item">Edit</div>
        <div class="menubar-item">View</div>
        <div class="menubar-item">Go</div>
        <div class="menubar-item">Favorites</div>
        <div class="menubar-item">Help</div>
      </div>
      <div class="app-toolbar">
        <button class="toolbar-btn exp-btn-back" title="Back">⬅ Back</button>
        <button class="toolbar-btn exp-btn-forward" title="Forward">➡ Forward</button>
        <button class="toolbar-btn exp-btn-up" title="Up One Level">⬆ Up</button>
        <div class="taskbar-divider"></div>
        <button class="toolbar-btn exp-btn-cut">Cut</button>
        <button class="toolbar-btn exp-btn-copy">Copy</button>
        <button class="toolbar-btn exp-btn-paste">Paste</button>
      </div>
      <div class="ie-address-bar">
        <span style="font-weight: bold; margin-right: 4px;">Address</span>
        <input type="text" class="ie-address-input exp-address" value="${initialPath}" readonly />
      </div>
      <div class="explorer-container">
        <div class="explorer-tree" id="${winId}_tree"></div>
        <div class="explorer-file-view" id="${winId}_files"></div>
      </div>
      <div class="window-statusbar">
        <div class="statusbar-panel exp-status-count" style="flex: 1;">0 object(s)</div>
        <div class="statusbar-panel exp-status-space" style="width: 140px;">4.29 GB Free (Drive C:)</div>
      </div>
    `;

    const winRecord = window.windowManager.createWindow({
      id: winId,
      title: title,
      icon: icon,
      width: 560,
      height: 380,
      content: content
    });

    const fileView = content.querySelector(`#${winId}_files`);
    const treeView = content.querySelector(`#${winId}_tree`);
    const addressInput = content.querySelector('.exp-address');
    const statusCount = content.querySelector('.exp-status-count');
    const btnBack = content.querySelector('.exp-btn-back');
    const btnForward = content.querySelector('.exp-btn-forward');
    const btnUp = content.querySelector('.exp-btn-up');

    let currentPath = initialPath;
    const history = [initialPath];
    let hIdx = 0;

    const navigateTo = (path, recordHistory = true) => {
      currentPath = path;
      addressInput.value = path;
      if (recordHistory) {
        history.splice(hIdx + 1);
        history.push(path);
        hIdx = history.length - 1;
      }

      // Update window title
      const folderName = path.split('\\').pop() || 'C:';
      winRecord.el.querySelector('.titlebar-text').textContent = folderName === 'C:' ? 'My Computer' : folderName;

      renderFiles(path);
      renderTree(path);
    };

    btnBack.addEventListener('click', () => {
      if (hIdx > 0) {
        hIdx--;
        navigateTo(history[hIdx], false);
      }
    });

    btnForward.addEventListener('click', () => {
      if (hIdx < history.length - 1) {
        hIdx++;
        navigateTo(history[hIdx], false);
      }
    });

    btnUp.addEventListener('click', () => {
      const parts = currentPath.split('\\');
      if (parts.length > 1) {
        parts.pop();
        navigateTo(parts.join('\\'));
      }
    });

    const resolvePath = (path) => {
      const parts = path.split('\\');
      let curr = window.VirtualFileSystem;
      for (const p of parts) {
        if (!p) continue;
        if (curr[p]) {
          curr = curr[p];
        } else if (curr.children && curr.children[p]) {
          curr = curr.children[p];
        } else {
          return null;
        }
      }
      return curr;
    };

    const renderFiles = (path) => {
      fileView.innerHTML = '';
      const node = resolvePath(path);
      if (!node || !node.children) {
        fileView.innerHTML = '<div style="padding: 10px; color: #666;">This folder is empty.</div>';
        statusCount.textContent = '0 object(s)';
        return;
      }

      const items = Object.entries(node.children);
      statusCount.textContent = `${items.length} object(s)`;

      items.forEach(([name, item]) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'file-item';

        let iconSrc = Win98Icons.textDoc;
        if (item.type === 'dir') iconSrc = Win98Icons.folder;
        else if (item.type === 'image') iconSrc = Win98Icons.image;
        else if (item.type === 'audio') iconSrc = Win98Icons.winamp;
        else if (item.type === 'app') iconSrc = Win98Icons[item.icon] || Win98Icons.windowsLogo;
        else if (item.type === 'pdf') iconSrc = Win98Icons.textDoc;

        itemEl.innerHTML = `
          <img src="${iconSrc}" alt="" />
          <span>${name}</span>
        `;

        itemEl.addEventListener('click', (e) => {
          e.stopPropagation();
          fileView.querySelectorAll('.file-item').forEach(f => f.classList.remove('selected'));
          itemEl.classList.add('selected');
        });

        itemEl.addEventListener('dblclick', (e) => {
          e.stopPropagation();
          window.win98Audio.playClick();
          if (item.type === 'dir') {
            navigateTo(`${path}\\${name}`);
          } else if (item.type === 'text' || item.type === 'pdf') {
            window.appLauncher.openNotepad(`${path}\\${name}`, item.content);
          } else if (item.type === 'image') {
            window.appLauncher.openImageViewer(name, item.data, item.caption);
          } else if (item.type === 'audio') {
            window.appLauncher.openWinamp(item.trackIndex || 0);
          } else if (item.type === 'app') {
            window.appLauncher.launchApp(item.app);
          }
        });

        fileView.appendChild(itemEl);
      });
    };

    const renderTree = (activePath) => {
      treeView.innerHTML = `
        <div class="tree-node ${activePath === 'C:' ? 'selected' : ''}" data-path="C:">
          <img src="${Win98Icons.computer}" alt="" /> My Computer
        </div>
        <div style="padding-left: 14px;">
          <div class="tree-node ${activePath.includes('My Documents') ? 'selected' : ''}" data-path="C:\\My Documents">
            <img src="${Win98Icons.folder}" alt="" /> My Documents
          </div>
          <div class="tree-node ${activePath.includes('Games') ? 'selected' : ''}" data-path="C:\\Games">
            <img src="${Win98Icons.folder}" alt="" /> Games
          </div>
          <div class="tree-node ${activePath.includes('Program Files') ? 'selected' : ''}" data-path="C:\\Program Files">
            <img src="${Win98Icons.folder}" alt="" /> Program Files
          </div>
        </div>
      `;

      treeView.querySelectorAll('.tree-node').forEach(node => {
        node.addEventListener('click', () => {
          navigateTo(node.getAttribute('data-path'));
        });
      });
    };

    navigateTo(initialPath);
  }
}

window.explorerApp = new ExplorerApp();
