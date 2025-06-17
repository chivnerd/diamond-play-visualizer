
import React from 'react';

interface ForceOutIndicatorsProps {
  baseRunners: string[];
  scenario: any;
}

const ForceOutIndicators: React.FC<ForceOutIndicatorsProps> = ({ baseRunners, scenario }) => {
  const getForceOutBases = () => {
    const forceOuts = [];
    
    // Only show force outs for ground balls
    if (!scenario?.name.toLowerCase().includes('ground ball') && 
        !scenario?.name.toLowerCase().includes('grounder') && 
        !scenario?.name.toLowerCase().includes('chopper') && 
        !scenario?.name.toLowerCase().includes('roller')) {
      return forceOuts;
    }

    // First base is ALWAYS a force out on ground balls (batter running to first)
    forceOuts.push({ base: '1st', x: 64, y: 70 }); // percentage-based positioning

    // Force out at second if runner on first
    if (baseRunners.includes('1st')) {
      forceOuts.push({ base: '2nd', x: 49, y: 51.25 });
    }

    // Force out at third if runners on first and second
    if (baseRunners.includes('1st') && baseRunners.includes('2nd')) {
      forceOuts.push({ base: '3rd', x: 36, y: 70 });
    }

    // Force out at home if bases loaded
    if (baseRunners.includes('1st') && baseRunners.includes('2nd') && baseRunners.includes('3rd')) {
      forceOuts.push({ base: 'home', x: 50, y: 86.25 });
    }

    return forceOuts;
  };

  const forceOutBases = getForceOutBases();

  if (forceOutBases.length === 0) return null;

  return (
    <>
      {forceOutBases.map((forceOut, index) => (
        <div key={index}>
          {/* Pulsing force out indicator */}
          <div
            className="absolute animate-pulse"
            style={{
              left: `${forceOut.x - 4}%`,
              top: `${forceOut.y - 5}%`,
              width: '8%',
              height: '10%',
              border: '3px solid #FF4444',
              borderRadius: '50%',
              background: 'rgba(255, 68, 68, 0.2)',
              pointerEvents: 'none',
              zIndex: 10
            }}
          />
          
          {/* Force out label */}
          <div
            className="absolute font-bold font-mono text-red-600 bg-white px-1 border border-red-600 rounded"
            style={{
              left: `${forceOut.x - 3}%`,
              top: `${forceOut.y - 8.75}%`,
              pointerEvents: 'none',
              zIndex: 11,
              textShadow: '1px 1px 0px rgba(255,255,255,0.8)',
              fontSize: 'min(0.5rem, 2vw)'
            }}
          >
            FORCE
          </div>
        </div>
      ))}
    </>
  );
};

export default ForceOutIndicators;
