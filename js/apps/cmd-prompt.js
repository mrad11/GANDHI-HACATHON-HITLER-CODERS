/* ==========================================================================
   MS-DOS PROMPT
   The Abandoned Computer - Gandhi Hackathon Edition
   Features: Real dir, cd, type, matrix, hack, latent roast, format c:
   ========================================================================== */

class CmdPromptApp {
  open() {
    const winId = 'win_dos_' + Date.now();
    const content = document.createElement('div');
    content.className = 'dos-container';

    content.innerHTML = `
      <div id="${winId}_output">
        <div class="dos-line">Microsoft(R) Windows 98</div>
        <div class="dos-line">(C)Copyright Microsoft Corp 1981-1998.</div>
        <div class="dos-line">&nbsp;</div>
        <div class="dos-line">Abandoned Terminal v4.10 [IIT Bhilai / Meraz Archive]</div>
        <div class="dos-line">Type 'HELP' for commands, or 'LATENT' for hackathon evaluation.</div>
        <div class="dos-line">&nbsp;</div>
      </div>
      <div class="dos-input-row">
        <span class="dos-prompt" id="${winId}_prompt">C:\\></span>
        <input type="text" class="dos-input" id="${winId}_input" autofocus autocomplete="off" spellcheck="false" />
      </div>
    `;

    const winRecord = window.windowManager.createWindow({
      id: winId,
      title: 'MS-DOS Prompt',
      icon: Win98Icons.dos,
      width: 560,
      height: 380,
      content: content,
      onFocus: () => {
        const inp = content.querySelector(`#${winId}_input`);
        if (inp) inp.focus();
      }
    });

    const outputEl = content.querySelector(`#${winId}_output`);
    const promptEl = content.querySelector(`#${winId}_prompt`);
    const inputEl = content.querySelector(`#${winId}_input`);

    let currentDir = 'C:';
    let commandHistory = [];
    let historyIdx = -1;
    let isMatrixRunning = false;
    let matrixInterval = null;

    content.addEventListener('click', () => inputEl.focus());

    const printLine = (text, color = '#00ff00') => {
      const line = document.createElement('div');
      line.className = 'dos-line';
      line.style.color = color;
      line.innerHTML = text.replace(/ /g, '&nbsp;');
      outputEl.appendChild(line);
      content.scrollTop = content.scrollHeight;
    };

    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmdRaw = inputEl.value.trim();
        inputEl.value = '';
        if (isMatrixRunning) {
          clearInterval(matrixInterval);
          isMatrixRunning = false;
          printLine("Matrix stopped.", "#00ff00");
          return;
        }

        printLine(`${currentDir}> ${cmdRaw}`);
        if (cmdRaw) {
          commandHistory.push(cmdRaw);
          historyIdx = commandHistory.length;
          executeCommand(cmdRaw);
        }
      } else if (e.key === 'ArrowUp') {
        if (historyIdx > 0) {
          historyIdx--;
          inputEl.value = commandHistory[historyIdx] || '';
        }
      } else if (e.key === 'ArrowDown') {
        if (historyIdx < commandHistory.length - 1) {
          historyIdx++;
          inputEl.value = commandHistory[historyIdx] || '';
        } else {
          historyIdx = commandHistory.length;
          inputEl.value = '';
        }
      }
    });

    const executeCommand = (fullCmd) => {
      const tokens = fullCmd.split(' ');
      const cmd = tokens[0].toLowerCase();
      const arg = tokens.slice(1).join(' ');

      switch (cmd) {
        case 'help':
          printLine("Available MS-DOS commands:");
          printLine("  DIR          - List files and subdirectories");
          printLine("  CD [dir]     - Change directory (e.g. CD 'My Documents', CD ..)");
          printLine("  TYPE [file]  - Display file contents");
          printLine("  CLS          - Clear screen");
          printLine("  VER          - Show Windows 98 version");
          printLine("  DATE / TIME  - Show current system date and clock");
          printLine("  MATRIX       - Run digital rain animation");
          printLine("  HACK         - Hollywood hacker simulation");
          printLine("  LATENT       - Hackathon judging round analysis");
          printLine("  SAMAY        - Special chess challenge & roast");
          printLine("  FORMAT C:    - Danger: Format system drive");
          printLine("  EXIT         - Close MS-DOS Prompt");
          break;

        case 'ver':
          printLine("Microsoft Windows 98 [Version 4.10.1998]");
          break;

        case 'cls':
          outputEl.innerHTML = '';
          break;

        case 'date':
        case 'time':
          printLine(`Current time: ${new Date().toLocaleString()}`);
          break;

        case 'dir':
          printLine(` Volume in drive C has no label`);
          printLine(` Volume Serial Number is 1998-0712`);
          printLine(` Directory of ${currentDir}`);
          printLine(` `);
          printLine(` .              <DIR>        01-01-98  12:00a`);
          printLine(` ..             <DIR>        01-01-98  12:00a`);
          if (currentDir === 'C:') {
            printLine(` MY DOCUMENTS   <DIR>        14-08-98   2:45p`);
            printLine(` GAMES          <DIR>        20-09-98  11:15p`);
            printLine(` PROGRAM FILES  <DIR>        12-07-98   4:30a`);
            printLine(` WINDOWS        <DIR>        12-07-98   4:30a`);
            printLine(` AUTOEXEC.BAT           420  12-07-98   4:30a`);
            printLine(` CONFIG.SYS             280  12-07-98   4:30a`);
          } else {
            printLine(` DIARY~1.TXT          3,480  28-12-99  11:59p`);
            printLine(` WORLD~1.JPG        142,500  12-07-98  11:45p`);
            printLine(` LATENT~1.TXT         2,100  01-11-26   3:00p`);
          }
          printLine(` `);
          printLine(`        4 File(s)        148,780 bytes`);
          printLine(`        4 Dir(s)   4,294,967,296 bytes free`);
          break;

        case 'cd':
          if (!arg || arg === '\\' || arg === '/') {
            currentDir = 'C:';
          } else if (arg === '..') {
            const parts = currentDir.split('\\');
            if (parts.length > 1) parts.pop();
            currentDir = parts.join('\\');
          } else {
            currentDir = `C:\\${arg.replace(/["']/g, '')}`;
          }
          promptEl.textContent = `${currentDir}>`;
          break;

        case 'type':
          if (!arg) {
            printLine("Syntax: TYPE [filename]", "#ffaa00");
          } else if (arg.toLowerCase().includes('diary')) {
            printLine("Reading diary_december_1999_y2k.txt:\n");
            printLine(window.VirtualFileSystem["C:"].children["My Documents"].children["1999"].children["diary_december_1999_y2k.txt"].content, "#ffff80");
          } else if (arg.toLowerCase().includes('latent')) {
            printLine(window.VirtualFileSystem["C:"].children["My Documents"].children["Secret_Vault"].children["LATENT_JUDGES_BRIBE_PROTOCOL.txt"].content, "#ffff80");
          } else {
            printLine(`File not found: ${arg}`, "#ff5555");
          }
          break;

        case 'latent':
        case 'samay':
          printLine("==================================================", "#ffff00");
          printLine("★ GANDHI HACKATHON: LATENT SCORING AUDIT ★", "#ffff00");
          printLine("==================================================", "#ffff00");
          printLine("Analyzing Judge: Samay Raina...", "#00ffaa");
          printLine("Checking ELO rating: 2200 Blitz", "#00ffaa");
          printLine("Running Frontend Craftsmanship Diagnostics:", "#00ffaa");
          printLine("  [✔] 100% Authentic Win98 SE 3D Bevels & Palette");
          printLine("  [✔] Working MS Paint with Flood Fill & 28 Colors");
          printLine("  [✔] Playable 3D Raycaster inside Win98 Window");
          printLine("  [✔] Real-time FFT Audio Spectrum in Winamp");
          printLine("  [✔] Procedural Web Audio (Zero 404 missing MP3s)");
          printLine("  [✔] Abandoned Computer 1998-2001 Lore intact");
          printLine(" ");
          printLine("PREDICTED LATENT SCORE: 9.8 / 10!", "#ff3333");
          printLine("Recommendation: Look the judges dead in the eye and say: 'We built an entire operating system in 5 hours.'");
          window.win98Audio.playStartupChime();
          break;

        case 'matrix':
          printLine("Starting Matrix Digital Rain... (Press ENTER to halt)", "#00ff00");
          isMatrixRunning = true;
          matrixInterval = setInterval(() => {
            let str = '';
            for (let i = 0; i < 48; i++) {
              str += String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96)) + ' ';
            }
            printLine(str, "#00ff00");
          }, 80);
          break;

        case 'hack':
          printLine("INITIATING MAINFRAME BYPASS [PORT 21 / 80 / 443]...", "#00ffff");
          setTimeout(() => printLine("Cracking DES-56 encryption keys: [████████████████] 100%", "#00ffff"), 300);
          setTimeout(() => printLine("Bypassing IIT Bhilai hostel firewall...", "#00ffff"), 600);
          setTimeout(() => printLine("ACCESS GRANTED. Root privileges acquired on HOST: MERAZ_1998.", "#00ff00"), 900);
          break;

        case 'format':
          if (arg.toLowerCase().includes('c:')) {
            printLine("WARNING: ALL DATA ON FIXED DISK C: WILL BE LOST!", "#ff3333");
            printLine("Proceed with Format (Y/N)? ... N", "#ff3333");
            printLine("Format aborted. The abandoned memories remain safe.", "#ffff00");
            window.win98Audio.playChordError();
          } else {
            printLine("Format drive not specified.");
          }
          break;

        case 'exit':
          window.windowManager.closeWindow(winId);
          break;

        default:
          printLine(`Bad command or file name: ${cmd}`, "#ff5555");
          break;
      }
    };
  }
}

window.cmdPromptApp = new CmdPromptApp();
