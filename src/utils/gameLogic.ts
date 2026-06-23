import { GameScenario, BaseballLevel } from '../types/baseball';
import { basePositions } from './baseballPositions';

export const getBestThrowTarget = (scenarioData: GameScenario, runnersOnBase: string[], level: BaseballLevel) => {
  const scenarioName = scenarioData.name.toLowerCase();
  
  // For younger levels, simplify decisions
  if (level === 'tball' || level === 'coach-pitch') {
    if (scenarioName.includes('ground ball')) {
      return '1st'; // Always go for the sure out
    }
    if (scenarioName.includes('pop up')) {
      return 'catch';
    }
  }

  // For sacrifice bunts and wheel plays, go for the force out
  if (scenarioName.includes('sacrifice bunt') || scenarioName.includes('wheel play')) {
    if (runnersOnBase.includes('1st') && runnersOnBase.includes('2nd')) {
      return '3rd'; // Force out at third
    }
    if (runnersOnBase.includes('1st')) {
      return '2nd'; // Force out at second
    }
  }

  // Ground ball scenarios - prioritize force outs when available
  if (scenarioName.includes('ground ball') || scenarioName.includes('grounder') || scenarioName.includes('chopper') || scenarioName.includes('roller')) {
    // Runner on 1st only - force out at 2nd is the best choice
    if (runnersOnBase.includes('1st') && !runnersOnBase.includes('2nd') && !runnersOnBase.includes('3rd')) {
      return '2nd'; // Force out at second base
    }
    // Runners on 1st and 2nd - force out at 3rd is preferred
    if (runnersOnBase.includes('1st') && runnersOnBase.includes('2nd') && !runnersOnBase.includes('3rd')) {
      return '3rd'; // Force out at third base
    }
    // Bases loaded - force out at home is preferred
    if (runnersOnBase.includes('1st') && runnersOnBase.includes('2nd') && runnersOnBase.includes('3rd')) {
      return 'home'; // Force out at home plate
    }
    // Runner on 2nd only OR runner on 3rd only - first base is the best choice (get the sure out)
    if ((runnersOnBase.includes('2nd') && !runnersOnBase.includes('1st')) || 
        (runnersOnBase.includes('3rd') && !runnersOnBase.includes('1st'))) {
      return '1st'; // Get the sure out - no force play available
    }
    // Any other ground ball scenario - first base is always a valid out
    return '1st';
  }

  // For singles with runner on second or bases loaded, throw home
  if (scenarioName.includes('single') && (runnersOnBase.includes('2nd') || runnersOnBase.length >= 2)) {
    return 'home';
  }

  // For singles with runner on first, throw to third
  if (scenarioName.includes('single') && runnersOnBase.includes('1st') && !runnersOnBase.includes('2nd')) {
    return '3rd';
  }

  // For doubles with runners on base, throw home
  if (scenarioName.includes('double') && runnersOnBase.length > 0) {
    return 'home';
  }

  // For pop flies, catch for out
  if (scenarioName.includes('pop fly') || scenarioName.includes('pop up')) {
    return 'catch';
  }

  // Default to second base for singles with no runners
  if (scenarioName.includes('single') && runnersOnBase.length === 0) {
    return '2nd';
  }

  // Default to third base for doubles with no runners
  if (scenarioName.includes('double') && runnersOnBase.length === 0) {
    return '3rd';
  }

  return '2nd'; // Default fallback
};

export const isCorrectThrow = (playerChoice: string, scenarioData: GameScenario, level: BaseballLevel): boolean => {
  const scenarioName = scenarioData.name.toLowerCase();
  const runnersOnBase = scenarioData.baseRunners;
  
  // For ground balls, multiple answers are often correct
  if (scenarioName.includes('ground ball') || scenarioName.includes('grounder') || scenarioName.includes('chopper') || scenarioName.includes('roller')) {
    
    // First base is ALWAYS correct on ground balls (get the sure out)
    if (playerChoice === '1st') {
      return true;
    }
    
    // Force out situations are also correct
    if (runnersOnBase.includes('1st') && playerChoice === '2nd') {
      return true; // Force out at second with runner on first
    }
    if (runnersOnBase.includes('1st') && runnersOnBase.includes('2nd') && playerChoice === '3rd') {
      return true; // Force out at third with runners on first and second
    }
    if (runnersOnBase.includes('1st') && runnersOnBase.includes('2nd') && runnersOnBase.includes('3rd') && playerChoice === 'home') {
      return true; // Force out at home with bases loaded
    }
    
    // For younger levels, be more lenient - any reasonable throw is acceptable
    if (level === 'tball' || level === 'coach-pitch') {
      return true; // All throws are learning opportunities at this level
    }
    
    return false; // No other ground ball throws are correct
  }
  
  // For singles, multiple correct answers based on situation
  if (scenarioName.includes('single')) {
    // With runner on second or bases loaded, home is correct
    if ((runnersOnBase.includes('2nd') || runnersOnBase.length >= 2) && playerChoice === 'home') {
      return true;
    }
    // With runner on first only, third is correct
    if (runnersOnBase.includes('1st') && !runnersOnBase.includes('2nd') && playerChoice === '3rd') {
      return true;
    }
    // With no runners, second is correct
    if (runnersOnBase.length === 0 && playerChoice === '2nd') {
      return true;
    }
    // For younger levels, first base is also acceptable
    if ((level === 'tball' || level === 'coach-pitch') && playerChoice === '1st') {
      return true;
    }
  }
  
  // For doubles, multiple correct answers
  if (scenarioName.includes('double')) {
    // With runners on base, home is correct
    if (runnersOnBase.length > 0 && playerChoice === 'home') {
      return true;
    }
    // With no runners, third is correct
    if (runnersOnBase.length === 0 && playerChoice === '3rd') {
      return true;
    }
    // For younger levels, first base is also acceptable
    if ((level === 'tball' || level === 'coach-pitch') && playerChoice === '1st') {
      return true;
    }
  }
  
  // For infield pop flies with runner on first - all catch options are correct
  if ((scenarioName.includes('pop fly') || scenarioName.includes('pop up')) && runnersOnBase.includes('1st')) {
    if (playerChoice === 'catch') {
      return true; // Just catch it
    }
    if (playerChoice === 'catch-throw-2nd') {
      return true; // Catch and throw to second
    }
    if (playerChoice === 'catch-tag-1st') {
      return true; // Catch and tag first (DOUBLE PLAY!)
    }
  }
  
  // For regular pop flies with no runners, only catch is correct
  if ((scenarioName.includes('pop fly') || scenarioName.includes('pop up')) && runnersOnBase.length === 0 && playerChoice === 'catch') {
    return true;
  }
  
  // For sacrifice bunts and wheel plays
  if (scenarioName.includes('sacrifice bunt') || scenarioName.includes('wheel play')) {
    if (runnersOnBase.includes('1st') && runnersOnBase.includes('2nd') && playerChoice === '3rd') {
      return true; // Force out at third
    }
    if (runnersOnBase.includes('1st') && !runnersOnBase.includes('2nd') && playerChoice === '2nd') {
      return true; // Force out at second
    }
    // First base is also acceptable (get the sure out)
    if (playerChoice === '1st') {
      return true;
    }
  }
  
  return false;
};

// New function to determine if a play results in a double play (2 chickens)
export const isDoublePlay = (playerChoice: string, scenarioData: GameScenario): boolean => {
  const scenarioName = scenarioData.name.toLowerCase();
  const runnersOnBase = scenarioData.baseRunners;
  
  // Only "catch and tag first" results in a guaranteed double play
  if ((scenarioName.includes('pop fly') || scenarioName.includes('pop up')) && 
      runnersOnBase.includes('1st') && 
      playerChoice === 'catch-tag-1st') {
    return true;
  }
  
  return false;
};

export const getPlayExplanation = (scenarioData: GameScenario, throwTarget: string | null, level: BaseballLevel) => {
  const scenarioName = scenarioData.name.toLowerCase();
  const runnersOnBase = scenarioData.baseRunners;
  
  let explanation = `**${scenarioData.name}** (${level.toUpperCase().replace('-', ' ')} Level)\n\n`;
  
  // Level-specific context
  if (level === 'tball' || level === 'coach-pitch') {
    explanation += "**Level Context:** At this level, focus on basic positioning and getting outs. Players are still learning fundamentals.\n\n";
  } else if (level === 'minors') {
    explanation += "**Level Context:** Players are developing more advanced skills. Infield plays are still most common.\n\n";
  } else {
    explanation += "**Level Context:** Advanced defensive positioning with emphasis on preventing runs and strategic play.\n\n";
  }
  
  // Explain the initial situation
  if (runnersOnBase.length === 0) {
    explanation += "**Situation:** No runners on base - focus on preventing the batter from advancing.\n\n";
  } else {
    explanation += `**Situation:** Runner(s) on ${runnersOnBase.join(' and ')} base - prevent advancing runners from scoring.\n\n`;
  }

  // Explain key player responsibilities
  if (scenarioName.includes('single to left')) {
    explanation += "**Key Actions:**\n";
    explanation += "• Left fielder fields the ball cleanly\n";
    explanation += "• Shortstop positions as cut-off man between LF and target base\n";
    if (level === 'tball' || level === 'coach-pitch' || level === 'minors') {
      explanation += "• Left center fielder backs up the left fielder\n";
    } else {
      explanation += "• Center fielder backs up the left fielder\n";
    }
    if (runnersOnBase.includes('2nd') || runnersOnBase.length >= 2) {
      explanation += "• Third baseman becomes cut-off for home plate\n";
      explanation += "• Pitcher backs up the catcher at home\n";
    }
  } else if (scenarioName.includes('single to center')) {
    explanation += "**Key Actions:**\n";
    if (level === 'tball' || level === 'coach-pitch' || level === 'minors') {
      explanation += "• Left center or right center fielder has the best angle to the ball\n";
      explanation += "• Other outfielders back up the play\n";
    } else {
      explanation += "• Center fielder has the best angle to the ball\n";
      explanation += "• Both corner outfielders back up the center fielder\n";
    }
    if (runnersOnBase.includes('1st')) {
      explanation += "• Shortstop becomes cut-off man for throw to third\n";
    } else if (runnersOnBase.includes('2nd')) {
      explanation += "• First baseman becomes cut-off man for throw to home\n";
    }
  } else if (scenarioName.includes('single to right')) {
    explanation += "**Key Actions:**\n";
    explanation += "• Right fielder fields the ball\n";
    explanation += "• Second baseman positions as cut-off man\n";
    if (level === 'tball' || level === 'coach-pitch' || level === 'minors') {
      explanation += "• Right center fielder backs up the right fielder\n";
    } else {
      explanation += "• Center fielder backs up the right fielder\n";
    }
  } else if (scenarioName.includes('ground ball')) {
    explanation += "**Key Actions:**\n";
    explanation += "• Infielder fields the ball cleanly\n";
    explanation += "• Make the sure out - don't rush the throw\n";
    explanation += "• Communicate with teammates about the play\n";
    if (level === 'tball' || level === 'coach-pitch') {
      explanation += "• Focus on catching the ball first, then making the throw\n";
    }
  } else if (scenarioName.includes('pop fly')) {
    explanation += "**Key Actions:**\n";
    explanation += "• Call the ball loudly to avoid collisions\n";
    explanation += "• Get under the ball with two hands\n";
    explanation += "• Let the ball come down to you\n";
    if (level === 'tball' || level === 'coach-pitch') {
      explanation += "• Focus on catching for the out - don't worry about runners\n";
    }
  }

  // Explain the throw decision
  if (throwTarget) {
    explanation += `\n**Why throw to ${throwTarget === 'home' ? 'home plate' : throwTarget + ' base'}?**\n`;
    
    if (throwTarget === 'home') {
      explanation += "• Runner from 2nd base can score on most singles\n";
      explanation += "• Home plate is the most important base to protect\n";
      explanation += "• Force the runner to make a good slide\n";
    } else if (throwTarget === '3rd') {
      explanation += "• Runner advancing to 3rd is in scoring position\n";
      explanation += "• 3rd base puts runner 90 feet from home\n";
      explanation += "• Prevent the runner from getting to scoring position\n";
    } else if (throwTarget === '2nd') {
      explanation += "• Keep the batter from advancing to scoring position\n";
      explanation += "• 2nd base puts the batter in scoring position\n";
      explanation += "• Show arm strength to deter future base running\n";
    } else if (throwTarget === '1st') {
      explanation += "• Get the sure out at first base\n";
      explanation += "• Don't risk a throwing error on a long throw\n";
      explanation += "• Take what the defense gives you\n";
    }
  } else {
    explanation += "\n**No throw needed** - this is a catch for an out!\n";
    explanation += "• Call the ball loudly to avoid confusion\n";
    explanation += "• Clean catch results in an immediate out\n";
  }

  // Add tactical insight
  explanation += "\n**Tactical Insight:**\n";
  if (level === 'tball' || level === 'coach-pitch') {
    explanation += "• Focus on fundamentals: catch the ball, then make the play\n";
    explanation += "• Don't worry about advanced strategies - get the sure out\n";
    explanation += "• Encourage players and keep the game fun!\n";
  } else if (level === 'minors') {
    explanation += "• Players are learning more complex plays\n";
    explanation += "• Emphasize communication and teamwork\n";
    explanation += "• Still focus on getting outs over preventing advancement\n";
  } else {
    if (runnersOnBase.length === 0) {
      explanation += "• With no pressure from runners, defense can be more aggressive\n";
      explanation += "• Focus on preventing extra bases and showing arm strength\n";
    } else if (runnersOnBase.length === 1) {
      explanation += "• Balance between getting the force out and preventing advancement\n";
      explanation += "• Communication between fielders is crucial\n";
    } else {
      explanation += "• Multiple runners create complex decisions\n";
      explanation += "• Priority is usually preventing runs from scoring\n";
      explanation += "• Cut-off man must be ready to redirect throw quickly\n";
    }
  }

  return explanation;
};

// A concise, scenario-specific reason for why the correct base/play was the right
// call. Used by the feedback popup to teach the actual baseball logic, not just hype.
export const getCorrectChoiceReason = (correctChoice: string, scenarioData: GameScenario): string => {
  const runners = scenarioData.baseRunners;
  const hasFirst = runners.includes('1st');
  const hasSecond = runners.includes('2nd');
  const basesLoaded = hasFirst && hasSecond && runners.includes('3rd');

  switch (correctChoice) {
    case 'catch':
      return "The ball's in the air, so catching it IS the out — no throw needed. Squeeze it with two hands and you're done.";
    case 'catch-throw-2nd':
      return "Catch the ball first for the out, then fire to 2nd to double off the runner who took off early. Two outs on one play!";
    case 'catch-tag-1st':
      return "Make the catch for the out, then get the ball back to 1st to double off the runner who left the bag too soon.";
    case 'home':
      return basesLoaded
        ? "Bases are loaded, so the runner on 3rd is FORCED home. A throw to HOME PLATE is the force out — and stopping a run is the most valuable out on the field."
        : "A runner is racing to score, so HOME PLATE is where the out matters most. Cut the run down before it crosses the plate.";
    case '3rd':
      return hasFirst && hasSecond
        ? "With runners on 1st and 2nd, the lead runner is FORCED to 3rd. Getting the out there keeps that runner out of scoring position."
        : "Throwing to 3rd stops the lead runner 90 feet short of home — keep them out of scoring position.";
    case '2nd':
      return hasFirst
        ? "The runner on 1st HAS to run with the batter coming, so 2nd is an easy force out — and it sets up the double play."
        : "A throw to 2nd keeps the batter from reaching scoring position. Show that arm and shut the play down.";
    case '1st':
      return runners.length === 0
        ? "Bases are empty, so 1st is your only force out. Beat the batter to the bag and take the sure out."
        : "1st base is the guaranteed out on the batter — take the sure thing instead of risking a tougher throw.";
    default:
      return "This was the highest-percentage play for the situation — you read the field right.";
  }
};
