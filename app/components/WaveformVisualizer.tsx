"use client";

import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

interface WaveformVisualizerProps {
  waveformData: number[][];
  duration: number;
}

export default function WaveformVisualizer({
  waveformData,
  duration,
}: WaveformVisualizerProps) {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (!waveformRef.current) return;

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#DBE1EF",
      progressColor: "#F2817C",
      cursorColor: "transparent",
      barWidth: 3,
      barRadius: 3,
      barGap: 2,
      height: 40,
    });

    // Load precomputed waveform data instead of an audio file
    wavesurfer.current.load("", waveformData, duration);

    return () => wavesurfer.current?.destroy();
  }, [waveformData, duration]);

  // const togglePlay = () => {
  //   if (!wavesurfer.current) return;
  //   setPlaying(!playing);
  //   wavesurfer.current.playPause();
  // };

  return (
    <div>
      <div ref={waveformRef} style={{ width: "100%", height: "100px" }}></div>
    </div>
  );
}
