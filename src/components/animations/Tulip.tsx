"use client";

import Lottie from "lottie-react";
import tulipAnimation from "@/animations/tulip.json";

interface TulipAnimationProps {
    className?: string;
    delay?: number;
}

export default function TulipAnimation({
    className = "",
    delay = 0,
}: TulipAnimationProps) {
    return (
        <div
            className={`pointer-events-none absolute z-10 ${className}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="h-full w-full">
                <Lottie
                    animationData={tulipAnimation}
                    loop
                    autoplay
                    className="h-full w-full"
                />
            </div>
        </div>
    );
}