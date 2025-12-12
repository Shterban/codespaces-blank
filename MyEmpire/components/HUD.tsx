
import React from 'react';
import { Resources } from '../types';
import { Coins, Swords, Scale, Wheat } from 'lucide-react';

interface HUDProps {
  resources: Resources;
}

const HUD: React.FC<HUDProps> = ({ resources }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center py-2 pointer-events-none">
      <div className="bg-[#1f1612e6] backdrop-blur-sm border border-[#5c4033] rounded-b-xl px-6 py-2 flex gap-8 shadow-2xl pointer-events-auto">
        <ResourceItem icon={<Coins size={18} className="text-yellow-500" />} value={resources.gold} label="Золото" />
        <ResourceItem icon={<Swords size={18} className="text-red-400" />} value={resources.army} label="Армия" />
        <ResourceItem icon={<Scale size={18} className="text-blue-300" />} value={resources.legitimacy} label="Власть" />
        <ResourceItem icon={<Wheat size={18} className="text-green-400" />} value={resources.food} label="Еда" />
      </div>
    </div>
  );
};

const ResourceItem: React.FC<{ icon: React.ReactNode; value: number; label: string }> = ({ icon, value, label }) => (
  <div className="flex items-center gap-2 font-cinzel text-[#eaddcf]">
    {icon}
    <div className="flex flex-col items-start leading-none">
      <span className="text-sm font-bold">{value}</span>
      <span className="text-[10px] opacity-70 tracking-widest uppercase">{label}</span>
    </div>
  </div>
);

export default HUD;
