import React, { useCallback, useEffect, useRef, useState } from "react";
import VideoControls from "./VideoControls";

type StartStop = [start: number, stop: number];

interface VideoProps {
  children: React.ReactElement;
  startStopPairs: StartStop[];
}

function Video({ children, startStopPairs }: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [startStopPairsIndex, setStartStopPairsIndex] = useState(0);

  const resetTime = () => {
    if (!ref.current) {
      return;
    }
    const result =
      ref.current.duration * startStopPairs[startStopPairsIndex][0];

    if (!Number.isNaN(result)) {
      ref.current.currentTime = result;
    }
  };

  useEffect(() => {
    const onLoadedData = () => {
      resetTime();
    };
    const onTimeUpdate = (e: Event) => {
      if (!ref.current) return;

      if (
        ref.current.currentTime >=
        ref.current.duration * startStopPairs[startStopPairsIndex][1]
      ) {
        resetTime();
      }
    };

    ref.current?.addEventListener("loadeddata", onLoadedData);
    ref.current?.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      ref.current?.removeEventListener("loadeddata", onLoadedData);
      ref.current?.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [startStopPairsIndex]);

  useEffect(() => {
    resetTime();
  }, [startStopPairsIndex]);

  const handlePreviousClick = () => {
    setStartStopPairsIndex((val) => Math.max(val - 1, 0));
  };

  const handleStopPlayClick = () => {};

  const handleNextClick = () => {
    setStartStopPairsIndex((val) =>
      Math.min(val + 1, startStopPairs.length - 1)
    );
  };

  return (
    <div>
      <video ref={ref} width="400" loop muted autoPlay controls>
        {children}
      </video>
      <VideoControls
        handlePreviousClick={handlePreviousClick}
        handleStopPlayClick={handleStopPlayClick}
        handleNextClick={handleNextClick}
      />
      <div>{startStopPairs[startStopPairsIndex].join(" - ")}</div>
    </div>
  );
}

export default Video;
