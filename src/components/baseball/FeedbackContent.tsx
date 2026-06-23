
import React from 'react';
import { GameScenario, BaseballLevel } from '../../types/baseball';
import { RizzMode, getCorrectExplanations, getIncorrectExplanations, getRandomProTip } from '../../utils/rizzModeContent';
import { getCorrectChoiceReason } from '../../utils/gameLogic';

interface FeedbackContentProps {
  scenario: GameScenario;
  playerChoice: string;
  correctChoice: string;
  level: BaseballLevel;
  rizzMode: RizzMode;
  isCorrect: boolean;
  isDouble: boolean;
}

const FeedbackContent: React.FC<FeedbackContentProps> = ({
  scenario,
  playerChoice,
  correctChoice,
  level,
  rizzMode,
  isCorrect,
  isDouble
}) => {
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

  return (
    <>
      <div className={`p-4 border-4 ${isCorrect ? 'border-green-500' : 'border-red-500'}`} style={{
        background: isCorrect 
          ? 'linear-gradient(145deg, #E8F5E8 0%, #C8E6C9 50%, #E8F5E8 100%)'
          : 'linear-gradient(145deg, #FFEBEE 0%, #FFCDD2 50%, #FFEBEE 100%)',
        imageRendering: 'pixelated'
      }}>
        <h4 className={`font-bold ${isCorrect ? 'text-green-900' : 'text-red-900'} font-mono mb-2`} style={{ fontFamily: 'monospace' }}>
          WHAT JUST HAPPENED FR:
        </h4>
        <p className={`${isCorrect ? 'text-green-800' : 'text-red-800'} font-mono text-sm`} style={{ fontFamily: 'monospace' }}>
          Your play: <strong>{getChoiceLabel(playerChoice)}</strong>
        </p>
        <p className={`${isCorrect ? 'text-green-800' : 'text-red-800'} font-mono text-sm`} style={{ fontFamily: 'monospace' }}>
          Chad move: <strong>{getChoiceLabel(correctChoice)}</strong>
        </p>
        {isCorrect && (
          <p className="text-green-800 font-mono text-sm font-bold" style={{ fontFamily: 'monospace' }}>
            Cheeseburgers earned: {isDouble ? '2 (GIGA BASED)' : '1 (VALID)'}
          </p>
        )}
      </div>

      <div className="p-4 border-4 border-blue-500" style={{
        background: 'linear-gradient(145deg, #E3F2FD 0%, #BBDEFB 50%, #E3F2FD 100%)',
        imageRendering: 'pixelated'
      }}>
        <h4 className="font-bold text-blue-900 font-mono mb-2" style={{ fontFamily: 'monospace' }}>
          {isCorrect ? 'WHY THIS IS FIRE:' : 'HOW TO NOT BE MID:'}
        </h4>
        <p className="text-blue-800 font-mono text-sm" style={{ fontFamily: 'monospace' }}>
          {isCorrect
            ? getCorrectExplanations(rizzMode, playerChoice, scenario)
            : getIncorrectExplanations(rizzMode, scenario, correctChoice)
          }
        </p>
        <div className="mt-3 pt-3 border-t-2 border-blue-400">
          <h5 className="font-bold text-blue-900 font-mono text-xs mb-1" style={{ fontFamily: 'monospace' }}>
            THE PLAY: {getChoiceLabel(correctChoice)}
          </h5>
          <p className="text-blue-800 font-mono text-sm" style={{ fontFamily: 'monospace' }}>
            {getCorrectChoiceReason(correctChoice, scenario)}
          </p>
        </div>
      </div>

      <div className="p-3 border-4 border-yellow-500" style={{
        background: 'linear-gradient(145deg, #FFF9C4 0%, #FFF176 50%, #FFF9C4 100%)',
        imageRendering: 'pixelated'
      }}>
        <p className="text-yellow-900 font-mono text-center font-bold text-sm" style={{ fontFamily: 'monospace' }}>
          💡 PRO TIP: {getRandomProTip(rizzMode, isCorrect)}
        </p>
      </div>
    </>
  );
};

export default FeedbackContent;
