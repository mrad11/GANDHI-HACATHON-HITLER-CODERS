/* ==========================================================================
   NOTEPAD & WORDPAD
   The Abandoned Computer - Gandhi Hackathon Edition
   ========================================================================== */

class NotepadApp {
  open(filePath = null, initialContent = '') {
    const winId = 'win_notepad_' + Date.now();
    const fileName = filePath ? filePath.split('\\').pop() : 'Untitled';
    const content = document.createElement('div');
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.height = '100%';

    content.innerHTML = `
      <div class="window-menubar">
        <div class="menubar-item" id="${winId}_m_file">File
          <div class="menubar-dropdown">
            <div class="dropdown-item" id="${winId}_act_new">New</div>
            <div class="dropdown-item" id="${winId}_act_save">Save</div>
            <div class="dropdown-separator"></div>
            <div class="dropdown-item" id="${winId}_act_exit">Exit</div>
          </div>
        </div>
        <div class="menubar-item" id="${winId}_m_edit">Edit
          <div class="menubar-dropdown">
            <div class="dropdown-item" id="${winId}_act_timedate">Time/Date (F5)</div>
            <div class="dropdown-item" id="${winId}_act_selectall">Select All</div>
          </div>
        </div>
        <div class="menubar-item">Search</div>
        <div class="menubar-item">Help</div>
      </div>
      <textarea class="notepad-textarea" id="${winId}_text" spellcheck="false">${initialContent}</textarea>
      <div class="window-statusbar">
        <div class="statusbar-panel" style="flex: 1;" id="${winId}_status">Ready</div>
        <div class="statusbar-panel" style="width: 120px;" id="${winId}_lines">Ln 1, Col 1</div>
      </div>
    `;

    const winRecord = window.windowManager.createWindow({
      id: winId,
      title: `${fileName} - Notepad`,
      icon: Win98Icons.notepad,
      width: 480,
      height: 320,
      content: content
    });

    const textarea = content.querySelector(`#${winId}_text`);
    const linesPanel = content.querySelector(`#${winId}_lines`);

    textarea.addEventListener('keyup', () => {
      const pos = textarea.selectionStart;
      const lines = textarea.value.substr(0, pos).split('\n');
      linesPanel.textContent = `Ln ${lines.length}, Col ${lines[lines.length - 1].length + 1}`;
    });

    content.querySelectorAll('.menubar-item').forEach(mi => {
      mi.addEventListener('click', (e) => {
        e.stopPropagation();
        mi.classList.toggle('open');
      });
    });
    document.addEventListener('click', () => {
      content.querySelectorAll('.menubar-item').forEach(mi => mi.classList.remove('open'));
    });

    content.querySelector(`#${winId}_act_new`).addEventListener('click', () => {
      textarea.value = '';
    });

    content.querySelector(`#${winId}_act_timedate`).addEventListener('click', () => {
      textarea.value += ' ' + new Date().toLocaleString() + ' ';
    });

    content.querySelector(`#${winId}_act_selectall`).addEventListener('click', () => {
      textarea.select();
    });

    content.querySelector(`#${winId}_act_save`).addEventListener('click', () => {
      alert(`File "${fileName}" saved to disk successfully.`);
    });

    content.querySelector(`#${winId}_act_exit`).addEventListener('click', () => {
      window.windowManager.closeWindow(winId);
    });
  }
}

class WordPadApp {
  open() {
    const winId = 'win_wordpad_' + Date.now();
    const content = document.createElement('div');
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.height = '100%';

    content.innerHTML = `
      <div class="window-menubar">
        <div class="menubar-item">File</div>
        <div class="menubar-item">Edit</div>
        <div class="menubar-item">View</div>
        <div class="menubar-item">Insert</div>
        <div class="menubar-item">Format</div>
        <div class="menubar-item">Help</div>
      </div>
      <div class="app-toolbar">
        <select class="button-bevel" id="${winId}_font_fam" style="padding: 1px 4px; font-size: 11px;">
          <option value="Times New Roman">Times New Roman</option>
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Comic Sans MS">Comic Sans MS</option>
        </select>
        <select class="button-bevel" id="${winId}_font_size" style="padding: 1px 4px; font-size: 11px; width: 45px;">
          <option value="12px">10</option>
          <option value="14px" selected>12</option>
          <option value="18px">16</option>
          <option value="24px">20</option>
        </select>
        <button class="toolbar-btn" id="${winId}_bold" style="font-weight: bold;">B</button>
        <button class="toolbar-btn" id="${winId}_italic" style="font-style: italic;">I</button>
        <button class="toolbar-btn" id="${winId}_underline" style="text-decoration: underline;">U</button>
        <div class="taskbar-divider"></div>
        <button class="toolbar-btn" id="${winId}_align_l">Left</button>
        <button class="toolbar-btn" id="${winId}_align_c">Center</button>
        <button class="toolbar-btn" id="${winId}_align_r">Right</button>
      </div>
      <div class="wordpad-content" contenteditable="true" id="${winId}_editor">
        <h2>Gandhi Hackathon 2026 - Official Report</h2>
        <p><b>Team:</b> The Retro Pioneers</p>
        <p><b>Date:</b> November 1, 2026</p>
        <hr/>
        <p>We have successfully resurrected the 1998 Abandoned Computer found in the IIT Bhilai archives.</p>
        <p>All subsystems are operational: MS Paint, 3D Raycasting Engine, Solitaire, Minesweeper, Internet Explorer with 1998 Google Beta, and full synthesized procedural audio!</p>
      </div>
      <div class="window-statusbar">
        <div class="statusbar-panel" style="flex: 1;">For Help, press F1</div>
        <div class="statusbar-panel" style="width: 80px;">Page 1</div>
      </div>
    `;

    window.windowManager.createWindow({
      id: winId,
      title: 'Document - WordPad',
      icon: Win98Icons.wordpad,
      width: 520,
      height: 380,
      content: content
    });

    const editor = content.querySelector(`#${winId}_editor`);
    content.querySelector(`#${winId}_bold`).addEventListener('click', () => document.execCommand('bold'));
    content.querySelector(`#${winId}_italic`).addEventListener('click', () => document.execCommand('italic'));
    content.querySelector(`#${winId}_underline`).addEventListener('click', () => document.execCommand('underline'));
    content.querySelector(`#${winId}_align_l`).addEventListener('click', () => document.execCommand('justifyLeft'));
    content.querySelector(`#${winId}_align_c`).addEventListener('click', () => document.execCommand('justifyCenter'));
    content.querySelector(`#${winId}_align_r`).addEventListener('click', () => document.execCommand('justifyRight'));
  }
}

window.notepadApp = new NotepadApp();
window.wordpadApp = new WordPadApp();
