import React, { useEffect, useRef } from "react";
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

  useEffect(() => {
    if (!ref.current) return;

    const handleClick = (e: MouseEvent): void => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();

      // Mouse position
      const x = e.clientX - rect.left;
      handleSetTimeFraction(x / width);
    };
    ref.current.addEventListener("click", handleClick);

    return () => {
      ref.current?.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div ref={ref} className="slider">
      {startStopPairs.map((pair, index) => (
        <React.Fragment key={index}>
          <div
            className={`slider-range-indicator ${
              startStopPairsIndex === index ? "selected" : ""
            }`}
            style={{
              left: Math.floor(pair[0] * width),
              right: Math.floor(width - pair[1] * width),
            }}
          />
        </React.Fragment>
      ))}
      <div
        className="slider-cursor"
        style={{ left: toPercentStr(currentProgress) }}
      />
    </div>
  );
}
