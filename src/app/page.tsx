import Hero from "@/components/Hero";
import EventDetails from "@/components/EventDetails";
import SaveTheDate from "@/components/SaveTheDate";
import MusicPlayer from "@/components/MusicPlayer";
import Countdown from "@/components/Countdown";
import DressCode from "@/components/DressCode";

export default function Home() {
  return (
    <main>
      <Hero />
      <MusicPlayer />
      <SaveTheDate />
      <EventDetails />
      <Countdown />
      <DressCode />
    </main>
  );
}