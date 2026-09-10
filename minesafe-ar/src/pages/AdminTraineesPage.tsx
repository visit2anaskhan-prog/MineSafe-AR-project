import React, { useState } from 'react';
import { Users, Search, Award, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { storage } from '../data/storage';
import { Language } from '../types';

interface AdminTraineesPageProps {
  lang: Language;
  onNavigate: (path: string) => void;
}

export const AdminTraineesPage: React.FC<AdminTraineesPageProps> = ({
  lang,
  onNavigate
}) => {
  const [search, setSearch] = useState('');
  const trainees = storage.getTrainees();

  const filtered = trainees.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.email.toLowerCase().includes(search.toLowerCase()) ||
    (t.mineLocation && t.mineLocation.toLowerCase().includes(search.toLowerCase()))
  );

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
            Trainee Roster & Safety Records
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Registered miners and technicians across Dhanbad, Bokaro, and Singhbhum
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or colliery..."
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {filtered.map((trainee) => {
          const traineeId = trainee.uid || trainee.id || 'usr_001';
          const certs = storage.getCertificates(traineeId);
          const attempts = storage.getAttempts(traineeId);
          const progress = storage.getUserProgress(traineeId);
          const completedCount = progress.filter(p => p.completed).length;

          return (
            <div 
              key={traineeId}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/40 transition-all"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-sm">
                  {trainee.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{trainee.name}</h3>
                  <p className="text-[11px] text-slate-400">{trainee.email}</p>
                </div>
              </div>

              <div className="my-4 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Colliery Unit:</span>
                  <span className="text-slate-200 font-medium">{trainee.mineLocation || 'Dhanbad Seam 4'}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Modules Completed:</span>
                  <span className="text-amber-400 font-bold">{completedCount}/3</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Certificates Issued:</span>
                  <span className="text-emerald-400 font-bold">{certs.length}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                <span className="text-[10px] font-mono text-slate-500">ID: {traineeId}</span>
                <button
                  type="button"
                  onClick={() => {
                    storage.setCurrentUser(trainee);
                    onNavigate('/dashboard');
                  }}
                  className="text-amber-400 hover:underline font-semibold"
                >
                  Inspect Profile →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
