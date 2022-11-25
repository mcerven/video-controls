import React from "react";
import { StartStop } from ".";

function toPercentStr(val: number): string {
  return `${val * 100}%`;
}

interface SliderProps {
  currentProgress: number;
  startStopPairs: StartStop[];
  width: number;
}

export default function Slider({
  currentProgress,
  startStopPairs,
  width,
}: SliderProps) {
  return (
    <div className="slider">
      {startStopPairs.map((pair, index) => (
        <React.Fragment key={index}>
          <div
            className="slider-range-indicator"
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
