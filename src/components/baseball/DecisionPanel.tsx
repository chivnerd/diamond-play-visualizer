
import React from 'react';
import { Button } from '@/components/ui/button';
import { GameScenario, BaseballLevel } from '../../types/baseball';
import { Target, Home, Square } from 'lucide-react';

interface DecisionPanelProps {
  scenario: GameScenario | null;
  level: BaseballLevel;
  onDecision: (choice: string) => void;
}

const DecisionPanel: React.FC<DecisionPanelProps> = ({ scenario, level, onDecision }) => {
  if (!scenario) return null;

  const getAvailableOptions = () => {
    const options = [];
    
    // For pop flies, only show catch option
    if (scenario.name.toLowerCase().includes('pop fly') || scenario.name.toLowerCase().includes('pop up')) {
      options.push({ value: 'catch', label: 'CATCH IT!', icon: Target });
      return options;
    }

    // For other plays, show base options
    options.push(
      { value: 'home', label: 'HOME', icon: Home },
      { value: '1st', label: '1ST BASE', icon: Square },
      { value: '2nd', label: '2ND BASE', icon: Square },
      { value: '3rd', label: '3RD BASE', icon: Square }
    );

    return options;
  };

  const options = getAvailableOptions();

  return (
    <div className="mt-6 p-6 border-4 border-yellow-600 text-center" style={{
      background: 'linear-gradient(145deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
      imageRendering: 'pixelated',
      boxShadow: '6px 6px 0px #B8860B, 8px 8px 0px rgba(0,0,0,0.3)'
    }}>
      <h3 className="text-2xl font-bold font-mono text-orange-900 mb-4" style={{
        fontFamily: 'monospace',
        textShadow: '2px 2px 0px #FFFFFF'
      }}>
        🎯 WHERE DO YOU THROW THE BALL?
      </h3>
      
      <p className="text-lg font-mono text-orange-800 mb-6" style={{
        fontFamily: 'monospace',
        textShadow: '1px 1px 0px rgba(255,255,255,0.5)'
      }}>
        Make the right decision to get CHICKENS! 🐔
      </p>

      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <Button
              key={option.value}
              onClick={() => onDecision(option.value)}
              className="p-4 text-lg font-mono border-4 text-white font-bold h-auto"
              style={{
                background: 'linear-gradient(145deg, #4A90E2 0%, #2E5BA8 50%, #4A90E2 100%)',
                borderColor: '#1E3A5F',
                imageRendering: 'pixelated',
                boxShadow: '4px 4px 0px #1E3A5F, 6px 6px 0px rgba(0,0,0,0.3)',
                textShadow: '2px 2px 0px rgba(0,0,0,0.5)',
                fontFamily: 'monospace'
              }}
            >
              <Icon className="w-6 h-6 mr-2" />
              {option.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default DecisionPanel;
