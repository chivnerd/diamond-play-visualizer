
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

  const getCorrectExplanations = () => {
    const explanations = [
      "SIGMA move! You caught that ball like a GOAT. Throwing to second is mid rizz but still gets you that chicken, no cap! 💯",
      "YOOO THAT'S BUSSIN! 🔥🔥 This is straight up GIGACHAD behavior! Double play = MAXIMUM RIZZ! Two chickens because you're literally HIM! W play fr fr! 💪",
      "Based and valid! You chose the safe play like a true sigma. Sometimes the smart move is the W move. Respect! 🗿",
      "SHEEEESH! 🔥 First base = GUARANTEED DUB! You understood the assignment and said NO to crash outs! Absolute unit behavior! 💪",
      "YESSIR! You just locked in and made the optimal play! That's some galaxy brain energy right there! Keep serving these Ws! 🧠✨",
      "OH MY GYAT! 🤯 You just hit different! That play was straight FIRE and no printer! You're cooking with gas! 🍳🔥",
      "BRO SAID 'NOT TODAY SATAN' and delivered! 😤 That's some ALPHA energy right there! You're the main character! 👑",
      "PERIODT! 💅 You just ATE and left NO CRUMBS! This play was absolutely SENDING me! You're HIM! 🗣️🔥",
      "NOT YOU BEING THE GOAT! 🐐 That was lowkey highkey the most SLAY thing I've ever seen! You're literally iconic! ✨",
      "BESTIE REALLY SAID 'WATCH ME COOK' and proceeded to serve a FIVE STAR MEAL! 👨‍🍳✨ This is giving main character energy!",
      "YOU'RE SO VALID FOR THIS! 💯 That play was absolutely IMMACULATE! No notes, just pure perfection! Chef's kiss! 😘👌",
      "BRO REALLY SAID 'I'M DIFFERENT' and PROVED IT! 🔥 You're not like other players, you're a COOL player! W human! 😎"
    ];
    
    if (playerChoice === 'catch-throw-2nd' && scenario.baseRunners.includes('1st')) {
      return explanations[0];
    } else if (playerChoice === 'catch-tag-1st' && scenario.baseRunners.includes('1st')) {
      return explanations[1];
    } else if (playerChoice === 'catch') {
      return explanations[2];
    } else if (playerChoice === '1st') {
      return explanations[3];
    }
    
    // Random correct explanation for other scenarios
    return explanations[Math.floor(Math.random() * explanations.length)];
  };

  const getIncorrectExplanations = () => {
    const scenarioName = scenario.name.toLowerCase();
    const runners = scenario.baseRunners;

    const wrongExplanations = [
      "Bruh... first base is literally free real estate! 💀 Don't get fancy when you can secure the bag! That's a certified L moment, learn from this mid play! 📉",
      "Nah fam, bases loaded = throw home IMMEDIATELY! 🏠 Don't let them score, that's how you take Ls! First base is mid when runs are on the line! 😤",
      "Yikes! Force out at third = BIG BRAIN PLAY! 🧠 Stop that lead runner from reaching the danger zone! You fumbled the bag on this one chief! 📦",
      "Oof, that's rough buddy! 😬 Force out at second is EASY MODE - they HAVE to run! Don't make it harder than it needs to be! Stay woke! 👁️",
      "MAJOR L! 💀 Runners on second base are SPEED RUNNING to home plate! Throw home or catch that L! Don't let them cook you like that! 🍳",
      "BRO YOU SLEPT! 😴 That runner is about to be in SCORING POSITION! Third base throw keeps them humble! You just let them level up for free! 📈",
      "Bro what are you doing?! 🤦‍♂️ No pressure = throw to second and keep them off the scoreboard! That's some NPC behavior right there! 🤖",
      "That ain't it chief! 💀 You gotta stay locked in and think about the play! Don't let the other team farm Ws off you! Study the meta! 📚",
      "BESTIE NO! 😭 You really thought that was the move? That's giving 'I failed the vibe check' energy! Time to touch grass and try again! 🌱",
      "Not you being DELULU! 🤡 That play was absolutely SENDING me... to therapy! You need to lock in fr! This ain't it! 🚫",
      "BRO REALLY SAID 'LET ME BE DIFFERENT' and chose VIOLENCE! 💀 That was straight up unhinged behavior! Time to ratio yourself! 📉",
      "OH NO BABY WHAT IS YOU DOING?! 😱 That play was giving 'I learned baseball from TikTok' vibes! We gotta get you some help! 🆘",
      "GIRLIE... that was NOT the serve you thought it was! 💅 That play was absolutely TRAGIC! Time to delete and start over! 🗑️",
      "STOPPP! 🛑 You really chose chaos today! That play was so bad it made my ancestors cry! Please touch some grass! 🌿😢",
      "NAHHH FR?! 🤨 You really looked at that situation and said 'Let me make this worse!' That's some chaotic evil energy! 👹",
      "BESTIE PLEASE! 🙏 That play was absolutely UNHINGED! You need to apologize to baseball itself! This is NOT the way! ❌"
    ];

    // Specific wrong explanations for scenarios
    if (scenarioName.includes('ground ball') || scenarioName.includes('grounder')) {
      if (correctChoice === '1st') {
        return wrongExplanations[0];
      } else if (correctChoice === 'home' && runners.includes('1st') && runners.includes('2nd') && runners.includes('3rd')) {
        return wrongExplanations[1];
      } else if (correctChoice === '3rd' && runners.includes('1st') && runners.includes('2nd')) {
        return wrongExplanations[2];
      } else if (correctChoice === '2nd' && runners.includes('1st')) {
        return wrongExplanations[3];
      }
    }

    if (scenarioName.includes('single')) {
      if (correctChoice === 'home' && (runners.includes('2nd') || runners.length >= 2)) {
        return wrongExplanations[4];
      } else if (correctChoice === '3rd' && runners.includes('1st') && !runners.includes('2nd')) {
        return wrongExplanations[5];
      } else if (correctChoice === '2nd' && runners.length === 0) {
        return wrongExplanations[6];
      }
    }

    // Random wrong explanation for other scenarios
    return wrongExplanations[Math.floor(Math.random() * wrongExplanations.length)];
  };

  const getRandomProTip = () => {
    const correctTips = [
      'Keep serving these Ws! You are HIM! 👑',
      'Stay locked in! You\'re absolutely COOKING! 🔥',
      'That\'s how you secure the bag! Keep going bestie! 💰',
      'You\'re lowkey highkey the GOAT! 🐐',
      'Main character energy! Never stop grinding! ✨',
      'You\'re literally built different! Keep slaying! 💅',
      'That\'s some galaxy brain behavior! Stay woke! 🧠',
      'You understood the assignment! No cap! 📝✅'
    ];
    
    const incorrectTips = [
      'Lock in and think about the plays! Don\'t let them catch you lacking! 🔒',
      'Time to hit the books! Study the meta! 📚',
      'Touch grass and come back stronger! 🌱',
      'Delete that energy and try again! 🗑️',
      'Stop being delulu and start being real! 💯',
      'Take the L and learn from it! Growth mindset! 📈',
      'Time to lock in fr! No more crash outs! 🚫',
      'Stop the cap and start the facts! 🧢❌'
    ];
    
    const tips = isCorrect ? correctTips : incorrectTips;
    return tips[Math.floor(Math.random() * tips.length)];
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
            {isCorrect ? (isDouble ? '🐔🐔 DOUBLE CHICKEN W! 🐔🐔' : '🐔 CHICKEN SECURED! 🐔') : '🚫 NO CHICKEN L + RATIO! 🚫'}
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
                Chickens farmed: {isDouble ? '2 (GIGA BASED)' : '1 (VALID)'}
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
              {isCorrect ? getCorrectExplanations() : getIncorrectExplanations()}
            </p>
          </div>

          <div className="p-3 border-4 border-yellow-500" style={{
            background: 'linear-gradient(145deg, #FFF9C4 0%, #FFF176 50%, #FFF9C4 100%)',
            imageRendering: 'pixelated'
          }}>
            <p className="text-yellow-900 font-mono text-center font-bold text-sm" style={{ fontFamily: 'monospace' }}>
              💡 PRO TIP: {getRandomProTip()}
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
            {isCorrect ? 'LETS GOOO! NEXT BATTER' : 'BET! RUN IT BACK'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackPopup;
