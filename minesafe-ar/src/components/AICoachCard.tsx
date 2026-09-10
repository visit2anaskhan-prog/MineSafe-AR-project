import React from 'react';
import { Sparkles, AlertCircle, ArrowRight, BookOpen, CheckCircle2, Bot } from 'lucide-react';
import { AIFeedback, Language } from '../types';
import { VoiceButton } from './VoiceButton';

interface AICoachCardProps {
  feedback: AIFeedback | null;
  loading: boolean;
  lang: Language;
  onSelectNextModule?: (moduleId: string) => void;
}

export const AICoachCard: React.FC<AICoachCardProps> = ({
  feedback,
  loading,
  lang,
  onSelectNextModule
}) => {
  if (loading) {
    return (
      <div className="w-full bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 animate-spin">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Bot className="w-4 h-4 text-amber-400" />
              <span>{lang === 'hi' ? 'एआई सुरक्षा कोच विश्लेषण' : 'AI Safety Coach Analysis'}</span>
            </h3>
            <p className="text-xs text-amber-400/90 font-mono animate-pulse">
              {lang === 'hi'
                ? 'जेमिनी एआई द्वारा डीजीएमएस मानकों के आधार पर आंकलन किया जा रहा है...'
                : 'Gemini 3.8 Flash evaluating compliance gaps and formulating remedial plan...'}
            </p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-4 bg-slate-800 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-slate-800 rounded animate-pulse w-full" />
          <div className="h-4 bg-slate-800 rounded animate-pulse w-5/6" />
        </div>
      </div>
    );
  }

  if (!feedback) return null;

  const voiceNarrative = `${feedback.feedback} ${feedback.recommendation}`;

  return (
    <div 
      id="ai-coach-feedback-card"
      className="w-full bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-amber-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
    >
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/15 border border-amber-500/40 rounded-xl text-amber-400 shadow-inner">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-100">
                {lang === 'hi' ? 'एआई सुरक्षा कोच व्यक्तिगत विश्लेषण' : 'AI Safety Coach Evaluation'}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold">
                Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {lang === 'hi' ? 'झारखंड खनन एवं विनिर्माण सुरक्षा परिषद' : 'Jharkhand Vocational Industrial Standards (DGMS)'}
            </p>
          </div>
        </div>

        <VoiceButton 
          text={voiceNarrative}
          lang={lang}
          label={lang === 'hi' ? '🔊 कोच सुनें' : '🔊 Listen to AI Coach'}
        />
      </div>

      {/* Main Feedback Prose */}
      <div className="my-4 relative z-10">
        <p className="text-sm text-slate-200 leading-relaxed font-medium">
          {feedback.feedback}
        </p>
      </div>

      {/* Weak Areas Tags */}
      {feedback.weakTopics && feedback.weakTopics.length > 0 && (
        <div className="my-4 relative z-10">
          <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5 uppercase tracking-wide font-mono mb-2">
            <AlertCircle className="w-3.5 h-3.5" />
            {lang === 'hi' ? 'सुधार हेतु कमजोर विषय' : 'Identified Knowledge Gaps'}
          </span>
          <div className="flex flex-wrap gap-2">
            {feedback.weakTopics.map((topic, i) => (
              <span 
                key={i}
                className="text-xs font-medium px-3 py-1 bg-rose-950/60 text-rose-200 border border-rose-800/60 rounded-lg shadow-xs"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations & Remedial Steps */}
      <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl my-4 relative z-10">
        <div className="flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wide text-amber-300 font-mono mb-1">
              {lang === 'hi' ? 'एआई सुरक्षा सिफारिश' : 'AI Safety Recommendation'}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {feedback.recommendation}
            </p>
          </div>
        </div>
      </div>

      {/* Revision Takeaway Points */}
      {feedback.revisionPoints && feedback.revisionPoints.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-800 relative z-10">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-2 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            {lang === 'hi' ? 'महत्वपूर्ण पुनरावलोकन बिंदु' : 'Critical Site Takeaways'}
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {feedback.revisionPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Module Action Button */}
      {feedback.nextRecommendedModule && onSelectNextModule && (
        <div className="mt-5 pt-4 border-t border-slate-800 flex justify-end relative z-10">
          <button
            id="btn-next-rec-module"
            type="button"
            onClick={() => onSelectNextModule(feedback.nextRecommendedModule)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow-lg transition-colors"
          >
            <span>{lang === 'hi' ? 'अनुशंसित मॉड्यूल पर जाएं' : 'Proceed to Recommended Module'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
