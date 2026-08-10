"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/config/event";

function useEntrance(delay = 80) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const id = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(id);
    }, [delay]);
    return visible;
}

function reveal(visible: boolean, delayMs = 0, extraClass = "") {
    return {
        className: [
            extraClass,
            "transition-all duration-[1100ms] ease-out",
            "motion-reduce:transition-none motion-reduce:transform-none",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
        ]
            .filter(Boolean)
            .join(" "),
        style: { transitionDelay: `${delayMs}ms` },
    };
}

function Butterfly({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 40 32" fill="none" className={className}>
            <path
                d="M20 16c-2-8-9-13-16-11-3 1-4 5-1 8 3 3 10 4 17 3Z"
                fill="currentColor"
                opacity="0.75"
            />
            <path
                d="M20 16c2-8 9-13 16-11 3 1 4 5 1 8-3 3-10 4-17 3Z"
                fill="currentColor"
                opacity="0.6"
            />
            <path
                d="M20 16c-1.5-5-6-8-11-7-2 .6-2.6 3.2-.6 5 2 1.8 6.6 2.6 11.6 2Z"
                fill="currentColor"
                opacity="0.9"
            />
            <path
                d="M20 16c1.5-5 6-8 11-7 2 .6 2.6 3.2.6 5-2 1.8-6.6 2.6-11.6 2Z"
                fill="currentColor"
                opacity="0.75"
            />
            <path d="M20 9v14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.9" />
        </svg>
    );
}

export default function Hero() {
    const visible = useEntrance();

    return (
        <section className="relative w-full overflow-hidden bg-linear-to-b from-violet-100/90 via-stone-200 to-violet-100/90 px-5 pb-16 pt-20 sm:px-8 sm:pt-24">
            <style>{`
        @keyframes heroFloatSlow {
          0%, 100% { transform: translateY(0) rotate(var(--r, 0deg)); }
          50% { transform: translateY(-10px) rotate(var(--r, 0deg)); }
        }
        @keyframes heroFloatSlower {
          0%, 100% { transform: translateY(0) rotate(var(--r, 0deg)); }
          50% { transform: translateY(-6px) rotate(var(--r, 0deg)); }
        }
        .hero-float-slow { animation: heroFloatSlow 6s ease-in-out infinite; }
        .hero-float-slower { animation: heroFloatSlower 8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-float-slow, .hero-float-slower { animation: none; }
        }
      `}</style>

            <Butterfly className="hero-float-slow pointer-events-none absolute right-6 top-8 h-8 w-8 text-violet-300 [--r:-8deg]" />
            <Butterfly className="hero-float-slower pointer-events-none absolute left-8 top-40 h-6 w-6 text-rose-300 [--r:10deg]" />
            <Butterfly className="hero-float-slow pointer-events-none absolute right-10 bottom-2 h-7 w-7 text-amber-300 [--r:6deg]" />

            <div className="relative mx-auto flex max-w-sm flex-col items-center text-center">
                <div {...reveal(visible, 150, "mt-4")}>
                    <h1 className="font-serif text-3xl leading-tight text-stone-700 sm:text-4xl">
                        {EVENT.data.name}
                    </h1>
                </div>

                <div {...reveal(visible, 400, "mt-2")}>
                    <div className="flex items-end justify-center">
                        <span className="font-serif text-[7.5rem] leading-[0.8] text-violet-900/70 sm:text-[9rem]">
                            15
                        </span>
                        <span className="mb-3 ml-1 font-serif text-xl italic text-violet-900/70 sm:text-2xl">
                            años
                        </span>
                    </div>
                </div>

                <div {...reveal(visible, 560, "mt-10 w-full")}>
                    <div className="relative mx-auto max-w-76 -rotate-1 rounded-[1.4rem_1.6rem_1.3rem_1.5rem/1.7rem_1.3rem_1.6rem_1.4rem] border border-amber-100 bg-amber-50/70 px-6 py-6 shadow-[0_8px_24px_-10px_rgba(120,90,60,0.25)]">
                        <p className="font-serif text-2xl leading-none text-violet-300">“</p>
                        <p className="-mt-2 font-serif text-[0.95rem] italic leading-relaxed text-stone-600">
                            {EVENT.data.message}
                        </p>
                        <p className="mt-3 font-serif text-2xl leading-none text-violet-300">”</p>
                    </div>
                </div>
            </div>
        </section>
    );
}