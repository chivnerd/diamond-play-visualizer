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
  const bestThrow = getBestThrowTarget(scenarioData, runnersOnBase, level);
  
  // If the player choice matches the best throw, it's correct
  if (playerChoice === bestThrow) {
    return true;
  }
  
  // Additional logic for ground balls - first base is ALWAYS a valid out, plus force outs are correct
  if (scenarioName.includes('ground ball') || scenarioName.includes('grounder') || scenarioName.includes('chopper') || scenarioName.includes('roller')) {
    if (playerChoice === '1st') {
      return true; // First base is always an out on ground balls
    }
    
    // Force out situations are also correct when there's a runner to force
    if (runnersOnBase.includes('1st') && playerChoice === '2nd') {
      return true; // Force out at second - this is ALWAYS correct with runner on first
    }
    if (runnersOnBase.includes('1st') && runnersOnBase.includes('2nd') && playerChoice === '3rd') {
      return true; // Force out at third
    }
    if (runnersOnBase.includes('1st') && runnersOnBase.includes('2nd') && runnersOnBase.includes('3rd') && playerChoice === 'home') {
      return true; // Force out at home
    }
  }
  
  // For infield pop flies with runner on first - all catch options are correct
  if ((scenarioName.includes('pop fly') || scenarioName.includes('pop up')) && runnersOnBase.includes('1st')) {
    if (playerChoice === 'catch') {
      return true; // Just catch it
    }
    if (playerChoice === 'catch-throw-2nd') {
      return true; // Catch and throw to second (1 out, potential for more)
    }
    if (playerChoice === 'catch-tag-1st') {
      return true; // Catch and tag first (DOUBLE PLAY!)
    }
  }
  
  // For regular pop flies with no runners, only catch is correct
  if ((scenarioName.includes('pop fly') || scenarioName.includes('pop up')) && runnersOnBase.length === 0 && playerChoice === 'catch') {
    return true;
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
