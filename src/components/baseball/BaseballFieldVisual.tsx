
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
      className="relative rounded-lg overflow-hidden border-4 border-gray-800 shadow-2xl mx-auto" 
      style={{ 
        width: 'min(500px, 100%)', 
        height: 'min(400px, 80vw)', 
        maxWidth: '100%',
        aspectRatio: '5/4',
        background: 'linear-gradient(180deg, #228B22 0%, #32CD32 40%, #8B4513 40%, #D2691E 60%, #32CD32 60%, #228B22 100%)',
        imageRendering: 'pixelated'
      }}
    >
      {/* Outfield grass (darker green) */}
      <div 
        className="absolute" 
        style={{
          width: '96%',
          height: '45%',
          left: '2%',
          top: '2.5%',
          background: '#228B22',
          borderRadius: '0 0 48% 48%'
        }}
      ></div>

      {/* Infield dirt (brown/tan) */}
      <div 
        className="absolute" 
        style={{
          width: '60%',
          height: '75%',
          left: '20%',
          top: '25%',
          background: '#D2691E',
          borderRadius: '50%',
          opacity: 0.8
        }}
      ></div>

      {/* Pitcher's mound (tan/brown mound) */}
      <div 
        className="absolute border-2 border-gray-700" 
        style={{ 
          left: '48%', 
          top: '67.5%',
          width: '4%',
          height: '5%',
          background: '#CD853F',
          borderRadius: '50%',
          boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.3)'
        }}
      ></div>
        
      {/* Home plate (white pentagon shape with H icon) */}
      <div 
        className="absolute border-2 border-gray-700 flex items-center justify-center" 
        style={{ 
          left: '48%', 
          top: '85%',
          width: '4%',
          height: '5%',
          background: '#FFFFFF',
          clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
          boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}
      >
        <span className="text-black font-bold font-mono" style={{ fontSize: 'min(0.6rem, 2.5vw)' }}>H</span>
      </div>
        
      {/* First base (white square with 1 icon) */}
      <div 
        className="absolute border-2 border-gray-700 flex items-center justify-center" 
        style={{ 
          left: '62%', 
          top: '67.5%',
          width: '4%',
          height: '5%',
          background: '#FFFFFF',
          boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}
      >
        <span className="text-black font-bold font-mono" style={{ fontSize: 'min(0.6rem, 2.5vw)' }}>1</span>
      </div>

      {/* Second base (white square) */}
      <div 
        className="absolute border-2 border-gray-700" 
        style={{ 
          left: '49%', 
          top: '51.25%',
          width: '2%',
          height: '2.5%',
          background: '#FFFFFF',
          transform: 'rotate(45deg)',
          boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}
      ></div>

      {/* Third base (white square with 3 icon) */}
      <div 
        className="absolute border-2 border-gray-700 flex items-center justify-center" 
        style={{ 
          left: '34%', 
          top: '67.5%',
          width: '4%',
          height: '5%',
          background: '#FFFFFF',
          boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}
      >
        <span className="text-black font-bold font-mono" style={{ fontSize: 'min(0.6rem, 2.5vw)' }}>3</span>
      </div>

      {/* Foul lines */}
      <div 
        className="absolute bg-white" 
        style={{
          width: '0.4%',
          height: '50%',
          left: '49.8%',
          top: '50%',
          transformOrigin: 'bottom',
          transform: 'rotate(45deg)'
        }}
      ></div>
      <div 
        className="absolute bg-white" 
        style={{
          width: '0.4%',
          height: '50%',
          left: '49.8%',
          top: '50%',
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
          className={`absolute rounded-full border-2 border-black shadow-lg transition-all duration-1000 ease-out flex items-center justify-center text-white font-bold cursor-pointer hover:scale-110 font-mono ${getPlayerColor(player.role)} ${
            player.isActive ? 'animate-pulse' : ''
          }`}
          style={{
            left: `${(player.x / 500) * 100 - 3.2}%`,
            top: `${(player.y / 400) * 100 - 4}%`,
            width: '6.4%',
            height: '8%',
            fontSize: 'min(0.6rem, 2.5vw)',
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
          className={`absolute rounded-full border-2 border-black shadow-lg transition-all duration-2000 ease-out flex items-center justify-center text-white font-bold font-mono ${
            runner.isRunning ? 'animate-bounce' : ''
          }`}
          style={{
            left: `${((runner.isRunning ? runner.targetX : runner.x) / 500) * 100 - 2.8}%`,
            top: `${((runner.isRunning ? runner.targetY : runner.y) / 400) * 100 - 3.5}%`,
            width: '5.6%',
            height: '7%',
            fontSize: 'min(0.5rem, 2vw)',
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
          left: `${((ball.isMoving ? ball.targetX : ball.x) / 500) * 100 - 1.6}%`,
          top: `${((ball.isMoving ? ball.targetY : ball.y) / 400) * 100 - 2}%`,
          width: '3.2%',
          height: '4%',
          background: ball.isThrown ? 'radial-gradient(circle, #FFA500 30%, #FF6347 70%)' : 'radial-gradient(circle, #FFFFFF 30%, #F0F0F0 70%)',
          imageRendering: 'pixelated',
          boxShadow: ball.isMoving ? '0 0 10px rgba(255,255,0,0.8)' : '2px 2px 4px rgba(0,0,0,0.4)'
        }}
        title={ball.isThrown ? `Thrown to ${ball.throwTarget}` : 'Baseball'}
      >
      </div>

      {/* Retro scoreboard-style overlay */}
      <div 
        className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-black text-green-400 px-1 sm:px-2 py-0.5 sm:py-1 font-mono border border-green-400"
        style={{ 
          imageRendering: 'pixelated',
          fontSize: 'min(0.5rem, 2vw)'
        }}
      >
        DEFENSE TRAINER
      </div>
    </div>
  );
};

export default BaseballFieldVisual;
