
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RizzMode, getRizzModeLabel } from '../../utils/rizzModeContent';

interface RizzModeSelectorProps {
  rizzMode: RizzMode;
  onRizzModeChange: (mode: RizzMode) => void;
}

const RizzModeSelector: React.FC<RizzModeSelectorProps> = ({ rizzMode, onRizzModeChange }) => {
  return (
    <div className="p-3 border-4 border-purple-500" style={{
      background: 'linear-gradient(145deg, #E1BEE7 0%, #D1C4E9 50%, #E1BEE7 100%)',
      imageRendering: 'pixelated'
    }}>
      <h4 className="font-bold text-purple-900 font-mono mb-2" style={{ fontFamily: 'monospace' }}>
        🎭 RIZZ MODE:
      </h4>
      <Select value={rizzMode} onValueChange={(value: RizzMode) => onRizzModeChange(value)}>
        <SelectTrigger className="w-full font-mono" style={{ fontFamily: 'monospace' }}>
          <SelectValue placeholder="Choose your vibe..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="youtuber">{getRizzModeLabel('youtuber')}</SelectItem>
          <SelectItem value="shakespeare">{getRizzModeLabel('shakespeare')}</SelectItem>
          <SelectItem value="spanish">{getRizzModeLabel('spanish')}</SelectItem>
          <SelectItem value="liljon">{getRizzModeLabel('liljon')}</SelectItem>
          <SelectItem value="english">{getRizzModeLabel('english')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RizzModeSelector;
