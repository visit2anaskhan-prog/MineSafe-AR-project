import React from 'react';
import { 
  HardHat, Zap, Flame, Award, CheckCircle2, AlertTriangle, 
  ArrowRight, Sparkles, BookOpen, Clock, BarChart3, Camera, ChevronRight
} from 'lucide-react';
import { UserProfile, SafetyModule, Progress, Language } from '../types';
import { storage } from '../data/storage';
import { t } from '../utils/translations';

interface TraineeDashboardProps {
  currentUser: UserProfile;
  lang: Language;
  onNavigate: (path: string) => void;
  onOpenMarkerModal: () => void;
}

export const TraineeDashboard: React.FC<TraineeDashboardProps> = ({
  currentUser,
  lang,
  onNavigate,
  onOpenMarkerModal
}) => {
  const modules = storage.getModules();
  const userProgress = storage.getUserProgress(currentUser.id);
  const attempts = storage.getAttempts(currentUser.id);
  const certificates = storage.getCertificates(currentUser.id);

  // Compute stats
  const completedCount = userProgress.filter(p => p.completed).length;
  const totalModules = modules.length;
  const overallPercent = Math.round((completedCount / totalModules) * 100);
  const avgScore = attempts.length > 0 
    ? Math.round(attempts.reduce((s, a) => s + a.score, 0) / attempts.length) 
    : 0;

  const getModuleProgress = (moduleId: string): Progress | undefined => {
    return userProgress.find(p => p.moduleId === moduleId);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-slate-100">
      {/* Top Greeting & Location Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-mono font-bold text-white">
              {t('welcomeBack', lang)}, {currentUser.name}
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold">
              ACTIVE TRAINEE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
            <span>Mine Unit: {currentUser.mineLocation || 'BCCL Dhanbad Seam 4'}</span>
            <span>•</span>
            <span>ID: {currentUser.id.toUpperCase()}</span>
          </p>
        </div>

        {/* Quick Marker Action */}
        <div className="flex items-center gap-2">
          <button
            id="btn-dash-marker"
            type="button"
            onClick={onOpenMarkerModal}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
          >
            <Camera className="w-4 h-4" />
            <span>{lang === 'hi' ? 'प्रशिक्षण मार्कर देखें' : 'Target Marker'}</span>
          </button>
          <button
            id="btn-dash-verify"
            type="button"
            onClick={() => onNavigate('/verify')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{t('navVerify', lang)}</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Overall Progress</span>
            <BarChart3 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-white">{overallPercent}%</span>
            <span className="text-xs text-slate-400 font-mono">({completedCount}/{totalModules} modules)</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${overallPercent}%` }} />
          </div>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Average Score</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-emerald-400">{avgScore}%</span>
            <span className="text-[10px] text-slate-400 font-mono">Passing: ≥70%</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Across {attempts.length} attempts</p>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Certificates</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-amber-400">{certificates.length}</span>
            <span className="text-xs text-slate-400">Verified</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">DGMS Certified</p>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Training Time</span>
            <Clock className="w-4 h-4 text-sky-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-sky-400">3.8h</span>
            <span className="text-xs text-slate-400">Logged</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Incline & Substation</p>
        </div>
      </div>

      {/* AI Safety Recommendation Banner */}
      <div className="p-5 bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/40 rounded-2xl my-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-amber-500/20 border border-amber-500/50 rounded-xl text-amber-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">
                {lang === 'hi' ? 'एआई सुरक्षा कोच अलर्ट' : 'AI Safety Coach Recommendation'}
              </h3>
              <span className="text-[9px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {lang === 'hi'
                ? 'आपका पीपीई सुरक्षा स्कोर 100% है, लेकिन इलेक्ट्रिकल लॉकआउट (LOTO) प्रक्रिया में 60% पर सुधार की आवश्यकता है। कृपया इलेक्ट्रिकल सुरक्षा सिमुलेशन को पुनः अभ्यास करें।'
                : 'High PPE proficiency (100%) confirmed. However, Lockout/Tagout (LOTO) protocols require remedial rehearsal before your next underground shift.'
              }
            </p>
          </div>
        </div>

        <button
          id="btn-dash-remedial"
          type="button"
          onClick={() => onNavigate('/ar-training/electrical-safety')}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl whitespace-nowrap shadow-md transition-colors shrink-0"
        >
          {lang === 'hi' ? 'अभ्यास शुरू करें' : 'Start Remedial LOTO'}
        </button>
      </div>

      {/* Training Modules Grid */}
      <div className="my-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-mono font-bold text-white">
              {t('trainingModules', lang)}
            </h2>
            <p className="text-xs text-slate-400">
              Complete the augmented reality interactive scenario and clear the 70% threshold assessment.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/modules')}
            className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
          >
            View All Syllabus <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((mod) => {
            const prog = getModuleProgress(mod.id);
            const isCompleted = prog?.completed;
            const score = prog?.bestScore || 0;

            const Icon = mod.id === 'ppe-safety' 
              ? HardHat 
              : mod.id === 'electrical-safety' 
              ? Zap 
              : Flame;

            return (
              <div 
                key={mod.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      isCompleted 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {isCompleted ? '✓ CERTIFIED' : 'PENDING'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white line-clamp-1">
                    {lang === 'hi' ? mod.titleHindi : mod.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {lang === 'hi' ? mod.descriptionHindi : mod.description}
                  </p>

                  <div className="my-4 space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Progress:</span>
                      <span className="text-amber-400 font-bold">{prog?.progressPercentage || 0}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 rounded-full transition-all" 
                        style={{ width: `${prog?.progressPercentage || 0}%` }} 
                      />
                    </div>
                    {score > 0 && (
                      <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-1">
                        <span>Best Score:</span>
                        <span className={`font-bold ${score >= 70 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {score}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex gap-2">
                  <button
                    id={`btn-start-ar-${mod.id}`}
                    type="button"
                    onClick={() => onNavigate(`/ar-training/${mod.id}`)}
                    className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{isCompleted ? 'Replay AR' : 'Start AR'}</span>
                  </button>
                  <button
                    id={`btn-briefing-${mod.id}`}
                    type="button"
                    onClick={() => onNavigate(`/modules/${mod.id}`)}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl border border-slate-700 transition-colors"
                    title="Read Syllabus & Audio Briefing"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Attempts History */}
      <div className="my-8">
        <h2 className="text-lg font-mono font-bold text-white mb-3">
          Recent Assessment Attempts
        </h2>
        {attempts.length === 0 ? (
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center text-slate-400 text-xs">
            No assessment attempts yet. Start an AR simulation above to take your first test!
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 font-mono uppercase border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Module</th>
                  <th className="p-3.5">Score</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Performance</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {attempts.slice(0, 5).map((att) => (
                  <tr key={att.id} className="hover:bg-slate-850 transition-colors">
                    <td className="p-3.5 font-medium text-slate-200">{att.moduleTitle}</td>
                    <td className="p-3.5 font-mono font-bold text-white">{att.score}%</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                        att.score >= 70 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}>
                        {att.score >= 70 ? 'PASSED' : 'FAILED'}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-300">{att.performanceLevel}</td>
                    <td className="p-3.5 text-slate-400">{att.completedAt.split('T')[0]}</td>
                    <td className="p-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => onNavigate(`/results/${att.id}`)}
                        className="text-amber-400 hover:underline font-semibold"
                      >
                        View Review →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
