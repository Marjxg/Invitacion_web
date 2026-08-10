import EventDetails from "@/components/EventDetails";
import SaveTheDate from "@/components/SaveTheDate";
import MusicPlayer from "@/components/MusicPlayer";
import Countdown from "@/components/Countdown";

export default function Home() {
  return (
    <main>
      <MusicPlayer />
      <SaveTheDate />
      <EventDetails />
      <Countdown />
    </main>
  );
}