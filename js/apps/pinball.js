/* ==========================================================================
   SPACE CADET RETRO PINBALL
   The Abandoned Computer - Gandhi Hackathon Edition
   Features: 2D Arcade Physics, Bumpers, Score, Flippers
   ========================================================================== */

class PinballApp {
  open() {
    const winId = 'win_pinball_' + Date.now();
    const content = document.createElement('div');
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.alignItems = 'center';
    content.style.background = '#111';
    content.style.padding = '8px';
    content.style.height = '100%';

    content.innerHTML = `
      <div style="display: flex; justify-content: space-between; width: 100%; color: #00ff00; font-family: monospace; font-size: 13px; margin-bottom: 6px;">
        <span>SCORE: <b id="${winId}_score" style="color: #ffcc00;">000000</b></span>
        <span>BALL: <b style="color: #fff;">1 / 3</b></span>
      </div>
      <canvas id="${winId}_canvas" width="280" height="360" style="background: #000022; border: 2px outset #555;"></canvas>
      <div style="color: #aaa; font-size: 10px; margin-top: 6px; font-family: sans-serif;">
        Press <b>Z</b> for Left Flipper, <b>/</b> for Right Flipper, <b>SPACE</b> to Launch
      </div>
    `;

    let running = true;
    let animId = null;

    window.windowManager.createWindow({
      id: winId,
      title: '3D Pinball for Windows - Space Cadet',
      icon: Win98Icons.pinball,
      width: 310,
      height: 440,
      resizable: false,
      content: content,
      onClose: () => {
        running = false;
        if (animId) cancelAnimationFrame(animId);
      }
    });

    const canvas = content.querySelector(`#${winId}_canvas`);
    const ctx = canvas.getContext('2d');
    const scoreEl = content.querySelector(`#${winId}_score`);

    let ballX = 140, ballY = 120;
    let ballVx = 2.5, ballVy = 3.5;
    const ballR = 6;
    let score = 0;

    const bumpers = [
      { x: 90, y: 100, r: 16, color: '#ff0055' },
      { x: 190, y: 100, r: 16, color: '#00ccff' },
      { x: 140, y: 160, r: 18, color: '#ffff00' }
    ];

    let leftFlipperUp = false;
    let rightFlipperUp = false;

    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyZ') leftFlipperUp = true;
      if (e.code === 'Slash') rightFlipperUp = true;
      if (e.code === 'Space' && ballY > 320) {
        ballVy = -8;
        ballVx = (Math.random() - 0.5) * 6;
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'KeyZ') leftFlipperUp = false;
      if (e.code === 'Slash') rightFlipperUp = false;
    });

    const loop = () => {
      if (!running) return;

      // Update Ball Physics
      ballVy += 0.12; // gravity
      ballX += ballVx;
      ballY += ballVy;

      // Wall bounce
      if (ballX - ballR < 0) { ballX = ballR; ballVx = -ballVx * 0.9; }
      if (ballX + ballR > canvas.width) { ballX = canvas.width - ballR; ballVx = -ballVx * 0.9; }
      if (ballY - ballR < 0) { ballY = ballR; ballVy = -ballVy * 0.9; }

      // Bumper collisions
      bumpers.forEach(b => {
        const dx = ballX - b.x;
        const dy = ballY - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < ballR + b.r) {
          ballVx = (dx / dist) * 6;
          ballVy = (dy / dist) * 6;
          score += 500;
          scoreEl.textContent = score.toString().padStart(6, '0');
          window.win98Audio.playClick();
        }
      });

      // Bottom gutter bounce or reset
      if (ballY > canvas.height - 30) {
        if (ballX < 140 && leftFlipperUp) {
          ballVy = -7;
          score += 100;
          scoreEl.textContent = score.toString().padStart(6, '0');
        } else if (ballX >= 140 && rightFlipperUp) {
          ballVy = -7;
          score += 100;
          scoreEl.textContent = score.toString().padStart(6, '0');
        } else if (ballY > canvas.height) {
          // Reset ball
          ballX = 140; ballY = 50; ballVx = 2; ballVy = 2;
        }
      }

      // Draw Screen
      ctx.fillStyle = '#060618';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Starfield dots
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 20; i++) {
        ctx.fillRect((i * 37) % canvas.width, (i * 53) % canvas.height, 1, 1);
      }

      // Draw Bumpers
      bumpers.forEach(b => {
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.stroke();
      });

      // Draw Flippers
      ctx.strokeStyle = '#ff9900';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';

      // Left Flipper
      ctx.beginPath();
      ctx.moveTo(70, 330);
      ctx.lineTo(120, leftFlipperUp ? 315 : 340);
      ctx.stroke();

      // Right Flipper
      ctx.beginPath();
      ctx.moveTo(210, 330);
      ctx.lineTo(160, rightFlipperUp ? 315 : 340);
      ctx.stroke();

      // Draw Ball
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballR, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowColor = '#00ffff';
      ctx.shadowBlur = 4;

      animId = requestAnimationFrame(loop);
    };

    loop();
  }
}

window.pinballApp = new PinballApp();
