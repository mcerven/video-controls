import React from "react";
import { StartStop } from ".";

function toPercentStr(val: number): string {
  return `${val * 100}%`;
}

interface SliderProps {
  currentProgress: number;
  startStopPairs: StartStop[];
}

export default function Slider({
  currentProgress,
  startStopPairs,
}: SliderProps) {
  return (
    <div className="slider">
      <div
        className="slider-cursor"
        style={{ left: toPercentStr(currentProgress) }}
      />
      {startStopPairs.map((pair, index) => (
        <React.Fragment key={index}>
          <div
            className="slider-range-indicator"
            style={{ left: toPercentStr(pair[0]) }}
          />
          <div
            className="slider-range-indicator"
            style={{ left: toPercentStr(pair[1]) }}
          />
        </React.Fragment>
      ))}
    </div>
  );
}
