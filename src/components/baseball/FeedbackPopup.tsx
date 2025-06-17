
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GameScenario, BaseballLevel } from '../../types/baseball';
import { isDoublePlay } from '../../utils/gameLogic';

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

  // Check if the player's choice was correct
  const isPlayerChoiceCorrect = () => {
    const scenarioName = scenario.name.toLowerCase();
    const runners = scenario.baseRunners;

    // For ground balls, first base is always correct
    if ((scenarioName.includes('ground ball') || scenarioName.includes('grounder') || 
         scenarioName.includes('chopper') || scenarioName.includes('roller')) && 
        playerChoice === '1st') {
      return true;
    }

    // For pop flies with runner on first, all catch options are correct
    if ((scenarioName.includes('pop fly') || scenarioName.includes('pop up')) && 
        runners.includes('1st') && playerChoice.startsWith('catch')) {
      return true;
    }

    // Check if choice matches the best choice
    return playerChoice === correctChoice;
  };

  const isCorrect = isPlayerChoiceCorrect();
  const isDouble = isDoublePlay(playerChoice, scenario);

  const getExplanation = () => {
    const scenarioName = scenario.name.toLowerCase();
    const runners = scenario.baseRunners;

    if (isCorrect) {
      if (playerChoice === 'catch-throw-2nd' && runners.includes('1st')) {
        return "Good choice! You caught the ball for one out. Throwing to second might get the runner, but it's not guaranteed - that's why this earns 1 chicken, not 2.";
      } else if (playerChoice === 'catch-tag-1st' && runners.includes('1st')) {
        return "EXCELLENT! This is a DOUBLE PLAY! Catch the ball for one out, then tag first base before the runner returns. Two guaranteed outs = 2 CHICKENS!";
      } else if (playerChoice === 'catch') {
        return "Perfect! You made the smart, safe play. Getting the sure out is always a good decision.";
      } else if (playerChoice === '1st' && (scenarioName.includes('ground ball') || scenarioName.includes('grounder') || scenarioName.includes('chopper') || scenarioName.includes('roller'))) {
        return "Great choice! First base is always a sure out on ground balls. When in doubt, take the guaranteed out!";
      } else {
        return "Excellent decision! This was the optimal play for this situation.";
      }
    } else {
      // Incorrect choice explanations
      if (scenarioName.includes('ground ball') || scenarioName.includes('grounder') || scenarioName.includes('chopper') || scenarioName.includes('roller')) {
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
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-md border-4 ${isCorrect ? 'border-green-600' : 'border-red-600'}`} style={{
        background: isCorrect 
          ? 'linear-gradient(145deg, #D4F4DD 0%, #A8E6B8 50%, #D4F4DD 100%)'
          : 'linear-gradient(145deg, #F8D7DA 0%, #F5C6CB 50%, #F8D7DA 100%)',
        imageRendering: 'pixelated',
        boxShadow: isCorrect 
          ? '8px 8px 0px #2E7D32, 12px 12px 0px rgba(0,0,0,0.3)'
          : '8px 8px 0px #B71C1C, 12px 12px 0px rgba(0,0,0,0.3)'
      }}>
        <DialogHeader>
          <DialogTitle className={`text-center text-2xl font-bold font-mono ${isCorrect ? 'text-green-800' : 'text-red-800'}`} style={{
            fontFamily: 'monospace',
            textShadow: '2px 2px 0px #FFFFFF'
          }}>
            {isCorrect ? (isDouble ? '🐔🐔 2 CHICKENS! 🐔🐔' : '🐔 CHICKEN! 🐔') : '🚫 NO CHICKEN! 🚫'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className={`p-4 border-4 ${isCorrect ? 'border-green-500' : 'border-red-500'}`} style={{
            background: isCorrect 
              ? 'linear-gradient(145deg, #E8F5E8 0%, #C8E6C9 50%, #E8F5E8 100%)'
              : 'linear-gradient(145deg, #FFEBEE 0%, #FFCDD2 50%, #FFEBEE 100%)',
            imageRendering: 'pixelated'
          }}>
            <h4 className={`font-bold ${isCorrect ? 'text-green-900' : 'text-red-900'} font-mono mb-2`} style={{ fontFamily: 'monospace' }}>
              WHAT HAPPENED:
            </h4>
            <p className={`${isCorrect ? 'text-green-800' : 'text-red-800'} font-mono text-sm`} style={{ fontFamily: 'monospace' }}>
              You chose: <strong>{getChoiceLabel(playerChoice)}</strong>
            </p>
            <p className={`${isCorrect ? 'text-green-800' : 'text-red-800'} font-mono text-sm`} style={{ fontFamily: 'monospace' }}>
              Best choice: <strong>{getChoiceLabel(correctChoice)}</strong>
            </p>
            {isCorrect && (
              <p className="text-green-800 font-mono text-sm font-bold" style={{ fontFamily: 'monospace' }}>
                Chickens earned: {isDouble ? '2' : '1'}
              </p>
            )}
          </div>

          <div className="p-4 border-4 border-blue-500" style={{
            background: 'linear-gradient(145deg, #E3F2FD 0%, #BBDEFB 50%, #E3F2FD 100%)',
            imageRendering: 'pixelated'
          }}>
            <h4 className="font-bold text-blue-900 font-mono mb-2" style={{ fontFamily: 'monospace' }}>
              {isCorrect ? 'WHY THIS WORKED:' : 'WHY THIS MATTERS:'}
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
              💡 TIP: {isCorrect ? 'Keep making smart decisions like this!' : 'Think about which play gives you the best chance for an out or prevents runs!'}
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
            {isCorrect ? 'NICE! NEXT PLAY' : 'GOT IT! TRY AGAIN'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackPopup;
