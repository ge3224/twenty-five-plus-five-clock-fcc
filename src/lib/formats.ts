import { millisecondsToMinutes, millisecondsToRemainingSeconds } from "./time";

export function millisecondsToMinutesAndSeconds(milliseconds: number): string {
  const minutes = millisecondsToMinutes(milliseconds);
  const seconds = millisecondsToRemainingSeconds(milliseconds);
  return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}
