/* ==========================================================================
   WEB AUDIO API SOUND & SYNTHESIZER ENGINE
   Zero external audio files - 100% Procedurally Synthesized Sound
   Windows 98 Chime, Error Chord, 56k Dial-Up Modem, and Retro Chiptunes
   ========================================================================== */

class Win98AudioEngine {
  constructor() {
    this.ctx = null;
    this.analyser = null;
    this.currentTrack = null;
    this.isPlayingMusic = false;
    this.musicTimer = null;
    this.volume = 0.6;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  // Windows 98 Startup Chime (Authentic Warm Synth Chord Progression)
  playStartupChime() {
    this.init();
    const t = this.ctx.currentTime;
    
    // Notes of the classic 98 chime chord (F#, A#, C#, D#, G# progression)
    const notes = [
      { f: 185.00, start: 0.0, dur: 4.5, type: 'triangle', gain: 0.35 }, // F#3
      { f: 277.18, start: 0.1, dur: 4.2, type: 'sine', gain: 0.3 },     // C#4
      { f: 369.99, start: 0.2, dur: 3.8, type: 'sine', gain: 0.3 },     // F#4
      { f: 466.16, start: 0.4, dur: 3.5, type: 'sine', gain: 0.25 },    // A#4
      { f: 554.37, start: 0.6, dur: 3.2, type: 'triangle', gain: 0.2 }, // C#5
      { f: 622.25, start: 0.8, dur: 3.0, type: 'sine', gain: 0.25 },    // D#5
      { f: 739.99, start: 1.1, dur: 3.5, type: 'sine', gain: 0.28 }     // F#5
    ];

    notes.forEach(n => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = n.type;
      osc.frequency.setValueAtTime(n.f, t + n.start);

      g.gain.setValueAtTime(0.001, t + n.start);
      g.gain.exponentialRampToValueAtTime(n.gain, t + n.start + 0.15);
      g.gain.exponentialRampToValueAtTime(0.001, t + n.start + n.dur);

      osc.connect(g);
      g.connect(this.masterGain);

      osc.start(t + n.start);
      osc.stop(t + n.start + n.dur);
    });
  }

  // Windows Error Chord (The classic "Ding / Dong" alert)
  playChordError() {
    this.init();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(110, t + 0.35);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, t);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.4);
  }

  // Asterisk / Notification Ding
  playAsterisk() {
    this.init();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, t);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.3);
  }

  // Mouse Click Sound
  playClick() {
    this.init();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.02);

    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.02);
  }

  // 56k Dial-Up Modem Negotiation Sound
  playDialupModem(onComplete) {
    this.init();
    const t = this.ctx.currentTime;
    
    // 1. Dial Tone (350Hz + 440Hz)
    const o1 = this.ctx.createOscillator();
    const o2 = this.ctx.createOscillator();
    const gDial = this.ctx.createGain();
    o1.frequency.value = 350;
    o2.frequency.value = 440;
    gDial.gain.setValueAtTime(0.12, t);
    gDial.gain.setValueAtTime(0, t + 1.2);
    o1.connect(gDial);
    o2.connect(gDial);
    gDial.connect(this.masterGain);
    o1.start(t); o2.start(t);
    o1.stop(t + 1.2); o2.stop(t + 1.2);

    // 2. DTMF Tones (dialing)
    for (let i = 0; i < 7; i++) {
      const dt = t + 1.3 + (i * 0.12);
      const do1 = this.ctx.createOscillator();
      const do2 = this.ctx.createOscillator();
      const dg = this.ctx.createGain();
      do1.frequency.value = 697 + (i * 80);
      do2.frequency.value = 1209 + (i * 60);
      dg.gain.setValueAtTime(0.15, dt);
      dg.gain.setValueAtTime(0.001, dt + 0.08);
      do1.connect(dg); do2.connect(dg);
      dg.connect(this.masterGain);
      do1.start(dt); do2.start(dt);
      do1.stop(dt + 0.08); do2.stop(dt + 0.08);
    }

    // 3. Ringing & Carrier Squeal
    const ringT = t + 2.3;
    const oscCarrier = this.ctx.createOscillator();
    const gCarrier = this.ctx.createGain();
    oscCarrier.type = 'sawtooth';
    oscCarrier.frequency.setValueAtTime(1200, ringT);
    oscCarrier.frequency.linearRampToValueAtTime(2400, ringT + 1.0);
    oscCarrier.frequency.linearRampToValueAtTime(1800, ringT + 2.0);
    gCarrier.gain.setValueAtTime(0.001, ringT);
    gCarrier.gain.linearRampToValueAtTime(0.18, ringT + 0.2);
    gCarrier.gain.exponentialRampToValueAtTime(0.001, ringT + 3.5);
    oscCarrier.connect(gCarrier);
    gCarrier.connect(this.masterGain);
    oscCarrier.start(ringT);
    oscCarrier.stop(ringT + 3.5);

    // 4. White noise baud handshake
    const noiseT = t + 3.5;
    const bufferSize = this.ctx.sampleRate * 2.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.12;
    }
    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;
    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(1500, noiseT);
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.2, noiseT);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, noiseT + 2.5);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    noiseSource.start(noiseT);

    setTimeout(() => {
      if (onComplete) onComplete();
    }, 6000);
  }

  // Funny Chaos Siren
  playSiren() {
    this.init();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, t);
    osc.frequency.linearRampToValueAtTime(900, t + 0.3);
    osc.frequency.linearRampToValueAtTime(400, t + 0.6);
    osc.frequency.linearRampToValueAtTime(900, t + 0.9);
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.0);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 1.0);
  }

  // Funny Meme Fanfare on Startup
  playFunnyFanfare() {
    this.init();
    const notes = [261.63, 329.63, 392.00, 523.25, 493.88, 523.25];
    notes.forEach((f, idx) => {
      setTimeout(() => {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, t);
        g.gain.setValueAtTime(0.3, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        osc.connect(g);
        g.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + 0.35);
      }, idx * 120);
    });
  }

  // Rapid-Fire Machine Gun Error Dings
  playRapidErrorMachineGun(count = 6) {
    this.init();
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150 + (i * 40), t);
        osc.frequency.exponentialRampToValueAtTime(80, t + 0.15);
        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + 0.15);
      }, i * 90);
    }
  }

  // Spring Boing / Scurry Sound
  playSpringBoing() {
    this.init();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, t);
    osc.frequency.exponentialRampToValueAtTime(800, t + 0.2);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.2);
  }

  // Minesweeper Explosion
  playMineExplosion() {
    this.init();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(20, t + 0.6);

    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.6);
  }

  // Winamp Chiptune Synthesizer
  playChiptuneTrack(trackIndex, onNoteCallback) {
    this.stopMusic();
    this.init();
    this.isPlayingMusic = true;

    // Iconic 90s Chiptune Melodies
    const tracks = [
      {
        name: "Eminem - Without Me (Chiptune 2002)",
        tempo: 112,
        notes: [
          64, 64, 62, 60, 62, 64, 67, 64, 62, 60, 57, 57,
          64, 64, 62, 60, 62, 64, 67, 69, 67, 64, 62, 60
        ]
      },
      {
        name: "Darude - Sandstorm (Techno Synth 1999)",
        tempo: 136,
        notes: [
          71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 76, 76, 76, 76,
          74, 74, 74, 74, 74, 74, 69, 71, 71, 71, 71, 71, 71, 71
        ]
      },
      {
        name: "Doom - At Doom's Gate (E1M1 FM Synth)",
        tempo: 140,
        notes: [
          40, 40, 52, 40, 40, 50, 40, 40, 48, 40, 40, 47, 40, 40, 48, 49
        ]
      },
      {
        name: "Windows 98 Ambient Chill Chime",
        tempo: 80,
        notes: [
          60, 64, 67, 71, 72, 76, 79, 76, 72, 71, 67, 64
        ]
      }
    ];

    const current = tracks[trackIndex % tracks.length];
    this.currentTrack = current;
    let step = 0;
    const intervalMs = (60 / current.tempo / 2) * 1000;

    const midiToFreq = (m) => 440 * Math.pow(2, (m - 69) / 12);

    this.musicTimer = setInterval(() => {
      if (!this.isPlayingMusic) return;
      const note = current.notes[step % current.notes.length];
      step++;

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(midiToFreq(note), t);

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + (intervalMs / 1000) * 0.9);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + (intervalMs / 1000) * 0.9);

      if (onNoteCallback) onNoteCallback(current.name, step);
    }, intervalMs);

    return current.name;
  }

  stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
  }

  getVisualizerData() {
    if (!this.analyser) return new Uint8Array(16);
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }
}

window.win98Audio = new Win98AudioEngine();
