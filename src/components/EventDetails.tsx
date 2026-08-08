"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Hook: revela un elemento con fade + desplazamiento al hacer scroll */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/*  Iconografía delicada (SVG simples, sin dependencias)               */
/* ------------------------------------------------------------------ */
function ChurchIcon({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} strokeWidth={1.4} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2.5v3" />
            <path d="M10.3 4.2h3.4" />
            <path d="M12 6.5 5 11v10h14V11l-7-4.5Z" />
            <path d="M9.5 21v-5.5a2.5 2.5 0 0 1 5 0V21" />
            <path d="M5 15.5h2.2M16.8 15.5H19" />
        </svg>
    );
}

function CelebrationIcon({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} strokeWidth={1.4} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 21 14.5 6.8c.6-.8 1.8-.8 2.4 0l.3.4c.6.8.3 1.9-.6 2.3L4 15" />
            <path d="M4 21l5.6-12" />
            <circle cx="18.5" cy="4.5" r="0.9" fill="currentColor" stroke="none" />
            <circle cx="20.5" cy="8.5" r="0.7" fill="currentColor" stroke="none" />
            <circle cx="15.5" cy="3" r="0.6" fill="currentColor" stroke="none" />
        </svg>
    );
}

function PinIcon({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} strokeWidth={1.4} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21s7-6.4 7-11.5A7 7 0 0 0 5 9.5C5 14.6 12 21 12 21Z" />
            <circle cx="12" cy="9.5" r="2.3" />
        </svg>
    );
}

function ClockIcon({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} strokeWidth={1.4} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 7.5V12l3 2" />
        </svg>
    );
}

/* Flor decorativa simple, reutilizable con distintos colores/tamaños */
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

/* Pequeño brote/flor que marca el punto de unión entre secciones */
function VineJoint({ className = "" }: { className?: string }) {
    return (
        <div className={`flex flex-col items-center ${className}`}>
            <span className="w-px h-8 bg-linear-to-b from-violet-200 to-violet-300" />
            <FlowerDecor className="w-6 h-6 text-rose-300 -my-1" />
            <span className="w-px h-8 bg-linear-to-b from-violet-300 to-violet-200" />
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Botón "Cómo llegar"                                               */
/* ------------------------------------------------------------------ */
function MapsButton({ href, accent }: { href: string; accent: "violet" | "rose" }) {
    const styles =
        accent === "violet"
            ? "border-violet-900/80 text-violet-900/80 hover:bg-violet-900/40 focus-visible:ring-violet-300"
            : "border-rose-900/80 text-rose-900/80 hover:bg-rose-900/40 focus-visible:ring-rose-300";

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-full border bg-white/60 px-5 py-2.5 text-sm font-medium tracking-wide backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0 ${styles}`}
        >
            <PinIcon className="h-4 w-4" />
            Cómo llegar
        </a>
    );
}

function EventCard({
    icon,
    eyebrow,
    title,
    time,
    place,
    mapsUrl,
    accent,
}: {
    icon: React.ReactNode;
    eyebrow: string;
    title: string;
    time: string;
    place: string[];
    mapsUrl: string;
    accent: "violet" | "rose";
}) {
    const { ref, visible } = useReveal<HTMLDivElement>();

    const ring = accent === "violet" ? "ring-violet-900/40 text-violet-900/40" : "ring-rose-900/40 text-rose-900/40";
    const eyebrowColor = accent === "violet" ? "text-violet-900/80" : "text-rose-900/80";

    return (
        <div ref={ref} className={`relative mx-auto w-full max-w-sm ${revealClass(visible)}`}>
            <div className="relative rounded-4xl border border-violet-100 bg-white/70 px-6 py-8 text-center shadow-[0_8px_30px_-12px_rgba(139,92,246,0.25)] backdrop-blur-sm">
                {/* icono circular */}
                <div className={`mx-auto -mt-14 mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white bg-linear-to-b from-white to-violet-50 shadow-sm ring-2 ${ring}`}>
                    <span className="h-7 w-7">{icon}</span>
                </div>

                <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${eyebrowColor}`}>{eyebrow}</p>
                <h3 className="mt-1 font-serif text-xl text-stone-700">{title}</h3>

                <div className="mt-4 flex items-center justify-center gap-2 text-stone-600">
                    <ClockIcon className="h-4 w-4 shrink-0 text-stone-400" />
                    <span className="text-sm">{time}</span>
                </div>

                <div className="mt-2 flex flex-col items-center gap-0.5 text-stone-500">
                    {place.map((line) => (
                        <span key={line} className="text-sm leading-snug">
                            {line}
                        </span>
                    ))}
                </div>

                <div className="mt-6">
                    <MapsButton href={mapsUrl} accent={accent} />
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Componente principal                                              */
/* ------------------------------------------------------------------ */
export default function EventDetails() {
    const dateReveal = useReveal<HTMLDivElement>();

    return (
        <section className="relative w-full overflow-hidden bg-linear-to-b from-violet-100/90 via-stone-200 to-violet-100/90 px-5 py-20 sm:px-8">
            {/* flores decorativas de fondo */}
            <FlowerDecor className="pointer-events-none absolute -left-6 top-1 h-24 w-24 -rotate-12 text-rose-700/10 sm:h-28 sm:w-28" />
            <FlowerDecor className="pointer-events-none absolute -right-8 top-24 h-28 w-28 rotate-18 text-violet-900/20 sm:h-32 sm:w-32" />
            <FlowerDecor className="pointer-events-none absolute -left-2 top-64 h-28 w-28 rotate-18 text-cyan-700/20 sm:h-32 sm:w-32" />
            <FlowerDecor className="pointer-events-none absolute right-1/2 bottom-1/3 h-24 w-24 -translate-x-1/2 rotate-6 text-emerald-700/10" />
            <FlowerDecor className="pointer-events-none absolute -bottom-8 -right-16 h-24 w-24 -translate-x-1/2 rotate-6 text-amber-500/30" />

            <div className="relative mx-auto flex max-w-md flex-col items-center">

                <div ref={dateReveal.ref} className={revealClass(dateReveal.visible)}>

                    <div className="mt-5 flex flex-col items-center">
                        <span className="font-serif text-[5.25rem] leading-[0.85] text-violet-900/40 sm:text-8xl">
                            03
                        </span>

                        <div className="mt-2 flex items-center gap-3">
                            <span className="h-px w-9 bg-violet-300" />
                            <span className="font-serif text-lg uppercase tracking-[0.35em] text-stone-600 sm:text-xl">
                                Octubre
                            </span>
                            <span className="h-px w-9 bg-violet-300" />
                        </div>

                        <span className="mt-1 font-serif text-2xl tracking-[0.3em] text-stone-400">
                            2026
                        </span>
                    </div>
                </div>

                <VineJoint className="my-8" />

                <EventCard
                    icon={<ChurchIcon className="h-full w-full" />}
                    eyebrow="Ceremonia religiosa"
                    title="Santa Misa"
                    time="5:30 PM – 6:30 PM"
                    place={["Parroquia de Nuestra Señora", "del Perpetuo Socorro"]}
                    mapsUrl="https://maps.google.com/?q=PLACEHOLDER_CEREMONIA"
                    accent="violet"
                />

                <VineJoint className="my-8" />

                <EventCard
                    icon={<CelebrationIcon className="h-full w-full" />}
                    eyebrow="Recepción"
                    title="Fiesta de celebración"
                    time="7:00 PM – 12:00 AM"
                    place={["Club Español", "Salón El Pimentón"]}
                    mapsUrl="https://maps.google.com/?q=PLACEHOLDER_RECEPCION"
                    accent="rose"
                />
            </div>
        </section>
    );
}