
import React from 'react';
import { Card } from '@/components/ui/card';

const LevelInfo: React.FC = () => {
  return (
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
  );
};

export default LevelInfo;
