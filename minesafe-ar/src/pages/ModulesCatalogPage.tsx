import React from 'react';
import { HardHat, Zap, Flame, Camera, BookOpen, ArrowRight, ShieldCheck } from 'lucide-react';
import { storage } from '../data/storage';
import { Language } from '../types';

interface ModulesCatalogPageProps {
  lang: Language;
  onNavigate: (path: string) => void;
  onOpenMarkerModal: () => void;
}

export const ModulesCatalogPage: React.FC<ModulesCatalogPageProps> = ({
  lang,
  onNavigate,
  onOpenMarkerModal
}) => {
  const modules = storage.getModules();
  const currentUser = storage.getCurrentUser();
  const userProgress = currentUser ? storage.getUserProgress(currentUser.uid || currentUser.id || 'usr_001') : [];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-mono font-bold text-white">
            Industrial Safety Curriculum
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Standardized DGMS vocational syllabus for mining & manufacturing in Jharkhand
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenMarkerModal}
          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
        >
          <Camera className="w-4 h-4" />
          <span>Print Training Marker</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        {modules.map((mod) => {
          const prog = userProgress.find(p => p.moduleId === mod.id);
          const isCompleted = prog?.completed;
          const Icon = mod.id === 'ppe-safety' ? HardHat : mod.id === 'electrical-safety' ? Zap : Flame;

          return (
            <div key={mod.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    isCompleted 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isCompleted ? '✓ CERTIFIED' : 'PENDING'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {lang === 'hi' ? mod.titleHindi : mod.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {lang === 'hi' ? mod.descriptionHindi : mod.description}
                </p>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-400">
                    <span>Duration:</span>
                    <span className="text-slate-200">{mod.estimatedMinutes || mod.durationMinutes || 15} Minutes</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Passing Score:</span>
                    <span className="text-amber-400 font-mono">≥70% Required</span>
                  </div>
                  {prog && (
                    <div className="flex justify-between text-slate-400">
                      <span>Best Score:</span>
                      <span className="text-emerald-400 font-mono font-bold">{prog.bestScore}%</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-800 flex gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate(`/ar-training/${mod.id}`)}
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{isCompleted ? 'Replay AR' : 'Launch AR'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate(`/modules/${mod.id}`)}
                  className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl border border-slate-700 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
