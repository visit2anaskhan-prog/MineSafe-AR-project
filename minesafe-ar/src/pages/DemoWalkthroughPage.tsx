import React from 'react';
import { 
  Sparkles, Camera, Award, CheckCircle2, ShieldCheck, 
  ArrowRight, Users, Eye, Bot, BarChart3, HelpCircle 
} from 'lucide-react';
import { UserProfile, Language } from '../types';

interface DemoWalkthroughPageProps {
  currentUser: UserProfile | null;
  lang: Language;
  onNavigate: (path: string) => void;
  onSwitchUser: (role: 'TRAINEE' | 'ADMIN') => void;
  onOpenMarkerModal: () => void;
}

export const DemoWalkthroughPage: React.FC<DemoWalkthroughPageProps> = ({
  currentUser,
  lang,
  onNavigate,
  onSwitchUser,
  onOpenMarkerModal
}) => {
  const isAdmin = currentUser?.role === 'ADMIN';

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 text-slate-100">
      {/* Top Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold mb-3">
          <Sparkles className="w-4 h-4" />
          <span>60-SECOND HACKATHON EVALUATION GUIDE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-mono font-black text-white uppercase">
          MineSafe AR Demo Walkthrough
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
          Follow this structured evaluation pathway to test the real camera AR simulation, Gemini 3.8 Flash AI coaching, tamper-proof state certification, and the DGMS director console.
        </p>
      </div>

      {/* Role Switcher Toolbar */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-mono text-slate-400 block uppercase">CURRENT EVALUATION PERSONA:</span>
          <strong className="text-sm text-amber-400">
            {currentUser?.name} ({isAdmin ? 'Director Console Role' : 'Underground Miner Trainee'})
          </strong>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onSwitchUser('TRAINEE')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              !isAdmin ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            👷 Switch to Trainee (Ramesh)
          </button>
          <button
            type="button"
            onClick={() => onSwitchUser('ADMIN')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              isAdmin ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            🛡️ Switch to Director (Er. Soren)
          </button>
        </div>
      </div>

      {/* Structured 6-Step Walkthrough Grid */}
      <div className="space-y-4">
        {/* Step 1 */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-mono font-bold flex items-center justify-center shrink-0">
              01
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">View or Print Training Target Marker</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Displays the high-contrast MindAR optical target. Point your phone or lock it on screen.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenMarkerModal}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Open Target Marker</span>
          </button>
        </div>

        {/* Step 2 */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-mono font-bold flex items-center justify-center shrink-0">
              02
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">Experience AR Simulator (PPE or Electrical)</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Launches browser camera or fallback 3D interactive simulator. Tap all red hazard markers to fix them into safe compliance.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/ar-training/ppe-safety')}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Launch PPE AR Scene</span>
          </button>
        </div>

        {/* Step 3 */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-mono font-bold flex items-center justify-center shrink-0">
              03
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">Take Assessment & Gemini AI Safety Coaching</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Answer bilingual questions. Gemini analyzes strengths, identifies weak topics, and speaks audible advice.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/assessment/ppe-safety')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Bot className="w-3.5 h-3.5 text-amber-400" />
            <span>Take Test Now</span>
          </button>
        </div>

        {/* Step 4 */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-mono font-bold flex items-center justify-center shrink-0">
              04
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">Print Official State Certificate & QR Verification</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Inspect the official credential with DGMS insignia, digital signatures, and public verification portal lookup.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/certificates/MSAR-2026-000001')}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Inspect Certificate</span>
          </button>
        </div>

        {/* Step 5 */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-mono font-bold flex items-center justify-center shrink-0">
              05
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">Director Console & AI Question Generator</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Inspect Recharts analytics, generate Gemini intelligence reports, and approve AI-drafted assessment questions.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              onSwitchUser('ADMIN');
              onNavigate('/admin/insights');
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
            <span>Director Console</span>
          </button>
        </div>
      </div>
    </div>
  );
};
