export function minutesToMilliseconds(minutes: number): number {
  return Math.floor(minutes * 60000);
}

export function millisecondsToMinutes(milliseconds: number): number {
  return Math.floor(milliseconds / 60000);
}

export function secondsToMilliseconds(seconds: number): number {
  return Math.floor(seconds * 1000);
}

export function millisecondsToSeconds(milliseconds: number): number {
  return Math.floor(milliseconds / 1000);
}

export function millisecondsToRemainingSeconds(milliseconds: number): number {
  return Math.floor((milliseconds % 60000) / 1000);
}
