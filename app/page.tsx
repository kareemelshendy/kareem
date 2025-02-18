import Image from "next/image";
import CollapsibleWebinar from "./components/dropdown/dropdown";
import SoundCloudPlayer from "./components/SoundCloudPlayer";
import AudioStreamer from "./components/SoundCloudPlayer";

export default function Home() {
  return (
    <div className="p-8 max-w-[1000px] mx-auto">
      <h1 className="text-3xl font-semibold text-[#0F172A] mb-8">SoundCloud Player</h1>
      <AudioStreamer />
    </div>
  );
}
