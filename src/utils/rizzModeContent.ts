export type RizzMode = 'youtuber' | 'shakespeare' | 'spanish' | 'liljon';

export const getRizzModeLabel = (mode: RizzMode): string => {
  switch (mode) {
    case 'youtuber': return '🔥 Brainrot';
    case 'shakespeare': return '🎭 Shakespeare';
    case 'spanish': return '🌶️ Spanish';
    case 'liljon': return '🎵 Lil Jon';
  }
};

export const getButtonText = (rizzMode: RizzMode, isCorrect: boolean): string => {
  const buttonTexts = {
    youtuber: {
      correct: 'LETS GOOO! NEXT BATTER',
      incorrect: 'BET! RUN IT BACK'
    },
    shakespeare: {
      correct: 'Huzzah! To the next challenger!',
      incorrect: 'Fear not! Another chance awaits!'
    },
    spanish: {
      correct: '¡VÁMONOS! ¡SIGUIENTE BATEADOR!',
      incorrect: '¡DALE! ¡OTRA VEZ!'
    },
    liljon: {
      correct: 'YEAHHH! NEXT UP! OKAYYYY!',
      incorrect: 'WHAT?! TRY AGAIN! YEAHHH!'
    }
  };

  return isCorrect ? buttonTexts[rizzMode].correct : buttonTexts[rizzMode].incorrect;
};

export const getCorrectExplanations = (rizzMode: RizzMode, playerChoice: string, scenario: any): string => {
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

export const getIncorrectExplanations = (rizzMode: RizzMode, scenario: any, correctChoice: string): string => {
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

export const getRandomProTip = (rizzMode: RizzMode, isCorrect: boolean): string => {
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
