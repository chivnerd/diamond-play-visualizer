import React from 'react';

interface CelebrationUnicornProps {
  variant?: 'default' | 'epic' | 'legendary' | 'magical' | 'losing';
}

const CelebrationUnicorn: React.FC<CelebrationUnicornProps> = ({ variant = 'default' }) => {
  const getVariationConfig = () => {
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

  const config = getVariationConfig();

  const unicornFlyKeyframes = `
    @keyframes unicornFly {
      0% {
        transform: translateX(-100px) translateY(-50%);
        opacity: 0;
      }
      20% {
        opacity: 1;
      }
      80% {
        opacity: 1;
      }
      100% {
        transform: translateX(calc(100vw + 100px)) translateY(-50%);
        opacity: 0;
      }
    }

    @keyframes unicornFlyUpsideDown {
      0% {
        transform: translateX(-100px) translateY(-50%) rotate(180deg);
        opacity: 0;
      }
      20% {
        opacity: 1;
      }
      80% {
        opacity: 1;
      }
      100% {
        transform: translateX(calc(100vw + 100px)) translateY(-50%) rotate(180deg);
        opacity: 0;
      }
    }
    
    @keyframes rainbowPulse {
      0% { opacity: 0.6; }
      100% { opacity: 1; }
    }

    @keyframes companionCollect {
      0% { 
        transform: translateY(0px) scale(1) rotate(0deg);
        opacity: 1;
      }
      50% { 
        transform: translateY(-20px) scale(1.2) rotate(180deg);
        opacity: 0.8;
      }
      100% { 
        transform: translateY(-40px) scale(0.5) rotate(360deg);
        opacity: 0;
      }
    }

    @keyframes companionFall {
      0% { 
        transform: translateY(0px) scale(1) rotate(0deg);
        opacity: 1;
      }
      50% { 
        transform: translateY(30px) scale(0.8) rotate(-90deg);
        opacity: 0.6;
      }
      100% { 
        transform: translateY(80px) scale(0.3) rotate(-180deg);
        opacity: 0;
      }
    }

    @keyframes companionFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(180deg); }
    }

    @keyframes sparkleExplode {
      0% { 
        transform: scale(0) rotate(0deg);
        opacity: 1;
      }
      50% { 
        transform: scale(1.5) rotate(180deg);
        opacity: 0.8;
      }
      100% { 
        transform: scale(0.3) rotate(360deg);
        opacity: 0;
      }
    }

    @keyframes messageWiggle {
      0%, 100% { transform: rotate(0deg) scale(1); }
      25% { transform: rotate(-2deg) scale(1.05); }
      75% { transform: rotate(2deg) scale(1.05); }
    }

    @keyframes messageSad {
      0%, 100% { transform: rotate(0deg) scale(1); }
      25% { transform: rotate(-1deg) scale(0.95); }
      75% { transform: rotate(1deg) scale(0.95); }
    }
  `;

  return (
    <>
      <style>{unicornFlyKeyframes}</style>
      <div 
        className="absolute top-1/2 left-0 animate-[slide-right_6s_ease-in-out] pointer-events-none z-[9999]"
        style={{
          transform: 'translateY(-50%)',
          animation: config.isUpsideDown 
            ? 'unicornFlyUpsideDown 6s ease-in-out forwards' 
            : 'unicornFly 6s ease-in-out forwards'
        }}
      >
        <div className="relative">
          {/* Floating companions around unicorn */}
          {config.companions.map((companion, index) => (
            <div 
              key={index}
              className={`absolute text-2xl ${config.colors[index % config.colors.length]}`}
              style={{ 
                left: `${-30 + (index * 15)}px`,
                top: `${-20 + (index % 3) * 15}px`,
                animation: config.isUpsideDown
                  ? `companionFloat ${1 + (index * 0.2)}s ease-in-out infinite ${index * 0.3}s, companionFall 2s ease-in-out ${1 + (index * 0.5)}s forwards`
                  : `companionFloat ${1 + (index * 0.2)}s ease-in-out infinite ${index * 0.3}s, companionCollect 2s ease-in-out ${1 + (index * 0.5)}s forwards` 
              }}
            >
              {companion}
            </div>
          ))}

          {/* Extra sparkle explosions for epic+ variants */}
          {variant !== 'default' && variant !== 'losing' && (
            <>
              {[...Array(8)].map((_, index) => (
                <div
                  key={`sparkle-${index}`}
                  className={`absolute text-lg ${config.colors[index % config.colors.length]}`}
                  style={{
                    left: `${-40 + Math.random() * 80}px`,
                    top: `${-30 + Math.random() * 60}px`,
                    animation: `sparkleExplode ${0.8 + Math.random() * 0.4}s ease-out ${0.5 + Math.random() * 2}s forwards`
                  }}
                >
                  ✨
                </div>
              ))}
            </>
          )}

          {/* Sparkles around unicorn (different for losing variant) */}
          {!config.isUpsideDown && (
            <>
              <div className="absolute -top-4 -left-2 text-yellow-300 animate-pulse">✨</div>
              <div className="absolute -top-2 left-8 text-pink-300 animate-pulse" style={{ animationDelay: '0.5s' }}>⭐</div>
              <div className="absolute top-2 -left-4 text-blue-300 animate-pulse" style={{ animationDelay: '1s' }}>✨</div>
              <div className="absolute -bottom-2 left-6 text-purple-300 animate-pulse" style={{ animationDelay: '1.5s' }}>⭐</div>
            </>
          )}

          {/* Sad effects for losing variant */}
          {config.isUpsideDown && (
            <>
              <div className="absolute -top-4 -left-2 text-red-300 animate-pulse">💧</div>
              <div className="absolute -top-2 left-8 text-gray-400 animate-pulse" style={{ animationDelay: '0.5s' }}>😭</div>
              <div className="absolute top-2 -left-4 text-red-400 animate-pulse" style={{ animationDelay: '1s' }}>💧</div>
              <div className="absolute -bottom-2 left-6 text-orange-400 animate-pulse" style={{ animationDelay: '1.5s' }}>😢</div>
            </>
          )}
          
          {/* Unicorn */}
          <div 
            className="text-6xl animate-bounce"
            style={{
              filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.3))',
              imageRendering: 'pixelated',
              animationDuration: config.bounceSpeed,
              transform: config.isUpsideDown ? 'rotate(180deg)' : 'none'
            }}
          >
            {config.unicorn}
          </div>
          
          {/* Enhanced rainbow trail with variation */}
          <div 
            className="absolute top-1/2 -right-20 w-20 h-8 opacity-80"
            style={{
              background: config.trailColors,
              transform: 'translateY(-50%) skew(-20deg)',
              borderRadius: '20px',
              imageRendering: 'pixelated',
              animation: 'rainbowPulse 0.5s ease-in-out infinite alternate'
            }}
          ></div>

          {/* Additional trail effects for epic+ variants */}
          {variant !== 'default' && variant !== 'losing' && (
            <div 
              className="absolute top-1/2 -right-32 w-12 h-6 opacity-60"
              style={{
                background: config.trailColors,
                transform: 'translateY(-50%) skew(-15deg)',
                borderRadius: '15px',
                imageRendering: 'pixelated',
                animation: 'rainbowPulse 0.3s ease-in-out infinite alternate 0.2s'
              }}
            ></div>
          )}
        </div>
        
        {/* Success message with wiggle animation */}
        <div 
          className={`absolute -bottom-16 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg font-mono font-bold border-4 ${
            config.isUpsideDown 
              ? 'bg-red-500 text-white border-red-700' 
              : 'bg-green-500 text-white border-green-700'
          }`}
          style={{
            imageRendering: 'pixelated',
            boxShadow: config.isUpsideDown 
              ? '4px 4px 0px #7F1D1D' 
              : '4px 4px 0px #2D5016',
            textShadow: '2px 2px 0px rgba(0,0,0,0.5)',
            fontFamily: 'monospace',
            animation: config.isUpsideDown 
              ? 'messageSad 0.8s ease-in-out infinite'
              : variant !== 'default' ? 'messageWiggle 0.5s ease-in-out infinite' : 'none'
          }}
        >
          {config.message}
        </div>
      </div>
    </>
  );
};

export default CelebrationUnicorn;
