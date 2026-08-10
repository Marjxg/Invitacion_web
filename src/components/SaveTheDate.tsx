"use client";

import { useEffect, useRef, useState } from "react";
import ButterflyAnimation from "@/components/animations/Butterfly";
import Flower from "@/components/animations/Flower";
import 'animate.css';

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

function HeartDay({ day }: { day: number }) {
    return (
        <span className="relative flex h-9 w-9 items-center justify-center">
            <span className="animate__animated animate__pulse animate__infinite relative flex h-9 w-9 items-center justify-center">
                <svg
                    viewBox="0 0 32 29"
                    className="absolute h-9 w-9 text-rose-200 drop-shadow-[0_2px_5px_rgba(139,92,246,0.25)]"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path d="M16 27S2 18.6 2 9.2C2 4.8 5.2 2 9 2c3 0 5.5 1.7 7 4.2C17.5 3.7 20 2 23 2c3.8 0 7 2.8 7 7.2C30 18.6 16 27 16 27Z" />
                </svg>

                <span className="relative z-10 -translate-y-0.5 font-serif text-sm font-semibold text-violet-900 sm:text-base">
                    {day}
                </span>
            </span>
        </span>
    );
}

const WEEKDAYS = ["D", "L", "M", "M", "J", "V", "S"];

const WEEKS: (number | null)[][] = [
    [null, null, null, null, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30, 31],
];

const HIGHLIGHT_DAY = 3;

export default function SaveTheDate() {
    const { ref, visible } = useReveal<HTMLDivElement>();

    return (
        <section className="relative w-full overflow-hidden bg-violet-400/50 px-5 py-20 sm:px-8">
            <ButterflyAnimation
                className="-left-12 bottom-2 h-40 w-40"
            />

            <ButterflyAnimation
                className="-right-14 top-0 h-36 w-36 scale-x-[-1]"
            />

            <ButterflyAnimation
                className="-left-10 top-44 h-28 w-28 opacity-75"
            />

            <Flower
                className="-right-8 bottom-0 h-35 w-35"
            />

            <div ref={ref} className={`relative mx-auto max-w-sm ${revealClass(visible)}`}>

                <div className="relative rounded-[2.25rem] border border-violet-100 bg-white text-center shadow-[0_10px_35px_-15px_rgba(139,92,246,0.3)] backdrop-blur-sm sm:px-9">
                    <div className=" px-6 pb-10 pt-8">
                        <p className="font-serif text-2xl tracking-[0.15em] text-stone-700 sm:text-3xl">
                            SAVE{" "}
                            <span className="italic font-normal text-emerald-900/60">the</span>{" "}
                            DATE
                        </p>

                        <div className="mt-4 flex justify-center">
                            <span className="rounded-full bg-emerald-600/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-900/60 sm:text-sm">
                                Octubre 2026
                            </span>
                        </div>

                        <div className="mt-7">
                            <div className="grid grid-cols-7">
                                {WEEKDAYS.map((day, i) => (
                                    <span
                                        key={`${day}-${i}`}
                                        className="text-[10px] font-medium uppercase tracking-widest text-stone-400 sm:text-xs"
                                    >
                                        {day}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-2 flex flex-col gap-1.5 sm:gap-2">
                                {WEEKS.map((week, wi) => (
                                    <div key={wi} className="grid grid-cols-7">
                                        {week.map((day, di) => {
                                            const isHighlight = day === HIGHLIGHT_DAY;
                                            return (
                                                <div key={di} className="flex items-center justify-center py-0.5">
                                                    {day === null ? (
                                                        <span className="h-8 w-8" />
                                                    ) : isHighlight ? (
                                                        <HeartDay day={day} />
                                                    ) : (
                                                        <span className="flex h-8 w-8 items-center justify-center text-sm text-stone-500 sm:text-base">
                                                            {day}
                                                        </span>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}