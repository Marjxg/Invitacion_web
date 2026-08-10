"use client";

import { EVENT } from "@/config/event";
import ButterflyAnimation from "@/components/animations/Butterfly";
import FlowerCorner from "@/components/animations/FlowerCorner";
import 'animate.css';

export default function Hero() {
    return (
        <section className="relative w-full overflow-hidden bg-linear-to-b from-violet-100/90 via-stone-200 to-violet-100/90 px-5 pb-16 pt-20 sm:px-8 sm:pt-24">

            <ButterflyAnimation
                className="-left-12 bottom-8 h-40 w-40"
            />

            <ButterflyAnimation
                className="-right-14 top-8 h-36 w-36 scale-x-[-1]"
            />

            <ButterflyAnimation
                className="-left-10 top-44 h-28 w-28 opacity-75"
            />

            <FlowerCorner
                corner="top-left"
                size="h-36 w-36 sm:h-44 sm:w-44"
            />

            <FlowerCorner
                corner="top-right"
                size="h-32 w-32 sm:h-40 sm:w-40"
                opacity="opacity-75"
            />

            <FlowerCorner
                corner="bottom-left"
                size="h-40 w-40 sm:h-48 sm:w-48"
                opacity="opacity-80"
            />

            <FlowerCorner
                corner="bottom-right"
                size="h-34 w-34 sm:h-44 sm:w-44"
                opacity="opacity-70"
            />

            <div className="relative mx-auto flex max-w-sm flex-col items-center text-center">
                <p className="font-script text-4xl leading-none text-violet-900 sm:text-5xl animate__animated animate__fadeIn">
                    {EVENT.data.name}
                </p>

                <div className="flex flex-col items-center">
                    {/* <span className="font-script text-[1.5rem] leading-[0.85] text-violet-900/40 sm:text-4xl">
                        Mis
                    </span> */}

                    <div className="mt-2 flex items-center gap-3">
                        <span className="h-px w-9 bg-violet-300" />
                        <span className="font-serif text-8xl pb-1 uppercase bg-linear-to-r from-lime-200/10 via-violet-900 to-lime-200/10 bg-clip-text text-transparent">
                            15
                        </span>
                        <span className="h-px w-9 bg-violet-300" />
                    </div>

                    <span className="mt-1 font-script text-[1.5rem] text-violet-900/40 sm:text-4xl">
                        años
                    </span>
                </div>

                <div className="relative mt-10 mx-auto max-w-76 -rotate-1 rounded-[1.4rem_1.6rem_1.3rem_1.5rem/1.7rem_1.3rem_1.6rem_1.4rem] border border-amber-100 bg-amber-50/70 px-6 py-6 shadow-[0_8px_24px_-10px_rgba(120,90,60,0.25)]">
                    <p className="font-serif text-2xl leading-none text-violet-300">“</p>
                    <p className="-mt-2 font-serif text-[0.95rem] italic leading-relaxed text-stone-600">
                        {EVENT.data.message}
                    </p>
                    <p className="mt-3 font-serif text-2xl leading-none text-violet-300">”</p>
                </div>
            </div>
        </section>
    );
}