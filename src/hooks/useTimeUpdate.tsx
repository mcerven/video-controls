import React, { useEffect, useState } from "react";
import { StartStop } from "../types";

export default function useTimeUpdate(
  ref: React.RefObject<HTMLVideoElement>,
  startStopPairs: StartStop[],
  startStopPairsIndex: number
) {
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

  return { currentProgress };
}
