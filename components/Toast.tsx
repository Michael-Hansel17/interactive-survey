import React, { useEffect, useState } from "react";

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      // Auto-hide after 3 seconds
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300); // Wait for animation to finish before clearing
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
      }`}
    >
      <div className="bg-red-500/90 backdrop-blur-md text-white px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.5)] border border-red-400 font-bold flex items-center gap-3">
        <span>⚠️</span>
        <p>{message}</p>
        <button
          onClick={() => setVisible(false)}
          className="ml-2 opacity-70 hover:opacity-100"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;
