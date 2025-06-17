
import React from 'react';
import { Card } from '@/components/ui/card';
import { Ball, BaseballLevel } from '../../types/baseball';

interface PlayInfoProps {
  scenario: string;
  level: BaseballLevel;
  ball: Ball;
  playerDecisionCorrect?: boolean | null;
}

const PlayInfo: React.FC<PlayInfoProps> = ({ scenario, level, ball, playerDecisionCorrect }) => {
  if (!scenario) {
    return (
      <Card className="p-6 border-4 border-stone-800 mb-4" style={{ 
        background: 'linear-gradient(145deg, #8B7355 0%, #A0522D 50%, #8B7355 100%)',
        imageRendering: 'pixelated',
        boxShadow: '6px 6px 0px #4A4A4A, 8px 8px 0px rgba(0,0,0,0.3)'
      }}>
        <h3 className="text-xl font-bold mb-4 font-mono text-yellow-200" style={{
          textShadow: '2px 2px 0px #8B4513',
          fontFamily: 'monospace'
        }}>CURRENT PLAY</h3>
        <div className="space-y-3">
          <p className="text-stone-100 font-mono" style={{
            fontFamily: 'monospace',
            textShadow: '1px 1px 0px rgba(0,0,0,0.5)'
          }}>SELECT A LEAGUE LEVEL AND CLICK "HIT THE BALL!" TO SEE ACCURATE DEFENSIVE SCENARIOS.</p>
          
          <div className="p-3 border-4 border-yellow-600" style={{
            background: 'linear-gradient(145deg, #F4D03F 0%, #F1C40F 50%, #F4D03F 100%)',
            imageRendering: 'pixelated'
          }}>
            <h4 className="font-bold text-yellow-900 font-mono mb-2" style={{ fontFamily: 'monospace' }}>LEVEL DIFFERENCES:</h4>
            <div className="text-xs font-mono space-y-1 text-yellow-900" style={{ fontFamily: 'monospace' }}>
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
    <Card className="p-6 border-4 border-stone-800 mb-4" style={{ 
      background: 'linear-gradient(145deg, #8B7355 0%, #A0522D 50%, #8B7355 100%)',
      imageRendering: 'pixelated',
      boxShadow: '6px 6px 0px #4A4A4A, 8px 8px 0px rgba(0,0,0,0.3)'
    }}>
      <h3 className="text-xl font-bold mb-4 font-mono text-yellow-200" style={{
        textShadow: '2px 2px 0px #8B4513',
        fontFamily: 'monospace'
      }}>CURRENT PLAY</h3>
      <div className="space-y-4">
        {playerDecisionCorrect !== null && (
          <div className={`p-3 border-4 ${playerDecisionCorrect ? 'border-green-600' : 'border-red-600'}`} style={{
            background: playerDecisionCorrect 
              ? 'linear-gradient(145deg, #58D68D 0%, #27AE60 50%, #58D68D 100%)' 
              : 'linear-gradient(145deg, #F1948A 0%, #E74C3C 50%, #F1948A 100%)',
            imageRendering: 'pixelated'
          }}>
            <h5 className={`font-semibold font-mono ${playerDecisionCorrect ? 'text-green-900' : 'text-red-900'}`} style={{ fontFamily: 'monospace' }}>
              {playerDecisionCorrect ? '🐔 CORRECT! YOU GOT A CHICKEN!' : '❌ WRONG! NO CHICKEN THIS TIME...'}
            </h5>
          </div>
        )}
        
        {ball.isThrown && ball.throwTarget && (
          <div className="p-3 border-4 border-orange-600" style={{
            background: 'linear-gradient(145deg, #F39C12 0%, #E67E22 50%, #F39C12 100%)',
            imageRendering: 'pixelated'
          }}>
            <h5 className="font-semibold text-orange-900 font-mono" style={{ fontFamily: 'monospace' }}>
              🎯 BALL THROWN TO: {ball.throwTarget === 'home' ? 'HOME PLATE' : `${ball.throwTarget} BASE`}
            </h5>
          </div>
        )}
        
        <div className="space-y-2">
          <h5 className="font-semibold font-mono text-yellow-200" style={{
            fontFamily: 'monospace',
            textShadow: '1px 1px 0px rgba(0,0,0,0.5)'
          }}>PLAYER ROLES:</h5>
          <div className="space-y-1 text-sm font-mono text-stone-100" style={{ fontFamily: 'monospace' }}>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-black" style={{
                background: 'linear-gradient(145deg, #4A90E2 0%, #2E5BA8 100%)',
                imageRendering: 'pixelated'
              }}></div>
              <span>FIELDS THE BALL</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-black" style={{
                background: 'linear-gradient(145deg, #9B59B6 0%, #8E44AD 100%)',
                imageRendering: 'pixelated'
              }}></div>
              <span>CUT-OFF MAN</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-black" style={{
                background: 'linear-gradient(145deg, #F1C40F 0%, #F39C12 100%)',
                imageRendering: 'pixelated'
              }}></div>
              <span>BACKS UP THE PLAY</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-black" style={{
                background: 'linear-gradient(145deg, #2ECC71 0%, #27AE60 100%)',
                imageRendering: 'pixelated'
              }}></div>
              <span>COVERS THE BASE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-black" style={{
                background: 'linear-gradient(145deg, #E67E22 0%, #D35400 100%)',
                imageRendering: 'pixelated'
              }}></div>
              <span>BASE RUNNER</span>
            </div>
          </div>
        </div>

        <div className="p-3 border-4 border-blue-600" style={{
          background: 'linear-gradient(145deg, #5DADE2 0%, #3498DB 50%, #5DADE2 100%)',
          imageRendering: 'pixelated'
        }}>
          <h4 className="font-semibold text-blue-900 font-mono" style={{ fontFamily: 'monospace' }}>{scenario}</h4>
          <p className="text-sm text-blue-900 font-mono mt-1" style={{ fontFamily: 'monospace' }}>Level: {level.toUpperCase().replace('-', ' ')}</p>
        </div>
      </div>
    </Card>
  );
};

export default PlayInfo;
