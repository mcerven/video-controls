import Video from "./video";
import mp4 from "./assets/mov_bbb.mp4";

function App() {
  return (
    <div className="App">
      <Video
        startStopPairs={[
          [0.2, 0.4],
          [0.6, 0.8],
        ]}
      >
        <>
          <source src={mp4} type="video/mp4" />
          Your browser does not support HTML video.
        </>
      </Video>
      <Video startStopPairs={[[0, 1]]}>
        <>
          <source src={mp4} type="video/mp4" />
          Your browser does not support HTML video.
        </>
      </Video>
    </div>
  );
}

export default App;
