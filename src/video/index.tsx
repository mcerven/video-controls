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

  const resetTime = useCallback(() => {
    if (!ref.current) {
      return;
    }
    ref.current.currentTime =
      ref.current.duration * startStopPairs[startStopPairsIndex][0];
  }, []);

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
  }, [startStopPairsIndex, resetTime]);

  const handleNextClick = () => {
    setStartStopPairsIndex((val) =>
      Math.min(val + 1, startStopPairs.length - 1)
    );
  };

  const handlePreviousClick = () => {
    return setStartStopPairsIndex((val) => Math.max(val - 1, 0));
  };
  const handleStopPlayClick = () => {};

  return (
    <div>
      <video ref={ref} width="400" loop muted autoPlay controls>
        <>{children}</>
        Your browser does not support HTML video.
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
