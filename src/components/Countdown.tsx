"use client";

import { useEffect, useRef, useState } from "react";
import { EVENT } from "@/config/event";

function useReveal<T extends HTMLElement>(threshold = 0.25) {
    const ref = useRef<T | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(el);
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, visible };
}

function revealClass(visible: boolean) {
    return [
        "transition-all duration-[1100ms] ease-out",
        "motion-reduce:transition-none motion-reduce:transform-none",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
    ].join(" ");
}

function SparkleIcon({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M12 2c.6 3.4 2 5.8 5 7-3 1.2-4.4 3.6-5 7-.6-3.4-2-5.8-5-7 3-1.2 4.4-3.6 5-7Z" opacity="0.9" />
            <path d="M19 13c.3 1.6.9 2.7 2.3 3.3-1.4.6-2 1.7-2.3 3.3-.3-1.6-.9-2.7-2.3-3.3 1.4-.6 2-1.7 2.3-3.3Z" opacity="0.6" />
        </svg>
    );
}

type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

function getTimeLeft(target: Date): TimeLeft | null {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return null;

    const totalSeconds = Math.floor(diff / 1000);

    return {
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
    };
}

function pad(value: number) {
    return String(value).padStart(2, "0");
}

function TimeUnit({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 shadow-[0_4px_16px_-6px_rgba(139,92,246,0.35)] sm:h-20 sm:w-20">
                <span className="font-serif text-2xl text-violet-900/70 tabular-nums sm:text-3xl">
                    {pad(value)}
                </span>
            </div>
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-violet-50 sm:text-xs">
                {label}
            </span>
        </div>
    );
}

function UnitSeparator() {
    return (
        <span className="mb-6 h-2 w-2 shrink-0 rounded-full bg-rose-300/70 sm:mb-7" aria-hidden="true" />
    );
}

export default function Countdown() {
    const { ref, visible } = useReveal<HTMLDivElement>();
    const [timeLeft, setTimeLeft] = useState<TimeLeft | null | undefined>(undefined);

    useEffect(() => {
        const tick = () => setTimeLeft(getTimeLeft(EVENT.date_format));
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    const hasArrived = timeLeft === null;
    const isLoading = timeLeft === undefined;

    return (
        <section className="relative w-full overflow-hidden bg-violet-400/40 px-5 py-20 sm:px-8">

            <div ref={ref} className={`relative mx-auto max-w-sm ${revealClass(visible)}`}>
                <p className="text-center text-[0.65rem] font-medium uppercase tracking-[0.4em] text-violet-100">
                    Falta muy poco
                </p>

                <div className="mt-2 flex items-center justify-center gap-3">
                    <span className="h-px w-9 bg-violet-300" />
                    <p className="font-serif text-xl text-violet-100 sm:text-2xl">Cuenta regresiva</p>
                    <span className="h-px w-9 bg-violet-300" />
                </div>

                <div className="mt-10 min-h-26">
                    {isLoading && (
                        <div aria-hidden="true" className="opacity-0">
                            <div className="flex items-end justify-center gap-2 sm:gap-4">
                                <TimeUnit value={0} label="Días" />
                                <TimeUnit value={0} label="Horas" />
                                <TimeUnit value={0} label="Min" />
                                <TimeUnit value={0} label="Seg" />
                            </div>
                        </div>
                    )}

                    {!isLoading && hasArrived && (
                        <div className="flex flex-col items-center gap-3 py-4 text-center">
                            <SparkleIcon className="h-8 w-8 text-violet-300" />
                            <p className="font-serif text-2xl text-violet-100 sm:text-3xl">
                                ¡Hoy es el gran día!
                            </p>
                            <p className="text-sm text-violet-50">Gracias por celebrar con nosotros</p>
                        </div>
                    )}

                    {!isLoading && !hasArrived && timeLeft && (
                        <div className="flex items-end justify-center gap-2 sm:gap-4">
                            <TimeUnit value={timeLeft.days} label="Días" />
                            <UnitSeparator />
                            <TimeUnit value={timeLeft.hours} label="Horas" />
                            <UnitSeparator />
                            <TimeUnit value={timeLeft.minutes} label="Min" />
                            <UnitSeparator />
                            <TimeUnit value={timeLeft.seconds} label="Seg" />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}