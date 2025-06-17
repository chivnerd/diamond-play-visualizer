
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BaseballLevel, Player, Runner, Ball, GameScenario } from '../types/baseball';
import { getPlayersForLevel, basePositions } from '../utils/baseballPositions';
import { getScenariosForLevel } from '../utils/baseballLevels';
import { getBestThrowTarget, getPlayExplanation } from '../utils/gameLogic';
import BaseballFieldVisual from './baseball/BaseballFieldVisual';
import GameControls from './baseball/GameControls';
import PlayInfo from './baseball/PlayInfo';
import PlayAnalysis from './baseball/PlayAnalysis';
import LevelInfo from './baseball/LevelInfo';

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
  const [currentScenario, setCurrentScenario] = useState<GameScenario | null>(null);
  const [playComplete, setPlayComplete] = useState(false);
  const [playExplanation, setPlayExplanation] = useState<string>('');

  // Initialize players when level changes
  useEffect(() => {
    setPlayers(getPlayersForLevel(level));
  }, [level]);

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
      const throwTarget = getBestThrowTarget(randomScenario, randomScenario.baseRunners, level);
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
        const explanation = getPlayExplanation(randomScenario, throwTarget, level);
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

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-green-800 mb-2 font-mono pixelated">⚾ BIGMACS DEFENSE RIZZ SCHOOL</h1>
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

            <BaseballFieldVisual players={players} runners={runners} ball={ball} />

            <GameControls
              onStartScenario={startScenario}
              onNextBatter={nextBatter}
              onReset={resetField}
              isAnimating={isAnimating}
              playComplete={playComplete}
            />
          </Card>
        </div>

        <div className="w-80">
          {!playComplete ? (
            <PlayInfo scenario={scenario} level={level} ball={ball} />
          ) : (
            <PlayAnalysis playExplanation={playExplanation} />
          )}

          <LevelInfo />
        </div>
      </div>
    </div>
  );
};

export default BaseballField;
