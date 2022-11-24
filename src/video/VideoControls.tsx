import React from "react";

interface VideoControlsProps {
  handlePreviousClick: () => void;
  handleStopPlayClick: () => void;
  handleNextClick: () => void;
}

export default function VideoControls({
  handlePreviousClick,
  handleStopPlayClick,
  handleNextClick,
}: VideoControlsProps) {
  return (
    <div>
      <button onClick={handlePreviousClick}>Previous</button>
      <button onClick={handleStopPlayClick}>Stop/Play</button>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
}
