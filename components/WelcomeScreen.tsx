"use client";

import React from "react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center animate-in fade-in duration-1000">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
        Welcome to the Survey Zone
      </h2>
      <p className="text-gray-300 mb-8 max-w-md mx-auto">
        Get ready for a few questions. Your answer is valuable to us.
      </p>
      <button
        onClick={onStart}
        className="text-lg font-bold text-white bg-transparent border-2 border-primary py-3 px-8 rounded-xl transition-all uppercase tracking-wider shadow-[0_0_15px_var(--color-primary)] hover:bg-primary/20 hover:scale-105 active:scale-100"
      >
        Start Survey
      </button>
    </div>
  );
};

export default WelcomeScreen;
