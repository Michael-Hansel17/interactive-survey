"use client";

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export interface MusicPlayerRef {
  playAudio: () => void;
  unmuteAndPlay: () => void;
}

const MusicPlayer = forwardRef<MusicPlayerRef, {}>((props, ref) => {
  const songUrl = "/song.mp3"; 

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const hasPlayedRef = useRef(false);

  const playAudio = (muted = true) => {
    if (hasPlayedRef.current) return;
    
    const audio = audioRef.current;
    if (audio) {
      audio.muted = muted;
      audio.volume = 0.2;
      audio.play().then(() => {
        hasPlayedRef.current = true;
        setIsMuted(muted);
      }).catch(error => {
        console.error("Music play failed:", error);
      });
    }
  };
  
  const unmuteAndPlay = () => {
    setIsMuted(false);
    playAudio(false);
  }
  
  useImperativeHandle(ref, () => ({
    playAudio: () => playAudio(true),
    unmuteAndPlay,
  }));

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
    }
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      const newMuted = !audio.muted;
      audio.muted = newMuted;
      setIsMuted(newMuted);
      if (!newMuted) {
        playAudio(false);
      }
    }
  };

  if (!songUrl) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2 z-50">
      <audio ref={audioRef} src={songUrl} />
      <button 
        onClick={toggleMute} 
        className="p-2 bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
      <div className="text-xs text-gray-500 hidden sm:block">
        <p>Cinta-Mu Terbesar - VOG</p>
      </div>
    </div>
  );
});

MusicPlayer.displayName = "MusicPlayer";
export default MusicPlayer;
