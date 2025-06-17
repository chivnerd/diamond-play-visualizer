
export type RizzMode = 'youtuber' | 'shakespeare' | 'spanish' | 'liljon' | 'harrypotter' | 'english' | 'mcdonalds';

// Simple beep tones using data URLs for testing
const createBeepTone = (frequency: number, duration: number = 0.5): string => {
  const sampleRate = 44100;
  const samples = duration * sampleRate;
  const buffer = new ArrayBuffer(44 + samples * 2);
  const view = new DataView(buffer);
  
  // WAV header
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + samples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, samples * 2, true);
  
  // Generate sine wave
  for (let i = 0; i < samples; i++) {
    const sample = Math.sin(2 * Math.PI * frequency * i / sampleRate) * 0.3;
    view.setInt16(44 + i * 2, sample * 32767, true);
  }
  
  const blob = new Blob([buffer], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
};

export const getRizzModeMusic = (mode: RizzMode): string => {
  // Generate different frequency tones for each mode for testing
  const musicMap: Record<RizzMode, string> = {
    youtuber: createBeepTone(440), // A note
    shakespeare: createBeepTone(523), // C note
    spanish: createBeepTone(659), // E note
    liljon: createBeepTone(349), // F note
    harrypotter: createBeepTone(392), // G note
    english: createBeepTone(294), // D note
    mcdonalds: createBeepTone(587) // D note
  };
  
  return musicMap[mode];
};

export class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;

  play(src: string, volume: number = 0.3) {
    this.stop();
    
    if (!this.isMuted) {
      this.audio = new Audio(src);
      this.audio.volume = volume;
      this.audio.loop = true;
      this.audio.play().catch(() => {
        // Silently handle audio play errors (browser autoplay policies)
      });
    }
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stop();
    }
  }

  getMuted(): boolean {
    return this.isMuted;
  }
}

export const audioManager = new AudioManager();
