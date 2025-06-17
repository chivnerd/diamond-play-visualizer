
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GameScenario, BaseballLevel } from '../../types/baseball';
import { isDoublePlay } from '../../utils/gameLogic';
import { RizzMode, getButtonText } from '../../utils/rizzModeContent';
import RizzModeSelector from './RizzModeSelector';
import FeedbackContent from './FeedbackContent';

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
  const [rizzMode, setRizzMode] = useState<RizzMode>('youtuber');

  if (!scenario || !correctChoice) return null;

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
            {isCorrect ? (isDouble ? '🐔🐔 DOUBLE CHICKEN W! 🐔🐔' : '🐔 CHICKEN SECURED! 🐔') : '🚫 NO CHICKEN L + RATIO! 🚫'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <RizzModeSelector rizzMode={rizzMode} onRizzModeChange={setRizzMode} />

          <FeedbackContent
            scenario={scenario}
            playerChoice={playerChoice}
            correctChoice={correctChoice}
            level={level}
            rizzMode={rizzMode}
            isCorrect={isCorrect}
            isDouble={isDouble}
          />

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
            {getButtonText(rizzMode, isCorrect)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackPopup;
