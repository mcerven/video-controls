import Video from "./video";

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
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
          <source
            src="https://www.w3schools.com/html/mov_bbb.ogg"
            type="video/ogg"
          />
          Your browser does not support HTML video.
        </>
      </Video>
      <Video startStopPairs={[[0, 1]]}>
        <>
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
          <source
            src="https://www.w3schools.com/html/mov_bbb.ogg"
            type="video/ogg"
          />
          Your browser does not support HTML video.
        </>
      </Video>
    </div>
  );
}

export default App;
