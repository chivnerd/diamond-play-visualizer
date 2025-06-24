
import React from 'react';

interface ScoreDisplayProps {
  score: number;
  onResetScore: () => void;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, onResetScore }) => {
  return (
    <div className="mt-3 sm:mt-4 p-3 sm:p-4 border-4 border-yellow-600 inline-block" style={{
      background: 'linear-gradient(145deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
      imageRendering: 'pixelated',
      boxShadow: '6px 6px 0px #B8860B, 8px 8px 0px rgba(0,0,0,0.3)'
    }}>
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <span className="text-xl sm:text-2xl">🍔</span>
        <span className="text-lg sm:text-xl font-bold font-mono text-orange-900" style={{
          fontFamily: 'monospace',
          textShadow: '2px 2px 0px #FFFFFF'
        }}>
          CHEESEBURGERS: {score}
        </span>
        <span className="text-xl sm:text-2xl">🍔</span>
      </div>
      {score > 0 && (
        <button
          onClick={onResetScore}
          className="mt-2 px-2 sm:px-3 py-1 text-xs sm:text-sm font-mono border-2 border-red-600 text-red-900 font-bold"
          style={{
            background: 'linear-gradient(145deg, #F1948A 0%, #E74C3C 50%, #F1948A 100%)',
            imageRendering: 'pixelated',
            boxShadow: '2px 2px 0px #A93226',
            fontFamily: 'monospace'
          }}
        >
          RESET SCORE
        </button>
      )}
    </div>
  );
};

export default ScoreDisplay;
