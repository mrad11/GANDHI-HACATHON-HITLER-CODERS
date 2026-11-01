/* ==========================================================================
   WINAMP 2.x MEDIA PLAYER
   The Abandoned Computer - Gandhi Hackathon Edition
   Features: Real-time FFT Audio Spectrum Visualizer, Chiptune Playlist
   ========================================================================== */

class WinampApp {
  open(startTrackIdx = 0) {
    const winId = 'win_winamp_' + Date.now();
    const content = document.createElement('div');
    content.className = 'winamp-container';

    content.innerHTML = `
      <div class="winamp-screen">
        <div class="winamp-track-info">
          <span id="${winId}_title" style="color: #00ff00; font-weight: bold;">WINAMP: 1. Eminem - Without Me</span>
          <span id="${winId}_kbps" style="color: #00bb00; font-size: 10px;">128 kbps 44kHz</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span id="${winId}_timer" style="color: #00ff00; font-size: 16px; font-weight: bold; font-family: monospace;">00:00</span>
          <div style="font-size: 9px; color: #888;">STEREO · MONO</div>
        </div>
        <canvas class="winamp-visualizer-canvas" id="${winId}_canvas" width="260" height="26"></canvas>
      </div>
      <div class="winamp-controls">
        <button class="winamp-btn" id="${winId}_prev" title="Previous Track">|◀</button>
        <button class="winamp-btn" id="${winId}_play" title="Play">▶</button>
        <button class="winamp-btn" id="${winId}_pause" title="Pause">❚❚</button>
        <button class="winamp-btn" id="${winId}_stop" title="Stop">■</button>
        <button class="winamp-btn" id="${winId}_next" title="Next Track">▶|</button>
      </div>
      <div style="display: flex; align-items: center; gap: 6px; padding: 0 4px;">
        <span style="font-size: 9px; color: #aaa;">VOL:</span>
        <input type="range" id="${winId}_vol" min="0" max="100" value="70" style="flex: 1; height: 10px;" />
      </div>
      <div style="background: #111; border: 1px inset #444; padding: 4px; font-size: 10px; max-height: 90px; overflow-y: auto;">
        <div style="color: #ffaa00; font-weight: bold; margin-bottom: 2px;">WINAMP PLAYLIST:</div>
        <div class="wa-track-item" data-idx="0" style="padding: 2px; cursor: pointer; color: #00ff00;">1. Eminem - Without Me (Chiptune 2002)</div>
        <div class="wa-track-item" data-idx="1" style="padding: 2px; cursor: pointer; color: #eee;">2. Darude - Sandstorm (Techno Synth 1999)</div>
        <div class="wa-track-item" data-idx="2" style="padding: 2px; cursor: pointer; color: #eee;">3. Doom - At Doom's Gate (E1M1 FM Synth)</div>
        <div class="wa-track-item" data-idx="3" style="padding: 2px; cursor: pointer; color: #eee;">4. Windows 98 Ambient Chill Chime</div>
      </div>
    `;

    const winRecord = window.windowManager.createWindow({
      id: winId,
      title: 'Winamp - It really whips the llama\'s ass!',
      icon: Win98Icons.winamp,
      width: 295,
      height: 250,
      resizable: false,
      content: content,
      onClose: () => {
        window.win98Audio.stopMusic();
        if (animId) cancelAnimationFrame(animId);
      }
    });

    const canvas = content.querySelector(`#${winId}_canvas`);
    const cCtx = canvas.getContext('2d');
    const titleEl = content.querySelector(`#${winId}_title`);
    const timerEl = content.querySelector(`#${winId}_timer`);
    const btnPlay = content.querySelector(`#${winId}_play`);
    const btnPause = content.querySelector(`#${winId}_pause`);
    const btnStop = content.querySelector(`#${winId}_stop`);
    const btnPrev = content.querySelector(`#${winId}_prev`);
    const btnNext = content.querySelector(`#${winId}_next`);
    const volSlider = content.querySelector(`#${winId}_vol`);

    let currentTrackIdx = startTrackIdx;
    let animId = null;
    let secCounter = 0;
    let timerInterval = null;

    const playCurrent = () => {
      window.win98Audio.playClick();
      secCounter = 0;
      const trackName = window.win98Audio.playChiptuneTrack(currentTrackIdx, (name, step) => {
        // Step pulse
      });
      titleEl.textContent = `${currentTrackIdx + 1}. ${trackName}`;

      if (timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        secCounter++;
        const m = Math.floor(secCounter / 60).toString().padStart(2, '0');
        const s = (secCounter % 60).toString().padStart(2, '0');
        timerEl.textContent = `${m}:${s}`;
      }, 1000);

      // Highlight playlist item
      content.querySelectorAll('.wa-track-item').forEach(el => {
        const idx = parseInt(el.getAttribute('data-idx'));
        el.style.color = idx === currentTrackIdx ? '#00ff00' : '#eeeeee';
        el.style.fontWeight = idx === currentTrackIdx ? 'bold' : 'normal';
      });
    };

    btnPlay.addEventListener('click', playCurrent);

    btnPause.addEventListener('click', () => {
      window.win98Audio.playClick();
      window.win98Audio.stopMusic();
      if (timerInterval) clearInterval(timerInterval);
    });

    btnStop.addEventListener('click', () => {
      window.win98Audio.playClick();
      window.win98Audio.stopMusic();
      if (timerInterval) clearInterval(timerInterval);
      secCounter = 0;
      timerEl.textContent = '00:00';
    });

    btnNext.addEventListener('click', () => {
      currentTrackIdx = (currentTrackIdx + 1) % 4;
      playCurrent();
    });

    btnPrev.addEventListener('click', () => {
      currentTrackIdx = (currentTrackIdx + 3) % 4;
      playCurrent();
    });

    volSlider.addEventListener('input', () => {
      window.win98Audio.setVolume(volSlider.value / 100);
    });

    content.querySelectorAll('.wa-track-item').forEach(el => {
      el.addEventListener('click', () => {
        currentTrackIdx = parseInt(el.getAttribute('data-idx'));
        playCurrent();
      });
    });

    // Real-time Visualizer Spectrum Loop
    const drawVisualizer = () => {
      animId = requestAnimationFrame(drawVisualizer);
      cCtx.fillStyle = '#001100';
      cCtx.fillRect(0, 0, canvas.width, canvas.height);

      const freqData = window.win98Audio.getVisualizerData();
      const numBars = 20;
      const barWidth = canvas.width / numBars - 2;

      for (let i = 0; i < numBars; i++) {
        let val = window.win98Audio.isPlayingMusic ? (freqData[i] || Math.floor(Math.random() * 180 + 30)) : 2;
        const barHeight = (val / 255) * canvas.height;
        const x = i * (barWidth + 2);
        const y = canvas.height - barHeight;

        // Gradient bar (Green -> Yellow -> Red)
        const grad = cCtx.createLinearGradient(0, canvas.height, 0, 0);
        grad.addColorStop(0, '#00ff00');
        grad.addColorStop(0.7, '#ffff00');
        grad.addColorStop(1, '#ff0000');

        cCtx.fillStyle = grad;
        cCtx.fillRect(x, y, barWidth, barHeight);
      }
    };
    drawVisualizer();

    if (startTrackIdx !== null) {
      playCurrent();
    }
  }
}

window.winampApp = new WinampApp();
