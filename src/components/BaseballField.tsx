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
import DecisionPanel from './baseball/DecisionPanel';
import CelebrationUnicorn from './baseball/CelebrationUnicorn';

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
  const [awaitingDecision, setAwaitingDecision] = useState(false);
  const [correctThrowTarget, setCorrectThrowTarget] = useState<string | null>(null);
  const [showUnicorn, setShowUnicorn] = useState(false);
  const [playerDecisionCorrect, setPlayerDecisionCorrect] = useState<boolean | null>(null);
  const [chickenScore, setChickenScore] = useState(0);

  // Initialize players when level changes
  useEffect(() => {
    setPlayers(getPlayersForLevel(level));
  }, [level]);

  const startScenario = () => {
    if (isAnimating) return;
    
    setPlayComplete(false);
    setPlayExplanation('');
    setAwaitingDecision(false);
    setShowUnicorn(false);
    setPlayerDecisionCorrect(null);
    
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

    // After ball movement, ask for player decision
    setTimeout(() => {
      setRunners(prev => prev.map(runner => ({
        ...runner,
        x: runner.targetX,
        y: runner.targetY,
        isRunning: false
      })));

      // Determine the correct throw target
      const throwTarget = getBestThrowTarget(randomScenario, randomScenario.baseRunners, level);
      setCorrectThrowTarget(throwTarget);
      setAwaitingDecision(true);
      setIsAnimating(false);
    }, 2000);
  };

  const handlePlayerDecision = (playerChoice: string) => {
    const isCorrect = playerChoice === correctThrowTarget;
    setPlayerDecisionCorrect(isCorrect);
    setAwaitingDecision(false);

    if (isCorrect) {
      // Increment chicken score and show unicorn celebration
      setChickenScore(prev => prev + 1);
      setShowUnicorn(true);
      setTimeout(() => setShowUnicorn(false), 3000);
    }

    // Animate the ball to the chosen location
    if (playerChoice && playerChoice !== 'catch') {
      const throwPosition = basePositions[playerChoice as keyof typeof basePositions];
      setBall(prev => ({
        ...prev,
        targetX: throwPosition.x,
        targetY: throwPosition.y,
        isMoving: true,
        isThrown: true,
        throwTarget: playerChoice
      }));
    }

    // Generate explanation after decision
    setTimeout(() => {
      const explanation = getPlayExplanation(currentScenario!, correctThrowTarget, level);
      setPlayExplanation(explanation);
      setPlayComplete(true);
    }, 1000);
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
    setAwaitingDecision(false);
    setShowUnicorn(false);
    setPlayerDecisionCorrect(null);
    setCorrectThrowTarget(null);
  };

  const resetScore = () => {
    setChickenScore(0);
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
    <div className="w-full max-w-6xl mx-auto p-6" style={{ 
      background: 'linear-gradient(180deg, #87CEEB 0%, #98D982 40%, #8B4513 100%)',
      minHeight: '100vh',
      imageRendering: 'pixelated'
    }}>
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-green-800 mb-2 font-mono pixelated" style={{
          textShadow: '3px 3px 0px #2D5016, 6px 6px 0px rgba(0,0,0,0.3)',
          fontFamily: 'monospace',
          letterSpacing: '2px'
        }}>⚾ BIGMACS DEFENSE RIZZ SCHOOL</h1>
        <p className="text-lg text-gray-700 font-mono" style={{
          textShadow: '2px 2px 0px #FFFFFF, 4px 4px 0px rgba(0,0,0,0.2)',
          fontFamily: 'monospace',
          letterSpacing: '1px'
        }}>Avoid the crash out and GET CHICKENS!</p>
        
        {/* Chicken Score Display */}
        <div className="mt-4 p-4 border-4 border-yellow-600 inline-block" style={{
          background: 'linear-gradient(145deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
          imageRendering: 'pixelated',
          boxShadow: '6px 6px 0px #B8860B, 8px 8px 0px rgba(0,0,0,0.3)'
        }}>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl">🐔</span>
            <span className="text-xl font-bold font-mono text-orange-900" style={{
              fontFamily: 'monospace',
              textShadow: '2px 2px 0px #FFFFFF'
            }}>
              CHICKENS: {chickenScore}
            </span>
            <span className="text-2xl">🐔</span>
          </div>
          {chickenScore > 0 && (
            <button
              onClick={resetScore}
              className="mt-2 px-3 py-1 text-sm font-mono border-2 border-red-600 text-red-900 font-bold"
              style={{
                background: 'linear-gradient(145deg, #F1948A 0%, #E74C3C 50%, #F1948A 100%)',
                imageRendering: 'pixelated',
                boxShadow: '2px 2px 0px #A93226',
                fontFamily: 'monospace'
              }}
            >
              RESET SCORE
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <Card className="p-6 border-4 border-stone-800 shadow-2xl relative" style={{ 
            background: 'linear-gradient(145deg, #8B7355 0%, #A0522D 50%, #8B7355 100%)',
            imageRendering: 'pixelated',
            boxShadow: '8px 8px 0px #4A4A4A, 12px 12px 0px rgba(0,0,0,0.3)'
          }}>
            {/* Level selector */}
            <div className="mb-4 flex items-center justify-center gap-4">
              <label className="text-lg font-bold font-mono text-yellow-200" style={{
                textShadow: '2px 2px 0px #8B4513',
                fontFamily: 'monospace'
              }}>LEAGUE LEVEL:</label>
              <Select value={level} onValueChange={(value: BaseballLevel) => setLevel(value)}>
                <SelectTrigger className="w-48 font-mono border-4 border-stone-600 bg-stone-200" style={{
                  fontFamily: 'monospace',
                  imageRendering: 'pixelated'
                }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="font-mono bg-stone-200 border-4 border-stone-600">
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

            {awaitingDecision ? (
              <DecisionPanel
                scenario={currentScenario}
                level={level}
                onDecision={handlePlayerDecision}
              />
            ) : (
              <GameControls
                onStartScenario={startScenario}
                onNextBatter={nextBatter}
                onReset={resetField}
                isAnimating={isAnimating}
                playComplete={playComplete}
              />
            )}

            {showUnicorn && <CelebrationUnicorn />}
          </Card>
        </div>

        <div className="w-80">
          {!playComplete ? (
            <PlayInfo scenario={scenario} level={level} ball={ball} playerDecisionCorrect={playerDecisionCorrect} />
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
