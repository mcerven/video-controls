import { useEffect, useRef, useState } from "react";
import { getVideoData } from "./getVideoData";
import { VideoData } from "./types";
import Video from "./video";

function App() {
  const [videoData, setVideoData] = useState<VideoData[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current === false) {
      initialized.current = true;

      (async () => {
        const res = await getVideoData;
        setVideoData(res);
      })();
    }
  }, []);

  return (
    <div className="App">
      {videoData.map((v, index) => (
        <Video key={index} startStopPairs={v.startStopPairs}>
          <>
            <source src={v.src} type={v.srcType} />
            Your browser does not support HTML video.
          </>
        </Video>
      ))}
    </div>
  );
}

export default App;
