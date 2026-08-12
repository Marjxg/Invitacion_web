"use client";

import { useEffect, useRef, useState } from "react";
import ButterflyAnimation from "@/components/animations/Butterfly";
import Flower from "@/components/animations/Flower";
import Tulip from "@/components/animations/Tulip";
import "animate.css";

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

function EnvelopeHeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
      <path d="M12 17.5s-2.5-1.5-2.5-3.2c0-1 .7-1.8 1.7-1.8.6 0 1.1.3 1.4.8.3-.5.8-.8 1.4-.8 1 0 1.7.8 1.7 1.8 0 1.7-2.5 3.2-2.5 3.2" />
    </svg>
  );
}

interface GuestInvitationProps {
  guestName: string;
  guestCount: number;
  guestToken: string;
  initiallyResponded?: boolean;
  initialConfirmedCount?: number | null;
  message?: string;
}

export default function GuestInvitation({
  guestName,
  guestCount,
  guestToken,
  initiallyResponded = false,
  initialConfirmedCount = null,
  message = "Nos encantará compartir este día contigo",
}: GuestInvitationProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const [responded, setResponded] = useState(initiallyResponded);
  const [confirmedCount, setConfirmedCount] = useState(initialConfirmedCount ?? guestCount);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const guestLabel =
    guestCount === 1
      ? "Invitación para 1 persona"
      : `Invitación para ${guestCount} personas`;

  const handleConfirm = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: guestToken,
          confirmedCount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "No se pudo registrar la respuesta");
      }

      setConfirmedCount(data.confirmedCount);
      setResponded(true);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo registrar la respuesta"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-violet-400/40 px-5 py-20 sm:px-8">
      <ButterflyAnimation className="-right-14 top-0 h-36 w-36 scale-x-[-1]" />

      <ButterflyAnimation className="-right-5 bottom-0 h-36 w-36 scale-x-[-1]" />

      <ButterflyAnimation className="-left-10 top-30 h-28 w-28 opacity-75" />

      <Flower className="-left-8 -bottom-4 h-30 w-30 scale-x-[-1] lg:left-30 lg:opacity-60" />

      <Flower className="absolute -bottom-4 right-10 hidden h-30 w-30 lg:block lg:opacity-60" />

      <Tulip className="absolute -bottom-2 left-8 hidden h-28 w-28 opacity-60 lg:block" />

      <Tulip className="absolute -bottom-2 right-35 hidden h-28 w-28 scale-x-[-1] opacity-60 lg:block" />

      <div ref={ref} className={`relative mx-auto max-w-sm ${revealClass(visible)}`}>
        <div className="relative rounded-4xl border border-violet-100 bg-white px-6 py-9 text-center shadow-[0_10px_32px_-14px_rgba(139,92,246,0.3)] backdrop-blur-sm sm:px-8">
          <div className="mx-auto -mt-16 mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white bg-linear-to-b from-white to-violet-50 shadow-sm ring-4 ring-violet-200">
            <EnvelopeHeartIcon className="h-7 w-7 text-violet-900/70" />
          </div>

          <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-violet-900/70">
            Con cariño para
          </p>

          <h2 className="mt-2 font-script text-3xl leading-snug text-violet-900 sm:text-5xl">
            {guestName}
          </h2>

          <span className="mt-4 inline-flex items-center rounded-full bg-stone-100 px-4 py-1.5 text-xs font-medium tracking-wide text-stone-500 sm:text-sm">
            {guestLabel}
          </span>

          {message && (
            <p className="mx-auto mt-5 max-w-64 font-serif text-sm italic leading-relaxed text-stone-500">
              {message}
            </p>
          )}

          <div className="mt-6">
            <p className="mb-3 text-sm text-stone-500">
              ¿Cuántas personas asistirán?
            </p>

            <select
              value={confirmedCount}
              onChange={(e) => setConfirmedCount(Number(e.target.value))}
              disabled={responded || loading}
              className="w-full rounded-full border border-violet-200 bg-white px-5 py-3 text-center font-medium text-violet-900 outline-none transition-colors focus:border-violet-400 focus:ring-2 focus:ring-violet-200 disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400"
            >
              {Array.from({ length: guestCount + 1 }, (_, index) => (
                <option key={index} value={index}>
                  {index === 0
                    ? "No podremos asistir"
                    : index === 1
                      ? "1 persona"
                      : `${index} personas`}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleConfirm}
              disabled={responded || loading}
              style={{ animationDuration: "2.5s" }}
              className={`mt-5 w-full rounded-full bg-violet-800/40 py-4 text-base font-medium tracking-wide text-white shadow-[0_8px_20px_-8px_rgba(139,92,246,0.6)] transition-colors duration-300 hover:bg-violet-400/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:shadow-none sm:text-lg ${!responded && !loading ? "animate__animated animate__pulse animate__infinite" : ""}`}
            >
              {loading
                ? "Confirmando..."
                : responded
                  ? "Respuesta registrada"
                  : "Confirmar asistencia"}
            </button>

            {error && (
              <p className="mt-3 text-sm text-rose-600">
                {error}
              </p>
            )}
          </div>

          {responded && (
            <div className="mt-7 rounded-2xl border border-violet-200 bg-violet-50/50 px-5 py-4 text-center">
              {confirmedCount > 0 ? (
                <>
                  <p className="font-serif text-lg text-violet-900">
                    ¡Asistencia confirmada!
                  </p>
                </>
              ) : (
                <>
                  <p className="font-serif text-lg text-violet-900">
                    Gracias por avisarnos
                  </p>

                  <p className="mt-1 text-sm text-stone-500">
                    Lamentamos que no puedan acompañarnos.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}