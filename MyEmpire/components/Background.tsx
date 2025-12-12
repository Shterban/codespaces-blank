
import React from 'react';

const Background: React.FC = () => {
  return (
    <>
      <div className="fixed inset-0 z-[1] bg-[radial-gradient(ellipse_at_50%_100%,#30201d_0%,rgba(16,8,16,0.78)_90%)] pointer-events-none" />
      <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden">
        {/* Fire base */}
        <div className="absolute bottom-0 left-[9vw] w-[82vw] h-[170px] bg-[radial-gradient(ellipse_at_45%_90%,rgba(208,60,25,0.32)_20%,rgba(32,16,8,0.0)_95%)] animate-firepulse opacity-50" />
        
        {/* Sparks */}
        <div className="absolute inset-0">
           <div className="absolute w-[3px] h-[3px] rounded-full bg-[radial-gradient(circle,#ff6b00_0%,#ff4500_40%,transparent_80%)] shadow-[0_0_8px_#ff6b00] left-[15vw] bottom-[40px] animate-sparkfly1" />
           <div className="absolute w-[3px] h-[3px] rounded-full bg-[radial-gradient(circle,#fff_0%,#ffe4b5_50%,transparent_80%)] shadow-[0_0_6px_#fff] left-[22vw] bottom-[30px] animate-sparkfly2 delay-700" />
           <div className="absolute w-[3px] h-[3px] rounded-full bg-[radial-gradient(circle,#ff6b00_0%,#ff4500_40%,transparent_80%)] shadow-[0_0_8px_#ff6b00] left-[46vw] bottom-[60px] animate-sparkfly3 delay-[1.6s]" />
           <div className="absolute w-[3px] h-[3px] rounded-full bg-[radial-gradient(circle,#fff_0%,#ffe4b5_50%,transparent_80%)] shadow-[0_0_6px_#fff] left-[61vw] bottom-[46px] animate-sparkfly4 delay-[2.4s]" />
           <div className="absolute w-[3px] h-[3px] rounded-full bg-[radial-gradient(circle,#ff6b00_0%,#ff4500_40%,transparent_80%)] shadow-[0_0_8px_#ff6b00] left-[80vw] bottom-[41px] animate-sparkfly1 delay-[3.2s]" />
        </div>
      </div>
    </>
  );
};

export default Background;
