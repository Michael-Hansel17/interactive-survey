import React from "react";

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full bg-black/30 border border-[var(--color-border)] rounded-lg h-6 sm:h-8 overflow-hidden relative shadow-inner">
      <div
        className="bg-secondary h-full transition-all duration-500 ease-out rounded-l-md relative"
        style={{ width: `${percentage}%` }}
      >
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent"></div>
      </div>
    </div>
  );
};

export default ProgressBar;
