
export type UnicornVariant = 'default' | 'epic' | 'legendary' | 'magical' | 'losing';

export interface UnicornConfig {
  unicorn: string;
  companions: string[];
  message: string;
  colors: string[];
  trailColors: string;
  bounceSpeed: string;
  isUpsideDown: boolean;
}

export const getUnicornConfig = (variant: UnicornVariant): UnicornConfig => {
  switch (variant) {
    case 'losing':
      return {
        unicorn: '🦄',
        companions: ['🍔', '🍔', '🍔', '🍔', '🍔'],
        message: '🦄 OH NO! LOST CHEESEBURGERS! 😭',
        colors: ['text-red-400', 'text-orange-400', 'text-yellow-400', 'text-gray-400', 'text-red-300'],
        trailColors: 'linear-gradient(90deg, #DC2626 0%, #EA580C 25%, #EAB308 50%, #6B7280 75%, #DC2626 100%)',
        bounceSpeed: '1.5s',
        isUpsideDown: true
      };
    case 'epic':
      return {
        unicorn: '🦄',
        companions: ['🌟', '⚡', '🌈', '✨', '💫'],
        message: '🦄 EPIC UNICORN POWER! ⚡',
        colors: ['text-yellow-300', 'text-purple-300', 'text-blue-300', 'text-pink-300', 'text-green-300'],
        trailColors: 'linear-gradient(90deg, #FF1493 0%, #00BFFF 25%, #FFD700 50%, #FF69B4 75%, #9370DB 100%)',
        bounceSpeed: '0.8s',
        isUpsideDown: false
      };
    case 'legendary':
      return {
        unicorn: '🦄',
        companions: ['👑', '💎', '🏆', '⭐', '🎆'],
        message: '🦄 LEGENDARY CHEESEBURGER MASTER! 👑',
        colors: ['text-gold-300', 'text-silver-300', 'text-bronze-300', 'text-purple-300', 'text-red-300'],
        trailColors: 'linear-gradient(90deg, #FFD700 0%, #C0C0C0 20%, #CD7F32 40%, #9370DB 60%, #FF0000 80%, #FFD700 100%)',
        bounceSpeed: '0.6s',
        isUpsideDown: false
      };
    case 'magical':
      return {
        unicorn: '🦄',
        companions: ['🔮', '🪄', '✨', '🌙', '🌟'],
        message: '🦄 MAGICAL CHEESEBURGER WIZARD! 🪄',
        colors: ['text-indigo-300', 'text-violet-300', 'text-fuchsia-300', 'text-cyan-300', 'text-emerald-300'],
        trailColors: 'linear-gradient(90deg, #4B0082 0%, #8A2BE2 20%, #FF1493 40%, #00CED1 60%, #32CD32 80%, #4B0082 100%)',
        bounceSpeed: '1.2s',
        isUpsideDown: false
      };
    default:
      return {
        unicorn: '🦄',
        companions: ['🍔', '🍔', '🍔', '🍔', '🍔'],
        message: '🦄 UNICORN CHEESEBURGER COLLECTOR! 🍔',
        colors: ['text-yellow-300', 'text-pink-300', 'text-blue-300', 'text-purple-300', 'text-green-300'],
        trailColors: 'linear-gradient(90deg, #FF0000 0%, #FF7F00 16.66%, #FFFF00 33.33%, #00FF00 50%, #0000FF 66.66%, #4B0082 83.33%, #9400D3 100%)',
        bounceSpeed: '1s',
        isUpsideDown: false
      };
  }
};
