
import React from 'react';
import { Card } from '@/components/ui/card';

interface PlayAnalysisProps {
  playExplanation: string;
}

const PlayAnalysis: React.FC<PlayAnalysisProps> = ({ playExplanation }) => {
  return (
    <Card className="p-6 max-h-96 overflow-y-auto border-4 border-gray-600 bg-gray-100" style={{ imageRendering: 'pixelated' }}>
      <h3 className="text-xl font-bold mb-4 font-mono">PLAY ANALYSIS</h3>
      <div className="prose prose-sm font-mono">
        {playExplanation.split('\n').map((line, index) => {
          if (line.startsWith('**') && line.endsWith('**')) {
            return <h4 key={index} className="font-bold text-blue-800 mt-4 mb-2 font-mono">{line.slice(2, -2)}</h4>;
          } else if (line.startsWith('•')) {
            return <li key={index} className="ml-4 mb-1 font-mono">{line.slice(2)}</li>;
          } else if (line.trim()) {
            return <p key={index} className="mb-2 font-mono">{line}</p>;
          }
          return <br key={index} />;
        })}
      </div>
    </Card>
  );
};

export default PlayAnalysis;
