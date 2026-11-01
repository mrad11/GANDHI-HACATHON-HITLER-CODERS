/* ==========================================================================
   CLIPPY ASSISTANT & LATENT PRESENTATION HILARITY ENGINE
   The Abandoned Computer - Gandhi Hackathon Edition
   Targeting: Samay Raina, OpenLake & Meraz Judges
   ========================================================================== */

class ClippyAssistant {
  constructor() {
    this.container = null;
    this.bubble = null;
    this.avatar = null;
    this.quotes = [
      "It looks like you're presenting at the Gandhi Hackathon! Would you like help bribing the judges with 100 packets of Maggi?",
      "Warning: Samay Raina is inspecting your code. My quantum chess algorithm calculates our score at exactly 9.5 / 10!",
      "Fun Fact: In 1998, this PC survived Y2K because the owner unplugged it to connect an immersion rod for warm bath water in hostel.",
      "Did you know? Typing 'latent' or 'matrix' into MS-DOS Prompt unlocks the secret hacker terminal!",
      "It looks like you're writing code without coffee. Would you like me to order samosas from the canteen?",
      "Need extra presentation time? Would you like me to trigger a Blue Screen of Death (BSOD) on demand?",
      "I see you opened My Documents. Please don't read Vikram's December 1999 Y2K apocalypse diary!",
      "Remember the Latent golden rule: Overselling weak work costs you, but underselling this masterpiece will make me sad."
    ];
    this.quoteIndex = 0;
  }

  init() {
    this.container = document.getElementById('clippy-container');
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="clippy-bubble" id="clippy-bubble">
        <span id="clippy-text">${this.quotes[0]}</span>
        <div style="margin-top: 6px; display: flex; gap: 4px; justify-content: flex-end;">
          <button class="button-bevel" id="clippy-next-btn" style="padding: 1px 6px; font-size: 10px;">Next Tip</button>
          <button class="button-bevel" id="clippy-bribe-btn" style="padding: 1px 6px; font-size: 10px; color: #800000;">Bribe 10/10</button>
        </div>
      </div>
      <img class="clippy-avatar" id="clippy-avatar" src="${Win98Icons.clippy}" alt="Clippy" title="Click me for Latent advice!" />
    `;

    this.bubble = document.getElementById('clippy-bubble');
    this.avatar = document.getElementById('clippy-avatar');

    this.avatar.addEventListener('click', () => {
      window.win98Audio.playAsterisk();
      this.nextQuote();
    });

    document.getElementById('clippy-next-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      window.win98Audio.playClick();
      this.nextQuote();
    });

    document.getElementById('clippy-bribe-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      window.win98Audio.playChordError();
      this.setCustomText("🚨 ERROR 418: Canteen budget insufficient! Samay Raina rejected the samosa bribe. You must win purely on legendary frontend craft!");
    });

    // Tap glass sound every 45s
    setInterval(() => {
      if (Math.random() > 0.5) {
        this.avatar.style.transform = "rotate(10deg) scale(1.1)";
        setTimeout(() => {
          this.avatar.style.transform = "rotate(0deg) scale(1)";
        }, 300);
      }
    }, 20000);
  }

  nextQuote() {
    this.quoteIndex = (this.quoteIndex + 1) % this.quotes.length;
    document.getElementById('clippy-text').textContent = this.quotes[this.quoteIndex];
    this.bubble.style.display = 'block';
  }

  setCustomText(text) {
    document.getElementById('clippy-text').textContent = text;
    this.bubble.style.display = 'block';
  }
}

window.clippyAssistant = new ClippyAssistant();
