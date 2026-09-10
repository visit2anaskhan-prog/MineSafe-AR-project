import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, XCircle, Award, ArrowRight, RotateCcw, 
  ExternalLink, Clock, ShieldCheck, HelpCircle, ChevronDown, ChevronUp
} from 'lucide-react';
import { Attempt, AIFeedback, Language } from '../types';
import { storage } from '../data/storage';
import { AICoachCard } from '../components/AICoachCard';
import { t } from '../utils/translations';

interface ResultsPageProps {
  attemptId: string;
  lang: Language;
  onNavigate: (path: string) => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  attemptId,
  lang,
  onNavigate
}) => {
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [aiFeedback, setAIFeedback] = useState<AIFeedback | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [showAnswerReview, setShowAnswerReview] = useState(false);

  useEffect(() => {
    const found = storage.getAttempts().find(a => a.id === attemptId);
    if (found) {
      setAttempt(found);

      // Trigger confetti if passed!
      if (found.score >= 70) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // confetti optional
        }
      }

      // Check stored AI feedback
      const fb = storage.getAIFeedback(attemptId);
      if (fb) {
        setAIFeedback(fb);
      } else {
        // Fetch or wait
        setLoadingAI(true);
        setTimeout(() => {
          const recheck = storage.getAIFeedback(attemptId);
          if (recheck) {
            setAIFeedback(recheck);
          } else {
            // Generate fallback feedback if not already done
            const isPass = found.score >= 70;
            const fallback: AIFeedback = {
              id: `fb_${Date.now()}`,
              attemptId,
              userId: found.userId,
              moduleId: found.moduleId,
              feedback: isPass
                ? `Excellent performance, ${found.userName}! You demonstrated solid grasp of ${found.moduleTitle} protocols, surpassing the 70% threshold.`
                : `Assessment recorded at ${found.score}%. Further revision of emergency safety rules is required before site clearance.`,
              weakTopics: found.score < 100 ? ['Standard Operating Procedures (SOP)'] : [],
              recommendation: isPass
                ? 'Proceed to your next recommended vocational safety simulation.'
                : 'Revisit the AR simulation scenario and inspect all red hazard markers carefully.',
              nextRecommendedModule: found.moduleId === 'ppe-safety' ? 'electrical-safety' : 'fire-emergency',
              revisionPoints: [
                'Verify all protective gear meets certified BIS/IS standards before shift start.',
                'Never bypass energy isolation locks or touch unverified electrical conduits.',
                'Keep designated escape passageways completely unobstructed.'
              ],
              generatedAt: new Date().toISOString()
            };
            storage.saveAIFeedback(fallback);
            setAIFeedback(fallback);
          }
          setLoadingAI(false);
        }, 1200);
      }
    }
  }, [attemptId]);

  if (!attempt) {
    return (
      <div className="w-full max-w-2xl mx-auto py-16 text-center text-slate-400">
        <p>Attempt record not found.</p>
        <button
          type="button"
          onClick={() => onNavigate('/dashboard')}
          className="mt-4 px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const isPass = attempt.score >= 70;
  const questions = storage.getQuestions(attempt.moduleId);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 text-slate-100">
      {/* Top Banner Card */}
      <div className={`p-6 sm:p-8 rounded-2xl border mb-6 shadow-2xl relative overflow-hidden ${
        isPass 
          ? 'bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-900 border-emerald-500/40' 
          : 'bg-gradient-to-br from-rose-950/70 via-slate-900 to-slate-900 border-rose-500/40'
      }`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center sm:text-left">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center font-mono font-black text-3xl border-2 shrink-0 ${
              isPass 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)]' 
                : 'bg-rose-500/20 text-rose-300 border-rose-400'
            }`}>
              {attempt.score}%
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                  isPass ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}>
                  {isPass ? '★ VOCATIONAL PASS (≥70%)' : '⚠ RETEST REQUIRED (<70%)'}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Level: {attempt.performanceLevel}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-mono font-bold text-white mt-1">
                {attempt.moduleTitle}
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                Trainee: <strong>{attempt.userName}</strong> • {attempt.correctAnswers} of {attempt.totalQuestions} questions correct • Time: {attempt.timeTakenSeconds}s
              </p>
            </div>
          </div>

          {/* If Pass: Certificate Action */}
          <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
            {isPass && attempt.certificateId && (
              <button
                id="btn-view-certificate"
                type="button"
                onClick={() => onNavigate(`/certificates/${attempt.certificateId}`)}
                className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-95"
              >
                <Award className="w-4 h-4" />
                <span>View Official Certificate →</span>
              </button>
            )}

            <button
              id="btn-retry-assessment"
              type="button"
              onClick={() => onNavigate(`/ar-training/${attempt.moduleId}`)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Replay AR Simulation</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Safety Coach Section */}
      <div className="my-6">
        <AICoachCard
          feedback={aiFeedback}
          loading={loadingAI}
          lang={lang}
          onSelectNextModule={(nextMod) => onNavigate(`/modules/${nextMod}`)}
        />
      </div>

      {/* Answer Breakdown Accordion */}
      <div className="my-6 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <button
          type="button"
          onClick={() => setShowAnswerReview(!showAnswerReview)}
          className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-850 transition-colors"
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase font-mono tracking-wider text-slate-200">
              Review Question Answers ({attempt.correctAnswers}/{attempt.totalQuestions} Correct)
            </span>
          </div>
          {showAnswerReview ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {showAnswerReview && (
          <div className="p-4 pt-0 space-y-3 border-t border-slate-800 divide-y divide-slate-800">
            {attempt.userAnswers.map((ua, i) => {
              const q = questions.find(item => item.id === ua.questionId) || questions[i];
              if (!q) return null;
              return (
                <div key={i} className="pt-3">
                  <div className="flex items-start gap-2">
                    {ua.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-xs font-medium text-slate-100">
                        {i + 1}. {q.question}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Your answer: <span className={ua.isCorrect ? 'text-emerald-300 font-semibold' : 'text-rose-300 font-semibold'}>
                          {q.options[ua.selectedOption] || 'None'}
                        </span>
                      </p>
                      {!ua.isCorrect && (
                        <p className="text-[11px] text-emerald-400 mt-0.5">
                          Correct: <strong>{q.options[q.correctAnswer]}</strong>
                        </p>
                      )}
                      <p className="text-[10px] text-slate-400 italic mt-1 bg-slate-950 p-2 rounded">
                        Regulation rule: {q.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="pt-4 flex justify-between">
        <button
          type="button"
          onClick={() => onNavigate('/dashboard')}
          className="text-xs text-slate-400 hover:text-amber-400 font-medium"
        >
          ← Back to Dashboard
        </button>
        <button
          type="button"
          onClick={() => onNavigate('/certificates')}
          className="text-xs text-amber-400 hover:underline font-semibold"
        >
          My Certificates →
        </button>
      </div>
    </div>
  );
};
