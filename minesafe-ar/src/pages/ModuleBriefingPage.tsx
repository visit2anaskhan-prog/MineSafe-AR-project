import React from 'react';
import { 
  ArrowLeft, HardHat, Zap, Flame, Camera, BookOpen, 
  ShieldCheck, AlertTriangle, CheckCircle2, Volume2, ArrowRight
} from 'lucide-react';
import { SafetyModule, Language } from '../types';
import { VoiceButton } from '../components/VoiceButton';

interface ModuleBriefingPageProps {
  module: SafetyModule;
  lang: Language;
  onNavigate: (path: string) => void;
  onOpenMarkerModal: () => void;
}

export const ModuleBriefingPage: React.FC<ModuleBriefingPageProps> = ({
  module,
  lang,
  onNavigate,
  onOpenMarkerModal
}) => {
  const Icon = module.id === 'ppe-safety' 
    ? HardHat 
    : module.id === 'electrical-safety' 
    ? Zap 
    : Flame;

  const briefingText = lang === 'hi'
    ? `${module.titleHindi}। ${module.descriptionHindi}। ध्यान रहे, डीजीएमएस नियमों के अनुसार कार्यस्थल में प्रवेश से पूर्व सभी सुरक्षा उपकरणों की जांच अनिवार्य है।`
    : `${module.title}. ${module.description}. Remember, DGMS technical guidelines require complete verification before entering any active mining face or electrical station.`;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 text-slate-100">
      {/* Back link */}
      <button
        type="button"
        onClick={() => onNavigate('/dashboard')}
        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 mb-6 font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </button>

      {/* Module Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  {module.id.toUpperCase()}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Duration: {module.durationMinutes} Mins
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-mono font-bold text-white mt-1">
                {lang === 'hi' ? module.titleHindi : module.title}
              </h1>
            </div>
          </div>

          <VoiceButton 
            text={briefingText}
            lang={lang}
            label={lang === 'hi' ? '🔊 ब्रीफिंग सुनें' : '🔊 Listen Briefing'}
          />
        </div>

        {/* Narrative Description */}
        <div className="my-6">
          <h3 className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider mb-2">
            Overview & Scope
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {lang === 'hi' ? module.descriptionHindi : module.description}
          </p>
        </div>

        {/* DGMS Regulatory Context Box */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl my-6 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <strong className="text-slate-100 block font-mono">
              Statutory Regulation: DGMS Technical Circular Compliance
            </strong>
            <span className="text-slate-400 mt-0.5 block leading-relaxed">
              Mandatory under Indian Mines Act 1952, Coal Mines Regulations (CMR 2017), and Metalliferous Mines Regulations (MMR 1961). Zero non-compliance permitted.
            </span>
          </div>
        </div>

        {/* Key Safety Rules List */}
        <div className="my-6">
          <h3 className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider mb-3">
            Core Safety Takeaways for AR Scenario
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <li className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-start gap-2.5 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Inspect equipment condition before donning or entering work zones.</span>
            </li>
            <li className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-start gap-2.5 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Report damaged insulation, missing latches, or cracked shells immediately.</span>
            </li>
            <li className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-start gap-2.5 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Execute zero-energy verification before physical contact with machinery.</span>
            </li>
            <li className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-start gap-2.5 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Maintain knowledge of emergency escape waypoints and muster points.</span>
            </li>
          </ul>
        </div>

        {/* Action Controls */}
        <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <button
            id="btn-briefing-view-marker"
            type="button"
            onClick={onOpenMarkerModal}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-2 transition-colors"
          >
            <Camera className="w-4 h-4 text-amber-400" />
            <span>Print / View Target Marker</span>
          </button>

          <button
            id="btn-briefing-launch-ar"
            type="button"
            onClick={() => onNavigate(`/ar-training/${module.id}`)}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-transform active:scale-95"
          >
            <span>Launch AR Vocational Simulation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
