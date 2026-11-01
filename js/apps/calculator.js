/* ==========================================================================
   WINDOWS 98 CALCULATOR
   The Abandoned Computer - Gandhi Hackathon Edition
   ========================================================================== */

class CalculatorApp {
  open() {
    const winId = 'win_calc_' + Date.now();
    const content = document.createElement('div');
    content.className = 'calc-container';

    content.innerHTML = `
      <div class="window-menubar">
        <div class="menubar-item">Edit</div>
        <div class="menubar-item">View</div>
        <div class="menubar-item">Help</div>
      </div>
      <div class="calc-display" id="${winId}_disp">0.</div>
      <div class="calc-grid">
        <button class="calc-btn red" id="${winId}_btn_back">Back</button>
        <button class="calc-btn red" id="${winId}_btn_ce">CE</button>
        <button class="calc-btn red" id="${winId}_btn_c">C</button>
        <button class="calc-btn" style="visibility: hidden;"></button>
        <button class="calc-btn" style="visibility: hidden;"></button>

        <button class="calc-btn red" id="${winId}_btn_mc">MC</button>
        <button class="calc-btn blue" data-val="7">7</button>
        <button class="calc-btn blue" data-val="8">8</button>
        <button class="calc-btn blue" data-val="9">9</button>
        <button class="calc-btn red" data-op="/">/</button>

        <button class="calc-btn red" id="${winId}_btn_mr">MR</button>
        <button class="calc-btn blue" data-val="4">4</button>
        <button class="calc-btn blue" data-val="5">5</button>
        <button class="calc-btn blue" data-val="6">6</button>
        <button class="calc-btn red" data-op="*">*</button>

        <button class="calc-btn red" id="${winId}_btn_ms">MS</button>
        <button class="calc-btn blue" data-val="1">1</button>
        <button class="calc-btn blue" data-val="2">2</button>
        <button class="calc-btn blue" data-val="3">3</button>
        <button class="calc-btn red" data-op="-">-</button>

        <button class="calc-btn red" id="${winId}_btn_mplus">M+</button>
        <button class="calc-btn blue" data-val="0">0</button>
        <button class="calc-btn blue" id="${winId}_btn_pm">+/-</button>
        <button class="calc-btn blue" data-val=".">.</button>
        <button class="calc-btn red" data-op="+">+</button>
      </div>
      <div style="display: flex; gap: 4px; margin-top: 4px;">
        <button class="calc-btn red" id="${winId}_btn_sqrt" style="flex: 1;">sqrt</button>
        <button class="calc-btn red" id="${winId}_btn_inv" style="flex: 1;">1/x</button>
        <button class="calc-btn red" id="${winId}_btn_eq" style="flex: 2; color: #ff0000; font-size: 14px;">=</button>
      </div>
    `;

    window.windowManager.createWindow({
      id: winId,
      title: 'Calculator',
      icon: Win98Icons.calc,
      width: 240,
      height: 270,
      resizable: false,
      content: content
    });

    const display = content.querySelector(`#${winId}_disp`);
    let currentInput = '0';
    let prevVal = null;
    let pendingOp = null;
    let resetOnNext = false;
    let memoryVal = 0;

    const updateDisplay = () => {
      display.textContent = currentInput.includes('.') ? currentInput : currentInput + '.';
    };

    content.querySelectorAll('[data-val]').forEach(btn => {
      btn.addEventListener('click', () => {
        window.win98Audio.playClick();
        const v = btn.getAttribute('data-val');
        if (resetOnNext) {
          currentInput = v === '.' ? '0.' : v;
          resetOnNext = false;
        } else {
          if (v === '.' && currentInput.includes('.')) return;
          currentInput = currentInput === '0' && v !== '.' ? v : currentInput + v;
        }
        updateDisplay();
      });
    });

    content.querySelectorAll('[data-op]').forEach(btn => {
      btn.addEventListener('click', () => {
        window.win98Audio.playClick();
        const op = btn.getAttribute('data-op');
        if (pendingOp && !resetOnNext) {
          compute();
        }
        prevVal = parseFloat(currentInput);
        pendingOp = op;
        resetOnNext = true;
      });
    });

    const compute = () => {
      if (pendingOp === null || prevVal === null) return;
      const curr = parseFloat(currentInput);
      let res = 0;
      switch (pendingOp) {
        case '+': res = prevVal + curr; break;
        case '-': res = prevVal - curr; break;
        case '*': res = prevVal * curr; break;
        case '/': res = curr !== 0 ? prevVal / curr : 'Cannot divide by zero'; break;
      }
      currentInput = res.toString();
      pendingOp = null;
      prevVal = null;
      resetOnNext = true;
      updateDisplay();
    };

    content.querySelector(`#${winId}_btn_eq`).addEventListener('click', () => {
      window.win98Audio.playClick();
      compute();
    });

    content.querySelector(`#${winId}_btn_c`).addEventListener('click', () => {
      currentInput = '0';
      prevVal = null;
      pendingOp = null;
      resetOnNext = false;
      updateDisplay();
    });

    content.querySelector(`#${winId}_btn_ce`).addEventListener('click', () => {
      currentInput = '0';
      updateDisplay();
    });

    content.querySelector(`#${winId}_btn_back`).addEventListener('click', () => {
      currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
      updateDisplay();
    });

    content.querySelector(`#${winId}_btn_pm`).addEventListener('click', () => {
      currentInput = (parseFloat(currentInput) * -1).toString();
      updateDisplay();
    });

    content.querySelector(`#${winId}_btn_sqrt`).addEventListener('click', () => {
      const v = parseFloat(currentInput);
      currentInput = v >= 0 ? Math.sqrt(v).toString() : 'Invalid input';
      resetOnNext = true;
      updateDisplay();
    });

    content.querySelector(`#${winId}_btn_inv`).addEventListener('click', () => {
      const v = parseFloat(currentInput);
      currentInput = v !== 0 ? (1 / v).toString() : 'Cannot divide by zero';
      resetOnNext = true;
      updateDisplay();
    });
  }
}

window.calculatorApp = new CalculatorApp();
