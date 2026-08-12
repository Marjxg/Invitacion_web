import { GUESTS } from "@/data/guests";

import Hero from "@/components/Hero";
import EventDetails from "@/components/EventDetails";
import SaveTheDate from "@/components/SaveTheDate";
import MusicPlayer from "@/components/MusicPlayer";
import Countdown from "@/components/Countdown";
import DressCode from "@/components/DressCode";
import GuestInvitation from "@/components/GuestInvitation";
import FinalMessage from "@/components/FinalMessage";

interface PageProps {
    params: Promise<{
        token: string;
    }>;
}

export default async function InvitationPage({ params }: PageProps) {
    const { token } = await params;

    const guest = GUESTS.find((item) => item.token === token);

    if (!guest) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <p>Invitación no encontrada</p>
            </main>
        );
    }

    return (
        <main>
            <Hero />
            <MusicPlayer />
            <SaveTheDate />
            <EventDetails />
            <Countdown />
            <DressCode />
            <GuestInvitation
                guestName={guest.name}
                guestCount={guest.guestCount}
            />
            <FinalMessage />
        </main>
    );
}