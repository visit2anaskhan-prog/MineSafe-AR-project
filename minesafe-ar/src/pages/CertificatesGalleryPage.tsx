import React from 'react';
import { Award, ExternalLink, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { UserProfile, Language } from '../types';
import { storage } from '../data/storage';

interface CertificatesGalleryPageProps {
  currentUser: UserProfile;
  lang: Language;
  onNavigate: (path: string) => void;
}

export const CertificatesGalleryPage: React.FC<CertificatesGalleryPageProps> = ({
  currentUser,
  lang,
  onNavigate
}) => {
  const certificates = storage.getCertificates(currentUser.id);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-mono font-bold text-white">
              My Vocational Certificates
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold">
              {certificates.length} VERIFIED
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Department of Higher & Technical Education, Government of Jharkhand • Accredited Credentials
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('/verify')}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors self-start"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Public Verification Portal</span>
        </button>
      </div>

      {certificates.length === 0 ? (
        <div className="my-12 p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center max-w-md mx-auto">
          <Award className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-200">No Certificates Earned Yet</h3>
          <p className="text-xs text-slate-400 mt-2">
            Complete any vocational safety module with a score of 70% or higher to automatically earn your digital credential.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/modules')}
            className="mt-4 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            Start a Module Now →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          {certificates.map((cert) => (
            <div 
              key={cert.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-400" />
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      ID: {cert.certificateId}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    VERIFIED
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">
                  {cert.moduleName}
                </h3>
                <p className="text-xs text-slate-400">
                  Issued to: <strong className="text-slate-200">{cert.userName}</strong>
                </p>

                <div className="grid grid-cols-3 gap-2 my-4 p-3 bg-slate-950 rounded-xl border border-slate-800 text-center text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Score</span>
                    <span className="font-bold text-emerald-400">{cert.score}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Level</span>
                    <span className="font-bold text-slate-200">{cert.performanceLevel}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Date</span>
                    <span className="font-bold text-slate-300">{cert.issueDate}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  id={`btn-view-cert-${cert.id}`}
                  type="button"
                  onClick={() => onNavigate(`/certificates/${cert.certificateId}`)}
                  className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>View & Print</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate(`/verify/${cert.certificateId}`)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl border border-slate-700 transition-colors"
                  title="Verify on Public Register"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
