export type StartStop = [start: number, stop: number];

export interface VideoData {
  src: string;
  srcType: string;
  startStopPairs: StartStop[];
}

export type ClosestFraction = {
  startStopPairsIndex: number;
  fraction: number;
};
