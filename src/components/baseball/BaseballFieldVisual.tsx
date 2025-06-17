import React from 'react';
import { Player, Runner, Ball } from '../../types/baseball';
import { getPlayerColor, getRoleDescription } from '../../utils/baseballPositions';
import ForceOutIndicators from './ForceOutIndicators';

interface BaseballFieldVisualProps {
  players: Player[];
  runners: Runner[];
  ball: Ball;
  scenario?: any;
  awaitingDecision?: boolean;
}

const BaseballFieldVisual: React.FC<BaseballFieldVisualProps> = ({ 
  players, 
  runners, 
  ball, 
  scenario, 
  awaitingDecision = false 
}) => {
  return (
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
        
      {/* Home plate (white pentagon shape with H icon) */}
      <div 
        className="absolute border-2 border-gray-700 flex items-center justify-center" 
        style={{ 
          left: '240px', 
          top: '340px',
          width: '20px',
          height: '20px',
          background: '#FFFFFF',
          clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
          boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}
      >
        <span className="text-black text-xs font-bold font-mono" style={{ transform: 'scale(0.7)' }}>H</span>
      </div>
        
      {/* First base (white square with 1 icon) */}
      <div 
        className="absolute border-2 border-gray-700 flex items-center justify-center" 
        style={{ 
          left: '310px', 
          top: '270px',
          width: '20px',
          height: '20px',
          background: '#FFFFFF',
          boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}
      >
        <span className="text-black text-xs font-bold font-mono">1</span>
      </div>

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

      {/* Third base (white square with 3 icon) */}
      <div 
        className="absolute border-2 border-gray-700 flex items-center justify-center" 
        style={{ 
          left: '170px', 
          top: '270px',
          width: '20px',
          height: '20px',
          background: '#FFFFFF',
          boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}
      >
        <span className="text-black text-xs font-bold font-mono">3</span>
      </div>

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

      {/* Force Out Indicators - show when awaiting decision */}
      {awaitingDecision && scenario && (
        <ForceOutIndicators 
          baseRunners={scenario.baseRunners || []} 
          scenario={scenario} 
        />
      )}

      {/* Players with retro styling */}
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
  );
};

export default BaseballFieldVisual;
