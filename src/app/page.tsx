"use client";

import Hero from "@/components/Hero";
import EventDetails from "@/components/EventDetails";
import SaveTheDate from "@/components/SaveTheDate";
import MusicPlayer from "@/components/MusicPlayer";
import Countdown from "@/components/Countdown";
import DressCode from "@/components/DressCode";
import GuestInvitation from "@/components/GuestInvitation";
import FinalMessage from "@/components/FinalMessage";

export default function Home() {
  const handleConfirm = () => {
    console.log("Confirmar asistencia presionado");
  };

  return (
    <main>
      <Hero />
      <MusicPlayer />
      <SaveTheDate />
      <EventDetails />
      <Countdown />
      <DressCode />
      <GuestInvitation
        guestName="Familia Pérez López"
        guestCount={4}
        onConfirm={handleConfirm}
      />
      <FinalMessage />
    </main>
  );
}