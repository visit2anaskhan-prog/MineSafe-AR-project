import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Certificate, Language } from '../types';
import { storage } from '../data/storage';
import { CertificateView } from '../components/CertificateView';

interface CertificateDetailPageProps {
  certificateId: string;
  lang: Language;
  onNavigate: (path: string) => void;
}

export const CertificateDetailPage: React.FC<CertificateDetailPageProps> = ({
  certificateId,
  lang,
  onNavigate
}) => {
  const certificate = storage.getCertificateById(certificateId);

  if (!certificate) {
    return (
      <div className="w-full max-w-xl mx-auto py-16 text-center text-slate-400">
        <h2 className="text-xl font-bold text-white mb-2">Certificate Not Found</h2>
        <p className="text-xs">No matching digital certificate found for ID: {certificateId}</p>
        <button
          type="button"
          onClick={() => onNavigate('/certificates')}
          className="mt-4 px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
        >
          Back to Certificates
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <button
        type="button"
        onClick={() => onNavigate('/certificates')}
        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 mb-6 font-medium transition-colors print:hidden"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Certificates Gallery</span>
      </button>

      <CertificateView 
        certificate={certificate} 
        lang={lang} 
        onVerify={(id) => onNavigate(`/verify/${id}`)}
      />
    </div>
  );
};
