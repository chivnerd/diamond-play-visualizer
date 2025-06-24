
import React from 'react';
import { getUnicornConfig, UnicornVariant } from '../../utils/unicornConfig';
import { unicornAnimationStyles } from './UnicornAnimations';

interface CelebrationUnicornProps {
  variant?: UnicornVariant;
}

const CelebrationUnicorn: React.FC<CelebrationUnicornProps> = ({ variant = 'default' }) => {
  const config = getUnicornConfig(variant);

  return (
    <>
      <style>{unicornAnimationStyles}</style>
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
              className={`absolute text-4xl ${config.colors[index % config.colors.length]}`}
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
          {!config.isUpsideDown ? (
            <>
              <div className="absolute -top-4 -left-2 text-yellow-300 animate-pulse">✨</div>
              <div className="absolute -top-2 left-8 text-pink-300 animate-pulse" style={{ animationDelay: '0.5s' }}>⭐</div>
              <div className="absolute top-2 -left-4 text-blue-300 animate-pulse" style={{ animationDelay: '1s' }}>✨</div>
              <div className="absolute -bottom-2 left-6 text-purple-300 animate-pulse" style={{ animationDelay: '1.5s' }}>⭐</div>
            </>
          ) : (
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
