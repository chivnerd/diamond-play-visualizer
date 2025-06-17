
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, RotateCcw } from 'lucide-react';

interface Player {
  id: string;
  position: string;
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  isActive: boolean;
  role: 'fielder' | 'backup' | 'cover' | 'normal';
}

interface Ball {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  isMoving: boolean;
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

  const [ball, setBall] = useState<Ball>({
    x: 250,
    y: 350,
    targetX: 250,
    targetY: 350,
    isMoving: false
  });

  const [scenario, setScenario] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState(false);

  const scenarios = [
    {
      name: 'Ground ball to shortstop',
      ballTarget: { x: 220, y: 220 },
      movements: [
        { playerId: 'SS', x: 220, y: 220, role: 'fielder' },
        { playerId: '2B', x: 270, y: 240, role: 'cover' },
        { playerId: 'CF', x: 220, y: 180, role: 'backup' },
        { playerId: '1B', x: 300, y: 260, role: 'cover' }
      ]
    },
    {
      name: 'Fly ball to right field',
      ballTarget: { x: 380, y: 120 },
      movements: [
        { playerId: 'RF', x: 380, y: 120, role: 'fielder' },
        { playerId: 'CF', x: 320, y: 100, role: 'backup' },
        { playerId: '1B', x: 300, y: 260, role: 'cover' },
        { playerId: '2B', x: 270, y: 240, role: 'cover' }
      ]
    },
    {
      name: 'Ground ball to third base',
      ballTarget: { x: 180, y: 280 },
      movements: [
        { playerId: '3B', x: 180, y: 280, role: 'fielder' },
        { playerId: 'SS', x: 200, y: 240, role: 'cover' },
        { playerId: 'LF', x: 150, y: 220, role: 'backup' },
        { playerId: '1B', x: 300, y: 260, role: 'cover' }
      ]
    },
    {
      name: 'Line drive to center field',
      ballTarget: { x: 250, y: 80 },
      movements: [
        { playerId: 'CF', x: 250, y: 80, role: 'fielder' },
        { playerId: 'LF', x: 200, y: 100, role: 'backup' },
        { playerId: 'RF', x: 300, y: 100, role: 'backup' },
        { playerId: '2B', x: 270, y: 240, role: 'cover' }
      ]
    },
    {
      name: 'Ground ball to first base',
      ballTarget: { x: 320, y: 280 },
      movements: [
        { playerId: '1B', x: 320, y: 280, role: 'fielder' },
        { playerId: 'P', x: 300, y: 260, role: 'cover' },
        { playerId: 'RF', x: 350, y: 200, role: 'backup' },
        { playerId: '2B', x: 270, y: 240, role: 'cover' }
      ]
    }
  ];

  const startScenario = () => {
    if (isAnimating) return;
    
    const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    setScenario(randomScenario.name);
    setIsAnimating(true);

    // Animate ball
    setBall(prev => ({
      ...prev,
      targetX: randomScenario.ballTarget.x,
      targetY: randomScenario.ballTarget.y,
      isMoving: true
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
    }, 500);

    setTimeout(() => {
      setIsAnimating(false);
    }, 3000);
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
      isMoving: false
    });
    setScenario('');
    setIsAnimating(false);
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
      case 'fielder': return 'bg-blue-500';
      case 'backup': return 'bg-yellow-500';
      case 'cover': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'fielder': return 'Fields the ball';
      case 'backup': return 'Backs up the play';
      case 'cover': return 'Covers the base';
      default: return '';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-green-800 mb-2">⚾ Baseball Defense Trainer</h1>
        <p className="text-lg text-gray-600">Learn where players move when the ball is hit!</p>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <Card className="p-6 bg-green-50">
            <div className="relative bg-green-600 rounded-lg overflow-hidden" style={{ width: '500px', height: '400px', margin: '0 auto' }}>
              {/* Baseball field elements */}
              <div className="absolute inset-0">
                {/* Pitcher's mound */}
                <div className="absolute w-8 h-8 bg-yellow-600 rounded-full" style={{ left: '242px', top: '272px' }}></div>
                
                {/* Home plate */}
                <div className="absolute w-4 h-4 bg-white rounded-sm rotate-45" style={{ left: '242px', top: '342px' }}></div>
                
                {/* Bases */}
                <div className="absolute w-4 h-4 bg-white rounded-sm rotate-45" style={{ left: '312px', top: '272px' }}></div>
                <div className="absolute w-4 h-4 bg-white rounded-sm rotate-45" style={{ left: '242px', top: '202px' }}></div>
                <div className="absolute w-4 h-4 bg-white rounded-sm rotate-45" style={{ left: '172px', top: '272px' }}></div>
                
                {/* Infield dirt */}
                <div className="absolute bg-yellow-700 opacity-30 rounded-full" style={{ 
                  width: '280px', 
                  height: '280px', 
                  left: '110px', 
                  top: '120px' 
                }}></div>
              </div>

              {/* Players */}
              {players.map((player) => (
                <div
                  key={player.id}
                  className={`absolute w-8 h-8 rounded-full ${getPlayerColor(player.role)} border-2 border-white shadow-lg transition-all duration-1000 ease-out flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:scale-110 ${
                    player.isActive ? 'animate-pulse' : ''
                  }`}
                  style={{
                    left: `${player.x - 16}px`,
                    top: `${player.y - 16}px`,
                    transform: player.isActive ? 'scale(1.2)' : 'scale(1)',
                  }}
                  title={`${player.position} - ${getRoleDescription(player.role)}`}
                >
                  {player.id}
                </div>
              ))}

              {/* Ball */}
              <div
                className={`absolute w-4 h-4 bg-white rounded-full border-2 border-red-500 shadow-lg transition-all duration-1000 ease-out ${
                  ball.isMoving ? 'animate-bounce' : ''
                }`}
                style={{
                  left: `${ball.isMoving ? ball.targetX - 8 : ball.x - 8}px`,
                  top: `${ball.isMoving ? ball.targetY - 8 : ball.y - 8}px`,
                }}
              >
                ⚾
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <Button 
                onClick={startScenario} 
                disabled={isAnimating}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                {isAnimating ? 'Watch the Play!' : 'Hit the Ball!'}
              </Button>
              <Button 
                onClick={resetField} 
                variant="outline"
                className="px-6 py-3 text-lg"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>
            </div>
          </Card>
        </div>

        <div className="w-80">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Current Play</h3>
            {scenario ? (
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800">{scenario}</h4>
                </div>
                
                <div className="space-y-2">
                  <h5 className="font-semibold">Player Roles:</h5>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span>Fields the ball</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <span>Backs up the play</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span>Covers the base</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">Click "Hit the Ball!" to see a random defensive scenario.</p>
            )}
          </Card>

          <Card className="p-6 mt-4">
            <h3 className="text-xl font-bold mb-4">How to Play</h3>
            <div className="space-y-3 text-sm">
              <p>🎯 Watch as the ball gets hit to different areas of the field</p>
              <p>👥 See how players move to their defensive positions</p>
              <p>📚 Learn who fields, backs up, and covers bases</p>
              <p>🔄 Try different scenarios by clicking "Hit the Ball!" again</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BaseballField;
