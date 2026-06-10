import React, { useState } from 'react';
import { soundManager } from '@/lib/sounds';

const SoundToggle: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);

  const toggle = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    soundManager.setMuted(newMuted);
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-4 right-4 z-50 w-10 h-10 rounded-full bg-slate-800/80 border border-slate-600/50 backdrop-blur-sm flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/80 transition-all duration-200 active:scale-[0.9]"
      title={isMuted ? '開啟音效' : '關閉音效'}
    >
      {isMuted ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  );
};

export default SoundToggle;
