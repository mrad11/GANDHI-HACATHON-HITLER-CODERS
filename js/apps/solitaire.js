/* ==========================================================================
   SOLITAIRE 98 (Klondike)
   The Abandoned Computer - Gandhi Hackathon Edition
   Features: Drag & Drop, Auto-Foundation Move, Deck Flip, Win Cascade
   ========================================================================== */

class SolitaireApp {
  open() {
    const winId = 'win_sol_' + Date.now();
    const content = document.createElement('div');
    content.className = 'solitaire-table';

    content.innerHTML = `
      <div class="window-menubar" style="position: absolute; top: 0; left: 0; right: 0; background: var(--btn-face); z-index: 100;">
        <div class="menubar-item" id="${winId}_m_game">Game
          <div class="menubar-dropdown">
            <div class="dropdown-item" id="${winId}_act_deal">Deal (F2)</div>
            <div class="dropdown-separator"></div>
            <div class="dropdown-item" id="${winId}_act_exit">Exit</div>
          </div>
        </div>
        <div class="menubar-item">Help</div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; color: #fff; font-size: 11px; padding: 0 4px;">
        <div>Score: <span id="${winId}_score">0</span></div>
        <div>Time: <span id="${winId}_time">0</span>s</div>
      </div>
      <div class="sol-top-row">
        <div class="sol-stock-waste">
          <div class="sol-pile" id="${winId}_stock"></div>
          <div class="sol-pile" id="${winId}_waste"></div>
        </div>
        <div class="sol-foundations">
          <div class="sol-pile foundation" id="${winId}_f0"></div>
          <div class="sol-pile foundation" id="${winId}_f1"></div>
          <div class="sol-pile foundation" id="${winId}_f2"></div>
          <div class="sol-pile foundation" id="${winId}_f3"></div>
        </div>
      </div>
      <div class="sol-tableau" id="${winId}_tableau">
        <div class="sol-col" id="${winId}_col0"></div>
        <div class="sol-col" id="${winId}_col1"></div>
        <div class="sol-col" id="${winId}_col2"></div>
        <div class="sol-col" id="${winId}_col3"></div>
        <div class="sol-col" id="${winId}_col4"></div>
        <div class="sol-col" id="${winId}_col5"></div>
        <div class="sol-col" id="${winId}_col6"></div>
      </div>
      <canvas id="${winId}_win_canvas" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; display: none; z-index: 500;"></canvas>
    `;

    window.windowManager.createWindow({
      id: winId,
      title: 'Solitaire',
      icon: Win98Icons.solitaire,
      width: 580,
      height: 480,
      content: content,
      onClose: () => {
        if (timerInterval) clearInterval(timerInterval);
      }
    });

    const suits = ['♠', '♥', '♦', '♣'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let deck = [];
    let stock = [];
    let waste = [];
    let foundations = [[], [], [], []];
    let tableau = [[], [], [], [], [], [], []];
    let score = 0;
    let seconds = 0;
    let timerInterval = null;

    const scoreEl = content.querySelector(`#${winId}_score`);
    const timeEl = content.querySelector(`#${winId}_time`);
    const stockEl = content.querySelector(`#${winId}_stock`);
    const wasteEl = content.querySelector(`#${winId}_waste`);

    const initGame = () => {
      deck = [];
      suits.forEach(suit => {
        values.forEach((val, idx) => {
          deck.push({
            suit,
            val,
            rank: idx + 1,
            color: (suit === '♥' || suit === '♦') ? 'red' : 'black',
            faceUp: false
          });
        });
      });

      // Shuffle
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }

      foundations = [[], [], [], []];
      tableau = [[], [], [], [], [], [], []];
      waste = [];
      score = 0;
      seconds = 0;
      scoreEl.textContent = '0';
      timeEl.textContent = '0';

      if (timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        seconds++;
        timeEl.textContent = seconds;
      }, 1000);

      // Deal Tableau
      for (let c = 0; c < 7; c++) {
        for (let r = 0; r <= c; r++) {
          const card = deck.pop();
          if (r === c) card.faceUp = true;
          tableau[c].push(card);
        }
      }

      stock = deck;
      renderAll();
    };

    const renderCard = (card) => {
      const cardEl = document.createElement('div');
      cardEl.className = `sol-card ${card.faceUp ? card.color : 'back'}`;
      if (card.faceUp) {
        cardEl.innerHTML = `
          <div style="display: flex; justify-content: space-between;">
            <span>${card.val}</span><span>${card.suit}</span>
          </div>
          <div style="font-size: 20px; text-align: center;">${card.suit}</div>
          <div style="display: flex; justify-content: space-between; transform: rotate(180deg);">
            <span>${card.val}</span><span>${card.suit}</span>
          </div>
        `;
      }
      return cardEl;
    };

    const renderAll = () => {
      // Stock
      stockEl.innerHTML = '';
      if (stock.length > 0) {
        const back = document.createElement('div');
        back.className = 'sol-card back';
        stockEl.appendChild(back);
      } else {
        stockEl.innerHTML = '<div style="color: rgba(255,255,255,0.4); text-align: center; margin-top: 30px;">↺</div>';
      }

      // Waste
      wasteEl.innerHTML = '';
      if (waste.length > 0) {
        const topWaste = waste[waste.length - 1];
        const wCard = renderCard(topWaste);
        wCard.addEventListener('dblclick', () => tryMoveToFoundation(topWaste, 'waste'));
        wasteEl.appendChild(wCard);
      }

      // Foundations
      for (let f = 0; f < 4; f++) {
        const fEl = content.querySelector(`#${winId}_f${f}`);
        fEl.innerHTML = '';
        if (foundations[f].length > 0) {
          const topF = foundations[f][foundations[f].length - 1];
          fEl.appendChild(renderCard(topF));
        }
      }

      // Tableau
      for (let c = 0; c < 7; c++) {
        const colEl = content.querySelector(`#${winId}_col${c}`);
        colEl.innerHTML = '';
        tableau[c].forEach((card, idx) => {
          const cEl = renderCard(card);
          cEl.style.top = (idx * 18) + 'px';
          if (card.faceUp && idx === tableau[c].length - 1) {
            cEl.addEventListener('dblclick', () => tryMoveToFoundation(card, c));
          }
          colEl.appendChild(cEl);
        });
      }
    };

    const tryMoveToFoundation = (card, fromSource) => {
      for (let f = 0; f < 4; f++) {
        const pile = foundations[f];
        const canPlace = (pile.length === 0 && card.rank === 1) ||
                         (pile.length > 0 && pile[pile.length - 1].suit === card.suit && pile[pile.length - 1].rank === card.rank - 1);

        if (canPlace) {
          window.win98Audio.playClick();
          if (fromSource === 'waste') {
            waste.pop();
          } else {
            tableau[fromSource].pop();
            if (tableau[fromSource].length > 0) {
              tableau[fromSource][tableau[fromSource].length - 1].faceUp = true;
            }
          }
          foundations[f].push(card);
          score += 10;
          scoreEl.textContent = score;
          renderAll();
          checkWin();
          return;
        }
      }
    };

    const checkWin = () => {
      const totalFoundation = foundations.reduce((acc, pile) => acc + pile.length, 0);
      if (totalFoundation === 52) {
        triggerWinCascade();
      }
    };

    const triggerWinCascade = () => {
      if (timerInterval) clearInterval(timerInterval);
      window.win98Audio.playStartupChime();
      const winCanvas = content.querySelector(`#${winId}_win_canvas`);
      winCanvas.style.display = 'block';
      const wCtx = winCanvas.getContext('2d');
      winCanvas.width = content.offsetWidth;
      winCanvas.height = content.offsetHeight;

      let x = winCanvas.width / 2, y = 50;
      let vx = 4, vy = 1;
      const gravity = 0.5;

      const bounce = () => {
        wCtx.fillStyle = '#ffffff';
        wCtx.fillRect(x, y, 60, 84);
        wCtx.strokeStyle = '#000000';
        wCtx.strokeRect(x, y, 60, 84);
        wCtx.fillStyle = '#ff0000';
        wCtx.font = 'bold 20px Arial';
        wCtx.fillText('♥ A', x + 10, y + 30);

        x += vx;
        y += vy;
        vy += gravity;

        if (y + 84 > winCanvas.height) {
          y = winCanvas.height - 84;
          vy = -vy * 0.85;
        }
        if (x + 60 > winCanvas.width || x < 0) {
          vx = -vx;
        }

        if (winCanvas.style.display === 'block') {
          requestAnimationFrame(bounce);
        }
      };
      bounce();
    };

    stockEl.addEventListener('click', () => {
      window.win98Audio.playClick();
      if (stock.length > 0) {
        const c = stock.pop();
        c.faceUp = true;
        waste.push(c);
      } else {
        stock = waste.reverse().map(c => { c.faceUp = false; return c; });
        waste = [];
      }
      renderAll();
    });

    content.querySelector(`#${winId}_act_deal`).addEventListener('click', initGame);
    initGame();
  }
}

window.solitaireApp = new SolitaireApp();
