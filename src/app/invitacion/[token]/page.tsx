import { supabaseServer } from "@/utils/supabase/server";

import Hero from "@/components/Hero";
import EventDetails from "@/components/EventDetails";
import SaveTheDate from "@/components/SaveTheDate";
import MusicPlayer from "@/components/MusicPlayer";
import Countdown from "@/components/Countdown";
import DressCode from "@/components/DressCode";
import GuestInvitation from "@/components/GuestInvitation";
import FinalMessage from "@/components/FinalMessage";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
    params: Promise<{
        token: string;
    }>;
}

export default async function InvitationPage({ params }: PageProps) {
    const { token } = await params;

    const { data: guest, error } = await supabaseServer
        .from("guests")
        .select("id, token, name, guest_count, confirmed, confirmed_count")
        .eq("token", token)
        .single();

    if (error || !guest) {
        console.error("Error buscando invitado:", error);

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
                guestCount={guest.guest_count}
                guestToken={guest.token}
                initiallyResponded={guest.confirmed !== null}
                initialConfirmedCount={guest.confirmed_count}
            />

            <FinalMessage />
        </main>
    );
}