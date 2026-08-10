"use client";

import Lottie from "lottie-react";
import invitationAnimation from "@/animations/invitation.json";

interface InvitationAnimationProps {
    className?: string;
    delay?: number;
}

export default function InvitationAnimation({
    className = "",
    delay = 0,
}: InvitationAnimationProps) {
    return (
        <div
            className={`pointer-events-none absolute z-10 ${className}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="h-full w-full">
                <Lottie
                    animationData={invitationAnimation}
                    loop
                    autoplay
                    className="h-full w-full"
                />
            </div>
        </div>
    );
}