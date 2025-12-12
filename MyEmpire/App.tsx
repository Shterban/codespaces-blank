
import React, { useState, useEffect, useRef } from 'react';
import Background from './components/Background';
import MainMenu from './components/MainMenu';
import StoryBook from './components/StoryBook';
import HUD from './components/HUD';
import WarRoom from './components/WarRoom';
import { Resources, ViewState, Scene, Choice } from './types';
import { INITIAL_RESOURCES, SCENES, INITIAL_PROVINCES } from './constants';
import { Volume2, VolumeX } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('MENU');
  const [resources, setResources] = useState<Resources>(INITIAL_RESOURCES);
  const [currentSceneId, setCurrentSceneId] = useState<string>('start');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false); // Default off until interaction
  const audioRef = useRef<HTMLAudioElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Play music on first interaction if possible
  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current && isMusicPlaying) {
        try {
          audioRef.current.volume = 0.4;
          await audioRef.current.play();
        } catch (e) {
          console.log("Autoplay blocked", e);
        }
      } else if (audioRef.current) {
        audioRef.current.pause();
      }
    };
    playAudio();
  }, [isMusicPlaying]);

  const handleStartGame = () => {
    setIsMusicPlaying(true);
    setView('GAME_VN');
    setResources(INITIAL_RESOURCES);
    setCurrentSceneId('start');
  };

  const handleChoice = (choice: Choice) => {
    if (choice.effect) {
      setResources(prev => ({ ...prev, ...choice.effect!(prev) }));
    }

    if (choice.nextSceneId === 'MAP_VIEW') {
      setView('GAME_MAP');
    } else {
      setCurrentSceneId(choice.nextSceneId);
    }
  };

  const handleNextTurn = () => {
    setResources(prev => {
        const income = INITIAL_PROVINCES.reduce((acc, p) => acc + (p.status !== 'occupied' ? p.income : 0), 0);
        return {
            ...prev,
            gold: prev.gold + income,
            food: prev.food - 5, // Army consumption
            day: prev.day + 1
        };
    });
  };

  const toggleMusic = () => setIsMusicPlaying(!isMusicPlaying);

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-[#19130f] text-[#fff5da] selection:bg-[#a30016] selection:text-white">
      {/* Global Assets */}
      <audio ref={audioRef} loop src="https://284baef4-3d14-4ca5-8247-4811f0d6b14b.selstorage.ru/6939ac45348aea33a2561817-1765387366953-380075963-music-1765387366953.mp3" />
      
      {/* Background Layer */}
      <Background />

      {/* Main Content Switcher */}
      {view === 'MENU' && (
        <MainMenu 
          onStart={handleStartGame} 
          onSettings={() => setSettingsOpen(true)}
        />
      )}

      {(view === 'GAME_VN' || view === 'GAME_MAP') && (
        <>
          <HUD resources={resources} />
          {view === 'GAME_VN' && (
            <StoryBook 
              scene={SCENES[currentSceneId]} 
              onChoice={handleChoice} 
            />
          )}
          {view === 'GAME_MAP' && (
            <WarRoom 
              resources={resources} 
              onBackToStory={() => setView('GAME_VN')} 
              onNextTurn={handleNextTurn}
            />
          )}
        </>
      )}

      {/* Global Mute Button */}
      <button 
        onClick={toggleMusic}
        className="fixed bottom-4 right-4 z-[100] p-3 rounded-full bg-[#19130f]/50 hover:bg-[#a30016] text-[#fff5da] transition-colors border border-[#5c4033]"
      >
        {isMusicPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      {/* Settings Modal (Simplified) */}
      {settingsOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 animate-fadeIn">
          <div className="bg-[#1a1310e8] p-8 rounded-2xl border border-[#5c4033] min-w-[300px] flex flex-col items-center gap-4 shadow-2xl"
               style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/leather.png')" }}>
            <h2 className="font-cinzel text-2xl text-[#ffe7a8]">Настройки</h2>
            <div className="flex items-center justify-between w-full gap-4">
              <span className="font-cinzel text-[#ffeaa8]">Музыка</span>
              <button onClick={toggleMusic} className={`w-12 h-6 rounded-full relative transition-colors ${isMusicPlaying ? 'bg-[#9f2035]' : 'bg-[#b8a27b]'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-[#fff6e0] transition-all shadow-md ${isMusicPlaying ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
            <button 
              onClick={() => setSettingsOpen(false)}
              className="mt-4 font-cinzel text-[#ffe8b2] hover:text-[#a30016] transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
