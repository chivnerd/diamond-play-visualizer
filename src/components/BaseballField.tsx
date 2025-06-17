import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BaseballLevel, Player, Runner, Ball, GameScenario } from '../types/baseball';
import { getPlayersForLevel, basePositions } from '../utils/baseballPositions';
import { getScenariosForLevel } from '../utils/baseballLevels';
import { getBestThrowTarget, getPlayExplanation, isCorrectThrow, isDoublePlay } from '../utils/gameLogic';
import BaseballFieldVisual from './baseball/BaseballFieldVisual';
import GameControls from './baseball/GameControls';
import PlayInfo from './baseball/PlayInfo';
import PlayAnalysis from './baseball/PlayAnalysis';
import LevelInfo from './baseball/LevelInfo';
import DecisionPanel from './baseball/DecisionPanel';
import CelebrationUnicorn from './baseball/CelebrationUnicorn';
import FeedbackPopup from './baseball/FeedbackPopup';

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
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [lastPlayerChoice, setLastPlayerChoice] = useState<string>('');
  const [celebrationVariant, setCelebrationVariant] = useState<'default' | 'epic' | 'legendary' | 'magical'>('default');

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
    const isCorrect = isCorrectThrow(playerChoice, currentScenario!, level);
    const isDouble = isDoublePlay(playerChoice, currentScenario!);
    setPlayerDecisionCorrect(isCorrect);
    setAwaitingDecision(false);
    setLastPlayerChoice(playerChoice);

    if (isCorrect) {
      // Award chickens - 2 for double play, 1 for regular play
      const chickensEarned = isDouble ? 2 : 1;
      setChickenScore(prev => prev + chickensEarned);
      
      // Determine celebration variant based on score and play type
      const newScore = chickenScore + chickensEarned;
      let variant: 'default' | 'epic' | 'legendary' | 'magical' = 'default';
      
      if (newScore >= 20) {
        variant = 'legendary';
      } else if (newScore >= 10) {
        variant = 'magical';
      } else if (isDouble || newScore >= 5) {
        variant = 'epic';
      }
      
      setCelebrationVariant(variant);
      setShowUnicorn(true);
      setTimeout(() => setShowUnicorn(false), 6000);
    }

    // Show feedback popup for ALL decisions (correct and incorrect)
    setShowFeedbackPopup(true);

    // Animate the ball to the chosen location (but not for catches)
    if (playerChoice && !playerChoice.startsWith('catch')) {
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
    }, playerChoice.startsWith('catch') ? 500 : 1000); // Shorter delay for catches
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
    setShowFeedbackPopup(false);
    setLastPlayerChoice('');
    setCelebrationVariant('default');
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
    <div className="w-full max-w-6xl mx-auto p-3 sm:p-6" style={{ 
      background: 'linear-gradient(180deg, #87CEEB 0%, #98D982 40%, #8B4513 100%)',
      minHeight: '100vh',
      imageRendering: 'pixelated'
    }}>
      <div className="text-center mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800 mb-2 font-mono pixelated" style={{
          textShadow: '3px 3px 0px #2D5016, 6px 6px 0px rgba(0,0,0,0.3)',
          fontFamily: 'monospace',
          letterSpacing: '1px sm:2px'
        }}>⚾ BIGMACS DEFENSE RIZZ SCHOOL</h1>
        <p className="text-sm sm:text-lg text-gray-700 font-mono" style={{
          textShadow: '2px 2px 0px #FFFFFF, 4px 4px 0px rgba(0,0,0,0.2)',
          fontFamily: 'monospace',
          letterSpacing: '0.5px sm:1px'
        }}>Avoid the crash out and GET CHICKENS!</p>
        
        {/* Chicken Score Display */}
        <div className="mt-3 sm:mt-4 p-3 sm:p-4 border-4 border-yellow-600 inline-block" style={{
          background: 'linear-gradient(145deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
          imageRendering: 'pixelated',
          boxShadow: '6px 6px 0px #B8860B, 8px 8px 0px rgba(0,0,0,0.3)'
        }}>
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <span className="text-xl sm:text-2xl">🐔</span>
            <span className="text-lg sm:text-xl font-bold font-mono text-orange-900" style={{
              fontFamily: 'monospace',
              textShadow: '2px 2px 0px #FFFFFF'
            }}>
              CHICKENS: {chickenScore}
            </span>
            <span className="text-xl sm:text-2xl">🐔</span>
          </div>
          {chickenScore > 0 && (
            <button
              onClick={resetScore}
              className="mt-2 px-2 sm:px-3 py-1 text-xs sm:text-sm font-mono border-2 border-red-600 text-red-900 font-bold"
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

      {/* Mobile-first responsive layout */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Level selector moved to top on mobile */}
        <div className="lg:hidden">
          <Card className="p-4 border-4 border-gray-600 bg-gray-100 mb-4" style={{ imageRendering: 'pixelated' }}>
            <h3 className="text-lg font-bold mb-3 font-mono">LEAGUE LEVEL</h3>
            
            <div className="mb-3 flex flex-col gap-2">
              <label className="text-sm font-bold font-mono text-gray-700" style={{
                fontFamily: 'monospace'
              }}>SELECT YOUR LEVEL:</label>
              <Select value={level} onValueChange={(value: BaseballLevel) => setLevel(value)}>
                <SelectTrigger className="w-full font-mono border-4 border-stone-600 bg-stone-200" style={{
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
          </Card>
        </div>

        {/* Current Play Info - mobile only, above the field */}
        <div className="lg:hidden">
          {!playComplete ? (
            <PlayInfo scenario={scenario} level={level} ball={ball} playerDecisionCorrect={playerDecisionCorrect} />
          ) : (
            <PlayAnalysis playExplanation={playExplanation} />
          )}
        </div>

        <div className="flex-1">
          <Card className="p-3 sm:p-6 border-4 border-stone-800 shadow-2xl relative" style={{ 
            background: 'linear-gradient(145deg, #8B7355 0%, #A0522D 50%, #8B7355 100%)',
            imageRendering: 'pixelated',
            boxShadow: '8px 8px 0px #4A4A4A, 12px 12px 0px rgba(0,0,0,0.3)'
          }}>
            <BaseballFieldVisual 
              players={players} 
              runners={runners} 
              ball={ball} 
              scenario={currentScenario}
              awaitingDecision={awaitingDecision}
            />

            {awaitingDecision && (
              <DecisionPanel
                scenario={currentScenario}
                level={level}
                onDecision={handlePlayerDecision}
              />
            )}

            {showUnicorn && <CelebrationUnicorn variant={celebrationVariant} />}
          </Card>

          {/* Game Controls below the field */}
          {!awaitingDecision && (
            <GameControls
              onStartScenario={startScenario}
              onNextBatter={nextBatter}
              onReset={resetField}
              isAnimating={isAnimating}
              playComplete={playComplete}
            />
          )}

          {/* Level info moved below controls on mobile */}
          <div className="lg:hidden mt-4">
            <LevelInfo />
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:block w-80">
          {/* Level selector for desktop */}
          <Card className="p-6 border-4 border-gray-600 bg-gray-100 mb-4" style={{ imageRendering: 'pixelated' }}>
            <h3 className="text-xl font-bold mb-4 font-mono">LEAGUE LEVEL</h3>
            
            <div className="mb-4 flex flex-col gap-2">
              <label className="text-sm font-bold font-mono text-gray-700" style={{
                fontFamily: 'monospace'
              }}>SELECT YOUR LEVEL:</label>
              <Select value={level} onValueChange={(value: BaseballLevel) => setLevel(value)}>
                <SelectTrigger className="w-full font-mono border-4 border-stone-600 bg-stone-200" style={{
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
          </Card>

          {!playComplete ? (
            <PlayInfo scenario={scenario} level={level} ball={ball} playerDecisionCorrect={playerDecisionCorrect} />
          ) : (
            <PlayAnalysis playExplanation={playExplanation} />
          )}

          <LevelInfo />
        </div>
      </div>

      {/* Feedback Popup */}
      <FeedbackPopup
        isOpen={showFeedbackPopup}
        onClose={() => setShowFeedbackPopup(false)}
        scenario={currentScenario}
        playerChoice={lastPlayerChoice}
        correctChoice={correctThrowTarget}
        level={level}
      />
    </div>
  );
};

export default BaseballField;
