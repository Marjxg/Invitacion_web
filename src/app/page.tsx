import EventDetails from "@/components/EventDetails";
import SaveTheDate from "@/components/SaveTheDate";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  return (
    <main>
      <MusicPlayer />
      <SaveTheDate />
      <EventDetails />
    </main>
  );
}