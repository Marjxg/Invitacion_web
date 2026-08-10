"use client";

import Lottie from "lottie-react";
import flowerAnimation from "@/animations/flower-corner.json";

type Corner =
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";

interface FlowerCornerProps {
    corner: Corner;
    className?: string;
    size?: string;
    opacity?: string;
}

const cornerStyles: Record<Corner, string> = {
    "top-left": "-left-4 -top-4 scale-x-[-1]",
    "top-right": "-right-4 -top-4",
    "bottom-left": "-left-4 -bottom-4",
    "bottom-right": "-right-4 -bottom-4 scale-x-[-1]",
};

export default function FlowerCorner({
    corner,
    className = "",
    size = "h-40 w-40",
    opacity = "opacity-90",
}: FlowerCornerProps) {
    return (
        <div
            className={[
                "pointer-events-none absolute z-0",
                cornerStyles[corner],
                size,
                opacity,
                className,
            ].join(" ")}
        >
            <Lottie
                animationData={flowerAnimation}
                autoplay
                loop
                className="h-full w-full"
            />
        </div>
    );
}