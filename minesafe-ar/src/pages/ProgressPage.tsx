import React from 'react';
import { BarChart3, Award, CheckCircle2, Clock, RotateCcw } from 'lucide-react';
import { UserProfile, Language } from '../types';
import { storage } from '../data/storage';

interface ProgressPageProps {
  currentUser: UserProfile;
  lang: Language;
  onNavigate: (path: string) => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({
  currentUser,
  lang,
  onNavigate
}) => {
  const modules = storage.getModules();
  const userProgress = storage.getUserProgress(currentUser.id);
  const attempts = storage.getAttempts(currentUser.id);
  const certificates = storage.getCertificates(currentUser.id);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 text-slate-100">
      <div className="pb-6 border-b border-slate-800 mb-8">
        <h1 className="text-2xl font-mono font-bold text-white">
          Trainee Progress & Competency Log
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Historical record of AR simulations, assessment attempts, and earned state credentials
        </p>
      </div>

      {/* Module Mastery Progression Cards */}
      <h2 className="text-sm font-mono font-bold uppercase text-amber-400 tracking-wider mb-4">
        Curriculum Module Mastery
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {modules.map((mod) => {
          const prog = userProgress.find(p => p.moduleId === mod.id);
          const isDone = prog?.completed;
          return (
            <div key={mod.id} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-bold text-white">{mod.title}</h3>
                <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                  isDone ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {isDone ? '✓ MASTERED' : 'IN PROGRESS'}
                </span>
              </div>

              <div className="my-3 space-y-1">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>Completion:</span>
                  <span className="text-amber-400 font-bold">{prog?.progressPercentage || 0}%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-amber-500 rounded-full" 
                    style={{ width: `${prog?.progressPercentage || 0}%` }} 
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between text-xs font-mono text-slate-400">
                <span>Best Score:</span>
                <span className="font-bold text-white">{prog?.bestScore || 0}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Complete Historical Attempts Table */}
      <h2 className="text-sm font-mono font-bold uppercase text-slate-300 tracking-wider mb-4">
        Assessment Submissions Log ({attempts.length} Total)
      </h2>
      {attempts.length === 0 ? (
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center text-xs text-slate-400">
          No attempts logged yet. Complete an AR simulation and assessment to start logging progress.
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-mono uppercase border-b border-slate-800">
              <tr>
                <th className="p-3.5">Module</th>
                <th className="p-3.5">Score</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Performance</th>
                <th className="p-3.5">Time Taken</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {attempts.map((att) => (
                <tr key={att.id} className="hover:bg-slate-850 transition-colors">
                  <td className="p-3.5 font-medium text-slate-200">{att.moduleTitle}</td>
                  <td className="p-3.5 font-mono font-bold text-white">{att.score}%</td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                      att.score >= 70 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {att.score >= 70 ? 'PASSED' : 'FAILED'}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-300">{att.performanceLevel}</td>
                  <td className="p-3.5 text-slate-400 font-mono">{att.timeTakenSeconds ?? att.timeTaken ?? 0}s</td>
                  <td className="p-3.5 text-slate-400 font-mono">{att.completedAt.split('T')[0]}</td>
                  <td className="p-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => onNavigate(`/results/${att.id}`)}
                      className="text-amber-400 hover:underline font-semibold"
                    >
                      Inspect →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
