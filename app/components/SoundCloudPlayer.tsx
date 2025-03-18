"use client";
import { useEffect, useRef, useState } from "react";
import { AudioPlayer, AudioPlayerRef } from "react-audio-play";

function SoundCloudPlayer() {
  const playerRef = useRef<AudioPlayerRef>(null);
  const [songs] = useState<string[]>([
    "https://github.com/riyaddecoder/audio-files/raw/master/Anmone2-Aurthohin.mp3",
    "https://serv100.albumaty.com/songs_2020/Albumaty.Com_Intro_Happy_Birth_Day_Intro.mp3",
    "https://serv100.albumaty.com/songs_2020/Albumaty.Com_Walid_Tawfik_Enzel_Ya_gamel.mp3"
    // "https://api.cloudpulse.projecx.io/api/storage/view/SONG/-_1735475570728.mp3"
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextSong = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % songs.length);
    playerRef.current?.play();
  };

  const handlePreviousSong = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
    playerRef.current?.play();
  };

  useEffect(() => {
    console.log(playerRef.current);
  }, []);

  return (
    <>
    {/* <div className="w-full h-full flex flex-col items-center justify-center">
      <AudioPlayer
        src={songs[currentIndex]}
        ref={playerRef}
        preload="auto"
        className="mb-4"
        onError={(e) => console.log(e)}
        color="#f2817c"
        sliderColor="#f2817c"
        autoPlay={true}
        width={"100%"}
      />
      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => playerRef.current?.play()}
        >
          Play
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={() => playerRef.current?.pause()}
        >
          Pause
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
          onClick={() => playerRef.current?.stop()}
        >
          Stop
        </button>

        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
          onClick={handlePreviousSong}
        >
          Previous Song
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
          onClick={handleNextSong}
        >
          Next Song
        </button>
      </div>
    </div> */}
    


    <audio src={"https://serv100.albumaty.com/songs_2020/Albumaty.Com_Walid_Tawfik_Enzel_Ya_gamel.mp3"} controls preload="auto" />
    </>
  );
}

export default SoundCloudPlayer;
