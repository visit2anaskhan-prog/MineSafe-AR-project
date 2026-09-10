import React from 'react';
import { 
  Users, Award, BarChart3, CheckCircle2, TrendingUp, 
  Sparkles, ShieldCheck, ArrowRight, HardHat, AlertTriangle
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { storage } from '../data/storage';
import { Language } from '../types';

interface AdminDashboardProps {
  lang: Language;
  onNavigate: (path: string) => void;
}

const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#f43f5e', '#8b5cf6'];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  lang,
  onNavigate
}) => {
  const analytics = storage.getAdminAnalytics();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-slate-100">
      {/* Admin Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-mono font-bold text-white">
              Statewide Safety Training Analytics
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold">
              DIRECTOR CONSOLE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Department of Higher & Technical Education • Directorate General of Mines Safety (DGMS) Roster
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-admin-nav-insights"
            type="button"
            onClick={() => onNavigate('/admin/insights')}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Safety Intelligence (Gemini)</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 my-6">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium block">Total Trainees</span>
          <span className="text-2xl font-mono font-bold text-white mt-1 block">
            {analytics.totalTrainees}
          </span>
          <span className="text-[10px] text-emerald-400 font-mono mt-1 block">Active In Cohorts</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium block">Completions</span>
          <span className="text-2xl font-mono font-bold text-amber-400 mt-1 block">
            {analytics.trainingCompletions}
          </span>
          <span className="text-[10px] text-slate-400 font-mono mt-1 block">AR Scenarios</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium block">Average Score</span>
          <span className="text-2xl font-mono font-bold text-emerald-400 mt-1 block">
            {analytics.averageScore}%
          </span>
          <span className="text-[10px] text-slate-400 font-mono mt-1 block">Across All Modules</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium block">Pass Rate</span>
          <span className="text-2xl font-mono font-bold text-sky-400 mt-1 block">
            {analytics.passRate}%
          </span>
          <span className="text-[10px] text-slate-400 font-mono mt-1 block">≥70% Benchmark</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl col-span-2 lg:col-span-1">
          <span className="text-xs text-slate-400 font-medium block">Certificates Issued</span>
          <span className="text-2xl font-mono font-bold text-amber-400 mt-1 block">
            {analytics.certificatesIssued}
          </span>
          <span className="text-[10px] text-emerald-400 font-mono mt-1 block">QR Verified</span>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
        {/* Module Performance Bar Chart */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold font-mono text-white">
              Module Average Scores (DGMS Standard)
            </h3>
            <span className="text-[10px] font-mono text-amber-400">TARGET: 70%</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.moduleStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="title" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#f59e0b' }}
                />
                <Bar dataKey="avgScore" fill="#f59e0b" radius={[6, 6, 0, 0]} name="Average Score %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Score Distribution Breakdown */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold font-mono text-white">
              Assessment Score Distribution
            </h3>
            <span className="text-[10px] font-mono text-emerald-400">Total Cohorts</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.scoreDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                <YAxis dataKey="range" type="category" stroke="#94a3b8" fontSize={11} width={80} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                />
                <Bar dataKey="count" fill="#10b981" radius={[0, 6, 6, 0]} name="Trainees" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Weak Safety Topics & Gap Frequencies */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl my-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold font-mono text-white">
              High-Risk Industrial Knowledge Gaps (DGMS Priority Audit)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Specific safety topics most frequently missed across assessment attempts
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/admin/insights')}
            className="text-xs text-amber-400 hover:underline font-semibold"
          >
            Generate AI Action Plan →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {analytics.weakTopicFrequencies.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                <span>Rank #{idx + 1}</span>
                <span className="text-rose-400 font-bold">{item.count} Misses</span>
              </div>
              <strong className="text-xs text-slate-100 block font-medium">
                {item.topic}
              </strong>
              <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
                <div 
                  className="h-full bg-rose-500 rounded-full" 
                  style={{ width: `${Math.min(100, (item.count / 30) * 100)}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="my-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold font-mono text-white">
            Recent Trainee Assessment Submissions
          </h3>
          <button
            type="button"
            onClick={() => onNavigate('/admin/trainees')}
            className="text-xs text-amber-400 hover:underline font-semibold"
          >
            Manage All Trainees →
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-mono uppercase border-b border-slate-800">
              <tr>
                <th className="p-3.5">Trainee</th>
                <th className="p-3.5">Module</th>
                <th className="p-3.5">Score</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {analytics.recentActivity.map((act) => (
                <tr key={act.id} className="hover:bg-slate-850 transition-colors">
                  <td className="p-3.5 font-medium text-slate-200">{act.userName}</td>
                  <td className="p-3.5 text-slate-300">{act.moduleName}</td>
                  <td className="p-3.5 font-mono font-bold text-white">{act.score}%</td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                      act.status === 'Passed' 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}>
                      {act.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-400 font-mono">{act.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
