import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

type BaseballLevel = 'tball' | 'coach-pitch' | 'minors' | 'majors' | 'pony' | 'high-school';

const BaseballField = () => {
  const [level, setLevel] = useState<BaseballLevel>('majors');
  const [players, setPlayers] = useState<Player[]>([]);
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

  // Get player positions based on level
  const getPlayersForLevel = (level: BaseballLevel): Player[] => {
    const baseInfield = [
      { id: 'P', position: 'Pitcher', x: 250, y: 280, originalX: 250, originalY: 280, isActive: false, role: 'normal' as const },
      { id: 'C', position: 'Catcher', x: 250, y: 350, originalX: 250, originalY: 350, isActive: false, role: 'normal' as const },
      { id: '1B', position: '1st Base', x: 320, y: 280, originalX: 320, originalY: 280, isActive: false, role: 'normal' as const },
      { id: '2B', position: '2nd Base', x: 280, y: 220, originalX: 280, originalY: 220, isActive: false, role: 'normal' as const },
      { id: '3B', position: '3rd Base', x: 180, y: 280, originalX: 180, originalY: 280, isActive: false, role: 'normal' as const },
      { id: 'SS', position: 'Shortstop', x: 220, y: 220, originalX: 220, originalY: 220, isActive: false, role: 'normal' as const },
    ];

    if (level === 'tball' || level === 'coach-pitch' || level === 'minors') {
      // Four outfielders for younger levels
      return [
        ...baseInfield,
        { id: 'LF', position: 'Left Field', x: 120, y: 120, originalX: 120, originalY: 120, isActive: false, role: 'normal' as const },
        { id: 'LC', position: 'Left Center', x: 200, y: 80, originalX: 200, originalY: 80, isActive: false, role: 'normal' as const },
        { id: 'RC', position: 'Right Center', x: 300, y: 80, originalX: 300, originalY: 80, isActive: false, role: 'normal' as const },
        { id: 'RF', position: 'Right Field', x: 380, y: 120, originalX: 380, originalY: 120, isActive: false, role: 'normal' as const },
      ];
    } else {
      // Traditional three outfielders for older levels
      return [
        ...baseInfield,
        { id: 'LF', position: 'Left Field', x: 120, y: 120, originalX: 120, originalY: 120, isActive: false, role: 'normal' as const },
        { id: 'CF', position: 'Center Field', x: 250, y: 80, originalX: 250, originalY: 80, isActive: false, role: 'normal' as const },
        { id: 'RF', position: 'Right Field', x: 380, y: 120, originalX: 380, originalY: 120, isActive: false, role: 'normal' as const },
      ];
    }
  };

  // Initialize players when level changes
  useEffect(() => {
    setPlayers(getPlayersForLevel(level));
  }, [level]);

  // Function to get detailed play explanation
  const getPlayExplanation = (scenarioData: any, throwTarget: string | null) => {
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
    } else if (scenarioName.includes('ground ball')) {
      explanation += "**Key Actions:**\n";
      explanation += "• Infielder fields the ball cleanly\n";
      explanation += "• Make the sure out - don't rush the throw\n";
      explanation += "• Communicate with teammates about the play\n";
      if (level === 'tball' || level === 'coach-pitch') {
        explanation += "• Focus on catching the ball first, then making the throw\n";
      }
    } else if (scenarioName.includes('pop up')) {
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

  // Function to determine the best base to throw to
  const getBestThrowTarget = (scenarioData: any, runnersOnBase: string[]) => {
    const scenarioName = scenarioData.name.toLowerCase();
    
    // For younger levels, simplify decisions
    if (level === 'tball' || level === 'coach-pitch') {
      if (scenarioName.includes('ground ball')) {
        return '1st'; // Always go for the sure out
      }
      if (scenarioName.includes('pop up')) {
        return null; // Catch for out
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

  // Get scenarios based on level
  const getScenariosForLevel = (level: BaseballLevel) => {
    const infieldScenarios = [
      {
        name: 'Ground ball to shortstop: bases empty',
        ballTarget: { x: 220, y: 220 },
        baseRunners: [],
        movements: [
          { playerId: 'SS', x: 220, y: 220, role: 'fielder' as const },
          { playerId: '2B', x: 250, y: 210, role: 'cover' as const },
          { playerId: '1B', x: 320, y: 280, role: 'cover' as const },
          { playerId: 'P', x: 270, y: 250, role: 'backup' as const },
          { playerId: '3B', x: 180, y: 280, role: 'cover' as const },
          { playerId: 'C', x: 250, y: 350, role: 'cover' as const }
        ],
        runnerTargets: []
      },
      {
        name: 'Ground ball to second base: runner on first',
        ballTarget: { x: 280, y: 220 },
        baseRunners: ['1st'],
        movements: [
          { playerId: '2B', x: 280, y: 220, role: 'fielder' as const },
          { playerId: 'SS', x: 250, y: 210, role: 'cover' as const },
          { playerId: '1B', x: 320, y: 280, role: 'cover' as const },
          { playerId: 'P', x: 270, y: 250, role: 'backup' as const },
          { playerId: '3B', x: 180, y: 280, role: 'cover' as const },
          { playerId: 'C', x: 250, y: 350, role: 'cover' as const }
        ],
        runnerTargets: [
          { base: '1st' as const, targetBase: '2nd' as const }
        ]
      },
      {
        name: 'Pop up to first base: bases empty',
        ballTarget: { x: 320, y: 250 },
        baseRunners: [],
        movements: [
          { playerId: '1B', x: 320, y: 250, role: 'fielder' as const },
          { playerId: 'P', x: 290, y: 260, role: 'backup' as const },
          { playerId: '2B', x: 300, y: 230, role: 'backup' as const },
          { playerId: 'SS', x: 250, y: 210, role: 'cover' as const },
          { playerId: '3B', x: 180, y: 280, role: 'cover' as const },
          { playerId: 'C', x: 250, y: 350, role: 'cover' as const }
        ],
        runnerTargets: []
      }
    ];

    const outfieldScenarios = [
      {
        name: 'Single to left: bases empty',
        ballTarget: { x: 120, y: 120 },
        baseRunners: [],
        movements: [
          { playerId: 'LF', x: 120, y: 120, role: 'fielder' as const },
          { playerId: 'SS', x: 200, y: 200, role: 'cutoff' as const },
          { playerId: '2B', x: 250, y: 210, role: 'cover' as const },
          { playerId: 'CF', x: 180, y: 100, role: 'backup' as const },
          { playerId: 'P', x: 230, y: 250, role: 'backup' as const },
          { playerId: '1B', x: 300, y: 270, role: 'cover' as const },
          { playerId: 'C', x: 290, y: 330, role: 'backup' as const },
          { playerId: '3B', x: 180, y: 280, role: 'cover' as const }
        ],
        runnerTargets: []
      },
      {
        name: 'Single to right: bases empty',
        ballTarget: { x: 380, y: 120 },
        baseRunners: [],
        movements: [
          { playerId: 'RF', x: 380, y: 120, role: 'fielder' as const },
          { playerId: '2B', x: 300, y: 200, role: 'cutoff' as const },
          { playerId: 'SS', x: 250, y: 210, role: 'cover' as const },
          { playerId: 'CF', x: 320, y: 100, role: 'backup' as const },
          { playerId: 'P', x: 270, y: 250, role: 'backup' as const },
          { playerId: '1B', x: 310, y: 270, role: 'cover' as const },
          { playerId: 'C', x: 250, y: 350, role: 'cover' as const },
          { playerId: '3B', x: 180, y: 280, role: 'cover' as const },
          { playerId: 'LF', x: 180, y: 180, role: 'backup' as const }
        ],
        runnerTargets: []
      }
    ];

    // Add center field scenarios for older levels
    if (level !== 'tball' && level !== 'coach-pitch' && level !== 'minors') {
      outfieldScenarios.push({
        name: 'Single to center: bases empty',
        ballTarget: { x: 250, y: 80 },
        baseRunners: [],
        movements: [
          { playerId: 'CF', x: 250, y: 80, role: 'fielder' as const },
          { playerId: '2B', x: 250, y: 210, role: 'cover' as const },
          { playerId: 'SS', x: 230, y: 180, role: 'cutoff' as const },
          { playerId: 'LF', x: 200, y: 100, role: 'backup' as const },
          { playerId: 'RF', x: 300, y: 100, role: 'backup' as const },
          { playerId: 'P', x: 250, y: 250, role: 'backup' as const },
          { playerId: '1B', x: 310, y: 270, role: 'cover' as const },
          { playerId: 'C', x: 250, y: 350, role: 'cover' as const },
          { playerId: '3B', x: 180, y: 280, role: 'cover' as const }
        ],
        runnerTargets: []
      });
    } else {
      // For younger levels, add scenarios to left center and right center
      outfieldScenarios.push({
        name: 'Single to left center: bases empty',
        ballTarget: { x: 200, y: 80 },
        baseRunners: [],
        movements: [
          { playerId: 'LC', x: 200, y: 80, role: 'fielder' as const },
          { playerId: 'SS', x: 220, y: 180, role: 'cutoff' as const },
          { playerId: '2B', x: 250, y: 210, role: 'cover' as const },
          { playerId: 'LF', x: 160, y: 100, role: 'backup' as const },
          { playerId: 'RC', x: 260, y: 90, role: 'backup' as const },
          { playerId: 'P', x: 240, y: 250, role: 'backup' as const },
          { playerId: '1B', x: 310, y: 270, role: 'cover' as const },
          { playerId: 'C', x: 250, y: 350, role: 'cover' as const },
          { playerId: '3B', x: 180, y: 280, role: 'cover' as const },
          { playerId: 'RF', x: 340, y: 140, role: 'backup' as const }
        ],
        runnerTargets: []
      });
    }

    // Adjust scenario distribution based on level
    if (level === 'tball' || level === 'coach-pitch' || level === 'minors') {
      // 70% infield, 30% outfield for younger levels
      return [
        ...infieldScenarios,
        ...infieldScenarios, // Duplicate infield scenarios to increase probability
        ...outfieldScenarios.slice(0, 2) // Fewer outfield scenarios
      ];
    } else {
      // 40% infield, 60% outfield for older levels
      return [
        ...infieldScenarios,
        ...outfieldScenarios,
        ...outfieldScenarios // More outfield scenarios
      ];
    }
  };

  const startScenario = () => {
    if (isAnimating) return;
    
    setPlayComplete(false);
    setPlayExplanation('');
    
    // Pick a random scenario based on level
    const availableScenarios = getScenariosForLevel(level);
    const randomScenario = availableScenarios[Math.floor(Math.random() * availableScenarios.length)];
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
    const currentPlayers = getPlayersForLevel(level);
    setPlayers(currentPlayers.map(player => ({
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
        <h1 className="text-4xl font-bold text-green-800 mb-2 font-mono pixelated">⚾ BASEBALL DEFENSE TRAINER</h1>
        <p className="text-lg text-gray-700 font-mono">Learn accurate defensive positioning from real baseball situations!</p>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <Card className="p-6 bg-green-100 border-4 border-green-800" style={{ imageRendering: 'pixelated' }}>
            {/* Level selector */}
            <div className="mb-4 flex items-center justify-center gap-4">
              <label className="text-lg font-bold font-mono text-green-800">LEAGUE LEVEL:</label>
              <Select value={level} onValueChange={(value: BaseballLevel) => setLevel(value)}>
                <SelectTrigger className="w-48 font-mono border-2 border-green-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tball">T-Ball</SelectItem>
                  <SelectItem value="coach-pitch">Coach Pitch</SelectItem>
                  <SelectItem value="minors">Minors</SelectItem>
                  <SelectItem value="majors">Majors</SelectItem>
                  <SelectItem value="pony">Pony League</SelectItem>
                  <SelectItem value="high-school">High School</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Nintendo style field */}
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
                DEFENSE TRAINER
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
                    <p className="text-sm text-blue-700 font-mono mt-1">Level: {level.toUpperCase().replace('-', ' ')}</p>
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
                <div className="space-y-3">
                  <p className="text-gray-700 font-mono">SELECT A LEAGUE LEVEL AND CLICK "HIT THE BALL!" TO SEE ACCURATE DEFENSIVE SCENARIOS.</p>
                  
                  <div className="p-3 bg-yellow-100 rounded border border-yellow-600">
                    <h4 className="font-bold text-yellow-800 font-mono mb-2">LEVEL DIFFERENCES:</h4>
                    <div className="text-xs font-mono space-y-1">
                      <p><strong>T-Ball/Coach Pitch:</strong> 4 outfielders, mostly infield plays</p>
                      <p><strong>Minors:</strong> 4 outfielders, some outfield plays</p>
                      <p><strong>Majors+:</strong> 3 outfielders, more outfield action</p>
                    </div>
                  </div>
                </div>
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
            <h3 className="text-xl font-bold mb-4 font-mono">LEVEL-BASED TRAINING</h3>
            <div className="space-y-3 text-sm font-mono">
              <p>🎯 SCENARIOS ADJUST TO YOUR LEAGUE LEVEL</p>
              <p>⚾ YOUNGER LEVELS: MORE INFIELD PRACTICE</p>
              <p>🥎 OLDER LEVELS: MORE OUTFIELD SITUATIONS</p>
              <p>👶 T-BALL/COACH PITCH: 4 OUTFIELDERS</p>
              <p>🧒 MINORS: 4 OUTFIELDERS, MIXED PLAYS</p>
              <p>👦 MAJORS+: 3 OUTFIELDERS, ADVANCED PLAYS</p>
              <p>📖 DETAILED EXPLANATIONS FOR EACH LEVEL</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BaseballField;
