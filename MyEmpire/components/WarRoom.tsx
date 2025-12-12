
import React, { useState } from 'react';
import { Province, Resources } from '../types';
import { INITIAL_PROVINCES } from '../constants';

interface WarRoomProps {
  resources: Resources;
  onBackToStory: () => void;
  onNextTurn: () => void;
}

const WarRoom: React.FC<WarRoomProps> = ({ resources, onBackToStory, onNextTurn }) => {
  const [notif, setNotif] = useState<string | null>(null);

  const handleNextTurn = () => {
    onNextTurn();
    setNotif("Ход завершен! Налоги собраны.");
    setTimeout(() => setNotif(null), 2000);
  };

  const totalIncome = INITIAL_PROVINCES.reduce((acc, p) => acc + (p.status !== 'occupied' ? p.income : 0), 0);

  return (
    <div className="fixed inset-0 z-30 bg-[#140e0c] flex flex-col items-center pt-[12vh] animate-fadeIn">
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30 pointer-events-none" />
       
       <div className="z-10 text-center mb-6">
         <h2 className="font-cinzel text-3xl text-[#d4b483]">Военный Совет</h2>
         <p className="font-cinzel text-[#b8a27b] text-sm mt-1">День {resources.day}</p>
       </div>

       <div className="relative w-[90vw] max-w-4xl h-[55vh] bg-[#2a1f1b] border-4 border-[#5c4033] rounded-xl shadow-2xl p-4 overflow-hidden z-10 flex flex-wrap gap-4 justify-center items-center content-center">
          {/* Abstract Map Representation */}
          {INITIAL_PROVINCES.map((prov) => (
            <div 
              key={prov.id}
              className={`w-40 h-32 rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105 p-2 text-center
                ${prov.status === 'loyal' ? 'bg-green-900/40 border-green-600/50 hover:bg-green-900/60' : ''}
                ${prov.status === 'rebellious' ? 'bg-red-900/40 border-red-600/50 hover:bg-red-900/60' : ''}
                ${prov.status === 'occupied' ? 'bg-gray-800/60 border-gray-600/50 hover:bg-gray-800/80' : ''}
              `}
            >
              <h3 className="font-cinzel text-[#eaddcf] text-sm font-bold mb-1">{prov.name}</h3>
              <span className={`text-xs uppercase tracking-widest mb-2
                 ${prov.status === 'loyal' ? 'text-green-400' : ''}
                 ${prov.status === 'rebellious' ? 'text-red-400' : ''}
                 ${prov.status === 'occupied' ? 'text-gray-400' : ''}
              `}>
                {prov.status === 'loyal' ? 'Лояльность' : prov.status === 'rebellious' ? 'Мятеж' : 'Оккупация'}
              </span>
              <div className="text-xs text-[#b8a27b] flex gap-1 items-center">
                 <span>+{prov.income} Золота</span>
              </div>
            </div>
          ))}
          
          {/* Notification */}
          {notif && (
            <div className="absolute top-4 bg-green-900/80 text-green-100 px-4 py-2 rounded border border-green-500 animate-fadeIn">
              {notif}
            </div>
          )}
       </div>

       <div className="mt-6 flex flex-col md:flex-row gap-4 z-10 items-center">
          <button 
            onClick={onBackToStory}
            className="font-cinzel text-lg px-8 py-3 bg-[#3a2822] text-[#d4b483] border border-[#5c4033] rounded hover:bg-[#5c4033] hover:text-white transition-colors shadow-lg w-64"
          >
            Вернуться к Истории
          </button>
          
          <button 
            onClick={handleNextTurn}
            className="font-cinzel text-lg px-8 py-3 bg-[#a30016] text-[#fff5da] border border-[#d03c19] rounded hover:bg-[#c9001b] hover:shadow-[0_0_15px_#a30016] transition-all shadow-lg w-64"
          >
            Завершить Ход (+{totalIncome} Золота)
          </button>
       </div>
    </div>
  );
};

export default WarRoom;
