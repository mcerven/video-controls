import { StartStop } from ".";

const width = 400;

interface VideoControlsProps {
  currentProgress: number;
  startStopPairs: StartStop[];
  handlePreviousClick: () => void;
  handleStopPlayClick: () => void;
  handleNextClick: () => void;
}

export default function VideoControls({
  currentProgress,
  startStopPairs,
  handlePreviousClick,
  handleStopPlayClick,
  handleNextClick,
}: VideoControlsProps) {
  return (
    <div>
      <button onClick={handlePreviousClick}>{"←"}</button>
      <button onClick={handleStopPlayClick}>Stop/Play</button>
      <button onClick={handleNextClick}>{"→"}</button>
      <div className="slider" style={{ width }}>
        <div
          className="slider-cursor"
          style={{ left: currentProgress * width }}
        />
        {startStopPairs.map((pair) => (
          <>
            <div
              className="slider-range-indicator"
              style={{ left: pair[0] * width }}
            />
            <div
              className="slider-range-indicator"
              style={{ left: pair[1] * width }}
            />
          </>
        ))}
      </div>
    </div>
  );
}
