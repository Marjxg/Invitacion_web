"use client";

import { useEffect, useRef, useState } from "react";
import ButterflyAnimation from "@/components/animations/Butterfly";
import Flower from "@/components/animations/Flower";
import FlowerGrowing from "@/components/animations/FlowerGrowing";
import Tulip from "@/components/animations/Tulip";
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

/* Sobre con un pequeño corazón, para el ícono principal de la tarjeta */
function EnvelopeHeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} strokeWidth={1.4} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5.5" width="18" height="13" rx="2.2" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
      <path d="M12 17.2c-1.6-1.4-2.6-2.3-2.6-3.4a1.5 1.5 0 0 1 2.6-1c.5-.6 1.3-.9 2-.6a1.5 1.5 0 0 1 .6 2.6c0 1.1-1 2-2.6 3.4Z" fill="currentColor" stroke="none" opacity="0.85" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */
interface GuestInvitationProps {
  /** Nombre del invitado o familia, ej. "Familia Pérez López" */
  guestName: string;
  /** Número de personas incluidas en la invitación */
  guestCount: number;
  /** Se ejecuta al presionar "Confirmar asistencia" (backend/RSVP se conecta después) */
  onConfirm?: () => void;
  /** Texto breve opcional bajo el número de invitados */
  message?: string;
}

/* ------------------------------------------------------------------ */
/*  Componente principal: GuestInvitation                              */
/* ------------------------------------------------------------------ */
export default function GuestInvitation({
  guestName,
  guestCount,
  onConfirm,
  message = "Nos encantará compartir este día contigo",
}: GuestInvitationProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const guestLabel =
    guestCount === 1 ? "Invitación para 1 persona" : `Invitación para ${guestCount} personas`;

  return (
    <section className="relative w-full overflow-hidden bg-violet-400/40 px-5 py-20 sm:px-8">

      <ButterflyAnimation className="-right-14 top-0 h-36 w-36 scale-x-[-1]" />

      <ButterflyAnimation className="-right-5 bottom-0 h-36 w-36 scale-x-[-1]" />

      <ButterflyAnimation className="-left-10 top-30 h-28 w-28 opacity-75" />

      <Flower className="-left-8 -bottom-4 h-30 w-30 scale-x-[-1] lg:left-30 lg:opacity-60" />

      <Flower className="hidden lg:block absolute right-10 -bottom-4 h-30 w-30 lg:opacity-60" />

      <Tulip className="hidden lg:block absolute left-8 -bottom-2 h-28 w-28 opacity-60" />

      <Tulip className="hidden lg:block absolute right-35 -bottom-2 h-28 w-28 scale-x-[-1] opacity-60" />

      <div ref={ref} className={`relative mx-auto max-w-sm ${revealClass(visible)}`}>
        <div className="relative rounded-4xl border border-violet-100 bg-white px-6 py-9 text-center shadow-[0_10px_32px_-14px_rgba(139,92,246,0.3)] backdrop-blur-sm sm:px-8">
          <div className="mx-auto -mt-16 mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white bg-linear-to-b from-white to-violet-50 shadow-sm ring-4 ring-violet-200">
            <EnvelopeHeartIcon className="h-7 w-7 text-violet-900/70" />
          </div>

          <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-violet-900/70">
            Con cariño para
          </p>

          <h2 className="mt-2 font-serif text-2xl leading-snug text-violet-900/80 sm:text-3xl">
            {guestName}
          </h2>

          <span className="mt-4 inline-flex items-center rounded-full bg-stone-100 px-4 py-1.5 text-xs font-medium tracking-wide text-stone-500 sm:text-sm">
            {guestLabel}
          </span>

          <button
            type="button"
            onClick={onConfirm}
            style={{ animationDuration: "2.5s" }}
            className="mt-7 w-full rounded-full bg-violet-800/40 py-4 text-base font-medium tracking-wide 
            text-white shadow-[0_8px_20px_-8px_rgba(139,92,246,0.6)] transition-colors duration-300
            hover:bg-violet-400/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 
            focus-visible:ring-offset-2 sm:text-lg animate__animated animate__pulse animate__infinite"
          >
            Confirmar asistencia
          </button>
        </div>
      </div>
    </section>
  );
}