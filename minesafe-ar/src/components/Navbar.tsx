import React, { useState } from 'react';
import { 
  ShieldCheck, HardHat, Compass, Award, BarChart3, 
  Menu, X, User, LogOut, CheckCircle2, ChevronDown, Sparkles
} from 'lucide-react';
import { UserProfile, Language } from '../types';
import { LanguageSelector } from './LanguageSelector';
import { t } from '../utils/translations';

interface NavbarProps {
  currentUser: UserProfile | null;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  activePath: string;
  onNavigate: (path: string) => void;
  onSwitchUser: (role: 'TRAINEE' | 'ADMIN') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  lang,
  onLanguageChange,
  activePath,
  onNavigate,
  onSwitchUser
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isAdmin = currentUser?.role === 'ADMIN';

  const traineeNavItems = [
    { label: t('navDashboard', lang), path: '/dashboard', icon: Compass },
    { label: t('navModules', lang), path: '/modules', icon: HardHat },
    { label: t('navProgress', lang), path: '/progress', icon: BarChart3 },
    { label: t('navCertificates', lang), path: '/certificates', icon: Award },
    { label: t('navVerify', lang), path: '/verify', icon: CheckCircle2 }
  ];

  const adminNavItems = [
    { label: 'Admin Overview', path: '/admin', icon: BarChart3 },
    { label: 'Trainees', path: '/admin/trainees', icon: User },
    { label: 'Modules', path: '/admin/modules', icon: HardHat },
    { label: 'AI Insights', path: '/admin/insights', icon: Sparkles },
    { label: 'Certificates', path: '/admin/certificates', icon: Award }
  ];

  const navItems = isAdmin ? adminNavItems : traineeNavItems;

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Gov Emblem */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('/')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-black text-lg tracking-tight text-white">
                MineSafe <span className="text-amber-400">AR</span>
              </span>
              <span className="text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/40">
                JH-2604
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium truncate max-w-[200px] sm:max-w-none">
              Govt. of Jharkhand • Dept. of Higher Education
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePath === item.path || (item.path !== '/' && activePath.startsWith(item.path));
            return (
              <button
                key={item.path}
                id={`nav-${item.path.replace(/\//g, '-')}`}
                type="button"
                onClick={() => handleNavClick(item.path)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Language & Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSelector currentLang={lang} onLanguageChange={onLanguageChange} />

          {/* User Profile / Quick Switcher */}
          <div className="relative">
            <button
              id="btn-user-dropdown"
              type="button"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 transition-colors"
            >
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-xs">
                {currentUser?.name.charAt(0) || 'U'}
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="font-semibold text-[11px] truncate max-w-[110px] text-slate-100">
                  {currentUser?.name.split(' ')[0]}
                </span>
                <span className="text-[9px] font-mono text-amber-400">
                  {isAdmin ? 'CHIEF ADMIN' : 'TRAINEE'}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {userDropdownOpen && (
              <div 
                id="menu-user-dropdown"
                className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-3 z-50 text-slate-100"
              >
                <div className="pb-3 border-b border-slate-800">
                  <p className="text-xs font-bold text-slate-100 truncate">{currentUser?.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{currentUser?.email}</p>
                  <span className={`inline-block mt-1.5 px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                    isAdmin ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {isAdmin ? 'ADMINISTRATOR ROLE' : 'MINE TRAINEE ROLE'}
                  </span>
                </div>

                <div className="py-2">
                  <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider block px-1 mb-1">
                    Quick Switch (Prototype Demo)
                  </span>
                  <button
                    id="btn-switch-trainee"
                    type="button"
                    onClick={() => {
                      onSwitchUser('TRAINEE');
                      setUserDropdownOpen(false);
                      onNavigate('/dashboard');
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between ${
                      !isAdmin ? 'bg-slate-800 text-amber-400 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>👷 Ramesh Murmu (Trainee)</span>
                    {!isAdmin && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                  </button>

                  <button
                    id="btn-switch-admin"
                    type="button"
                    onClick={() => {
                      onSwitchUser('ADMIN');
                      setUserDropdownOpen(false);
                      onNavigate('/admin');
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between mt-1 ${
                      isAdmin ? 'bg-slate-800 text-amber-400 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>🛡️ Er. S.K. Soren (Safety Director)</span>
                    {isAdmin && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onNavigate('/demo');
                    }}
                    className="text-[11px] text-amber-400 hover:underline font-medium"
                  >
                    Demo Walkthrough →
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onNavigate('/login');
                    }}
                    className="text-[11px] text-slate-400 hover:text-rose-400 flex items-center gap-1 font-medium"
                  >
                    <LogOut className="w-3 h-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="btn-mobile-menu"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePath === item.path;
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
