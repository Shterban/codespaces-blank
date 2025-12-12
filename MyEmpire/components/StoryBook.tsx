
import React, { useEffect, useState, useRef } from 'react';
import { Scene, Choice } from '../types';

interface StoryBookProps {
  scene: Scene;
  onChoice: (choice: Choice) => void;
}

const StoryBook: React.FC<StoryBookProps> = ({ scene, onChoice }) => {
  const [visibleParagraphs, setVisibleParagraphs] = useState<number>(0);
  const [showChoices, setShowChoices] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset state when scene changes
  useEffect(() => {
    setVisibleParagraphs(0);
    setShowChoices(false);
    
    // Auto-advance logic
    let currentPara = 0;
    const interval = setInterval(() => {
      if (currentPara < scene.paragraphs.length) {
        setVisibleParagraphs(prev => prev + 1);
        currentPara++;
      } else {
        setShowChoices(true);
        clearInterval(interval);
      }
    }, 1200); // Delay between paragraphs

    return () => clearInterval(interval);
  }, [scene]);

  // Auto scroll
  useEffect(() => {
    if (containerRef.current) {
        // Smooth scroll to bottom
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }, [visibleParagraphs, showChoices]);

  return (
    <div className="w-full min-h-screen flex justify-center items-start pt-[12vh] pb-[10vh] animate-fadeInBook z-20 relative px-4">
      <div 
        ref={containerRef}
        className="relative bg-[#f4ecd9] text-[#432e1c] max-w-2xl w-full min-h-[500px] p-8 md:p-14 shadow-[0_18px_80px_rgba(46,35,27,0.57)] border-[5px] border-[#b5ac93] rounded-[24px_24px_26px_26px] font-imfell flex flex-col items-center"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/paper-fibers.png')" }}
      >
        <h2 className="text-[#7a5644] text-2xl md:text-3xl font-bold mb-8 text-center tracking-wider drop-shadow-[0_1px_1px_#ffe9cc]">
          {scene.title}
        </h2>

        <div className="w-full flex flex-col gap-6 text-lg md:text-xl leading-relaxed text-center">
          {scene.paragraphs.map((para, index) => (
            <div 
              key={index} 
              className={`transition-opacity duration-1000 ${index < visibleParagraphs ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}
              dangerouslySetInnerHTML={{ __html: para }} 
            />
          ))}
        </div>

        {/* Decor Vine */}
        <div className={`mt-8 mb-8 w-full transition-opacity duration-1000 ${showChoices ? 'opacity-100' : 'opacity-0'}`}>
          <img src="https://i.imgur.com/v3f0Nf2.png" alt="decor" className="w-32 mx-auto opacity-30" />
        </div>

        {/* Choices */}
        <div className={`w-full flex flex-col items-center gap-4 transition-all duration-700 ${showChoices ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          {scene.choices.map((choice, idx) => (
            <button
              key={idx}
              onClick={() => onChoice(choice)}
              className="w-full md:w-auto min-w-[240px] px-6 py-3 bg-[#f2e0c2bf] hover:bg-[#e3d2a5] text-[#77533c] hover:text-[#54321b] font-imfell text-lg md:text-xl rounded-lg shadow-sm hover:shadow-md transition-all duration-200 tracking-wider"
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryBook;
