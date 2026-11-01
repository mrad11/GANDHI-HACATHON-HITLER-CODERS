/* ==========================================================================
   DOOM 98 / RETRO 3D RAYCASTER
   The Abandoned Computer - Gandhi Hackathon Edition
   Features: Real-time DDA Raycasting Engine, WASD controls, Gun Animation, HUD
   ========================================================================== */

class Raycaster3DApp {
  open() {
    const winId = 'win_doom_' + Date.now();
    const content = document.createElement('div');
    content.className = 'raycaster-container';

    content.innerHTML = `
      <canvas id="${winId}_canvas" class="raycaster-canvas" width="320" height="200"></canvas>
      <div class="raycaster-hud">
        <div class="hud-stat-box">
          <span class="hud-label">HEALTH</span>
          <span class="hud-val" id="${winId}_health">100%</span>
        </div>
        <div class="hud-stat-box">
          <span class="hud-label">ARMOR</span>
          <span class="hud-val" style="color: #3388ff;">50%</span>
        </div>
        <div class="hud-stat-box">
          <span class="hud-label">AMMO</span>
          <span class="hud-val" id="${winId}_ammo" style="color: #ffaa00;">50</span>
        </div>
        <div class="hud-stat-box">
          <span class="hud-label">CONTROLS</span>
          <span style="font-size: 10px; color: #fff;">W,A,S,D / Arrows | SPACE: Fire</span>
        </div>
      </div>
    `;

    let running = true;
    let animId = null;

    const winRecord = window.windowManager.createWindow({
      id: winId,
      title: 'Doom 98 - Abandoned Complex [DirectX 6.1]',
      icon: Win98Icons.doom,
      width: 440,
      height: 340,
      content: content,
      onClose: () => {
        running = false;
        if (animId) cancelAnimationFrame(animId);
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
      }
    });

    const canvas = content.querySelector(`#${winId}_canvas`);
    const ctx = canvas.getContext('2d');
    const ammoEl = content.querySelector(`#${winId}_ammo`);

    // Map definition (1 = stone wall, 2 = brick wall, 3 = tech wall)
    const map = [
      [1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,1,0,0,0,0,1],
      [1,0,2,2,0,0,1,0,3,3,0,1],
      [1,0,2,0,0,0,0,0,0,3,0,1],
      [1,0,0,0,0,1,1,0,0,0,0,1],
      [1,0,0,0,0,1,1,0,0,0,0,1],
      [1,0,3,0,0,0,0,0,0,2,0,1],
      [1,0,3,3,0,0,1,0,2,2,0,1],
      [1,0,0,0,0,0,1,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1]
    ];
    const mapW = 12, mapH = 10;

    let posX = 3.5, posY = 3.5;
    let dirX = -1, dirY = 0;
    let planeX = 0, planeY = 0.66;
    let ammo = 50;
    let isFiring = false;
    let fireFlash = 0;

    const keys = {};
    const onKeyDown = (e) => {
      keys[e.code] = true;
      if (e.code === 'Space' && !isFiring && ammo > 0) {
        isFiring = true;
        fireFlash = 6;
        ammo--;
        ammoEl.textContent = ammo;
        window.win98Audio.playMineExplosion();
      }
    };
    const onKeyUp = (e) => { keys[e.code] = false; };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // Main Raycasting Loop
    const loop = () => {
      if (!running) return;

      // Handle Input
      const moveSpeed = 0.05;
      const rotSpeed = 0.035;

      if (keys['KeyW'] || keys['ArrowUp']) {
        if (map[Math.floor(posY)][Math.floor(posX + dirX * moveSpeed)] === 0) posX += dirX * moveSpeed;
        if (map[Math.floor(posY + dirY * moveSpeed)][Math.floor(posX)] === 0) posY += dirY * moveSpeed;
      }
      if (keys['KeyS'] || keys['ArrowDown']) {
        if (map[Math.floor(posY)][Math.floor(posX - dirX * moveSpeed)] === 0) posX -= dirX * moveSpeed;
        if (map[Math.floor(posY - dirY * moveSpeed)][Math.floor(posX)] === 0) posY -= dirY * moveSpeed;
      }
      if (keys['KeyA'] || keys['ArrowLeft']) {
        const oldDirX = dirX;
        dirX = dirX * Math.cos(-rotSpeed) - dirY * Math.sin(-rotSpeed);
        dirY = oldDirX * Math.sin(-rotSpeed) + dirY * Math.cos(-rotSpeed);
        const oldPlaneX = planeX;
        planeX = planeX * Math.cos(-rotSpeed) - planeY * Math.sin(-rotSpeed);
        planeY = oldPlaneX * Math.sin(-rotSpeed) + planeY * Math.cos(-rotSpeed);
      }
      if (keys['KeyD'] || keys['ArrowRight']) {
        const oldDirX = dirX;
        dirX = dirX * Math.cos(rotSpeed) - dirY * Math.sin(rotSpeed);
        dirY = oldDirX * Math.sin(rotSpeed) + dirY * Math.cos(rotSpeed);
        const oldPlaneX = planeX;
        planeX = planeX * Math.cos(rotSpeed) - planeY * Math.sin(rotSpeed);
        planeY = oldPlaneX * Math.sin(rotSpeed) + planeY * Math.cos(rotSpeed);
      }

      // Render Floor & Ceiling
      ctx.fillStyle = '#222222';
      ctx.fillRect(0, 0, canvas.width, canvas.height / 2);
      ctx.fillStyle = '#3a3a3a';
      ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

      // Raycast columns
      const w = canvas.width;
      const h = canvas.height;

      for (let x = 0; x < w; x++) {
        const cameraX = (2 * x) / w - 1;
        const rayDirX = dirX + planeX * cameraX;
        const rayDirY = dirY + planeY * cameraX;

        let mapX = Math.floor(posX);
        let mapY = Math.floor(posY);

        let sideDistX, sideDistY;
        const deltaDistX = Math.abs(1 / rayDirX);
        const deltaDistY = Math.abs(1 / rayDirY);
        let perpWallDist;

        let stepX, stepY;
        let hit = 0;
        let side = 0;

        if (rayDirX < 0) {
          stepX = -1;
          sideDistX = (posX - mapX) * deltaDistX;
        } else {
          stepX = 1;
          sideDistX = (mapX + 1.0 - posX) * deltaDistX;
        }
        if (rayDirY < 0) {
          stepY = -1;
          sideDistY = (posY - mapY) * deltaDistY;
        } else {
          stepY = 1;
          sideDistY = (mapY + 1.0 - posY) * deltaDistY;
        }

        // DDA Step
        while (hit === 0) {
          if (sideDistX < sideDistY) {
            sideDistX += deltaDistX;
            mapX += stepX;
            side = 0;
          } else {
            sideDistY += deltaDistY;
            mapY += stepY;
            side = 1;
          }
          if (map[mapY][mapX] > 0) hit = 1;
        }

        if (side === 0) perpWallDist = (mapX - posX + (1 - stepX) / 2) / rayDirX;
        else perpWallDist = (mapY - posY + (1 - stepY) / 2) / rayDirY;

        const lineHeight = Math.floor(h / perpWallDist);
        let drawStart = -lineHeight / 2 + h / 2;
        if (drawStart < 0) drawStart = 0;
        let drawEnd = lineHeight / 2 + h / 2;
        if (drawEnd >= h) drawEnd = h - 1;

        // Wall Colors
        let color = '#888888';
        if (map[mapY][mapX] === 1) color = side === 1 ? '#555555' : '#777777';
        else if (map[mapY][mapX] === 2) color = side === 1 ? '#883300' : '#bb4400';
        else if (map[mapY][mapX] === 3) color = side === 1 ? '#003388' : '#0055bb';

        ctx.fillStyle = color;
        ctx.fillRect(x, drawStart, 1, drawEnd - drawStart);
      }

      // Draw Retro Gun Sprite in Center
      const gunW = 60, gunH = 50;
      const gunX = canvas.width / 2 - gunW / 2;
      const gunY = canvas.height - gunH;

      ctx.fillStyle = '#222';
      ctx.fillRect(gunX + 18, gunY + 10, 24, 40);
      ctx.fillStyle = '#666';
      ctx.fillRect(gunX + 22, gunY + 5, 16, 20);

      // Muzzle flash
      if (fireFlash > 0) {
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.arc(canvas.width / 2, gunY + 4, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ff3300';
        ctx.beginPath();
        ctx.arc(canvas.width / 2, gunY + 4, 10, 0, Math.PI * 2);
        ctx.fill();
        fireFlash--;
        if (fireFlash === 0) isFiring = false;
      }

      // Draw Mini-Map in top-left
      const mmScale = 4;
      for (let r = 0; r < mapH; r++) {
        for (let c = 0; c < mapW; c++) {
          if (map[r][c] > 0) {
            ctx.fillStyle = '#00ff00';
            ctx.fillRect(4 + c * mmScale, 4 + r * mmScale, mmScale, mmScale);
          }
        }
      }
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(4 + posX * mmScale - 1, 4 + posY * mmScale - 1, 3, 3);

      animId = requestAnimationFrame(loop);
    };

    loop();
  }
}

window.raycaster3DApp = new Raycaster3DApp();
