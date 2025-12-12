
import React, { useState } from 'react';

interface MainMenuProps {
  onStart: () => void;
  onSettings: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStart, onSettings }) => {
  const [fading, setFading] = useState(false);

  const handleStart = () => {
    setFading(true);
    setTimeout(onStart, 600);
  };

  return (
    <div className={`fixed inset-0 z-10 flex flex-col items-center justify-center transition-opacity duration-700 ${fading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <h1 className="font-cinzel text-5xl md:text-7xl text-[#fff5da] tracking-[7px] font-bold text-center mb-14 drop-shadow-[0_4px_14px_rgba(39,16,15,0.74)]">
        ВТОРОЕ ДЫХАНИЕ<br/>ИМПЕРИИ
      </h1>
      
      <div className="flex flex-col items-center gap-7">
        <button 
          onClick={handleStart}
          className="font-cinzel text-2xl tracking-[3.5px] min-w-[260px] rounded-lg cursor-pointer py-3 px-12 text-center bg-[#190d0f42] text-[#fee9a6] hover:bg-[#a30016] hover:text-[#fffbe5] hover:shadow-[0_0_20px_#ffb3b33a] active:bg-[#fffbe5] active:text-[#a30016] transition-all duration-200"
        >
          НОВАЯ ИГРА
        </button>
        
        <button 
          onClick={() => alert("Сохранения пока не реализованы")}
          className="font-cinzel text-2xl tracking-[3.5px] min-w-[260px] rounded-lg cursor-pointer py-3 px-12 text-center bg-[#190d0f42] text-[#fee9a6] hover:bg-[#a30016] hover:text-[#fffbe5] hover:shadow-[0_0_20px_#ffb3b33a] active:bg-[#fffbe5] active:text-[#a30016] transition-all duration-200"
        >
          ПРОДОЛЖИТЬ
        </button>

        <button 
          onClick={onSettings}
          className="font-cinzel text-2xl tracking-[3.5px] min-w-[260px] rounded-lg cursor-pointer py-3 px-12 text-center bg-[#190d0f42] text-[#fee9a6] hover:bg-[#a30016] hover:text-[#fffbe5] hover:shadow-[0_0_20px_#ffb3b33a] active:bg-[#fffbe5] active:text-[#a30016] transition-all duration-200"
        >
          НАСТРОЙКИ
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
