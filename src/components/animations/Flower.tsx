"use client";

import Lottie from "lottie-react";
import flowerAnimation from "@/animations/flower.json";

interface FlowerAnimationProps {
    className?: string;
    delay?: number;
}

export default function FlowerAnimation({
    className = "",
    delay = 0,
}: FlowerAnimationProps) {
    return (
        <div
            className={`pointer-events-none absolute z-10 ${className}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="h-full w-full">
                <Lottie
                    animationData={flowerAnimation}
                    loop
                    autoplay
                    className="h-full w-full"
                />
            </div>
        </div>
    );
}