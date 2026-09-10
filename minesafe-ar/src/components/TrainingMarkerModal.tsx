import React from 'react';
import { X, Printer, Camera, ShieldCheck, Download } from 'lucide-react';
import { Language } from '../types';

interface TrainingMarkerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  moduleTitle?: string;
}

export const TrainingMarkerModal: React.FC<TrainingMarkerModalProps> = ({
  isOpen,
  onClose,
  lang,
  moduleTitle
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div 
        id="modal-training-marker"
        className="relative w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-100 print:border-none print:shadow-none print:p-0 print:m-0 print:w-full"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                {lang === 'hi' ? 'माइनसेफ एआर प्रशिक्षण मार्कर' : 'MineSafe AR Training Marker'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'hi' ? 'कैमरा ट्रैकिंग हेतु प्रिंट करें या स्क्रीन पर दिखाएं' : 'High-contrast optical image target'}
              </p>
            </div>
          </div>
          <button
            id="btn-close-marker-modal"
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable High-Contrast Target Area */}
        <div className="my-5 flex flex-col items-center justify-center">
          <div 
            id="ar-marker-target-frame"
            className="w-72 h-72 sm:w-80 sm:h-80 bg-white text-slate-950 p-6 rounded-xl border-8 border-slate-950 shadow-inner flex flex-col items-center justify-between relative select-none print:border-8 print:w-96 print:h-96"
          >
            {/* Corner Alignment Targets */}
            <div className="absolute top-2 left-2 w-7 h-7 border-t-4 border-l-4 border-black" />
            <div className="absolute top-2 right-2 w-7 h-7 border-t-4 border-r-4 border-black" />
            <div className="absolute bottom-2 left-2 w-7 h-7 border-b-4 border-l-4 border-black" />
            <div className="absolute bottom-2 right-2 w-7 h-7 border-b-4 border-r-4 border-black" />

            {/* Target Header */}
            <div className="text-center pt-1">
              <span className="text-[10px] font-mono tracking-widest uppercase font-black text-amber-600 bg-slate-100 px-2 py-0.5 rounded border border-amber-600/30">
                GOVT OF JHARKHAND • DEPT OF HIGHER EDUCATION
              </span>
              <h4 className="text-xl font-black tracking-tight text-slate-950 mt-1 uppercase font-mono">
                MINESAFE AR
              </h4>
            </div>

            {/* Central Optical Feature Geometry for MindAR */}
            <div className="relative w-36 h-36 border-4 border-black rounded-lg flex items-center justify-center bg-slate-50 overflow-hidden">
              {/* High-frequency geometric patterns for robust tracking */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1 p-2 opacity-90">
                <div className="bg-black rounded-sm" />
                <div className="bg-amber-500 rounded-sm" />
                <div className="bg-black rounded-sm" />
                <div className="bg-white border-2 border-black rounded-sm" />
                <div className="bg-black flex items-center justify-center text-white text-[10px] font-black font-mono">
                  AR
                </div>
                <div className="bg-white border-2 border-black rounded-sm" />
                <div className="bg-amber-500 rounded-sm" />
                <div className="bg-black rounded-sm" />
                <div className="bg-amber-500 rounded-sm" />
              </div>
              <div className="absolute w-20 h-20 rounded-full border-2 border-black flex items-center justify-center bg-white/90">
                <ShieldCheck className="w-10 h-10 text-slate-950" />
              </div>
            </div>

            {/* Target Footer */}
            <div className="text-center pb-1">
              <p className="text-xs font-black tracking-wider uppercase font-mono text-slate-900">
                ★ SCAN TO TRAIN ★
              </p>
              <p className="text-[9px] font-mono text-slate-600">
                TARGET ID: JH-MINESAFE-2604-V1
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-3 text-center max-w-sm print:hidden">
            {lang === 'hi'
              ? 'टिप: यदि आप कंप्यूटर पर हैं, तो अपने स्मार्टफोन का कैमरा इस स्क्रीन पर केंद्रित करें।'
              : 'Tip: Testing on computer? Keep this window open on your screen and point your phone at it.'
            }
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 print:hidden">
          <button
            id="btn-print-marker"
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-xl text-sm transition-colors shadow-lg shadow-amber-500/20"
          >
            <Printer className="w-4 h-4" />
            <span>{lang === 'hi' ? 'प्रिंट मार्कर (Print)' : 'Print Marker'}</span>
          </button>
          <button
            id="btn-dismiss-marker"
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl text-sm transition-colors"
          >
            {lang === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
