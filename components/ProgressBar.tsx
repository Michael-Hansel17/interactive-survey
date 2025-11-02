import React from "react";

interface ProgressBarProps {
    current: number;
    total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
    const percentage = total > 0 ? (current / total) * 100 : 0;

    return (
        <div className="w-full bg-white border-2 border-black rounded-none p-1 shadow-[4px_4px_0px_#000]">
            <div
                className="bg-lime-400 h-6 transition-all duration-500 ease-out border-2 border-black"
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
