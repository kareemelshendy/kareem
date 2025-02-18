'use client'
import { useEffect, useRef } from "react";

function AudioStreamer() {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!window.MediaSource) {
      console.error("MediaSource API is not supported in this browser.");
      return;
    }

    const mediaSource = new MediaSource();
    if (audioRef.current) {
      (audioRef.current as HTMLMediaElement).src = URL.createObjectURL(mediaSource);
    }

    mediaSource.addEventListener("sourceopen", async () => {
      const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");
      let start = 0;
      const chunkSize = 65536; // 64KB per request
      let fileSize = 10 * 1024 * 1024; // Assume 10MB (later updated)

      const fetchChunk = async () => {
        if (start >= fileSize) {
          mediaSource.endOfStream();
          return;
        }

        try {
          const response = await fetch(`https://api.cloudpulse.projecx.io/api/storage/view/SONG/-_1737883116204.mp3`, {
            headers: { Range: `bytes=${start}-${start + chunkSize - 1}` },
          });

          if (!response.ok) {
            const error = new Error(`Failed to fetch chunk: ${response.status} ${response.statusText}`);
            console.error(error);
            throw error;
          }

          // Get total file size from Content-Range header
          const contentRange = response.headers.get("Content-Range");
          if (contentRange) {
            const match = contentRange.match(/\/(\d+)$/);
            if (match) fileSize = parseInt(match[1], 10);
          }

          const chunk = await response.arrayBuffer();
          sourceBuffer.appendBuffer(chunk);
          start += chunkSize;

          // Wait for current chunk to be processed before fetching next
          sourceBuffer.addEventListener("updateend", fetchChunk, { once: true });
        } catch (error) {
          console.error("Error fetching chunk:", error);
          mediaSource.endOfStream();
        }
      };

      fetchChunk();
    });
  }, []);

  return <audio ref={audioRef} controls />;
}

export default AudioStreamer;
