"use client";

import Lottie from "lottie-react";
import flowerGrowingAnimation from "@/animations/flower-growing.json";

interface FlowerGrowingAnimationProps {
    className?: string;
    delay?: number;
}

export default function TulipAnimation({
    className = "",
    delay = 0,
}: FlowerGrowingAnimationProps) {
    return (
        <div
            className={`pointer-events-none absolute z-10 ${className}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="h-full w-full">
                <Lottie
                    animationData={flowerGrowingAnimation}
                    loop
                    autoplay
                    className="h-full w-full"
                />
            </div>
        </div>
    );
}