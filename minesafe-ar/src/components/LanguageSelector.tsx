import React from 'react';
import { Language } from '../types';
import { Languages } from 'lucide-react';

interface LanguageSelectorProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  compact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLang,
  onLanguageChange,
  compact = false
}) => {
  return (
    <div className="flex items-center gap-1 bg-slate-900 border border-slate-700/80 rounded-lg p-1 text-xs">
      {!compact && <Languages className="w-3.5 h-3.5 text-amber-500 ml-1 mr-0.5" />}
      <button
        id="btn-lang-en"
        type="button"
        onClick={() => onLanguageChange('en')}
        className={`px-2 py-1 rounded font-medium transition-colors ${
          currentLang === 'en'
            ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        EN
      </button>
      <button
        id="btn-lang-hi"
        type="button"
        onClick={() => onLanguageChange('hi')}
        className={`px-2 py-1 rounded font-medium transition-colors ${
          currentLang === 'hi'
            ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        हिन्दी
      </button>
    </div>
  );
};
