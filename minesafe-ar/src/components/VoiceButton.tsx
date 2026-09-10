import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speakText, stopSpeech } from '../utils/speech';
import { Language } from '../types';

interface VoiceButtonProps {
  text: string;
  lang: Language;
  label?: string;
  className?: string;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({
  text,
  lang,
  label,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  const handleToggle = () => {
    if (isPlaying) {
      stopSpeech();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      speakText(text, lang, () => {
        setIsPlaying(false);
      });
    }
  };

  return (
    <button
      id={`btn-voice-${lang}`}
      type="button"
      onClick={handleToggle}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
        isPlaying
          ? 'bg-amber-500 text-slate-950 animate-pulse ring-2 ring-amber-400/50'
          : 'bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30'
      } ${className}`}
      title={isPlaying ? 'Stop Voice' : 'Listen to Voice Briefing'}
    >
      {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
      <span>
        {isPlaying 
          ? (lang === 'hi' ? 'रोकें' : 'Stop')
          : (label || (lang === 'hi' ? '🔊 सुनें' : '🔊 Listen'))
        }
      </span>
    </button>
  );
};
