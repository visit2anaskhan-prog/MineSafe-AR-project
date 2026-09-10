import React from 'react';
import { 
  ShieldCheck, HardHat, Camera, Cpu, Award, ArrowRight, 
  CheckCircle2, AlertTriangle, Eye, Sparkles, BookOpen, Flame, Zap, Compass, Users
} from 'lucide-react';
import { Language } from '../types';
import { t } from '../utils/translations';

interface LandingPageProps {
  lang: Language;
  onNavigate: (path: string) => void;
  onOpenMarkerModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  lang,
  onNavigate,
  onOpenMarkerModal
}) => {
  return (
    <div className="w-full bg-slate-950 text-slate-100 flex flex-col items-center">
      {/* 1. HERO SECTION */}
      <section className="relative w-full overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-slate-800">
        {/* Ambient Industrial Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Govt. of Jharkhand • Department of Higher & Technical Education • ID: 2604</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-mono font-black tracking-tight text-white max-w-4xl uppercase">
            MineSafe <span className="text-amber-400">AR</span>
          </h1>

          <p className="text-lg sm:text-2xl font-serif text-amber-200/90 font-medium italic mt-3">
            &ldquo;{t('tagline', lang)}&rdquo;
          </p>

          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mt-5 leading-relaxed">
            {t('heroSubtitle', lang)}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <button
              id="btn-hero-start-training"
              type="button"
              onClick={() => onNavigate('/dashboard')}
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm sm:text-base rounded-xl shadow-xl shadow-amber-500/25 flex items-center gap-2 transition-all transform active:scale-95"
            >
              <span>{t('startTraining', lang)}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="btn-hero-demo"
              type="button"
              onClick={() => onNavigate('/demo')}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm sm:text-base rounded-xl border border-slate-700 flex items-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t('experienceDemo', lang)}</span>
            </button>

            <button
              id="btn-hero-marker"
              type="button"
              onClick={onOpenMarkerModal}
              className="px-5 py-3.5 bg-slate-950 hover:bg-slate-900 text-slate-300 font-medium text-sm rounded-xl border border-amber-500/30 flex items-center gap-2 transition-colors"
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span>{lang === 'hi' ? 'प्रशिक्षण मार्कर' : 'View Target Marker'}</span>
            </button>
          </div>

          {/* Hero Visual Mockup: AR Interface Preview */}
          <div className="w-full max-w-4xl mt-14 p-3 bg-slate-900/90 border border-slate-700/80 rounded-2xl shadow-2xl relative">
            <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-col text-left space-y-2">
                <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider">
                  REAL-TIME AR VOCATIONAL SIMULATOR
                </span>
                <h3 className="text-xl font-bold text-white">
                  Coal Face Incline Entrance - Dhanbad Seam 4
                </h3>
                <p className="text-xs text-slate-400 max-w-md">
                  Interactive holographic hazard overlay. Trainees physically inspect and tap missing safety gear in augmented reality.
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Hard Hat Fitted</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono">
                    <AlertTriangle className="w-4 h-4" />
                    <span>1 Hazard Remaining</span>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-64 h-40 bg-slate-900 border border-amber-500/30 rounded-xl p-3 flex flex-col justify-between relative overflow-hidden">
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>CAMERA AR 60FPS</span>
                  <span className="text-emerald-400">TARGET LOCKED</span>
                </div>
                <div className="flex justify-center items-center my-auto">
                  <HardHat className="w-12 h-12 text-amber-400 animate-pulse" />
                </div>
                <div className="text-center text-[10px] bg-amber-500/20 text-amber-300 py-1 rounded font-mono font-bold">
                  UNSAFE → CORRECTED
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 4-STEP PROCESS (SCAN → SIMULATE → ASSESS → CERTIFY) */}
      <section className="w-full py-16 border-b border-slate-800 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl font-mono font-bold text-white uppercase mt-1">
              {t('howItWorksTitle', lang)}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl relative hover:border-amber-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-black text-lg mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-white mb-1">{t('stepScan', lang)}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{t('stepScanDesc', lang)}</p>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl relative hover:border-amber-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-black text-lg mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-white mb-1">{t('stepSimulate', lang)}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{t('stepSimulateDesc', lang)}</p>
            </div>

            {/* Step 3 */}
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl relative hover:border-amber-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-black text-lg mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-white mb-1">{t('stepAssess', lang)}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{t('stepAssessDesc', lang)}</p>
            </div>

            {/* Step 4 */}
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl relative hover:border-amber-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-black text-lg mb-4">
                04
              </div>
              <h3 className="text-base font-bold text-white mb-1">{t('stepCertify', lang)}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{t('stepCertifyDesc', lang)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM & SOLUTION CONTEXT (JHARKHAND SPECIFIC) */}
      <section className="w-full py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                THE INDUSTRIAL PROBLEM
              </span>
              <h2 className="text-2xl sm:text-3xl font-mono font-bold text-white mt-1">
                Vocational Safety Training Challenges in Jharkhand
              </h2>
              <div className="space-y-4 mt-6 text-sm text-slate-300">
                <div className="p-4 bg-slate-900 rounded-xl border border-rose-900/40 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-100 block">Static Classroom Manuals Have Poor Retention</strong>
                    <span className="text-slate-400 text-xs">
                      Over 70% of new young recruits in Dhanbad, Bokaro, and Singhbhum struggle with passive textbook training that fails to reproduce real underground mine hazards.
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-rose-900/40 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-100 block">High-End VR Headsets Are Inaccessible</strong>
                    <span className="text-slate-400 text-xs">
                      Imported VR hardware costs upwards of ₹1,50,000 per unit, making them impractical for small-scale contract mines and rural training institutes.
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-rose-900/40 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-100 block">Language & Linguistic Accessibility Barriers</strong>
                    <span className="text-slate-400 text-xs">
                      Tribal recruits are far more comfortable learning in Hindi and regional vernaculars, requiring bilingual safety voice synthesis and microcopy.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Solution */}
            <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/40 rounded-2xl shadow-2xl relative">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                THE MINESAFE AR SOLUTION
              </span>
              <h3 className="text-xl sm:text-2xl font-mono font-bold text-white mt-1">
                Smartphone-First Experiential Learning
              </h3>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                MineSafe AR turns any budget Android smartphone into a DGMS-compliant vocational training simulator with zero specialized hardware.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-amber-400 font-bold text-sm block">📱 Web-Based AR</span>
                  <span className="text-[11px] text-slate-400">Zero app install required; opens in any mobile browser</span>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-amber-400 font-bold text-sm block">🤖 Gemini Safety Coach</span>
                  <span className="text-[11px] text-slate-400">Personalized feedback analyzing weak safety areas</span>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-amber-400 font-bold text-sm block">🗣️ Hindi Voiceover</span>
                  <span className="text-[11px] text-slate-400">Integrated Web Speech API for audible safety instructions</span>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-amber-400 font-bold text-sm block">🔒 QR Verifiable</span>
                  <span className="text-[11px] text-slate-400">Instant employer and gate-pass verification</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THREE CORE TRAINING MODULES SHOWCASE */}
      <section className="w-full py-16 border-b border-slate-800 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              CURRICULUM
            </span>
            <h2 className="text-3xl font-mono font-bold text-white uppercase mt-1">
              Industrial Safety Training Modules
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Aligned with Directorate General of Mines Safety (DGMS) technical circulars and the Indian Mines Act.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Module 1 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all flex flex-col justify-between">
              <div className="p-6">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-4">
                  <HardHat className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded uppercase">
                  Module 01 • PPE & Gear
                </span>
                <h3 className="text-lg font-bold text-white mt-2">
                  Personal Protective Equipment in Mines
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Interactive AR inspection of miners entering underground seams. Identify missing hard hats, casual footwear, and missing eye shields.
                </p>
              </div>
              <div className="p-6 pt-0">
                <button
                  id="btn-mod-card-ppe"
                  type="button"
                  onClick={() => onNavigate('/ar-training/ppe-safety')}
                  className="w-full py-2.5 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>Launch AR Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Module 2 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all flex flex-col justify-between">
              <div className="p-6">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded uppercase">
                  Module 02 • High Voltage
                </span>
                <h3 className="text-lg font-bold text-white mt-2">
                  Electrical Safety & Lockout/Tagout (LOTO)
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Simulate 415V switchgear panels. Detect chafed cables, standing sump puddles, and execute zero-energy padlock isolation.
                </p>
              </div>
              <div className="p-6 pt-0">
                <button
                  id="btn-mod-card-elec"
                  type="button"
                  onClick={() => onNavigate('/ar-training/electrical-safety')}
                  className="w-full py-2.5 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>Launch AR Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Module 3 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all flex flex-col justify-between">
              <div className="p-6">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-4">
                  <Flame className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded uppercase">
                  Module 03 • Emergency
                </span>
                <h3 className="text-lg font-bold text-white mt-2">
                  Fire Safety & Mine Emergency Evacuation
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Conveyor friction fires and toxic gas management. Master break-glass alarms, escape path clearing, and PASS extinguisher deployment.
                </p>
              </div>
              <div className="p-6 pt-0">
                <button
                  id="btn-mod-card-fire"
                  type="button"
                  onClick={() => onNavigate('/ar-training/fire-emergency')}
                  className="w-full py-2.5 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>Launch AR Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. IMPACT & HACKATHON METRICS SECTION */}
      <section className="w-full py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            STATEWIDE IMPACT SIMULATION
          </span>
          <h2 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase mt-1">
            Empowering Jharkhand’s Mining Workforce
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            *Prototype demonstration data based on Dhanbad & Bokaro vocational pilot cohort.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
              <span className="text-3xl sm:text-4xl font-mono font-black text-amber-400">12,400+</span>
              <span className="text-xs text-slate-400 font-medium block mt-1">Workers In Pilot Roster</span>
            </div>
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
              <span className="text-3xl sm:text-4xl font-mono font-black text-emerald-400">94.2%</span>
              <span className="text-xs text-slate-400 font-medium block mt-1">Safety Retention Rate</span>
            </div>
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
              <span className="text-3xl sm:text-4xl font-mono font-black text-amber-400">₹0</span>
              <span className="text-xs text-slate-400 font-medium block mt-1">Costly VR Hardware</span>
            </div>
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
              <span className="text-3xl sm:text-4xl font-mono font-black text-sky-400">100%</span>
              <span className="text-xs text-slate-400 font-medium block mt-1">Verifiable Credentials</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="w-full py-16 bg-gradient-to-b from-slate-950 to-slate-900 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ShieldCheck className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-mono font-bold text-white uppercase">
            Ready to Experience MineSafe AR?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mt-3">
            Enter the interactive judge walkthrough to inspect the AR simulator, take the assessment, receive Gemini AI coaching, and generate a verified state credential.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <button
              id="btn-cta-demo"
              type="button"
              onClick={() => onNavigate('/demo')}
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm sm:text-base rounded-xl shadow-xl shadow-amber-500/25 transition-transform active:scale-95"
            >
              Launch Hackathon Demo Walkthrough →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
