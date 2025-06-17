
import { Player, BaseballLevel } from '../types/baseball';

export const basePositions = {
  home: { x: 250, y: 350 },
  '1st': { x: 320, y: 280 },
  '2nd': { x: 250, y: 210 },
  '3rd': { x: 180, y: 280 }
};

export const getPlayersForLevel = (level: BaseballLevel): Player[] => {
  const baseInfield = [
    { id: 'P', position: 'Pitcher', x: 250, y: 280, originalX: 250, originalY: 280, isActive: false, role: 'normal' as const },
    { id: 'C', position: 'Catcher', x: 250, y: 350, originalX: 250, originalY: 350, isActive: false, role: 'normal' as const },
    { id: '1B', position: '1st Base', x: 320, y: 280, originalX: 320, originalY: 280, isActive: false, role: 'normal' as const },
    { id: '2B', position: '2nd Base', x: 280, y: 220, originalX: 280, originalY: 220, isActive: false, role: 'normal' as const },
    { id: '3B', position: '3rd Base', x: 180, y: 280, originalX: 180, originalY: 280, isActive: false, role: 'normal' as const },
    { id: 'SS', position: 'Shortstop', x: 220, y: 220, originalX: 220, originalY: 220, isActive: false, role: 'normal' as const },
  ];

  if (level === 'tball' || level === 'coach-pitch' || level === 'minors') {
    // Four outfielders for younger levels
    return [
      ...baseInfield,
      { id: 'LF', position: 'Left Field', x: 120, y: 120, originalX: 120, originalY: 120, isActive: false, role: 'normal' as const },
      { id: 'LC', position: 'Left Center', x: 200, y: 80, originalX: 200, originalY: 80, isActive: false, role: 'normal' as const },
      { id: 'RC', position: 'Right Center', x: 300, y: 80, originalX: 300, originalY: 80, isActive: false, role: 'normal' as const },
      { id: 'RF', position: 'Right Field', x: 380, y: 120, originalX: 380, originalY: 120, isActive: false, role: 'normal' as const },
    ];
  } else {
    // Traditional three outfielders for older levels
    return [
      ...baseInfield,
      { id: 'LF', position: 'Left Field', x: 120, y: 120, originalX: 120, originalY: 120, isActive: false, role: 'normal' as const },
      { id: 'CF', position: 'Center Field', x: 250, y: 80, originalX: 250, originalY: 80, isActive: false, role: 'normal' as const },
      { id: 'RF', position: 'Right Field', x: 380, y: 120, originalX: 380, originalY: 120, isActive: false, role: 'normal' as const },
    ];
  }
};

export const getPlayerColor = (role: string) => {
  switch (role) {
    case 'fielder': return 'bg-blue-600';
    case 'backup': return 'bg-yellow-500';
    case 'cover': return 'bg-green-600';
    case 'cutoff': return 'bg-purple-600';
    default: return 'bg-gray-500';
  }
};

export const getRoleDescription = (role: string) => {
  switch (role) {
    case 'fielder': return 'Fields the ball';
    case 'backup': return 'Backs up the play';
    case 'cover': return 'Covers the base';
    case 'cutoff': return 'Cut-off man';
    default: return '';
  }
};
