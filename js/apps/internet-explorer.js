/* ==========================================================================
   INTERNET EXPLORER 5.0
   The Abandoned Computer - Gandhi Hackathon Edition
   Features: 1998 Google Beta, GeoCities, Yahoo! 98, Dial-up Networking
   ========================================================================== */

class InternetExplorerApp {
  open(initialUrl = 'http://www.google.com') {
    const winId = 'win_ie_' + Date.now();
    const content = document.createElement('div');
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.height = '100%';

    content.innerHTML = `
      <div class="window-menubar">
        <div class="menubar-item">File</div>
        <div class="menubar-item">Edit</div>
        <div class="menubar-item">View</div>
        <div class="menubar-item">Favorites</div>
        <div class="menubar-item">Tools</div>
        <div class="menubar-item">Help</div>
      </div>
      <div class="app-toolbar" style="justify-content: space-between;">
        <div style="display: flex; gap: 2px;">
          <button class="toolbar-btn ie-btn-back">⬅ Back</button>
          <button class="toolbar-btn ie-btn-forward">➡ Forward</button>
          <button class="toolbar-btn ie-btn-stop">✕ Stop</button>
          <button class="toolbar-btn ie-btn-refresh">🔄 Refresh</button>
          <button class="toolbar-btn ie-btn-home">🏠 Home</button>
          <div class="taskbar-divider"></div>
          <button class="toolbar-btn ie-btn-dialup" style="color: #000080; font-weight: bold;">📞 Dial-Up</button>
        </div>
        <div style="width: 22px; height: 22px; display: flex; align-items: center; justify-content: center;">
          <img class="ie-spinner" src="${Win98Icons.ie}" style="width: 18px; height: 18px;" alt="" />
        </div>
      </div>
      <div class="ie-address-bar">
        <span style="font-weight: bold; margin-right: 4px;">Address</span>
        <input type="text" class="ie-address-input ie-url-bar" value="${initialUrl}" />
        <button class="button-bevel ie-btn-go" style="padding: 1px 8px; font-size: 10px;">Go</button>
      </div>
      <div class="ie-viewport" id="${winId}_viewport"></div>
      <div class="window-statusbar">
        <div class="statusbar-panel ie-status" style="flex: 1;">Done</div>
        <div class="statusbar-panel" style="width: 100px;">Internet zone</div>
      </div>
    `;

    const winRecord = window.windowManager.createWindow({
      id: winId,
      title: 'Microsoft Internet Explorer',
      icon: Win98Icons.ie,
      width: 620,
      height: 440,
      content: content
    });

    const viewport = content.querySelector(`#${winId}_viewport`);
    const urlBar = content.querySelector('.ie-url-bar');
    const statusText = content.querySelector('.ie-status');
    const btnGo = content.querySelector('.ie-btn-go');
    const btnHome = content.querySelector('.ie-btn-home');
    const btnDialup = content.querySelector('.ie-btn-dialup');
    const spinner = content.querySelector('.ie-spinner');

    const loadPage = (url) => {
      urlBar.value = url;
      statusText.textContent = `Opening page ${url}...`;
      spinner.style.transform = 'rotate(180deg)';

      setTimeout(() => {
        spinner.style.transform = 'rotate(0deg)';
        statusText.textContent = 'Done';
        renderPageContent(url);
      }, 300);
    };

    const renderPageContent = (url) => {
      viewport.innerHTML = '';
      const cleanUrl = url.toLowerCase().replace('http://', '').replace('https://', '');

      if (cleanUrl.includes('google')) {
        renderGoogle1998();
      } else if (cleanUrl.includes('geocities')) {
        renderGeocities();
      } else if (cleanUrl.includes('yahoo')) {
        renderYahoo1998();
      } else if (cleanUrl.includes('latent') || cleanUrl.includes('meraz')) {
        renderLatentPortal();
      } else {
        render404(url);
      }
    };

    const renderGoogle1998 = () => {
      viewport.innerHTML = `
        <div style="text-align: center; font-family: 'Times New Roman', serif; padding: 20px 10px;">
          <h1 style="font-size: 48px; letter-spacing: -2px; margin-bottom: 4px;">
            <span style="color: #4285f4">G</span><span style="color: #ea4335">o</span><span style="color: #fbbc05">o</span><span style="color: #4285f4">g</span><span style="color: #34a853">l</span><span style="color: #ea4335">e</span><span style="color: #4285f4">!</span>
          </h1>
          <p style="font-size: 13px; color: #555; margin-bottom: 14px;">Search the web using Google!</p>
          <div style="margin-bottom: 12px;">
            <input type="text" id="g-search-input" style="width: 280px; padding: 3px; font-size: 13px; border: 1px solid #7f9db9;" value="Windows 98" />
          </div>
          <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 20px;">
            <button class="button-bevel" id="g-search-btn">Google Search</button>
            <button class="button-bevel" id="g-lucky-btn">I'm feeling lucky</button>
          </div>
          <div style="font-size: 11px; color: #444; border-top: 1px solid #ccc; padding-top: 10px; max-width: 450px; margin: 0 auto;">
            Special Searches: <a href="#stanford" id="g-link-stanford" style="color: #0000cc;">Stanford Search</a> | <a href="#linux" id="g-link-linux" style="color: #0000cc;">Linux Search</a><br/><br/>
            Copyright ©1998 Google Inc.
          </div>
          <div id="g-results" style="text-align: left; margin-top: 20px; font-family: Arial, sans-serif; font-size: 12px;"></div>
        </div>
      `;

      const searchInput = viewport.querySelector('#g-search-input');
      const searchBtn = viewport.querySelector('#g-search-btn');
      const resultsDiv = viewport.querySelector('#g-results');

      const doSearch = () => {
        window.win98Audio.playClick();
        const q = searchInput.value.toLowerCase();
        let html = `<div style="color: #666; font-size: 11px; margin-bottom: 8px;">Showing results 1 - 3 for <b>${searchInput.value}</b> (0.04 seconds)</div>`;

        if (q.includes('latent') || q.includes('samay') || q.includes('hackathon')) {
          html += `
            <div style="margin-bottom: 14px;">
              <a href="#latent" style="color: #0000cc; font-size: 14px; font-weight: bold; text-decoration: underline;">Gandhi Hackathon 2026 - Latent Score Predictor</a>
              <div style="color: #008000; font-size: 11px;">http://meraz.iitbhilai.ac.in/latent</div>
              <div>Official comedy and evaluation arena for Meraz. Remember: Overconfident teams get roasted; accurate teams get 10/10!</div>
            </div>
          `;
        }

        html += `
          <div style="margin-bottom: 14px;">
            <a href="#win98" style="color: #0000cc; font-size: 14px; font-weight: bold; text-decoration: underline;">Microsoft Windows 98 Second Edition Overview</a>
            <div style="color: #008000; font-size: 11px;">http://www.microsoft.com/windows98/</div>
            <div>Discover the rich desktop, DirectX 6.1 gaming, USB peripheral support, and Internet Explorer 5 integrated into the shell!</div>
          </div>
          <div style="margin-bottom: 14px;">
            <a href="#y2k" style="color: #0000cc; font-size: 14px; font-weight: bold; text-decoration: underline;">Millennium Bug (Y2K) Preparedness Guide for Year 2000</a>
            <div style="color: #008000; font-size: 11px;">http://www.geocities.com/area51/y2k_survival.html</div>
            <div>Why two-digit year arithmetic will cause legacy mainframe disruption and how to hoard instant noodles.</div>
          </div>
        `;

        resultsDiv.innerHTML = html;
      };

      searchBtn.addEventListener('click', doSearch);
      searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSearch(); });
    };

    const renderGeocities = () => {
      viewport.innerHTML = `
        <div style="background: #000033; color: #ffff00; font-family: 'Comic Sans MS', cursive, sans-serif; padding: 20px; text-align: center; min-height: 100%;">
          <marquee behavior="alternate" scrollamount="4" style="font-size: 20px; color: #ff00ff; font-weight: bold; margin-bottom: 10px;">
            🔥 ★ WELCOME TO VIKRAM'S CYBER VAULT 1999 ★ 🔥
          </marquee>
          <div style="border: 2px dashed #00ffff; padding: 10px; margin-bottom: 15px; background: #000022;">
            <p style="color: #00ff00; font-size: 13px;">★ BEST VIEWED IN 800x600 RESOLUTION ON NETSCAPE NAVIGATOR ★</p>
            <p style="color: #ffaa00; font-size: 11px;">Site created on: 14-Aug-1998 | Under Construction forever 🚧</p>
          </div>
          <div style="margin: 20px 0;">
            <h2 style="color: #00ffff; text-decoration: underline;">Top 3 Reasons to Love Windows 98:</h2>
            <ol style="display: inline-block; text-align: left; color: #ffffff; font-size: 13px;">
              <li>Minesweeper is the greatest game ever engineered by humanity.</li>
              <li>Napster lets you download 1 song every 45 minutes on 56k modem!</li>
              <li>Clippy is always watching. Always.</li>
            </ol>
          </div>
          <div style="border: 1px solid #ffcc00; padding: 8px; display: inline-block; background: #111; color: #ff0000; font-family: monospace; font-size: 16px;">
            YOU ARE VISITOR NUMBER: <b>0004189</b>
          </div>
          <div style="margin-top: 25px;">
            <p style="color: #fff; font-size: 12px;">Sign my Guestbook:</p>
            <input type="text" id="gb-input" placeholder="Leave your mark..." style="width: 220px; padding: 2px;" />
            <button class="button-bevel" id="gb-submit">Sign!</button>
            <div id="gb-list" style="margin-top: 10px; color: #00ffaa; font-size: 11px;">
              <div>[HackerBoy99]: cool site bro, A/S/L?</div>
              <div>[HostelCoder]: refund canteen samosa first!!</div>
            </div>
          </div>
        </div>
      `;

      const gbInput = viewport.querySelector('#gb-input');
      const gbSubmit = viewport.querySelector('#gb-submit');
      const gbList = viewport.querySelector('#gb-list');

      gbSubmit.addEventListener('click', () => {
        if (!gbInput.value.trim()) return;
        window.win98Audio.playClick();
        const div = document.createElement('div');
        div.textContent = `[Guest_${Math.floor(Math.random()*900+100)}]: ${gbInput.value.trim()}`;
        gbList.prepend(div);
        gbInput.value = '';
      });
    };

    const renderYahoo1998 = () => {
      viewport.innerHTML = `
        <div style="font-family: Arial, sans-serif; font-size: 12px; padding: 10px;">
          <h1 style="color: #cc0000; font-size: 32px; font-family: 'Times New Roman', serif; margin-bottom: 8px;">YAHOO!</h1>
          <div style="background: #ffffcc; border: 1px solid #cccc99; padding: 6px; margin-bottom: 12px;">
            <b>What's New</b> · <b>Check Email</b> · <b>Yahoo! Chat</b> · <b>Stock Quotes</b> · <b>Weather</b>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div>
              <b style="color: #0000aa;">Computers & Internet</b><br/>
              <span style="color: #555; font-size: 11px;">Software, Hardware, Web, Games, Windows 98</span>
            </div>
            <div>
              <b style="color: #0000aa;">Entertainment</b><br/>
              <span style="color: #555; font-size: 11px;">Movies, Music (MP3s), Humor, Television</span>
            </div>
            <div>
              <b style="color: #0000aa;">Science & Technology</b><br/>
              <span style="color: #555; font-size: 11px;">Astrophysics, Y2K Bug, Nanotechnology</span>
            </div>
            <div>
              <b style="color: #0000aa;">Education</b><br/>
              <span style="color: #555; font-size: 11px;">Universities, IITs, Engineering Libraries</span>
            </div>
          </div>
        </div>
      `;
    };

    const renderLatentPortal = () => {
      viewport.innerHTML = `
        <div style="background: #111; color: #fff; font-family: 'Lucida Console', monospace; padding: 20px; text-align: center; min-height: 100%;">
          <h1 style="color: #ff3333; font-size: 26px; margin-bottom: 4px;">LATENT LIVE ARENA</h1>
          <p style="color: #aaa; font-size: 12px; margin-bottom: 16px;">Gandhi Hackathon · OpenLake × Meraz · IIT Bhilai</p>
          <div style="border: 2px solid #555; background: #222; padding: 14px; max-width: 440px; margin: 0 auto; text-align: left;">
            <p style="color: #ffff00; font-weight: bold; margin-bottom: 8px;">🎯 THE SELF-SCORING TEST:</p>
            <p style="font-size: 11px; line-height: 1.4; color: #ddd; margin-bottom: 12px;">
              "At the end of your presentation, your team states the score you think you deserve.
              How close your guess was to the judges' score counts towards your final result."
            </p>
            <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 12px;">
              <label style="font-size: 12px;">Your Stated Score (0-10):</label>
              <input type="number" id="stated-score" min="1" max="10" step="0.5" value="9.5" style="width: 60px; padding: 3px;" />
              <button class="button-bevel" id="predict-btn">Calculate Latent Odds</button>
            </div>
            <div id="latent-prediction" style="color: #00ffaa; font-size: 12px; font-weight: bold; margin-top: 8px;"></div>
          </div>
        </div>
      `;

      const statedInput = viewport.querySelector('#stated-score');
      const predictBtn = viewport.querySelector('#predict-btn');
      const outDiv = viewport.querySelector('#latent-prediction');

      predictBtn.addEventListener('click', () => {
        window.win98Audio.playClick();
        const val = parseFloat(statedInput.value);
        if (val >= 9.0) {
          outDiv.innerHTML = `✅ PERFECT MATCH! The judges recognize absolute mastery. 3D Raycaster + Full Working Paint + Procedural Audio synthesized = Unbeatable score!`;
        } else {
          outDiv.innerHTML = `⚠️ DO NOT UNDERSELL! The rulebook explicitly penalizes false modesty. With this elite Windows 98 build, aim for the top!`;
        }
      });
    };

    const render404 = (url) => {
      viewport.innerHTML = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #333;">The page cannot be displayed</h2>
          <p style="font-size: 12px; color: #666; margin-top: 8px;">
            The page you are looking for is currently unavailable on the 1998 World Wide Web.<br/>
            The Web site might be experiencing technical problems, or your 56k dial-up modem dropped carrier signal.
          </p>
          <ul style="font-size: 12px; margin-top: 10px; margin-left: 20px; color: #444;">
            <li>Click the Refresh button, or try again later.</li>
            <li>Click Dial-Up on the toolbar to negotiate a new 56,000 bps connection.</li>
            <li>Try searching for it on <a href="#google" id="err-g-link" style="color: #0000cc;">Google!</a></li>
          </ul>
        </div>
      `;
      viewport.querySelector('#err-g-link').addEventListener('click', () => loadPage('http://www.google.com'));
    };

    // Toolbar Buttons
    btnGo.addEventListener('click', () => loadPage(urlBar.value));
    urlBar.addEventListener('keydown', (e) => { if (e.key === 'Enter') loadPage(urlBar.value); });
    btnHome.addEventListener('click', () => loadPage('http://www.google.com'));

    btnDialup.addEventListener('click', () => {
      statusText.textContent = 'Dialing 56k modem...';
      window.win98Audio.playDialupModem(() => {
        statusText.textContent = 'Connected at 52,000 bps (V.90)';
        window.clippyAssistant.setCustomText("🌐 Dial-Up connected! You have 30 minutes of internet before mom picks up the phone line.");
      });
    });

    loadPage(initialUrl);
  }
}

window.internetExplorerApp = new InternetExplorerApp();
