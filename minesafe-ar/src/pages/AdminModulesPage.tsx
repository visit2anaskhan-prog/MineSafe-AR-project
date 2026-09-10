import React from 'react';
import { HardHat, Zap, Flame, BookOpen, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { storage } from '../data/storage';
import { Language } from '../types';

interface AdminModulesPageProps {
  lang: Language;
  onNavigate: (path: string) => void;
}

export const AdminModulesPage: React.FC<AdminModulesPageProps> = ({
  lang,
  onNavigate
}) => {
  const modules = storage.getModules();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-slate-100">
      <div className="flex items-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => onNavigate('/admin')}
          className="text-xs text-slate-400 hover:text-amber-400 font-medium flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Overview</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-mono font-bold text-white">
            Curriculum & Module Syllabus Manager
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Directorate General of Mines Safety (DGMS) Vocational Modules
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('/admin/insights')}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors"
        >
          Generate Questions with Gemini →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        {modules.map((mod) => {
          const questions = storage.getQuestions(mod.id);
          const Icon = mod.id === 'ppe-safety' ? HardHat : mod.id === 'electrical-safety' ? Zap : Flame;

          return (
            <div key={mod.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    ACTIVE STATUS
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1">{mod.title}</h3>
                <p className="text-xs text-slate-400 mb-4">{mod.description}</p>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Question Pool:</span>
                    <span className="text-amber-400 font-bold">{questions.length} Questions</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>AR Scenario:</span>
                    <span className="text-emerald-400 font-bold">MindAR Active</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Passing Score:</span>
                    <span className="text-slate-200">≥70% Required</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate(`/ar-training/${mod.id}`)}
                  className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors"
                >
                  Test AR
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate(`/modules/${mod.id}`)}
                  className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-colors"
                >
                  View Briefing
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
