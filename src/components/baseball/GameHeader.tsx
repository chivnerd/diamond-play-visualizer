
import React from 'react';
import ScoreDisplay from './ScoreDisplay';

interface GameHeaderProps {
  score: number;
  onResetScore: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ score, onResetScore }) => {
  return (
    <div className="text-center mb-4 sm:mb-6">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800 mb-2 font-mono pixelated" style={{
        textShadow: '3px 3px 0px #2D5016, 6px 6px 0px rgba(0,0,0,0.3)',
        fontFamily: 'monospace',
        letterSpacing: '1px sm:2px'
      }}>⚾ BIGMACS DEFENSE RIZZ SCHOOL</h1>
      <p className="text-sm sm:text-lg text-gray-700 font-mono" style={{
        textShadow: '2px 2px 0px #FFFFFF, 4px 4px 0px rgba(0,0,0,0.2)',
        fontFamily: 'monospace',
        letterSpacing: '0.5px sm:1px'
      }}>Avoid the crash out and GET CHEESEBURGERS!</p>
      
      <ScoreDisplay score={score} onResetScore={onResetScore} />
    </div>
  );
};

export default GameHeader;
