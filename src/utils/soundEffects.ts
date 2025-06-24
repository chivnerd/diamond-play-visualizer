
// Simple sound effect utility using Web Audio API
export class SoundEffects {
  private audioContext: AudioContext | null = null;

  constructor() {
    // Initialize audio context when first sound is played
    this.initAudioContext();
  }

  private initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API not supported');
    }
  }

  private async ensureAudioContext() {
    if (!this.audioContext) return null;
    
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
    return this.audioContext;
  }

  private createBeep(frequency: number, duration: number, type: OscillatorType = 'sine') {
    return new Promise<void>(async (resolve) => {
      const context = await this.ensureAudioContext();
      if (!context) {
        resolve();
        return;
      }

      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.3, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration);

      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + duration);

      oscillator.onended = () => resolve();
    });
  }

  private createNoise(duration: number, filterFreq: number) {
    return new Promise<void>(async (resolve) => {
      const context = await this.ensureAudioContext();
      if (!context) {
        resolve();
        return;
      }

      const bufferSize = context.sampleRate * duration;
      const noiseBuffer = context.createBuffer(1, bufferSize, context.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = context.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = context.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = filterFreq;

      const gainNode = context.createGain();
      gainNode.gain.setValueAtTime(0.1, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration);

      whiteNoise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(context.destination);

      whiteNoise.start(context.currentTime);
      whiteNoise.stop(context.currentTime + duration);

      whiteNoise.onended = () => resolve();
    });
  }

  async playBatHit() {
    // Sharp crack sound
    await this.createBeep(800, 0.1, 'square');
    setTimeout(() => this.createBeep(400, 0.2, 'sine'), 50);
  }

  async playGlovePop() {
    // Quick pop sound
    await this.createNoise(0.15, 2000);
  }

  async playCelebration() {
    // Happy ascending notes
    const notes = [262, 330, 392, 523]; // C, E, G, C
    for (let i = 0; i < notes.length; i++) {
      setTimeout(() => this.createBeep(notes[i], 0.2, 'sine'), i * 100);
    }
  }

  async playEpicCelebration() {
    // More elaborate celebration
    const notes = [262, 330, 392, 523, 659, 784]; // C, E, G, C, E, G
    for (let i = 0; i < notes.length; i++) {
      setTimeout(() => this.createBeep(notes[i], 0.15, 'triangle'), i * 80);
    }
    // Add some sparkle
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => this.createBeep(1000 + Math.random() * 500, 0.1, 'sine'), i * 50);
      }
    }, 300);
  }

  async playGroan() {
    // Sad descending groan
    const context = await this.ensureAudioContext();
    if (!context) return;

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(200, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, context.currentTime + 1);

    gainNode.gain.setValueAtTime(0.2, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 1);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 1);
  }

  async playWhoosh() {
    // Ball flying sound
    await this.createNoise(0.8, 800);
  }
}

// Create singleton instance
export const soundEffects = new SoundEffects();
