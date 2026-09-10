import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, CameraOff, AlertTriangle, CheckCircle2, ShieldCheck, 
  RotateCcw, Sparkles, ArrowRight, Eye, RefreshCw, Layers, Volume2
} from 'lucide-react';
import { SafetyModule, InteractiveObject, Language } from '../types';
import { speakText } from '../utils/speech';

interface ARSceneProps {
  module: SafetyModule;
  lang: Language;
  onComplete: () => void;
  onOpenMarkerModal: () => void;
}

export const ARScene: React.FC<ARSceneProps> = ({
  module,
  lang,
  onComplete,
  onOpenMarkerModal
}) => {
  const [isCameraMode, setIsCameraMode] = useState(true);
  const [cameraPermission, setCameraPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [targetDetected, setTargetDetected] = useState(false);
  const [resolvedHazards, setResolvedHazards] = useState<string[]>([]);
  const [activeFeedback, setActiveFeedback] = useState<{
    text: string;
    type: 'success' | 'warning' | 'info';
  } | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedObject, setSelectedObject] = useState<InteractiveObject | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Filter hazards vs safe items
  const hazards = module.arScenario.interactiveObjects.filter(o => o.isHazard);
  const totalHazardsCount = hazards.length;

  // Initialize camera
  useEffect(() => {
    let active = true;

    async function startCamera() {
      if (!isCameraMode) return;
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          if (active) {
            setCameraPermission('denied');
            setIsCameraMode(false);
          }
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false
        });

        if (active) {
          mediaStreamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch(() => {});
          }
          setCameraPermission('granted');
          // Automatically engage target lock after scanning for 2 seconds to ensure presentation flow
          setTimeout(() => {
            if (active) setTargetDetected(true);
          }, 2200);
        }
      } catch (err) {
        console.warn('Camera access denied or unavailable:', err);
        if (active) {
          setCameraPermission('denied');
          setIsCameraMode(false);
          // In interactive mode, target is locked immediately
          setTargetDetected(true);
        }
      }
    }

    if (isCameraMode) {
      startCamera();
    } else {
      setTargetDetected(true);
    }

    return () => {
      active = false;
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, [isCameraMode]);

  // Handle object tap
  const handleObjectClick = (obj: InteractiveObject) => {
    setSelectedObject(obj);

    if (obj.isHazard) {
      if (!resolvedHazards.includes(obj.id)) {
        const nextResolved = [...resolvedHazards, obj.id];
        setResolvedHazards(nextResolved);

        const correctionMsg = lang === 'hi' ? obj.correctionHindi : obj.correction;
        setActiveFeedback({
          text: `✓ ${correctionMsg}`,
          type: 'success'
        });

        // Speech cue
        speakText(lang === 'hi' ? obj.nameHindi + ' ठीक किया गया।' : `${obj.name} corrected.`, lang);

        if (nextResolved.length >= totalHazardsCount) {
          setTimeout(() => {
            setIsComplete(true);
            const doneMsg = lang === 'hi'
              ? 'शाबाश! सभी सुरक्षा खतरे ठीक कर दिए गए हैं।'
              : 'Scenario cleared! All safety hazards have been corrected.';
            speakText(doneMsg, lang);
          }, 800);
        }
      } else {
        setActiveFeedback({
          text: lang === 'hi' ? 'यह सुरक्षा उपकरण पहले ही सही स्थिति में है।' : 'This item has already been brought into compliant state.',
          type: 'info'
        });
      }
    } else {
      setActiveFeedback({
        text: lang === 'hi' ? `${obj.nameHindi}: यह पहले से ही सुरक्षित है।` : `${obj.name}: This equipment is already in safe compliance.`,
        type: 'warning'
      });
    }
  };

  const resetScenario = () => {
    setResolvedHazards([]);
    setIsComplete(false);
    setSelectedObject(null);
    setActiveFeedback({
      text: lang === 'hi' ? 'परिदृश्य पुनः आरंभ हुआ। खतरों को पहचानें।' : 'Scenario reset. Identify and resolve all hazards.',
      type: 'info'
    });
  };

  return (
    <div className="relative w-full h-[620px] sm:h-[680px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col select-none">
      {/* Top AR Header Bar */}
      <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between p-3.5 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-transparent backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${targetDetected ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${targetDetected ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          </span>
          <div>
            <div className="text-xs font-mono font-bold tracking-wider uppercase text-amber-400">
              {isCameraMode ? 'AR LIVE OPTICAL TRACKING' : 'INTERACTIVE 3D SIMULATOR'}
            </div>
            <div className="text-sm font-bold text-slate-100 truncate max-w-xs">
              {lang === 'hi' ? module.titleHindi : module.title}
            </div>
          </div>
        </div>

        {/* View Mode & Marker Controls */}
        <div className="flex items-center gap-2">
          <button
            id="btn-toggle-ar-mode"
            type="button"
            onClick={() => {
              setIsCameraMode(!isCameraMode);
              if (isCameraMode && mediaStreamRef.current) {
                mediaStreamRef.current.getTracks().forEach(t => t.stop());
              }
            }}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {isCameraMode ? <Layers className="w-3.5 h-3.5 text-amber-400" /> : <Camera className="w-3.5 h-3.5 text-amber-400" />}
            <span>{isCameraMode ? (lang === 'hi' ? '3D सिम्युलेटर' : '3D Simulator') : (lang === 'hi' ? 'कैमरा एआर' : 'Camera AR')}</span>
          </button>

          <button
            id="btn-open-marker"
            type="button"
            onClick={onOpenMarkerModal}
            className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'मार्कर देखें' : 'Target Marker'}</span>
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="relative flex-1 w-full h-full overflow-hidden bg-slate-900 flex items-center justify-center">
        {/* Real Camera Stream */}
        {isCameraMode && (
          <video
            ref={videoRef}
            playsInline
            muted
            autoPlay
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}

        {/* Dark Tint & Industrial Grid Background */}
        <div className={`absolute inset-0 z-10 pointer-events-none ${
          isCameraMode 
            ? 'bg-slate-950/40' 
            : 'bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] bg-slate-950'
        }`} />

        {/* Camera Seeking Overlay (before detection in AR mode) */}
        {isCameraMode && !targetDetected && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-black/60 backdrop-blur-xs pointer-events-auto">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 border-2 border-dashed border-amber-500/60 rounded-2xl flex items-center justify-center animate-pulse">
              <div className="w-12 h-12 border-t-2 border-l-2 border-amber-400 absolute top-2 left-2" />
              <div className="w-12 h-12 border-t-2 border-r-2 border-amber-400 absolute top-2 right-2" />
              <div className="w-12 h-12 border-b-2 border-l-2 border-amber-400 absolute bottom-2 left-2" />
              <div className="w-12 h-12 border-b-2 border-r-2 border-amber-400 absolute bottom-2 right-2" />
              <div className="text-center p-4">
                <Camera className="w-10 h-10 text-amber-400 mx-auto mb-2 animate-bounce" />
                <span className="text-xs font-mono font-bold text-amber-300">
                  {lang === 'hi' ? 'मार्कर पर कैमरा रखें...' : 'SCANNING FOR TARGET...'}
                </span>
              </div>
            </div>

            <p className="text-sm font-medium text-slate-200 mt-4 max-w-sm">
              {lang === 'hi'
                ? 'माइनसेफ एआर मार्कर की ओर फोन रखें, या तुरंत सिमुलेशन शुरू करने के लिए नीचे टैप करें।'
                : 'Point camera at the printed or screen training marker, or lock target directly.'}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                id="btn-force-target-lock"
                type="button"
                onClick={() => setTargetDetected(true)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow-lg transition-transform active:scale-95"
              >
                {lang === 'hi' ? '🎯 सिमुलेशन टारगेट लॉक करें' : '🎯 Lock Target Manually'}
              </button>
              <button
                id="btn-switch-fallback"
                type="button"
                onClick={() => {
                  setIsCameraMode(false);
                  setTargetDetected(true);
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors"
              >
                {lang === 'hi' ? '3D सिम्युलेटर खोलें' : 'Interactive 3D'}
              </button>
            </div>
          </div>
        )}

        {/* 3D AR Scene Visualization (Active when target detected) */}
        {targetDetected && (
          <div className="relative z-20 w-full h-full flex flex-col items-center justify-center p-4">
            {/* Target Hologram Overlay Header */}
            <div className="absolute top-16 left-4 z-20 flex items-center gap-2 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/40 text-emerald-400 text-xs font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>
                {lang === 'hi' ? 'सक्रिय एआर परिदृश्य' : 'AUGMENTED REALITY ACTIVE'}
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-amber-400 font-bold">
                {resolvedHazards.length}/{totalHazardsCount} {lang === 'hi' ? 'सुधारे गए' : 'Fixed'}
              </span>
            </div>

            {/* Render 3D Simulated Interactive Canvas based on Module */}
            <div className="relative w-full max-w-lg h-96 sm:h-[400px] flex items-center justify-center">
              {/* Module 1: PPE Worker Simulation */}
              {module.id === 'ppe-safety' && (
                <div className="relative w-72 h-80 sm:w-80 sm:h-96 flex flex-col items-center justify-center">
                  {/* Digital Platform Pedestal */}
                  <div className="absolute bottom-2 w-64 h-12 bg-gradient-to-r from-amber-500/20 via-slate-800 to-amber-500/20 rounded-full border border-amber-500/40 blur-xs" />
                  <div className="absolute bottom-4 w-52 h-4 bg-slate-800 border-2 border-amber-500/60 rounded-full" />

                  {/* 3D SVG Worker Avatar Representation */}
                  <div className="relative w-44 h-72 flex flex-col items-center transition-all duration-500">
                    {/* Head / Helmet Point */}
                    <div 
                      onClick={() => handleObjectClick(module.arScenario.interactiveObjects[0])}
                      className="group cursor-pointer relative z-30"
                    >
                      <div className={`w-14 h-14 rounded-full border-2 transition-all duration-300 flex items-center justify-center relative ${
                        resolvedHazards.includes('ppe_head')
                          ? 'bg-amber-400 border-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.8)]'
                          : 'bg-stone-700 border-rose-500 animate-pulse'
                      }`}>
                        {resolvedHazards.includes('ppe_head') ? (
                          <div className="flex flex-col items-center">
                            <span className="text-[9px] font-black text-slate-950 font-mono">IS 2925</span>
                            <div className="w-6 h-1 bg-amber-600 rounded" />
                          </div>
                        ) : (
                          <span className="text-[10px] text-rose-300 font-bold">CAP</span>
                        )}
                        {/* Hazard marker pin */}
                        <div className={`absolute -top-3 -right-3 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-slate-950 shadow-md ${
                          resolvedHazards.includes('ppe_head') ? 'bg-emerald-400' : 'bg-rose-500 text-white animate-bounce'
                        }`}>
                          {resolvedHazards.includes('ppe_head') ? '✓' : '!'}
                        </div>
                      </div>
                      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold bg-slate-950/80 px-2 py-0.5 rounded border border-slate-700 text-slate-200">
                        {resolvedHazards.includes('ppe_head') ? '✓ Safety Helmet' : '⚠ Missing Hard Hat'}
                      </span>
                    </div>

                    {/* Eyes / Goggles Point */}
                    <div 
                      onClick={() => handleObjectClick(module.arScenario.interactiveObjects[2])}
                      className="group cursor-pointer relative -mt-3 z-30"
                    >
                      <div className={`w-10 h-4 rounded-md border transition-all flex items-center justify-center ${
                        resolvedHazards.includes('ppe_eyes')
                          ? 'bg-cyan-400/80 border-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]'
                          : 'bg-transparent border-rose-400 border-dashed'
                      }`}>
                        <div className="w-3 h-2 rounded-full border border-slate-900" />
                        <div className="w-3 h-2 rounded-full border border-slate-900 ml-1" />
                      </div>
                    </div>

                    {/* Torso / Reflective Vest Point */}
                    <div 
                      onClick={() => handleObjectClick(module.arScenario.interactiveObjects[1])}
                      className="group cursor-pointer relative z-20 mt-2"
                    >
                      <div className={`w-28 h-32 rounded-xl border-2 transition-all duration-300 p-2 flex flex-col items-center justify-between relative ${
                        resolvedHazards.includes('ppe_torso')
                          ? 'bg-emerald-500 border-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.5)]'
                          : 'bg-slate-800 border-rose-500'
                      }`}>
                        {/* Reflective Stripes on vest */}
                        {resolvedHazards.includes('ppe_torso') ? (
                          <>
                            <div className="w-full h-3 bg-amber-300 rounded shadow-xs" />
                            <div className="w-full flex justify-between px-1">
                              <div className="w-3 h-14 bg-amber-300 rounded" />
                              <div className="w-3 h-14 bg-amber-300 rounded" />
                            </div>
                            <div className="w-full h-3 bg-amber-300 rounded shadow-xs" />
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-rose-400 text-xs font-bold">
                            <span>DARK CLOTH</span>
                            <span className="text-[9px] text-slate-400">Low Visibility</span>
                          </div>
                        )}
                        <div className={`absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shadow-md ${
                          resolvedHazards.includes('ppe_torso') ? 'bg-emerald-400 text-slate-950' : 'bg-rose-500 text-white animate-bounce'
                        }`}>
                          {resolvedHazards.includes('ppe_torso') ? '✓' : '!'}
                        </div>
                      </div>
                      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold bg-slate-950/80 px-2 py-0.5 rounded border border-slate-700 text-slate-200">
                        {resolvedHazards.includes('ppe_torso') ? '✓ Class 3 High-Vis' : '⚠ No High-Vis Vest'}
                      </span>
                    </div>

                    {/* Legs & Feet / Steel-Toe Boots Point */}
                    <div 
                      onClick={() => handleObjectClick(module.arScenario.interactiveObjects[3])}
                      className="group cursor-pointer relative z-10 mt-6"
                    >
                      <div className="flex gap-4">
                        <div className={`w-8 h-10 rounded-md border-2 transition-all flex items-end justify-center pb-1 ${
                          resolvedHazards.includes('ppe_feet')
                            ? 'bg-amber-700 border-amber-400 shadow-[0_0_12px_rgba(217,119,6,0.7)]'
                            : 'bg-rose-950/60 border-rose-500'
                        }`}>
                          <span className="text-[8px] font-black text-white">
                            {resolvedHazards.includes('ppe_feet') ? 'STEEL' : 'SNEAKER'}
                          </span>
                        </div>
                        <div className={`w-8 h-10 rounded-md border-2 transition-all flex items-end justify-center pb-1 ${
                          resolvedHazards.includes('ppe_feet')
                            ? 'bg-amber-700 border-amber-400 shadow-[0_0_12px_rgba(217,119,6,0.7)]'
                            : 'bg-rose-950/60 border-rose-500'
                        }`}>
                          <span className="text-[8px] font-black text-white">
                            {resolvedHazards.includes('ppe_feet') ? 'STEEL' : 'SNEAKER'}
                          </span>
                        </div>
                      </div>
                      <div className={`absolute -top-2 -right-4 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shadow-md ${
                        resolvedHazards.includes('ppe_feet') ? 'bg-emerald-400 text-slate-950' : 'bg-rose-500 text-white animate-bounce'
                      }`}>
                        {resolvedHazards.includes('ppe_feet') ? '✓' : '!'}
                      </div>
                      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold bg-slate-950/80 px-2 py-0.5 rounded border border-slate-700 text-slate-200">
                        {resolvedHazards.includes('ppe_feet') ? '✓ 200J Safety Boots' : '⚠ Casual Sneakers'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Module 2: Electrical Switchgear & LOTO Simulation */}
              {module.id === 'electrical-safety' && (
                <div className="relative w-full max-w-md h-80 sm:h-96 flex flex-col items-center justify-center">
                  {/* Standing Water Hazard / Insulated Rubber Mat */}
                  <div 
                    onClick={() => handleObjectClick(module.arScenario.interactiveObjects[2])}
                    className="absolute bottom-2 w-72 h-16 rounded-2xl cursor-pointer border-2 transition-all duration-300 flex items-center justify-center"
                  >
                    {resolvedHazards.includes('elec_water') ? (
                      <div className="w-full h-full bg-amber-800/80 border border-amber-500 rounded-xl flex items-center justify-center text-amber-200 text-xs font-mono font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                        ✓ IS 5424 DIELECTRIC RUBBER MAT
                      </div>
                    ) : (
                      <div className="w-full h-full bg-cyan-900/60 border-2 border-rose-500 rounded-xl flex items-center justify-center text-rose-300 text-xs font-bold animate-pulse">
                        ⚠ STANDING WATER PUDDLE (ELECTROCUTION RISK)
                      </div>
                    )}
                  </div>

                  {/* 415V MCC Panel Frame */}
                  <div className="relative w-64 h-64 bg-slate-900 border-4 border-slate-700 rounded-xl p-3 shadow-2xl flex flex-col justify-between -mt-8">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-1">
                      <span className="text-[10px] font-mono font-bold text-amber-400">415V MCC PANEL 02B</span>
                      <span className="text-[9px] bg-rose-600/80 text-white px-1.5 py-0.5 rounded font-black">DANGER</span>
                    </div>

                    {/* Circuit Breaker Switch with LOTO */}
                    <div 
                      onClick={() => handleObjectClick(module.arScenario.interactiveObjects[0])}
                      className="my-2 p-2 rounded-lg border-2 cursor-pointer transition-all flex items-center justify-between"
                      style={{
                        borderColor: resolvedHazards.includes('elec_switch') ? '#10b981' : '#f43f5e',
                        backgroundColor: resolvedHazards.includes('elec_switch') ? 'rgba(16,185,129,0.1)' : 'rgba(244,63,94,0.1)'
                      }}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-100">MAIN ISOLATOR SWITCH</span>
                        <span className="text-[10px] text-slate-400">
                          {resolvedHazards.includes('elec_switch') ? 'Status: OFF + LOTO LOCKED' : 'Status: LIVE / ENERGIZED'}
                        </span>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-black font-mono ${
                        resolvedHazards.includes('elec_switch') ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white animate-pulse'
                      }`}>
                        {resolvedHazards.includes('elec_switch') ? '🔒 LOTO PADLOCK' : '⚡ LIVE ON'}
                      </div>
                    </div>

                    {/* Damaged Feeder Cable Point */}
                    <div 
                      onClick={() => handleObjectClick(module.arScenario.interactiveObjects[1])}
                      className="p-2 rounded-lg border cursor-pointer transition-all flex items-center justify-between"
                      style={{
                        borderColor: resolvedHazards.includes('elec_cable') ? '#10b981' : '#f43f5e',
                        backgroundColor: resolvedHazards.includes('elec_cable') ? 'rgba(16,185,129,0.1)' : 'rgba(244,63,94,0.1)'
                      }}
                    >
                      <span className="text-xs font-medium text-slate-200">415V Feeder Cable</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        resolvedHazards.includes('elec_cable') ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {resolvedHazards.includes('elec_cable') ? '✓ Armored Conduit' : '⚠ Chafed Wire Exposed'}
                      </span>
                    </div>

                    {/* Dielectric Gloves Point */}
                    <div 
                      onClick={() => handleObjectClick(module.arScenario.interactiveObjects[3])}
                      className="p-1.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between text-xs"
                      style={{
                        borderColor: resolvedHazards.includes('elec_gloves') ? '#10b981' : '#f43f5e',
                        backgroundColor: resolvedHazards.includes('elec_gloves') ? 'rgba(16,185,129,0.1)' : 'rgba(244,63,94,0.1)'
                      }}
                    >
                      <span className="text-[11px] text-slate-200">Operator Hands</span>
                      <span className="text-[10px] font-bold text-amber-300">
                        {resolvedHazards.includes('elec_gloves') ? '✓ 1000V Dielectric Gloves' : '⚠ Bare Hands'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Module 3: Fire & Emergency Scene */}
              {module.id === 'fire-emergency' && (
                <div className="relative w-full max-w-md h-80 sm:h-96 flex flex-col items-center justify-center">
                  <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                    {/* Fire Source on Conveyor */}
                    <div 
                      onClick={() => handleObjectClick(module.arScenario.interactiveObjects[0])}
                      className="p-3 bg-slate-900 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center text-center relative"
                      style={{
                        borderColor: resolvedHazards.includes('fire_source') ? '#10b981' : '#f43f5e',
                        boxShadow: resolvedHazards.includes('fire_source') ? 'none' : '0 0 20px rgba(244,63,94,0.4)'
                      }}
                    >
                      <div className="text-2xl mb-1">
                        {resolvedHazards.includes('fire_source') ? '🛡️' : '🔥'}
                      </div>
                      <span className="text-xs font-bold text-slate-100">Belt Roller Fire</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">
                        {resolvedHazards.includes('fire_source') ? '✓ Belt Interlocked & Extinguished' : '⚠ Active Friction Flames'}
                      </span>
                      <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        resolvedHazards.includes('fire_source') ? 'bg-emerald-400 text-slate-950' : 'bg-rose-500 text-white animate-bounce'
                      }`}>
                        {resolvedHazards.includes('fire_source') ? '✓' : '!'}
                      </div>
                    </div>

                    {/* Break Glass Alarm */}
                    <div 
                      onClick={() => handleObjectClick(module.arScenario.interactiveObjects[1])}
                      className="p-3 bg-slate-900 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center text-center relative"
                      style={{
                        borderColor: resolvedHazards.includes('fire_alarm') ? '#10b981' : '#f43f5e',
                      }}
                    >
                      <div className="text-2xl mb-1">
                        {resolvedHazards.includes('fire_alarm') ? '🚨' : '🔕'}
                      </div>
                      <span className="text-xs font-bold text-slate-100">Emergency Alarm</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">
                        {resolvedHazards.includes('fire_alarm') ? '✓ Sirens & Dispatch Alerted' : '⚠ Un-pulled Manual Station'}
                      </span>
                      <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        resolvedHazards.includes('fire_alarm') ? 'bg-emerald-400 text-slate-950' : 'bg-rose-500 text-white animate-bounce'
                      }`}>
                        {resolvedHazards.includes('fire_alarm') ? '✓' : '!'}
                      </div>
                    </div>

                    {/* Blocked Emergency Door */}
                    <div 
                      onClick={() => handleObjectClick(module.arScenario.interactiveObjects[2])}
                      className="p-3 bg-slate-900 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center text-center relative"
                      style={{
                        borderColor: resolvedHazards.includes('fire_exit') ? '#10b981' : '#f43f5e',
                      }}
                    >
                      <div className="text-2xl mb-1">
                        {resolvedHazards.includes('fire_exit') ? '🟢' : '⛔'}
                      </div>
                      <span className="text-xs font-bold text-slate-100">Escape Exit Egress</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">
                        {resolvedHazards.includes('fire_exit') ? '✓ Debris Cleared / Door Open' : '⚠ Blocked with Scrap Timber'}
                      </span>
                      <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        resolvedHazards.includes('fire_exit') ? 'bg-emerald-400 text-slate-950' : 'bg-rose-500 text-white animate-bounce'
                      }`}>
                        {resolvedHazards.includes('fire_exit') ? '✓' : '!'}
                      </div>
                    </div>

                    {/* Extinguisher Selection */}
                    <div 
                      onClick={() => handleObjectClick(module.arScenario.interactiveObjects[3])}
                      className="p-3 bg-slate-900 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center text-center relative"
                      style={{
                        borderColor: resolvedHazards.includes('fire_extinguisher') ? '#10b981' : '#f43f5e',
                      }}
                    >
                      <div className="text-2xl mb-1">
                        {resolvedHazards.includes('fire_extinguisher') ? '🧯' : '⚠️'}
                      </div>
                      <span className="text-xs font-bold text-slate-100">Dry Chemical ABC</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">
                        {resolvedHazards.includes('fire_extinguisher') ? '✓ Fully Charged ABC 6kg' : '⚠ Discharged Foam Bottle'}
                      </span>
                      <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        resolvedHazards.includes('fire_extinguisher') ? 'bg-emerald-400 text-slate-950' : 'bg-rose-500 text-white animate-bounce'
                      }`}>
                        {resolvedHazards.includes('fire_extinguisher') ? '✓' : '!'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom AR HUD: Feedback & Progress Bar */}
      <div className="relative z-30 p-3.5 bg-slate-950 border-t border-slate-800 flex flex-col gap-2">
        {/* Dynamic Feedback Toast */}
        {activeFeedback && (
          <div className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
            activeFeedback.type === 'success'
              ? 'bg-emerald-950/80 text-emerald-200 border border-emerald-500/40'
              : activeFeedback.type === 'warning'
              ? 'bg-amber-950/80 text-amber-200 border border-amber-500/40'
              : 'bg-sky-950/80 text-sky-200 border border-sky-500/40'
          }`}>
            <span>{activeFeedback.text}</span>
            <button
              type="button"
              onClick={() => setActiveFeedback(null)}
              className="ml-2 text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">
              {lang === 'hi' ? 'खतरे सुधारे गए:' : 'Hazards Corrected:'}
            </span>
            <div className="w-32 sm:w-48 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${(resolvedHazards.length / totalHazardsCount) * 100}%` }}
              />
            </div>
            <span className="text-xs font-bold font-mono text-emerald-400">
              {resolvedHazards.length}/{totalHazardsCount}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-reset-ar"
              type="button"
              onClick={resetScenario}
              className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-xl border border-slate-700 transition-colors"
              title="Reset Scenario"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {isComplete ? (
              <button
                id="btn-proceed-assessment"
                type="button"
                onClick={onComplete}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all animate-pulse"
              >
                <span>{lang === 'hi' ? 'आंकलन परीक्षा दें' : 'Start Assessment'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                {lang === 'hi' ? 'सभी खतरों पर टैप करें' : 'Tap all red hazard markers to fix'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
