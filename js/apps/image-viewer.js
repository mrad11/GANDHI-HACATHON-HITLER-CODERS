/* ==========================================================================
   IMAGE & MEMORY VIEWER
   The Abandoned Computer - Gandhi Hackathon Edition
   ========================================================================== */

class ImageViewerApp {
  open(title, imgDataUri, caption = '') {
    const winId = 'win_img_' + Date.now();
    const content = document.createElement('div');
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.height = '100%';
    content.style.background = '#808080';

    content.innerHTML = `
      <div class="app-toolbar">
        <button class="toolbar-btn img-btn-zoom-in">🔍+ Zoom In</button>
        <button class="toolbar-btn img-btn-zoom-out">🔍- Zoom Out</button>
        <button class="toolbar-btn img-btn-actual">Actual Size</button>
      </div>
      <div style="flex: 1; display: flex; align-items: center; justify-content: center; overflow: auto; padding: 12px;">
        <img class="viewer-img" src="${imgDataUri}" style="max-width: 100%; max-height: 240px; box-shadow: 2px 2px 8px rgba(0,0,0,0.5); background: #fff;" alt="" />
      </div>
      <div class="window-statusbar" style="background: var(--btn-face);">
        <div class="statusbar-panel" style="flex: 1;">${caption || title}</div>
      </div>
    `;

    window.windowManager.createWindow({
      id: winId,
      title: `${title} - Imaging for Windows 98`,
      icon: Win98Icons.image,
      width: 480,
      height: 380,
      content: content
    });

    const imgEl = content.querySelector('.viewer-img');
    let scale = 1.0;

    content.querySelector('.img-btn-zoom-in').addEventListener('click', () => {
      scale = Math.min(2.5, scale + 0.25);
      imgEl.style.transform = `scale(${scale})`;
      window.win98Audio.playClick();
    });

    content.querySelector('.img-btn-zoom-out').addEventListener('click', () => {
      scale = Math.max(0.5, scale - 0.25);
      imgEl.style.transform = `scale(${scale})`;
      window.win98Audio.playClick();
    });

    content.querySelector('.img-btn-actual').addEventListener('click', () => {
      scale = 1.0;
      imgEl.style.transform = 'scale(1)';
      window.win98Audio.playClick();
    });
  }
}

window.imageViewerApp = new ImageViewerApp();
