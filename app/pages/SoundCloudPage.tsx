import SoundCloudPlayer from "../components/SoundCloudPlayer";

export default function SoundCloudPage() {
  return (
    <div className="p-8 max-w-[1000px] mx-auto">
      <h1 className="text-3xl font-semibold text-[#0F172A] mb-8">SoundCloud Player</h1>
      <SoundCloudPlayer />
    </div>
  );
} 