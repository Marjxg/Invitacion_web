"use client";

import ButterflyAnimation from "@/components/animations/Butterfly";
import FlowerCorner from "@/components/animations/FlowerCorner";
import "animate.css";

export default function FinalMessage() {
    return (
        <section className="relative flex min-h-105 w-full items-center justify-center overflow-hidden bg-linear-to-b from-violet-100/90 via-stone-200 to-violet-100/90 px-5 py-20 sm:px-8 lg:min-h-130 lg:py-24">
            <ButterflyAnimation className="-right-14 top-8 h-36 w-36 scale-x-[-1]" />
            <ButterflyAnimation className="-left-10 bottom-10 h-28 w-28 opacity-75" />

            <FlowerCorner corner="top-left" size="h-36 w-36 sm:h-44 sm:w-44" />
            <FlowerCorner corner="top-right" size="h-32 w-32 sm:h-40 sm:w-40" opacity="opacity-75" />
            <FlowerCorner corner="bottom-left" size="h-40 w-40 sm:h-48 sm:w-48" opacity="opacity-80" />
            <FlowerCorner corner="bottom-right" size="h-34 w-34 sm:h-44 sm:w-44" opacity="opacity-70" />

            <div className="relative z-10 mx-auto flex max-w-md flex-col items-center text-center">
                <p className="text-[0.65rem] font-medium uppercase tracking-[0.4em] text-violet-900/50 animate__animated animate__fadeIn">
                    Será un día muy especial
                </p>

                <div className="mt-4 flex items-center justify-center gap-3">
                    <span className="h-px w-10 bg-violet-300 sm:w-14" />

                    <h2 className="font-script text-5xl leading-none text-violet-900 sm:text-6xl lg:text-7xl animate__animated animate__fadeIn">
                        Te esperamos
                    </h2>

                    <span className="h-px w-10 bg-violet-300 sm:w-14" />
                </div>

                <p className="mt-6 max-w-xs font-serif text-sm italic leading-relaxed text-stone-600 sm:text-base">
                    Gracias por acompañarnos y ser parte de este momento tan especial.
                </p>
            </div>
        </section>
    );
}