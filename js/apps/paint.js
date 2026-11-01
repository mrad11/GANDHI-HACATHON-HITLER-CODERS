/* ==========================================================================
   MS PAINT 98
   The Abandoned Computer - Gandhi Hackathon Edition
   Features: 16 Tools, Flood Fill, 28-Color Palette, Undo, Save Image
   ========================================================================== */

class PaintApp {
  open() {
    const winId = 'win_paint_' + Date.now();
    const content = document.createElement('div');
    content.className = 'paint-container';

    const colors = [
      '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080',
      '#808040', '#004040', '#0080ff', '#004080', '#8000ff', '#804000',
      '#ffffff', '#c0c0c0', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff',
      '#ffff80', '#00ff80', '#80ffff', '#7f7fff', '#ff0080', '#ff8040'
    ];

    content.innerHTML = `
      <div class="window-menubar">
        <div class="menubar-item" id="${winId}_m_file">File
          <div class="menubar-dropdown">
            <div class="dropdown-item" id="${winId}_act_new">New</div>
            <div class="dropdown-item" id="${winId}_act_save">Save As PNG...</div>
            <div class="dropdown-separator"></div>
            <div class="dropdown-item" id="${winId}_act_clear">Clear Image</div>
          </div>
        </div>
        <div class="menubar-item" id="${winId}_m_edit">Edit
          <div class="menubar-dropdown">
            <div class="dropdown-item" id="${winId}_act_undo">Undo (Ctrl+Z)</div>
          </div>
        </div>
        <div class="menubar-item">View</div>
        <div class="menubar-item">Image</div>
        <div class="menubar-item">Colors</div>
        <div class="menubar-item">Help</div>
      </div>
      <div class="paint-workspace">
        <div class="paint-toolbox" id="${winId}_tools">
          <button class="paint-tool-btn" data-tool="select" title="Select">⬚</button>
          <button class="paint-tool-btn" data-tool="eraser" title="Eraser">▧</button>
          <button class="paint-tool-btn" data-tool="bucket" title="Fill With Color">🪣</button>
          <button class="paint-tool-btn" data-tool="picker" title="Pick Color">💉</button>
          <button class="paint-tool-btn" data-tool="magnifier" title="Magnifier">🔍</button>
          <button class="paint-tool-btn active" data-tool="pencil" title="Pencil">✏</button>
          <button class="paint-tool-btn" data-tool="brush" title="Brush">🖌</button>
          <button class="paint-tool-btn" data-tool="airbrush" title="Airbrush">💨</button>
          <button class="paint-tool-btn" data-tool="text" title="Text">A</button>
          <button class="paint-tool-btn" data-tool="line" title="Line">╲</button>
          <button class="paint-tool-btn" data-tool="curve" title="Curve">⌒</button>
          <button class="paint-tool-btn" data-tool="rect" title="Rectangle">▭</button>
          <button class="paint-tool-btn" data-tool="poly" title="Polygon">⬡</button>
          <button class="paint-tool-btn" data-tool="ellipse" title="Ellipse">⬭</button>
          <button class="paint-tool-btn" data-tool="roundrect" title="Rounded Rectangle">▢</button>
        </div>
        <div class="paint-canvas-viewport">
          <canvas id="${winId}_canvas" class="paint-canvas" width="460" height="300"></canvas>
        </div>
      </div>
      <div class="paint-palette-bar">
        <div class="color-current-box">
          <div class="color-primary" id="${winId}_c_primary" style="background: #000000;"></div>
          <div class="color-secondary" id="${winId}_c_secondary" style="background: #ffffff;"></div>
        </div>
        <div class="paint-palette-grid" id="${winId}_palette"></div>
      </div>
      <div class="window-statusbar">
        <div class="statusbar-panel" id="${winId}_status" style="flex: 1;">For Help, click Help Topics on the Help Menu.</div>
        <div class="statusbar-panel" id="${winId}_coords" style="width: 100px;">460x300px</div>
      </div>
    `;

    const winRecord = window.windowManager.createWindow({
      id: winId,
      title: 'untitled - Paint',
      icon: Win98Icons.paint,
      width: 580,
      height: 420,
      content: content
    });

    // Menubar toggle
    content.querySelectorAll('.menubar-item').forEach(mi => {
      mi.addEventListener('click', (e) => {
        e.stopPropagation();
        mi.classList.toggle('open');
      });
    });
    document.addEventListener('click', () => {
      content.querySelectorAll('.menubar-item').forEach(mi => mi.classList.remove('open'));
    });

    const canvas = content.querySelector(`#${winId}_canvas`);
    const ctx = canvas.getContext('2d');
    const primaryBox = content.querySelector(`#${winId}_c_primary`);
    const secondaryBox = content.querySelector(`#${winId}_c_secondary`);
    const coordsEl = content.querySelector(`#${winId}_coords`);
    const statusEl = content.querySelector(`#${winId}_status`);

    // Fill canvas background white
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let primaryColor = '#000000';
    let secondaryColor = '#ffffff';
    let currentTool = 'pencil';
    let isDrawing = false;
    let startX = 0, startY = 0;
    let undoHistory = [];

    const saveUndo = () => {
      undoHistory.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      if (undoHistory.length > 10) undoHistory.shift();
    };
    saveUndo();

    // Render 28-color palette
    const paletteGrid = content.querySelector(`#${winId}_palette`);
    colors.forEach(col => {
      const swatch = document.createElement('div');
      swatch.className = 'paint-palette-swatch';
      swatch.style.background = col;
      swatch.addEventListener('click', () => {
        primaryColor = col;
        primaryBox.style.background = col;
      });
      swatch.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        secondaryColor = col;
        secondaryBox.style.background = col;
      });
      paletteGrid.appendChild(swatch);
    });

    // Tool selection
    content.querySelectorAll('.paint-tool-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        content.querySelectorAll('.paint-tool-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTool = btn.getAttribute('data-tool');
        statusEl.textContent = `Tool: ${currentTool.toUpperCase()}`;
      });
    });

    // Flood Fill (BFS Algorithm)
    const floodFill = (startX, startY, fillHex) => {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      const hexToRgb = (hex) => {
        const num = parseInt(hex.replace('#', ''), 16);
        return [num >> 16, (num >> 8) & 255, num & 255, 255];
      };

      const targetColor = hexToRgb(fillHex);
      const idx = (startY * canvas.width + startX) * 4;
      const startR = data[idx], startG = data[idx + 1], startB = data[idx + 2], startA = data[idx + 3];

      if (startR === targetColor[0] && startG === targetColor[1] && startB === targetColor[2]) return;

      const matchStart = (p) => {
        return data[p] === startR && data[p+1] === startG && data[p+2] === startB && data[p+3] === startA;
      };

      const queue = [[startX, startY]];
      while (queue.length > 0) {
        const [x, y] = queue.pop();
        const p = (y * canvas.width + x) * 4;
        if (!matchStart(p)) continue;

        data[p] = targetColor[0];
        data[p+1] = targetColor[1];
        data[p+2] = targetColor[2];
        data[p+3] = 255;

        if (x > 0 && matchStart(p - 4)) queue.push([x - 1, y]);
        if (x < canvas.width - 1 && matchStart(p + 4)) queue.push([x + 1, y]);
        if (y > 0 && matchStart(p - canvas.width * 4)) queue.push([x, y - 1]);
        if (y < canvas.height - 1 && matchStart(p + canvas.width * 4)) queue.push([x, y + 1]);
      }

      ctx.putImageData(imgData, 0, 0);
    };

    // Canvas Events
    canvas.addEventListener('mousedown', (e) => {
      saveUndo();
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      startX = Math.floor(e.clientX - rect.left);
      startY = Math.floor(e.clientY - rect.top);

      if (currentTool === 'bucket') {
        floodFill(startX, startY, primaryColor);
        isDrawing = false;
      } else if (currentTool === 'pencil') {
        ctx.fillStyle = primaryColor;
        ctx.fillRect(startX, startY, 1, 1);
      } else if (currentTool === 'brush') {
        ctx.fillStyle = primaryColor;
        ctx.beginPath();
        ctx.arc(startX, startY, 3, 0, Math.PI * 2);
        ctx.fill();
      } else if (currentTool === 'eraser') {
        ctx.fillStyle = secondaryColor;
        ctx.fillRect(startX - 4, startY - 4, 8, 8);
      } else if (currentTool === 'text') {
        const txt = prompt('Enter text to insert:', 'Windows 98');
        if (txt) {
          ctx.font = '14px Arial';
          ctx.fillStyle = primaryColor;
          ctx.fillText(txt, startX, startY);
        }
        isDrawing = false;
      }
    });

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const currX = Math.floor(e.clientX - rect.left);
      const currY = Math.floor(e.clientY - rect.top);
      coordsEl.textContent = `${currX}, ${currY}px`;

      if (!isDrawing) return;

      if (currentTool === 'pencil') {
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(currX, currY);
        ctx.stroke();
        startX = currX;
        startY = currY;
      } else if (currentTool === 'brush') {
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(currX, currY);
        ctx.stroke();
        startX = currX;
        startY = currY;
      } else if (currentTool === 'eraser') {
        ctx.fillStyle = secondaryColor;
        ctx.fillRect(currX - 4, currY - 4, 8, 8);
      }
    });

    const onStopDraw = (e) => {
      if (!isDrawing) return;
      isDrawing = false;
      const rect = canvas.getBoundingClientRect();
      const endX = Math.floor(e.clientX - rect.left);
      const endY = Math.floor(e.clientY - rect.top);

      if (currentTool === 'line') {
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      } else if (currentTool === 'rect') {
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(Math.min(startX, endX), Math.min(startY, endY), Math.abs(endX - startX), Math.abs(endY - startY));
      } else if (currentTool === 'ellipse') {
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        const rx = Math.abs(endX - startX) / 2;
        const ry = Math.abs(endY - startY) / 2;
        ctx.ellipse(Math.min(startX, endX) + rx, Math.min(startY, endY) + ry, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    canvas.addEventListener('mouseup', onStopDraw);
    canvas.addEventListener('mouseleave', onStopDraw);

    // Actions
    content.querySelector(`#${winId}_act_undo`).addEventListener('click', () => {
      if (undoHistory.length > 1) {
        undoHistory.pop();
        const prev = undoHistory[undoHistory.length - 1];
        ctx.putImageData(prev, 0, 0);
      }
    });

    content.querySelector(`#${winId}_act_clear`).addEventListener('click', () => {
      saveUndo();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    content.querySelector(`#${winId}_act_save`).addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = 'win98_artwork.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  }
}

window.paintApp = new PaintApp();
