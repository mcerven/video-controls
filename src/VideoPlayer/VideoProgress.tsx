import React, { useRef } from "react";
import { StartStop } from "../types";
import { toPercentStr } from "../utils/videoPlayerHelpers";

interface VideoProgressProps {
  currentProgress: number;
  startStopPairs: StartStop[];
  startStopPairsIndex: number;
  width: number;
  handleSetTimeFraction: (fraction: number) => void;
}

export default function VideoProgress({
  currentProgress,
  startStopPairs,
  startStopPairsIndex,
  width,
  handleSetTimeFraction,
}: VideoProgressProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    // Mouse position
    const x = e.clientX - rect.left;
    handleSetTimeFraction(x / width);
  };

  return (
    <div ref={ref} className="video-progress" onClick={handleClick}>
      {startStopPairs.map((pair, index) => (
        <div
          key={index}
          className={`video-progress-range-indicator ${
            startStopPairsIndex === index ? "selected" : ""
          }`}
          style={{
            left: Math.floor(pair[0] * width),
            right: Math.floor(width - pair[1] * width),
          }}
        />
      ))}
      <div
        className="video-progress-cursor"
        style={{ left: toPercentStr(currentProgress) }}
      />
    </div>
  );
}
