import React, { useCallback, useEffect, useRef, useState } from "react";
import VideoProgress from "./VideoProgress";
import { StartStop } from "../types";
import { getClosestValidFraction } from "../utils/videoPlayerHelpers";

const width = 400;

interface VideoProps {
  children: React.ReactElement;
  startStopPairs: StartStop[];
}

function VideoPlayer({ children, startStopPairs }: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [startStopPairsIndex, setStartStopPairsIndex] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);

  const resetTime = () => {
    if (!ref.current) {
      return;
    }
    const newTime =
      ref.current.duration * startStopPairs[startStopPairsIndex][0];

    if (!Number.isNaN(newTime)) {
      ref.current.currentTime = newTime;
    }
  };

  useEffect(() => {
    const onTimeUpdate = () => {
      if (!ref.current) return;

      setCurrentProgress(ref.current.currentTime / ref.current.duration);

      if (
        ref.current.currentTime >=
        ref.current.duration * startStopPairs[startStopPairsIndex][1]
      ) {
        resetTime();
      }
    };
    resetTime();

    ref.current?.addEventListener("loadeddata", resetTime);
    ref.current?.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      ref.current?.removeEventListener("loadeddata", resetTime);
      ref.current?.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [startStopPairsIndex]);

  const handlePreviousClick = () => {
    setStartStopPairsIndex((val) => val - 1);
  };

  const handleNextClick = () => {
    setStartStopPairsIndex((val) => val + 1);
  };

  const handleStopPlayClick = () => {
    if (!ref.current) return;

    if (ref.current.paused) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  };

  const handleSetTimeFraction = useCallback((fraction: number): void => {
    if (!ref.current) return;

    const closestFractionResult = getClosestValidFraction(
      startStopPairs,
      fraction
    );

    setStartStopPairsIndex(closestFractionResult.startStopPairsIndex);
    ref.current.currentTime =
      closestFractionResult.fraction * ref.current.duration;
  }, []);

  return (
    <div className="video">
      <video ref={ref} width={width} loop muted autoPlay>
        {children}
      </video>
      <VideoProgress
        currentProgress={currentProgress}
        startStopPairs={startStopPairs}
        startStopPairsIndex={startStopPairsIndex}
        width={width}
        handleSetTimeFraction={handleSetTimeFraction}
      />
      <div className="video-control-buttons">
        <button
          disabled={startStopPairsIndex <= 0}
          onClick={handlePreviousClick}
        >
          ←
        </button>
        <button onClick={handleStopPlayClick}>Play / Stop</button>
        <button
          disabled={startStopPairsIndex >= startStopPairs.length - 1}
          onClick={handleNextClick}
        >
          →
        </button>
      </div>
    </div>
  );
}

export default VideoPlayer;
