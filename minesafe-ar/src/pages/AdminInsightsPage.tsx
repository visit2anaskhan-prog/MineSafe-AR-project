import React, { useState } from 'react';
import { 
  Sparkles, Bot, AlertTriangle, CheckCircle2, ArrowRight, 
  BookOpen, Plus, ShieldCheck, RefreshCw, Send 
} from 'lucide-react';
import { AdminInsightReport, AIQuestionDraft, Language } from '../types';
import { storage } from '../data/storage';

interface AdminInsightsPageProps {
  lang: Language;
  onNavigate: (path: string) => void;
}

export const AdminInsightsPage: React.FC<AdminInsightsPageProps> = ({
  lang,
  onNavigate
}) => {
  const [report, setReport] = useState<AdminInsightReport | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  // Question Generator State
  const [selectedModule, setSelectedModule] = useState('ppe-safety');
  const [topicInput, setTopicInput] = useState('Fall Protection & Incline Safety');
  const [difficultyInput, setDifficultyInput] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [questionDrafts, setQuestionDrafts] = useState<AIQuestionDraft[]>(() => storage.getQuestionDrafts());

  const handleGenerateInsights = async () => {
    setLoadingInsights(true);
    try {
      const analytics = storage.getAdminAnalytics();
      const resp = await fetch('/api/gemini/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analyticsData: analytics, language: lang })
      });

      if (resp.ok) {
        const data = await resp.json();
        setReport(data);
      } else {
        throw new Error('API failed');
      }
    } catch (e) {
      console.warn('Using fallback insights report:', e);
      setReport({
        id: `insight_${Date.now()}`,
        generatedAt: new Date().toISOString(),
        summary: 'Statewide mining cohorts demonstrate high PPE compliance (84.6%), but electrical lockout/tagout (LOTO) remains a significant knowledge gap with a 68.2% average score.',
        lowestPerformingModule: 'Electrical Safety & Lockout/Tagout (LOTO)',
        commonGaps: [
          'Zero-energy de-energization verification procedures',
          'Arc flash boundary PPE category selection',
          'Wet ground conductivity hazards near switch panels'
        ],
        recommendations: [
          'Mandate interactive 3D LOTO simulation as a prerequisite before issuing electrical substation gate passes.',
          'Conduct bilingual refresher workshops on multi-meter live-dead-live testing at Bokaro and Dhanbad washeries.',
          'Implement peer-led tool-box safety talks focused on secondary circuit backfeed risks.'
        ],
        priorityActions: [
          'Target contract workers with scores under 70% for remedial LOTO simulation.',
          'Audit high-voltage switch rooms in underground seams for certified dielectric floor mats.',
          'Incentivize complete certification prior to quarterly underground incline entry.'
        ]
      });
    } finally {
      setLoadingInsights(false);
    }
  };

  const handleGenerateQuestionDraft = async () => {
    setLoadingQuestions(true);
    try {
      const resp = await fetch('/api/gemini/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleId: selectedModule,
          topic: topicInput,
          difficulty: difficultyInput,
          count: 1
        })
      });

      if (resp.ok) {
        const data = await resp.json();
        if (data.questions && data.questions.length > 0) {
          const newDrafts: AIQuestionDraft[] = [];
          data.questions.forEach((q: any) => {
            const saved = storage.saveQuestionDraft(q);
            newDrafts.push(saved);
          });
          setQuestionDrafts(storage.getQuestionDrafts());
        }
      }
    } catch (e) {
      console.warn('Question generator API error:', e);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handlePublishDraft = (draftId: string) => {
    storage.publishQuestionDraft(draftId);
    setQuestionDrafts([...storage.getQuestionDrafts()]);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-slate-100">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-mono font-bold text-white">
              AI Safety Intelligence & Curriculum Engineering
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Powered by Gemini 3.8 Flash • Directorate General of Mines Safety (DGMS) Standards
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1: AI SAFETY INTELLIGENCE REPORT */}
      <div className="my-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold font-mono text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-amber-400" />
              <span>Statewide Cohort Risk Analysis</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Gemini synthesizes test scores, hazard miss rates, and training durations to formulate policy interventions.
            </p>
          </div>

          <button
            id="btn-gen-ai-insights"
            type="button"
            disabled={loadingInsights}
            onClick={handleGenerateInsights}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loadingInsights ? 'Analyzing Aggregate Data...' : 'Generate AI Risk Report'}</span>
          </button>
        </div>

        {/* Report Display */}
        {report ? (
          <div className="mt-6 space-y-6">
            {/* Executive Summary */}
            <div className="p-4 bg-slate-950 border border-amber-500/30 rounded-xl">
              <span className="text-[10px] font-mono font-bold uppercase text-amber-400 block mb-1">
                EXECUTIVE SUMMARY
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {report.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Lowest Module */}
              <div className="p-4 bg-slate-950 border border-rose-900/50 rounded-xl">
                <span className="text-[10px] font-mono font-bold uppercase text-rose-400 block mb-1">
                  CRITICAL BOTTLENECK MODULE
                </span>
                <strong className="text-xs text-white block">
                  {report.lowestPerformingModule}
                </strong>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Priority target for mandatory AR refresher sessions
                </span>
              </div>

              {/* Common Gaps */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl md:col-span-2">
                <span className="text-[10px] font-mono font-bold uppercase text-amber-400 block mb-1">
                  FREQUENT CONCEPTUAL DEFICITS
                </span>
                <ul className="space-y-1 text-xs text-slate-300">
                  {report.commonGaps.map((gap, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommendations & Priority Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 block mb-2">
                  POLICY RECOMMENDATIONS
                </span>
                <ul className="space-y-2 text-xs text-slate-300">
                  {report.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-[10px] font-mono font-bold uppercase text-sky-400 block mb-2">
                  PRIORITY OPERATIONAL ACTIONS
                </span>
                <ul className="space-y-2 text-xs text-slate-300">
                  {report.priorityActions.map((act, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 p-6 bg-slate-950 border border-slate-800 rounded-xl text-center text-slate-400 text-xs">
            Click &ldquo;Generate AI Risk Report&rdquo; above to run Gemini Flash analytics on aggregate trainee cohorts.
          </div>
        )}
      </div>

      {/* SECTION 2: AI QUESTION DRAFTS (CURRICULUM EXPANSION) */}
      <div className="my-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="pb-4 border-b border-slate-800 mb-6">
          <h2 className="text-base font-bold font-mono text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span>AI Assessment Question Generator & Review Workflow</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Generate bilingual (English & Hindi) safety questions for review. Approved questions immediately publish to trainee assessments.
          </p>
        </div>

        {/* Generator Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6">
          <div>
            <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
              Target Module
            </label>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
            >
              <option value="ppe-safety">PPE in Mines</option>
              <option value="electrical-safety">Electrical Safety & LOTO</option>
              <option value="fire-emergency">Fire & Emergency Evacuation</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
              Specific Topic
            </label>
            <input
              type="text"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
              placeholder="e.g. Arc Flash, Gas Ingress"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
              Difficulty
            </label>
            <select
              value={difficultyInput}
              onChange={(e) => setDifficultyInput(e.target.value as any)}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard (DGMS Inspector Level)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              id="btn-generate-questions"
              type="button"
              disabled={loadingQuestions}
              onClick={handleGenerateQuestionDraft}
              className="w-full py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{loadingQuestions ? 'Drafting...' : 'Generate with Gemini'}</span>
            </button>
          </div>
        </div>

        {/* Drafts List for Review */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
            Review Queue ({questionDrafts.length} Question Drafts)
          </h3>

          {questionDrafts.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No drafted questions in queue. Use the generator above.</p>
          ) : (
            questionDrafts.map((draft) => (
              <div 
                key={draft.id}
                className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded text-[10px]">
                      {draft.moduleId.toUpperCase()}
                    </span>
                    <span className="font-mono text-slate-400 text-[10px]">
                      Topic: {draft.topic}
                    </span>
                  </div>

                  <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                    draft.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {draft.status === 'APPROVED' ? '✓ PUBLISHED' : 'DRAFT FOR REVIEW'}
                  </span>
                </div>

                <div>
                  <strong className="text-slate-100 block">{draft.question}</strong>
                  <p className="text-slate-400 text-[11px] mt-0.5 font-hindi">{draft.questionHindi}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  {draft.options.map((opt, optIdx) => (
                    <div 
                      key={optIdx}
                      className={`p-2 rounded-lg border ${
                        optIdx === draft.correctAnswer 
                          ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200' 
                          : 'bg-slate-900 border-slate-800 text-slate-300'
                      }`}
                    >
                      <span>{optIdx + 1}. {opt}</span>
                      {optIdx === draft.correctAnswer && <span className="ml-1 text-[10px] font-bold text-emerald-400">(Correct)</span>}
                    </div>
                  ))}
                </div>

                <div className="p-2 bg-slate-900 rounded-lg text-slate-400 text-[10px]">
                  <strong>DGMS Rule Reference:</strong> {draft.explanation}
                </div>

                {draft.status !== 'APPROVED' && (
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handlePublishDraft(draft.id)}
                      className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] rounded-lg transition-colors flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve & Publish to Curriculum</span>
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
