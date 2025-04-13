import React, { useEffect } from "react";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-blue-200 to-[#0db5b8]">
      <div className="flex flex-col items-center animate-splash-bounce">
        <div className="w-72 h-72 rounded-full overflow-hidden">
          <img
            src="/assets/ParKodo_logo.png"
            alt="ParKodo Logo"
            className="w-full h-full object-cover drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;