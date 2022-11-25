import mp4 from "./assets/mov_bbb.mp4";
import { StartStop, VideoData } from "./types";

export const getVideoData: Promise<VideoData[]> = new Promise((resolve) => {
  const result: VideoData[] = [
    {
      src: mp4,
      srcType: "video/mp4",
      startStopPairs: [
        [0.2, 0.4],
        [0.6, 0.8],
      ],
    },
    {
      src: mp4,
      srcType: "video/mp4",
      startStopPairs: [[0, 1]],
    },
  ];
  resolve(result);
});
