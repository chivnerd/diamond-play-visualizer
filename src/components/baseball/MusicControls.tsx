
import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicControlsProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

const MusicControls: React.FC<MusicControlsProps> = ({ isMuted, onToggleMute }) => {
  return (
    <div className="flex items-center justify-center p-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleMute}
        className="p-2 border-2 border-purple-400 bg-purple-100 hover:bg-purple-200"
        style={{ fontFamily: 'monospace' }}
      >
        {isMuted ? (
          <>
            <VolumeX className="h-4 w-4 mr-1" />
            <span className="text-xs font-mono">UNMUTE</span>
          </>
        ) : (
          <>
            <Volume2 className="h-4 w-4 mr-1" />
            <span className="text-xs font-mono">MUTE</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default MusicControls;
