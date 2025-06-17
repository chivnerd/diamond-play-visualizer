
import React from 'react';

const CelebrationUnicorn: React.FC = () => {
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
    
    @keyframes rainbowPulse {
      0% { opacity: 0.6; }
      100% { opacity: 1; }
    }

    @keyframes chickenCollect {
      0% { 
        transform: translateY(0px) scale(1);
        opacity: 1;
      }
      50% { 
        transform: translateY(-20px) scale(1.2);
        opacity: 0.8;
      }
      100% { 
        transform: translateY(-40px) scale(0.5);
        opacity: 0;
      }
    }

    @keyframes chickenFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
  `;

  return (
    <>
      <style>{unicornFlyKeyframes}</style>
      <div 
        className="absolute top-1/2 left-0 animate-[slide-right_6s_ease-in-out] pointer-events-none z-50"
        style={{
          transform: 'translateY(-50%)',
          animation: 'unicornFly 6s ease-in-out forwards'
        }}
      >
        <div className="relative">
          {/* Floating chickens around unicorn */}
          <div className="absolute -top-8 -left-6 text-2xl" style={{ 
            animation: 'chickenFloat 1s ease-in-out infinite, chickenCollect 2s ease-in-out 1s forwards' 
          }}>🐔</div>
          <div className="absolute -top-4 left-10 text-2xl" style={{ 
            animation: 'chickenFloat 1.2s ease-in-out infinite 0.3s, chickenCollect 2s ease-in-out 1.5s forwards' 
          }}>🐔</div>
          <div className="absolute top-4 -left-8 text-2xl" style={{ 
            animation: 'chickenFloat 0.8s ease-in-out infinite 0.6s, chickenCollect 2s ease-in-out 2s forwards' 
          }}>🐔</div>
          <div className="absolute -bottom-4 left-8 text-2xl" style={{ 
            animation: 'chickenFloat 1.1s ease-in-out infinite 0.9s, chickenCollect 2s ease-in-out 2.5s forwards' 
          }}>🐔</div>
          <div className="absolute top-0 left-12 text-2xl" style={{ 
            animation: 'chickenFloat 0.9s ease-in-out infinite 1.2s, chickenCollect 2s ease-in-out 3s forwards' 
          }}>🐔</div>

          {/* Sparkles around unicorn */}
          <div className="absolute -top-4 -left-2 text-yellow-300 animate-pulse">✨</div>
          <div className="absolute -top-2 left-8 text-pink-300 animate-pulse" style={{ animationDelay: '0.5s' }}>⭐</div>
          <div className="absolute top-2 -left-4 text-blue-300 animate-pulse" style={{ animationDelay: '1s' }}>✨</div>
          <div className="absolute -bottom-2 left-6 text-purple-300 animate-pulse" style={{ animationDelay: '1.5s' }}>⭐</div>
          
          {/* Unicorn */}
          <div 
            className="text-6xl animate-bounce"
            style={{
              filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.3))',
              imageRendering: 'pixelated',
              animationDuration: '1s'
            }}
          >
            🦄
          </div>
          
          {/* Rainbow trail */}
          <div 
            className="absolute top-1/2 -right-20 w-20 h-8 opacity-80"
            style={{
              background: 'linear-gradient(90deg, #FF0000 0%, #FF7F00 16.66%, #FFFF00 33.33%, #00FF00 50%, #0000FF 66.66%, #4B0082 83.33%, #9400D3 100%)',
              transform: 'translateY(-50%) skew(-20deg)',
              borderRadius: '20px',
              imageRendering: 'pixelated',
              animation: 'rainbowPulse 0.5s ease-in-out infinite alternate'
            }}
          ></div>
        </div>
        
        {/* Success message */}
        <div 
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg font-mono font-bold border-4 border-green-700"
          style={{
            imageRendering: 'pixelated',
            boxShadow: '4px 4px 0px #2D5016',
            textShadow: '2px 2px 0px rgba(0,0,0,0.5)',
            fontFamily: 'monospace'
          }}
        >
          🦄 UNICORN CHICKEN COLLECTOR! 🐔
        </div>
      </div>
    </>
  );
};

export default CelebrationUnicorn;
