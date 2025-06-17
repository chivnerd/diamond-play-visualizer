
import React from 'react';
import { Card } from '@/components/ui/card';
import { Ball, BaseballLevel } from '../../types/baseball';

interface PlayInfoProps {
  scenario: string;
  level: BaseballLevel;
  ball: Ball;
}

const PlayInfo: React.FC<PlayInfoProps> = ({ scenario, level, ball }) => {
  if (!scenario) {
    return (
      <Card className="p-6 border-4 border-gray-600 bg-gray-100" style={{ imageRendering: 'pixelated' }}>
        <h3 className="text-xl font-bold mb-4 font-mono">CURRENT PLAY</h3>
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
      </Card>
    );
  }

  return (
    <Card className="p-6 border-4 border-gray-600 bg-gray-100" style={{ imageRendering: 'pixelated' }}>
      <h3 className="text-xl font-bold mb-4 font-mono">CURRENT PLAY</h3>
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
    </Card>
  );
};

export default PlayInfo;
