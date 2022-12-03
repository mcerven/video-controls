import { ClosestFraction, StartStop } from "../types";

export function toPercentStr(val: number): string {
  return `${val * 100}%`;
}

export function getClosestValidFraction(
  startStopPairs: StartStop[],
  fraction: number
): ClosestFraction {
  let minDistance = Number.MAX_SAFE_INTEGER;
  let closestFraction = fraction;
  let closestIndex = 0;

  for (let i = 0; i < startStopPairs.length; i++) {
    const [start, stop] = startStopPairs[i];

    if (fraction >= start && fraction <= stop) {
      return { startStopPairsIndex: i, fraction };
    } else if (fraction < start) {
      const distance = start - fraction;
      if (distance < minDistance) {
        minDistance = distance;
        closestFraction = start;
        closestIndex = i;
      }
    } else if (fraction > stop) {
      const distance = fraction - stop;
      if (distance < minDistance) {
        minDistance = distance;
        closestFraction = stop;
        closestIndex = i;
      }
    }
  }

  return { startStopPairsIndex: closestIndex, fraction: closestFraction };
}
