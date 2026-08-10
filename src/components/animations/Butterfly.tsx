"use client";

import Lottie from "lottie-react";
import butterflyAnimation from "@/animations/butterfly.json";

interface ButterflyAnimationProps {
  className?: string;
  delay?: number;
}

export default function ButterflyAnimation({
  className = "",
  delay = 0,
}: ButterflyAnimationProps) {
  return (
    <div
      className={`pointer-events-none absolute z-10 ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="h-full w-full drop-shadow-[0_3px_6px_rgba(109,40,217,0.35)]">
        <Lottie
          animationData={butterflyAnimation}
          loop
          autoplay
          className="h-full w-full"
        />
      </div>
    </div>
  );
}