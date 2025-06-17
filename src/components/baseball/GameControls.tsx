
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
    <div className="flex justify-center gap-4 mt-6">
      <Button 
        onClick={onStartScenario} 
        disabled={isAnimating || playComplete}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg font-mono border-2 border-blue-800"
        style={{ imageRendering: 'pixelated' }}
      >
        <Play className="w-5 h-5 mr-2" />
        {isAnimating ? 'WATCH THE PLAY!' : 'HIT THE BALL!'}
      </Button>
      
      {playComplete && (
        <Button 
          onClick={onNextBatter} 
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg font-mono border-2 border-green-800"
          style={{ imageRendering: 'pixelated' }}
        >
          <ArrowRight className="w-5 h-5 mr-2" />
          NEXT BATTER
        </Button>
      )}
      
      <Button 
        onClick={onReset} 
        variant="outline"
        className="px-6 py-3 text-lg font-mono border-2 border-gray-600"
        style={{ imageRendering: 'pixelated' }}
      >
        <RotateCcw className="w-5 h-5 mr-2" />
        RESET
      </Button>
    </div>
  );
};

export default GameControls;
