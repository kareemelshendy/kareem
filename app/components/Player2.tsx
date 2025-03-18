"use client";

import { useEffect, useRef, useState } from "react";
import { IoPlay, IoPause, IoPlaySkipForwardSharp } from "react-icons/io5";
import ReactPlayer from "react-player";
import { formatTime } from "../util/format-time.util";
import WaveSurfer from "wavesurfer.js";
const waveformData = [
  [
    -74, 86, -84, 66, -59, 40, -82, 60, -70, 70, -43, 33, -72, 69, -68, 84, -57,
    68, -76, 78, -65, 79, -87, 101, -113, 104, -100, 105, -103, 107, -110, 107,
    -99, 108, -106, 109, -106, 108, -110, 109, -104, 105, -108, 113, -96, 104,
    -108, 107, -109, 109, -113, 108, -110, 112, -112, 112, -105, 110, -116, 112,
    -114, 110, -115, 110, -117, 118, -111, 107, -119, 111, -108, 109, -107, 108,
    -116, 111, -122, 110, -110, 106, -115, 111, -111, 113, -109, 109, -108, 112,
    -112, 114, -107, 107, -114, 110, -110, -108, 110, -113, 111, -111, 116,
    -111, 109, -107, 116, 115, -105, 111, -109, 113, -114, 107, -104, 104, -109,
    110, -114, 113, -113, 112, -112, 113, -111, 110, -108, 107, -111, 117, -116,
    110, -110, 112, -105, 109, -111, 102, -107, 106, -112, 108, -111, 112, -113,
    118, -112, 112, -105, 108, -108, 118, -112, 110, -104, 106, -110, 112, -112,
    107, -112, 117, -113, 107, -110, 117, -112, 109, -113, 114, -112, 112, -111,
    112, -111, 112, -111, 112, -111, 110, -115, 107, -103, 86, -82, 81, -108,
    104, -106, 104, -106, 108, -110, 109, -104, 102, -107, 105, -107, 112, -105,
    106, -107, 107, -104, 107, -105, 111, -108, 102, -108, 106, -105, 111, -109,
    100, -109, 103, -108, 99, -107, 106, -109, 111, -113, 110, -102, 104, -108,
    98, -109, 105, -113, 121, -107, 106, -116, 113, -114, 114, -107, 105, -110,
    114, -113, 111, -116, 109, -111, 113, -109, 113, -108, 110, -110, 113, -108,
    112, -109, 108, -109, 108, -110, 110, -110, 110, -108, 109, -109, 108, -109,
    118, -110, 113, -109, 106, -111, 108, -114, 112, -109, 110, -114, 114, -115,
    111, -114, 108, -113, 115, -110, 106, -108, 110, -105, 110, -110, 112, -115,
    111, -108, 110, -116, 110, -112, 114, -109, 107, -109, 107, -109, 105, -110,
    111, -110, 99, -114, 111, -108, 106, -104, 106, -110, 108, -109, 114, -109,
    109, -108, 114, -108, 115, -107, 108, -114, 109, -110, 114, -114, 111, -109,
    112, -114, 115, -121, 110, -113, 108, -107, 108, -113, 110, -114, 117, -109,
    108, -113, 113, -114, 112, -111, 111, -112, 109, -102, 94, -98, 81, -90, 85,
    -100, 83, -80, 52, -106, 94, -101, 97, -90, 83, -99, 96, -90, 100, -86, 90,
    -104, 93, -84, 100, -84, 83, -102, 98, -82, 89, -101, 85, -106, 95, -76, 89,
    -104, 99, -93, 106, -73, 78, -96, 98, -95, 99, -73, 70, -26, 27, -3, 3, 0,
    0, 0, 0,
  ],
];
export default function Player2() {
  const playerRef = useRef<ReactPlayer>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loop, setLoop] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const seekBgRef = useRef<HTMLDivElement | null>(null);
  const seekBarRef = useRef<HTMLDivElement | null>(null);
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);

  const [songs] = useState<string[]>([
    // "https://github.com/riyaddecoder/audio-files/raw/master/Anmone2-Aurthohin.mp3",
    // "https://serv100.albumaty.com/songs_2020/Albumaty.Com_Intro_Happy_Birth_Day_Intro.mp3",
    // "https://serv100.albumaty.com/songs_2020/Albumaty.Com_Walid_Tawfik_Enzel_Ya_gamel.mp3",
    "https://api.cloudpulse.projecx.io/api/storage/view/SONG/-_1735475570728.mp3",
    "https://api.cloudpulse.projecx.io/api/storage/view/SONG/Haygely.Mawgow3-Tamer.Ashour-MaTb3aa.Com_1742224025015.mp3",
    "https://api.cloudpulse.projecx.io/api/storage/view/SONG/Albumaty.Comalyanagnny_1742266445727.mp3",
    // "https://server12.mp3quran.net/maher/002.mp3",
  ]);

  const [played, setPlayed] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextSong = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(true);
  };

  const handlePreviousSong = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
    setIsPlaying(true);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleTimeUpdate = () => {
    if (!playerRef.current) return;
    const currentTime = playerRef.current?.getCurrentTime();
    setCurrentTime(currentTime);
    if (!duration) return;
    setPlayed(currentTime / duration);
  };

  const onSeekBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current) return;
    const seekBar = e.currentTarget;
    const seekBarPosition = seekBar.getBoundingClientRect();
    const clickPosition = e.clientX - seekBarPosition.left;
    const seekBarWidth = seekBar.offsetWidth;
    const seekPercentage = (clickPosition / seekBarWidth) * 100;
    const seekTime = (seekPercentage / 100) * duration;
    playerRef.current.seekTo(seekTime);
  };

  const updateWaveform = () => {
    if (!wavesurfer.current || !playerRef.current) return;
    if (!duration) return;

    const targetProgress = currentTime / duration;
    const currentProgress = wavesurfer.current.getCurrentTime() / duration;

    const step = (targetProgress - currentProgress) / 20; // Adjust smoothness
    let progress = currentProgress;

    const animateWaveform = () => {
      progress += step;
      if (
        (step > 0 && progress >= targetProgress) ||
        (step < 0 && progress <= targetProgress)
      ) {
        wavesurfer.current?.seekTo(targetProgress);
        return;
      }

      wavesurfer.current?.seekTo(progress);
      requestAnimationFrame(animateWaveform);
    };

    animateWaveform();
  };

  const handleSeek = (time: number) => {
    console.log("seeking to", time);
    if (playerRef.current) {
      playerRef.current.seekTo(time);
    }
  };

  const handleSourceOpen = async (mediaSource: MediaSource, url: string) => {
    if (!mediaSource || mediaSource.readyState !== "open") return;

    const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");
    let start = 0;
    const chunkSize = 1024 * 64; // 64KB chunks

    async function fetchChunk() {
      const response = await fetch(url, {
        headers: {
          Range: `bytes=${start}-${start + chunkSize - 1}`,
        },
      });

      if (!response.ok) return;

      const arrayBuffer = await response.arrayBuffer();
      sourceBuffer.appendBuffer(arrayBuffer);
      start += chunkSize;

      sourceBuffer.addEventListener("updateend", () => {
        if (start < 10000000) {
          // Adjust based on file size
          fetchChunk();
        } else {
          mediaSource.endOfStream();
        }
      });
    }

    await fetchChunk();
  };

  useEffect(() => {
    if (!waveformRef.current) return;
    console.log("waveformRef.current", duration);
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#DBE1EF",
      progressColor: "#F2817C",
      cursorColor: "transparent",
      barWidth: 3,
      barRadius: 3,
      barGap: 2,
      height: 40,
      cursorWidth: 1,
    });

    wavesurfer.current.load("", waveformData, duration);

    return () => wavesurfer.current?.destroy();
  }, [waveformData, duration]);

  useEffect(() => {
    if (seekBarRef.current) {
      seekBarRef.current.style.width = `${
        (currentTime / duration) * 100 + "%"
      }`;
    }
    if (currentTime && duration) {
      updateWaveform();
    }
  }, [currentTime, duration]);

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <ReactPlayer
          url={songs[currentIndex]}
          ref={playerRef}
          controls
          width={"100%"}
          playing={isPlaying}
          height={"200px"}
          loop={loop}
          volume={volume}
          muted={muted}
          onProgress={(progress) => {
            // console.log(progress);
          }}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onDuration={(duration) => {
            setDuration(() => +duration.toFixed(0));
            console.log("duration", duration);
          }}
          onEnded={() =>
            loop ? playerRef.current?.seekTo(0) : handleNextSong()
          }
          onTimeUpdate={handleTimeUpdate}
          config={{
            file: {
              attributes: {
                // crossOrigin: "anonymous",
              },
            },
          }}
        />

        <div className="flex items-center gap-2 fixed bottom-[0px] left-0 right-0 border-t border-[#DBE1EF] bg-white px-[24px] py-[16px]">
          <div className="flex items-center gap-[20px]">
            <button
              className="text-[24px] text-[#7F8A94] rotate-180"
              onClick={handlePreviousSong}
            >
              <IoPlaySkipForwardSharp />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#F2817C] text-white text-[24px]"
            >
              {isPlaying ? <IoPause /> : <IoPlay />}
            </button>

            <button
              className="text-[24px] text-[#7F8A94]"
              onClick={handleNextSong}
            >
              <IoPlaySkipForwardSharp />
            </button>
          </div>

          <div className="flex items-center gap-[16px] flex-1">
            <div
              className="w-full bg-gray-200 rounded-full h-[4px] cursor-pointer"
              ref={seekBgRef}
              onClick={onSeekBarClick}
            >
              <div
                className="w-0 bg-[#F2817C] rounded-full h-[4px] cursor-pointer"
                ref={seekBarRef}
              ></div>
            </div>
            <div className="flex items-center gap-[3px] text-[12px] text-[#7F8A94]">
              <span>{formatTime(+currentTime?.toFixed(0) || 0)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={waveformRef}
        style={{ width: "100%", height: "100px" }}
        onClick={() => {
          console.log("clicked");
          if (wavesurfer.current)
            handleSeek(wavesurfer.current.getCurrentTime());
        }}
      ></div>
    </>
  );
}
