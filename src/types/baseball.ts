
export interface Player {
  id: string;
  position: string;
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  isActive: boolean;
  role: 'fielder' | 'backup' | 'cover' | 'cutoff' | 'normal';
}

export interface Runner {
  id: string;
  base: 'home' | '1st' | '2nd' | '3rd';
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  isRunning: boolean;
}

export interface Ball {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  isMoving: boolean;
  isThrown: boolean;
  throwTarget?: string;
}

export type BaseballLevel = 'tball' | 'coach-pitch' | 'minors' | 'majors' | 'pony' | 'high-school';

export interface PlayerMovement {
  playerId: string;
  x: number;
  y: number;
  role: 'fielder' | 'backup' | 'cover' | 'cutoff' | 'normal';
}

export interface RunnerTarget {
  base: 'home' | '1st' | '2nd' | '3rd';
  targetBase: 'home' | '1st' | '2nd' | '3rd';
}

export interface GameScenario {
  name: string;
  ballTarget: { x: number; y: number };
  baseRunners: string[];
  movements: PlayerMovement[];
  runnerTargets: RunnerTarget[];
}
