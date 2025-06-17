
export type RizzMode = 'youtuber' | 'shakespeare' | 'spanish' | 'liljon' | 'harrypotter' | 'english' | 'mcdonalds';

export const getRizzModeMusic = (mode: RizzMode): string => {
  // Using royalty-free placeholder URLs - in production, these would be actual audio files
  const musicMap: Record<RizzMode, string> = {
    youtuber: '/audio/brainrot-beat.mp3',
    shakespeare: '/audio/classical-lute.mp3', 
    spanish: '/audio/flamenco-guitar.mp3',
    liljon: '/audio/crunk-beat.mp3',
    harrypotter: '/audio/magical-theme.mp3',
    english: '/audio/ambient-background.mp3',
    mcdonalds: '/audio/jingle-theme.mp3'
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
