import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TrainingMarkerModal } from './components/TrainingMarkerModal';
import { LandingPage } from './pages/LandingPage';
import { TraineeDashboard } from './pages/TraineeDashboard';
import { ModulesCatalogPage } from './pages/ModulesCatalogPage';
import { ModuleBriefingPage } from './pages/ModuleBriefingPage';
import { ARTrainingPage } from './pages/ARTrainingPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { ResultsPage } from './pages/ResultsPage';
import { ProgressPage } from './pages/ProgressPage';
import { CertificatesGalleryPage } from './pages/CertificatesGalleryPage';
import { CertificateDetailPage } from './pages/CertificateDetailPage';
import { CertificateVerifyPage } from './pages/CertificateVerifyPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminTraineesPage } from './pages/AdminTraineesPage';
import { AdminModulesPage } from './pages/AdminModulesPage';
import { AdminInsightsPage } from './pages/AdminInsightsPage';
import { DemoWalkthroughPage } from './pages/DemoWalkthroughPage';
import { storage } from './data/storage';
import { UserProfile, Language } from './types';
import { ShieldCheck, HardHat, ExternalLink, Award } from 'lucide-react';

export function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => storage.getCurrentUser());
  const [lang, setLang] = useState<Language>(() => storage.getLanguage());
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });
  const [markerModalOpen, setMarkerModalOpen] = useState(false);

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    storage.setLanguage(newLang);
  };

  const handleSwitchUser = (role: 'TRAINEE' | 'ADMIN') => {
    const switched = storage.switchDemoUser(role);
    setCurrentUser(switched);
  };

  // Route parsing
  const renderRoute = () => {
    // 1. Landing Page
    if (currentPath === '/' || currentPath === '') {
      return (
        <LandingPage
          lang={lang}
          onNavigate={navigate}
          onOpenMarkerModal={() => setMarkerModalOpen(true)}
        />
      );
    }

    // 2. Demo Walkthrough
    if (currentPath === '/demo') {
      return (
        <DemoWalkthroughPage
          currentUser={currentUser}
          lang={lang}
          onNavigate={navigate}
          onSwitchUser={handleSwitchUser}
          onOpenMarkerModal={() => setMarkerModalOpen(true)}
        />
      );
    }

    // 3. Trainee Dashboard
    if (currentPath === '/dashboard') {
      return (
        <TraineeDashboard
          currentUser={currentUser || storage.switchDemoUser('TRAINEE')}
          lang={lang}
          onNavigate={navigate}
          onOpenMarkerModal={() => setMarkerModalOpen(true)}
        />
      );
    }

    // 4. Modules Catalog
    if (currentPath === '/modules') {
      return (
        <ModulesCatalogPage
          lang={lang}
          onNavigate={navigate}
          onOpenMarkerModal={() => setMarkerModalOpen(true)}
        />
      );
    }

    // 5. Module Briefing: /modules/:moduleId
    if (currentPath.startsWith('/modules/')) {
      const modId = currentPath.split('/')[2];
      const mod = storage.getModuleById(modId) || storage.getModules()[0];
      return (
        <ModuleBriefingPage
          module={mod}
          lang={lang}
          onNavigate={navigate}
          onOpenMarkerModal={() => setMarkerModalOpen(true)}
        />
      );
    }

    // 6. AR Vocational Simulator: /ar-training/:moduleId
    if (currentPath.startsWith('/ar-training/')) {
      const modId = currentPath.split('/')[2];
      const mod = storage.getModuleById(modId) || storage.getModules()[0];
      return (
        <ARTrainingPage
          module={mod}
          lang={lang}
          onNavigate={navigate}
          onOpenMarkerModal={() => setMarkerModalOpen(true)}
        />
      );
    }

    // 7. Assessment: /assessment/:moduleId
    if (currentPath.startsWith('/assessment/')) {
      const modId = currentPath.split('/')[2];
      const mod = storage.getModuleById(modId) || storage.getModules()[0];
      return (
        <AssessmentPage
          module={mod}
          currentUser={currentUser || storage.switchDemoUser('TRAINEE')}
          lang={lang}
          onNavigate={navigate}
        />
      );
    }

    // 8. Results: /results/:attemptId
    if (currentPath.startsWith('/results/')) {
      const attemptId = currentPath.split('/')[2];
      return (
        <ResultsPage
          attemptId={attemptId}
          lang={lang}
          onNavigate={navigate}
        />
      );
    }

    // 9. Trainee Progress Log
    if (currentPath === '/progress') {
      return (
        <ProgressPage
          currentUser={currentUser || storage.switchDemoUser('TRAINEE')}
          lang={lang}
          onNavigate={navigate}
        />
      );
    }

    // 10. Certificates Gallery: /certificates
    if (currentPath === '/certificates') {
      return (
        <CertificatesGalleryPage
          currentUser={currentUser || storage.switchDemoUser('TRAINEE')}
          lang={lang}
          onNavigate={navigate}
        />
      );
    }

    // 11. Certificate Detail: /certificates/:certificateId
    if (currentPath.startsWith('/certificates/')) {
      const certId = currentPath.split('/')[2];
      return (
        <CertificateDetailPage
          certificateId={certId}
          lang={lang}
          onNavigate={navigate}
        />
      );
    }

    // 12. Public Certificate Verification: /verify or /verify/:certificateId
    if (currentPath.startsWith('/verify')) {
      const parts = currentPath.split('/');
      const initCert = parts.length > 2 ? parts[2] : undefined;
      return (
        <CertificateVerifyPage
          initialCertId={initCert}
          lang={lang}
          onNavigate={navigate}
        />
      );
    }

    // 13. Admin Console: /admin
    if (currentPath === '/admin') {
      return (
        <AdminDashboard
          lang={lang}
          onNavigate={navigate}
        />
      );
    }

    // 14. Admin Trainees: /admin/trainees
    if (currentPath === '/admin/trainees') {
      return (
        <AdminTraineesPage
          lang={lang}
          onNavigate={navigate}
        />
      );
    }

    // 15. Admin Modules: /admin/modules
    if (currentPath === '/admin/modules') {
      return (
        <AdminModulesPage
          lang={lang}
          onNavigate={navigate}
        />
      );
    }

    // 16. Admin AI Insights & Questions: /admin/insights
    if (currentPath === '/admin/insights') {
      return (
        <AdminInsightsPage
          lang={lang}
          onNavigate={navigate}
        />
      );
    }

    // Fallback: Default to Landing
    return (
      <LandingPage
        lang={lang}
        onNavigate={navigate}
        onOpenMarkerModal={() => setMarkerModalOpen(true)}
      />
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Navigation Header */}
      <Navbar
        currentUser={currentUser}
        lang={lang}
        onLanguageChange={handleLanguageChange}
        activePath={currentPath}
        onNavigate={navigate}
        onSwitchUser={handleSwitchUser}
      />

      {/* Main Routed Page Content */}
      <main className="flex-1 flex flex-col">
        {renderRoute()}
      </main>

      {/* Global Printable Target Marker Modal */}
      <TrainingMarkerModal
        isOpen={markerModalOpen}
        onClose={() => setMarkerModalOpen(false)}
        lang={lang}
      />

      {/* Official Government Footer */}
      <footer className="w-full bg-slate-950 border-t border-slate-900 py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-mono font-bold text-slate-300">
                MineSafe AR • Problem Statement ID: 2604
              </p>
              <p className="text-[11px] text-slate-500">
                Department of Higher & Technical Education, Government of Jharkhand
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <button
              type="button"
              onClick={() => navigate('/demo')}
              className="text-amber-400 hover:underline font-semibold"
            >
              Demo Walkthrough
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => navigate('/verify')}
              className="text-slate-400 hover:text-slate-200"
            >
              Certificate Registry
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setMarkerModalOpen(true)}
              className="text-slate-400 hover:text-slate-200"
            >
              Target Marker
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="text-slate-400 hover:text-slate-200"
            >
              Director Console
            </button>
          </div>

          <p className="text-[10px] font-mono text-slate-600">
            DGMS Compliant • CMR 2017 & MMR 1961 Safety Standards
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

