
import { GameScenario, BaseballLevel } from '../types/baseball';

const getInfieldScenarios = (): GameScenario[] => [
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

const getOutfieldScenarios = (level: BaseballLevel): GameScenario[] => {
  const baseOutfieldScenarios = [
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
    baseOutfieldScenarios.push({
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
    baseOutfieldScenarios.push({
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

  return baseOutfieldScenarios;
};

export const getScenariosForLevel = (level: BaseballLevel): GameScenario[] => {
  const infieldScenarios = getInfieldScenarios();
  const outfieldScenarios = getOutfieldScenarios(level);

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
