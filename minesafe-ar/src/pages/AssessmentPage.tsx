import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, AlertCircle, Clock, ArrowRight, ArrowLeft, 
  HelpCircle, ShieldCheck, Award, Sparkles 
} from 'lucide-react';
import { SafetyModule, Question, UserProfile, Language } from '../types';
import { storage } from '../data/storage';
import { VoiceButton } from '../components/VoiceButton';

interface AssessmentPageProps {
  module: SafetyModule;
  currentUser: UserProfile;
  lang: Language;
  onNavigate: (path: string) => void;
}

export const AssessmentPage: React.FC<AssessmentPageProps> = ({
  module,
  currentUser,
  lang,
  onNavigate
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [startTime] = useState(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load questions for module
  useEffect(() => {
    const raw = storage.getQuestions(module.id);
    // If not enough questions, fallback to all published
    const list = raw.length > 0 ? raw : storage.getQuestions();
    setQuestions(list);
  }, [module.id]);

  // Timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    if (isSubmitting || questions.length === 0) return;
    setIsSubmitting(true);

    let correctCount = 0;
    const missed: { question: string; topic: string }[] = [];

    questions.forEach((q, idx) => {
      const selected = selectedAnswers[idx];
      if (selected === q.correctAnswer) {
        correctCount++;
      } else {
        missed.push({
          question: q.question,
          topic: q.topic
        });
      }
    });

    const scorePercentage = Math.round((correctCount / questions.length) * 100);

    let performanceLevel: 'DISTINCTION' | 'COMPETENT' | 'NEEDS_TRAINING' = 'NEEDS_TRAINING';
    if (scorePercentage >= 90) performanceLevel = 'DISTINCTION';
    else if (scorePercentage >= 70) performanceLevel = 'COMPETENT';

    // Save attempt in storage
    const { attempt, certificate } = storage.saveAttempt({
      userId: currentUser.id,
      userName: currentUser.name,
      moduleId: module.id,
      moduleTitle: module.title,
      score: scorePercentage,
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      timeTakenSeconds: elapsedSeconds,
      performanceLevel,
      completedAt: new Date().toISOString(),
      userAnswers: questions.map((q, idx) => ({
        questionId: q.id,
        selectedOption: selectedAnswers[idx] ?? -1,
        isCorrect: selectedAnswers[idx] === q.correctAnswer
      }))
    });

    // Request AI feedback in background (or fallback)
    try {
      const resp = await fetch('/api/gemini/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: currentUser.name,
          moduleId: module.id,
          moduleTitle: module.title,
          score: scorePercentage,
          correctAnswers: correctCount,
          totalQuestions: questions.length,
          timeTaken: elapsedSeconds,
          missedQuestions: missed,
          language: lang
        })
      });

      if (resp.ok) {
        const feedbackData = await resp.json();
        storage.saveAIFeedback({
          id: `fb_${Date.now()}`,
          attemptId: attempt.id,
          userId: currentUser.id,
          moduleId: module.id,
          feedback: feedbackData.feedback,
          weakTopics: feedbackData.weakTopics,
          recommendation: feedbackData.recommendation,
          nextRecommendedModule: feedbackData.nextRecommendedModule,
          revisionPoints: feedbackData.revisionPoints,
          generatedAt: new Date().toISOString()
        });
      }
    } catch (e) {
      console.warn('AI feedback API call error (fallback will activate):', e);
    }

    setIsSubmitting(false);
    onNavigate(`/results/${attempt.id}`);
  };

  if (!currentQ) {
    return (
      <div className="w-full max-w-2xl mx-auto py-16 text-center text-slate-400">
        <Clock className="w-8 h-8 mx-auto animate-spin text-amber-400 mb-2" />
        <p>Loading assessment questions...</p>
      </div>
    );
  }

  const answeredCount = Object.keys(selectedAnswers).length;
  const isAllAnswered = answeredCount >= questions.length;

  const qText = lang === 'hi' && currentQ.questionHindi ? currentQ.questionHindi : currentQ.question;
  const options = lang === 'hi' && currentQ.optionsHindi ? currentQ.optionsHindi : currentQ.options;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 text-slate-100">
      {/* Top Header: Module & Timer Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase text-amber-400">
            COMPETENCY ASSESSMENT • PASS: 70%+
          </span>
          <h1 className="text-lg font-bold text-white">
            {lang === 'hi' ? module.titleHindi : module.title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-amber-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTimer(elapsedSeconds)}</span>
          </div>
          <VoiceButton 
            text={qText}
            lang={lang}
            label={lang === 'hi' ? 'प्रश्न सुनें' : 'Listen'}
          />
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="my-6">
        <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{answeredCount} of {questions.length} answered</span>
        </div>
        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div 
            className="h-full bg-amber-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
            Topic: {currentQ.topic}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
            {currentQ.difficulty}
          </span>
        </div>

        <h2 className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed mb-6">
          {qText}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {options.map((opt, optIdx) => {
            const isSelected = selectedAnswers[currentIndex] === optIdx;
            const letters = ['A', 'B', 'C', 'D'];
            return (
              <button
                key={optIdx}
                id={`btn-option-${currentIndex}-${optIdx}`}
                type="button"
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-400 text-white shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                }`}
              >
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 ${
                  isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {letters[optIdx]}
                </span>
                <span className="text-sm leading-relaxed">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation & Submit Controls */}
        <div className="flex items-center justify-between pt-8 mt-6 border-t border-slate-800">
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              id="btn-next-question"
              type="button"
              onClick={() => setCurrentIndex(currentIndex + 1)}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="btn-submit-assessment"
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSubmitting ? 'Evaluating with Gemini...' : 'Submit Assessment'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
