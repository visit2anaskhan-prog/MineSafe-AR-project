import React from 'react';
import { ArrowLeft, Camera, ShieldCheck, Eye, HelpCircle } from 'lucide-react';
import { SafetyModule, Language } from '../types';
import { ARScene } from '../components/ARScene';
import { t } from '../utils/translations';

interface ARTrainingPageProps {
  module: SafetyModule;
  lang: Language;
  onNavigate: (path: string) => void;
  onOpenMarkerModal: () => void;
}

export const ARTrainingPage: React.FC<ARTrainingPageProps> = ({
  module,
  lang,
  onNavigate,
  onOpenMarkerModal
}) => {
  const handleScenarioComplete = () => {
    onNavigate(`/assessment/${module.id}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 text-slate-100">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <button
          type="button"
          onClick={() => onNavigate(`/modules/${module.id}`)}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit AR to Briefing</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenMarkerModal}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Target Marker</span>
          </button>
        </div>
      </div>

      {/* 4 Steps Instructions Bar */}
      <div className="mb-4 p-3 bg-slate-900 border border-slate-800 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] text-slate-300 font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-[10px] shrink-0">1</span>
          <span className="truncate">Allow Camera</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-[10px] shrink-0">2</span>
          <span className="truncate">Scan Marker</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-[10px] shrink-0">3</span>
          <span className="truncate">Lock 3D Scene</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-[10px] shrink-0">4</span>
          <span className="truncate">Tap Hazards</span>
        </div>
      </div>

      {/* Core AR Vocational Scene Component */}
      <ARScene
        module={module}
        lang={lang}
        onComplete={handleScenarioComplete}
        onOpenMarkerModal={onOpenMarkerModal}
      />

      {/* Helper Footer Tips */}
      <div className="mt-4 p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            {lang === 'hi'
              ? 'टिप: यदि कैमरा उपलब्ध नहीं है, तो ऊपर दिए गए बटन से "3D सिम्युलेटर" चुनें।'
              : 'Trouble scanning? Switch between "Camera AR" and "3D Simulator" anytime from the top bar.'}
          </span>
        </div>
        <button
          type="button"
          onClick={handleScenarioComplete}
          className="text-amber-400 hover:underline font-semibold whitespace-nowrap text-xs"
        >
          Skip to Assessment →
        </button>
      </div>
    </div>
  );
};
