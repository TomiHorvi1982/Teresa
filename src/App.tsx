import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Sparkles, 
  Flame, 
  Anchor, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Coffee, 
  X, 
  User,
  Compass,
  ArrowRight
} from 'lucide-react';
import { TASKS } from './tasks';
import { PhaseId, Task, Phase } from './types';

const PHASES: Phase[] = [
  {
    id: 1,
    name: 'Teplo domova',
    subtitle: 'Nostalgie & Vděčnost',
    color: 'from-rose-800/40 to-wine-medium',
    icon: 'heart',
    description: 'Nostalgické ohlédnutí za společnými začátky a hluboké vyjádření vděku za společně prožité roky. Tón je vřelý, hojivý a dojemný.'
  },
  {
    id: 2,
    name: 'Jiskření',
    subtitle: 'Hry & Jemné doteky',
    color: 'from-amber-900/40 to-wine-medium',
    icon: 'sparkles',
    description: 'Postupný přesun od slov k tělu. Hravé pohledy, jemné masáže, mrazení na kůži a objevování vzájemné blízkosti bez tlaku.'
  },
  {
    id: 3,
    name: 'Splynutí',
    subtitle: 'Vášeň & Erotika',
    color: 'from-red-950/50 to-wine-dark',
    icon: 'flame',
    description: 'Smyslné a explicitní úkoly, které vedou k hlubokému tělesnému spojení a vášnivému, nespoutanému rozloučení s plným odevzdáním.'
  }
];

export default function App() {
  // Game Setup
  const [screen, setScreen] = useState<'welcome' | 'game'>('welcome');
  const [playerA, setPlayerA] = useState('Tom');
  const [playerB, setPlayerB] = useState('Teresa');
  
  // Game Play State
  const [currentPhase, setCurrentPhase] = useState<PhaseId>(1);
  const [shuffledTasks, setShuffledTasks] = useState<{ [key in PhaseId]: Task[] }>({
    1: [],
    2: [],
    3: []
  });
  const [taskIndex, setTaskIndex] = useState<{ [key in PhaseId]: number }>({
    1: 0,
    2: 0,
    3: 0
  });
  
  // Navigation History (so players can return to previous tasks)
  const [history, setHistory] = useState<{ phaseId: PhaseId; index: number }[]>([]);
  const [completedPhases, setCompletedPhases] = useState<PhaseId[]>([]);
  
  // Safe Harbor (Bezpečný přístav)
  const [safeHarborActive, setSafeHarborActive] = useState(false);
  const [safeHarborOption, setSafeHarborOption] = useState<'menu' | 'hug' | 'drink' | 'soften'>('menu');
  const [breathingTimer, setBreathingTimer] = useState(60);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'in' | 'out'>('in');
  
  // Audio State
  const [soundOn, setSoundOn] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscsRef = useRef<OscillatorNode[]>([]);
  const lfoRef = useRef<OscillatorNode[]>([]);
  const gainRef = useRef<GainNode | null>(null);

  // Initialize and Shuffle Tasks upon setting names
  useEffect(() => {
    const shuffle = (array: Task[]) => {
      const copy = [...array];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    setShuffledTasks({
      1: shuffle(TASKS.filter(t => t.phaseId === 1)),
      2: shuffle(TASKS.filter(t => t.phaseId === 2)),
      3: shuffle(TASKS.filter(t => t.phaseId === 3))
    });
  }, [playerA, playerB]);

  // Breathing circle logic
  useEffect(() => {
    let interval: any = null;
    if (isBreathing && breathingTimer > 0) {
      interval = setInterval(() => {
        setBreathingTimer(prev => {
          if (prev <= 1) {
            setIsBreathing(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isBreathing, breathingTimer]);

  // Breathing expansion cycle
  useEffect(() => {
    let breathingCycle: any = null;
    if (isBreathing) {
      breathingCycle = setInterval(() => {
        setBreathingPhase(prev => (prev === 'in' ? 'out' : 'in'));
      }, 4000); // 4 seconds in, 4 seconds out
    }
    return () => clearInterval(breathingCycle);
  }, [isBreathing]);

  // Audio Synthesizer (Web Audio API)
  const startSynth = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;
      
      // Warm twin drone (root 110Hz A2 + fifth 165Hz E3)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(110.00, ctx.currentTime); // A2
      
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(165.00, ctx.currentTime); // E3
      
      // Slow pulsing LFO to modulate volume/chorus
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // very slow 0.12Hz
      
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(0.05, ctx.currentTime);
      
      // Filter to keep it extremely dark, deep and velvet-soft
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, ctx.currentTime);
      filter.Q.setValueAtTime(1, ctx.currentTime);
      
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      // Soft fade-in over 3 seconds
      masterGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 3.0);
      
      // Connect
      osc1.connect(masterGain);
      osc2.connect(masterGain);
      
      lfo.connect(lfoGain);
      lfoGain.connect(osc2.frequency); // pitch modulation for chorus warmth
      
      masterGain.connect(filter);
      filter.connect(ctx.destination);
      
      osc1.start();
      osc2.start();
      lfo.start();
      
      oscsRef.current = [osc1, osc2];
      lfoRef.current = [lfo];
      gainRef.current = masterGain;
      setSoundOn(true);
    } catch (err) {
      console.warn("Synthesizer failed to start:", err);
    }
  };

  const stopSynth = () => {
    if (gainRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      try {
        gainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.0);
        setTimeout(() => {
          oscsRef.current.forEach(osc => {
            try { osc.stop(); } catch(e) {}
          });
          lfoRef.current.forEach(l => {
            try { l.stop(); } catch(e) {}
          });
          if (ctx.state !== 'closed') {
            ctx.close();
          }
          oscsRef.current = [];
          lfoRef.current = [];
          gainRef.current = null;
          audioCtxRef.current = null;
          setSoundOn(false);
        }, 1100);
      } catch (e) {
        console.error(e);
      }
    } else {
      setSoundOn(false);
    }
  };

  const toggleSound = () => {
    if (soundOn) {
      stopSynth();
    } else {
      startSynth();
    }
  };

  // Helper to replace text tokens with actual names
  const renderTaskText = (text: string) => {
    const parts = text.split(/(\{A\}|\{B\})/g);
    return parts.map((part, index) => {
      if (part === '{A}') {
        return <span key={index} className="text-rose-gold-light font-semibold rose-glow">{playerA}</span>;
      }
      if (part === '{B}') {
        return <span key={index} className="text-rose-gold-light font-semibold rose-glow">{playerB}</span>;
      }
      return part;
    });
  };

  const getTargetLabel = (target: string) => {
    if (target === 'partnerA') return `Otázka pro: ${playerA}`;
    if (target === 'partnerB') return `Otázka pro: ${playerB}`;
    return 'Společný rituál';
  };

  const getTargetIcon = (target: string) => {
    if (target === 'partnerA' || target === 'partnerB') {
      return <User className="w-4 h-4 text-rose-gold/80" />;
    }
    return <Heart className="w-4 h-4 text-red-400" />;
  };

  // Active Task for current state
  const activeTasksList = shuffledTasks[currentPhase] || [];
  const currentTask: Task | undefined = activeTasksList[taskIndex[currentPhase]];

  // Handlers
  const handleNext = () => {
    // Record history
    setHistory(prev => [...prev, { phaseId: currentPhase, index: taskIndex[currentPhase] }]);
    
    const nextIdx = taskIndex[currentPhase] + 1;
    if (nextIdx < activeTasksList.length) {
      setTaskIndex(prev => ({ ...prev, [currentPhase]: nextIdx }));
    } else {
      // Completed this phase! Mark it
      if (!completedPhases.includes(currentPhase)) {
        setCompletedPhases(prev => [...prev, currentPhase]);
      }
      
      // Auto move to next phase if available
      if (currentPhase === 1) {
        setCurrentPhase(2);
      } else if (currentPhase === 2) {
        setCurrentPhase(3);
      } else {
        // All phases completed - cycle back or let them stay
        alert("Prošli jste všechny fáze večera. Můžete pokračovat v libovolných úkolech nebo se vrátit k nejoblíbenějším.");
      }
    }
  };

  const handleSkip = () => {
    // Bring current task to the end of the deck and roll to the next one
    const currentList = [...activeTasksList];
    const currentIdx = taskIndex[currentPhase];
    const taskToMove = currentList[currentIdx];
    
    // Remove from current position and push to the back
    currentList.splice(currentIdx, 1);
    currentList.push(taskToMove);
    
    setShuffledTasks(prev => ({
      ...prev,
      [currentPhase]: currentList
    }));
    // We stay at the same index, but the card content changes!
  };

  const handleBack = () => {
    if (history.length === 0) return;
    const lastItem = history[history.length - 1];
    
    // Set phase and index back
    setCurrentPhase(lastItem.phaseId);
    setTaskIndex(prev => ({
      ...prev,
      [lastItem.phaseId]: lastItem.index
    }));
    
    // Pop last history item
    setHistory(prev => prev.slice(0, -1));
  };

  // Safe harbor activation
  const activateSafeHarbor = () => {
    setSafeHarborActive(true);
    setSafeHarborOption('menu');
    setIsBreathing(false);
    setBreathingTimer(60);
  };

  const startBreathingExercise = () => {
    setSafeHarborOption('hug');
    setBreathingTimer(60);
    setIsBreathing(true);
    setBreathingPhase('in');
  };

  const applySoften = () => {
    // Soften game: Change current task to a very warm, safe task from Phase 1
    // We can inject a custom safe task or force-switch to Phase 1
    setCurrentPhase(1);
    setTaskIndex(prev => ({ ...prev, 1: 0 })); // Reset to first nostalgic question
    setSafeHarborActive(false);
  };

  return (
    <div 
      id="app-root" 
      className="min-h-screen text-[#f5f2ed] font-serif p-6 md:p-8 flex flex-col items-center justify-between overflow-hidden relative select-none"
    >
      {/* Smooth Background Blending Layers */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #200816 0%, #100109 100%)',
          opacity: (screen === 'welcome' || currentPhase === 1) ? 1 : 0
        }}
      />
      <div 
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #261105 0%, #0d0401 100%)',
          opacity: (screen === 'game' && currentPhase === 2) ? 1 : 0
        }}
      />
      <div 
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #2a030c 0%, #0a0003 100%)',
          opacity: (screen === 'game' && currentPhase === 3) ? 1 : 0
        }}
      />
      
      {/* Abstract Background Decor */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0">
        <div className="w-[500px] h-[500px] border border-[#b76e79] rounded-full animate-pulse" />
        <div className="absolute w-[400px] h-[400px] border border-[#b76e79] rounded-full rotate-45" />
      </div>

      {/* Header Section */}
      <header className="w-full max-w-2xl flex justify-between items-center border-b border-[#b76e79]/30 pb-4 z-10">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#b76e79] opacity-70">Poslední Společná Noc</span>
          <h1 className="text-2xl font-light tracking-tight font-serif text-[#f5f2ed]">Kruh Uzavření</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2 mr-1">
            <div className={`w-3 h-3 rounded-full ${soundOn ? 'bg-[#b76e79] shadow-[0_0_8px_#b76e79]' : 'bg-[#b76e79]/20'} transition-all`} />
            <div className={`w-3 h-3 rounded-full ${screen === 'game' ? 'bg-[#b76e79]' : 'bg-[#b76e79]/20'} transition-all`} />
            <div className={`w-3 h-3 rounded-full ${safeHarborActive ? 'bg-red-500' : 'bg-[#b76e79]/20'} transition-all`} />
          </div>
          
          {/* Ambient Tone Toggle */}
          <button 
            id="ambient-sound-toggle"
            onClick={toggleSound}
            className={`p-2 rounded-full border transition-all duration-300 flex items-center justify-center ${
              soundOn 
                ? 'border-[#b76e79] bg-[#b76e79]/10 text-[#f5f2ed] shadow-[0_0_8px_#b76e79]' 
                : 'border-[#b76e79]/30 text-[#b76e79]/60 hover:border-[#b76e79]/50'
            }`}
            title={soundOn ? "Vypnout tón" : "Zapnout ambientní tón"}
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {screen === 'welcome' ? (
          // SCREEN 1: WELCOME & SETUP
          <motion.main 
            key="welcome"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="flex-1 w-full max-w-xl flex flex-col justify-center my-auto z-10"
          >
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-[0.3em] text-[#b76e79] mb-2 block">Příprava večera</span>
              <h2 className="text-3xl font-light italic leading-relaxed text-[#f5f2ed]">
                Vítejte v bezpečném prostoru rozloučení
              </h2>
            </div>

            <div className="bg-[#1a0916]/80 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-[#b76e79]/20 shadow-2xl mb-8">
              <p className="text-base leading-relaxed mb-6 text-[#f5f2ed]/90 text-center font-serif italic">
                „Tento večer nepatří minulým sporům ani budoucím obavám. Patří pouze vám dvěma, vděčnosti za společné roky, sdílené intimitě a přítomnému okamžiku.“
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#b76e79] mb-1.5 font-semibold text-center">
                    Tvoje Jméno (Partner A)
                  </label>
                  <input 
                    id="input-name-a"
                    type="text" 
                    value={playerA}
                    onChange={(e) => setPlayerA(e.target.value)}
                    placeholder="Partner A"
                    className="w-full bg-[#12020a]/60 border border-[#b76e79]/30 rounded-full px-5 py-3 text-sm text-[#f5f2ed] focus:outline-none focus:border-[#b76e79] transition-all text-center"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#b76e79] mb-1.5 font-semibold text-center">
                    Jméno tvé partnerky (Partner B)
                  </label>
                  <input 
                    id="input-name-b"
                    type="text" 
                    value={playerB}
                    onChange={(e) => setPlayerB(e.target.value)}
                    placeholder="Partner B"
                    className="w-full bg-[#12020a]/60 border border-[#b76e79]/30 rounded-full px-5 py-3 text-sm text-[#f5f2ed] focus:outline-none focus:border-[#b76e79] transition-all text-center"
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3 text-xs text-[#f5f2ed]/60 leading-relaxed justify-center items-center">
                <Compass className="w-5 h-5 text-[#b76e79] shrink-0" />
                <p className="text-center font-sans">
                  Aplikace vás provede 3 fázemi od vzpomínek po tělesné splynutí.
                </p>
              </div>
            </div>

            <button
              id="start-session-button"
              onClick={() => {
                setScreen('game');
                startSynth();
              }}
              className="w-full py-4 rounded-full bg-[#b76e79] text-[#12020a] text-sm font-bold tracking-widest hover:opacity-90 transition-opacity uppercase shadow-lg shadow-[#b76e79]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              Vstoupit do ticha ložnice
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.main>
        ) : (
          // SCREEN 2: MAIN GAME BOARD
          <motion.main 
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 w-full max-w-2xl flex flex-col justify-between py-6 z-10 relative"
          >
            {/* Phase Stepper Tabs */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {PHASES.map((phase) => {
                const isActive = currentPhase === phase.id;
                const isCompleted = completedPhases.includes(phase.id);
                return (
                  <button
                    id={`phase-tab-${phase.id}`}
                    key={phase.id}
                    onClick={() => {
                      setCurrentPhase(phase.id);
                      setHistory([]);
                    }}
                    className={`flex flex-col items-center py-2 px-3 rounded-full border text-center transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'bg-[#b76e79]/20 border-[#b76e79] text-[#f5f2ed] shadow-[0_0_10px_rgba(183,110,121,0.2)]' 
                        : isCompleted
                        ? 'border-emerald-800/40 bg-emerald-950/20 text-emerald-300/80'
                        : 'border-[#b76e79]/10 bg-[#1a0916]/20 text-[#b76e79]/50 hover:border-[#b76e79]/30'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      {phase.id === 1 && <Heart className={`w-3.5 h-3.5 ${isActive ? 'text-[#b76e79]' : 'opacity-60'}`} />}
                      {phase.id === 2 && <Sparkles className={`w-3.5 h-3.5 ${isActive ? 'text-[#b76e79]' : 'opacity-60'}`} />}
                      {phase.id === 3 && <Flame className={`w-3.5 h-3.5 ${isActive ? 'text-[#b76e79]' : 'opacity-60'}`} />}
                      <span className="font-sans text-[10px] font-bold tracking-widest uppercase">
                        {phase.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Stage Description Bar */}
            <div className="text-center mb-4 px-4">
              <span className="text-xs uppercase tracking-[0.25em] text-[#b76e79]/70 font-sans block mb-1">
                {PHASES[currentPhase - 1].subtitle}
              </span>
              <p className="text-xs text-[#f5f2ed]/60 italic font-serif leading-relaxed max-w-lg mx-auto">
                {PHASES[currentPhase - 1].description}
              </p>
            </div>

            {/* Task Oracle Card Area */}
            <div className="flex-1 flex items-center justify-center my-4 min-h-[340px] md:min-h-[380px] w-full max-w-xl mx-auto">
              <AnimatePresence mode="wait">
                {currentTask ? (
                  <motion.div
                    id={`task-card-${currentTask.id}`}
                    key={currentTask.id}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="w-full bg-[#1a0916]/80 backdrop-blur-md border border-[#b76e79]/20 rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col justify-between min-h-[340px] md:min-h-[380px] relative overflow-hidden text-center"
                  >
                    {/* Abstract circular background elements in card */}
                    <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center">
                      <div className="w-[300px] h-[300px] border border-[#b76e79] rounded-full animate-pulse" />
                    </div>

                    {/* Card Header Info */}
                    <div className="flex justify-between items-center border-b border-[#b76e79]/20 pb-3 mb-4 z-10 font-sans">
                      <div className="flex items-center gap-1.5 bg-[#b76e79]/10 px-3 py-1 rounded-full border border-[#b76e79]/20">
                        {getTargetIcon(currentTask.target)}
                        <span className="text-[10px] tracking-wider uppercase font-semibold text-[#b76e79]">
                          {getTargetLabel(currentTask.target)}
                        </span>
                      </div>
                      
                      <span className="text-[10px] text-[#f5f2ed]/50 font-mono">
                        Karta {taskIndex[currentPhase] + 1} / {activeTasksList.length}
                      </span>
                    </div>

                    {/* Card Content Text */}
                    <div className="flex-1 flex flex-col justify-center my-auto z-10 px-2">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-[#b76e79] mb-3 block">Fáze {currentPhase}: {PHASES[currentPhase - 1].name}</span>
                      <h2 className="text-2xl md:text-3xl font-light italic leading-relaxed text-[#f5f2ed]">
                        „{renderTaskText(currentTask.text)}“
                      </h2>

                      {currentTask.description && (
                        <p className="text-xs italic text-[#f5f2ed]/70 font-sans mt-4 max-w-md mx-auto leading-relaxed">
                          {currentTask.description}
                        </p>
                      )}
                    </div>

                    {/* Card Footer branding */}
                    <div className="mt-4 pt-3 border-t border-[#b76e79]/10 flex justify-center items-center opacity-30 z-10">
                      <Heart className="w-3.5 h-3.5 text-[#b76e79] fill-[#b76e79]" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="no-task"
                    className="w-full bg-[#1a0916]/80 backdrop-blur-md border border-[#b76e79]/20 rounded-3xl p-10 flex flex-col justify-center items-center text-center min-h-[340px]"
                  >
                    <p className="text-sm text-[#b76e79] font-serif italic">
                      V této fázi momentálně nejsou k dispozici žádné další karty. Můžete se vrátit, nebo přepnout fázi výše.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Main Interactive Controls */}
            <div className="mt-4 space-y-4 z-10">
              <button
                id="next-task-button"
                onClick={handleNext}
                disabled={!currentTask}
                className="w-full py-4 rounded-full bg-[#b76e79] text-[#12020a] text-sm font-bold tracking-widest hover:opacity-90 transition-opacity uppercase shadow-lg shadow-[#b76e79]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
              >
                <span>Splněno & Pokračovat</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-4">
                <button
                  id="skip-task-button"
                  onClick={handleSkip}
                  disabled={!currentTask || activeTasksList.length <= 1}
                  className="px-6 py-3 rounded-full border border-[#b76e79]/40 text-xs tracking-widest hover:bg-[#b76e79]/10 transition-colors uppercase flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-30"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Zkusit jiný
                </button>

                <button
                  id="back-task-button"
                  onClick={handleBack}
                  disabled={history.length === 0}
                  className="px-6 py-3 rounded-full border border-[#b76e79]/10 text-xs tracking-widest hover:bg-[#b76e79]/5 transition-colors uppercase flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-30 text-[#f5f2ed]/50"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Předchozí
                </button>
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Footer Controls matching the grid layout from the design template */}
      {screen === 'game' && (
        <footer className="w-full max-w-2xl mt-6 pt-4 border-t border-[#b76e79]/20 grid grid-cols-3 items-end z-10">
          {/* Progress Tracking */}
          <div className="flex flex-col gap-1.5 items-start">
            <span className="text-[10px] uppercase tracking-widest text-[#f5f2ed]/50 font-sans">Postup večerem</span>
            <div className="w-40 h-[2px] bg-[#b76e79]/20 relative">
              <div 
                className="absolute top-0 left-0 h-full bg-[#b76e79] shadow-[0_0_10px_#b76e79] transition-all duration-500" 
                style={{ width: `${(completedPhases.length / 3) * 100 || 15}%` }}
              />
            </div>
            <div className="flex justify-between w-40 text-[9px] uppercase tracking-tighter text-[#f5f2ed]/40 font-sans">
              <span>Nostalgie</span>
              <span>Doteky</span>
              <span>Splynutí</span>
            </div>
          </div>

          {/* Safe Harbor Button */}
          <div className="flex justify-center">
            <button 
              id="safe-harbor-trigger"
              onClick={activateSafeHarbor}
              className="group flex flex-col items-center gap-1.5 transition-all cursor-pointer"
            >
              <div className="w-11 h-11 rounded-full border border-red-900/50 flex items-center justify-center bg-red-950/20 group-hover:bg-red-900/30 transition-all shadow-md">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b76e79" strokeWidth="1.5">
                  <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"/>
                </svg>
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#b76e79] font-sans font-medium">Bezpečný přístav</span>
            </button>
          </div>

          {/* Phase Navigation Markers */}
          <div className="flex justify-end gap-6 font-sans">
            <div className={`flex flex-col items-end transition-opacity duration-300 ${currentPhase === 1 ? 'opacity-100 border-r-2 border-[#b76e79] pr-3' : 'opacity-35'}`}>
              <span className="text-xs font-bold text-[#b76e79]">01</span>
              <span className="text-[9px] uppercase tracking-widest font-semibold">Nostalgie</span>
            </div>
            <div className={`flex flex-col items-end transition-opacity duration-300 ${currentPhase === 2 ? 'opacity-100 border-r-2 border-[#b76e79] pr-3' : 'opacity-35'}`}>
              <span className="text-xs font-bold text-[#b76e79]">02</span>
              <span className="text-[9px] uppercase tracking-widest font-semibold">Jiskření</span>
            </div>
            <div className={`flex flex-col items-end transition-opacity duration-300 ${currentPhase === 3 ? 'opacity-100 border-r-2 border-[#b76e79] pr-3' : 'opacity-35'}`}>
              <span className="text-xs font-bold text-[#b76e79]">03</span>
              <span className="text-[9px] uppercase tracking-widest font-semibold">Splynutí</span>
            </div>
          </div>
        </footer>
      )}

      {/* Decorative Vignette */}
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(12,2,10,0.9)] z-40" />

      {/* SAFE HARBOR MODAL OVERLAY */}
      <AnimatePresence>
        {safeHarborActive && (
          <motion.div 
            id="safe-harbor-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#12020a]/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md bg-[#1a0916]/95 border border-[#b76e79]/30 rounded-3xl p-8 text-center relative shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
              
              {/* Close Button */}
              <button 
                id="safe-harbor-close"
                onClick={() => setSafeHarborActive(false)}
                className="absolute top-5 right-5 text-[#b76e79]/60 hover:text-[#b76e79] p-1.5 rounded-full hover:bg-[#b76e79]/10 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex justify-center mb-4">
                <div className="p-4 bg-red-950/40 border border-red-900/30 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b76e79" strokeWidth="1.5">
                    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"/>
                  </svg>
                </div>
              </div>

              {safeHarborOption === 'menu' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl text-[#f5f2ed] font-light tracking-wide mb-2">
                      BEZPEČNÝ PŘÍSTAV
                    </h2>
                    <p className="text-xs text-[#f5f2ed]/80 leading-relaxed font-serif italic max-w-xs mx-auto">
                      Emoce mohou být v tuto noc nečekaně hluboké a silné. To je naprosto v pořádku. Pokud potřebujete zastavit nebo odbočit k bezpečné něze, vyberte si:
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button
                      id="safe-option-hug"
                      onClick={startBreathingExercise}
                      className="w-full bg-[#1a0916]/80 border border-[#b76e79]/30 hover:bg-[#b76e79]/10 text-[#f5f2ed] py-3.5 px-4 rounded-full text-xs font-sans font-semibold tracking-widest uppercase transition-all cursor-pointer"
                    >
                      🫂 Společné tiché objetí (1 min)
                    </button>

                    <button
                      id="safe-option-drink"
                      onClick={() => setSafeHarborOption('drink')}
                      className="w-full bg-[#1a0916]/80 border border-[#b76e79]/30 hover:bg-[#b76e79]/10 text-[#f5f2ed] py-3.5 px-4 rounded-full text-xs font-sans font-semibold tracking-widest uppercase transition-all cursor-pointer"
                    >
                      ☕ Pauza na sklenku / rozhovor
                    </button>

                    <button
                      id="safe-option-soften"
                      onClick={applySoften}
                      className="w-full bg-[#b76e79]/20 border border-[#b76e79]/40 hover:bg-[#b76e79]/30 text-[#f5f2ed] py-3.5 px-4 rounded-full text-xs font-sans font-semibold tracking-widest uppercase transition-all cursor-pointer"
                    >
                      💫 Zjemnit a přejít k nostalgii
                    </button>
                  </div>

                  <button
                    id="safe-option-return"
                    onClick={() => setSafeHarborActive(false)}
                    className="w-full bg-[#b76e79] text-[#12020a] hover:opacity-90 py-3.5 px-4 rounded-full text-xs font-sans font-bold tracking-widest uppercase transition-all cursor-pointer"
                  >
                    Zpět ke hře
                  </button>
                </div>
              )}

              {/* OPTION 1: 1-MINUTE CO-BREATHING HUG */}
              {safeHarborOption === 'hug' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-xl text-[#f5f2ed] font-light tracking-wide mb-2">
                      TICHÉ SPOLEČNÉ OBJETÍ
                    </h3>
                    <p className="text-xs text-[#f5f2ed]/80 leading-relaxed font-serif italic max-w-xs mx-auto mb-4">
                      Zavřete oči. Obejměte se pevně celým tělem. Položte si hlavy na rameno a synchronizujte svůj dech s tímto jemně pulzujícím dechovým kruhem.
                    </p>
                  </div>

                  {/* Pulsing Breathing Circle */}
                  <div className="flex justify-center items-center py-6">
                    <motion.div
                      id="breathing-pulsator"
                      animate={{
                        scale: breathingPhase === 'in' ? [1, 1.45] : [1.45, 1],
                      }}
                      transition={{
                        duration: 4,
                        ease: "easeInOut",
                        repeat: Infinity
                      }}
                      className="w-24 h-24 rounded-full bg-gradient-to-r from-[#b76e79]/30 to-[#b76e79]/10 border border-[#b76e79] flex items-center justify-center relative shadow-[0_0_30px_rgba(183,110,121,0.2)]"
                    >
                      <span className="text-[10px] text-[#f5f2ed] font-sans font-bold tracking-wider">
                        {breathingPhase === 'in' ? 'NÁDECH' : 'VÝDECH'}
                      </span>
                    </motion.div>
                  </div>

                  {/* Timer & Controls */}
                  <div className="space-y-4">
                    <div className="text-3xl font-mono text-[#b76e79] font-bold tracking-widest">
                      {Math.floor(breathingTimer / 60)}:{(breathingTimer % 60).toString().padStart(2, '0')}
                    </div>

                    {!isBreathing && breathingTimer > 0 && (
                      <button
                        id="start-breathing-button"
                        onClick={() => setIsBreathing(true)}
                        className="w-full bg-[#b76e79] text-[#12020a] py-3 rounded-full text-xs font-sans font-bold uppercase tracking-widest transition-all cursor-pointer"
                      >
                        Začít dýchání
                      </button>
                    )}

                    <div className="flex gap-3">
                      <button
                        id="reset-breathing-button"
                        onClick={() => {
                          setIsBreathing(false);
                          setBreathingTimer(60);
                        }}
                        className="flex-1 bg-[#1a0916] border border-[#b76e79]/30 hover:bg-[#b76e79]/10 text-[#f5f2ed] py-2.5 rounded-full text-xs font-sans font-semibold tracking-wider cursor-pointer"
                      >
                        Resetovat
                      </button>
                      <button
                        id="back-to-harbor-menu"
                        onClick={() => {
                          setIsBreathing(false);
                          setSafeHarborOption('menu');
                        }}
                        className="flex-1 bg-[#b76e79]/10 text-[#f5f2ed] py-2.5 rounded-full text-xs font-sans font-semibold tracking-wider cursor-pointer"
                      >
                        Zpět
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* OPTION 2: DRINK BREAK */}
              {safeHarborOption === 'drink' && (
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <Coffee className="w-10 h-10 text-[#b76e79]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-[#f5f2ed] font-light tracking-wide mb-2">
                      Čas na pauzu
                    </h3>
                    <div className="text-xs text-[#f5f2ed]/80 leading-relaxed font-serif space-y-3 text-left max-w-xs mx-auto">
                      <p>
                        Dejte si na chvíli pauzu od obrazovek i úkolů.
                      </p>
                      <p>
                        • Napijte se vody, čaje nebo si nalijte sklenku vína.<br />
                        • Jemně se pohlaďte a promluvte si o něčem obyčejném.<br />
                        • Uvědomte si ticho a bezpečí místnosti, kde se nacházíte.
                      </p>
                      <p className="italic text-[#b76e79]/70 text-center">
                        Nikam nespěcháte. Tento večer plyne podle vašeho tempa.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      id="drink-back-to-menu"
                      onClick={() => setSafeHarborOption('menu')}
                      className="flex-1 bg-[#1a0916] border border-[#b76e79]/30 hover:bg-[#b76e79]/10 text-[#f5f2ed] py-2.5 rounded-full text-xs font-sans font-semibold tracking-wider cursor-pointer"
                    >
                      Možnosti
                    </button>
                    <button
                      id="drink-return-to-game"
                      onClick={() => setSafeHarborActive(false)}
                      className="flex-1 bg-[#b76e79] text-[#12020a] py-2.5 rounded-full text-xs font-sans font-bold tracking-widest uppercase cursor-pointer"
                    >
                      Pokračovat
                    </button>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
