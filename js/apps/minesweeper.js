/* ==========================================================================
   MINESWEEPER 98
   The Abandoned Computer - Gandhi Hackathon Edition
   Features: 7-segment displays, smiley face states, recursive reveal, flag
   ========================================================================== */

class MinesweeperApp {
  open(cols = 9, rows = 9, numMines = 10) {
    const winId = 'win_mines_' + Date.now();
    const content = document.createElement('div');
    content.className = 'minesweeper-container';

    content.innerHTML = `
      <div class="window-menubar" style="width: 100%;">
        <div class="menubar-item" id="${winId}_m_game">Game
          <div class="menubar-dropdown">
            <div class="dropdown-item" id="${winId}_opt_beg">Beginner (9x9)</div>
            <div class="dropdown-item" id="${winId}_opt_int">Intermediate (16x16)</div>
            <div class="dropdown-separator"></div>
            <div class="dropdown-item" id="${winId}_opt_reset">New Game</div>
          </div>
        </div>
        <div class="menubar-item">Help</div>
      </div>
      <div class="mine-header">
        <div class="seven-seg" id="${winId}_mine_count">010</div>
        <button class="button-bevel smiley-btn" id="${winId}_face">🙂</button>
        <div class="seven-seg" id="${winId}_timer">000</div>
      </div>
      <div class="mine-grid" id="${winId}_grid"></div>
    `;

    const winRecord = window.windowManager.createWindow({
      id: winId,
      title: 'Minesweeper',
      icon: Win98Icons.minesweeper,
      width: cols === 9 ? 210 : 340,
      height: cols === 9 ? 280 : 410,
      resizable: false,
      content: content,
      onClose: () => {
        if (timerInterval) clearInterval(timerInterval);
      }
    });

    const gridEl = content.querySelector(`#${winId}_grid`);
    const faceBtn = content.querySelector(`#${winId}_face`);
    const mineCountEl = content.querySelector(`#${winId}_mine_count`);
    const timerEl = content.querySelector(`#${winId}_timer`);

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

    let grid = [];
    let gameOver = false;
    let gameWon = false;
    let timerStarted = false;
    let timerInterval = null;
    let seconds = 0;
    let flagsLeft = numMines;

    const startTimer = () => {
      if (timerStarted) return;
      timerStarted = true;
      timerInterval = setInterval(() => {
        seconds = Math.min(999, seconds + 1);
        timerEl.textContent = seconds.toString().padStart(3, '0');
      }, 1000);
    };

    const stopTimer = () => {
      if (timerInterval) clearInterval(timerInterval);
    };

    const initBoard = () => {
      stopTimer();
      timerStarted = false;
      seconds = 0;
      timerEl.textContent = '000';
      gameOver = false;
      gameWon = false;
      flagsLeft = numMines;
      mineCountEl.textContent = flagsLeft.toString().padStart(3, '0');
      faceBtn.textContent = '🙂';

      grid = [];
      gridEl.innerHTML = '';
      gridEl.style.gridTemplateColumns = `repeat(${cols}, 18px)`;
      gridEl.style.gridTemplateRows = `repeat(${rows}, 18px)`;

      for (let r = 0; r < rows; r++) {
        grid[r] = [];
        for (let c = 0; c < cols; c++) {
          grid[r][c] = {
            r, c,
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            count: 0,
            el: null
          };

          const cellEl = document.createElement('div');
          cellEl.className = 'mine-cell';
          grid[r][c].el = cellEl;

          cellEl.addEventListener('mousedown', (e) => {
            if (gameOver || gameWon) return;
            if (e.button === 0 && !grid[r][c].isFlagged && !grid[r][c].isRevealed) {
              faceBtn.textContent = '😮';
            }
          });

          cellEl.addEventListener('click', () => {
            if (gameOver || gameWon || grid[r][c].isFlagged) return;
            faceBtn.textContent = '🙂';
            startTimer();
            revealCell(r, c);
          });

          cellEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if (gameOver || gameWon || grid[r][c].isRevealed) return;
            startTimer();
            toggleFlag(r, c);
          });

          gridEl.appendChild(cellEl);
        }
      }

      // Plant Mines
      let planted = 0;
      while (planted < numMines) {
        const rr = Math.floor(Math.random() * rows);
        const cc = Math.floor(Math.random() * cols);
        if (!grid[rr][cc].isMine) {
          grid[rr][cc].isMine = true;
          planted++;
        }
      }

      // Compute Neighbor Counts
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (!grid[r][c].isMine) {
            let count = 0;
            for (let dr = -1; dr <= 1; dr++) {
              for (let dc = -1; dc <= 1; dc++) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc].isMine) {
                  count++;
                }
              }
            }
            grid[r][c].count = count;
          }
        }
      }
    };

    const toggleFlag = (r, c) => {
      const cell = grid[r][c];
      cell.isFlagged = !cell.isFlagged;
      cell.el.textContent = cell.isFlagged ? '🚩' : '';
      flagsLeft += cell.isFlagged ? -1 : 1;
      mineCountEl.textContent = flagsLeft.toString().padStart(3, '0');
      window.win98Audio.playClick();
    };

    const revealCell = (r, c) => {
      const cell = grid[r][c];
      if (cell.isRevealed || cell.isFlagged) return;

      cell.isRevealed = true;
      cell.el.classList.add('revealed');

      if (cell.isMine) {
        // Boom!
        cell.el.textContent = '💣';
        cell.el.style.background = '#ff0000';
        gameOver = true;
        stopTimer();
        faceBtn.textContent = '😵';
        window.win98Audio.playMineExplosion();

        // Reveal other mines
        for (let rr = 0; rr < rows; rr++) {
          for (let cc = 0; cc < cols; cc++) {
            if (grid[rr][cc].isMine && !grid[rr][cc].isRevealed) {
              grid[rr][cc].el.textContent = '💣';
              grid[rr][cc].el.classList.add('revealed');
            }
          }
        }
        return;
      }

      window.win98Audio.playClick();

      if (cell.count > 0) {
        cell.el.textContent = cell.count;
        cell.el.classList.add(`c-${cell.count}`);
      } else {
        // Auto-expand neighbors
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
              revealCell(nr, nc);
            }
          }
        }
      }

      checkWin();
    };

    const checkWin = () => {
      let unrevealedSafe = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (!grid[r][c].isMine && !grid[r][c].isRevealed) {
            unrevealedSafe++;
          }
        }
      }
      if (unrevealedSafe === 0) {
        gameWon = true;
        stopTimer();
        faceBtn.textContent = '😎';
        window.win98Audio.playStartupChime();
        window.clippyAssistant.setCustomText("🏆 Impressive! You cleared Minesweeper! The Latent judges must award you maximum bonus points!");
      }
    };

    document.addEventListener('mouseup', () => {
      if (!gameOver && !gameWon) faceBtn.textContent = '🙂';
    });

    faceBtn.addEventListener('click', () => {
      window.win98Audio.playClick();
      initBoard();
    });

    content.querySelector(`#${winId}_opt_beg`).addEventListener('click', () => {
      window.windowManager.closeWindow(winId);
      window.minesweeperApp.open(9, 9, 10);
    });

    content.querySelector(`#${winId}_opt_int`).addEventListener('click', () => {
      window.windowManager.closeWindow(winId);
      window.minesweeperApp.open(16, 16, 40);
    });

    content.querySelector(`#${winId}_opt_reset`).addEventListener('click', initBoard);

    initBoard();
  }
}

window.minesweeperApp = new MinesweeperApp();
