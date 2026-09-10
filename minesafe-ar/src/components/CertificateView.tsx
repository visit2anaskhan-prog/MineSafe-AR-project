import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Certificate, Language } from '../types';
import { ShieldCheck, Printer, CheckCircle, ExternalLink, Award } from 'lucide-react';

interface CertificateViewProps {
  certificate: Certificate;
  lang: Language;
  onVerify?: (certId: string) => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  certificate,
  lang,
  onVerify
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    // Generate QR code pointing to public verification page
    const verifyUrl = typeof window !== 'undefined' 
      ? `${window.location.origin}/verify/${certificate.certificateId}`
      : `/verify/${certificate.certificateId}`;

    QRCode.toDataURL(verifyUrl, {
      width: 140,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    }).then(url => {
      setQrDataUrl(url);
    }).catch(err => {
      console.warn('QR Code generation error:', err);
    });
  }, [certificate.certificateId]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Print / Action Toolbar (Hidden during print) */}
      <div className="w-full max-w-3xl flex items-center justify-between mb-4 print:hidden px-2">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-500/30">
          <CheckCircle className="w-4 h-4" />
          <span>{lang === 'hi' ? 'आधिकारिक राज्य प्रमाणन जारी किया गया' : 'Official State Vocational Credential Issued'}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            id="btn-print-cert"
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'प्रिंट / पीडीएफ सहेजें' : 'Print / Save PDF'}</span>
          </button>
          {onVerify && (
            <button
              id="btn-verify-cert"
              type="button"
              onClick={() => onVerify(certificate.certificateId)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'hi' ? 'सत्यापन पृष्ठ' : 'Public Verify Page'}</span>
            </button>
          )}
        </div>
      </div>

      {/* The Official Certificate Document Sheet */}
      <div 
        id="certificate-document"
        className="w-full max-w-3xl bg-amber-50/95 text-slate-900 rounded-xl p-8 sm:p-12 shadow-2xl border-8 border-slate-900 relative overflow-hidden print:m-0 print:w-full print:border-8 print:shadow-none"
      >
        {/* Ornate Industrial Corner Guilloche Borders */}
        <div className="absolute top-3 left-3 w-16 h-16 border-t-4 border-l-4 border-amber-700/60" />
        <div className="absolute top-3 right-3 w-16 h-16 border-t-4 border-r-4 border-amber-700/60" />
        <div className="absolute bottom-3 left-3 w-16 h-16 border-b-4 border-l-4 border-amber-700/60" />
        <div className="absolute bottom-3 right-3 w-16 h-16 border-b-4 border-r-4 border-amber-700/60" />

        {/* Subtle Watermark Emblem */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
          <ShieldCheck className="w-96 h-96 text-slate-900" />
        </div>

        {/* Header Branding & State Emblems */}
        <div className="text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-[11px] font-black tracking-widest uppercase font-mono bg-slate-900 text-amber-400 px-3 py-1 rounded">
              GOVERNMENT OF JHARKHAND
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-700 tracking-wider uppercase font-serif">
            DEPARTMENT OF HIGHER & TECHNICAL EDUCATION
          </p>
          <p className="text-[10px] text-slate-500 font-mono mt-0.5">
            STATE VOCATIONAL SAFETY & DISASTER SIMULATION COUNCIL • RANCHI
          </p>

          <div className="my-4 flex items-center justify-center gap-3">
            <div className="h-0.5 w-16 bg-amber-600/40" />
            <Award className="w-7 h-7 text-amber-600" />
            <div className="h-0.5 w-16 bg-amber-600/40" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-wide text-slate-950 uppercase">
            CERTIFICATE OF COMPETENCY
          </h2>
          <p className="text-xs font-semibold text-amber-800 tracking-widest uppercase font-mono mt-1">
            MINESAFE AR INDUSTRIAL VOCATIONAL CERTIFICATION
          </p>
        </div>

        {/* Certificate Recipient Body */}
        <div className="text-center my-6 sm:my-8 relative z-10">
          <p className="text-xs font-medium text-slate-600 uppercase tracking-widest">
            THIS IS TO CERTIFY THAT
          </p>
          <div className="my-3 border-b-2 border-slate-900/40 inline-block px-8 pb-1">
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-slate-950">
              {certificate.userName}
            </h3>
          </div>
          <p className="text-xs text-slate-700 max-w-xl mx-auto leading-relaxed mt-2">
            has demonstrated required occupational competence and successfully passed the augmented reality safety simulation and DGMS compliance assessment in:
          </p>
          <div className="my-2 bg-slate-900 text-amber-400 py-2 px-4 rounded-lg inline-block font-mono font-bold text-sm sm:text-base tracking-wide uppercase shadow-sm">
            {certificate.moduleName}
          </div>
        </div>

        {/* Score & Evaluation Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 my-6 text-center relative z-10">
          <div className="bg-white/80 border border-slate-300 px-4 py-2 rounded-lg">
            <span className="text-[10px] font-bold text-slate-500 uppercase block font-mono">
              Score Achieved
            </span>
            <span className="text-lg font-black text-slate-900 font-mono">
              {certificate.score}%
            </span>
          </div>

          <div className="bg-white/80 border border-slate-300 px-4 py-2 rounded-lg">
            <span className="text-[10px] font-bold text-slate-500 uppercase block font-mono">
              Performance Level
            </span>
            <span className="text-xs font-black text-emerald-800 uppercase font-mono">
              {certificate.performanceLevel}
            </span>
          </div>

          <div className="bg-white/80 border border-slate-300 px-4 py-2 rounded-lg">
            <span className="text-[10px] font-bold text-slate-500 uppercase block font-mono">
              Issue Date
            </span>
            <span className="text-xs font-bold text-slate-900 font-mono">
              {certificate.issueDate}
            </span>
          </div>
        </div>

        {/* Bottom Verification & Signatures Bar */}
        <div className="border-t-2 border-slate-300 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          {/* QR Code */}
          <div className="flex items-center gap-3">
            {qrDataUrl ? (
              <img 
                src={qrDataUrl} 
                alt="Verification QR Code" 
                className="w-20 h-20 border-2 border-slate-900 rounded bg-white p-0.5 shadow-xs"
              />
            ) : (
              <div className="w-20 h-20 bg-white border border-slate-300 animate-pulse rounded" />
            )}
            <div className="text-left text-[10px] font-mono leading-tight">
              <span className="font-bold text-slate-900 block uppercase">Tamper-Proof Verification</span>
              <span className="text-slate-600 block mt-0.5">ID: {certificate.certificateId}</span>
              <span className="text-slate-600 block">Code: {certificate.verificationCode}</span>
              <span className="text-emerald-700 font-bold block mt-1">✓ DIGITALLY SEALED</span>
            </div>
          </div>

          {/* Official Signatures */}
          <div className="flex gap-8 text-center">
            <div>
              <div className="w-28 border-b border-slate-800 mb-1 font-serif text-[11px] italic text-slate-800">
                S. K. Soren
              </div>
              <span className="text-[9px] font-bold uppercase text-slate-600 font-mono block">
                Safety Director
              </span>
              <span className="text-[8px] text-slate-500 block">Govt. of Jharkhand</span>
            </div>

            <div>
              <div className="w-28 border-b border-slate-800 mb-1 font-serif text-[11px] italic text-slate-800">
                Dr. R. P. Verma
              </div>
              <span className="text-[9px] font-bold uppercase text-slate-600 font-mono block">
                Director General
              </span>
              <span className="text-[8px] text-slate-500 block">Mines Safety Council</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
