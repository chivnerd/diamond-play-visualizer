import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, RotateCcw, ArrowRight } from 'lucide-react';

interface Player {
  id: string;
  position: string;
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  isActive: boolean;
  role: 'fielder' | 'backup' | 'cover' | 'cutoff' | 'normal';
}

interface Runner {
  id: string;
  base: 'home' | '1st' | '2nd' | '3rd';
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  isRunning: boolean;
}

interface Ball {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  isMoving: boolean;
  isThrown: boolean;
  throwTarget?: string;
}

const BaseballField = () => {
  const [players, setPlayers] = useState<Player[]>([
    { id: 'P', position: 'Pitcher', x: 250, y: 280, originalX: 250, originalY: 280, isActive: false, role: 'normal' },
    { id: 'C', position: 'Catcher', x: 250, y: 350, originalX: 250, originalY: 350, isActive: false, role: 'normal' },
    { id: '1B', position: '1st Base', x: 320, y: 280, originalX: 320, originalY: 280, isActive: false, role: 'normal' },
    { id: '2B', position: '2nd Base', x: 280, y: 220, originalX: 280, originalY: 220, isActive: false, role: 'normal' },
    { id: '3B', position: '3rd Base', x: 180, y: 280, originalX: 180, originalY: 280, isActive: false, role: 'normal' },
    { id: 'SS', position: 'Shortstop', x: 220, y: 220, originalX: 220, originalY: 220, isActive: false, role: 'normal' },
    { id: 'LF', position: 'Left Field', x: 120, y: 120, originalX: 120, originalY: 120, isActive: false, role: 'normal' },
    { id: 'CF', position: 'Center Field', x: 250, y: 80, originalX: 250, originalY: 80, isActive: false, role: 'normal' },
    { id: 'RF', position: 'Right Field', x: 380, y: 120, originalX: 380, originalY: 120, isActive: false, role: 'normal' },
  ]);

  const [runners, setRunners] = useState<Runner[]>([]);
  const [ball, setBall] = useState<Ball>({
    x: 250,
    y: 350,
    targetX: 250,
    targetY: 350,
    isMoving: false,
    isThrown: false
  });

  const [scenario, setScenario] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentScenario, setCurrentScenario] = useState<any>(null);
  const [playComplete, setPlayComplete] = useState(false);
  const [playExplanation, setPlayExplanation] = useState<string>('');

  const basePositions = {
    home: { x: 250, y: 350 },
    '1st': { x: 320, y: 280 },
    '2nd': { x: 250, y: 210 },
    '3rd': { x: 180, y: 280 }
  };

  // Function to get detailed play explanation
  const getPlayExplanation = (scenarioData: any, throwTarget: string | null) => {
    const scenarioName = scenarioData.name.toLowerCase();
    const runnersOnBase = scenarioData.baseRunners;
    
    let explanation = `**${scenarioData.name}**\n\n`;
    
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
      explanation += "• Center fielder backs up the left fielder\n";
      if (runnersOnBase.includes('2nd') || runnersOnBase.length >= 2) {
        explanation += "• Third baseman becomes cut-off for home plate\n";
        explanation += "• Pitcher backs up the catcher at home\n";
      }
    } else if (scenarioName.includes('single to center')) {
      explanation += "**Key Actions:**\n";
      explanation += "• Center fielder has the best angle to the ball\n";
      explanation += "• Both corner outfielders back up the center fielder\n";
      if (runnersOnBase.includes('1st')) {
        explanation += "• Shortstop becomes cut-off man for throw to third\n";
      } else if (runnersOnBase.includes('2nd')) {
        explanation += "• First baseman becomes cut-off man for throw to home\n";
      }
    } else if (scenarioName.includes('single to right')) {
      explanation += "**Key Actions:**\n";
      explanation += "• Right fielder fields the ball\n";
      explanation += "• Second baseman positions as cut-off man\n";
      explanation += "• Center fielder backs up the right fielder\n";
    } else if (scenarioName.includes('sacrifice bunt')) {
      explanation += "**Key Actions:**\n";
      explanation += "• All infielders charge to field the bunt\n";
      explanation += "• Catcher directs the play and tells fielders where to throw\n";
      explanation += "• Goal is to get the force out at the lead base\n";
    } else if (scenarioName.includes('wheel play')) {
      explanation += "**Key Actions:**\n";
      explanation += "• Shortstop breaks for third base as pitcher delivers\n";
      explanation += "• This creates a force out opportunity at third base\n";
      explanation += "• Very aggressive play - high risk, high reward\n";
    } else if (scenarioName.includes('double')) {
      explanation += "**Key Actions:**\n";
      explanation += "• Outfielder fields the ball in the gap\n";
      explanation += "• Proper cut-off positioning is crucial for long throws\n";
      explanation += "• Multiple players back up the play\n";
    } else if (scenarioName.includes('pop fly')) {
      explanation += "**Key Actions:**\n";
      explanation += "• Outfielder has priority on all fly balls\n";
      explanation += "• Communication is key - outfielder calls off infielders\n";
      explanation += "• Multiple players converge but yield to the outfielder\n";
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
      explanation += "• Outfielder has priority and calls off all other fielders\n";
      explanation += "• Clean catch results in an immediate out\n";
    }

    // Add tactical insight
    explanation += "\n**Tactical Insight:**\n";
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

    return explanation;
  };

  // Function to determine the best base to throw to
  const getBestThrowTarget = (scenarioData: any, runnersOnBase: string[]) => {
    const scenarioName = scenarioData.name.toLowerCase();
    
    // For sacrifice bunts and wheel plays, go for the force out
    if (scenarioName.includes('sacrifice bunt') || scenarioName.includes('wheel play')) {
      if (runnersOnBase.includes('1st') && runnersOnBase.includes('2nd')) {
        return '3rd'; // Force out at third
      }
      if (runnersOnBase.includes('1st')) {
        return '2nd'; // Force out at second
      }
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

    // For pop flies, no throw needed (catch for out)
    if (scenarioName.includes('pop fly')) {
      return null;
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

  // Accurate defensive scenarios based on the guide
  const scenarios = [
    {
      name: 'Single to left: bases empty',
      ballTarget: { x: 120, y: 120 },
      baseRunners: [],
      movements: [
        { playerId: 'LF', x: 120, y: 120, role: 'fielder' as const },
        { playerId: 'SS', x: 200, y: 200, role: 'cutoff' as const }, // Cut-off between LF and 2nd
        { playerId: '2B', x: 250, y: 210, role: 'cover' as const }, // Cover 2nd base
        { playerId: 'CF', x: 180, y: 100, role: 'backup' as const }, // Back up LF
        { playerId: 'P', x: 230, y: 250, role: 'backup' as const }, // Back up throw to 2nd
        { playerId: '1B', x: 300, y: 270, role: 'cover' as const }, // Check batter touches 1st, then cover inside
        { playerId: 'C', x: 290, y: 330, role: 'backup' as const }, // Cover 1st in case of wide turn
        { playerId: '3B', x: 180, y: 280, role: 'cover' as const }, // Cover 3rd
        { playerId: 'RF', x: 320, y: 180, role: 'backup' as const } // Move toward infield for poor throws
      ],
      runnerTargets: []
    },
    {
      name: 'Single to center: bases empty',
      ballTarget: { x: 250, y: 80 },
      baseRunners: [],
      movements: [
        { playerId: 'CF', x: 250, y: 80, role: 'fielder' as const },
        { playerId: '2B', x: 250, y: 210, role: 'cover' as const }, // Take throw at 2nd
        { playerId: 'SS', x: 230, y: 180, role: 'cutoff' as const }, // Cut-off for 2nd base
        { playerId: 'LF', x: 200, y: 100, role: 'backup' as const }, // Back up CF
        { playerId: 'RF', x: 300, y: 100, role: 'backup' as const }, // Back up CF
        { playerId: 'P', x: 250, y: 250, role: 'backup' as const }, // Back up throw to 2nd
        { playerId: '1B', x: 310, y: 270, role: 'cover' as const }, // Make sure batter touches 1st
        { playerId: 'C', x: 250, y: 350, role: 'cover' as const }, // Cover home
        { playerId: '3B', x: 180, y: 280, role: 'cover' as const } // Cover 3rd
      ],
      runnerTargets: []
    },
    {
      name: 'Single to right: bases empty',
      ballTarget: { x: 380, y: 120 },
      baseRunners: [],
      movements: [
        { playerId: 'RF', x: 380, y: 120, role: 'fielder' as const },
        { playerId: '2B', x: 300, y: 200, role: 'cutoff' as const }, // Cut-off between RF and 2nd
        { playerId: 'SS', x: 250, y: 210, role: 'cover' as const }, // Cover 2nd base
        { playerId: 'CF', x: 320, y: 100, role: 'backup' as const }, // Back up RF
        { playerId: 'P', x: 270, y: 250, role: 'backup' as const }, // Back up throw to 2nd
        { playerId: '1B', x: 310, y: 270, role: 'cover' as const }, // Check batter touches 1st
        { playerId: 'C', x: 250, y: 350, role: 'cover' as const }, // Cover home
        { playerId: '3B', x: 180, y: 280, role: 'cover' as const }, // Cover 3rd
        { playerId: 'LF', x: 180, y: 180, role: 'backup' as const } // Move toward infield for bad throws
      ],
      runnerTargets: []
    },
    {
      name: 'Single to left: runner on first',
      ballTarget: { x: 120, y: 120 },
      baseRunners: ['1st'],
      movements: [
        { playerId: 'LF', x: 120, y: 120, role: 'fielder' as const },
        { playerId: 'SS', x: 200, y: 240, role: 'cutoff' as const }, // Cut-off between LF and 3rd
        { playerId: '3B', x: 170, y: 270, role: 'backup' as const }, // Back up SS but cover 3rd
        { playerId: 'CF', x: 180, y: 100, role: 'backup' as const }, // Back up LF
        { playerId: 'P', x: 220, y: 260, role: 'backup' as const }, // Back up 3rd base
        { playerId: '1B', x: 310, y: 270, role: 'cover' as const }, // Check batter touches 1st
        { playerId: '2B', x: 250, y: 210, role: 'cover' as const }, // Cover 2nd
        { playerId: 'C', x: 250, y: 350, role: 'cover' as const }, // Cover home
        { playerId: 'RF', x: 320, y: 180, role: 'backup' as const } // Move toward infield
      ],
      runnerTargets: [
        { base: '1st' as const, targetBase: '3rd' as const }
      ]
    },
    {
      name: 'Single to center: runner on first',
      ballTarget: { x: 250, y: 80 },
      baseRunners: ['1st'],
      movements: [
        { playerId: 'CF', x: 250, y: 80, role: 'fielder' as const },
        { playerId: 'SS', x: 220, y: 240, role: 'cutoff' as const }, // Cut-off between CF and 3rd
        { playerId: '3B', x: 180, y: 280, role: 'cover' as const }, // Cover 3rd base
        { playerId: 'LF', x: 200, y: 100, role: 'backup' as const }, // Back up CF
        { playerId: 'RF', x: 300, y: 100, role: 'backup' as const }, // Back up CF
        { playerId: 'P', x: 210, y: 260, role: 'backup' as const }, // Back up 3rd
        { playerId: '1B', x: 310, y: 270, role: 'cover' as const }, // Make sure batter touches 1st
        { playerId: '2B', x: 250, y: 210, role: 'cover' as const }, // Cover 2nd
        { playerId: 'C', x: 250, y: 350, role: 'cover' as const } // Cover home
      ],
      runnerTargets: [
        { base: '1st' as const, targetBase: '3rd' as const }
      ]
    },
    {
      name: 'Single to left: runner on second',
      ballTarget: { x: 120, y: 120 },
      baseRunners: ['2nd'],
      movements: [
        { playerId: 'LF', x: 120, y: 120, role: 'fielder' as const },
        { playerId: '3B', x: 210, y: 300, role: 'cutoff' as const }, // Cut-off for throw to home
        { playerId: 'C', x: 250, y: 350, role: 'cover' as const }, // Cover home plate
        { playerId: 'P', x: 240, y: 330, role: 'backup' as const }, // Back up throw at home
        { playerId: 'CF', x: 180, y: 100, role: 'backup' as const }, // Back up LF
        { playerId: '1B', x: 310, y: 270, role: 'cover' as const }, // Check batter touches 1st
        { playerId: '2B', x: 250, y: 210, role: 'cover' as const }, // Cover 2nd
        { playerId: 'SS', x: 180, y: 280, role: 'cover' as const }, // Cover 3rd
        { playerId: 'RF', x: 320, y: 180, role: 'backup' as const } // Back up throw to 2nd
      ],
      runnerTargets: [
        { base: '2nd' as const, targetBase: 'home' as const }
      ]
    },
    {
      name: 'Sacrifice bunt: runner on first',
      ballTarget: { x: 230, y: 320 },
      baseRunners: ['1st'],
      movements: [
        { playerId: 'P', x: 240, y: 300, role: 'fielder' as const }, // Cover middle of field
        { playerId: '3B', x: 200, y: 320, role: 'fielder' as const }, // Charge toward home, cover left side
        { playerId: '1B', x: 280, y: 300, role: 'fielder' as const }, // Charge, cover right side
        { playerId: '2B', x: 320, y: 280, role: 'cover' as const }, // Cover 1st base
        { playerId: 'SS', x: 250, y: 210, role: 'cover' as const }, // Cover 2nd base
        { playerId: 'C', x: 250, y: 350, role: 'cover' as const }, // Tell infielders where to throw
        { playerId: 'LF', x: 160, y: 200, role: 'backup' as const }, // Come toward infield for bad throws
        { playerId: 'CF', x: 250, y: 150, role: 'backup' as const }, // Back up throw to 2nd
        { playerId: 'RF', x: 350, y: 200, role: 'backup' as const } // Back up throw to 1st
      ],
      runnerTargets: [
        { base: '1st' as const, targetBase: '2nd' as const }
      ]
    },
    {
      name: 'Double down left field line: bases empty',
      ballTarget: { x: 80, y: 160 },
      baseRunners: [],
      movements: [
        { playerId: 'LF', x: 80, y: 160, role: 'fielder' as const },
        { playerId: 'SS', x: 150, y: 200, role: 'cutoff' as const }, // Cut-off down left field line
        { playerId: '2B', x: 200, y: 180, role: 'backup' as const }, // Trail position behind SS
        { playerId: '3B', x: 180, y: 280, role: 'cover' as const }, // Cover 3rd base
        { playerId: 'CF', x: 150, y: 120, role: 'backup' as const }, // Back up LF
        { playerId: 'P', x: 210, y: 260, role: 'backup' as const }, // Back up 3rd base
        { playerId: '1B', x: 300, y: 260, role: 'cover' as const }, // Trail runner to 2nd
        { playerId: 'C', x: 250, y: 350, role: 'cover' as const }, // Cover home
        { playerId: 'RF', x: 320, y: 180, role: 'backup' as const } // Back up throw to 2nd
      ],
      runnerTargets: []
    },
    {
      name: 'Pop fly to shallow right field',
      ballTarget: { x: 340, y: 180 },
      baseRunners: [],
      movements: [
        { playerId: 'RF', x: 340, y: 180, role: 'fielder' as const }, // RF has priority
        { playerId: '2B', x: 310, y: 200, role: 'backup' as const }, // Call for catch but yield to RF
        { playerId: '1B', x: 320, y: 260, role: 'backup' as const }, // Call for catch but yield to RF
        { playerId: 'CF', x: 320, y: 140, role: 'backup' as const }, // Back up RF
        { playerId: 'SS', x: 250, y: 210, role: 'cover' as const }, // Cover 2nd
        { playerId: '3B', x: 180, y: 280, role: 'cover' as const }, // Cover 3rd
        { playerId: 'P', x: 290, y: 250, role: 'cover' as const }, // Cover 1st if needed
        { playerId: 'C', x: 280, y: 330, role: 'backup' as const }, // Back up 1st if bases empty
        { playerId: 'LF', x: 150, y: 200, role: 'backup' as const } // Back up throw to 3rd
      ],
      runnerTargets: []
    },
    {
      name: 'Wheel play: sacrifice bunt with runners on 1st and 2nd',
      ballTarget: { x: 220, y: 320 },
      baseRunners: ['1st', '2nd'],
      movements: [
        { playerId: 'P', x: 240, y: 300, role: 'fielder' as const }, // Cover middle field
        { playerId: '3B', x: 200, y: 320, role: 'fielder' as const }, // Charge and cover left side
        { playerId: '1B', x: 280, y: 300, role: 'fielder' as const }, // Cover right side
        { playerId: 'SS', x: 170, y: 270, role: 'cover' as const }, // Break for 3rd base for force out
        { playerId: '2B', x: 320, y: 280, role: 'cover' as const }, // Cover 1st base
        { playerId: 'CF', x: 250, y: 150, role: 'cover' as const }, // Cover 2nd base (no one else covering)
        { playerId: 'C', x: 250, y: 350, role: 'cover' as const }, // Tell infielders where to throw
        { playerId: 'LF', x: 150, y: 250, role: 'backup' as const }, // Back up throw to 3rd
        { playerId: 'RF', x: 350, y: 200, role: 'backup' as const } // Back up throw to 1st
      ],
      runnerTargets: [
        { base: '1st' as const, targetBase: '2nd' as const },
        { base: '2nd' as const, targetBase: '2nd' as const } // Gets forced out at 3rd
      ]
    }
  ];

  const startScenario = () => {
    if (isAnimating) return;
    
    setPlayComplete(false);
    setPlayExplanation('');
    
    // Pick a random scenario
    const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    setCurrentScenario(randomScenario);
    
    // Set up runners based on scenario
    const newRunners = randomScenario.baseRunners.map((base, index) => ({
      id: `R${index + 1}`,
      base: base as 'home' | '1st' | '2nd' | '3rd',
      x: basePositions[base as keyof typeof basePositions].x,
      y: basePositions[base as keyof typeof basePositions].y,
      targetX: basePositions[base as keyof typeof basePositions].x,
      targetY: basePositions[base as keyof typeof basePositions].y,
      isRunning: false
    }));
    
    setRunners(newRunners);
    setScenario(randomScenario.name);
    setIsAnimating(true);

    // Animate ball to hit location
    setBall(prev => ({
      ...prev,
      targetX: randomScenario.ballTarget.x,
      targetY: randomScenario.ballTarget.y,
      isMoving: true,
      isThrown: false
    }));

    // Animate players
    setTimeout(() => {
      setPlayers(prev => prev.map(player => {
        const movement = randomScenario.movements.find(m => m.playerId === player.id);
        if (movement) {
          return {
            ...player,
            x: movement.x,
            y: movement.y,
            isActive: true,
            role: movement.role
          };
        }
        return { ...player, isActive: false, role: 'normal' };
      }));

      // Animate runners
      if (randomScenario.runnerTargets.length > 0) {
        setRunners(prev => prev.map(runner => {
          const runnerTarget = randomScenario.runnerTargets.find(rt => rt.base === runner.base);
          if (runnerTarget) {
            const targetPos = basePositions[runnerTarget.targetBase];
            return {
              ...runner,
              targetX: targetPos.x,
              targetY: targetPos.y,
              isRunning: true
            };
          }
          return runner;
        }));
      }
    }, 500);

    // After runners move, throw ball to correct base
    setTimeout(() => {
      setRunners(prev => prev.map(runner => ({
        ...runner,
        x: runner.targetX,
        y: runner.targetY,
        isRunning: false
      })));

      // Determine where to throw the ball
      const throwTarget = getBestThrowTarget(randomScenario, randomScenario.baseRunners);
      if (throwTarget) {
        const throwPosition = basePositions[throwTarget as keyof typeof basePositions];
        setBall(prev => ({
          ...prev,
          targetX: throwPosition.x,
          targetY: throwPosition.y,
          isMoving: true,
          isThrown: true,
          throwTarget
        }));
      }

      // Generate detailed explanation after the throw
      setTimeout(() => {
        const explanation = getPlayExplanation(randomScenario, throwTarget);
        setPlayExplanation(explanation);
        setPlayComplete(true);
        setIsAnimating(false);
      }, 1000);
    }, 3000);
  };

  const nextBatter = () => {
    resetField();
  };

  const resetField = () => {
    setPlayers(prev => prev.map(player => ({
      ...player,
      x: player.originalX,
      y: player.originalY,
      isActive: false,
      role: 'normal'
    })));
    setBall({
      x: 250,
      y: 350,
      targetX: 250,
      targetY: 350,
      isMoving: false,
      isThrown: false
    });
    setRunners([]);
    setScenario('');
    setCurrentScenario(null);
    setIsAnimating(false);
    setPlayComplete(false);
    setPlayExplanation('');
  };

  useEffect(() => {
    if (ball.isMoving) {
      const timer = setTimeout(() => {
        setBall(prev => ({
          ...prev,
          x: prev.targetX,
          y: prev.targetY,
          isMoving: false
        }));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [ball.isMoving]);

  const getPlayerColor = (role: string) => {
    switch (role) {
      case 'fielder': return 'bg-blue-600';
      case 'backup': return 'bg-yellow-500';
      case 'cover': return 'bg-green-600';
      case 'cutoff': return 'bg-purple-600';
      default: return 'bg-gray-500';
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'fielder': return 'Fields the ball';
      case 'backup': return 'Backs up the play';
      case 'cover': return 'Covers the base';
      case 'cutoff': return 'Cut-off man';
      default: return '';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-green-800 mb-2 font-mono pixelated">⚾ RBI BASEBALL DEFENSE TRAINER</h1>
        <p className="text-lg text-gray-700 font-mono">Learn accurate defensive positioning from real baseball situations!</p>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <Card className="p-6 bg-green-100 border-4 border-green-800" style={{ imageRendering: 'pixelated' }}>
            {/* Nintendo RBI Baseball style field */}
            <div 
              className="relative rounded-lg overflow-hidden border-4 border-gray-800 shadow-2xl" 
              style={{ 
                width: '500px', 
                height: '400px', 
                margin: '0 auto',
                background: 'linear-gradient(180deg, #228B22 0%, #32CD32 40%, #8B4513 40%, #D2691E 60%, #32CD32 60%, #228B22 100%)',
                imageRendering: 'pixelated'
              }}
            >
              {/* Outfield grass (darker green) */}
              <div 
                className="absolute" 
                style={{
                  width: '480px',
                  height: '180px',
                  left: '10px',
                  top: '10px',
                  background: '#228B22',
                  borderRadius: '0 0 240px 240px'
                }}
              ></div>

              {/* Infield dirt (brown/tan) */}
              <div 
                className="absolute" 
                style={{
                  width: '300px',
                  height: '300px',
                  left: '100px',
                  top: '100px',
                  background: '#D2691E',
                  borderRadius: '50%',
                  opacity: 0.8
                }}
              ></div>

              {/* Pitcher's mound (tan/brown mound) */}
              <div 
                className="absolute border-2 border-gray-700" 
                style={{ 
                  left: '240px', 
                  top: '270px',
                  width: '20px',
                  height: '20px',
                  background: '#CD853F',
                  borderRadius: '50%',
                  boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.3)'
                }}
              ></div>
                
              {/* Home plate (white pentagon shape) */}
              <div 
                className="absolute border-2 border-gray-700" 
                style={{ 
                  left: '245px', 
                  top: '345px',
                  width: '10px',
                  height: '10px',
                  background: '#FFFFFF',
                  clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                  boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}
              ></div>
                
              {/* First base (white square) */}
              <div 
                className="absolute border-2 border-gray-700" 
                style={{ 
                  left: '315px', 
                  top: '275px',
                  width: '10px',
                  height: '10px',
                  background: '#FFFFFF',
                  boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}
              ></div>

              {/* Second base (white square) */}
              <div 
                className="absolute border-2 border-gray-700" 
                style={{ 
                  left: '245px', 
                  top: '205px',
                  width: '10px',
                  height: '10px',
                  background: '#FFFFFF',
                  transform: 'rotate(45deg)',
                  boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}
              ></div>

              {/* Third base (white square) */}
              <div 
                className="absolute border-2 border-gray-700" 
                style={{ 
                  left: '175px', 
                  top: '275px',
                  width: '10px',
                  height: '10px',
                  background: '#FFFFFF',
                  boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}
              ></div>

              {/* Foul lines */}
              <div 
                className="absolute bg-white" 
                style={{
                  width: '2px',
                  height: '200px',
                  left: '249px',
                  top: '200px',
                  transformOrigin: 'bottom',
                  transform: 'rotate(45deg)'
                }}
              ></div>
              <div 
                className="absolute bg-white" 
                style={{
                  width: '2px',
                  height: '200px',
                  left: '249px',
                  top: '200px',
                  transformOrigin: 'bottom',
                  transform: 'rotate(-45deg)'
                }}
              ></div>

              {/* Players with retro RBI Baseball styling */}
              {players.map((player) => (
                <div
                  key={player.id}
                  className={`absolute rounded-full border-2 border-black shadow-lg transition-all duration-1000 ease-out flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:scale-110 font-mono ${getPlayerColor(player.role)} ${
                    player.isActive ? 'animate-pulse' : ''
                  }`}
                  style={{
                    left: `${player.x - 16}px`,
                    top: `${player.y - 16}px`,
                    width: '32px',
                    height: '32px',
                    transform: player.isActive ? 'scale(1.2)' : 'scale(1)',
                    imageRendering: 'pixelated',
                    boxShadow: player.isActive ? '0 0 15px rgba(255,255,0,0.8)' : '2px 2px 4px rgba(0,0,0,0.4)'
                  }}
                  title={`${player.position} - ${getRoleDescription(player.role)}`}
                >
                  {player.id}
                </div>
              ))}

              {/* Runners with retro styling */}
              {runners.map((runner) => (
                <div
                  key={runner.id}
                  className={`absolute rounded-full border-2 border-black shadow-lg transition-all duration-2000 ease-out flex items-center justify-center text-white text-xs font-bold font-mono ${
                    runner.isRunning ? 'animate-bounce' : ''
                  }`}
                  style={{
                    left: `${runner.isRunning ? runner.targetX - 14 : runner.x - 14}px`,
                    top: `${runner.isRunning ? runner.targetY - 14 : runner.y - 14}px`,
                    width: '28px',
                    height: '28px',
                    background: '#FF4500',
                    imageRendering: 'pixelated',
                    boxShadow: '2px 2px 4px rgba(0,0,0,0.4)'
                  }}
                  title="Base Runner"
                >
                  R
                </div>
              ))}

              {/* Ball with retro white/red stitching look */}
              <div
                className={`absolute rounded-full border-2 border-red-600 shadow-lg transition-all duration-1000 ease-out ${
                  ball.isMoving ? 'animate-bounce' : ''
                } ${ball.isThrown ? 'bg-orange-600' : ''}`}
                style={{
                  left: `${ball.isMoving ? ball.targetX - 8 : ball.x - 8}px`,
                  top: `${ball.isMoving ? ball.targetY - 8 : ball.y - 8}px`,
                  width: '16px',
                  height: '16px',
                  background: ball.isThrown ? 'radial-gradient(circle, #FFA500 30%, #FF6347 70%)' : 'radial-gradient(circle, #FFFFFF 30%, #F0F0F0 70%)',
                  imageRendering: 'pixelated',
                  boxShadow: ball.isMoving ? '0 0 10px rgba(255,255,0,0.8)' : '2px 2px 4px rgba(0,0,0,0.4)'
                }}
                title={ball.isThrown ? `Thrown to ${ball.throwTarget}` : 'Baseball'}
              >
              </div>

              {/* Retro scoreboard-style overlay */}
              <div 
                className="absolute top-2 left-2 bg-black text-green-400 px-2 py-1 font-mono text-xs border border-green-400"
                style={{ imageRendering: 'pixelated' }}
              >
                RBI BASEBALL
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <Button 
                onClick={startScenario} 
                disabled={isAnimating || playComplete}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg font-mono border-2 border-blue-800"
                style={{ imageRendering: 'pixelated' }}
              >
                <Play className="w-5 h-5 mr-2" />
                {isAnimating ? 'WATCH THE PLAY!' : 'HIT THE BALL!'}
              </Button>
              
              {playComplete && (
                <Button 
                  onClick={nextBatter} 
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg font-mono border-2 border-green-800"
                  style={{ imageRendering: 'pixelated' }}
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  NEXT BATTER
                </Button>
              )}
              
              <Button 
                onClick={resetField} 
                variant="outline"
                className="px-6 py-3 text-lg font-mono border-2 border-gray-600"
                style={{ imageRendering: 'pixelated' }}
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                RESET
              </Button>
            </div>
          </Card>
        </div>

        <div className="w-80">
          {!playComplete ? (
            <Card className="p-6 border-4 border-gray-600 bg-gray-100" style={{ imageRendering: 'pixelated' }}>
              <h3 className="text-xl font-bold mb-4 font-mono">CURRENT PLAY</h3>
              {scenario ? (
                <div className="space-y-4">
                  <div className="p-3 bg-blue-200 rounded border-2 border-blue-600">
                    <h4 className="font-semibold text-blue-800 font-mono">{scenario}</h4>
                  </div>
                  
                  {ball.isThrown && ball.throwTarget && (
                    <div className="p-3 bg-orange-200 rounded border-2 border-orange-600">
                      <h5 className="font-semibold text-orange-800 font-mono">
                        🎯 BALL THROWN TO: {ball.throwTarget === 'home' ? 'HOME PLATE' : `${ball.throwTarget} BASE`}
                      </h5>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <h5 className="font-semibold font-mono">PLAYER ROLES:</h5>
                    <div className="space-y-1 text-sm font-mono">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-600 rounded border border-black"></div>
                        <span>FIELDS THE BALL</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-purple-600 rounded border border-black"></div>
                        <span>CUT-OFF MAN</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded border border-black"></div>
                        <span>BACKS UP THE PLAY</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-600 rounded border border-black"></div>
                        <span>COVERS THE BASE</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-orange-600 rounded border border-black"></div>
                        <span>BASE RUNNER</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 font-mono">CLICK "HIT THE BALL!" TO SEE ACCURATE DEFENSIVE SCENARIOS BASED ON REAL BASEBALL STRATEGY.</p>
              )}
            </Card>
          ) : (
            <Card className="p-6 max-h-96 overflow-y-auto border-4 border-gray-600 bg-gray-100" style={{ imageRendering: 'pixelated' }}>
              <h3 className="text-xl font-bold mb-4 font-mono">PLAY ANALYSIS</h3>
              <div className="prose prose-sm font-mono">
                {playExplanation.split('\n').map((line, index) => {
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <h4 key={index} className="font-bold text-blue-800 mt-4 mb-2 font-mono">{line.slice(2, -2)}</h4>;
                  } else if (line.startsWith('•')) {
                    return <li key={index} className="ml-4 mb-1 font-mono">{line.slice(2)}</li>;
                  } else if (line.trim()) {
                    return <p key={index} className="mb-2 font-mono">{line}</p>;
                  }
                  return <br key={index} />;
                })}
              </div>
            </Card>
          )}

          <Card className="p-6 mt-4 border-4 border-gray-600 bg-gray-100" style={{ imageRendering: 'pixelated' }}>
            <h3 className="text-xl font-bold mb-4 font-mono">LEARN REAL DEFENSE</h3>
            <div className="space-y-3 text-sm font-mono">
              <p>🎯 SCENARIOS BASED ON ACTUAL DEFENSIVE SITUATIONS</p>
              <p>✂️ SEE PROPER CUT-OFF POSITIONING AND RESPONSIBILITIES</p>
              <p>🛡️ LEARN WHO COVERS BASES VS. WHO BACKS UP</p>
              <p>🏃 WATCH REALISTIC RUNNER ADVANCEMENT</p>
              <p>⚾ BALL THROWN TO THE CORRECT BASE AUTOMATICALLY</p>
              <p>📖 DETAILED EXPLANATIONS AFTER EACH PLAY</p>
              <p>🎓 LEARN THE "WHY" BEHIND EACH DEFENSIVE DECISION</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BaseballField;
