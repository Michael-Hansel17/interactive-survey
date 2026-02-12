"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      
      {/* --- DEKORASI BACKGROUND (Sama seperti halaman utama) --- */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/30 rounded-full blur-[80px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/30 rounded-full blur-[80px] -z-10 animate-pulse delay-700"></div>

      {/* --- KARTU SUCCESS --- */}
      <div className="w-full max-w-lg bg-[var(--color-card)]/90 backdrop-blur-md border border-[var(--color-border)] rounded-3xl shadow-2xl p-8 sm:p-12 text-center relative animate-in fade-in zoom-in duration-500">
        
        {/* Ikon Centang Neon Berdenyut */}
        <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center shadow-[0_0_20px_var(--color-primary)] animate-bounce bg-primary/10">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={3} 
                  stroke="currentColor" 
                  className="w-12 h-12 text-primary drop-shadow-[0_0_5px_var(--color-primary)]"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            </div>
        </div>

        {/* Judul Neon */}
        <h1 className="text-4xl sm:text-5xl font-bold text-neon mb-4 tracking-wide">
            MISSION COMPLETE!
        </h1>
        
        {/* Pesan Terima Kasih */}
        <p className="text-lg text-gray-300 mb-10 leading-relaxed font-medium">
            Terima kasih sudah mengisi survey ini.<br/>
            Data kamu berhasil kami simpan dengan aman.
        </p>

        {/* Tombol Kembali (Gaya Outline Neon) */}
        <button
            onClick={() => router.push("/")}
            className="w-full py-4 px-6 text-lg font-bold text-white bg-transparent border-2 border-primary rounded-xl hover:bg-primary/20 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_15px_var(--color-primary)] uppercase tracking-wider"
        >
            Back to Home
        </button>

      </div>
      
      {/* Footer Kecil */}
      <footer className="absolute bottom-8 text-xs text-gray-500 font-bold tracking-widest uppercase opacity-50">
        Submitted Successfully
      </footer>

    </main>
  );
}