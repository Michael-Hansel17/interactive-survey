import React, { useState, useEffect } from "react";

interface SpeechBubbleProps {
    text: string;
}

const TYPING_SPEED_MS = 25;

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ text }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        setDisplayedText("");
        if (!text) return;

        const intervalId = setInterval(() => {
            setDisplayedText((current) => {
                if (current.length < text.length) {
                    return text.substring(0, current.length + 1);
                }
                clearInterval(intervalId);
                return current;
            });
        }, TYPING_SPEED_MS);

        return () => clearInterval(intervalId);
    }, [text]);

    const isAnimating = displayedText.length < text.length;

    return (
        <div
            className="
            relative w-full
            max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl
            bg-white border-2 border-black
            p-4 sm:p-5 md:p-6
            rounded-lg md:rounded-none
            shadow-[8px_8px_0px_#000]
        "
            aria-live="polite"
        >
            <div className="relative text-base sm:text-lg md:text-2xl font-bold font-mono leading-relaxed">
                <p className="invisible flex items-start" aria-hidden="true">
                    <span>{text}</span>
                    <span
                        className="inline-block w-1 h-6 sm:h-6 md:h-7 ml-1 relative"
                        style={{ top: "4px" }}
                        aria-hidden="true"
                    />
                </p>

                <p className="absolute top-0 left-0 flex items-start w-full">
                    <span>{displayedText}</span>
                    {isAnimating && (
                        <span
                            className="inline-block w-1 h-6 sm:h-6 md:h-7 ml-1 bg-black animate-pulse relative"
                            style={{ top: "4px" }}
                            aria-hidden="true"
                        />
                    )}
                </p>
            </div>

            <div className="hidden md:block absolute left-[-22px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-15 border-t-transparent border-r-20 border-r-black border-b-15 border-b-transparent" />
            <div className="hidden md:block absolute -left-5 top-1/2 -translate-y-1/2 w-0 h-0 border-t-15 border-t-transparent border-r-20 border-r-white border-b-15 border-b-transparent" />

            <div className="block md:hidden absolute left-1/2 -translate-x-1/2 -top-[22px] w-0 h-0 border-l-15 border-l-transparent border-b-20 border-b-black border-r-15 border-r-transparent" />
            <div className="block md:hidden absolute left-1/2 -translate-x-1/2 -top-5 w-0 h-0 border-l-15 border-l-transparent border-b-20 border-b-white border-r-15 border-r-transparent" />
        </div>
    );
};

export default SpeechBubble;
