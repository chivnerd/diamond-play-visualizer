
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

type RizzMode = 'youtuber' | 'shakespeare' | 'spanish' | 'liljon';

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
    const explanationSets = {
      youtuber: [
        "SIGMA move! You caught that ball like a GOAT. Throwing to second is mid rizz but still gets you that chicken, no cap! 💯",
        "YOOO THAT'S BUSSIN! 🔥🔥 This is straight up GIGACHAD behavior! Double play = MAXIMUM RIZZ! Two chickens because you're literally HIM! W play fr fr! 💪",
        "Based and valid! You chose the safe play like a true sigma. Sometimes the smart move is the W move. Respect! 🗿",
        "SHEEEESH! 🔥 First base = GUARANTEED DUB! You understood the assignment and said NO to crash outs! Absolute unit behavior! 💪",
        "YESSIR! You just locked in and made the optimal play! That's some galaxy brain energy right there! Keep serving these Ws! 🧠✨",
      ],
      shakespeare: [
        "Hark! What noble artistry thou hast displayed upon this field of green! Thy throw to second base doth show wisdom beyond thy years, securing the quarry with grace!",
        "By my troth! A double play most wondrous! Thou art a master of the diamond's craft, turning two with such elegance that even the gods of sport do applaud thee!",
        "Well chosen, good sir! Thy prudent decision to secure the sure out doth speak of wisdom. 'Tis better to claim one certain victory than risk folly!",
        "Lo! First base beckons and thou dost answer! Like Odysseus returning home, thy throw finds its mark with certainty divine!",
        "Methinks thou art touched by providence! Thy play was wrought with such skill that Fortune herself smiles upon thee!",
      ],
      spanish: [
        "¡Órale! ¡Qué jugadón tan increíble! Tiraste esa pelota como un verdadero campeón. Segunda base está bien, pero tú eres el jefe aquí! 🔥",
        "¡MADRE MÍA! ¡Doble play espectacular! Eres una bestia en el campo, hermano! Dos outs de una vez - eso sí es calidad! ¡Eres el mejor! 💪",
        "¡Perfecto, mi amor! Jugada inteligente como siempre. A veces lo seguro es lo mejor. ¡Respeto total! 👏",
        "¡DIOS MÍO! Primera base es dinero seguro! Entendiste la tarea perfectamente. ¡No hay falla contigo! ¡Eres un crack! ⚾",
        "¡Ay, qué maravilla! Tu jugada fue pura poesía en el diamante. ¡Sigue así que vas para las grandes ligas! ✨",
      ],
      liljon: [
        "YEAHHHHH! WHAT?! OKAYYYY! You caught that ball like a BOSS! Second base throw - WHAT?! Still good though! YEAH! 🎵",
        "WHAAAAAT?! OKAYYYY! DOUBLE PLAY BABY! YEAHHHHH! Two outs! WHAT?! You the king of the field! OKAYYYY! Turn down for WHAT?! 🔥",
        "YEAHHH! OKAYYYY! Smart play right there! WHAT?! Sometimes you gotta keep it simple! YEAHHH! Respect! OKAYYYY! 🙌",
        "WHAAAAAT?! First base money! YEAHHH! OKAYYYY! You understood the assignment! WHAT?! No mistakes here! YEAHHH! 💰",
        "OKAYYYY! YEAHHH! That play was CRUNK! WHAT?! You brought the energy! YEAHHH! Keep it going! OKAYYYY! 🎉",
      ]
    };

    if (playerChoice === 'catch-throw-2nd' && scenario.baseRunners.includes('1st')) {
      return explanationSets[rizzMode][0];
    } else if (playerChoice === 'catch-tag-1st' && scenario.baseRunners.includes('1st')) {
      return explanationSets[rizzMode][1];
    } else if (playerChoice === 'catch') {
      return explanationSets[rizzMode][2];
    } else if (playerChoice === '1st') {
      return explanationSets[rizzMode][3];
    }
    
    return explanationSets[rizzMode][4];
  };

  const getIncorrectExplanations = () => {
    const wrongExplanationSets = {
      youtuber: [
        "Bruh... first base is literally free real estate! 💀 Don't get fancy when you can secure the bag! That's a certified L moment, learn from this mid play! 📉",
        "Nah fam, bases loaded = throw home IMMEDIATELY! 🏠 Don't let them score, that's how you take Ls! First base is mid when runs are on the line! 😤",
        "Yikes! Force out at third = BIG BRAIN PLAY! 🧠 Stop that lead runner from reaching the danger zone! You fumbled the bag on this one chief! 📦",
        "Oof, that's rough buddy! 😬 Force out at second is EASY MODE - they HAVE to run! Don't make it harder than it needs to be! Stay woke! 👁️",
        "BRO YOU SLEPT! 😴 That runner is about to be in SCORING POSITION! Third base throw keeps them humble! You just let them level up for free! 📈",
      ],
      shakespeare: [
        "Alack! First base doth lie unguarded, yet thou dost seek more treacherous waters! 'Tis folly to forsake the certain for the uncertain, good sir!",
        "By the saints! With runners aplenty, home plate demands thy attention! Let not the enemy score whilst thou dost dally elsewhere!",
        "Marry, what madness is this? The force at third base calls to thee like a siren's song! Heed its call and stop their advance!",
        "Fie upon thee! Second base awaits with open arms, yet thou dost turn away! 'Tis an easy conquest thou hast spurned!",
        "Alas! Thou hast let the hounds of war slip free! That runner now threatens to score! Guard thy gates more wisely!",
      ],
      spanish: [
        "¡Ay, no mijo! Primera base está ahí regalada! No te compliques la vida cuando puedes asegurar el out. ¡Esa fue una decisión muy floja! 😅",
        "¡Por favor! Con las bases llenas tienes que tirar a home inmediatamente! No dejes que anoten, ¡eso es perder fácil! 🏠",
        "¡Órale! La fuerza en tercera base era obvia! Tienes que parar al corredor principal. ¡Se te escapó esa jugada! 🤦‍♂️",
        "¡Ay, Dios! Segunda base es facilísimo - tienen que correr! No te hagas la vida difícil, carnalito! ¡Usa la cabeza! 🧠",
        "¡No manches! Ese corredor ya está en posición de anotar! Tercera base era la jugada. ¡Se te fue el tren! 🚂",
      ],
      liljon: [
        "WHAAAAAT?! NOOO! WHAT?! First base was right there! YEAHHH! Don't make it hard when it's easy! OKAYYYY! That's an L! WHAT?! 😭",
        "NOOOO! WHAT?! Bases loaded means HOME PLATE! YEAHHH! Don't let them score! OKAYYYY! That's how you lose! WHAT?! 🏠",
        "WHAAAAAT?! Third base force out! YEAHHH! OKAYYYY! Stop that runner! WHAT?! You missed that one! YEAHHH! 🛑",
        "NOOOO! WHAT?! Second base was EASY! YEAHHH! OKAYYYY! They gotta run! WHAT?! Why make it hard?! YEAHHH! 🤷‍♂️",
        "WHAAAAAT?! OKAYYYY! That runner bout to score! YEAHHH! Third base was the move! WHAT?! You slept on that one! OKAYYYY! 😴",
      ]
    };

    const scenarioName = scenario.name.toLowerCase();
    const runners = scenario.baseRunners;

    // Specific wrong explanations for scenarios
    if (scenarioName.includes('ground ball') || scenarioName.includes('grounder')) {
      if (correctChoice === '1st') {
        return wrongExplanationSets[rizzMode][0];
      } else if (correctChoice === 'home' && runners.includes('1st') && runners.includes('2nd') && runners.includes('3rd')) {
        return wrongExplanationSets[rizzMode][1];
      } else if (correctChoice === '3rd' && runners.includes('1st') && runners.includes('2nd')) {
        return wrongExplanationSets[rizzMode][2];
      } else if (correctChoice === '2nd' && runners.includes('1st')) {
        return wrongExplanationSets[rizzMode][3];
      }
    }

    if (scenarioName.includes('single')) {
      if (correctChoice === 'home' && (runners.includes('2nd') || runners.length >= 2)) {
        return wrongExplanationSets[rizzMode][1];
      } else if (correctChoice === '3rd' && runners.includes('1st') && !runners.includes('2nd')) {
        return wrongExplanationSets[rizzMode][4];
      } else if (correctChoice === '2nd' && runners.length === 0) {
        return wrongExplanationSets[rizzMode][3];
      }
    }

    // Random wrong explanation for other scenarios
    return wrongExplanationSets[rizzMode][Math.floor(Math.random() * wrongExplanationSets[rizzMode].length)];
  };

  const getRandomProTip = () => {
    const tipSets = {
      youtuber: {
        correct: [
          'Keep serving these Ws! You are HIM! 👑',
          'Stay locked in! You\'re absolutely COOKING! 🔥',
          'That\'s how you secure the bag! Keep going bestie! 💰',
          'You\'re lowkey highkey the GOAT! 🐐',
          'Main character energy! Never stop grinding! ✨',
        ],
        incorrect: [
          'Lock in and think about the plays! Don\'t let them catch you lacking! 🔒',
          'Time to hit the books! Study the meta! 📚',
          'Touch grass and come back stronger! 🌱',
          'Delete that energy and try again! 🗑️',
          'Stop being delulu and start being real! 💯',
        ]
      },
      shakespeare: {
        correct: [
          'Continue thy noble quest! Thou art truly blessed by the baseball gods! ⚾',
          'Thy prowess grows with each passing play! Onward to glory! 👑',
          'Well done, good sir! Let virtue be thy guide always! ✨',
          'Thou art a master of thy craft! Continue this fine work! 🎭',
          'By my faith, thou dost play with the skill of legends! 🗡️',
        ],
        incorrect: [
          'Study the ancient ways of baseball, young apprentice! 📜',
          'Let wisdom guide thy hand, not haste! Think before thou dost throw! 🧠',
          'Practice maketh perfect! Return to thy training! ⚔️',
          'Learn from thy mistakes, for they are thy greatest teachers! 📚',
          'Be not discouraged! Even great knights stumble before they soar! 🏰',
        ]
      },
      spanish: {
        correct: [
          '¡Sigue así, campeón! ¡Eres una máquina! 🏆',
          '¡Qué talento tienes! ¡Sigue adelante! ⭐',
          '¡Eres el mejor! ¡No pares nunca! 💪',
          '¡Tienes madera de estrella! ¡Dale que puedes! 🌟',
          '¡Increíble! ¡Vas para las grandes ligas! ⚾',
        ],
        incorrect: [
          '¡A estudiar más baseball, mijo! ¡La práctica hace al maestro! 📖',
          '¡Piensa antes de tirar! ¡Usa la cabeza! 🧠',
          '¡No te desanimes! ¡Los grandes también se equivocan! 💪',
          '¡Aprende de los errores! ¡Así se crece! 📈',
          '¡Dale otra vez! ¡Tú puedes! 🔥',
        ]
      },
      liljon: {
        correct: [
          'KEEP GOING! YEAHHH! YOU THE BEST! OKAYYYY! 👑',
          'TURN UP! WHAT?! YOU ON FIRE! YEAHHH! 🔥',
          'DON\'T STOP! OKAYYYY! YOU A BEAST! WHAT?! 💪',
          'CRUNK ENERGY! YEAHHH! KEEP IT LIT! OKAYYYY! 🎉',
          'YOU THE KING! WHAT?! BOW DOWN! YEAHHH! 👸',
        ],
        incorrect: [
          'STUDY UP! YEAHHH! HIT THE BOOKS! OKAYYYY! 📚',
          'THINK FIRST! WHAT?! THEN THROW! YEAHHH! 🧠',
          'TRY AGAIN! OKAYYYY! YOU GOT THIS! WHAT?! 💪',
          'LEARN FROM IT! YEAHHH! GET BETTER! OKAYYYY! 📈',
          'NO QUIT! WHAT?! KEEP TRYING! YEAHHH! 🚫',
        ]
      }
    };
    
    const tips = isCorrect ? tipSets[rizzMode].correct : tipSets[rizzMode].incorrect;
    return tips[Math.floor(Math.random() * tips.length)];
  };

  const getRizzModeLabel = (mode: RizzMode) => {
    switch (mode) {
      case 'youtuber': return '🔥 Brainrot';
      case 'shakespeare': return '🎭 Shakespeare';
      case 'spanish': return '🌶️ Spanish';
      case 'liljon': return '🎵 Lil Jon';
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
            {isCorrect ? (isDouble ? '🐔🐔 DOUBLE CHICKEN W! 🐔🐔' : '🐔 CHICKEN SECURED! 🐔') : '🚫 NO CHICKEN L + RATIO! 🚫'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-3 border-4 border-purple-500" style={{
            background: 'linear-gradient(145deg, #E1BEE7 0%, #D1C4E9 50%, #E1BEE7 100%)',
            imageRendering: 'pixelated'
          }}>
            <h4 className="font-bold text-purple-900 font-mono mb-2" style={{ fontFamily: 'monospace' }}>
              🎭 RIZZ MODE:
            </h4>
            <Select value={rizzMode} onValueChange={(value: RizzMode) => setRizzMode(value)}>
              <SelectTrigger className="w-full font-mono" style={{ fontFamily: 'monospace' }}>
                <SelectValue placeholder="Choose your vibe..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="youtuber">{getRizzModeLabel('youtuber')}</SelectItem>
                <SelectItem value="shakespeare">{getRizzModeLabel('shakespeare')}</SelectItem>
                <SelectItem value="spanish">{getRizzModeLabel('spanish')}</SelectItem>
                <SelectItem value="liljon">{getRizzModeLabel('liljon')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

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
