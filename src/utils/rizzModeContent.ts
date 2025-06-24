export type RizzMode = 'youtuber' | 'shakespeare' | 'spanish' | 'liljon' | 'harrypotter' | 'english' | 'mcdonalds';

export const getRizzModeLabel = (mode: RizzMode): string => {
  switch (mode) {
    case 'youtuber': return '🔥 Brainrot';
    case 'shakespeare': return '🎭 Shakespeare';
    case 'spanish': return '🌶️ Spanish';
    case 'liljon': return '🎵 Lil Jon';
    case 'harrypotter': return '⚡ Harry Potter';
    case 'english': return '🇺🇸 Plain English';
    case 'mcdonalds': return '🍟 McDonald\'s';
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
    },
    harrypotter: {
      correct: 'Brilliant! Next batter awaits!',
      incorrect: 'Mischief managed! Try again!'
    },
    english: {
      correct: 'Great job! Next batter',
      incorrect: 'Try again!'
    },
    mcdonalds: {
      correct: 'I\'m lovin\' it! Next order up!',
      incorrect: 'Would you like to try again?'
    }
  };

  return isCorrect ? buttonTexts[rizzMode].correct : buttonTexts[rizzMode].incorrect;
};

export const getCorrectExplanations = (rizzMode: RizzMode, playerChoice: string, scenario: any): string => {
  const explanationSets = {
    youtuber: [
      "SIGMA move! You caught that ball like a GOAT. Throwing to second is mid rizz but still gets you that hamburger, no cap! 💯",
      "YOOO THAT'S BUSSIN! 🔥🔥 This is straight up GIGACHAD behavior! Double play = MAXIMUM RIZZ! Two hamburgers because you're literally HIM! W play fr fr! 💪",
      "Based and valid! You chose the safe play like a true sigma. Sometimes the smart move is the W move. Respect! 🗿",
      "SHEEEESH! 🔥 First base = GUARANTEED DUB! You understood the assignment and said NO to crash outs! Absolute unit behavior! 💪",
      "YESSIR! You just locked in and made the optimal play! That's some galaxy brain energy right there! Keep serving these Ws! 🧠✨",
    ],
    shakespeare: [
      "Hark! What noble artistry thou hast displayed upon this field of green! Thy throw to second base doth show wisdom beyond thy years, securing the hamburger with grace!",
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
    ],
    harrypotter: [
      "Bloody brilliant catch! Your throw to second base was pure magic! Like casting a perfect Stupefy charm - not the flashiest spell, but it gets the job done! ⚡",
      "By Merlin's beard! A double play more magnificent than Quidditch itself! You've got the reflexes of a Seeker and the precision of a Chaser! Absolutely magical! 🧙‍♂️",
      "Well done, young wizard! Sometimes the wisest choice is the safest one - even Hermione would approve of your calculated decision! 📚",
      "Expecto Patronum! First base was the perfect charm for this situation! You banished doubt like casting away a Dementor! ✨",
      "Outstanding! That play was more coordinated than a Weasley twin prank! You've definitely earned some House points! 🏆",
    ],
    english: [
      "Nice catch! Your throw to second base was a solid choice. You secured the out and made the right play.",
      "Excellent double play! You turned two outs perfectly. This is exactly how you control the game and keep runners from advancing.",
      "Good decision! You made the safe play by catching the ball. Sometimes the smart choice is the best choice.",
      "Perfect! First base was the right call here. You took the guaranteed out and prevented any complications.",
      "Well done! You made the optimal play for this situation. Keep reading the field like this and you'll do great.",
    ],
    mcdonalds: [
      "Ba da ba ba ba! You're lovin' that catch! Your throw to second was hot and fresh like our fries! 🍟",
      "Two all-beef patties... I mean two outs! That double play was served faster than a Big Mac! Over 99 billion plays served! 🍔",
      "Would you like to make that a combo? Because you just made the smart play! That's some premium quality baseball right there! 👑",
      "First base - have it your way! Wait, that's the other guys... I mean, you deserve a break today for that perfect throw! 🎯",
      "That play was fresher than our salads! You've got the golden arches of baseball talent! Keep up the McExcellent work! ✨",
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
    ],
    harrypotter: [
      "Blimey! First base was right there like Platform 9¾! Don't overcomplicate things when the obvious path is clear! Even a first-year could see that! 🚂",
      "Great galloping gargoyles! With bases loaded, you must throw home immediately! Don't let them score - that's like letting Voldemort into Hogwarts! 🏰",
      "Merlin's pants! The force out at third was as clear as a crystal ball! You've got to stop that lead runner from advancing to scoring position! 🔮",
      "Bloody hell! Second base was easier than a first-year Transfiguration spell! They have to run there - it's magic law! Don't make it harder than Potions class! 🧪",
      "Crikey! That runner's about to score faster than a Golden Snitch! Third base was the play to keep them from reaching the danger zone! ⚡",
    ],
    english: [
      "First base was the better choice here. You had a guaranteed out, but you chose a riskier play. Always take the sure thing when you can!",
      "With bases loaded, you need to throw home to prevent the run from scoring. First base won't help when they're about to score!",
      "You missed the force out at third base. That would have stopped the lead runner from advancing to scoring position.",
      "Second base was an easy force out since the runner has to advance. Don't make it harder than it needs to be!",
      "That runner is now in scoring position! A throw to third base would have kept them from advancing.",
    ],
    mcdonalds: [
      "Uh oh! Looks like you missed the happy meal here! First base was served on a golden platter! 🍟",
      "Sir, this is McDonald's! With bases loaded, you gotta throw home faster than we serve McNuggets! 🏠",
      "That's not lovin' it! The force out at third was as obvious as our golden arches! Don't let that runner supersize their lead! 🔔",
      "Would you like fries with that mistake? Second base was easier than ordering from our value menu! 💸",
      "McOops! That runner's about to score! Should've thrown to third - that's our McRecommendation! 🚫",
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
    },
    harrypotter: {
      correct: [
        'Keep casting those perfect plays! You\'re a natural born Quidditch captain! ⚡',
        'Brilliant work! You\'ve got more talent than all four Hogwarts houses combined! 🏆',
        'Magical decision-making! Professor McGonagall would be proud! 🐱',
        'Outstanding! You\'re playing like you\'ve got Felix Felicis in your veins! 🍀',
        'Superb! That play was smoother than butterbeer! Keep up the enchanting work! 🧙‍♂️',
      ],
      incorrect: [
        'Study your baseball spells more carefully, young apprentice! 📜',
        'Think before you cast your throw! Even Hermione studies before acting! 🧠',
        'Practice makes perfect! Even Harry had to train to catch the Golden Snitch! ⚡',
        'Learn from your mistakes like Harry learned from his Defense Against the Dark Arts lessons! 📚',
        'Don\'t be discouraged! Even the Boy Who Lived made mistakes before saving the wizarding world! 💪',
      ]
    },
    english: {
      correct: [
        'Great job! Keep making smart plays like this!',
        'You\'re getting the hang of it! Stay focused!',
        'Excellent decision-making! Keep it up!',
        'You\'re playing with good baseball IQ!',
        'Nice work! You\'re developing great instincts!',
      ],
      incorrect: [
        'Think about the situation before making your choice.',
        'Remember to consider all your options before throwing.',
        'Practice makes perfect! Keep working at it.',
        'Learn from this play and apply it next time.',
        'Don\'t get discouraged! Every player makes mistakes.',
      ]
    },
    mcdonalds: {
      correct: [
        'You\'re lovin\' those plays! Keep up the McExcellent work! 🍟',
        'That\'s fresher than our breakfast menu! Stay golden! ⭐',
        'Ba da ba ba ba! You\'re a natural! Keep serving those wins! 🏆',
        'Over 99 billion great plays served! You\'re doing fantastic! 📊',
        'Would you like to supersize that talent? Because you\'re already supersized! 👑',
      ],
      incorrect: [
        'Time to hit the playbooks like our drive-thru hits orders! 📚',
        'Think before you throw - that\'s our McRecommendation! 🧠',
        'Practice makes McPerfect! Come back when you\'re ready! 💪',
        'Learn from your mistakes - they\'re part of a balanced baseball diet! 📈',
        'Don\'t worry! Even Ronald McDonald struck out sometimes! 🤡',
      ]
    }
  };
  
  const tips = isCorrect ? tipSets[rizzMode].correct : tipSets[rizzMode].incorrect;
  return tips[Math.floor(Math.random() * tips.length)];
};
