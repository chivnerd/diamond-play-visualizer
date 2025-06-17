
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GameScenario, BaseballLevel } from '../../types/baseball';
import { X } from 'lucide-react';

interface FeedbackPopupProps {
  isOpen: boolean;
  onClose: () => void;
  scenario: GameScenario | null;
  playerChoice: string;
  correctChoice: string | null;
  level: BaseballLevel;
}

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({ 
  isOpen, 
  onClose, 
  scenario, 
  playerChoice, 
  correctChoice, 
  level 
}) => {
  if (!scenario || !correctChoice) return null;

  const getChoiceLabel = (choice: string) => {
    switch (choice) {
      case 'home': return 'HOME PLATE';
      case '1st': return '1ST BASE';
      case '2nd': return '2ND BASE';
      case '3rd': return '3RD BASE';
      case 'catch': return 'CATCH IT';
      case 'catch-throw-2nd': return 'CATCH & THROW 2ND';
      case 'catch-tag-1st': return 'CATCH & TAG 1ST';
      default: return choice.toUpperCase();
    }
  };

  const getExplanation = () => {
    const scenarioName = scenario.name.toLowerCase();
    const runners = scenario.baseRunners;

    if (scenarioName.includes('ground ball') || scenarioName.includes('grounder') || scenarioName.includes('chopper')) {
      if (correctChoice === '1st') {
        return "On ground balls, first base is always a sure out! Don't risk a throwing error on a harder play when you can get the guaranteed out.";
      } else if (correctChoice === 'home' && runners.includes('1st') && runners.includes('2nd') && runners.includes('3rd')) {
        return "With bases loaded, the runner from third will score easily. Throw home to prevent the run, but first base is also acceptable for the sure out.";
      } else if (correctChoice === '3rd' && runners.includes('1st') && runners.includes('2nd')) {
        return "With runners on first and second, you can get a force out at third base to prevent the lead runner from reaching scoring position.";
      } else if (correctChoice === '2nd' && runners.includes('1st')) {
        return "With a runner on first, you can get a force out at second base. The runner must run, so it's an easier play than first base.";
      }
    }

    if ((scenarioName.includes('pop fly') || scenarioName.includes('pop up')) && runners.includes('1st')) {
      if (correctChoice === 'catch-tag-1st') {
        return "This is a DOUBLE PLAY opportunity! Catch the ball for one out, then tag first base before the runner can return. Two outs on one play = 2 CHICKENS!";
      }
    }

    if (scenarioName.includes('single')) {
      if (correctChoice === 'home' && (runners.includes('2nd') || runners.length >= 2)) {
        return "Runners on second base can easily score on singles. Throw home to prevent the run from scoring!";
      } else if (correctChoice === '3rd' && runners.includes('1st') && !runners.includes('2nd')) {
        return "The runner from first will advance to third, putting them in scoring position. Throw to third to keep them at second base.";
      } else if (correctChoice === '2nd' && runners.length === 0) {
        return "With no pressure from base runners, prevent the batter from reaching scoring position by throwing to second base.";
      }
    }

    return "Study the situation more carefully. Consider where runners are and which play gives you the best chance for an out or prevents runs from scoring.";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md border-4 border-red-600" style={{
        background: 'linear-gradient(145deg, #F8D7DA 0%, #F5C6CB 50%, #F8D7DA 100%)',
        imageRendering: 'pixelated',
        boxShadow: '8px 8px 0px #B71C1C, 12px 12px 0px rgba(0,0,0,0.3)'
      }}>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold font-mono text-red-800" style={{
            fontFamily: 'monospace',
            textShadow: '2px 2px 0px #FFFFFF'
          }}>
            🚫 NO CHICKEN! 🚫
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-4 border-4 border-red-500" style={{
            background: 'linear-gradient(145deg, #FFEBEE 0%, #FFCDD2 50%, #FFEBEE 100%)',
            imageRendering: 'pixelated'
          }}>
            <h4 className="font-bold text-red-900 font-mono mb-2" style={{ fontFamily: 'monospace' }}>
              WHAT HAPPENED:
            </h4>
            <p className="text-red-800 font-mono text-sm" style={{ fontFamily: 'monospace' }}>
              You chose: <strong>{getChoiceLabel(playerChoice)}</strong>
            </p>
            <p className="text-red-800 font-mono text-sm" style={{ fontFamily: 'monospace' }}>
              Best choice: <strong>{getChoiceLabel(correctChoice)}</strong>
            </p>
          </div>

          <div className="p-4 border-4 border-blue-500" style={{
            background: 'linear-gradient(145deg, #E3F2FD 0%, #BBDEFB 50%, #E3F2FD 100%)',
            imageRendering: 'pixelated'
          }}>
            <h4 className="font-bold text-blue-900 font-mono mb-2" style={{ fontFamily: 'monospace' }}>
              WHY THIS MATTERS:
            </h4>
            <p className="text-blue-800 font-mono text-sm" style={{ fontFamily: 'monospace' }}>
              {getExplanation()}
            </p>
          </div>

          <div className="p-3 border-4 border-yellow-500" style={{
            background: 'linear-gradient(145deg, #FFF9C4 0%, #FFF176 50%, #FFF9C4 100%)',
            imageRendering: 'pixelated'
          }}>
            <p className="text-yellow-900 font-mono text-center font-bold text-sm" style={{ fontFamily: 'monospace' }}>
              💡 TIP: Think about which play gives you the best chance for an out or prevents runs!
            </p>
          </div>

          <Button
            onClick={onClose}
            className="w-full p-3 text-lg font-mono border-4 border-green-600 text-white font-bold"
            style={{
              background: 'linear-gradient(145deg, #4CAF50 0%, #388E3C 50%, #4CAF50 100%)',
              imageRendering: 'pixelated',
              boxShadow: '4px 4px 0px #2E7D32',
              fontFamily: 'monospace'
            }}
          >
            GOT IT! TRY AGAIN
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackPopup;
