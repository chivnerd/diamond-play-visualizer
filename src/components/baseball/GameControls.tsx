
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, ArrowRight } from 'lucide-react';

interface GameControlsProps {
  onStartScenario: () => void;
  onNextBatter: () => void;
  onReset: () => void;
  isAnimating: boolean;
  playComplete: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  onStartScenario,
  onNextBatter,
  onReset,
  isAnimating,
  playComplete
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
      <Button 
        onClick={onStartScenario} 
        disabled={isAnimating || playComplete}
        className="px-4 sm:px-6 py-3 text-base sm:text-lg font-mono border-4 text-white font-bold min-h-[3rem]"
        style={{ 
          background: isAnimating || playComplete 
            ? 'linear-gradient(145deg, #666 0%, #444 50%, #666 100%)' 
            : 'linear-gradient(145deg, #4A90E2 0%, #2E5BA8 50%, #4A90E2 100%)',
          borderColor: '#1E3A5F',
          imageRendering: 'pixelated',
          boxShadow: '4px 4px 0px #1E3A5F, 6px 6px 0px rgba(0,0,0,0.3)',
          textShadow: '2px 2px 0px rgba(0,0,0,0.5)',
          fontFamily: 'monospace'
        }}
      >
        <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
        {isAnimating ? 'WATCH THE PLAY!' : 'HIT THE BALL!'}
      </Button>
      
      {playComplete && (
        <Button 
          onClick={onNextBatter} 
          className="px-4 sm:px-6 py-3 text-base sm:text-lg font-mono border-4 text-white font-bold min-h-[3rem]"
          style={{ 
            background: 'linear-gradient(145deg, #5CB85C 0%, #449D44 50%, #5CB85C 100%)',
            borderColor: '#2E7D32',
            imageRendering: 'pixelated',
            boxShadow: '4px 4px 0px #2E7D32, 6px 6px 0px rgba(0,0,0,0.3)',
            textShadow: '2px 2px 0px rgba(0,0,0,0.5)',
            fontFamily: 'monospace'
          }}
        >
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          NEXT BATTER
        </Button>
      )}
      
      <Button 
        onClick={onReset} 
        className="px-4 sm:px-6 py-3 text-base sm:text-lg font-mono border-4 text-white font-bold min-h-[3rem]"
        style={{ 
          background: 'linear-gradient(145deg, #D9534F 0%, #C9302C 50%, #D9534F 100%)',
          borderColor: '#AC2925',
          imageRendering: 'pixelated',
          boxShadow: '4px 4px 0px #AC2925, 6px 6px 0px rgba(0,0,0,0.3)',
          textShadow: '2px 2px 0px rgba(0,0,0,0.5)',
          fontFamily: 'monospace'
        }}
      >
        <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
        RESET
      </Button>
    </div>
  );
};

export default GameControls;
