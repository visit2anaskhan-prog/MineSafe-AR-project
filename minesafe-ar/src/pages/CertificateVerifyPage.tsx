import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Search, CheckCircle2, XCircle, Award, 
  Building, Calendar, User, ExternalLink, ArrowLeft 
} from 'lucide-react';
import { Certificate, Language } from '../types';
import { storage } from '../data/storage';

interface CertificateVerifyPageProps {
  initialCertId?: string;
  lang: Language;
  onNavigate: (path: string) => void;
}

export const CertificateVerifyPage: React.FC<CertificateVerifyPageProps> = ({
  initialCertId,
  lang,
  onNavigate
}) => {
  const [query, setQuery] = useState(initialCertId || '');
  const [result, setResult] = useState<Certificate | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialCertId) {
      handleSearch(initialCertId);
    }
  }, [initialCertId]);

  const handleSearch = (searchTerm: string) => {
    const term = searchTerm.trim().toUpperCase();
    if (!term) return;

    setSearched(true);
    const certs = storage.getCertificates();
    const match = certs.find(c => 
      c.certificateId.toUpperCase() === term || 
      c.verificationCode.toUpperCase() === term
    );
    setResult(match || null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 text-slate-100">
      {/* Top Banner */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto mb-3">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-mono font-bold uppercase text-amber-400 tracking-wider">
          GOVERNMENT OF JHARKHAND • VOCATIONAL SAFETY REGISTRY
        </span>
        <h1 className="text-2xl sm:text-3xl font-mono font-bold text-white mt-1">
          Public Certificate Verification
        </h1>
        <p className="text-xs text-slate-400 mt-2">
          Verify tamper-proof MineSafe AR vocational credentials issued under Directorate General of Mines Safety (DGMS) guidelines.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl mb-8">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(query);
          }}
          className="flex flex-col sm:flex-row gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="input-verify-cert-id"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. MSAR-2026-000001 or VERIF-PPE-882193"
              className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
            />
          </div>
          <button
            id="btn-submit-verify"
            type="submit"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-colors whitespace-nowrap"
          >
            Verify Credential
          </button>
        </form>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
          <span>Sample IDs to test:</span>
          <button
            type="button"
            onClick={() => {
              setQuery('MSAR-2026-000001');
              handleSearch('MSAR-2026-000001');
            }}
            className="text-amber-400 font-mono hover:underline"
          >
            MSAR-2026-000001
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => {
              setQuery('MSAR-2026-000002');
              handleSearch('MSAR-2026-000002');
            }}
            className="text-amber-400 font-mono hover:underline"
          >
            MSAR-2026-000002
          </button>
        </div>
      </div>

      {/* Verification Result Card */}
      {searched && (
        result ? (
          <div 
            id="card-verify-success"
            className="bg-slate-900 border-2 border-emerald-500/60 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Green Seal Status Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wide">
                  ✓ VERIFIED & DIGITALLY ACCREDITED
                </span>
                <h3 className="text-base font-bold text-white">
                  Official Industrial Safety Certificate
                </h3>
              </div>
            </div>

            {/* Credential Attributes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-mono block text-[10px]">RECIPIENT NAME</span>
                <strong className="text-sm text-slate-100 mt-0.5 block">{result.userName}</strong>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-mono block text-[10px]">MODULE TITLE</span>
                <strong className="text-sm text-slate-100 mt-0.5 block">{result.moduleName}</strong>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-mono block text-[10px]">SCORE ACHIEVED</span>
                <strong className="text-sm text-emerald-400 font-mono mt-0.5 block">
                  {result.score}% ({result.performanceLevel})
                </strong>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-mono block text-[10px]">DATE OF ISSUANCE</span>
                <strong className="text-sm text-slate-200 font-mono mt-0.5 block">{result.issueDate}</strong>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-mono block text-[10px]">CERTIFICATE ID</span>
                <strong className="text-xs text-amber-400 font-mono mt-0.5 block">{result.certificateId}</strong>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-mono block text-[10px]">VERIFICATION CODE</span>
                <strong className="text-xs text-slate-300 font-mono mt-0.5 block">{result.verificationCode}</strong>
              </div>
            </div>

            {/* Issuing Authority Attribution */}
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
              <Building className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">Department of Higher & Technical Education</strong>
                <span>Government of Jharkhand • In compliance with DGMS Occupational Standards</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => onNavigate(`/certificates/${result.certificateId}`)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <span>View Full Certificate Document</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div 
            id="card-verify-fail"
            className="bg-slate-900 border-2 border-rose-500/60 rounded-2xl p-6 text-center text-slate-300 shadow-2xl"
          >
            <XCircle className="w-10 h-10 text-rose-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-white">Certificate Not Found in State Registry</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              No matching record found for &ldquo;{query}&rdquo;. Please verify the spelling or check the QR code on the physical document.
            </p>
          </div>
        )
      )}
    </div>
  );
};
