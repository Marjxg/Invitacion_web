"use client";

import { useRef, useState } from "react";

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = useState(false);

    const toggleMusic = async () => {
        if (!audioRef.current) return;

        if (playing) {
            audioRef.current.pause();
            setPlaying(false);
        } else {
            await audioRef.current.play();
            setPlaying(true);
        }
    };

    return (
        <>
            <audio
                ref={audioRef}
                src="/music/DNA.mp3"
                loop
                preload="auto"
            />

            <button
                onClick={toggleMusic}
                className="
          fixed bottom-5 right-5 z-50
          flex h-12 w-12 items-center justify-center
          rounded-full
          border border-violet-200
          bg-white/80
          text-violet-700
          shadow-lg
          backdrop-blur-md
          transition
          hover:scale-105
          active:scale-95
        "
                aria-label={playing ? "Pausar música" : "Reproducir música"}
            >
                {playing ? "❚❚" : "♪"}
            </button>
        </>
    );
}