"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

function FlowerDecor({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 60 60" fill="none" className={className}>
            <g fill="currentColor">
                <ellipse cx="30" cy="16" rx="8" ry="12" opacity="0.55" />
                <ellipse cx="30" cy="44" rx="8" ry="12" opacity="0.55" />
                <ellipse cx="16" cy="30" rx="12" ry="8" opacity="0.55" />
                <ellipse cx="44" cy="30" rx="12" ry="8" opacity="0.55" />
                <ellipse cx="19" cy="19" rx="8" ry="11" opacity="0.4" transform="rotate(-45 19 19)" />
                <ellipse cx="41" cy="41" rx="8" ry="11" opacity="0.4" transform="rotate(-45 41 41)" />
                <ellipse cx="41" cy="19" rx="8" ry="11" opacity="0.4" transform="rotate(45 41 19)" />
                <ellipse cx="19" cy="41" rx="8" ry="11" opacity="0.4" transform="rotate(45 19 41)" />
            </g>
            <circle cx="30" cy="30" r="6" fill="currentColor" opacity="0.9" />
        </svg>
    );
}

function RestrictedSwatch({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className}>
            <circle cx="12" cy="12" r="9" fill="#DDD6FE" />
            <circle
                cx="12"
                cy="12"
                r="9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                className="text-violet-400"
            />
            <line
                x1="6"
                y1="18"
                x2="18"
                y2="6"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                className="text-white"
            />
            <line
                x1="6"
                y1="18"
                x2="18"
                y2="6"
                stroke="currentColor"
                strokeWidth="0.6"
                strokeLinecap="round"
                className="text-violet-400"
            />
        </svg>
    );
}

function GarmentFigure({
    src,
    alt,
    blobClass,
}: {
    src: string;
    alt: string;
    blobClass: string;
}) {
    return (
        <div className="relative flex h-52 w-36 items-end justify-center sm:h-64 sm:w-44">
            <div
                className={`pointer-events-none absolute inset-3 -z-10 rounded-[55%_45%_60%_40%/50%_55%_45%_50%] blur-xl ${blobClass}`}
            />

            <Image
                src={src}
                alt={alt}
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 640px) 144px, 176px"
            />
        </div>
    );
}

export default function DressCode() {
    const { ref, visible } = useReveal<HTMLDivElement>();

    return (
        <section className="relative w-full overflow-hidden bg-linear-to-b from-violet-100/90 via-stone-200 to-violet-100/90 px-5 py-20 sm:px-8">
            <FlowerDecor className="pointer-events-none absolute -left-6 top-1 h-24 w-24 -rotate-12 text-violet-900/20 sm:h-28 sm:w-28" />
            <FlowerDecor className="pointer-events-none absolute -right-8 top-24 h-28 w-28 rotate-14 text-violet-900/6 sm:h-32 sm:w-32" />
            <FlowerDecor className="pointer-events-none absolute -left-2 top-64 h-28 w-28 rotate-18 text-violet-900/8 sm:h-32 sm:w-32" />
            <FlowerDecor className="pointer-events-none absolute -right-1 top-84 h-28 w-28 rotate-20 text-violet-900/10 sm:h-32 sm:w-32" />
            <FlowerDecor className="pointer-events-none absolute -right-10 bottom-8 h-12 w-12 -translate-x-1/2 rotate-6 text-violet-900/30" />
            <FlowerDecor className="pointer-events-none absolute bottom-1 left-1/16 h-12 w-12 -translate-x-1/2 rotate-20 text-violet-900/20" />
            <FlowerDecor className="pointer-events-none absolute bottom-16 left-3/6 h-28 w-28 -translate-x-1/2 rotate-6 text-violet-900/10" />

            <div ref={ref} className={`relative mx-auto max-w-sm ${revealClass(visible)}`}>
                <p className="text-center text-[0.65rem] font-medium uppercase tracking-[0.4em] text-violet-400">
                    Código de vestimenta
                </p>

                <div className="mt-3 flex items-center justify-center gap-3">
                    <span className="h-px w-9 bg-violet-300" />
                    <span className="font-serif text-3xl uppercase tracking-[0.25em] text-violet-900/70 sm:text-4xl">
                        Formal
                    </span>
                    <span className="h-px w-9 bg-violet-300" />
                </div>

                <div className="mt-10 flex items-end justify-center gap-4 sm:gap-8">
                    <GarmentFigure
                        src="/img/dress-code-woman.png"
                        alt="Vestido formal de dama"
                        blobClass="bg-gradient-to-br from-rose-100/70 to-violet-100/50"
                    />

                    <GarmentFigure
                        src="/img/dress-code-man.png"
                        alt="Traje formal de caballero"
                        blobClass="bg-gradient-to-bl from-violet-100/60 to-stone-100/60"
                    />
                </div>

                <div className="mt-10 flex justify-center">
                    <div className="flex items-center gap-3 rounded-full border border-dashed border-violet-200 bg-white/60 px-5 py-2.5 backdrop-blur-sm">
                        <p className="text-left text-xs text-stone-500 sm:text-sm">
                            Restricción de color: Violeta
                        </p>
                        <RestrictedSwatch className="h-6 w-6 shrink-0" />
                    </div>
                </div>
            </div>
        </section>
    );
}